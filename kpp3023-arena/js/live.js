// Mod langsung: hos (skrin projektor) dan pemain (telefon). Inspirasi kuiz kelas masa nyata, dengan Arena O/X 3D.
import { $, $$, el, ganti, shuffle, sediaSoalan, simpan, UNIT, namaUnit, kiraMata, bunyi, konfeti, toast, bolehWebGL, muatTurun, keCSV } from './util.js';

const BENTUK = ['▲', '◆', '●', '■'];
const urlSertai = pin => `${location.origin}${location.pathname}#/sertai?pin=${pin}`;

// ---------------------------------------------------------------------------
// Arena 2D (fallback jika WebGL tiada): API sama seperti arena 3D
// ---------------------------------------------------------------------------
function arena2D(bekas) {
  const akar = el('div.arena2d'); bekas.append(akar);
  let pemain = new Map(), mod = 'lobi', zon = [], betul = null;
  const chip = p => el('span.chip-pemain' + (p.jatuh ? '.jatuh' : ''), { style: { '--w': p.warna } }, p.avatar, ' ', p.nama);
  function lukis() {
    if (mod === 'lobi') { akar.className = 'arena2d lobi'; ganti(akar, ...[...pemain.values()].map(chip)); return; }
    if (mod === 'podium') return;
    akar.className = 'arena2d zon' + zon.length;
    const belum = [...pemain.values()].filter(p => p.zon == null);
    ganti(akar, 
      ...zon.map((z, i) => el('div.zon2d' + (betul != null ? (i === betul ? '.betul' : '.salah') : ''), { style: { '--w': z.warna } },
        el('b', {}, z.label), el('div', {}, ...[...pemain.values()].filter(p => p.zon === i).map(chip)))),
      el('div.tebing2d', {}, ...belum.map(chip)),
    );
  }
  return {
    setPemain(s) { const baru = new Map(); for (const x of s) baru.set(x.uid, { ...x, zon: pemain.get(x.uid)?.zon ?? null }); pemain = baru; lukis(); },
    letak(uid, z) { const p = pemain.get(uid); if (p) { p.zon = z; lukis(); } },
    susunLobi() { mod = 'lobi'; betul = null; lukis(); },
    susunZon(n) { mod = 'soalan'; betul = null; zon = Array.from({ length: n }, (_, i) => ({ label: n === 2 ? (i ? 'X' : 'O') : BENTUK[i], warna: n === 2 ? (i ? '#E8483B' : '#2F6FE4') : ['#E8483B', '#2F6FE4', '#F2A900', '#1E9E62'][i] })); lukis(); },
    resetZon() { for (const p of pemain.values()) p.zon = null; lukis(); },
    dedah(b) { betul = b; lukis(); },
    susunPodium() { mod = 'podium'; ganti(akar); },
    buang() { akar.remove(); },
  };
}

async function buatArena(bekas) {
  if (bolehWebGL()) {
    try { const m = await import('./dunia3d.js'); return m.arena(bekas); }
    catch (e) { console.warn('Arena 3D gagal, guna 2D', e); }
  }
  return arena2D(bekas);
}

