// Arena Psikologi KPP3023: aplikasi utama (penghala, profil, solo, keputusan, papan, lencana, ulang kaji, premium, admin).
import {
  $, $$, el, ganti, shuffle, sediaSoalan, simpan, UNIT, namaUnit, AVATAR, WARNA, KUMPULAN, MASA_SOALAN,
  kiraMata, arasXP, xpUntukAras, bunyi, konfeti, toast, bolehWebGL, muatTurun, keCSV,
} from './util.js';
import { initStore } from './store.js';

const app = $('#app');
const TETAPAN = window.ARENA_TETAPAN || {};
let store;
let bersih = []; // fungsi pembersihan bagi paparan semasa (contohnya buang dunia 3D)

// ---------------------------------------------------------------------------
// Profil dan statistik pemain (disimpan dalam pelayar)
// ---------------------------------------------------------------------------
const profil = () => simpan.get('profil', null);
const statAsal = () => ({ xp: 0, permainan: 0, kemajuan: {}, lencana: [], kesilapan: {}, streakTerbaik: 0, unitTerakhir: 1 });
const stat = () => ({ ...statAsal(), ...simpan.get('stat', {}) });
const simpanStat = s => simpan.set('stat', s);

export const LENCANA = [
  { id: 'langkah-pertama', ikon: '🚣', nama: 'Langkah Pertama', syarat: 'Tamatkan pusingan pertama anda.' },
  { id: 'sempurna', ikon: '💎', nama: 'Pusingan Sempurna', syarat: 'Jawab semua soalan dengan betul dalam pusingan 10 soalan atau lebih.' },
  { id: 'streak-5', ikon: '🔥', nama: 'Streak 5', syarat: 'Lima jawapan betul berturut-turut.' },
  { id: 'streak-10', ikon: '☄️', nama: 'Streak 10', syarat: 'Sepuluh jawapan betul berturut-turut.' },
  { id: 'kilat', ikon: '⚡', nama: 'Pantas Kilat', syarat: 'Lima jawapan betul dalam masa kurang 4 saat setiap satu, dalam satu pusingan.' },
  { id: 'cabaran', ikon: '🛡️', nama: 'Tahan Lasak', syarat: 'Tamatkan Mod Cabaran tanpa kehilangan semua nyawa.' },
  { id: 'pemulih', ikon: '🩹', nama: 'Belajar daripada Silap', syarat: 'Betulkan 10 soalan daripada Buku Kesilapan.' },
  { id: 'juara-langsung', ikon: '🏆', nama: 'Juara Arena', syarat: 'Tempat pertama dalam permainan langsung.' },
  ...UNIT.slice(1).map(u => ({ id: 'unit-' + u.n, ikon: '🏝️', nama: u.lencana, syarat: `Skor 80% atau lebih dalam cabaran ${namaUnit(u.n)} (sekurang-kurangnya 8 soalan).` })),
  { id: 'penjelajah', ikon: '🧭', nama: 'Penjelajah Kepulauan', syarat: 'Kumpul lencana kesemua Unit 1 hingga 11.' },
];

export function beriLencana(s, id, baru) {
  if (!s.lencana.includes(id)) { s.lencana.push(id); baru.push(id); }
}

// ---------------------------------------------------------------------------
// Bank soalan
// ---------------------------------------------------------------------------
export const SET = {
  sim: { nama: 'Set KPP3023' },
  premium: { nama: 'Set Soalan Premium' },
};
export async function ambilBank(set) {
  if (set === 'premium') return await store.ambilPremium().catch(() => []);
  return window.SOALAN_SIM || [];
}
function semuaSoalanTempatan() { return [...(window.SOALAN_SIM || []), ...(simpan.get('premiumDemo', []) || [])]; }

// ---------------------------------------------------------------------------
// Penghala
// ---------------------------------------------------------------------------
const LALUAN = {
  '': paparUtama, profil: paparProfil, solo: paparSolo, kuiz: () => navigate('#/solo'), papan: paparPapan,
  lencana: paparLencana, ulangkaji: paparUlangkaji, premium: paparPremium, admin: paparAdmin,
  hos: (q) => import('./live.js').then(m => m.paparHos(app, konteks(), q)),
  sertai: (q) => import('./live.js').then(m => m.paparSertai(app, konteks(), q)),
};
function konteks() { return { store, profil, stat, simpanStat, ambilBank, SET, perluProfil, tambahPembersih: f => bersih.push(f), beriLencana, LENCANA }; }

export function navigate(hash) { if (location.hash === hash) route(); else location.hash = hash; }

