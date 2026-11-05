// Dunia 3D (three.js) gaya kartun siang:
//  - petaPulau: peta Kepulauan Psikologi di laman utama
//  - arenaKuiz: arena kuiz gaya ZEP Quiz. Avatar berjalan (papan kekunci, joystick, ketik untuk bergerak)
//    ke zon jawapan yang dilukis di lantai. Lantai zon salah runtuh dan pemain di atasnya jatuh ke laut.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { UNIT, kurangGerak } from './util.js';
import { WARNA_ZON, WARNA_OX, SIMBOL } from './hud.js';
export { WARNA_ZON, WARNA_OX, SIMBOL };
const HURUF = ['A', 'B', 'C', 'D'];

// ---------------------------------------------------------------------------
// Bahan kartun
// ---------------------------------------------------------------------------
const PETA_TON = (() => {
  const t = new THREE.DataTexture(new Uint8Array([90, 170, 255]), 3, 1, THREE.RedFormat);
  t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t;
})();
const toon = (color, extra = {}) => new THREE.MeshToonMaterial({ color, gradientMap: PETA_TON, ...extra });

function teksturLangit() {
  const c = document.createElement('canvas'); c.width = 4; c.height = 256;
  const g = c.getContext('2d'), gr = g.createLinearGradient(0, 0, 0, 256);
  gr.addColorStop(0, '#5BB8FF'); gr.addColorStop(0.55, '#A8DBFF'); gr.addColorStop(1, '#E9F7FF');
  g.fillStyle = gr; g.fillRect(0, 0, 4, 256);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

// ---------------------------------------------------------------------------
// Pentas asas
// ---------------------------------------------------------------------------
class Pentas {
  constructor(bekas, { kamera = [0, 20, 22], sasaran = [0, 0, 0], kawal = false, fov = 45 } = {}) {
    this.bekas = bekas;
    this.gerak = !kurangGerak();
    // Peranti sentuh atau skrin kecil (kebanyakannya telefon): kurangkan beban pemaparan
    const ringan = matchMedia('(pointer: coarse)').matches || innerWidth < 760;
    this.renderer = new THREE.WebGLRenderer({ antialias: !ringan || (devicePixelRatio || 1) < 2 });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, ringan ? 1.5 : 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.domElement.className = 'kanvas3d';
    bekas.append(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = teksturLangit();
    const imej = window.ARENA_TETAPAN?.imej?.langit;
    if (imej) new THREE.TextureLoader().load(imej, t => { t.colorSpace = THREE.SRGBColorSpace; this.scene.background = t; });
    this.scene.fog = new THREE.Fog(0xcfeeff, 45, 95);
    this.camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 300);
    this.camera.position.set(...kamera);
    this.sasaran = new THREE.Vector3(...sasaran);
    this.camera.lookAt(this.sasaran);

    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x7fbf7f, 1.5));
    const mentari = new THREE.DirectionalLight(0xfff1d6, 2.4);
    mentari.position.set(12, 26, 14);
    mentari.castShadow = true;
    mentari.shadow.mapSize.set(ringan ? 1024 : 2048, ringan ? 1024 : 2048);
    Object.assign(mentari.shadow.camera, { left: -26, right: 26, top: 26, bottom: -26, near: 1, far: 80 });
    mentari.shadow.bias = -0.0005;
    this.scene.add(mentari);

    if (kawal) {
      this.kawalan = new OrbitControls(this.camera, this.renderer.domElement);
      this.kawalan.target.copy(this.sasaran);
      Object.assign(this.kawalan, { enableDamping: true, maxPolarAngle: Math.PI * 0.42, minDistance: 12, maxDistance: 46, enablePan: false });
    }
    this.kemasKini = new Set();
    this.jam = new THREE.Clock();
    this.ro = new ResizeObserver(() => this.saiz());
    this.ro.observe(bekas);
    this.saiz();
    this.hidup = true;
    const gelung = () => {
      if (!this.hidup) return;
      const dt = Math.min(this.jam.getDelta(), 0.05), t = this.jam.elapsedTime;
      for (const f of this.kemasKini) f(dt, t);
      this.kawalan?.update();
      this.renderer.render(this.scene, this.camera);
      this.raf = requestAnimationFrame(gelung);
    };
    gelung();
  }
  saiz() {
    const w = this.bekas.clientWidth || 1, h = this.bekas.clientHeight || 1;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    if (this.anjakX && w > 900) this.camera.setViewOffset(w, h, -w * this.anjakX, 0, w, h);
    else this.camera.clearViewOffset();
    this.camera.updateProjectionMatrix();
  }
  buang() {
    this.hidup = false;
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    this.kawalan?.dispose();
    this.scene.traverse(o => {
      o.geometry?.dispose?.();
      const m = o.material; (Array.isArray(m) ? m : m ? [m] : []).forEach(x => { x.map?.dispose(); x.dispose(); });
    });
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}

// ---------------------------------------------------------------------------
// Unsur kongsi
// ---------------------------------------------------------------------------
function kanvasTeks(baris, { saiz = 48, warna = '#fff', latar = 'rgba(20,40,70,.78)', tebal = 800, font = '"Baloo 2", system-ui, sans-serif' } = {}) {
  const c = document.createElement('canvas'), g = c.getContext('2d');
  const f = `${tebal} ${saiz}px ${font}`;
  g.font = f;
  const arr = Array.isArray(baris) ? baris : [baris];
  const w = Math.ceil(Math.max(...arr.map(b => g.measureText(b).width))) + saiz * 0.9;
  const h = Math.ceil(arr.length * saiz * 1.12 + saiz * 0.42);
  c.width = w; c.height = h; g.font = f;
  if (latar) { g.fillStyle = latar; g.beginPath(); g.roundRect(0, 0, w, h, h / 2.2 > saiz ? saiz * .6 : h / 2); g.fill(); }
  g.fillStyle = warna; g.textAlign = 'center'; g.textBaseline = 'middle';
  arr.forEach((b, i) => g.fillText(b, w / 2, saiz * 0.21 + saiz * 1.12 * (i + 0.5)));
  return c;
}
export function spriteTeks(baris, opt = {}) {
  const c = kanvasTeks(baris, opt);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthWrite: false, transparent: true, fog: false }));
  const unit = (opt.lebar || 1.6) / ((opt.saiz || 48) * 2.6);
  s.scale.set(c.width * unit, c.height * unit, 1);
  return s;
}
function spriteEmoji(emoji, saiz = 1) {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  g.font = '100px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
  g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(emoji, 64, 72);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }));
  s.scale.set(saiz, saiz, 1);
  return s;
}