// ---------------------------------------------------------------------------
// HOS
// ---------------------------------------------------------------------------
export async function paparHos(app, ctx) {
  const { store, ambilBank, SET } = ctx;
  const tetap = { set: 'sim', unit: 0, bil: 10, masa: 20, ...simpan.get('tetapanHos', {}) };
  const finalAda = (await store.ambilSetFinal()).length > 0;
  const radio = (nama, label, opsyen) => el('fieldset.segmen', {}, el('legend', {}, label),
    ...opsyen.map(([v, t, mati]) => el('label', { class: mati ? 'mati' : '' }, el('input', { type: 'radio', name: nama, value: v, checked: String(v) === String(tetap[nama]), disabled: !!mati }), el('span', {}, t))));
  const borang = el('form.kad.borang', {},
    el('h1', {}, 'Hos permainan langsung'),
    el('p.lede', {}, 'Paparkan skrin ini di projektor. Pelajar sertai dengan PIN atau kod QR dari telefon mereka.'),
    !store.dalamTalian ? el('p.notis', {}, 'Mod luar talian: pemain hanya boleh sertai dari tab lain dalam pelayar yang sama (sesuai untuk demo). Sambungkan Firebase untuk kelas sebenar.') : null,
    el('label', { for: 'hUnit' }, 'Unit'),
    el('select#hUnit', { name: 'unit' }, el('option', { value: 0 }, 'Semua unit (campuran)'), ...UNIT.slice(1).map(u => el('option', { value: u.n, selected: u.n === tetap.unit }, `${namaUnit(u.n)}: ${u.tajuk}`))),
    radio('set', 'Set soalan', [['sim', 'SIM KPP3023'], ['final', finalAda ? 'Final A261' : 'Final A261 (belum diisi)', !finalAda]]),
    radio('bil', 'Bilangan soalan', [[5, '5'], [10, '10'], [15, '15'], [20, '20']]),
    radio('masa', 'Masa setiap soalan', [[15, '15 saat'], [20, '20 saat'], [30, '30 saat']]),
    el('div.tindakan', {}, el('button.btn.utama.besar', { type: 'submit' }, 'Cipta bilik'), el('a.btn', { href: '#/' }, 'Kembali')),
  );
  borang.addEventListener('submit', async e => {
    e.preventDefault();
    const d = new FormData(borang);
    const t = { set: d.get('set'), unit: Number(d.get('unit')), bil: Number(d.get('bil')), masa: Number(d.get('masa')) };
    simpan.set('tetapanHos', t);
    let bank = await ambilBank(t.set);
    if (t.unit) bank = bank.filter(x => x.unit === t.unit);
    if (!bank.length) { toast('Tiada soalan untuk pilihan ini.', 'amaran'); return; }
    // Pastikan ada pusingan Arena O/X (kira-kira 1 daripada 5 soalan) jika set mempunyai soalan Betul/Salah
    const ox = shuffle(bank.filter(x => x.jenis === 'bs')), lain = shuffle(bank.filter(x => x.jenis !== 'bs'));
    const bilOX = Math.min(ox.length, Math.max(1, Math.round(t.bil / 5)));
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
  document.body.dataset.laluan = 'hos-main';
  const pentas = el('div.pentas-hos');
  const dunia = el('div.dunia-arena', { role: 'img', 'aria-label': 'Arena 3D: avatar pemain bergerak ke zon jawapan pilihan mereka' });
  const atas = el('div.hos-atas');
  const tengah = el('div.hos-tengah');
  const bawah = el('div.hos-bawah');
  pentas.append(dunia, atas, tengah, bawah);
  app.append(pentas);
  const A = await buatArena(dunia);
  tambahPembersih(() => A.buang());

  let pemain = {}, jawapanSemasa = {}, skor = {}, state = { fasa: 'lobi', indeks: -1, siri: 0 };
  let unJawapan = null, pemasa = null, tamatMs = 0;
  const senaraiPemain = () => Object.entries(pemain).map(([uid, p]) => ({ uid, ...p }));

  tambahPembersih(store.pantauPemain(pin, v => {
    const sebelum = Object.keys(pemain).length;
    pemain = v || {};
    A.setPemain(senaraiPemain());
    if (Object.keys(pemain).length > sebelum) bunyi.sertai();
    if (state.fasa === 'lobi') lukisLobi(); else lukisKiraan();
  }));
  tambahPembersih(() => { unJawapan?.(); cancelAnimationFrame(pemasa); });

  const kekunci = e => { if ((e.key === 'Enter' || e.key === ' ') && !e.target.matches('input, textarea, select, button')) { e.preventDefault(); $('.btn-hos-utama', bawah)?.click(); } };
  addEventListener('keydown', kekunci);
  tambahPembersih(() => removeEventListener('keydown', kekunci));

  const skrinPenuh = el('button.btn.kecil', { type: 'button', onclick: () => document.fullscreenElement ? document.exitFullscreen() : pentas.requestFullscreen?.() }, 'Skrin penuh');

  async function setState(s) { state = { ...s, siri: (state.siri || 0) + 1 }; await store.setState(pin, state); }

  // ---------- Lobi ----------
  function lukisLobi() {
    const bil = Object.keys(pemain).length;
    ganti(atas, el('div.pin-kad', {},
      el('span', {}, 'Sertai di ', el('b', {}, location.host || 'pelayar ini'), ' dengan PIN'),
      el('b.pin', { 'aria-label': 'PIN ' + pin.split('').join(' ') }, pin.slice(0, 3) + ' ' + pin.slice(3)),
      el('div.qr#qr', { 'aria-label': 'Kod QR untuk sertai' })));
    ganti(tengah, el('div.lobi-senarai', {},
      el('h2', {}, bil ? `${bil} pemain dalam arena` : 'Menunggu pemain…'),
      el('div.chip-baris', {}, ...senaraiPemain().map(p => el('button.chip-pemain', { type: 'button', style: { '--w': p.warna }, title: 'Klik untuk keluarkan pemain', onclick: () => { if (confirm(`Keluarkan ${p.nama}?`)) store.buangPemain(pin, p.uid); } }, p.avatar, ' ', p.nama)))));
    ganti(bawah, el('span.kecil', {}, `${ctx.SET[t.set]?.nama || ''}: ${soalan.length} soalan, ${t.masa} saat setiap soalan`),
      el('span.tindakan', {}, skrinPenuh,
        el('button.btn.kecil', { type: 'button', onclick: async () => { await navigator.clipboard?.writeText(urlSertai(pin)); toast('Pautan sertai disalin.'); } }, 'Salin pautan'),
        el('button.btn.utama.besar.btn-hos-utama', { type: 'button', disabled: !bil, onclick: () => mulaSoalan(0) }, 'Mula permainan')));
    const qr = $('#qr');
    if (qr && window.QRCode) { ganti(qr); new window.QRCode(qr, { text: urlSertai(pin), width: 132, height: 132, colorDark: '#0E2A47', colorLight: '#ffffff' }); }
  }

  // ---------- Soalan ----------
  async function mulaSoalan(i) {
    const q = soalan[i];
    jawapanSemasa = {};
    A.resetZon(); A.susunZon(q.jenis === 'bs' ? 2 : 4, q.jenis === 'bs' ? ['Betul', 'Salah'] : null);
    await setState({ fasa: 'soalan', indeks: i, kunci: String(i), masa: t.masa, mula: store.masa() });
    unJawapan?.();
    unJawapan = store.pantauJawapan(pin, i, v => {
      jawapanSemasa = v || {};
      for (const [uid, j] of Object.entries(jawapanSemasa)) A.letak(uid, j.pilih);
      lukisKiraan();
      const bil = Object.keys(pemain).length;
      if (q.jenis !== 'bs' && bil && Object.keys(jawapanSemasa).filter(u => pemain[u]).length >= bil) dedah();
    });
    tamatMs = performance.now() + t.masa * 1000;
    ganti(atas, el('div.soalan-hos', {},
      el('div.kad-atas', {}, el('span.cip', { style: { '--w': UNIT[q.unit]?.warna } }, namaUnit(q.unit), ' ', UNIT[q.unit]?.ringkas || ''), el('span.cip.jenis', {}, `Soalan ${i + 1}/${soalan.length}`),
        q.jenis === 'bs' ? el('span.cip.jenis', {}, 'Arena O/X: pindah zon sebelum masa tamat') : null),
      q.senario ? el('p.senario', {}, q.senario) : null,
      el('h2', {}, q.soalan),
      q.jenis === 'bs' ? null : el('ol.legenda-jawapan', {}, ...q.pilihan.map((p, k) => el('li', { style: { '--w': ['#E8483B', '#2F6FE4', '#F2A900', '#1E9E62'][k] } }, el('span.bentuk', {}, BENTUK[k]), p)))));
    ganti(tengah);
    let detikAkhir = null;
    const detik = () => {
      const baki = tamatMs - performance.now();
      const p = $('.pemasa', bawah);
      if (p) { p.style.setProperty('--p', Math.max(0, baki) / (t.masa * 1000)); $('b', p).textContent = Math.max(0, Math.ceil(baki / 1000)); }
      const s = Math.ceil(baki / 1000); if (s <= 5 && s > 0 && s !== detikAkhir) { detikAkhir = s; bunyi.detik(); }
      if (baki <= 0) return dedah();
      pemasa = requestAnimationFrame(detik);
    };
    lukisKiraan();
    pemasa = requestAnimationFrame(detik);
  }

  function lukisKiraan() {
    if (state.fasa !== 'soalan') return;
    const bil = Object.keys(pemain).length, jawab = Object.keys(jawapanSemasa).filter(u => pemain[u]).length;
    ganti(bawah, 
      el('span.pemasa.besar', { role: 'timer', style: { '--p': Math.max(0, tamatMs - performance.now()) / (t.masa * 1000) } }, el('b', {}, Math.max(0, Math.ceil((tamatMs - performance.now()) / 1000)))),
      el('span.kiraan', {}, el('b', {}, `${jawab}/${bil}`), ' sudah menjawab'),
      el('span.tindakan', {}, skrinPenuh, el('button.btn.utama.btn-hos-utama', { type: 'button', onclick: () => dedah() }, 'Dedah jawapan')));
  }

  // ---------- Dedah ----------
  let sedangDedah = false;
  async function dedah() {
    if (state.fasa !== 'soalan' || sedangDedah) return;
    sedangDedah = true;
    cancelAnimationFrame(pemasa); unJawapan?.(); unJawapan = null;
    const i = state.indeks, q = soalan[i];
    const taburan = q.pilihan.map(() => 0);
    const baru = { ...skor };
    for (const uid of Object.keys(pemain)) {
      const j = jawapanSemasa[uid];
      const s = baru[uid] || { jumlah: 0, betul: 0, streak: 0, nama: pemain[uid].nama, avatar: pemain[uid].avatar, warna: pemain[uid].warna, rekod: [] };
      const betul = j && j.pilih === q.jawapan;
      if (j && j.pilih >= 0 && j.pilih < taburan.length) taburan[j.pilih]++;
      s.streak = betul ? s.streak + 1 : 0;
      const mata = kiraMata({ betul, ms: j?.ms ?? t.masa * 1000, masaS: t.masa, streak: s.streak });
      s.jumlah += mata; if (betul) s.betul++;
      s.akhir = { betul: !!betul, mata, pilih: j ? j.pilih : -1 };
      s.rekod = [...(s.rekod || []), betul ? 1 : 0];
      Object.assign(s, { nama: pemain[uid].nama, avatar: pemain[uid].avatar, warna: pemain[uid].warna, kumpulan: pemain[uid].kumpulan || '', matrik: pemain[uid].matrik || '' });
      baru[uid] = s;
    }
    skor = baru;
    await store.setSkor(pin, skor);
    await setState({ fasa: 'dedah', indeks: i, kunci: String(i), jawapan: q.jawapan, taburan });
    A.dedah(q.jawapan);
    bunyi.betul();
    const maks = Math.max(1, ...taburan);
    ganti(tengah, el('div.dedah-kad', {},
      el('b.maklum-tajuk', {}, 'Jawapan: ', q.jenis === 'bs' ? (q.jawapan === 0 ? 'O, Betul' : 'X, Salah') : `${BENTUK[q.jawapan]} ${q.pilihan[q.jawapan]}`),
      el('p', {}, q.huraian),
      el('div.taburan', { role: 'img', 'aria-label': 'Taburan jawapan: ' + taburan.map((n, k) => `${q.jenis === 'bs' ? (k ? 'X' : 'O') : BENTUK[k]} ${n}`).join(', ') },
        ...taburan.map((n, k) => el('div.tab-bar' + (k === q.jawapan ? '.betul' : ''), { style: { '--w': q.jenis === 'bs' ? (k ? '#E8483B' : '#2F6FE4') : ['#E8483B', '#2F6FE4', '#F2A900', '#1E9E62'][k], '--h': n / maks } },
          el('i'), el('span', {}, `${q.jenis === 'bs' ? (k ? 'X' : 'O') : BENTUK[k]} ${n}`))))));
    ganti(bawah, el('span'), el('span.tindakan', {}, skrinPenuh, el('button.btn.utama.besar.btn-hos-utama', { type: 'button', onclick: papan }, 'Papan markah')));
    sedangDedah = false;
  }

  const kedudukan = () => Object.entries(skor).map(([uid, s]) => ({ uid, ...s })).filter(s => pemain[s.uid] || s.jumlah).sort((a, b) => b.jumlah - a.jumlah);

  // ---------- Papan markah ----------
  async function papan() {
    const i = state.indeks, akhir = i + 1 >= soalan.length;
    await setState({ fasa: 'papan', indeks: i, kunci: String(i) });
    const k = kedudukan().slice(0, 5);
    ganti(tengah, el('div.papan-hos', {}, el('h2', {}, 'Lima teratas'),
      el('ol.papan', {}, ...k.map((s, n) => el('li' + (n < 3 ? '.atas' + (n + 1) : ''), {},
        el('span.kedudukan', {}, n < 3 ? ['🥇', '🥈', '🥉'][n] : n + 1), el('span.av', { style: { background: s.warna } }, s.avatar),
        el('span.nama', {}, s.nama, el('small', {}, s.streak >= 3 ? `🔥 streak ${s.streak}` : '')), el('b.mata', {}, s.jumlah.toLocaleString('ms-MY')))))));
    ganti(bawah, el('span'), el('span.tindakan', {}, skrinPenuh,
      el('button.btn.utama.besar.btn-hos-utama', { type: 'button', onclick: () => akhir ? tamat() : mulaSoalan(i + 1) }, akhir ? 'Keputusan akhir' : 'Soalan seterusnya')));
  }

  // ---------- Tamat ----------
  async function tamat() {
    await setState({ fasa: 'tamat', indeks: state.indeks, kunci: String(state.indeks) });
    const k = kedudukan();
    ganti(atas, el('h1.tajuk-podium', {}, 'Juara Arena'));
    A.susunPodium(k.slice(0, 3).map(s => ({ nama: s.nama, avatar: s.avatar, warna: s.warna, skor: s.jumlah })));
    konfeti(4000); bunyi.menang();
    ganti(tengah, el('div.papan-hos.akhir', {}, el('ol.papan', {}, ...k.map((s, n) => el('li' + (n < 3 ? '.atas' + (n + 1) : ''), {},
      el('span.kedudukan', {}, n < 3 ? ['🥇', '🥈', '🥉'][n] : n + 1), el('span.av', { style: { background: s.warna } }, s.avatar),
      el('span.nama', {}, s.nama, el('small', {}, `${s.betul}/${soalan.length} betul`)), el('b.mata', {}, s.jumlah.toLocaleString('ms-MY')))))));
    ganti(bawah, el('span'), el('span.tindakan', {}, skrinPenuh,
      el('button.btn', { type: 'button', onclick: () => {
        const kepala = ['Kedudukan', 'Nama', 'No. matrik', 'Kumpulan', 'Skor', 'Betul', 'Jumlah soalan', ...soalan.map((_, n) => `S${n + 1}`)];
        muatTurun(`keputusan-arena-${pin}.csv`, keCSV([kepala, ...k.map((s, n) => [n + 1, s.nama, s.matrik, s.kumpulan, s.jumlah, s.betul, soalan.length, ...soalan.map((_, m) => s.rekod?.[m] ?? '')])]));
      } }, 'Eksport CSV'),
      el('a.btn', { href: '#/hos' }, 'Permainan baharu'),
      el('a.btn.utama.btn-hos-utama', { href: '#/' }, 'Tutup')));
  }

  lukisLobi();
  // Kod QR mungkin dimuat selepas ini
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
    el('input#jPin.input-pin', { inputmode: 'numeric', pattern: '[0-9]{6}', maxlength: 7, autocomplete: 'off', value: pinAwal, required: true, placeholder: '000000' }),
    el('p.ralat#jRalat', { role: 'alert' }),
    el('div.tindakan', {}, el('button.btn.utama.besar', { type: 'submit' }, 'Sertai'), el('a.btn', { href: '#/profil' }, 'Tukar profil')),
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
  const { store, profil, stat, simpanStat, tambahPembersih, beriLencana } = ctx;
  const p = profil();
  await store.sertaiBilik(pin, { nama: p.nama, avatar: p.avatar, warna: p.warna, kumpulan: p.kumpulan, matrik: p.matrik || '' });
  ganti(app);
  document.body.dataset.laluan = 'pemain';
  const skrin = el('section.skrin-pemain');
  app.append(skrin);
  const soalan = bilik.soalan || [];
  const masaS = bilik.tetapan?.masa || 20;
  let state = null, skor = null, terimaMs = 0, pilihSaya = null, dalamBilik = true, siriLepas = -1, selesai = false, bunyiSiri = -1;

  const kepala = () => el('div.pemain-atas', {}, el('span.av', { style: { background: p.warna } }, p.avatar), el('b', {}, p.nama),
    el('span.kecil', {}, `PIN ${pin}`), el('b.mata', {}, `${skor?.[store.uidBilik]?.jumlah ?? 0} mata`));

  tambahPembersih(store.pantauSkor(pin, v => { skor = v; if (state && state.fasa !== 'soalan') lukis(); }));
  tambahPembersih(store.pantauPemain(pin, v => {
    if (dalamBilik && v && !v[store.uidBilik] && state?.fasa !== 'tamat') { dalamBilik = false; ganti(skrin, el('div.kad', {}, el('h2', {}, 'Anda telah dikeluarkan daripada bilik.'), el('a.btn', { href: '#/sertai' }, 'Sertai semula'))); }
  }));
  tambahPembersih(store.pantauState(pin, s => {
    if (!s || !dalamBilik) return;
    if (s.siri === siriLepas) return;
    siriLepas = s.siri;
    if (s.fasa === 'soalan' && state?.indeks !== s.indeks) { terimaMs = performance.now(); pilihSaya = null; }
    if (s.fasa === 'soalan' && state?.fasa !== 'soalan') { terimaMs = performance.now(); pilihSaya = null; }
    state = s;
    lukis();
  }));
  let pemasa = null;
  tambahPembersih(() => cancelAnimationFrame(pemasa));

  function kedudukanSaya() {
    const k = Object.entries(skor || {}).sort((a, b) => b[1].jumlah - a[1].jumlah);
    const n = k.findIndex(([u]) => u === store.uidBilik);
    return n < 0 ? null : { n: n + 1, dari: k.length };
  }

  function lukis() {
    cancelAnimationFrame(pemasa);
    if (!state) return;
    const s = skor?.[store.uidBilik];
    if (state.fasa === 'lobi') {
      ganti(skrin, kepala(), el('div.pemain-tengah', {}, el('span.av.gergasi', { style: { background: p.warna } }, p.avatar),
        el('h2', {}, 'Anda dalam arena!'), el('p', {}, 'Cari avatar anda di skrin pensyarah. Permainan bermula sebentar lagi.'),
        el('button.btn', { type: 'button', onclick: async () => { await store.keluarBilik(pin); location.hash = '#/'; } }, 'Keluar bilik')));
      return;
    }
    if (state.fasa === 'soalan') {
      const q = soalan[state.indeks]; if (!q) return;
      const bs = q.jenis === 'bs';
      const kunci = !bs && pilihSaya != null;
      ganti(skrin, kepala(),
        el('div.pemain-soalan', {},
          el('div.kad-atas', {}, el('span.cip.jenis', {}, `Soalan ${state.indeks + 1}/${soalan.length}`), el('span.pemasa', { role: 'timer' }, el('b', {}, masaS))),
          q.senario ? el('p.senario', {}, q.senario) : null,
          el('p.teks-soalan', {}, q.soalan),
          bs ? el('p.kecil', {}, 'Arena O/X: anda boleh tukar zon sehingga masa tamat.') : null),
        el('div.jawapan-grid.pemain' + (bs ? '.ox' : ''), {}, ...q.pilihan.map((t, i) => el('button.jawapan' + (pilihSaya === i ? '.dipilih' : ''), {
          type: 'button', disabled: kunci && pilihSaya !== i, 'data-i': i, 'data-k': bs ? (i ? 'X' : 'O') : i,
          onclick: async () => {
            if (kunci || (bs && pilihSaya === i)) return;
            const ms = Math.round(performance.now() - terimaMs);
            if (ms > masaS * 1000 + 1500) { toast('Masa sudah tamat.'); return; }
            pilihSaya = i; bunyi.klik();
            try { await store.hantarJawapan(pin, state.indeks, i, ms); } catch { toast('Jawapan tidak dihantar. Masa mungkin sudah tamat.', 'amaran'); }
            lukis();
          } }, el('span.bentuk', { 'aria-hidden': 'true' }, bs ? (i ? 'X' : 'O') : BENTUK[i]), el('span.teks', {}, t)))),
        kunci ? el('p.notis', { role: 'status' }, 'Jawapan dihantar. Tunggu pensyarah mendedahkan jawapan.') : null,
      );
      const detik = () => {
        const baki = masaS * 1000 - (performance.now() - terimaMs);
        const b = $('.pemasa b', skrin); if (b) b.textContent = Math.max(0, Math.ceil(baki / 1000));
        if (baki > 0) pemasa = requestAnimationFrame(detik);
      };
      detik();
      return;
    }
    if (state.fasa === 'dedah') {
      const a = s?.akhir;
      const q = soalan[state.indeks];
      if (a && bunyiSiri !== state.siri) { bunyiSiri = state.siri; if (a.betul) bunyi.betul(); else bunyi.salah(); }
      ganti(skrin, kepala(), el('div.pemain-tengah.' + (a?.betul ? 'ya' : 'tidak'), {},
        el('span.besar-ikon', { 'aria-hidden': 'true' }, a?.betul ? '✅' : a?.pilih === -1 ? '⏰' : '❌'),
        el('h2', {}, a?.betul ? `Betul! +${a.mata}` : a?.pilih === -1 ? 'Tiada jawapan' : 'Belum tepat'),
        q ? el('p', {}, 'Jawapan: ', el('b', {}, q.pilihan[state.jawapan])) : null,
        s?.streak >= 2 ? el('p', {}, `🔥 Streak ${s.streak}`) : null));
      return;
    }
    if (state.fasa === 'papan') {
      const k = kedudukanSaya();
      ganti(skrin, kepala(), el('div.pemain-tengah', {}, el('span.besar-ikon', { 'aria-hidden': 'true' }, k?.n === 1 ? '🥇' : k?.n === 2 ? '🥈' : k?.n === 3 ? '🥉' : '🏁'),
        el('h2', {}, k ? `Kedudukan ${k.n} daripada ${k.dari}` : 'Menunggu…'), el('p', {}, `${s?.jumlah ?? 0} mata`)));
      return;
    }
    if (state.fasa === 'tamat') {
      const k = kedudukanSaya();
      ganti(skrin, kepala(), el('div.pemain-tengah', {}, el('span.besar-ikon', { 'aria-hidden': 'true' }, k?.n === 1 ? '🏆' : '🎉'),
        el('h2', {}, k ? `Tamat! Kedudukan ${k.n} daripada ${k.dari}` : 'Permainan tamat'),
        el('p', {}, `${s?.jumlah ?? 0} mata, ${s?.betul ?? 0}/${soalan.length} betul`),
        el('div.tindakan', {}, el('a.btn.utama', { href: '#/' }, 'Ke peta pulau'), el('a.btn', { href: '#/papan?s=langsung' }, 'Leaderboard'))));
      if (!selesai && s) {
        selesai = true;
        const kunciSimpan = 'arena.selesai.' + pin;
        if (!sessionStorage.getItem(kunciSimpan)) {
          sessionStorage.setItem(kunciSimpan, '1');
          const st = stat(), baru = [];
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
}
