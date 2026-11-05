// Dunia 3D (three.js): Peta Pulau untuk mod solo, dan Arena untuk mod langsung (lobi, zon jawapan O/X atau A-D, podium).
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { UNIT, kurangGerak } from './util.js';

const WARNA_JAWAPAN = ['#E8483B', '#2F6FE4', '#F2A900', '#1E9E62'];
const BENTUK = ['▲', '◆', '●', '■'];
const LANGIT = 0x16304f;

// ---------------------------------------------------------------------------
// Pentas asas: renderer, kamera, gelung animasi, saiz semula
// ---------------------------------------------------------------------------
class Pentas {
  constructor(bekas, { kamera = [0, 14, 18], sasaran = [0, 0, 0], kawal = false } = {}) {
    this.bekas = bekas;
    this.gerak = !kurangGerak();
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.domElement.className = 'kanvas3d';
    bekas.append(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(LANGIT);
    this.scene.fog = new THREE.Fog(LANGIT, 30, 70);
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200);
    this.camera.position.set(...kamera);
    this.sasaran = new THREE.Vector3(...sasaran);
    this.camera.lookAt(this.sasaran);

    const hemi = new THREE.HemisphereLight(0xcfe8ff, 0x2a3b2a, 1.1);
    const mentari = new THREE.DirectionalLight(0xffe2b0, 2.2);
    mentari.position.set(10, 20, 8);
    mentari.castShadow = true;
    mentari.shadow.mapSize.set(1024, 1024);
    Object.assign(mentari.shadow.camera, { left: -25, right: 25, top: 25, bottom: -25, near: 1, far: 60 });
    this.scene.add(hemi, mentari);

    if (kawal) {
      this.kawalan = new OrbitControls(this.camera, this.renderer.domElement);
      this.kawalan.target.copy(this.sasaran);
      Object.assign(this.kawalan, { enableDamping: true, maxPolarAngle: Math.PI * 0.42, minDistance: 10, maxDistance: 42, enablePan: false });
    }

    this.kemasKini = new Set();
    this.jam = new THREE.Clock();
    this.saiz = this.saiz.bind(this);
    this.ro = new ResizeObserver(this.saiz);
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
    // Anjakan pandangan: letak dunia di sebelah kanan apabila ada teks di kiri (skrin lebar)
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
function spriteTeks(baris, { saiz = 48, warna = '#fff', latar = 'rgba(14,42,71,.82)', lebar = 1.6 } = {}) {
  const c = document.createElement('canvas');
  const g = c.getContext('2d');
  const font = `700 ${saiz}px "Baloo 2", "Atkinson Hyperlegible", system-ui, sans-serif`;
  g.font = font;
  const arr = Array.isArray(baris) ? baris : [baris];
  const w = Math.ceil(Math.max(...arr.map(b => g.measureText(b).width))) + saiz;
  const h = Math.ceil(arr.length * saiz * 1.15 + saiz * 0.5);
  c.width = w; c.height = h;
  g.font = font;
  if (latar) { g.fillStyle = latar; const r = saiz * 0.45; g.beginPath(); g.roundRect(0, 0, w, h, r); g.fill(); }
  g.fillStyle = warna; g.textAlign = 'center'; g.textBaseline = 'middle';
  arr.forEach((b, i) => g.fillText(b, w / 2, saiz * 0.25 + saiz * 1.15 * (i + 0.5)));
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthWrite: false, transparent: true, fog: false }));
  const unit = lebar / (saiz * 2.6); // unit dunia bagi setiap piksel kanvas
  s.scale.set(w * unit, h * unit, 1);
  return s;
}

const GEO = {
  badan: new THREE.CapsuleGeometry(0.32, 0.45, 4, 10),
  kepala: new THREE.SphereGeometry(0.3, 18, 14),
  mata: new THREE.SphereGeometry(0.05, 8, 6),
};
const MAT_MATA = new THREE.MeshStandardMaterial({ color: 0x1b1b1b, roughness: 0.4 });
const MAT_KULIT = new THREE.MeshStandardMaterial({ color: 0xf3d2b0, roughness: 0.7 });