async function route() {
  for (const f of bersih.splice(0)) { try { f(); } catch { /* abaikan */ } }
  const [laluan, qs] = (location.hash.replace(/^#\/?/, '') || '').split('?');
  const q = new URLSearchParams(qs || '');
  const fn = LALUAN[laluan] || paparUtama;
  ganti(app);
  document.body.dataset.laluan = laluan || 'utama';
  if (laluan !== 'sertai' && laluan !== 'profil' && !profil()) return paparProfil(q, true);
  await fn(q);
  app.focus({ preventScroll: true });
  scrollTo(0, 0);
}

function perluProfil(kembali) {
  if (profil()) return true;
  simpan.set('kembaliKe', kembali || location.hash);
  navigate('#/profil');
  return false;
}

// ---------------------------------------------------------------------------
// Bar atas
// ---------------------------------------------------------------------------
function kemasBar() {
  const p = profil(), s = stat();
  ganti($('#profilMini'), 
    p ? el('span.av', { style: { background: p.warna } }, p.avatar) : el('span.av', {}, '🙂'),
    p ? el('span.nm', {}, p.nama.split(' ')[0], el('small', {}, `Aras ${arasXP(s.xp)}`)) : el('span.nm', {}, 'Profil'),
  );
  const b = $('#btnBunyi'); b.textContent = bunyi.aktif ? '🔊' : '🔇'; b.setAttribute('aria-pressed', bunyi.aktif);
  const tema = simpan.get('tema', null);
  if (tema) document.documentElement.dataset.theme = tema; else delete document.documentElement.dataset.theme;
  $('#btnTema').textContent = document.documentElement.dataset.theme === 'light' ? '🌙' : (document.documentElement.dataset.theme === 'dark' ? '☀️' : '🌗');
  const st = $('#statusTalian');
  st.textContent = store?.dalamTalian ? 'Dalam talian' : 'Luar talian';
  st.className = 'status-talian ' + (store?.dalamTalian ? 'on' : 'off');
  st.title = store?.dalamTalian ? 'Disambung ke Firebase: leaderboard dan bilik langsung dikongsi.' : 'Mod luar talian: data disimpan dalam pelayar ini sahaja.';
}

// ---------------------------------------------------------------------------
// Laman utama
// ---------------------------------------------------------------------------
async function paparUtama() {
  const p = profil(), s = stat();
  const aras = arasXP(s.xp), bawah = xpUntukAras(aras), atas = xpUntukAras(aras + 1);
  const hero = el('section.hero-utama', { 'aria-labelledby': 'hT' });
  const dunia = el('div.dunia-latar', { 'aria-hidden': 'true' });
  hero.append(dunia,
    el('div.hero-isi', {},
      el('h1#hT', {}, 'Lari, lompat, jawab!'),
      el('p.lede', {}, 'Gerakkan avatar anda ke zon jawapan sebelum masa tamat. Salah zon? Lantai runtuh dan anda jatuh ke laut. Pilih pulau untuk bermula.'),
      el('div.kad-pemain', {},
        el('span.av.besar', { style: { background: p.warna } }, p.avatar),
        el('div', {},
          el('b', {}, p.nama), el('span.kecil', {}, `Kumpulan ${p.kumpulan}`),
          el('div.xp', { role: 'img', 'aria-label': `Aras ${aras}, ${s.xp} XP` },
            el('span.xp-label', {}, `Aras ${aras}`),
            el('span.xp-bar', {}, el('i', { style: { width: Math.round((s.xp - bawah) / (atas - bawah) * 100) + '%' } })),
            el('span.xp-label', {}, `${s.xp} XP`)),
        ),
      ),
    ),
  );
  const dok = el('nav.dok', { 'aria-label': 'Mod permainan' },
    kadMod('#/solo', '🏃', 'Main sekarang', 'Masuk arena bersama rakan bot.', 'utama'),
    kadMod('#/sertai', '📲', 'Sertai kelas', 'Masukkan PIN daripada skrin pensyarah.'),
    kadMod('#/hos', '🎤', 'Hos permainan', 'Paparkan di projektor, pelajar sertai dengan PIN.'),
    kadMod('#/papan', '🏆', 'Leaderboard', 'Kedudukan ikut kumpulan, unit dan minggu.'),
    kadMod('#/ulangkaji', '📒', 'Ulang kaji', 'Buku Kesilapan dan kad imbas setiap unit.'),
    kadMod('#/lencana', '🎖️', 'Lencana', `${s.lencana.length} daripada ${LENCANA.length} dikumpul.`),
    TETAPAN.premium?.aktif ? kadMod('#/premium', '⭐', 'Set Soalan Premium', 'Persediaan Pentaksiran Akhir.') : null,
  );
  app.append(hero, dok, el('p.kaki', {}, el('a', { href: '#/admin' }, 'Halaman pensyarah')));

  if (bolehWebGL()) {
    try {
      const { petaPulau } = await import('./dunia3d.js');
      const peta = petaPulau(dunia, { kemajuan: s.kemajuan, lencana: s.lencana, avatar: { warna: p.warna, emoji: p.avatar }, unitSemasa: s.unitTerakhir || 1, onPilih: n => navigate(`#/solo?unit=${n}`) });
      peta.pentas.kawalan.autoRotate = !matchMedia('(prefers-reduced-motion: reduce)').matches;
      peta.pentas.kawalan.autoRotateSpeed = 0.35;
      bersih.push(() => peta.buang());
      dunia.removeAttribute('aria-hidden');
      dunia.setAttribute('aria-label', 'Peta 3D Kepulauan Psikologi. Klik pulau untuk memulakan unit.');
    } catch (e) { console.warn('3D tidak dapat dimuatkan', e); dunia.classList.add('tiada3d'); }
  } else dunia.classList.add('tiada3d');
}

function kadMod(href, ikon, tajuk, ket, kelas = '') {
  return el('a.kad-mod' + (kelas ? '.' + kelas : ''), { href }, el('span.ikon', { 'aria-hidden': 'true' }, ikon), el('b', {}, tajuk), el('span', {}, ket));
}

// ---------------------------------------------------------------------------
// Profil
// ---------------------------------------------------------------------------
function paparProfil(q, wajib = false) {
  const p = profil() || { nama: '', matrik: '', kumpulan: 'AJ', avatar: AVATAR[Math.floor(Math.random() * AVATAR.length)], warna: WARNA[Math.floor(Math.random() * WARNA.length)] };
  let pilihAv = p.avatar, pilihWarna = p.warna;
  const pratonton = el('span.av.gergasi', { style: { background: pilihWarna } }, pilihAv);
  const borang = el('form.borang.kad', { novalidate: true },
    el('h1', {}, wajib ? 'Cipta watak anda' : 'Profil saya'),
    el('p.lede', {}, 'Nama dan avatar dipaparkan di leaderboard dan dalam arena langsung. No. matrik hanya dihantar kepada pensyarah dalam laporan permainan langsung.'),
    el('div.profil-grid', {},
      pratonton,
      el('div', {},
        el('label', { for: 'fNama' }, 'Nama paparan'),
        el('input#fNama', { name: 'nama', required: true, maxlength: 30, value: p.nama, autocomplete: 'nickname', placeholder: 'Contoh: Aina' }),
        el('label', { for: 'fMatrik' }, 'No. matrik (pilihan)'),
        el('input#fMatrik', { name: 'matrik', maxlength: 20, value: p.matrik || '', placeholder: 'D2025…' }),
        el('label', { for: 'fKump' }, 'Kumpulan kuliah'),
        el('select#fKump', { name: 'kumpulan' }, ...KUMPULAN.map(k => el('option', { value: k, selected: k === p.kumpulan }, k))),
      ),
    ),
    el('fieldset.pilih-avatar', {}, el('legend', {}, 'Avatar'),
      ...AVATAR.map(a => el('button.av-btn', { type: 'button', 'aria-pressed': a === pilihAv, 'aria-label': 'Avatar ' + a, onclick: e => {
        pilihAv = a; pratonton.textContent = a; $$('.av-btn', borang).forEach(b => b.setAttribute('aria-pressed', b === e.currentTarget)); bunyi.klik();
      } }, a))),
    el('fieldset.pilih-warna', {}, el('legend', {}, 'Warna'),
      ...WARNA.map(w => el('button.warna-btn', { type: 'button', style: { background: w }, 'aria-pressed': w === pilihWarna, 'aria-label': 'Warna ' + w, onclick: e => {
        pilihWarna = w; pratonton.style.background = w; $$('.warna-btn', borang).forEach(b => b.setAttribute('aria-pressed', b === e.currentTarget)); bunyi.klik();
      } }))),
    el('p.ralat#fRalat', { role: 'alert' }),
    el('div.tindakan', {}, el('button.btn.utama', { type: 'submit' }, wajib ? 'Mula belayar' : 'Simpan profil'),
      !wajib && el('button.btn', { type: 'button', onclick: () => history.back() }, 'Batal')),
  );
  borang.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(borang), nama = String(d.get('nama')).trim();
    if (nama.length < 2) { $('#fRalat').textContent = 'Masukkan nama paparan sekurang-kurangnya 2 huruf.'; $('#fNama').focus(); return; }
    simpan.set('profil', { nama, matrik: String(d.get('matrik')).trim(), kumpulan: d.get('kumpulan'), avatar: pilihAv, warna: pilihWarna });
    kemasBar(); toast('Profil disimpan.');
    const k = simpan.get('kembaliKe'); simpan.del('kembaliKe');
    navigate(k && !k.includes('profil') ? k : '#/');
  });
  app.append(el('section.halaman.sempit', {}, borang));
  $('#fNama').focus();
}