const GEO = {
  badan: new THREE.CapsuleGeometry(0.34, 0.36, 4, 12),
  kaki: new THREE.CapsuleGeometry(0.11, 0.22, 3, 8),
  tangan: new THREE.SphereGeometry(0.12, 10, 8),
  bayang: new THREE.CircleGeometry(0.42, 20),
};
const MAT_KAKI = toon(0x2b3a55);
const MAT_BAYANG = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.18, depthWrite: false });

/** Watak comel: badan berwarna, kepala emoji haiwan, kaki berayun ketika berjalan, label nama. */
export function buatAvatar(warna = '#3D7BFF', emoji = '🙂', nama = '', { saya = false } = {}) {
  const g = new THREE.Group();
  const isi = new THREE.Group(); g.add(isi);
  const matBadan = toon(warna);
  const badan = new THREE.Mesh(GEO.badan, matBadan); badan.position.y = 0.72; badan.castShadow = true;
  const kakiK = new THREE.Mesh(GEO.kaki, MAT_KAKI), kakiKa = kakiK.clone();
  kakiK.position.set(-0.15, 0.26, 0); kakiKa.position.set(0.15, 0.26, 0);
  const tK = new THREE.Mesh(GEO.tangan, matBadan), tKa = tK.clone();
  tK.position.set(-0.4, 0.75, 0); tKa.position.set(0.4, 0.75, 0);
  const kepala = spriteEmoji(emoji, 0.95); kepala.position.y = 1.42;
  isi.add(badan, kakiK, kakiKa, tK, tKa, kepala);
  const bayang = new THREE.Mesh(GEO.bayang, MAT_BAYANG); bayang.rotation.x = -Math.PI / 2; bayang.position.y = 0.02;
  g.add(bayang);
  let label = null;
  if (nama) {
    label = spriteTeks(nama, { saiz: 40, lebar: 1.15, latar: saya ? 'rgba(255,180,0,.95)' : 'rgba(20,40,70,.72)', warna: saya ? '#2B1A00' : '#fff' });
    label.position.y = 2.18; g.add(label);
  }
  g.userData = { isi, badan, kakiK, kakiKa, tK, tKa, kepala, label, bayang, matBadan };
  return g;
}

function hayunAvatar(obj, laju, t, fasa = 0) {
  const u = obj.userData;
  const a = laju > 0.3 ? Math.sin(t * 13 + fasa) * 0.75 : 0;
  u.kakiK.rotation.x = a; u.kakiKa.rotation.x = -a;
  u.tK.position.z = a * 0.18; u.tKa.position.z = -a * 0.18;
  u.isi.position.y = laju > 0.3 ? Math.abs(Math.sin(t * 13 + fasa)) * 0.08 : Math.sin(t * 2.2 + fasa) * 0.02;
}

function buatLaut(scene, gerak, warna = 0x2fc6db) {
  const geo = new THREE.PlaneGeometry(220, 220, 80, 80);
  geo.rotateX(-Math.PI / 2);
  const air = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({ color: warna, shininess: 80, specular: 0xbfefff, flatShading: true, transparent: true, opacity: 0.94 }));
  air.receiveShadow = true; air.position.y = -0.6;
  scene.add(air);
  const asal = geo.attributes.position.array.slice();
  return (dt, t) => {
    if (!gerak) return;
    const p = geo.attributes.position.array;
    for (let i = 0; i < p.length; i += 3) p[i + 1] = asal[i + 1] + Math.sin(asal[i] * 0.3 + t * 1.3) * 0.13 + Math.cos(asal[i + 2] * 0.27 + t * 1.1) * 0.11;
    geo.attributes.position.needsUpdate = true;
  };
}

function buatPokok(skala = 1, jenis = 0) {
  const g = new THREE.Group();
  const batang = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 1, 6), toon(0x9b6a3c));
  batang.position.y = 0.5; batang.castShadow = true;
  g.add(batang);
  if (jenis === 0) {
    for (const [y, r] of [[1.25, 0.75], [1.75, 0.55]]) {
      const d = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 0), toon(0x3cc46a));
      d.position.y = y; d.castShadow = true; g.add(d);
    }
  } else {
    const d = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.6, 7), toon(0x2aa65a));
    d.position.y = 1.6; d.castShadow = true; g.add(d);
  }
  g.scale.setScalar(skala);
  return g;
}

function buatAwan(scene, gerak) {
  const awan = [];
  const mat = toon(0xffffff, { transparent: true, opacity: 0.95 });
  for (let i = 0; i < 9; i++) {
    const g = new THREE.Group();
    for (let k = 0; k < 4; k++) {
      const s = new THREE.Mesh(new THREE.SphereGeometry(1 + Math.random() * 0.8, 12, 10), mat);
      s.position.set(k * 1.3 - 2, Math.random() * 0.6, Math.random() * 0.8); g.add(s);
    }
    g.position.set((Math.random() - 0.5) * 110, 14 + Math.random() * 8, -30 - Math.random() * 40);
    g.userData.v = 0.4 + Math.random() * 0.6;
    scene.add(g); awan.push(g);
  }
  return dt => { if (!gerak) return; for (const a of awan) { a.position.x += a.userData.v * dt; if (a.position.x > 60) a.position.x = -60; } };
}