/** Watak rendah-poli dengan label (emoji + nama) di atas kepala. */
export function buatAvatar(warna = '#2F6FE4', emoji = '🙂', nama = '') {
  const g = new THREE.Group();
  const badan = new THREE.Mesh(GEO.badan, new THREE.MeshStandardMaterial({ color: warna, roughness: 0.55 }));
  badan.position.y = 0.55; badan.castShadow = true;
  const kepala = new THREE.Mesh(GEO.kepala, MAT_KULIT);
  kepala.position.y = 1.18; kepala.castShadow = true;
  const m1 = new THREE.Mesh(GEO.mata, MAT_MATA), m2 = m1.clone();
  m1.position.set(-0.11, 1.22, 0.27); m2.position.set(0.11, 1.22, 0.27);
  const label = spriteTeks(nama ? `${emoji} ${nama}` : emoji, { saiz: 44, lebar: 1.25 });
  label.position.y = 1.95;
  g.add(badan, kepala, m1, m2, label);
  g.userData = { label, badan };
  return g;
}

function laut(scene, gerak) {
  const geo = new THREE.PlaneGeometry(140, 140, 70, 70);
  geo.rotateX(-Math.PI / 2);
  const mat = new THREE.MeshStandardMaterial({ color: 0x1f6f8b, roughness: 0.35, metalness: 0.1, flatShading: true, transparent: true, opacity: 0.95 });
  const air = new THREE.Mesh(geo, mat);
  air.receiveShadow = true;
  air.position.y = -0.35;
  scene.add(air);
  const asal = geo.attributes.position.array.slice();
  return (dt, t) => {
    if (!gerak) return;
    const p = geo.attributes.position.array;
    for (let i = 0; i < p.length; i += 3) p[i + 1] = asal[i + 1] + Math.sin(asal[i] * 0.35 + t * 1.2) * 0.12 + Math.cos(asal[i + 2] * 0.3 + t) * 0.1;
    geo.attributes.position.needsUpdate = true;
  };
}

function lompat(obj, ke, { tinggi = 1.4, masa = 0.7, gerak = true } = {}, selesai) {
  const dari = obj.position.clone();
  let t = 0;
  if (!gerak) { obj.position.copy(ke); selesai?.(); return () => true; }
  return (dt) => {
    t = Math.min(1, t + dt / masa);
    obj.position.lerpVectors(dari, ke, t);
    obj.position.y = THREE.MathUtils.lerp(dari.y, ke.y, t) + Math.sin(t * Math.PI) * tinggi;
    if (t >= 1) { selesai?.(); return true; }
    return false;
  };
}