// ---------------------------------------------------------------------------
// Solo: tetapan pusingan
// ---------------------------------------------------------------------------
async function paparSolo(q) {
  const s = stat();
  const tetap = { set: 'sim', unit: Number(q.get('unit')) || 0, bil: 10, mod: 'biasa', masa: MASA_SOALAN, ...simpan.get('tetapanSolo', {}) };
  if (q.get('unit')) tetap.unit = Number(q.get('unit'));
  const akses = TETAPAN.premium?.aktif ? await store.statusAkses().catch(() => ({ ok: false })) : { ok: false };
  if (tetap.set !== 'premium' || !akses.ok) tetap.set = 'sim';

  const pilihan = (nama, label, opsyen, nilai) => el('fieldset.segmen', {}, el('legend', {}, label),
    ...opsyen.map(([v, t, mati]) => el('label', { class: mati ? 'mati' : '' },
      el('input', { type: 'radio', name: nama, value: v, checked: String(v) === String(nilai), disabled: !!mati }), el('span', {}, t))));

  const unitSel = el('select#sUnit', { name: 'unit' }, el('option', { value: 0 }, 'Semua unit (campuran)'),
    ...UNIT.slice(1).map(u => el('option', { value: u.n, selected: u.n === tetap.unit }, `${namaUnit(u.n)}: ${u.tajuk}` + (s.kemajuan[u.n] ? ` (terbaik ${s.kemajuan[u.n].terbaik}%)` : ''))));

  const borang = el('form.kad.borang', {},
    el('h1', {}, tetap.unit ? `${namaUnit(tetap.unit)}: ${UNIT[tetap.unit].tajuk}` : 'Sediakan pusingan solo'),
    el('label', { for: 'sUnit' }, 'Pulau (unit)'), unitSel,
    TETAPAN.premium?.aktif ? pilihan('set', 'Set soalan', [['sim', 'Set KPP3023'], ['premium', akses.ok ? 'Set Soalan Premium' : 'Set Soalan Premium 🔒', !akses.ok]], tetap.set) : null,
    pilihan('bil', 'Bilangan soalan', [[10, '10'], [20, '20'], [40, '40']], tetap.bil),
    bolehWebGL() ? pilihan('gaya', 'Gaya main', [['arena', 'Arena: gerak avatar ke zon jawapan'], ['klasik', 'Klasik: tekan butang']], tetap.gaya || 'arena') : null,
    pilihan('mod', 'Mod', [['biasa', 'Biasa'], ['cabaran', 'Cabaran: 3 nyawa'], ['latihan', 'Latihan: tanpa masa (klasik sahaja)']], tetap.mod),
    el('p.kecil', {}, 'Dalam Arena, anda dan rakan bot berlari ke zon jawapan. Lantai zon salah runtuh! Lebih cepat anda masuk zon yang betul, lebih banyak mata.'),
    el('div.tindakan', {}, el('button.btn.utama.besar', { type: 'submit' }, 'Mula pusingan'), el('a.btn', { href: '#/' }, 'Kembali ke peta')),
  );
  unitSel.addEventListener('change', () => { $('h1', borang).textContent = Number(unitSel.value) ? `${namaUnit(+unitSel.value)}: ${UNIT[+unitSel.value].tajuk}` : 'Sediakan pusingan solo'; });
  borang.addEventListener('submit', async e => {
    e.preventDefault();
    const d = new FormData(borang);
    const t = { set: d.get('set') || 'sim', unit: Number(d.get('unit')), bil: Number(d.get('bil')), mod: d.get('mod'), masa: MASA_SOALAN, gaya: d.get('gaya') || 'klasik' };
    simpan.set('tetapanSolo', t);
    let bank = await ambilBank(t.set);
    if (t.unit) bank = bank.filter(x => x.unit === t.unit);
    if (!bank.length) { toast('Tiada soalan dalam set ini untuk unit dipilih.', 'amaran'); return; }
    if (t.unit) { const s2 = stat(); s2.unitTerakhir = t.unit; simpanStat(s2); }
    const pilihan = shuffle(bank).slice(0, t.bil).map(sediaSoalan);
    if (t.gaya === 'arena' && t.mod !== 'latihan' && bolehWebGL()) {
      try { const m = await import('./solo3d.js'); return m.mulaArenaSolo(app, { ...konteks(), simpanKeputusan, navigate }, pilihan, t); }
      catch (err) { console.warn('Arena 3D gagal, guna mod klasik', err); }
    }
    mulaKuiz(pilihan, t);
  });
  app.append(el('section.halaman.sempit', {}, borang));
}

