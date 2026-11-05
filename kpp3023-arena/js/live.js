// Mod langsung gaya ZEP Quiz.
//  - Hos (projektor): pandangan atas seluruh arena, PIN dan QR, kawal soalan, papan markah, podium.
//  - Pemain (telefon/komputer): gerakkan avatar sendiri ke zon jawapan. Kedudukan diselaraskan kepada semua.
import { $, el, ganti, shuffle, sediaSoalan, simpan, UNIT, namaUnit, kiraMata, bunyi, konfeti, toast, bolehWebGL, muatTurun, keCSV } from './util.js';
import { kadSoalanHUD, cincinMasa, teksJawapan, WARNA_ZON, WARNA_OX, SIMBOL } from './hud.js';

const urlSertai = pin => `${location.origin}${location.pathname}#/sertai?pin=${pin}`;
const EMOTE = ['👋', '😄', '😮', '👍', '🔥'];

// ---------------------------------------------------------------------------
// Arena 2D (jika WebGL tiada): API sama seperti arenaKuiz
// ---------------------------------------------------------------------------
function arena2D(bekas) {
  const akar = el('div.arena2d'); bekas.append(akar);
  let pemain = new Map(), n = 0, betul = null, mod = 'lobi';
  const chip = p => el('span.chip-pemain' + (p.jatuh ? '.jatuh' : '') + (p.hantu ? '.hantu' : ''), { style: { '--w': p.warna } }, p.avatar, ' ', p.nama);
  function lukis() {
    if (mod === 'podium') return ganti(akar);
    if (!n) { akar.className = 'arena2d lobi'; return ganti(akar, ...[...pemain.values()].map(chip)); }
    akar.className = 'arena2d zon' + n;
    ganti(akar,
      ...Array.from({ length: n }, (_, i) => el('div.zon2d' + (betul != null ? (i === betul ? '.betul' : '.salah') : ''), { style: { '--w': n === 2 ? WARNA_OX[i] : WARNA_ZON[i] } },
        el('b', {}, n === 2 ? (i ? 'X' : 'O') : SIMBOL[i]), el('div', {}, ...[...pemain.values()].filter(p => p.zon === i).map(chip)))),
      el('div.tebing2d', {}, ...[...pemain.values()].filter(p => p.zon == null || p.zon < 0).map(chip)));
  }
  return {
    setPemain(s) { const baru = new Map(); for (const x of s) baru.set(x.uid, { ...x, zon: pemain.get(x.uid)?.zon ?? null, hantu: pemain.get(x.uid)?.hantu }); pemain = baru; lukis(); },
    setSasaran() {}, emote() {}, lompat() {}, setKunci() {}, setInput() {},
    letak(uid, z) { const p = pemain.get(uid); if (p && p.zon !== z) { p.zon = z; lukis(); } },
    susunZon(k) { n = k; betul = null; mod = k ? 'soalan' : 'lobi'; lukis(); },
    pulih() { for (const p of pemain.values()) { p.zon = null; p.jatuh = false; } betul = null; lukis(); },
    dedah(b) { betul = b; const j = []; for (const [u, p] of pemain) if (p.zon != null && p.zon >= 0 && p.zon !== b) { p.jatuh = true; j.push(u); } lukis(); return j; },
    setHantu(uid, ya) { const p = pemain.get(uid); if (p) { p.hantu = ya; lukis(); } },
    podium() { mod = 'podium'; lukis(); },
    buang() { akar.remove(); },
  };
}

async function buatArena(bekas, opsyen) {
  if (bolehWebGL()) {
    try { const m = await import('./dunia3d.js'); return { A: m.arenaKuiz(bekas, opsyen), joystick: m.buatJoystick, tigaD: true }; }
    catch (e) { console.warn('Arena 3D gagal, guna 2D', e); }
  }
  return { A: arena2D(bekas), tigaD: false };
}