// ---------------------------------------------------------------------------
// Peta Pulau (mod solo)
// ---------------------------------------------------------------------------
export function petaPulau(bekas, { kemajuan = {}, lencana = [], avatar, unitSemasa = 1, onPilih }) {
  const P = new Pentas(bekas, { kamera: [0, 22, 26], kawal: true });
  P.anjakX = 0.17; P.saiz();
  P.kemasKini.add(laut(P.scene, P.gerak));
  const raycaster = new THREE.Raycaster(), tetikus = new THREE.Vector2();
  const pulau = [];
  const kedudukan = n => {
    // Lingkaran berpusar: unit 1 di luar, Penutup di tengah
    if (n === 12) return new THREE.Vector3(0, 0, 0);
    const sudut = (n - 1) / 11 * Math.PI * 2 * 0.92 - Math.PI / 2;
    const r = 15 - (n - 1) * 0.55;
    return new THREE.Vector3(Math.cos(sudut) * r, 0, Math.sin(sudut) * r);
  };

  const pasir = new THREE.MeshStandardMaterial({ color: 0xf2d7a6, roughness: 0.9 });
  for (let n = 1; n <= 12; n++) {
    const u = UNIT[n];
    const g = new THREE.Group();
    g.position.copy(kedudukan(n));
    const besar = n === 12 ? 1.5 : 1;
    const tapak = new THREE.Mesh(new THREE.CylinderGeometry(1.7 * besar, 2.1 * besar, 0.7, 9), pasir);
    tapak.receiveShadow = true; tapak.castShadow = true;
    const bukit = new THREE.Mesh(new THREE.DodecahedronGeometry(1.05 * besar, 0), new THREE.MeshStandardMaterial({ color: u.warna, roughness: 0.6, flatShading: true }));
    bukit.position.y = 0.55; bukit.scale.y = 0.75; bukit.castShadow = true;
    bukit.rotation.y = n;
    g.add(tapak, bukit);
    // Pokok kelapa kecil
    const batang = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 1.1, 5), new THREE.MeshStandardMaterial({ color: 0x8b5a2b }));
    batang.position.set(1.05 * besar, 0.9, 0.5); batang.rotation.z = -0.25;
    const daun = new THREE.Mesh(new THREE.ConeGeometry(0.5, 0.35, 6), new THREE.MeshStandardMaterial({ color: 0x2bb673, flatShading: true }));
    daun.position.set(1.2 * besar, 1.5, 0.5);
    g.add(batang, daun);

    const terbaik = kemajuan[n]?.terbaik;
    const label = spriteTeks([n === 12 ? 'Penutup' : `Unit ${n}`, u.ringkas + (terbaik != null ? `  ${terbaik}%` : '')], { saiz: 44, lebar: 2.1 });
    label.position.y = 2.6 * (n === 12 ? 1.2 : 1);
    g.add(label);

    if (lencana.includes('unit-' + n)) {
      const tiang = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.4, 6), new THREE.MeshStandardMaterial({ color: 0xdddddd }));
      tiang.position.set(-0.9 * besar, 1.3, -0.3);
      const bendera = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.38), new THREE.MeshStandardMaterial({ color: 0xffb627, side: THREE.DoubleSide, emissive: 0x7a4b00 }));
      bendera.position.set(-0.6 * besar, 1.82, -0.3);
      g.add(tiang, bendera);
      const cincin = new THREE.Mesh(new THREE.TorusGeometry(2.25 * besar, 0.07, 6, 40), new THREE.MeshBasicMaterial({ color: 0xffd36e }));
      cincin.rotation.x = Math.PI / 2; cincin.position.y = -0.15;
      g.add(cincin);
      P.kemasKini.add((dt, t) => { bendera.rotation.y = Math.sin(t * 3 + n) * 0.3; });
    }
    g.userData = { n, bukit };
    pulau.push(g);
    P.scene.add(g);
  }

  // Batu loncatan antara pulau mengikut urutan unit
  const batu = new THREE.MeshStandardMaterial({ color: 0xc9b38a, roughness: 1 });
  const geoBatu = new THREE.CylinderGeometry(0.22, 0.26, 0.2, 7);
  for (let n = 1; n < 12; n++) {
    const a = kedudukan(n), b = kedudukan(n + 1), jarak = a.distanceTo(b);
    const bil = Math.max(2, Math.floor(jarak / 1.1) - 3);
    for (let i = 1; i <= bil; i++) {
      const t = 0.2 + 0.6 * (i / (bil + 1));
      const m = new THREE.Mesh(geoBatu, batu);
      m.position.lerpVectors(a, b, t); m.position.y = -0.18;
      P.scene.add(m);
    }
  }

  // Avatar pemain
  const wira = buatAvatar(avatar?.warna, avatar?.emoji, '');
  const atas = n => kedudukan(n).add(new THREE.Vector3(0, n === 12 ? 1.25 : 0.95, n === 12 ? 1.6 : 1.1));
  wira.position.copy(atas(unitSemasa));
  P.scene.add(wira);
  let animasi = null;
  P.kemasKini.add((dt, t) => {
    if (animasi && animasi(dt)) animasi = null;
    if (!animasi && P.gerak) wira.position.y = atas(semasa).y + Math.abs(Math.sin(t * 2.4)) * 0.12;
    wira.rotation.y += (Math.atan2(P.camera.position.x - wira.position.x, P.camera.position.z - wira.position.z) - wira.rotation.y) * 0.1;
    for (const p of pulau) {
      const s = p.userData.n === hover ? 1.08 : 1;
      p.scale.lerp(new THREE.Vector3(s, s, s), 0.2);
    }
  });
  let semasa = unitSemasa, hover = null;

  const cari = (e) => {
    const r = P.renderer.domElement.getBoundingClientRect();
    tetikus.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    raycaster.setFromCamera(tetikus, P.camera);
    const hit = raycaster.intersectObjects(pulau, true)[0];
    let o = hit?.object; while (o && o.userData.n == null) o = o.parent;
    return o?.userData.n ?? null;
  };
  let tekan = null;
  const kanvas = P.renderer.domElement;
  kanvas.addEventListener('pointermove', e => { hover = cari(e); kanvas.style.cursor = hover ? 'pointer' : 'grab'; });
  kanvas.addEventListener('pointerdown', e => { tekan = [e.clientX, e.clientY]; });
  kanvas.addEventListener('pointerup', e => {
    if (!tekan || Math.hypot(e.clientX - tekan[0], e.clientY - tekan[1]) > 6) return;
    const n = cari(e);
    if (n) pilih(n);
  });

  function pilih(n) {
    if (animasi) return;
    semasa = n;
    animasi = lompat(wira, atas(n), { gerak: P.gerak, masa: 0.75, tinggi: 2.2 }, () => onPilih?.(n));
  }

  return { pilih, pentas: P, buang: () => P.buang() };
}