// ---------------------------------------------------------------------------
// Enjin kuiz solo
// ---------------------------------------------------------------------------
function mulaKuiz(soalan, t) {
  ganti(app);
  document.body.dataset.laluan = 'kuiz';
  const st = { i: 0, skor: 0, betul: 0, streak: 0, streakMaks: 0, nyawa: t.mod === 'cabaran' ? 3 : Infinity, pantas: 0, rekod: [], kuasa: { '5050': true, masa: true, ganda: true }, ganda: false };
  const tanpaMasa = t.mod === 'latihan';
  let pemasa = null, mulaMs = 0, tamatMs = 0, terkunci = false;

  const hud = el('div.hud');
  const kad = el('article.kad-soalan');
  const jawapanGrid = el('div.jawapan-grid');
  const maklum = el('div.maklum', { 'aria-live': 'assertive' });
  const kuasaBar = el('div.kuasa');
  const skrin = el('section.halaman.kuiz', {}, hud, kad, jawapanGrid, kuasaBar, maklum);
  app.append(skrin);

  const kekunci = e => {
    if (e.target.matches('input, textarea, select')) return;
    if (!terkunci) {
      const n = { 1: 0, 2: 1, 3: 2, 4: 3, a: 0, b: 1, c: 2, d: 3 }[e.key.toLowerCase()];
      const btn = $$('.jawapan', jawapanGrid)[n];
      if (btn && !btn.disabled) btn.click();
    } else if (e.key === 'Enter') $('.btn-seterusnya', maklum)?.click();
  };
  addEventListener('keydown', kekunci);
  bersih.push(() => { removeEventListener('keydown', kekunci); cancelAnimationFrame(pemasa); });

  function lukisHud() {
    const baki = Math.max(0, tamatMs - performance.now());
    ganti(hud, 
      el('span.hud-item', {}, `Soalan ${st.i + 1}/${soalan.length}`),
      tanpaMasa ? el('span.hud-item', {}, 'Latihan') : el('span.pemasa', { role: 'timer', 'aria-label': `${Math.ceil(baki / 1000)} saat`, style: { '--p': baki / (t.masa * 1000) } }, el('b', {}, Math.ceil(baki / 1000))),
      el('span.hud-item.skor', {}, `${st.skor} mata`),
      el('span.hud-item', { title: 'Streak' }, `🔥 ${st.streak}`),
      Number.isFinite(st.nyawa) ? el('span.hud-item.nyawa', { 'aria-label': `${st.nyawa} nyawa` }, '❤️'.repeat(st.nyawa) + '🖤'.repeat(3 - st.nyawa)) : null,
    );
  }

  function lukisKuasa() {
    const q = soalan[st.i];
    ganti(kuasaBar, 
      el('button.btn.kuasa-btn', { type: 'button', disabled: !st.kuasa['5050'] || q.jenis === 'bs' || terkunci, onclick: () => {
        st.kuasa['5050'] = false; const salah = shuffle($$('.jawapan', jawapanGrid).filter(b => +b.dataset.i !== q.jawapan)).slice(0, 2);
        salah.forEach(b => { b.disabled = true; b.classList.add('pudar'); }); bunyi.klik(); lukisKuasa();
      } }, '50:50'),
      el('button.btn.kuasa-btn', { type: 'button', disabled: !st.kuasa.masa || tanpaMasa || terkunci, onclick: () => { st.kuasa.masa = false; tamatMs += 10000; bunyi.klik(); lukisKuasa(); } }, '+10 saat'),
      el('button.btn.kuasa-btn', { type: 'button', disabled: !st.kuasa.ganda || terkunci, 'aria-pressed': st.ganda, onclick: () => { st.kuasa.ganda = false; st.ganda = true; bunyi.klik(); lukisKuasa(); toast('Gandaan x2 aktif untuk soalan ini.'); } }, 'Gandaan x2'),
    );
  }

  function papar() {
    const q = soalan[st.i];
    terkunci = false; st.ganda = false;
    ganti(maklum);
    ganti(kad, 
      q.senario ? el('p.senario', {}, q.senario) : null,
      el('h2.teks-soalan', {}, q.soalan),
    );
    jawapanGrid.className = 'jawapan-grid' + (q.jenis === 'bs' ? ' ox' : '');
    ganti(jawapanGrid, ...q.pilihan.map((p, i) => el('button.jawapan', { type: 'button', 'data-i': i, 'data-k': q.jenis === 'bs' ? (i === 0 ? 'O' : 'X') : i, onclick: () => jawab(i) },
      el('span.bentuk', { 'aria-hidden': 'true' }, q.jenis === 'bs' ? (i === 0 ? 'O' : 'X') : ['▲', '◆', '●', '■'][i]),
      el('span.teks', {}, p))));
    mulaMs = performance.now(); tamatMs = mulaMs + t.masa * 1000;
    lukisKuasa(); lukisHud();
    if (!tanpaMasa) {
      let detikAkhir = null;
      const detik = () => {
        const baki = tamatMs - performance.now();
        if (baki <= 0) return jawab(-1);
        const s = Math.ceil(baki / 1000);
        if (s <= 5 && s !== detikAkhir) { detikAkhir = s; bunyi.detik(); }
        const p = $('.pemasa', hud);
        if (p) { p.style.setProperty('--p', baki / (t.masa * 1000)); $('b', p).textContent = s; p.setAttribute('aria-label', `${s} saat`); }
        pemasa = requestAnimationFrame(detik);
      };
      pemasa = requestAnimationFrame(detik);
    }
    $('.jawapan', jawapanGrid)?.focus({ preventScroll: true });
  }

  function jawab(i) {
    if (terkunci) return;
    terkunci = true; cancelAnimationFrame(pemasa);
    const q = soalan[st.i], ms = performance.now() - mulaMs, betul = i === q.jawapan;
    if (betul) { st.streak++; st.betul++; if (ms < 4000) st.pantas++; } else { st.streak = 0; if (Number.isFinite(st.nyawa)) st.nyawa--; }
    st.streakMaks = Math.max(st.streakMaks, st.streak);
    const mata = tanpaMasa ? (betul ? 500 : 0) : kiraMata({ betul, ms, masaS: t.masa, streak: st.streak, ganda: st.ganda });
    st.skor += mata;
    st.rekod.push({ id: q.id, unit: q.unit, betul, pilih: i });
    $$('.jawapan', jawapanGrid).forEach(b => {
      b.disabled = true;
      if (+b.dataset.i === q.jawapan) b.classList.add('betul');
      else if (+b.dataset.i === i) b.classList.add('salah');
      else b.classList.add('pudar');
    });
    betul ? bunyi.betul() : bunyi.salah();
    lukisHud(); lukisKuasa();
    const akhir = st.i + 1 >= soalan.length || st.nyawa <= 0;
    ganti(maklum, el('div.maklum-kad' + (betul ? '.ya' : '.tidak'), {},
      el('b.maklum-tajuk', {}, betul ? `Betul! +${mata} mata` : i === -1 ? 'Masa tamat' : 'Belum tepat'),
      !betul ? el('p', {}, 'Jawapan: ', el('b', {}, q.pilihan[q.jawapan])) : null,
      el('p', {}, q.huraian),
      st.streak >= 3 && betul ? el('p.kecil', {}, `Streak ${st.streak}! Bonus +${Math.min(500, (st.streak - 1) * 100)}.`) : null,
      el('div.tindakan', {},
        el('button.btn.utama.btn-seterusnya', { type: 'button', onclick: () => { if (akhir) tamat(); else { st.i++; papar(); } } },
          akhir ? (st.nyawa <= 0 ? 'Nyawa habis: lihat keputusan' : 'Lihat keputusan') : 'Soalan seterusnya'),
        el('a.btn.btn-laman-utama', { href: '#/' }, 'Laman utama')),
    ));
    $('.btn-seterusnya', maklum).focus({ preventScroll: true });
    maklum.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function tamat() { simpanKeputusan(st, t, soalan.length); }

  papar();
}

export function simpanKeputusan(st, t, bilSoalan, tambahan = {}) {
  const jumlah = st.rekod.length;
  const peratus = Math.round(st.betul / Math.max(1, jumlah) * 100);
  const s = stat(), baru = [];
  const xpDapat = Math.round(st.skor / 20) + st.betul * 10;
  s.xp += xpDapat; s.permainan++; s.streakTerbaik = Math.max(s.streakTerbaik, st.streakMaks);
  // Buku Kesilapan
  let dibetulkan = simpan.get('dibetulkan', 0);
  for (const r of st.rekod) {
    if (!r.betul) s.kesilapan[r.id] = (s.kesilapan[r.id] || 0) + 1;
    else if (s.kesilapan[r.id]) { delete s.kesilapan[r.id]; dibetulkan++; }
  }
  simpan.set('dibetulkan', dibetulkan);
  // Kemajuan unit
  if (t.unit) {
    const k = s.kemajuan[t.unit] || { terbaik: 0, cuba: 0 };
    k.cuba++; k.terbaik = Math.max(k.terbaik, peratus); s.kemajuan[t.unit] = k;
    if (peratus >= 80 && jumlah >= 8) beriLencana(s, 'unit-' + t.unit, baru);
  }
  beriLencana(s, 'langkah-pertama', baru);
  if (peratus === 100 && jumlah >= 10) beriLencana(s, 'sempurna', baru);
  if (st.streakMaks >= 5) beriLencana(s, 'streak-5', baru);
  if (st.streakMaks >= 10) beriLencana(s, 'streak-10', baru);
  if (st.pantas >= 5) beriLencana(s, 'kilat', baru);
  if (t.mod === 'cabaran' && st.nyawa > 0 && jumlah === bilSoalan) beriLencana(s, 'cabaran', baru);
  if (dibetulkan >= 10) beriLencana(s, 'pemulih', baru);
  if ([...Array(11)].every((_, i) => s.lencana.includes('unit-' + (i + 1)))) beriLencana(s, 'penjelajah', baru);
  simpanStat(s);
  const p = profil();
  if (t.set !== 'kesilapan') {
    store.hantarSkor({ nama: p.nama, avatar: p.avatar, warna: p.warna, kumpulan: p.kumpulan, skor: st.skor, betul: st.betul, jumlah, set: t.set, unit: t.unit, mod: t.mod })
      .catch(e => toast('Skor tidak dapat dihantar ke leaderboard: ' + e.message, 'amaran'));
  }
  kemasBar();
  paparKeputusan({ st, jumlah, peratus, xpDapat, baru, t, ...tambahan });
}

function paparKeputusan({ st, jumlah, peratus, xpDapat, baru, t, kedudukan, bilPemain }) {
  for (const f of bersih.splice(0)) { try { f(); } catch { /* abaikan */ } }
  document.body.dataset.laluan = 'keputusan';
  ganti(app);
  const s = stat(), aras = arasXP(s.xp);
  if (peratus >= 70) { konfeti(); bunyi.menang(); }
  const lencanaBaru = baru.map(id => LENCANA.find(l => l.id === id)).filter(Boolean);
  app.append(el('section.halaman.sempit', {},
    el('div.kad.keputusan', {},
      el('p.kecil', {}, t.unit ? `${namaUnit(t.unit)}: ${UNIT[t.unit].tajuk}` : 'Campuran semua unit'),
      el('h1.skor-besar', {}, `${st.skor}`, el('small', {}, ' mata')),
      el('div.stat-baris', {},
        el('div', {}, el('b', {}, `${st.betul}/${jumlah}`), el('span', {}, 'betul')),
        el('div', {}, el('b', {}, `${peratus}%`), el('span', {}, 'ketepatan')),
        el('div', {}, el('b', {}, `${st.streakMaks}`), el('span', {}, 'streak terbaik')),
        el('div', {}, el('b', {}, `+${xpDapat}`), el('span', {}, `XP (Aras ${aras})`)),
        kedudukan ? el('div', {}, el('b', {}, `#${kedudukan}/${bilPemain}`), el('span', {}, 'kedudukan dalam arena')) : null,
      ),
      lencanaBaru.length ? el('div.lencana-baru', {}, el('h2', {}, 'Lencana baharu'),
        ...lencanaBaru.map(l => el('div.lencana.dapat', {}, el('span.ikon', {}, l.ikon), el('b', {}, l.nama), el('span', {}, l.syarat)))) : null,
      el('p', {}, peratus >= 80 ? 'Hebat. Cuba pulau seterusnya atau Mod Cabaran.' : peratus >= 50 ? 'Hampir. Ulang kaji soalan yang salah dalam Buku Kesilapan.' : 'Baca semula unit ini dalam SIM, kemudian cuba lagi.'),
      el('div.tindakan', {},
        el('button.btn.utama', { type: 'button', onclick: () => navigate(`#/solo${t.unit ? '?unit=' + t.unit : ''}`) }, 'Main lagi'),
        el('a.btn', { href: '#/ulangkaji' }, 'Buku Kesilapan'),
        el('a.btn', { href: '#/papan' }, 'Leaderboard'),
        el('a.btn', { href: '#/' }, 'Laman utama')),
    ),
  ));
}

// ---------------------------------------------------------------------------
// Leaderboard
// ---------------------------------------------------------------------------
async function paparPapan(q) {
  const f = { kumpulan: q.get('k') || 'Semua', unit: Number(q.get('u') || 0), tempoh: q.get('t') || 'semua', jenis: q.get('j') || 'terbaik', set: q.get('s') || 'semua' };
  const senarai = el('ol.papan', { 'aria-label': 'Kedudukan' }, el('li.memuat', {}, 'Memuatkan…'));
  const tukar = (k, v) => { const n = { ...f, [k]: v }; navigate(`#/papan?k=${n.kumpulan}&u=${n.unit}&t=${n.tempoh}&j=${n.jenis}&s=${n.set}`); };
  const sel = (k, label, opsyen) => el('label.penapis', {}, el('span', {}, label),
    el('select', { onchange: e => tukar(k, e.target.value) }, ...opsyen.map(([v, t]) => el('option', { value: v, selected: String(v) === String(f[k]) }, t))));
  app.append(el('section.halaman', {},
    el('div.kepala-hal', {}, el('h1', {}, 'Leaderboard'),
      el('div.tab', { role: 'tablist' },
        ...[['terbaik', 'Skor tertinggi'], ['jumlah', 'Jumlah mata']].map(([v, t]) => el('button', { role: 'tab', type: 'button', 'aria-selected': f.jenis === v, onclick: () => tukar('jenis', v) }, t)))),
    el('div.penapis-baris', {},
      sel('kumpulan', 'Kumpulan', [['Semua', 'Semua kumpulan'], ...KUMPULAN.map(k => [k, k])]),
      sel('unit', 'Unit', [[0, 'Semua unit'], ...UNIT.slice(1).map(u => [u.n, `${namaUnit(u.n)}: ${u.ringkas}`])]),
      sel('tempoh', 'Tempoh', [['semua', 'Sepanjang masa'], ['minggu', '7 hari lepas'], ['hari', 'Hari ini']]),
      sel('set', 'Set', [['semua', 'Semua set'], ['sim', 'Set KPP3023'], ['premium', 'Set Soalan Premium'], ['langsung', 'Permainan langsung']]),
    ),
    senarai,
    el('p.kecil', {}, store.dalamTalian ? 'Leaderboard dikongsi bersama semua pemain.' : 'Mod luar talian: leaderboard ini hanya menunjukkan permainan pada pelayar ini.'),
  ));
  let data = await store.senaraiSkor().catch(() => []);
  const kini = Date.now();
  data = data.filter(d => (f.kumpulan === 'Semua' || d.kumpulan === f.kumpulan) && (!f.unit || d.unit === f.unit) && (f.set === 'semua' || d.set === f.set)
    && (f.tempoh === 'semua' || (f.tempoh === 'minggu' ? kini - d.masa < 7 * 864e5 : new Date(d.masa).toDateString() === new Date().toDateString())));
  const ikutPemain = new Map();
  for (const d of data) {
    const k = d.uid, a = ikutPemain.get(k);
    if (!a) ikutPemain.set(k, { ...d, jumlahMata: d.skor, main: 1 });
    else { a.jumlahMata += d.skor; a.main++; if (d.skor > a.skor) Object.assign(a, { skor: d.skor, betul: d.betul, jumlah: d.jumlah }); Object.assign(a, { nama: d.nama, avatar: d.avatar, warna: d.warna }); }
  }
  const baris = [...ikutPemain.values()].sort((a, b) => f.jenis === 'jumlah' ? b.jumlahMata - a.jumlahMata : b.skor - a.skor).slice(0, 50);
  ganti(senarai, ...(baris.length ? baris.map((d, i) => el('li' + (d.uid === store.uid ? '.saya' : '') + (i < 3 ? '.atas' + (i + 1) : ''), {},
    el('span.kedudukan', {}, i < 3 ? ['🥇', '🥈', '🥉'][i] : i + 1),
    el('span.av', { style: { background: d.warna } }, d.avatar),
    el('span.nama', {}, d.nama, el('small', {}, `${d.kumpulan || ''}${d.main > 1 ? `, ${d.main} permainan` : ''}`)),
    el('b.mata', {}, (f.jenis === 'jumlah' ? d.jumlahMata : d.skor).toLocaleString('ms-MY')))) : [el('li.kosong', {}, 'Belum ada skor untuk penapis ini. Main satu pusingan untuk menjadi yang pertama.')]));
}

// ---------------------------------------------------------------------------
// Lencana dan kemajuan
// ---------------------------------------------------------------------------
function paparLencana() {
  const s = stat(), aras = arasXP(s.xp);
  app.append(el('section.halaman', {},
    el('div.kepala-hal', {}, el('h1', {}, 'Lencana dan kemajuan'), el('p.lede', {}, `Aras ${aras}, ${s.xp} XP, ${s.permainan} pusingan dimainkan. Streak terbaik: ${s.streakTerbaik}.`)),
    el('h2', {}, 'Kemajuan setiap pulau'),
    el('div.kemajuan-unit', {}, ...UNIT.slice(1).map(u => {
      const k = s.kemajuan[u.n];
      return el('a.unit-bar', { href: `#/solo?unit=${u.n}`, style: { '--w': u.warna } },
        el('span', {}, el('b', {}, namaUnit(u.n)), ' ', u.ringkas),
        el('span.bar', { role: 'img', 'aria-label': `Terbaik ${k?.terbaik ?? 0}%` }, el('i', { style: { width: (k?.terbaik ?? 0) + '%' } })),
        el('span.kecil', {}, k ? `${k.terbaik}%` : 'Belum'));
    })),
    el('h2', {}, `Lencana (${s.lencana.length}/${LENCANA.length})`),
    el('div.grid-lencana', {}, ...LENCANA.map(l => el('div.lencana' + (s.lencana.includes(l.id) ? '.dapat' : ''), {},
      el('span.ikon', { 'aria-hidden': 'true' }, s.lencana.includes(l.id) ? l.ikon : '🔒'), el('b', {}, l.nama), el('span', {}, l.syarat)))),
  ));
}

// ---------------------------------------------------------------------------
// Ulang kaji: Buku Kesilapan dan kad imbas
// ---------------------------------------------------------------------------
function paparUlangkaji(q) {
  const s = stat();
  const semua = semuaSoalanTempatan();
  const peta = new Map(semua.map(x => [x.id, x]));
  const silap = Object.entries(s.kesilapan).map(([id, n]) => ({ q: peta.get(id), n })).filter(x => x.q).sort((a, b) => b.n - a.n);
  const unitKad = Number(q.get('kad') || 0);

  const bahagianSilap = el('section.kad', {},
    el('h2', {}, `Buku Kesilapan (${silap.length})`),
    silap.length ? el('p', {}, 'Soalan yang pernah anda jawab salah. Jawab dengan betul untuk membuangnya daripada buku ini.') : el('p', {}, 'Buku Kesilapan kosong. Soalan yang dijawab salah akan muncul di sini.'),
    silap.length ? el('button.btn.utama', { type: 'button', onclick: () => mulaKuiz(shuffle(silap.map(x => x.q)).slice(0, 20).map(sediaSoalan), { set: 'kesilapan', unit: 0, bil: 20, mod: 'latihan', masa: MASA_SOALAN }) }, `Main semula ${Math.min(20, silap.length)} kesilapan`) : null,
    silap.length ? el('ul.senarai-silap', {}, ...silap.slice(0, 30).map(({ q: x, n }) => el('li', {},
      el('span.cip', { style: { '--w': UNIT[x.unit]?.warna } }, namaUnit(x.unit)), ' ', x.soalan, el('small', {}, ` (salah ${n}x)`)))) : null,
  );

  const pilihUnit = el('select', { onchange: e => navigate(`#/ulangkaji?kad=${e.target.value}`), 'aria-label': 'Pilih unit kad imbas' },
    el('option', { value: 0 }, 'Pilih unit…'), ...UNIT.slice(1).map(u => el('option', { value: u.n, selected: u.n === unitKad }, `${namaUnit(u.n)}: ${u.tajuk}`)));
  const kadImbas = el('section.kad', {}, el('h2', {}, 'Kad imbas'), el('p', {}, 'Baca soalan, cuba jawab dalam kepala, kemudian terbalikkan kad.'), pilihUnit);
  if (unitKad) {
    const dek = shuffle((window.SOALAN_SIM || []).filter(x => x.unit === unitKad));
    let i = 0;
    const kad = el('button.kad-imbas', { type: 'button', 'aria-pressed': 'false' });
    const lukis = () => {
      const x = dek[i];
      ganti(kad, 
        el('span.muka.depan', {}, el('small', {}, `Kad ${i + 1}/${dek.length}`), x.senario ? el('em', {}, x.senario) : null, el('b', {}, x.soalan), el('small', {}, 'Klik untuk lihat jawapan')),
        el('span.muka.belakang', {}, el('b', {}, x.pilihan[x.jawapan]), el('span', {}, x.huraian)),
      );
      kad.setAttribute('aria-pressed', 'false');
    };
    kad.addEventListener('click', () => { kad.setAttribute('aria-pressed', kad.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); bunyi.klik(); });
    lukis();
    kadImbas.append(kad, el('div.tindakan', {},
      el('button.btn', { type: 'button', onclick: () => { i = (i - 1 + dek.length) % dek.length; lukis(); } }, 'Kad sebelum'),
      el('button.btn.utama', { type: 'button', onclick: () => { i = (i + 1) % dek.length; lukis(); } }, 'Kad seterusnya')));
  }
  app.append(el('section.halaman', {}, el('div.kepala-hal', {}, el('h1', {}, 'Ulang kaji')), el('div.dua-lajur', {}, bahagianSilap, kadImbas)));
}

// ---------------------------------------------------------------------------
// Set Soalan Premium (persediaan Pentaksiran Akhir; bayaran QR DuitNow + kelulusan pensyarah)
// ---------------------------------------------------------------------------
async function paparPremium() {
  const P = TETAPAN.premium || {};
  const penerangan = Array.isArray(P.penerangan) ? P.penerangan : [];
  const bekas = el('section.halaman.sempit', {}, el('div.kad', {},
    el('h1', {}, 'Set Soalan Premium'),
    el('p.lede', {}, P.ringkasan || 'Persediaan Pentaksiran Akhir KPP3023.'),
    penerangan.length ? el('ul.senarai-premium', {}, ...penerangan.map(x => el('li', {}, x))) : null,
    P.penafian ? el('p.kecil', {}, P.penafian) : null));
  const kad = $('.kad', bekas);
  app.append(bekas);
  if (!store.dalamTalian) {
    const demo = await store.statusAkses().catch(() => ({ ok: false }));
    if (demo.ok) {
      kad.append(el('p.notis.ya', {}, 'Mod demo: Set Soalan Premium dibuka pada pelayar ini sahaja.'),
        el('div.tindakan', {}, el('a.btn.utama', { href: '#/solo', onclick: () => simpan.set('tetapanSolo', { ...simpan.get('tetapanSolo', {}), set: 'premium' }) }, 'Main Set Soalan Premium')));
    } else {
      kad.append(el('p.notis', {}, 'Pembelian Set Soalan Premium memerlukan sambungan dalam talian, dan pensyarah belum menyambungkan game ini kepada Firebase. Untuk demo, pensyarah boleh memuat naik set ini ke pelayar sendiri melalui Halaman pensyarah.'));
    }
    return;
  }
  const status = await store.statusAkses().catch(() => ({ ok: false }));
  if (status.ok) {
    kad.append(
      el('p.notis.ya', {}, 'Akses anda aktif.'),
      status.kod ? el('p', {}, 'Kod pemulihan anda: ', el('b.kod', {}, status.kod), el('br'), el('small', {}, 'Simpan kod ini. Gunakannya untuk membuka akses pada peranti atau pelayar lain. Jangan kongsi kod ini.')) : null,
      el('div.tindakan', {}, el('a.btn.utama', { href: '#/solo', onclick: () => simpan.set('tetapanSolo', { ...simpan.get('tetapanSolo', {}), set: 'premium' }) }, 'Main Set Soalan Premium')),
    );
    return;
  }
  if (status.permohonan?.status === 'menunggu') {
    kad.append(el('p.notis', {}, 'Permohonan anda sedang disemak oleh pensyarah. Akses dibuka secara automatik pada halaman ini selepas diluluskan.'));
    const un = store.pantauAkses(a => { if (a?.ok) { toast('Akses Set Soalan Premium diluluskan.'); navigate('#/premium'); } });
    bersih.push(un);
    return;
  }
  const p = profil();
  const borang = el('form.borang', {},
    el('div.bayar', {},
      el('img', { src: P.qr, alt: 'Kod QR DuitNow untuk bayaran', width: 220, height: 220 }),
      el('div', {},
        el('p', {}, el('b', {}, `Harga: ${P.harga}`)),
        el('p', {}, `Penerima: ${P.penerima}`),
        el('ol', {}, el('li', {}, 'Imbas kod QR dengan aplikasi bank atau e-dompet.'), el('li', {}, 'Bayar jumlah di atas.'), el('li', {}, 'Isi borang ini dengan nombor rujukan transaksi.'), el('li', {}, 'Tunggu kelulusan pensyarah.'))),
    ),
    status.permohonan?.status === 'ditolak' ? el('p.notis.tidak', {}, 'Permohonan sebelum ini tidak dapat disahkan. Semak nombor rujukan dan hantar semula.') : null,
    el('label', { for: 'pNama' }, 'Nama penuh'), el('input#pNama', { name: 'nama', required: true, value: p.nama, maxlength: 80 }),
    el('label', { for: 'pMatrik' }, 'No. matrik'), el('input#pMatrik', { name: 'matrik', required: true, value: p.matrik || '', maxlength: 20 }),
    el('label', { for: 'pRujukan' }, 'No. rujukan transaksi'), el('input#pRujukan', { name: 'rujukan', required: true, maxlength: 40 }),
    el('div.tindakan', {}, el('button.btn.utama', { type: 'submit' }, 'Hantar permohonan')),
  );
  borang.addEventListener('submit', async e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(borang));
    if (!d.nama.trim() || !d.matrik.trim() || !d.rujukan.trim()) { toast('Lengkapkan nama, no. matrik dan no. rujukan.', 'amaran'); return; }
    await store.hantarPermohonan({ nama: d.nama.trim(), matrik: d.matrik.trim(), rujukan: d.rujukan.trim(), kumpulan: p.kumpulan });
    toast('Permohonan dihantar.'); navigate('#/premium');
  });
  const pulih = el('form.borang.pulih', {},
    el('h2', {}, 'Ada kod pemulihan?'),
    el('label', { for: 'kPulih' }, 'Kod pemulihan'), el('input#kPulih', { name: 'kod', maxlength: 12, autocomplete: 'off' }),
    el('button.btn', { type: 'submit' }, 'Buka akses'));
  pulih.addEventListener('submit', async e => {
    e.preventDefault();
    try { await store.gunaKodPulih($('#kPulih').value); toast('Akses dibuka.'); navigate('#/premium'); }
    catch { toast('Kod tidak sah.', 'amaran'); }
  });
  kad.append(borang, pulih);
}