// ---------------------------------------------------------------------------
// HOS
// ---------------------------------------------------------------------------
export async function paparHos(app, ctx) {
  const { store, ambilBank, SET } = ctx;
  const tetap = { unit: 0, bil: 10, masa: 20, survival: false, ...simpan.get('tetapanHos', {}), set: 'sim' };
  const radio = (nama, label, opsyen) => el('fieldset.segmen', {}, el('legend', {}, label),
    ...opsyen.map(([v, t, mati]) => el('label', { class: mati ? 'mati' : '' }, el('input', { type: 'radio', name: nama, value: v, checked: String(v) === String(tetap[nama]), disabled: !!mati }), el('span', {}, t))));
  const borang = el('form.kad.borang', {},
    el('h1', {}, 'Hos permainan langsung'),
    el('p.lede', {}, 'Paparkan skrin ini di projektor. Pelajar sertai dengan PIN atau kod QR, kemudian berlari ke zon jawapan dari telefon mereka.'),
    !store.dalamTalian ? el('p.notis', {}, 'Mod luar talian: pemain hanya boleh sertai dari tab lain dalam pelayar yang sama (sesuai untuk demo). Sambungkan Firebase untuk kelas sebenar.') : null,
    el('label', { for: 'hUnit' }, 'Unit'),
    el('select#hUnit', { name: 'unit' }, el('option', { value: 0 }, 'Semua unit (campuran)'), ...UNIT.slice(1).map(u => el('option', { value: u.n, selected: u.n === tetap.unit }, `${namaUnit(u.n)}: ${u.tajuk}`))),
    radio('bil', 'Bilangan soalan', [[5, '5'], [10, '10'], [15, '15'], [20, '20']]),
    radio('masa', 'Masa setiap soalan', [[15, '15 saat'], [20, '20 saat'], [30, '30 saat']]),
    radio('survival', 'Peraturan', [['false', 'Mata: semua terus bermain'], ['true', 'Survival: jatuh = tersingkir']]),
    el('div.tindakan', {}, el('button.btn.utama.besar', { type: 'submit' }, 'Cipta bilik'), el('a.btn', { href: '#/' }, 'Kembali')),
  );
  borang.addEventListener('submit', async e => {
    e.preventDefault();
    const d = new FormData(borang);
    const t = { set: 'sim', unit: Number(d.get('unit')), bil: Number(d.get('bil')), masa: Number(d.get('masa')), survival: d.get('survival') === 'true' };
    simpan.set('tetapanHos', t);
    let bank = await ambilBank(t.set);
    if (t.unit) bank = bank.filter(x => x.unit === t.unit);
    if (!bank.length) { toast('Tiada soalan untuk pilihan ini.', 'amaran'); return; }
    // Kira-kira 1 daripada 3 soalan ialah pusingan O/X jika ada
    const ox = shuffle(bank.filter(x => x.jenis === 'bs')), lain = shuffle(bank.filter(x => x.jenis !== 'bs'));
    const bilOX = Math.min(ox.length, Math.max(1, Math.round(t.bil / 3)));
    const soalan = shuffle([...ox.slice(0, bilOX), ...lain.slice(0, t.bil - bilOX)]).concat(ox.slice(bilOX)).slice(0, t.bil).map(sediaSoalan);
    const awam = soalan.map(({ id, unit, jenis, senario, soalan: s, pilihan }) => ({ id, unit, jenis, senario: senario || null, soalan: s, pilihan }));
    const pin = await store.ciptaBilik({ ...t, namaSet: SET[t.set]?.nama }, awam);
    sessionStorage.setItem('arena.hos.' + pin, JSON.stringify(soalan));
    jalanHos(app, ctx, pin, soalan, t);
  });
  app.append(el('section.halaman.sempit', {}, borang));
}

