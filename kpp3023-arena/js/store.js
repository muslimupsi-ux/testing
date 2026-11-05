// Lapisan data. Dua pelaksanaan dengan API yang sama:
//  - Firebase Realtime Database + Anonymous Auth (jika firebase-config.js diisi)
//  - Local: localStorage + BroadcastChannel (mod luar talian / demo pada satu komputer)
// API tahap tinggi (bilik langsung, papan pendahulu, premium) ditulis sekali di atas `db`.

import { kodRawak, simpan } from './util.js';

const FB_VER = '10.12.2';

// ---------------------------------------------------------------------------
// Pangkalan data tempatan yang meniru RTDB: get / set / update / remove / onValue
// ---------------------------------------------------------------------------
function bahagi(p) { return String(p).split('/').filter(Boolean); }
function ambil(tree, parts) { let n = tree; for (const k of parts) { if (n == null || typeof n !== 'object') return null; n = n[k]; } return n === undefined ? null : n; }
function letak(tree, parts, val) {
  if (!parts.length) return val == null ? {} : val;
  let n = tree;
  for (let i = 0; i < parts.length - 1; i++) {
    if (n[parts[i]] == null || typeof n[parts[i]] !== 'object') n[parts[i]] = {};
    n = n[parts[i]];
  }
  if (val == null) delete n[parts.at(-1)]; else n[parts.at(-1)] = val;
  return tree;
}
const salin = v => (v == null ? null : JSON.parse(JSON.stringify(v)));

function buatDbTempatan() {
  const KUNCI = 'db';
  let tree = simpan.get(KUNCI, {}) || {};
  const pendengar = new Set();
  let saluran = null;
  try { saluran = new BroadcastChannel('kpp3023-arena'); } catch { /* tiada sokongan */ }

  const maklum = (path) => {
    const p = bahagi(path).join('/');
    for (const l of pendengar) {
      const lp = l.parts.join('/');
      if (p === lp || p.startsWith(lp + '/') || lp.startsWith(p + '/') || p === '' || lp === '') l.cb(salin(ambil(tree, l.parts)));
    }
  };
  const guna = (op) => {
    if (op.t === 'set') tree = letak(tree, bahagi(op.path), salin(op.val));
    else if (op.t === 'update') for (const [k, v] of Object.entries(op.val)) tree = letak(tree, [...bahagi(op.path), ...bahagi(k)], salin(v));
    maklum(op.path);
  };
  const tulis = (op) => {
    guna(op);
    simpan.set(KUNCI, tree);
    saluran?.postMessage(op);
  };
  saluran && (saluran.onmessage = e => guna(e.data));
  // Tab lain yang tiada BroadcastChannel: dengar peristiwa storage
  addEventListener('storage', e => { if (e.key === 'arena.' + KUNCI && !saluran) { tree = simpan.get(KUNCI, {}) || {}; maklum(''); } });

  return {
    async get(path) { return salin(ambil(tree, bahagi(path))); },
    async set(path, val) { tulis({ t: 'set', path, val }); },
    async update(path, val) { tulis({ t: 'update', path, val }); },
    async remove(path) { tulis({ t: 'set', path, val: null }); },
    async push(path, val) { const id = Date.now().toString(36) + kodRawak(4, 'abcdefghijklmnopqrstuvwxyz0123456789'); tulis({ t: 'set', path: `${path}/${id}`, val }); return id; },
    onValue(path, cb) {
      const l = { parts: bahagi(path), cb };
      pendengar.add(l);
      setTimeout(() => cb(salin(ambil(tree, l.parts))), 0);
      return () => pendengar.delete(l);
    },
    masa: () => Date.now(),
  };
}

// ---------------------------------------------------------------------------
// Firebase
// ---------------------------------------------------------------------------
async function buatDbFirebase(config) {
  const base = `https://www.gstatic.com/firebasejs/${FB_VER}`;
  const [{ initializeApp }, authMod, dbMod] = await Promise.all([
    import(`${base}/firebase-app.js`), import(`${base}/firebase-auth.js`), import(`${base}/firebase-database.js`),
  ]);
  const app = initializeApp(config);
  const auth = authMod.getAuth(app);
  const database = dbMod.getDatabase(app);
  const user = await new Promise((res, rej) => {
    const un = authMod.onAuthStateChanged(auth, u => { if (u) { un(); res(u); } });
    authMod.signInAnonymously(auth).catch(rej);
  });
  let beza = 0;
  dbMod.onValue(dbMod.ref(database, '.info/serverTimeOffset'), s => { beza = s.val() || 0; });
  const r = p => dbMod.ref(database, p);
  return {
    uid: user.uid,
    async get(path) { const s = await dbMod.get(r(path)); return s.exists() ? s.val() : null; },
    set: (path, val) => dbMod.set(r(path), val),
    update: (path, val) => dbMod.update(r(path), val),
    remove: (path) => dbMod.remove(r(path)),
    async push(path, val) { const ref = dbMod.push(r(path)); await dbMod.set(ref, val); return ref.key; },
    onValue(path, cb) { return dbMod.onValue(r(path), s => cb(s.exists() ? s.val() : null), () => cb(null)); },
    masa: () => Date.now() + beza,
  };
}