// ---------------------------------------------------------------------------
// Admin pensyarah
// ---------------------------------------------------------------------------
function huraiCSV(teks) {
  const baris = [];
  let medan = '', baru = [], petik = false;
  for (let i = 0; i < teks.length; i++) {
    const c = teks[i];
    if (petik) { if (c === '"' && teks[i + 1] === '"') { medan += '"'; i++; } else if (c === '"') petik = false; else medan += c; }
    else if (c === '"') petik = true;
    else if (c === ',') { baru.push(medan); medan = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && teks[i + 1] === '\n') i++; baru.push(medan); baris.push(baru); baru = []; medan = ''; }
    else medan += c;
  }
  if (medan || baru.length) { baru.push(medan); baris.push(baru); }
  return baris.filter(r => r.some(x => x.trim()));
}

/** Tukar teks JSON atau CSV kepada senarai soalan yang sah. */
export function importSoalan(teks, awalanId = 'F') {
  teks = teks.trim().replace(/^﻿/, '');
  let arr;
  if (teks.startsWith('[')) arr = JSON.parse(teks);
  else {
    const [kepala, ...data] = huraiCSV(teks);
    const k = kepala.map(h => h.trim().toLowerCase());
    const ambil = (r, n) => (r[k.indexOf(n)] ?? '').trim();
    arr = data.map((r, i) => {
      const jenis = ambil(r, 'jenis') || 'pilihan';
      const pilihan = jenis === 'bs' ? ['Betul', 'Salah'] : ['a', 'b', 'c', 'd'].map(h => ambil(r, h)).filter(Boolean);
      const j = ambil(r, 'jawapan').toUpperCase();
      const jawapan = jenis === 'bs' ? (/^S/.test(j) ? 1 : 0) : 'ABCD'.indexOf(j[0]);
      return { id: ambil(r, 'id') || `${awalanId}-${String(i + 1).padStart(2, '0')}`, unit: Number(ambil(r, 'unit')) || 0, jenis, senario: ambil(r, 'senario') || undefined, soalan: ambil(r, 'soalan'), pilihan, jawapan, huraian: ambil(r, 'huraian'), aras: Number(ambil(r, 'aras')) || 2 };
    });
  }
  const sah = [], ralat = [];
  arr.forEach((q, i) => {
    const n = q.jenis === 'bs' ? 2 : 4;
    if (!q.soalan || !Array.isArray(q.pilihan) || q.pilihan.length !== n || !(q.jawapan >= 0 && q.jawapan < n)) ralat.push(`Baris ${i + 1}: soalan, ${n} pilihan atau jawapan tidak sah`);
    else sah.push({ ...q, id: q.id || `${awalanId}-${i + 1}`, unit: Number(q.unit) || 0, aras: q.aras || 2, huraian: q.huraian || '' });
  });
  return { sah, ralat };
}