async function jalanHos(app, ctx, pin, soalan, t) {
  const { store, tambahPembersih } = ctx;
  ganti(app);
  document.body.dataset.laluan = 'arena';
  const dunia = el('div.dunia-arena', { role: 'img', 'aria-label': 'Arena: avatar pemain bergerak ke zon jawapan' });
  const hudAtas = el('div.hud-atas');
  const stat = el('div.hud-stat');
  const sepanduk = el('div.sepanduk', { 'aria-live': 'polite' });
  const panel = el('div.panel-dedah');
  const bawah = el('div.hos-bawah');
  app.append(el('section.pentas-arena.hos', {}, dunia, hudAtas, stat, sepanduk, panel, bawah));
  const { A } = await buatArena(dunia, { pandangan: 'hos' });
  tambahPembersih(() => A.buang());

  let pemain = {}, posisi = {}, jawapanSemasa = {}, skor = {}, state = { fasa: 'lobi', indeks: -1, siri: 0 };
  let unJawapan = null, raf = null, tamatMs = 0, sedangDedah = false;
  const emoteLepas = {};
  const senaraiPemain = () => Object.entries(pemain).map(([uid, p]) => ({ uid, ...p, x: posisi[uid]?.x, z: posisi[uid]?.z }));

  tambahPembersih(store.pantauPemain(pin, v => {
    const sebelum = Object.keys(pemain).length;
    pemain = v || {};
    A.setPemain(senaraiPemain());
    for (const [uid, s] of Object.entries(skor)) if (s.tersingkir) A.setHantu(uid, true);
    if (Object.keys(pemain).length > sebelum) bunyi.sertai();
    if (state.fasa === 'lobi') lukisLobi(); else lukisKiraan();
  }));
  tambahPembersih(store.pantauPosisi(pin, v => {
    posisi = v || {};
    for (const [uid, d] of Object.entries(posisi)) {
      A.setSasaran(uid, d.x, d.z);
      if (d.e && d.et && d.et !== emoteLepas[uid]) { if (emoteLepas[uid]) A.emote(uid, d.e); emoteLepas[uid] = d.et; }
    }
  }));
  tambahPembersih(() => { unJawapan?.(); clearInterval(raf); });

  const kekunci = e => { if ((e.key === 'Enter' || e.key === ' ') && !e.target.matches('input, textarea, select, button')) { e.preventDefault(); $('.btn-hos-utama', bawah)?.click(); } };
  addEventListener('keydown', kekunci);
  tambahPembersih(() => removeEventListener('keydown', kekunci));
  const skrinPenuh = () => el('button.btn.kecil', { type: 'button', onclick: () => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.())?.catch?.(() => {}) }, 'Skrin penuh');
  async function setState(s) { state = { ...s, siri: (state.siri || 0) + 1 }; await store.setState(pin, state); }
  function papanTanda(teks, lama = 1200) { ganti(sepanduk, el('div.sepanduk-isi', {}, teks)); if (lama) setTimeout(() => { if (sepanduk.textContent === String(teks)) ganti(sepanduk); }, lama); }

  // ---------- Lobi ----------
  function lukisLobi() {
    const bil = Object.keys(pemain).length;
    ganti(hudAtas, el('div.pin-kad', {},
      el('span', {}, 'Sertai di ', el('b', {}, location.host || 'pelayar ini'), ' dengan PIN'),
      el('b.pin', { 'aria-label': 'PIN ' + pin.split('').join(' ') }, pin.slice(0, 3) + ' ' + pin.slice(3)),
      el('div.qr#qr', { 'aria-label': 'Kod QR untuk sertai' })));
    ganti(stat, el('span.hud-item.skor', {}, `${bil} pemain`));
    ganti(panel, bil ? el('div.chip-baris', {}, ...senaraiPemain().map(p => el('button.chip-pemain', { type: 'button', style: { '--w': p.warna }, title: 'Keluarkan pemain ini', onclick: e => {
      const b = e.currentTarget;
      if (b.dataset.sah) store.buangPemain(pin, p.uid);
      else { b.dataset.sah = '1'; b.textContent = `Keluarkan ${p.nama}?`; setTimeout(() => { if (b.isConnected) { delete b.dataset.sah; b.textContent = `${p.avatar} ${p.nama}`; } }, 3000); }
    } }, p.avatar, ' ', p.nama))) : el('p.sepanduk-kecil', {}, 'Menunggu pemain… Pemain boleh berlari-lari di arena sementara menunggu.'));
    ganti(bawah, el('span.kecil', {}, `${ctxNamaSet()}: ${soalan.length} soalan, ${t.masa} saat${t.survival ? ', Survival' : ''}`),
      el('span.tindakan', {}, skrinPenuh(),
        el('button.btn.kecil', { type: 'button', onclick: async () => { try { await navigator.clipboard.writeText(urlSertai(pin)); toast('Pautan sertai disalin.'); } catch { toast(urlSertai(pin)); } } }, 'Salin pautan'),
        el('button.btn.utama.besar.btn-hos-utama', { type: 'button', disabled: !bil, onclick: () => mulaSoalan(0) }, 'Mula permainan')));
    const qr = $('#qr');
    if (qr && window.QRCode) new window.QRCode(qr, { text: urlSertai(pin), width: 120, height: 120, colorDark: '#14325A', colorLight: '#ffffff' });
  }
  const ctxNamaSet = () => ctx.SET[t.set]?.nama || '';

  // ---------- Soalan ----------
  async function mulaSoalan(i) {
    const q = soalan[i];
    jawapanSemasa = {};
    A.pulih(); A.susunZon(q.jenis === 'bs' ? 2 : 4);
    await setState({ fasa: 'soalan', indeks: i, kunci: String(i), masa: t.masa, mula: store.masa() });
    unJawapan?.();
    unJawapan = store.pantauJawapan(pin, i, v => { jawapanSemasa = v || {}; if (A.letak) for (const [uid, j] of Object.entries(jawapanSemasa)) A.letak(uid, j.pilih); lukisKiraan(); });
    tamatMs = performance.now() + t.masa * 1000;
    ganti(hudAtas, kadSoalanHUD(q, i, soalan.length));
    ganti(panel);
    papanTanda(q.jenis === 'bs' ? 'O atau X?' : 'Lari ke zon jawapan!');
    let detikAkhir = null;
    // setInterval (bukan requestAnimationFrame) supaya pemasa terus berjalan walaupun tab hos di latar
    const detik = () => {
      const baki = tamatMs - performance.now();
      const pm = $('.pemasa', stat);
      if (pm) { pm.style.setProperty('--p', Math.max(0, baki) / (t.masa * 1000)); $('b', pm).textContent = Math.max(0, Math.ceil(baki / 1000)); }
      const s = Math.ceil(baki / 1000); if (s <= 5 && s > 0 && s !== detikAkhir) { detikAkhir = s; bunyi.detik(); papanTanda(String(s), 900); }
      if (baki <= -600) dedah(); // tempoh ihsan untuk kelewatan rangkaian
    };
    ganti(stat, cincinMasa(t.masa * 1000, t.masa), el('span.hud-item.skor.kiraan-zon', {}, ''));
    ganti(bawah, el('span'), el('span.tindakan', {}, skrinPenuh(), el('button.btn.utama.btn-hos-utama', { type: 'button', onclick: () => dedah() }, 'Dedah sekarang')));
    lukisKiraan();
    clearInterval(raf);
    raf = setInterval(detik, 200);
  }

  function lukisKiraan() {
    if (state.fasa !== 'soalan') return;
    const aktif = Object.keys(pemain).filter(u => !skor[u]?.tersingkir);
    const dlmZon = aktif.filter(u => (jawapanSemasa[u]?.pilih ?? -1) >= 0).length;
    const k = $('.kiraan-zon', stat); if (k) k.textContent = `${dlmZon}/${aktif.length} dalam zon`;
  }

  // ---------- Dedah ----------
  async function dedah() {
    if (state.fasa !== 'soalan' || sedangDedah) return;
    sedangDedah = true;
    clearInterval(raf); unJawapan?.(); unJawapan = null;
    const i = state.indeks, q = soalan[i];
    const taburan = q.pilihan.map(() => 0);
    const baru = { ...skor };
    for (const uid of Object.keys(pemain)) {
      const s = baru[uid] || { jumlah: 0, betul: 0, streak: 0, rekod: [] };
      Object.assign(s, { nama: pemain[uid].nama, avatar: pemain[uid].avatar, warna: pemain[uid].warna, kumpulan: pemain[uid].kumpulan || '', matrik: pemain[uid].matrik || '' });
      const j = jawapanSemasa[uid];
      if (s.tersingkir) { s.akhir = { betul: false, mata: 0, pilih: -1, hantu: true }; s.rekod = [...(s.rekod || []), '']; baru[uid] = s; continue; }
      const pilih = j ? j.pilih : -1;
      const betul = pilih === q.jawapan;
      if (pilih >= 0 && pilih < taburan.length) taburan[pilih]++;
      s.streak = betul ? s.streak + 1 : 0;
      const mata = kiraMata({ betul, ms: j?.ms ?? t.masa * 1000, masaS: t.masa, streak: s.streak });
      s.jumlah += mata; if (betul) s.betul++;
      s.akhir = { betul, mata, pilih };
      s.rekod = [...(s.rekod || []), betul ? 1 : 0];
      if (t.survival && !betul) s.tersingkir = true;
      baru[uid] = s;
    }
    skor = baru;
    await store.setSkor(pin, skor);
    await setState({ fasa: 'dedah', indeks: i, kunci: String(i), jawapan: q.jawapan, taburan });
    A.dedah(q.jawapan);
    setTimeout(() => { for (const [uid, s] of Object.entries(skor)) if (s.tersingkir) A.setHantu(uid, true); }, 1500);
    bunyi.betul();
    const maks = Math.max(1, ...taburan);
    const lbl = k => (q.jenis === 'bs' ? (k ? 'X' : 'O') : SIMBOL[k]);
    ganti(panel, el('div.dedah-kad', {},
      el('b.maklum-tajuk', {}, 'Jawapan: ', teksJawapan(q)),
      el('p.huraian', {}, q.huraian),
      el('div.taburan', { role: 'img', 'aria-label': 'Taburan jawapan: ' + taburan.map((n, k) => `${lbl(k)} ${n}`).join(', ') },
        ...taburan.map((n, k) => el('div.tab-bar' + (k === q.jawapan ? '.betul' : ''), { style: { '--w': q.jenis === 'bs' ? WARNA_OX[k] : WARNA_ZON[k], '--h': n / maks } }, el('i'), el('span', {}, `${lbl(k)} ${n}`))))));
    ganti(stat, el('span.hud-item.skor', {}, `${taburan[q.jawapan]} betul`));
    ganti(bawah, el('span'), el('span.tindakan', {}, skrinPenuh(), el('button.btn.utama.besar.btn-hos-utama', { type: 'button', onclick: papan }, 'Papan markah')));
    sedangDedah = false;
  }

  const kedudukan = () => Object.entries(skor).map(([uid, s]) => ({ uid, ...s })).filter(s => pemain[s.uid] || s.jumlah).sort((a, b) => b.jumlah - a.jumlah);

  // ---------- Papan markah ----------
  async function papan() {
    const i = state.indeks, akhir = i + 1 >= soalan.length;
    await setState({ fasa: 'papan', indeks: i, kunci: String(i) });
    A.pulih();
    ganti(panel, el('div.papan-hos', {}, el('h2', {}, 'Lima teratas'),
      el('ol.papan', {}, ...kedudukan().slice(0, 5).map((s, n) => el('li' + (n < 3 ? '.atas' + (n + 1) : ''), {},
        el('span.kedudukan', {}, n < 3 ? ['🥇', '🥈', '🥉'][n] : n + 1), el('span.av', { style: { background: s.warna } }, s.avatar),
        el('span.nama', {}, s.nama, el('small', {}, s.tersingkir ? 'tersingkir' : s.streak >= 3 ? `🔥 streak ${s.streak}` : '')), el('b.mata', {}, s.jumlah.toLocaleString('ms-MY')))))));
    ganti(bawah, el('span'), el('span.tindakan', {}, skrinPenuh(),
      el('button.btn.utama.besar.btn-hos-utama', { type: 'button', onclick: () => (akhir ? tamat() : mulaSoalan(i + 1)) }, akhir ? 'Keputusan akhir' : 'Soalan seterusnya')));
  }

  // ---------- Tamat ----------
  async function tamat() {
    await setState({ fasa: 'tamat', indeks: state.indeks, kunci: String(state.indeks) });
    const k = kedudukan();
    ganti(hudAtas, el('h1.tajuk-podium', {}, 'Juara Arena'));
    ganti(stat);
    A.podium(k.slice(0, 3).map(s => ({ nama: s.nama, avatar: s.avatar, warna: s.warna, skor: s.jumlah })));
    konfeti(4000); bunyi.menang();
    ganti(panel, el('div.papan-hos.akhir', {}, el('ol.papan', {}, ...k.map((s, n) => el('li' + (n < 3 ? '.atas' + (n + 1) : ''), {},
      el('span.kedudukan', {}, n < 3 ? ['🥇', '🥈', '🥉'][n] : n + 1), el('span.av', { style: { background: s.warna } }, s.avatar),
      el('span.nama', {}, s.nama, el('small', {}, `${s.betul}/${soalan.length} betul`)), el('b.mata', {}, s.jumlah.toLocaleString('ms-MY')))))));
    ganti(bawah, el('span'), el('span.tindakan', {}, skrinPenuh(),
      el('button.btn', { type: 'button', onclick: () => {
        const kepala = ['Kedudukan', 'Nama', 'No. matrik', 'Kumpulan', 'Skor', 'Betul', 'Jumlah soalan', ...soalan.map((_, n) => `S${n + 1}`)];
        muatTurun(`keputusan-arena-${pin}.csv`, keCSV([kepala, ...k.map((s, n) => [n + 1, s.nama, s.matrik, s.kumpulan, s.jumlah, s.betul, soalan.length, ...soalan.map((_, m) => s.rekod?.[m] ?? '')])]));
      } }, 'Eksport CSV'),
      el('a.btn', { href: '#/hos' }, 'Permainan baharu'),
      el('a.btn.utama.btn-hos-utama', { href: '#/' }, 'Tutup')));
  }

  lukisLobi();
  if (!window.QRCode) setTimeout(() => state.fasa === 'lobi' && lukisLobi(), 1200);
}