function bentukSegiBulat(w, d, r) {
  const s = new THREE.Shape(), x = -w / 2, y = -d / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + d - r); s.quadraticCurveTo(x + w, y + d, x + w - r, y + d);
  s.lineTo(x + r, y + d); s.quadraticCurveTo(x, y + d, x, y + d - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  return s;
}
function pulauSegi(w, d, r, warnaAtas = 0x86d85a, warnaPasir = 0xf3d9a4, lubang = []) {
  const g = new THREE.Group();
  // Lubang (kawasan zon): bentuk dalam satah x,y; y bentuk = -z dunia selepas putaran
  const tebuk = shape => { for (const [x0, x1, z0, z1] of lubang) { const h = new THREE.Path(); h.moveTo(x0, -z1); h.lineTo(x1, -z1); h.lineTo(x1, -z0); h.lineTo(x0, -z0); h.lineTo(x0, -z1); shape.holes.push(h); } return shape; };
  const pasir = new THREE.Mesh(new THREE.ExtrudeGeometry(tebuk(bentukSegiBulat(w + 1.6, d + 1.6, r + 0.8)), { depth: 1.4, bevelEnabled: false }), toon(warnaPasir));
  pasir.rotation.x = -Math.PI / 2; pasir.position.y = -1.75; pasir.receiveShadow = true;
  const rumput = new THREE.Mesh(new THREE.ExtrudeGeometry(tebuk(bentukSegiBulat(w, d, r)), { depth: 0.5, bevelEnabled: !lubang.length, bevelSize: 0.12, bevelThickness: 0.12, bevelSegments: 2 }), toon(warnaAtas));
  rumput.rotation.x = -Math.PI / 2; rumput.position.y = -0.62; rumput.receiveShadow = true;
  g.add(pasir, rumput);
  return g;
}

function percikan(scene, kemasKini, pos) {
  const m = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.45, 24), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9, side: THREE.DoubleSide }));
  m.rotation.x = -Math.PI / 2; m.position.set(pos.x, -0.45, pos.z);
  scene.add(m);
  const titik = [];
  for (let i = 0; i < 10; i++) {
    const s = new THREE.Mesh(new THREE.SphereGeometry(0.09, 6, 4), new THREE.MeshBasicMaterial({ color: 0xe8fbff }));
    const a = Math.random() * Math.PI * 2;
    s.position.set(pos.x, -0.4, pos.z); s.userData.v = new THREE.Vector3(Math.cos(a) * 2.5, 4 + Math.random() * 2, Math.sin(a) * 2.5);
    scene.add(s); titik.push(s);
  }
  let t = 0;
  const f = dt => {
    t += dt;
    m.scale.setScalar(1 + t * 5); m.material.opacity = Math.max(0, 0.9 - t * 1.2);
    for (const s of titik) { s.userData.v.y -= 14 * dt; s.position.addScaledVector(s.userData.v, dt); }
    if (t > 0.9) { kemasKini.delete(f); scene.remove(m, ...titik); m.geometry.dispose(); m.material.dispose(); titik.forEach(s => { s.geometry.dispose(); s.material.dispose(); }); }
  };
  kemasKini.add(f);
}