async function paparAdmin() {
  const hal = el('section.halaman', {}, el('div.kepala-hal', {}, el('h1', {}, 'Halaman pensyarah')));
  app.append(hal);
  let admin = false;
  if (store.dalamTalian) {
    admin = await store.adalahAdmin();
    if (!admin) {
      hal.append(el('div.kad', {},
        el('p', {}, 'Pelayar ini belum didaftarkan sebagai admin.'),
        el('p', {}, 'UID pelayar ini: ', el('b.kod', {}, store.uid)),
        el('ol', {}, el('li', {}, 'Buka Firebase Console, Realtime Database, tab Data.'), el('li', {}, 'Tambah nod admin, kemudian anak dengan nama UID di atas dan nilai true.'), el('li', {}, 'Muat semula halaman ini.')),
        el('p.kecil', {}, 'Langkah penuh ada dalam README.md, bahagian "Setup Firebase".')));
      return;
    }
  } else if (sessionStorage.getItem('arena.admin') !== '1') {
    const f = el('form.kad.borang', {}, el('p', {}, 'Mod luar talian. Masukkan kod admin (ditetapkan dalam firebase-config.js).'),
      el('label', { for: 'aKod' }, 'Kod admin'), el('input#aKod', { type: 'password', autocomplete: 'off' }), el('button.btn.utama', { type: 'submit' }, 'Masuk'));
    f.addEventListener('submit', e => { e.preventDefault(); if ($('#aKod').value === (TETAPAN.adminKod || 'kpp3023')) { sessionStorage.setItem('arena.admin', '1'); navigate('#/admin'); } else toast('Kod admin salah.', 'amaran'); });
    hal.append(f); return;
  }

  // ---- Leaderboard ----
  hal.append(el('div.kad', {}, el('h2', {}, 'Leaderboard'),
    el('div.tindakan', {},
      el('button.btn', { type: 'button', onclick: async () => {
        const d = await store.senaraiSkor();
        muatTurun('leaderboard-kpp3023.csv', keCSV([['nama', 'kumpulan', 'skor', 'betul', 'jumlah', 'set', 'unit', 'mod', 'masa'], ...d.map(x => [x.nama, x.kumpulan, x.skor, x.betul, x.jumlah, x.set, x.unit, x.mod, new Date(x.masa).toLocaleString('ms-MY')])]));
      } }, 'Eksport CSV'),
      el('button.btn.bahaya', { type: 'button', onclick: async e => {
        const b = e.currentTarget;
        if (!b.dataset.sah) { b.dataset.sah = '1'; b.textContent = 'Klik sekali lagi untuk padam semua skor'; setTimeout(() => { if (b.isConnected) { delete b.dataset.sah; b.textContent = 'Kosongkan leaderboard'; } }, 4000); return; }
        await store.padamPapan(); toast('Leaderboard dikosongkan.'); delete b.dataset.sah; b.textContent = 'Kosongkan leaderboard';
      } }, 'Kosongkan leaderboard'))));

  // ---- Set Soalan Premium ----
  const taP = el('textarea#tPremium', { rows: 6, placeholder: 'Tampal JSON (premium-soalan.json) atau CSV dengan lajur: unit,jenis,soalan,senario,a,b,c,d,jawapan,huraian,aras' });
  const failP = el('input', { type: 'file', accept: '.json,.csv,text/csv,application/json', onchange: async e => { taP.value = await e.target.files[0].text(); } });
  const hasilP = el('p.kecil', { role: 'status' });
  const bilP = (await store.ambilPremium().catch(() => [])).length;
  hal.append(el('div.kad', {}, el('h2', {}, `Set Soalan Premium (${bilP} soalan)`),
    el('p', {}, store.dalamTalian
      ? 'Soalan disimpan di Firebase sahaja. Hanya pelajar yang diluluskan boleh membacanya.'
      : 'Mod luar talian (demo): soalan disimpan dalam pelayar ini sahaja dan Set Soalan Premium dibuka untuk pelayar ini. Untuk jualan sebenar, sambungkan Firebase.'),
    failP, taP, hasilP,
    el('div.tindakan', {},
      el('button.btn.utama', { type: 'button', onclick: async () => {
        try {
          const { sah, ralat } = importSoalan(taP.value, 'PR'); if (!sah.length) throw new Error(ralat[0] || 'Tiada soalan sah');
          await store.muatNaikPremium(sah);
          hasilP.textContent = `${sah.length} soalan dimuat naik.${ralat.length ? ` ${ralat.length} baris ditolak: ${ralat.slice(0, 3).join('; ')}` : ''}`;
          toast(`${sah.length} soalan premium dimuat naik.`);
        } catch (e) { hasilP.textContent = 'Gagal: ' + e.message; }
      } }, 'Muat naik Set Soalan Premium'),
      el('button.btn', { type: 'button', onclick: () => muatTurun('templat-soalan.csv', keCSV([['unit', 'jenis', 'soalan', 'senario', 'a', 'b', 'c', 'd', 'jawapan', 'huraian', 'aras'], [2, 'pilihan', 'Contoh soalan?', '', 'Pilihan A', 'Pilihan B', 'Pilihan C', 'Pilihan D', 'A', 'Penerangan jawapan', 2], [8, 'bs', 'Contoh pernyataan Betul/Salah.', '', '', '', '', '', 'Salah', 'Penerangan', 1]])) }, 'Muat turun templat CSV'))));

  if (!store.dalamTalian) return;

  const jadual = el('tbody');
  hal.append(el('div.kad', {}, el('h2', {}, 'Permohonan Set Soalan Premium'),
    el('div.jadual-gulung', {}, el('table', {}, el('thead', {}, el('tr', {}, ...['Nama', 'No. matrik', 'Kumpulan', 'No. rujukan', 'Masa', 'Status', ''].map(h => el('th', { scope: 'col' }, h)))), jadual))));
  bersih.push(store.senaraiPermohonan(data => {
    const semua = Object.values(data || {}).sort((a, b) => (a.status === 'menunggu' ? -1 : 1) - (b.status === 'menunggu' ? -1 : 1) || b.masa - a.masa);
    ganti(jadual, ...(semua.length ? semua.map(x => el('tr', {},
      el('td', {}, x.nama), el('td', {}, x.matrik), el('td', {}, x.kumpulan || ''), el('td', {}, el('code', {}, x.rujukan)),
      el('td', {}, new Date(x.masa).toLocaleString('ms-MY')), el('td', {}, x.status),
      el('td', {}, x.status === 'menunggu' ? el('span.tindakan', {},
        el('button.btn.utama.kecil', { type: 'button', onclick: async () => { const kod = await store.luluskan(x.uid, x.nama); toast(`Diluluskan. Kod pemulihan: ${kod}`); } }, 'Luluskan'),
        el('button.btn.kecil', { type: 'button', onclick: () => store.tolak(x.uid) }, 'Tolak')) : ''))) : [el('tr', {}, el('td', { colspan: 7 }, 'Tiada permohonan.'))]));
  }));
}

// ---------------------------------------------------------------------------
// Mula
// ---------------------------------------------------------------------------
(async function mula() {
  $('#btnBunyi').addEventListener('click', () => { bunyi.aktif = !bunyi.aktif; kemasBar(); bunyi.klik(); });
  $('#btnTema').addEventListener('click', () => {
    const kini = document.documentElement.dataset.theme;
    const gelapSistem = matchMedia('(prefers-color-scheme: dark)').matches;
    const seterusnya = kini === 'dark' ? 'light' : kini === 'light' ? 'dark' : (gelapSistem ? 'light' : 'dark');
    simpan.set('tema', seterusnya); kemasBar();
  });
  if (TETAPAN.imej?.logo) $('.jenama .logo').src = TETAPAN.imej.logo;
  try { store = await initStore(); }
  catch (e) { ganti(app, el('p.notis', {}, 'Gagal memulakan data: ' + e.message)); return; }
  window.arenaStore = store; // untuk ujian
  kemasBar();
  addEventListener('hashchange', route);
  route();
})();