// ---------------------------------------------------------------------------
// PEMAIN
// ---------------------------------------------------------------------------
export async function paparSertai(app, ctx, q) {
  const { store, perluProfil } = ctx;
  const pinAwal = (q.get('pin') || '').replace(/\D/g, '').slice(0, 6);
  if (!perluProfil(location.hash)) return;
  const borang = el('form.kad.borang.sertai', {},
    el('h1', {}, 'Sertai permainan'),
    el('label', { for: 'jPin' }, 'PIN bilik (6 digit)'),
    el('input#jPin.input-pin', { inputmode: 'numeric', pattern: '[0-9 ]{6,7}', maxlength: 7, autocomplete: 'off', value: pinAwal, required: true, placeholder: '000000' }),
    el('p.ralat#jRalat', { role: 'alert' }),
    el('div.tindakan', {}, el('button.btn.utama.besar', { type: 'submit' }, 'Masuk arena'), el('a.btn', { href: '#/profil' }, 'Tukar avatar')),
  );
  borang.addEventListener('submit', async e => {
    e.preventDefault();
    const pin = $('#jPin').value.replace(/\D/g, '');
    if (pin.length !== 6) { $('#jRalat').textContent = 'PIN mesti 6 digit.'; return; }
    const bilik = await store.ambilBilik(pin).catch(() => null);
    if (!bilik) { $('#jRalat').textContent = 'Bilik dengan PIN ini tidak dijumpai. Semak PIN pada skrin pensyarah.'; return; }
    if (bilik.state?.fasa === 'tamat') { $('#jRalat').textContent = 'Permainan ini sudah tamat.'; return; }
    jalanPemain(app, ctx, pin, bilik);
  });
  app.append(el('section.halaman.sempit', {}, borang));
  if (pinAwal.length === 6) borang.requestSubmit(); else $('#jPin').focus();
}