// ---------------------------------------------------------------------------
// Peta Pulau (laman utama)
// ---------------------------------------------------------------------------
export function petaPulau(bekas, { kemajuan = {}, lencana = [], avatar, unitSemasa = 1, onPilih }) {
  const P = new Pentas(bekas, { kamera: [0, 24, 27], kawal: true });
  P.anjakX = 0.17; P.saiz();
  P.kemasKini.add(buatLaut(P.scene, P.gerak));
  P.kemasKini.add(buatAwan(P.scene, P.gerak));
  const raycaster = new THREE.Raycaster(), tetikus = new THREE.Vector2();
  const pulau = [];
  const kedudukan = n => {
    if (n === 12) return new THREE.Vector3(0, 0, 0);
    const sudut = (n - 1) / 11 * Math.PI * 2 * 0.92 - Math.PI / 2;
    const r = 15.5 - (n - 1) * 0.55;
    return new THREE.Vector3(Math.cos(sudut) * r, 0, Math.sin(sudut) * r);
  };
  for (let n = 1; n <= 12; n++) {
    const u = UNIT[n], g = new THREE.Group(), besar = n === 12 ? 1.5 : 1;
    g.position.copy(kedudukan(n));
    const tapak = new THREE.Mesh(new THREE.CylinderGeometry(1.9 * besar, 2.3 * besar, 1, 10), toon(0xf3d9a4));
    tapak.position.y = -0.3; tapak.receiveShadow = true;
    const rumput = new THREE.Mesh(new THREE.CylinderGeometry(1.65 * besar, 1.8 * besar, 0.35, 10), toon(0x86d85a));
    rumput.position.y = 0.25; rumput.receiveShadow = true;
    const bukit = new THREE.Mesh(new THREE.DodecahedronGeometry(0.85 * besar, 0), toon(u.warna));
    bukit.position.set(-0.35 * besar, 0.85, -0.3); bukit.scale.y = 0.8; bukit.castShadow = true; bukit.rotation.y = n;
    const pokok = buatPokok(0.7 * besar, n % 2); pokok.position.set(0.95 * besar, 0.35, -0.5);
    g.add(tapak, rumput, bukit, pokok);
    const terbaik = kemajuan[n]?.terbaik;
    const label = spriteTeks([n === 12 ? 'Penutup' : `Unit ${n}`, u.ringkas + (terbaik != null ? `  ${terbaik}%` : '')], { saiz: 44, lebar: 2.1 });
    label.position.y = 2.9 * (n === 12 ? 1.15 : 1);
    g.add(label);
    if (lencana.includes('unit-' + n)) {
      const tiang = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.5, 6), toon(0xeeeeee));
      tiang.position.set(-1.1 * besar, 1.15, 0.3);
      const bendera = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.4), toon(0xffb400, { side: THREE.DoubleSide }));
      bendera.position.set(-0.78 * besar, 1.7, 0.3);
      g.add(tiang, bendera);
      P.kemasKini.add((dt, t) => { bendera.rotation.y = Math.sin(t * 3 + n) * 0.3; });
    }
    g.userData = { n };
    pulau.push(g); P.scene.add(g);
  }
  const batu = toon(0xe6c98f), geoBatu = new THREE.CylinderGeometry(0.24, 0.28, 0.25, 7);
  for (let n = 1; n < 12; n++) {
    const a = kedudukan(n), b = kedudukan(n + 1), bil = Math.max(2, Math.floor(a.distanceTo(b) / 1.1) - 3);
    for (let i = 1; i <= bil; i++) { const m = new THREE.Mesh(geoBatu, batu); m.position.lerpVectors(a, b, 0.2 + 0.6 * (i / (bil + 1))); m.position.y = -0.35; P.scene.add(m); }
  }
  const wira = buatAvatar(avatar?.warna, avatar?.emoji, '');
  const atas = n => kedudukan(n).add(new THREE.Vector3(0.4, 0.42, n === 12 ? 1.4 : 0.9));
  wira.position.copy(atas(unitSemasa));
  P.scene.add(wira);
  let animasi = null, semasa = unitSemasa, hover = null;
  P.kemasKini.add((dt, t) => {
    if (animasi && animasi(dt)) animasi = null;
    hayunAvatar(wira, animasi ? 1 : 0, t);
    for (const p of pulau) { const s = p.userData.n === hover ? 1.08 : 1; p.scale.lerp(new THREE.Vector3(s, s, s), 0.2); }
  });
  const cari = e => {
    const r = P.renderer.domElement.getBoundingClientRect();
    tetikus.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    raycaster.setFromCamera(tetikus, P.camera);
    let o = raycaster.intersectObjects(pulau, true)[0]?.object;
    while (o && o.userData.n == null) o = o.parent;
    return o?.userData.n ?? null;
  };
  const kanvas = P.renderer.domElement;
  let tekan = null;
  kanvas.addEventListener('pointermove', e => { hover = cari(e); kanvas.style.cursor = hover ? 'pointer' : 'grab'; });
  kanvas.addEventListener('pointerdown', e => { tekan = [e.clientX, e.clientY]; });
  kanvas.addEventListener('pointerup', e => { if (tekan && Math.hypot(e.clientX - tekan[0], e.clientY - tekan[1]) < 6) { const n = cari(e); if (n) pilih(n); } });
  function pilih(n) {
    if (animasi) return;
    semasa = n;
    const dari = wira.position.clone(), ke = atas(n); let t = 0;
    if (!P.gerak) { wira.position.copy(ke); onPilih?.(n); return; }
    animasi = dt => {
      t = Math.min(1, t + dt / 0.75);
      wira.position.lerpVectors(dari, ke, t); wira.position.y = THREE.MathUtils.lerp(dari.y, ke.y, t) + Math.sin(t * Math.PI) * 2.2;
      if (t >= 1) { onPilih?.(n); return true; }
      return false;
    };
  }
  void semasa;
  return { pilih, pentas: P, buang: () => P.buang() };
}

// ---------------------------------------------------------------------------
// Arena kuiz gaya ZEP Quiz
// ---------------------------------------------------------------------------
export const ARENA = { L: 22, D: 15 }; // kawasan main (unit dunia)
const LAJU = 6.2;

/**
 * @param {HTMLElement} bekas
 * @param {object} o
 *   pandangan: 'pemain' (kamera ikut avatar sendiri) atau 'hos' (pandangan atas seluruh arena)
 *   uidSaya, onGerak(x, z), onZon(indeks)
 */
