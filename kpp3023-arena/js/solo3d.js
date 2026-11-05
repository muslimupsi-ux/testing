// Mod solo gaya ZEP Quiz: gerakkan avatar ke zon jawapan sebelum masa tamat, bersama rakan bot.
import { $, el, ganti, shuffle, kiraMata, bunyi, toast } from './util.js';
import { arenaKuiz, buatJoystick } from './dunia3d.js';
import { kadSoalanHUD, cincinMasa, teksJawapan } from './hud.js';

const BOT = [
  ['Aiman', '🦊', '#FF7A45'], ['Mei Ling', '🐼', '#9B5DE5'], ['Kavitha', '🦉', '#18A999'], ['Hafiz', '🐯', '#E8483B'],
  ['Siti', '🐰', '#F25F8B'], ['Daniel', '🐸', '#22B573'], ['Nurul', '🐨', '#3D7BFF'],
];
const EMOTE = ['👋', '😄', '😮', '👍', '🔥'];

export async function mulaArenaSolo(app, ctx, soalan, t) {
  const { profil, simpanKeputusan, tambahPembersih, navigate } = ctx;
  const p = profil();
  ganti(app);
  document.body.dataset.laluan = 'arena';
  const dunia = el('div.dunia-arena');
  const hudAtas = el('div.hud-atas');
  const stat = el('div.hud-stat');
  const sepanduk = el('div.sepanduk', { 'aria-live': 'assertive' });
  const panel = el('div.panel-dedah');
  const kawalan = el('div.kawalan-arena');
  const keluar = el('button.btn.kecil.btn-keluar', { type: 'button', onclick: () => navigate('#/') }, 'Laman utama');
  const pentas = el('section.pentas-arena', { 'aria-label': 'Arena kuiz' }, dunia, hudAtas, stat, sepanduk, panel, kawalan, keluar);
  app.append(pentas);

  const UID = 'saya';
  let zonSemasa = -1, masukMs = null, mulaMs = 0;
  const A = arenaKuiz(dunia, {
    pandangan: 'pemain', uidSaya: UID,
    onZon: z => { zonSemasa = z; masukMs = z >= 0 ? performance.now() - mulaMs : null; if (z >= 0 && fasa === 'soalan') bunyi.klik(); lukisStat(); },
  });
  tambahPembersih(() => A.buang());

  const bot = shuffle(BOT).slice(0, 6).map(([nama, avatar, warna], k) => ({ uid: 'bot' + k, nama: 'Bot ' + nama, avatar, warna, tepat: 0.45 + Math.random() * 0.35, skor: 0 }));
  A.setPemain([{ uid: UID, nama: p.nama, avatar: p.avatar, warna: p.warna, x: 0, z: 3 }, ...bot]);

  const st = { i: 0, skor: 0, betul: 0, streak: 0, streakMaks: 0, nyawa: t.mod === 'cabaran' ? 3 : Infinity, pantas: 0, rekod: [], kuasa: { '5050': true, masa: true, ganda: true }, ganda: false };
  let fasa = 'lobi', tamatMs = 0, raf = null, pemasaBot = [];
  tambahPembersih(() => { cancelAnimationFrame(raf); pemasaBot.forEach(clearTimeout); });

  // ---------- Kawalan ----------
  const sentuh = matchMedia('(pointer: coarse)').matches;
  if (sentuh) buatJoystick(kawalan, (x, z) => A.setInput(x, z));
  const butangKunci = el('button.btn.utama.btn-kunci', { type: 'button', onclick: () => kunciAwal() }, 'Kunci jawapan');
  const butangKuasa = el('div.kuasa-arena');
  kawalan.append(el('div.butang-kanan', {},
    butangKuasa,
    el('div.baris-emote', {}, ...EMOTE.slice(0, sentuh || innerWidth < 760 ? 3 : 5).map(e => el('button.btn-emote', { type: 'button', 'aria-label': 'Emote ' + e, onclick: () => A.emote(UID, e) }, e)),
      el('button.btn-emote', { type: 'button', 'aria-label': 'Lompat', onclick: () => A.lompat() }, '⤒')),
    butangKunci));

  const kekunci = e => {
    if (e.target.matches?.('input, textarea, select')) return;
    if (fasa === 'soalan') {
      const q = soalan[st.i];
      const n = q.jenis === 'bs' ? { o: 0, x: 1, 1: 0, 2: 1 }[e.key.toLowerCase()] : { 1: 0, 2: 1, 3: 2, 4: 3 }[e.key];
      if (n != null) A.pergiKeZon(n);
      if (e.key === 'Enter') kunciAwal();
    } else if (fasa === 'dedah' && e.key === 'Enter') $('.btn-teruskan', panel)?.click();
  };
  addEventListener('keydown', kekunci);
  tambahPembersih(() => removeEventListener('keydown', kekunci));

  function kedudukanSaya() { const semua = [st.skor, ...bot.map(b => b.skor)].sort((a, b) => b - a); return semua.indexOf(st.skor) + 1; }

  function lukisStat() {
    const baki = tamatMs - performance.now();
    ganti(stat,
      fasa === 'soalan' ? cincinMasa(baki, t.masa) : null,
      el('span.hud-item.skor', {}, `${st.skor} mata`),
      el('span.hud-item', {}, `🔥 ${st.streak}`),
      el('span.hud-item', { title: 'Kedudukan berbanding bot' }, `#${kedudukanSaya()}/${bot.length + 1}`),
      Number.isFinite(st.nyawa) ? el('span.hud-item', { 'aria-label': `${st.nyawa} nyawa` }, '❤️'.repeat(Math.max(0, st.nyawa)) + '🤍'.repeat(3 - Math.max(0, st.nyawa))) : null,
    );
    butangKunci.disabled = fasa !== 'soalan' || zonSemasa < 0;
  }
  function lukisKuasa() {
    const q = soalan[st.i], aktif = fasa === 'soalan';
    ganti(butangKuasa,
      el('button.btn.kecil', { type: 'button', disabled: !st.kuasa['5050'] || q?.jenis === 'bs' || !aktif, title: 'Runtuhkan dua zon salah', onclick: () => {
        st.kuasa['5050'] = false;
        const salah = shuffle([0, 1, 2, 3].filter(i => i !== q.jawapan && i !== zonSemasa)).slice(0, 2);
        A.runtuhZon(salah); bunyi.klik(); lukisKuasa();
        for (const b of bot) if (salah.includes(b.pilih)) b.pilih = -1;
      } }, '50:50'),
      el('button.btn.kecil', { type: 'button', disabled: !st.kuasa.masa || !aktif, onclick: () => { st.kuasa.masa = false; tamatMs += 10000; bunyi.klik(); lukisKuasa(); } }, '+10 s'),
      el('button.btn.kecil', { type: 'button', disabled: !st.kuasa.ganda || !aktif, 'aria-pressed': st.ganda, onclick: () => { st.kuasa.ganda = false; st.ganda = true; bunyi.klik(); lukisKuasa(); toast('Gandaan x2 aktif untuk soalan ini.'); } }, 'x2'),
    );
  }
  function papanTanda(teks, kelas = '', lama = 1200) {
    ganti(sepanduk, el('div.sepanduk-isi' + (kelas ? '.' + kelas : ''), {}, teks));
    if (lama) setTimeout(() => { if (sepanduk.textContent === String(teks)) ganti(sepanduk); }, lama);
  }

  // ---------- Bot ----------
  function botLobi() {
    for (const b of bot) { const tt = A.titikLobi(); A.setSasaran(b.uid, tt.x, tt.z); }
    pemasaBot.push(setTimeout(() => { if (fasa === 'lobi') botLobi(); }, 1800 + Math.random() * 1500));
  }
  function botSoalan(q) {
    const n = q.jenis === 'bs' ? 2 : 4;
    for (const b of bot) {
      b.pilih = null; b.ms = null;
      const pilihZon = () => (Math.random() < b.tepat ? q.jawapan : shuffle([...Array(n).keys()].filter(k => k !== q.jawapan))[0]);
      const pergi = z => { if (fasa !== 'soalan') return; b.pilih = z; b.ms = performance.now() - mulaMs; const tt = A.titikDalamZon(z); A.setSasaran(b.uid, tt.x, tt.z); };
      pemasaBot.push(setTimeout(() => pergi(pilihZon()), 700 + Math.random() * 5000));
      if (Math.random() < 0.3) pemasaBot.push(setTimeout(() => pergi(pilihZon()), (t.masa * 1000) * (0.45 + Math.random() * 0.3)));
    }
  }

  // ---------- Pusingan ----------
  function soalanBaru() {
    pemasaBot.forEach(clearTimeout); pemasaBot = [];
    const q = soalan[st.i];
    A.pulih(); A.setKunci(false);
    A.susunZon(q.jenis === 'bs' ? 2 : 4);
    st.ganda = false; zonSemasa = A.zonPemain(UID); masukMs = null;
    ganti(panel);
    ganti(hudAtas, kadSoalanHUD(q, st.i, soalan.length));
    fasa = 'soalan';
    mulaMs = performance.now(); tamatMs = mulaMs + t.masa * 1000;
    botSoalan(q);
    lukisKuasa(); lukisStat();
    papanTanda(q.jenis === 'bs' ? 'O atau X?' : 'Lari ke zon jawapan!', '', 1300);
    let detikAkhir = null;
    const detik = () => {
      if (fasa !== 'soalan') return;
      const baki = tamatMs - performance.now();
      const pm = $('.pemasa', stat);
      if (pm) { pm.style.setProperty('--p', Math.max(0, baki) / (t.masa * 1000)); $('b', pm).textContent = Math.max(0, Math.ceil(baki / 1000)); }
      const s = Math.ceil(baki / 1000);
      if (s <= 5 && s > 0 && s !== detikAkhir) { detikAkhir = s; bunyi.detik(); papanTanda(String(s), 'kira', 900); }
      if (baki <= 0) return tamatSoalan();
      raf = requestAnimationFrame(detik);
    };
    raf = requestAnimationFrame(detik);
  }

  function kunciAwal() {
    if (fasa !== 'soalan' || zonSemasa < 0) return;
    tamatMs = performance.now();
  }

  function tamatSoalan() {
    fasa = 'dedah';
    cancelAnimationFrame(raf); pemasaBot.forEach(clearTimeout); pemasaBot = [];
    A.setKunci(true);
    const q = soalan[st.i];
    const pilih = A.zonPemain(UID);
    papanTanda('Masa tamat!', '', 700);
    lukisStat(); lukisKuasa();
    setTimeout(() => {
      const jatuh = A.dedah(q.jawapan);
      const betul = pilih === q.jawapan && !jatuh.includes(UID);
      const ms = masukMs ?? t.masa * 1000;
      if (betul) { st.streak++; st.betul++; if (ms < 4000) st.pantas++; } else { st.streak = 0; if (Number.isFinite(st.nyawa)) st.nyawa--; }
      st.streakMaks = Math.max(st.streakMaks, st.streak);
      const mata = kiraMata({ betul, ms, masaS: t.masa, streak: st.streak, ganda: st.ganda });
      st.skor += mata;
      st.rekod.push({ id: q.id, unit: q.unit, betul, pilih });
      for (const b of bot) { const bb = A.zonPemain(b.uid) === q.jawapan; b.streak = bb ? (b.streak || 0) + 1 : 0; b.skor += kiraMata({ betul: bb, ms: b.ms ?? t.masa * 1000, masaS: t.masa, streak: b.streak }); }
      if (betul) { bunyi.betul(); A.emote(UID, '🎉'); } else bunyi.salah();
      lukisStat();
      const akhir = st.i + 1 >= soalan.length || st.nyawa <= 0;
      const jwp = teksJawapan(q);
      ganti(panel, el('div.dedah-kad.' + (betul ? 'ya' : 'tidak'), {},
        el('b.maklum-tajuk', {}, betul ? `Betul! +${mata}` : pilih === -1 ? 'Anda tiada di mana-mana zon' : 'Splash! Jawapan salah'),
        el('p', {}, 'Jawapan: ', el('b', {}, jwp)),
        el('p.huraian', {}, q.huraian),
        el('div.tindakan', {},
          el('button.btn.utama.btn-teruskan', { type: 'button', onclick: () => { if (akhir) selesai(); else { st.i++; soalanBaru(); } } },
            akhir ? (st.nyawa <= 0 ? 'Nyawa habis: lihat keputusan' : 'Lihat keputusan') : 'Soalan seterusnya'),
          el('button.btn.btn-laman-utama', { type: 'button', onclick: () => navigate('#/') }, 'Laman utama'))));
      setTimeout(() => $('.btn-teruskan', panel)?.focus({ preventScroll: true }), 50);
    }, 650);
  }

  function selesai() {
    fasa = 'tamat';
    simpanKeputusan(st, t, soalan.length, { kedudukan: kedudukanSaya(), bilPemain: bot.length + 1 });
  }

  // ---------- Mula ----------
  ganti(hudAtas, el('div.hud-soalan.hud-mula', {},
    el('h2.hud-teks', {}, 'Bersedia!'),
    el('p', {}, sentuh ? 'Gerak dengan joystick atau ketik lantai. Berdiri di zon jawapan sebelum masa tamat.' : 'Gerak dengan anak panah atau WASD, atau klik lantai. Berdiri di zon jawapan sebelum masa tamat. Tekan 1 hingga 4 (atau O dan X) untuk berjalan terus ke zon.')));
  lukisStat(); lukisKuasa();
  botLobi();
  const mulaBtn = el('button.btn.utama.besar', { type: 'button', onclick: () => { bunyi.klik(); soalanBaru(); } }, 'Mula');
  ganti(panel, el('div.dedah-kad', {}, el('p', {}, `${soalan.length} soalan. ${Number.isFinite(st.nyawa) ? 'Mod Cabaran: 3 nyawa. ' : ''}Anda bermain bersama ${bot.length} rakan bot.`), mulaBtn));
  mulaBtn.focus({ preventScroll: true });
}