async function jalanPemain(app, ctx, pin, bilik) {
  const { store, profil, stat: statPemain, simpanStat, tambahPembersih, beriLencana } = ctx;
  const p = profil(), UID = store.uidBilik;
  await store.sertaiBilik(pin, { nama: p.nama, avatar: p.avatar, warna: p.warna, kumpulan: p.kumpulan, matrik: p.matrik || '' });
  ganti(app);
  document.body.dataset.laluan = 'arena';
  const dunia = el('div.dunia-arena');
  const hudAtas = el('div.hud-atas');
  const stat = el('div.hud-stat');
  const sepanduk = el('div.sepanduk', { 'aria-live': 'assertive' });
  const panel = el('div.panel-dedah');
  const kawalan = el('div.kawalan-arena');
  app.append(el('section.pentas-arena', { 'aria-label': 'Arena kuiz langsung' }, dunia, hudAtas, stat, sepanduk, panel, kawalan));

  const soalan = bilik.soalan || [];
  const masaS = bilik.tetapan?.masa || 20;
  let state = null, skor = {}, pemain = {}, posisi = {}, terimaMs = 0, dalamBilik = true, siriLepas = -1, selesai = false, bunyiSiri = -1;
  let raf = null, tersingkir = false, pilihButang = null;
  const emoteLepas = {};
  const saya = { x: (Math.random() - 0.5) * 16, z: (Math.random() - 0.5) * 10, e: null, et: 0 };

  // Hantar kedudukan (dihadkan ~8 kali sesaat)
  let akhirHantar = 0, tunda = null;
  const hantarPos = () => { akhirHantar = performance.now(); store.hantarPosisi(pin, { x: +saya.x.toFixed(2), z: +saya.z.toFixed(2), e: saya.e, et: saya.et }).catch(() => {}); };
  const gerak = (x, z) => {
    saya.x = x; saya.z = z;
    const lalu = performance.now() - akhirHantar;
    if (lalu > 120) hantarPos(); else { clearTimeout(tunda); tunda = setTimeout(hantarPos, 130 - lalu); }
  };
  const hantarZon = z => {
    if (state?.fasa !== 'soalan' || tersingkir) return;
    const ms = Math.round(performance.now() - terimaMs);
    if (ms > masaS * 1000 + 400) return;
    store.hantarJawapan(pin, state.indeks, z, ms).catch(() => {});
  };

  const { A, joystick, tigaD } = await buatArena(dunia, { pandangan: 'pemain', uidSaya: UID, onGerak: gerak, onZon: z => { hantarZon(z); if (z >= 0 && state?.fasa === 'soalan') bunyi.klik(); } });
  tambahPembersih(() => { A.buang(); cancelAnimationFrame(raf); clearTimeout(tunda); });
  hantarPos();

  // Kawalan
  const sentuh = matchMedia('(pointer: coarse)').matches;
  if (tigaD) {
    if (sentuh && joystick) joystick(kawalan, (x, z) => A.setInput(x, z));
    kawalan.append(el('div.butang-kanan', {}, el('div.baris-emote', {},
      ...EMOTE.slice(0, sentuh || innerWidth < 760 ? 3 : 5).map(e => el('button.btn-emote', { type: 'button', 'aria-label': 'Emote ' + e, onclick: () => { A.emote(UID, e); saya.e = e; saya.et = Date.now(); hantarPos(); } }, e)),
      el('button.btn-emote', { type: 'button', 'aria-label': 'Lompat', onclick: () => A.lompat() }, '⤒'))));
    const kekunci = e => {
      if (state?.fasa !== 'soalan' || e.target.matches?.('input, textarea, select')) return;
      const q = soalan[state.indeks]; if (!q) return;
      const n = q.jenis === 'bs' ? { o: 0, x: 1, 1: 0, 2: 1 }[e.key.toLowerCase()] : { 1: 0, 2: 1, 3: 2, 4: 3 }[e.key];
      if (n != null) A.pergiKeZon(n);
    };
    addEventListener('keydown', kekunci);
    tambahPembersih(() => removeEventListener('keydown', kekunci));
  }

  const senaraiPemain = () => Object.entries(pemain).map(([uid, x]) => ({ uid, ...x, x: uid === UID ? saya.x : posisi[uid]?.x, z: uid === UID ? saya.z : posisi[uid]?.z }));
  tambahPembersih(store.pantauPemain(pin, v => {
    pemain = v || {};
    if (dalamBilik && v && !v[UID] && state?.fasa !== 'tamat') {
      dalamBilik = false;
      ganti(panel, el('div.dedah-kad', {}, el('b.maklum-tajuk', {}, 'Anda telah dikeluarkan daripada bilik.'), el('a.btn', { href: '#/sertai' }, 'Sertai semula')));
      return;
    }
    A.setPemain(senaraiPemain());
    for (const [uid, s] of Object.entries(skor || {})) if (s.tersingkir) A.setHantu(uid, true);
  }));
  tambahPembersih(store.pantauPosisi(pin, v => {
    posisi = v || {};
    for (const [uid, d] of Object.entries(posisi)) {
      if (uid === UID) continue;
      A.setSasaran(uid, d.x, d.z);
      if (d.e && d.et && d.et !== emoteLepas[uid]) { if (emoteLepas[uid]) A.emote(uid, d.e); emoteLepas[uid] = d.et; }
    }
  }));
  tambahPembersih(store.pantauSkor(pin, v => {
    skor = v || {};
    for (const [uid, s] of Object.entries(skor)) if (s.tersingkir) setTimeout(() => A.setHantu(uid, true), 1400);
    tersingkir = !!skor[UID]?.tersingkir;
    if (state && state.fasa !== 'soalan') lukis();
  }));
  tambahPembersih(store.pantauState(pin, s => {
    if (!s || !dalamBilik || s.siri === siriLepas) return;
    siriLepas = s.siri;
    const baruSoalan = s.fasa === 'soalan' && (state?.fasa !== 'soalan' || state?.indeks !== s.indeks);
    const lama = state;
    state = s;
    if (baruSoalan) { terimaMs = performance.now(); pilihButang = null; mulaSoalanPemain(); }
    else if (s.fasa === 'dedah' && lama?.fasa !== 'dedah') { A.setKunci(true); A.dedah(s.jawapan); }
    else if (s.fasa === 'papan' && lama?.fasa !== 'papan') { A.pulih(); A.setKunci(false); }
    lukis();
  }));

  function papanTanda(teks, lama = 1200) { ganti(sepanduk, el('div.sepanduk-isi', {}, teks)); if (lama) setTimeout(() => { if (sepanduk.textContent === String(teks)) ganti(sepanduk); }, lama); }
  function kedudukanSaya() {
    const k = Object.entries(skor || {}).sort((a, b) => b[1].jumlah - a[1].jumlah);
    const n = k.findIndex(([u]) => u === UID);
    return n < 0 ? null : { n: n + 1, dari: k.length };
  }
  function lukisStat() {
    const s = skor?.[UID], k = kedudukanSaya();
    ganti(stat,
      state?.fasa === 'soalan' ? cincinMasa(masaS * 1000 - (performance.now() - terimaMs), masaS) : null,
      el('span.hud-item.skor', {}, `${s?.jumlah ?? 0} mata`),
      k ? el('span.hud-item', {}, `#${k.n}/${k.dari}`) : null,
      tersingkir ? el('span.hud-item', {}, '👻 Tersingkir') : null);
  }

  function mulaSoalanPemain() {
    const q = soalan[state.indeks]; if (!q) return;
    A.pulih(); A.setKunci(false);
    A.susunZon(q.jenis === 'bs' ? 2 : 4);
    papanTanda(tersingkir ? 'Anda menonton sebagai hantu 👻' : q.jenis === 'bs' ? 'O atau X?' : 'Lari ke zon jawapan!');
    // Jika sudah berdiri di zon semasa soalan muncul, hantar terus
    const z0 = A.zonPemain?.(UID); if (z0 != null && z0 >= 0) hantarZon(z0);
    let detikAkhir = null;
    const detik = () => {
      if (state?.fasa !== 'soalan') return;
      const baki = masaS * 1000 - (performance.now() - terimaMs);
      const pm = $('.pemasa', stat);
      if (pm) { pm.style.setProperty('--p', Math.max(0, baki) / (masaS * 1000)); $('b', pm).textContent = Math.max(0, Math.ceil(baki / 1000)); }
      const s = Math.ceil(baki / 1000); if (s <= 5 && s > 0 && s !== detikAkhir) { detikAkhir = s; bunyi.detik(); papanTanda(String(s), 900); }
      if (baki <= 0) { A.setKunci(true); papanTanda('Masa tamat!', 900); return; }
      raf = requestAnimationFrame(detik);
    };
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(detik);
  }

  function lukis() {
    if (!state) return;
    lukisStat();
    const s = skor?.[UID], k = kedudukanSaya();
    if (state.fasa === 'lobi') {
      ganti(hudAtas, el('div.hud-soalan.hud-mula', {}, el('h2.hud-teks', {}, 'Anda dalam arena!'),
        el('p', {}, tigaD ? (sentuh ? 'Cuba gerak dengan joystick atau ketik lantai. Permainan bermula sebentar lagi.' : 'Cuba gerak dengan anak panah atau WASD, atau klik lantai. Permainan bermula sebentar lagi.') : 'Permainan bermula sebentar lagi.')));
      ganti(panel, el('button.btn.kecil', { type: 'button', onclick: async () => { await store.keluarBilik(pin); location.hash = '#/'; } }, 'Keluar bilik'));
      return;
    }
    if (state.fasa === 'soalan') {
      const q = soalan[state.indeks]; if (!q) return;
      ganti(hudAtas, kadSoalanHUD(q, state.indeks, soalan.length));
      ganti(panel, tigaD ? null : butangJawapan(q));
      return;
    }
    if (state.fasa === 'dedah') {
      const a = s?.akhir, q = soalan[state.indeks];
      if (a && bunyiSiri !== state.siri) { bunyiSiri = state.siri; if (a.betul) { bunyi.betul(); A.emote(UID, '🎉'); } else if (!a.hantu) bunyi.salah(); }
      ganti(panel, el('div.dedah-kad.' + (a?.betul ? 'ya' : 'tidak'), {},
        el('b.maklum-tajuk', {}, a?.hantu ? 'Anda sedang menonton' : a?.betul ? `Betul! +${a.mata}` : a?.pilih === -1 ? 'Anda tiada di mana-mana zon' : 'Splash! Jawapan salah'),
        q ? el('p', {}, 'Jawapan: ', el('b', {}, teksJawapan({ ...q, jawapan: state.jawapan }))) : null,
        s?.tersingkir && !a?.hantu ? el('p', {}, 'Mod Survival: anda tersingkir, tetapi masih boleh bergerak dan menonton.') : null,
        s?.streak >= 2 ? el('p', {}, `🔥 Streak ${s.streak}`) : null,
        butangLamanUtama()));
      return;
    }
    if (state.fasa === 'papan') {
      ganti(panel, el('div.dedah-kad', {}, el('b.maklum-tajuk', {}, k ? `Kedudukan ${k.n} daripada ${k.dari}` : 'Menunggu…'), el('p', {}, `${s?.jumlah ?? 0} mata`), butangLamanUtama()));
      return;
    }
    if (state.fasa === 'tamat') {
      ganti(hudAtas, el('div.hud-soalan.hud-mula', {}, el('h2.hud-teks', {}, k ? `Tamat! Kedudukan ${k.n} daripada ${k.dari}` : 'Permainan tamat')));
      ganti(panel, el('div.dedah-kad', {},
        el('b.maklum-tajuk', {}, `${s?.jumlah ?? 0} mata, ${s?.betul ?? 0}/${soalan.length} betul`),
        el('div.tindakan', {}, el('a.btn.utama', { href: '#/' }, 'Laman utama'), el('a.btn', { href: '#/papan?s=langsung' }, 'Leaderboard'))));
      if (!selesai && s) {
        selesai = true;
        const kunciSimpan = 'arena.selesai.' + pin;
        let sudah = false; try { sudah = !!sessionStorage.getItem(kunciSimpan); sessionStorage.setItem(kunciSimpan, '1'); } catch { /* abaikan */ }
        if (!sudah) {
          const st = statPemain(), baru = [];
          st.xp += Math.round(s.jumlah / 20) + s.betul * 10; st.permainan++;
          beriLencana(st, 'langkah-pertama', baru);
          if (k?.n === 1 && k.dari > 1) beriLencana(st, 'juara-langsung', baru);
          simpanStat(st);
          store.hantarSkor({ nama: p.nama, avatar: p.avatar, warna: p.warna, kumpulan: p.kumpulan, skor: s.jumlah, betul: s.betul, jumlah: soalan.length, set: 'langsung', unit: bilik.tetapan?.unit || 0, mod: 'langsung' }).catch(() => {});
          if (k?.n <= 3) { konfeti(); bunyi.menang(); }
          if (baru.includes('juara-langsung')) toast('Lencana baharu: Juara Arena!');
        }
      }
    }
  }

  /** Keluar dari bilik dan kembali ke laman utama. */
  function butangLamanUtama() {
    return el('div.tindakan', {}, el('button.btn.btn-laman-utama', { type: 'button', onclick: async () => { dalamBilik = false; await store.keluarBilik(pin).catch(() => {}); location.hash = '#/'; } }, 'Laman utama'));
  }

  /** Paparan butang (tanpa WebGL). */
  function butangJawapan(q) {
    const bs = q.jenis === 'bs';
    return el('div.jawapan-grid.pemain' + (bs ? '.ox' : ''), {}, ...q.pilihan.map((txt, i) => el('button.jawapan' + (pilihButang === i ? '.dipilih' : ''), {
      type: 'button', 'data-i': i, 'data-k': bs ? (i ? 'X' : 'O') : i, disabled: tersingkir,
      onclick: () => { pilihButang = i; A.letak?.(UID, i); hantarZon(i); bunyi.klik(); lukis(); },
    }, el('span.bentuk', { 'aria-hidden': 'true' }, bs ? (i ? 'X' : 'O') : SIMBOL[i]), el('span.teks', {}, txt))));
  }
}