export function arenaKuiz(bekas, { pandangan = 'pemain', uidSaya = null, onGerak, onZon } = {}) {
  const hos = pandangan === 'hos';
  const P = new Pentas(bekas, { kamera: hos ? [0, 25, 19] : [0, 16, 14], fov: hos ? 45 : 50 });
  P.kemasKini.add(buatLaut(P.scene, P.gerak));
  P.kemasKini.add(buatAwan(P.scene, P.gerak));
  const { L, D } = ARENA;
  let pulau = null;
  function binaPulau(lubang = []) {
    if (pulau) { P.scene.remove(pulau); pulau.traverse(o => { o.geometry?.dispose(); o.material?.dispose(); }); }
    pulau = pulauSegi(L + 5, D + 5, 3, 0x86d85a, 0xf3d9a4, lubang);
    if (lubang.length) pulau.position.y = 0.12; // tanpa bevel: angkat sedikit supaya aras rumput sama
    P.scene.add(pulau);
  }
  // Hiasan: pokok di tepi pulau dan pulau kecil
  const sudutPokok = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
  sudutPokok.forEach(([sx, sz], i) => { const p = buatPokok(1.1, i % 2); p.position.set(sx * (L / 2 + 1.6), 0, sz * (D / 2 + 1.5)); P.scene.add(p); });
  for (let i = 0; i < 6; i++) { const p = buatPokok(0.8, (i + 1) % 2); p.position.set(-L / 2 + 2 + i * (L - 4) / 5, 0, -D / 2 - 2); P.scene.add(p); }
  [[-20, -10], [21, -6], [-19, 9], [20, 11]].forEach(([x, z], i) => {
    const kecil = pulauSegi(4, 3.5, 1.4); kecil.position.set(x, -0.2, z); P.scene.add(kecil);
    const p = buatPokok(1, i % 2); p.position.set(x, -0.1, z); P.scene.add(p);
  });

  const lantai = new THREE.Group(); P.scene.add(lantai);
  let zon = [];
  const pemain = new Map(); // uid -> {obj, x, z, tx, tz, y, vy, jatuh, hantu, laju, saya}
  let kunci = false, mod = 'lobi';
  const input = { x: 0, z: 0 }, kekunci = new Set();
  let sasaranKetik = null;

  // ---------- Lantai zon ----------
  function teksturZon(warna, simbol, label, lebar, dalam) {
    const c = document.createElement('canvas'); const skala = 64;
    c.width = Math.round(lebar * skala); c.height = Math.round(dalam * skala);
    const g = c.getContext('2d');
    g.fillStyle = warna; g.fillRect(0, 0, c.width, c.height);
    g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = 14; g.setLineDash([28, 18]);
    g.strokeRect(18, 18, c.width - 36, c.height - 36);
    g.setLineDash([]);
    g.fillStyle = 'rgba(255,255,255,.95)'; g.textAlign = 'center'; g.textBaseline = 'middle';
    const h = Math.min(c.width, c.height);
    g.font = `800 ${h * 0.5}px "Baloo 2", system-ui, sans-serif`;
    g.shadowColor = 'rgba(0,0,0,.25)'; g.shadowOffsetY = 6;
    g.fillText(simbol, c.width / 2, c.height * (label ? 0.42 : 0.5));
    if (label) { g.font = `800 ${h * 0.16}px "Baloo 2", system-ui, sans-serif`; g.fillText(label, c.width / 2, c.height * 0.78); }
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
    return t;
  }
  function kosongLantai() {
    for (const c of [...lantai.children]) {
      lantai.remove(c);
      c.traverse(o => { o.geometry?.dispose(); const m = o.material; (Array.isArray(m) ? m : m ? [m] : []).forEach(x => { x.map?.dispose(); x.dispose(); }); });
    }
    zon = [];
  }
  /** n = 0 (lobi), 2 (O/X) atau 4 (A-D). */
  function susunZon(n) {
    kosongLantai();
    mod = n ? 'soalan' : 'lobi';
    if (!n) { binaPulau(); return; }
    const jurang = 2.2;
    const kotak = n === 2
      ? [[-L / 2, -jurang / 2, -D / 2, D / 2], [jurang / 2, L / 2, -D / 2, D / 2]]
      : [[-L / 2, -jurang / 2, -D / 2, -jurang / 2], [jurang / 2, L / 2, -D / 2, -jurang / 2], [-L / 2, -jurang / 2, jurang / 2, D / 2], [jurang / 2, L / 2, jurang / 2, D / 2]];
    kotak.forEach(([x0, x1, z0, z1], i) => {
      const w = x1 - x0, d = z1 - z0;
      const warna = n === 2 ? WARNA_OX[i] : WARNA_ZON[i];
      const simbol = n === 2 ? (i ? 'X' : 'O') : SIMBOL[i];
      const label = n === 2 ? (i ? 'SALAH' : 'BETUL') : HURUF[i];
      const atas = new THREE.MeshToonMaterial({ map: teksturZon(warna, simbol, label, w, d), gradientMap: PETA_TON });
      const sisi = toon(new THREE.Color(warna).multiplyScalar(0.7));
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w - 0.15, 0.5, d - 0.15), [sisi, sisi, atas, sisi, sisi, sisi]);
      mesh.position.set((x0 + x1) / 2, -0.22, (z0 + z1) / 2);
      mesh.receiveShadow = true;
      lantai.add(mesh);
      zon.push({ mesh, x0, x1, z0, z1, jatuh: false, vy: 0 });
    });
    binaPulau(kotak.map(([x0, x1, z0, z1]) => [x0 + 0.1, x1 - 0.1, z0 + 0.1, z1 - 0.1]));
  }
  function zonDi(x, z) {
    for (let i = 0; i < zon.length; i++) { const k = zon[i]; if (!k.jatuh && x > k.x0 + 0.1 && x < k.x1 - 0.1 && z > k.z0 + 0.1 && z < k.z1 - 0.1) return i; }
    return -1;
  }
  function titikDalamZon(i) {
    const k = zon[i]; if (!k) return titikLobi();
    return { x: k.x0 + 0.9 + Math.random() * (k.x1 - k.x0 - 1.8), z: k.z0 + 0.9 + Math.random() * (k.z1 - k.z0 - 1.8) };
  }
  function titikLobi() { return { x: (Math.random() - 0.5) * (L - 3), z: (Math.random() - 0.5) * (D - 3) }; }
  function titikTengah() { return { x: (Math.random() - 0.5) * 1.6, z: (Math.random() - 0.5) * (D - 2) }; }

  // ---------- Pemain ----------
  function setPemain(senarai) {
    const ada = new Set();
    for (const s of senarai) {
      ada.add(s.uid);
      if (pemain.has(s.uid)) continue;
      const saya = s.uid === uidSaya;
      const obj = buatAvatar(s.warna, s.avatar, (s.nama || '').slice(0, 14), { saya });
      const t = s.x != null ? { x: s.x, z: s.z } : titikLobi();
      obj.position.set(t.x, P.gerak ? 6 : 0, t.z);
      P.scene.add(obj);
      pemain.set(s.uid, { obj, x: t.x, z: t.z, tx: t.x, tz: t.z, y: P.gerak ? 6 : 0, vy: 0, jatuh: false, hantu: false, laju: 0, saya, fasa: Math.random() * 6, zon: -1 });
    }
    for (const [uid, p] of pemain) if (!ada.has(uid)) { P.scene.remove(p.obj); pemain.delete(uid); }
  }
  /** Kedudukan sasaran pemain lain (dari rangkaian atau bot). */
  function setSasaran(uid, x, z) { const p = pemain.get(uid); if (p && !p.saya) { p.tx = x; p.tz = z; } }
  function kedudukan(uid = uidSaya) { const p = pemain.get(uid); return p ? { x: p.x, z: p.z } : null; }
  function zonPemain(uid = uidSaya) { const p = pemain.get(uid); return p && !p.jatuh ? zonDi(p.x, p.z) : -1; }

  const gelembung = new Map();
  function emote(uid, emoji) {
    const p = pemain.get(uid); if (!p) return;
    gelembung.get(uid)?.();
    const s = spriteEmoji(emoji, 0.9); s.position.y = 2.75; p.obj.add(s);
    let t = 0;
    const f = dt => { t += dt; s.position.y = 2.75 + t * 0.4; s.material.opacity = t < 1.6 ? 1 : Math.max(0, 1 - (t - 1.6) * 3); if (t > 2) buang(); };
    const buang = () => { P.kemasKini.delete(f); p.obj.remove(s); s.material.map.dispose(); s.material.dispose(); gelembung.delete(uid); };
    gelembung.set(uid, buang);
    P.kemasKini.add(f);
  }
  function lompat(uid = uidSaya) { const p = pemain.get(uid); if (p && !p.jatuh && p.y <= 0.01) p.vy = 6.5; }
  function setHantu(uid, ya) {
    const p = pemain.get(uid); if (!p) return; p.hantu = ya;
    p.obj.traverse(o => { if (o.material && o !== p.obj.userData.bayang) { o.material.transparent = true; o.material.opacity = ya ? 0.35 : 1; } });
  }

  /** Dedah: lantai zon salah runtuh; pemain di atasnya jatuh. Pulangkan uid yang jatuh. */
  function dedah(betul) {
    const jatuh = [];
    for (const [uid, p] of pemain) { const z = zonDi(p.x, p.z); if (z !== -1 && z !== betul) { p.jatuh = true; p.vy = 2; jatuh.push(uid); } }
    zon.forEach((k, i) => { if (i !== betul) k.jatuh = true; });
    const k = zon[betul];
    if (k) k.betul = true;
    return jatuh;
  }
  /** Runtuhkan zon tertentu lebih awal (kuasa 50:50). Pemain di atasnya ikut jatuh. */
  function runtuhZon(senarai) {
    const jatuh = [];
    for (const [uid, p] of pemain) { const z = zonDi(p.x, p.z); if (senarai.includes(z)) { p.jatuh = true; p.vy = 2; jatuh.push(uid); } }
    for (const i of senarai) if (zon[i]) zon[i].jatuh = true;
    return jatuh;
  }

  /** Pulih selepas dedah: pemain yang jatuh muncul semula di laluan tengah. */
  function pulih() {
    for (const p of pemain.values()) {
      if (p.jatuh || p.obj.visible === false) {
        const t = titikTengah(); p.x = p.tx = t.x; p.z = p.tz = t.z; p.y = P.gerak ? 5 : 0; p.vy = 0; p.jatuh = false; p.obj.visible = true;
        if (p.saya) onGerak?.(p.x, p.z);
      }
    }
  }
  function setKunci(v) { kunci = v; if (v) { input.x = input.z = 0; sasaranKetik = null; } }
  function pergiKe(x, z) { sasaranKetik = { x, z }; }
  function pergiKeZon(i) { if (zon[i]) pergiKe(...Object.values(titikDalamZon(i))); }

  // ---------- Input: papan kekunci dan ketik ----------
  const KEY = { ArrowUp: [0, -1], KeyW: [0, -1], ArrowDown: [0, 1], KeyS: [0, 1], ArrowLeft: [-1, 0], KeyA: [-1, 0], ArrowRight: [1, 0], KeyD: [1, 0] };
  const kd = e => {
    if (!uidSaya || e.target.matches?.('input, textarea, select')) return;
    if (KEY[e.code]) { kekunci.add(e.code); sasaranKetik = null; e.preventDefault(); }
    else if (e.code === 'Space') { lompat(); e.preventDefault(); }
  };
  const ku = e => kekunci.delete(e.code);
  addEventListener('keydown', kd); addEventListener('keyup', ku);
  addEventListener('blur', () => kekunci.clear());
  const raycaster = new THREE.Raycaster(), satah = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), titik = new THREE.Vector3();
  const kanvas = P.renderer.domElement;
  let tekan = null;
  kanvas.addEventListener('pointerdown', e => { tekan = [e.clientX, e.clientY, performance.now()]; });
  kanvas.addEventListener('pointerup', e => {
    if (!uidSaya || kunci || !tekan) return;
    if (Math.hypot(e.clientX - tekan[0], e.clientY - tekan[1]) > 10 || performance.now() - tekan[2] > 500) return;
    const r = kanvas.getBoundingClientRect();
    raycaster.setFromCamera(new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1), P.camera);
    if (raycaster.ray.intersectPlane(satah, titik)) { pergiKe(titik.x, titik.z); penanda.position.set(titik.x, 0.08, titik.z); penanda.visible = true; penandaT = 0; }
  });
  const penanda = new THREE.Mesh(new THREE.RingGeometry(0.25, 0.4, 24), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9, side: THREE.DoubleSide }));
  penanda.rotation.x = -Math.PI / 2; penanda.visible = false; P.scene.add(penanda);
  let penandaT = 0;
  function setInput(x, z) { input.x = x; input.z = z; if (x || z) sasaranKetik = null; }

  // ---------- Peta mini (zon dan kedudukan semua pemain; ketik zon untuk berjalan) ----------
  const mini = document.createElement('canvas');
  mini.className = 'peta-mini'; mini.width = 176; mini.height = 120;
  mini.setAttribute('aria-hidden', 'true');
  if (!hos) bekas.append(mini);
  const gm = mini.getContext('2d');
  const MX = x => (x / (L + 5) + 0.5) * mini.width, MZ = z => (z / (D + 5) + 0.5) * mini.height;
  mini.addEventListener('pointerdown', e => {
    if (!uidSaya || kunci) return;
    const r = mini.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * (L + 5), z = ((e.clientY - r.top) / r.height - 0.5) * (D + 5);
    pergiKe(THREE.MathUtils.clamp(x, -L / 2, L / 2), THREE.MathUtils.clamp(z, -D / 2, D / 2));
    e.preventDefault();
  });
  let kiraMini = 0;
  function lukisMini() {
    gm.clearRect(0, 0, mini.width, mini.height);
    gm.fillStyle = '#86d85a'; gm.beginPath(); gm.roundRect(2, 2, mini.width - 4, mini.height - 4, 14); gm.fill();
    for (let i = 0; i < zon.length; i++) {
      const k = zon[i]; if (k.jatuh) continue;
      gm.fillStyle = zon.length === 2 ? WARNA_OX[i] : WARNA_ZON[i];
      gm.fillRect(MX(k.x0) + 1, MZ(k.z0) + 1, MX(k.x1) - MX(k.x0) - 2, MZ(k.z1) - MZ(k.z0) - 2);
      gm.fillStyle = 'rgba(255,255,255,.9)'; gm.font = '800 22px "Baloo 2", sans-serif'; gm.textAlign = 'center'; gm.textBaseline = 'middle';
      gm.fillText(zon.length === 2 ? (i ? 'X' : 'O') : SIMBOL[i], (MX(k.x0) + MX(k.x1)) / 2, (MZ(k.z0) + MZ(k.z1)) / 2);
    }
    for (const p of pemain.values()) {
      if (!p.obj.visible || p.saya) continue;
      gm.fillStyle = 'rgba(20,50,90,.75)'; gm.beginPath(); gm.arc(MX(p.x), MZ(p.z), 3, 0, Math.PI * 2); gm.fill();
    }
    const s = uidSaya && pemain.get(uidSaya);
    if (s && s.obj.visible) { gm.fillStyle = '#fff'; gm.strokeStyle = '#14325A'; gm.lineWidth = 3; gm.beginPath(); gm.arc(MX(s.x), MZ(s.z), 6, 0, Math.PI * 2); gm.fill(); gm.stroke(); }
  }

  // ---------- Gelung ----------
  const sasaranKamera = new THREE.Vector3(0, 0, 0);
  let zonLepas = -2;
  P.kemasKini.add((dt, t) => {
    if (penanda.visible) { penandaT += dt; penanda.scale.setScalar(1 + penandaT); penanda.material.opacity = Math.max(0, 0.9 - penandaT * 1.4); if (penandaT > 0.7) penanda.visible = false; }
    for (const [uid, p] of pemain) {
      const o = p.obj;
      if (!o.visible) continue;
      let dx = 0, dz = 0;
      if (p.saya && !p.jatuh) {
        if (!kunci) {
          let ix = input.x, iz = input.z;
          for (const k of kekunci) { ix += KEY[k][0]; iz += KEY[k][1]; }
          if (!ix && !iz && sasaranKetik) {
            const vx = sasaranKetik.x - p.x, vz = sasaranKetik.z - p.z, j = Math.hypot(vx, vz);
            if (j < 0.15) sasaranKetik = null; else { ix = vx / j; iz = vz / j; }
          }
          const m = Math.hypot(ix, iz);
          if (m > 1) { ix /= m; iz /= m; }
          dx = ix * LAJU * dt; dz = iz * LAJU * dt;
          p.x = THREE.MathUtils.clamp(p.x + dx, -L / 2 - 1.8, L / 2 + 1.8);
          p.z = THREE.MathUtils.clamp(p.z + dz, -D / 2 - 1.8, D / 2 + 1.8);
          if (dx || dz) onGerak?.(p.x, p.z);
        }
        const z = zonDi(p.x, p.z);
        if (z !== zonLepas) { zonLepas = z; onZon?.(z); }
      } else if (!p.jatuh) {
        const vx = p.tx - p.x, vz = p.tz - p.z, j = Math.hypot(vx, vz);
        if (!P.gerak || j > 12) { p.x = p.tx; p.z = p.tz; }
        else if (j > 0.02) { const s = Math.min(j, Math.max(LAJU, j * 4) * dt); dx = vx / j * s; dz = vz / j * s; p.x += dx; p.z += dz; }
      }
      // Fizik menegak: lompat, jatuh dari langit, jatuh ke laut
      if (p.jatuh) {
        p.vy -= 22 * dt; p.y += p.vy * dt;
        if (p.y < -0.5 && !p.percik) { p.percik = true; percikan(P.scene, P.kemasKini, { x: p.x, z: p.z }); }
        if (p.y < -5) o.visible = false;
      } else if (p.y > 0 || p.vy > 0) {
        p.vy -= 22 * dt; p.y = Math.max(0, p.y + p.vy * dt); if (p.y === 0) p.vy = 0;
      }
      if (!p.jatuh) p.percik = false;
      o.position.set(p.x, p.y, p.z);
      const laju = Math.hypot(dx, dz) / Math.max(dt, 1e-4);
      p.laju += (laju - p.laju) * 0.3;
      if (Math.hypot(dx, dz) > 1e-4) {
        const arah = Math.atan2(dx, dz);
        let beza = arah - o.rotation.y; beza = Math.atan2(Math.sin(beza), Math.cos(beza));
        o.rotation.y += beza * Math.min(1, dt * 12);
      }
      if (P.gerak) hayunAvatar(o, p.laju, t, p.fasa);
    }
    for (const k of zon) if (k.betul && P.gerak) k.mesh.position.y = -0.22 + Math.abs(Math.sin(t * 6)) * 0.12;
    for (const k of zon) if (k.jatuh) {
      if (P.gerak) { k.vy -= 18 * dt; k.mesh.position.y += k.vy * dt; k.mesh.rotation.z += dt * 0.15; if (k.mesh.position.y < -12) k.mesh.visible = false; }
      else k.mesh.visible = false;
    }
    if (!hos && (kiraMini++ % 3 === 0)) lukisMini();
    // Kamera
    if (mod === 'podium') { mini.style.display = 'none'; return; }
    if (!hos && uidSaya && pemain.get(uidSaya)) {
      const s = pemain.get(uidSaya);
      sasaranKamera.lerp(new THREE.Vector3(s.x * (P.camera.aspect < 1 ? 0.9 : 0.45), 0, s.z * 0.5 + 0.5), Math.min(1, dt * 4));
      const asp = P.camera.aspect;
      const jarak = asp < 1 ? 22 + (1 - asp) * 6 : 25;
      const ke = new THREE.Vector3(sasaranKamera.x, jarak * 0.84, sasaranKamera.z + jarak * 0.55);
      P.camera.position.lerp(ke, Math.min(1, dt * 5));
      P.camera.lookAt(sasaranKamera);
    } else {
      const asp = P.camera.aspect, jarak = asp < 1.2 ? 32 + (1.2 - asp) * 26 : 31;
      P.camera.position.lerp(new THREE.Vector3(0, jarak * 0.8, jarak * 0.6 + 1), Math.min(1, dt * 3));
      P.camera.lookAt(0, 0, 1);
    }
  });

  // ---------- Podium ----------
  const podiumGrp = new THREE.Group();
  function podium(tiga) {
    mod = 'podium';
    kosongLantai(); binaPulau();
    for (const p of pemain.values()) p.obj.visible = false;
    const tinggi = [2.4, 1.7, 1.2], xs = [0, -2.7, 2.7], warna = [0xffc233, 0xd5dde8, 0xe0985a];
    tiga.forEach((s, i) => {
      if (!s) return;
      const blok = new THREE.Mesh(new THREE.BoxGeometry(2.4, tinggi[i], 2.4), toon(warna[i]));
      blok.position.set(xs[i], tinggi[i] / 2, 0); blok.castShadow = blok.receiveShadow = true;
      const nombor = spriteTeks(String(i + 1), { saiz: 90, lebar: 1.2, latar: null, warna: '#2B3A55' });
      nombor.position.set(xs[i], tinggi[i] / 2, 1.3);
      const av = buatAvatar(s.warna, s.avatar, `${s.nama.slice(0, 14)}  ${s.skor}`);
      av.position.set(xs[i], tinggi[i], 0); av.userData.asalY = tinggi[i];
      podiumGrp.add(blok, nombor, av);
    });
    lantai.add(podiumGrp);
    const bil = 450, geo = new THREE.BufferGeometry(), pos = new Float32Array(bil * 3), wr = new Float32Array(bil * 3);
    const pal = [0xffc233, 0xff5a5f, 0x3d7bff, 0x22b573, 0x9b5de5].map(c => new THREE.Color(c));
    for (let i = 0; i < bil; i++) { pos.set([(Math.random() - .5) * 18, Math.random() * 14 + 2, (Math.random() - .5) * 9], i * 3); const c = pal[i % pal.length]; wr.set([c.r, c.g, c.b], i * 3); }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); geo.setAttribute('color', new THREE.BufferAttribute(wr, 3));
    lantai.add(new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.2, vertexColors: true })));
    P.kemasKini.add(function f(dt, t) {
      if (mod !== 'podium') { P.kemasKini.delete(f); return; }
      if (P.gerak) { const a = geo.attributes.position.array; for (let i = 1; i < a.length; i += 3) { a[i] -= dt * 2.2; if (a[i] < 0) a[i] = 14; } geo.attributes.position.needsUpdate = true; }
      const s = P.gerak ? Math.sin(t * 0.3) * 0.5 : 0;
      P.camera.position.set(Math.sin(s) * 12, 6.5, Math.cos(s) * 12); P.camera.lookAt(0, 1.6, 0);
      podiumGrp.children.forEach(c => { if (c.userData.asalY != null && P.gerak) { c.position.y = c.userData.asalY + Math.abs(Math.sin(t * 3)) * 0.3; hayunAvatar(c, 0, t); } });
    });
  }

  susunZon(0);
  return {
    pentas: P, setPemain, setSasaran, kedudukan, zonPemain, zonDi, titikDalamZon, titikLobi, susunZon, dedah, runtuhZon, pulih,
    setKunci, setInput, pergiKe, pergiKeZon, lompat, emote, setHantu, podium,
    get bilZon() { return zon.length; },
    buang() { removeEventListener('keydown', kd); removeEventListener('keyup', ku); P.buang(); },
  };
}