// ---------------------------------------------------------------------------
// API tahap tinggi
// ---------------------------------------------------------------------------
export async function initStore() {
  const config = window.FIREBASE_CONFIG;
  let db, mod = 'local';
  if (config && config.apiKey && config.databaseURL) {
    try { db = await buatDbFirebase(config); mod = 'firebase'; }
    catch (e) { console.warn('Firebase gagal dimulakan, guna mod luar talian:', e); }
  }
  if (!db) {
    db = buatDbTempatan();
    let uid = simpan.get('uid');
    if (!uid) { uid = 'L' + kodRawak(10, 'abcdefghijklmnopqrstuvwxyz0123456789'); simpan.set('uid', uid); }
    db.uid = uid;
  }
  const uid = db.uid;
  // Dalam mod luar talian, setiap tab ialah pemain berasingan dalam bilik langsung (demo hos + pemain dalam satu pelayar)
  let uidBilik = uid;
  if (mod === 'local') {
    try { uidBilik = sessionStorage.getItem('arena.uidSesi') || ('T' + kodRawak(8, 'abcdefghijklmnopqrstuvwxyz0123456789')); sessionStorage.setItem('arena.uidSesi', uidBilik); }
    catch { /* guna uid tetap */ }
  }

  return {
    mod, uid, uidBilik, db,
    dalamTalian: mod === 'firebase',

    // ---------- Papan pendahulu ----------
    async hantarSkor(entri) {
      const data = { ...entri, uid, masa: db.masa() };
      await db.push('papan', data);
      // Simpan salinan tempatan supaya papan peribadi tetap ada walaupun tiada talian
      const sejarah = simpan.get('sejarah', []); sejarah.unshift(data); simpan.set('sejarah', sejarah.slice(0, 200));
    },
    async senaraiSkor() {
      const semua = Object.values((await db.get('papan')) || {});
      return semua;
    },

    // ---------- Bilik langsung ----------
    async ciptaBilik(tetapan, soalanAwam) {
      let pin;
      for (let i = 0; i < 8; i++) { pin = kodRawak(6); if (!(await db.get(`bilik/${pin}/hos`))) break; }
      await db.set(`bilik/${pin}`, {
        hos: uidBilik, dicipta: db.masa(), tetapan, soalan: soalanAwam,
        state: { fasa: 'lobi', indeks: -1, siri: 0 },
      });
      return pin;
    },
    bilikWujud: async pin => !!(await db.get(`bilik/${pin}/hos`)),
    ambilBilik: pin => db.get(`bilik/${pin}`),
    pantauState: (pin, cb) => db.onValue(`bilik/${pin}/state`, cb),
    setState: (pin, state) => db.set(`bilik/${pin}/state`, state),
    sertaiBilik: (pin, pemain) => db.set(`bilik/${pin}/pemain/${uidBilik}`, { ...pemain, sertai: db.masa() }),
    keluarBilik: pin => db.remove(`bilik/${pin}/pemain/${uidBilik}`),
    buangPemain: (pin, id) => db.remove(`bilik/${pin}/pemain/${id}`),
    pantauPemain: (pin, cb) => db.onValue(`bilik/${pin}/pemain`, cb),
    hantarJawapan: (pin, indeks, pilih, ms) => db.set(`bilik/${pin}/jawapan/${indeks}/${uidBilik}`, { pilih, ms }),
    pantauJawapan: (pin, indeks, cb) => db.onValue(`bilik/${pin}/jawapan/${indeks}`, cb),
    setSkor: (pin, skor) => db.set(`bilik/${pin}/skor`, skor),
    pantauSkor: (pin, cb) => db.onValue(`bilik/${pin}/skor`, cb),
    tutupBilik: pin => db.update(`bilik/${pin}/state`, { fasa: 'tamat' }),
    masa: () => db.masa(),

    // ---------- Set soalan Final A261 ----------
    async ambilSetFinal() {
      const tempatan = simpan.get('setFinal', null);
      if (mod === 'firebase') {
        const jauh = await db.get('set/final-a261').catch(() => null);
        if (Array.isArray(jauh) && jauh.length) return jauh;
      }
      if (Array.isArray(tempatan) && tempatan.length) return tempatan;
      return Array.isArray(window.SOALAN_FINAL_A261) ? window.SOALAN_FINAL_A261 : [];
    },
    async simpanSetFinal(arr, keAwan) {
      simpan.set('setFinal', arr);
      if (keAwan && mod === 'firebase') await db.set('set/final-a261', arr);
    },

    // ---------- Premium ----------
    async statusAkses() {
      if (mod !== 'firebase') return { ok: false, luarTalian: true };
      const [akses, pulih, mohon] = await Promise.all([
        db.get(`akses/${uid}`).catch(() => null), db.get(`aksesPulih/${uid}`).catch(() => null), db.get(`permohonan/${uid}`).catch(() => null),
      ]);
      return { ok: !!(akses && akses.ok) || !!pulih, kod: akses?.kod || pulih || null, permohonan: mohon };
    },
    pantauAkses: cb => db.onValue(`akses/${uid}`, cb),
    hantarPermohonan: borang => db.set(`permohonan/${uid}`, { ...borang, uid, masa: db.masa(), status: 'menunggu' }),
    async gunaKodPulih(kod) { await db.set(`aksesPulih/${uid}`, kod.trim().toUpperCase()); },
    async ambilPremium() { return (await db.get('premium/soalan')) || []; },

    // ---------- Admin ----------
    async adalahAdmin() { if (mod !== 'firebase') return false; return (await db.get(`admin/${uid}`).catch(() => null)) === true; },
    senaraiPermohonan: cb => db.onValue('permohonan', cb),
    async luluskan(idPelajar, nama) {
      const kod = kodRawak(8, 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789');
      await db.set(`pulih/${kod}`, { uid: idPelajar, nama: nama || '' });
      await db.set(`akses/${idPelajar}`, { ok: true, kod, masa: db.masa() });
      await db.update(`permohonan/${idPelajar}`, { status: 'lulus' });
      return kod;
    },
    tolak: (idPelajar) => db.update(`permohonan/${idPelajar}`, { status: 'ditolak' }),
    muatNaikPremium: arr => db.set('premium/soalan', arr),
    padamPapan: () => db.remove('papan'),
  };
}