// ---------------------------------------------------------------------------
// Arena (mod langsung): lobi, zon jawapan, dedah, podium
// ---------------------------------------------------------------------------
export function arena(bekas) {
  const P = new Pentas(bekas, { kamera: [0, 13, 17], sasaran: [0, 0, -1] });
  P.kemasKini.add(laut(P.scene, P.gerak));

  const lantai = new THREE.Group(); P.scene.add(lantai);
  const pemain = new Map(); // uid -> {obj, sasaran, jatuh, vy}
  let zon = [];            // [{mesh, label, pusat, lebar, dalam}]
  let mod = 'lobi';
  const pentasLobi = new THREE.Mesh(new THREE.CylinderGeometry(7.5, 8, 0.8, 24), new THREE.MeshStandardMaterial({ color: 0xf2d7a6, roughness: 0.9 }));
  pentasLobi.receiveShadow = true; pentasLobi.position.y = -0.4;
  const tebing = new THREE.Mesh(new THREE.BoxGeometry(18, 0.8, 2.4), new THREE.MeshStandardMaterial({ color: 0xe9cf9b, roughness: 0.9 }));
  tebing.receiveShadow = true; tebing.position.set(0, -0.4, 5.6);
  const podiumGrp = new THREE.Group();

  const kekal = new Set([pentasLobi, tebing, podiumGrp]);
  function kosongkanLantai() {
    for (const c of [...lantai.children]) {
      lantai.remove(c);
      if (!kekal.has(c)) { c.geometry?.dispose(); c.material?.map?.dispose(); c.material?.dispose(); }
    }
    zon = [];
  }

  function susunLobi() {
    mod = 'lobi';
    kosongkanLantai();
    lantai.add(pentasLobi);
    P.camera.position.set(0, 12, 15); P.sasaran.set(0, 0, 0); P.camera.lookAt(P.sasaran);
    agih();
  }

  /** Bina N zon jawapan. N=2 untuk Betul/Salah (O dan X). */
  function susunZon(n, labels) {
    mod = 'soalan';
    kosongkanLantai();
    const lebar = n === 2 ? 7.2 : 4.3, jurang = 0.5;
    const jumlah = n * lebar + (n - 1) * jurang;
    for (let i = 0; i < n; i++) {
      const warna = n === 2 ? (i === 0 ? '#2F6FE4' : '#E8483B') : WARNA_JAWAPAN[i];
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(lebar, 0.8, 7), new THREE.MeshStandardMaterial({ color: warna, roughness: 0.5 }));
      mesh.receiveShadow = true;
      const x = -jumlah / 2 + lebar / 2 + i * (lebar + jurang);
      mesh.position.set(x, -0.4, -0.8);
      const simbol = n === 2 ? (i === 0 ? 'O' : 'X') : BENTUK[i];
      const lab = spriteTeks(labels?.[i] ? `${simbol}  ${labels[i]}` : simbol, { saiz: 64, lebar: n === 2 ? 3.2 : 2.2, latar: 'rgba(0,0,0,.35)' });
      lab.position.set(x, 3.4, -4.2);
      lantai.add(mesh, lab);
      zon.push({ mesh, lab, pusat: new THREE.Vector3(x, 0, -0.8), lebar, dalam: 7, y0: -0.4, jatuh: false });
    }
    lantai.add(tebing);
    P.camera.position.set(0, 13, 16.5); P.sasaran.set(0, 0, -0.5); P.camera.lookAt(P.sasaran);
    agih();
  }

  /** Kira kedudukan setiap pemain mengikut zon (atau tebing untuk yang belum menjawab). */
  function agih() {
    const kumpulan = new Map();
    for (const [uid, p] of pemain) {
      const k = mod === 'soalan' && p.zon != null && zon[p.zon] ? p.zon : -1;
      if (!kumpulan.has(k)) kumpulan.set(k, []);
      kumpulan.get(k).push(uid);
    }
    for (const [k, senarai] of kumpulan) {
      senarai.sort();
      senarai.forEach((uid, i) => {
        const p = pemain.get(uid);
        let pos;
        if (mod === 'lobi') {
          const sudut = i * 2.399, r = 1.2 + Math.sqrt(i) * 0.95;
          pos = new THREE.Vector3(Math.cos(sudut) * Math.min(r, 6.6), 0, Math.sin(sudut) * Math.min(r, 6.6));
        } else if (k === -1) {
          const lajur = 16, x = (i % lajur) - (Math.min(senarai.length, lajur) - 1) / 2, z = Math.floor(i / lajur);
          pos = new THREE.Vector3(x * 1.05, 0, 5.2 + z * 0.8);
        } else {
          const z = zon[k], lajur = Math.max(2, Math.floor(z.lebar / 0.85));
          const x = (i % lajur) - (Math.min(senarai.length, lajur) - 1) / 2, baris = Math.floor(i / lajur);
          pos = new THREE.Vector3(z.pusat.x + x * 0.85, 0, z.pusat.z + 2.6 - baris * 0.9);
        }
        p.sasaran = pos;
      });
    }
  }

  /** Senarai pemain: [{uid, nama, avatar, warna}] */
  function setPemain(senarai) {
    const ada = new Set();
    for (const s of senarai) {
      ada.add(s.uid);
      if (!pemain.has(s.uid)) {
        const obj = buatAvatar(s.warna, s.avatar, s.nama.slice(0, 14));
        obj.position.set((Math.random() - 0.5) * 4, P.gerak ? 9 : 0, (Math.random() - 0.5) * 3);
        P.scene.add(obj);
        pemain.set(s.uid, { obj, sasaran: new THREE.Vector3(), zon: null, jatuh: false, vy: 0, fasa: Math.random() * 6 });
      }
    }
    for (const [uid, p] of pemain) if (!ada.has(uid)) { P.scene.remove(p.obj); pemain.delete(uid); }
    agih();
  }

  /** Pemain bergerak ke zon pilihan (null = belum menjawab). */
  function letak(uid, z) {
    const p = pemain.get(uid);
    if (!p || p.zon === z) return;
    p.zon = z; agih();
  }

  function resetZon() { for (const p of pemain.values()) { p.zon = null; p.jatuh = false; p.vy = 0; p.obj.visible = true; } }

  /** Dedah jawapan: lantai zon salah jatuh bersama pemain di atasnya. */
  function dedah(betul) {
    zon.forEach((z, i) => { if (i !== betul) z.jatuh = true; else z.mesh.material.emissive = new THREE.Color(0x335500); });
    for (const p of pemain.values()) if (p.zon != null && p.zon !== betul) { p.jatuh = true; p.vy = 0; }
  }

  function susunPodium(tiga) {
    mod = 'podium';
    kosongkanLantai();
    for (const p of pemain.values()) p.obj.visible = false;
    podiumGrp.clear();
    const tinggi = [2.4, 1.7, 1.2], xs = [0, -2.6, 2.6], warna = [0xffb627, 0xc0c7d1, 0xcd7f32];
    tiga.forEach((s, i) => {
      if (!s) return;
      const blok = new THREE.Mesh(new THREE.BoxGeometry(2.3, tinggi[i], 2.3), new THREE.MeshStandardMaterial({ color: warna[i], roughness: 0.35, metalness: 0.3 }));
      blok.position.set(xs[i], tinggi[i] / 2 - 0.4, 0); blok.castShadow = blok.receiveShadow = true;
      const nombor = spriteTeks(String(i + 1), { saiz: 80, lebar: 1.1, latar: null, warna: '#0E2A47' });
      nombor.position.set(xs[i], tinggi[i] / 2 - 0.4, 1.2);
      const av = buatAvatar(s.warna, s.avatar, `${s.nama.slice(0, 14)} · ${s.skor}`);
      av.position.set(xs[i], tinggi[i] - 0.4, 0);
      av.userData.asalY = av.position.y;
      podiumGrp.add(blok, nombor, av);
    });
    lantai.add(pentasLobi, podiumGrp);
    // Partikel konfeti 3D
    const bil = 400, geo = new THREE.BufferGeometry(), pos = new Float32Array(bil * 3), warnaArr = new Float32Array(bil * 3);
    const pal = [0xffb627, 0xe8483b, 0x2f6fe4, 0x1e9e62, 0x9b5de5].map(c => new THREE.Color(c));
    for (let i = 0; i < bil; i++) {
      pos.set([(Math.random() - .5) * 16, Math.random() * 14 + 2, (Math.random() - .5) * 8], i * 3);
      const c = pal[i % pal.length]; warnaArr.set([c.r, c.g, c.b], i * 3);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(warnaArr, 3));
    const titik = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.18, vertexColors: true }));
    lantai.add(titik);
    P.kemasKini.add(function konfeti(dt) {
      if (mod !== 'podium') { P.kemasKini.delete(konfeti); return; }
      if (!P.gerak) return;
      const a = geo.attributes.position.array;
      for (let i = 1; i < a.length; i += 3) { a[i] -= dt * 2.2; if (a[i] < -0.3) a[i] = 14; }
      geo.attributes.position.needsUpdate = true;
    });
    P.sasaran.set(0, 1.4, 0);
  }

  P.kemasKini.add((dt, t) => {
    for (const p of pemain.values()) {
      const o = p.obj;
      if (p.jatuh) {
        p.vy -= 18 * dt; o.position.y += p.vy * dt;
        if (o.position.y < -8) o.visible = false;
        continue;
      }
      const sebelum = o.position.clone();
      const dxz = new THREE.Vector3(p.sasaran.x - o.position.x, 0, p.sasaran.z - o.position.z);
      const jauh = dxz.length();
      if (P.gerak) {
        o.position.x += dxz.x * Math.min(1, dt * 4);
        o.position.z += dxz.z * Math.min(1, dt * 4);
        const tanah = 0;
        if (o.position.y > tanah + 0.01 && jauh < 0.05) o.position.y = Math.max(tanah, o.position.y - dt * 12);
        else if (o.position.y > 2) o.position.y -= dt * 12;
        else o.position.y = tanah + (jauh > 0.15 ? Math.abs(Math.sin(t * 12 + p.fasa)) * 0.35 : Math.abs(Math.sin(t * 2 + p.fasa)) * 0.06);
      } else { o.position.set(p.sasaran.x, 0, p.sasaran.z); }
      const arah = o.position.clone().sub(sebelum);
      if (arah.lengthSq() > 1e-5) o.rotation.y = Math.atan2(arah.x, arah.z);
      else o.rotation.y += (0 - o.rotation.y) * 0.1;
    }
    for (const z of zon) {
      if (z.jatuh && P.gerak) { z.mesh.position.y -= dt * 6; z.lab.material.opacity = Math.max(0, z.lab.material.opacity - dt); }
      else if (z.jatuh) z.mesh.visible = false;
    }
    if (mod === 'podium') {
      const r = 11, s = P.gerak ? t * 0.25 : 0.4;
      P.camera.position.set(Math.sin(s) * r, 6, Math.cos(s) * r);
      podiumGrp.children.forEach(c => { if (c.userData.asalY != null && P.gerak) c.position.y = c.userData.asalY + Math.abs(Math.sin(t * 3)) * 0.3; });
    }
    P.camera.lookAt(P.sasaran);
  });

  P.scene.add(lantai);
  susunLobi();
  return { setPemain, letak, susunLobi, susunZon, resetZon, dedah, susunPodium, pentas: P, buang: () => P.buang() };
}