// ---------------------------------------------------------------------------
// Joystick sentuh (DOM). Panggil cb(x, z) dengan nilai -1..1.
// ---------------------------------------------------------------------------
export function buatJoystick(bekas, cb) {
  const pad = document.createElement('div'); pad.className = 'joystick'; pad.setAttribute('aria-hidden', 'true');
  const tombol = document.createElement('div'); tombol.className = 'joystick-tombol'; pad.append(tombol);
  bekas.append(pad);
  let id = null, pusat = null;
  const R = 46;
  const gerak = e => {
    if (e.pointerId !== id) return;
    let x = e.clientX - pusat.x, y = e.clientY - pusat.y; const m = Math.hypot(x, y);
    if (m > R) { x = x / m * R; y = y / m * R; }
    tombol.style.transform = `translate(${x}px, ${y}px)`;
    cb(x / R, y / R);
  };
  const lepas = e => { if (e.pointerId !== id) return; id = null; tombol.style.transform = ''; cb(0, 0); };
  pad.addEventListener('pointerdown', e => { id = e.pointerId; const r = pad.getBoundingClientRect(); pusat = { x: r.left + r.width / 2, y: r.top + r.height / 2 }; pad.setPointerCapture(id); gerak(e); e.preventDefault(); });
  pad.addEventListener('pointermove', gerak);
  pad.addEventListener('pointerup', lepas); pad.addEventListener('pointercancel', lepas);
  return pad;
}
