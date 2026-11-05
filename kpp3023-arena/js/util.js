// Utiliti kongsi: DOM, kocok, storan pelayar, bunyi, konfeti, avatar, skor.

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/** Bina elemen: el('div.kelas#id', {atribut}, ...anak) */
export function el(tag, attrs = {}, ...kids) {
  const m = tag.match(/^([a-z0-9]+)?((?:[.#][\w-]+)*)$/i);
  const node = document.createElement(m[1] || 'div');
  for (const part of (m[2] || '').match(/[.#][\w-]+/g) || []) {
    if (part[0] === '.') node.classList.add(part.slice(1)); else node.id = part.slice(1);
  }
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else if (k === 'html') node.innerHTML = v;
    else if (k === 'style' && typeof v === 'object') { for (const [sk, sv] of Object.entries(v)) { if (sv == null) continue; if (sk.startsWith('--')) node.style.setProperty(sk, sv); else node.style[sk] = sv; } }
    else node.setAttribute(k, v === true ? '' : v);
  }
  for (const k of kids.flat()) if (k != null && k !== false) node.append(k.nodeType ? k : document.createTextNode(String(k)));
  return node;
}

/** replaceChildren yang mengabaikan null/false (untuk anak bersyarat). */
export function ganti(node, ...kids) {
  node.replaceChildren(...kids.flat().filter(k => k != null && k !== false).map(k => (k.nodeType ? k : document.createTextNode(String(k)))));
  return node;
}

export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

/** Kocok pilihan jawapan dan kekalkan indeks jawapan betul (Betul/Salah tidak dikocok). */
export function sediaSoalan(q) {
  if (q.jenis === 'bs') return { ...q, pilihan: q.pilihan.slice() };
  const urutan = shuffle(q.pilihan.map((_, i) => i));
  return { ...q, pilihan: urutan.map(i => q.pilihan[i]), jawapan: urutan.indexOf(q.jawapan) };
}

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ---------- Storan pelayar (selamat jika disekat) ----------
const PREFIX = 'arena.';
export const simpan = {
  get(k, def = null) { try { const v = localStorage.getItem(PREFIX + k); return v == null ? def : JSON.parse(v); } catch { return def; } },
  set(k, v) { try { localStorage.setItem(PREFIX + k, JSON.stringify(v)); } catch { /* storan disekat */ } },
  del(k) { try { localStorage.removeItem(PREFIX + k); } catch { /* abaikan */ } },
};

// ---------- Unit kursus ----------
export const UNIT = [
  null,
  { n: 1, ringkas: 'Pengenalan', tajuk: 'Pengenalan kepada Psikologi Pendidikan', warna: '#3FA7D6', lencana: 'Perintis Psikologi' },
  { n: 2, ringkas: 'Kognitif', tajuk: 'Perkembangan Kognitif', warna: '#7B61FF', lencana: 'Penguasa Piaget' },
  { n: 3, ringkas: 'Sosioemosi', tajuk: 'Perkembangan Sosioemosi', warna: '#F25F8B', lencana: 'Pakar Ekologi' },
  { n: 4, ringkas: 'Faktor', tajuk: 'Faktor Pertumbuhan dan Perkembangan', warna: '#2BB673', lencana: 'Penjejak Perkembangan' },
  { n: 5, ringkas: 'Kecerdasan', tajuk: 'Keperluan, Kecerdasan dan Gaya Pembelajaran', warna: '#F2A900', lencana: 'Pelbagai Kecerdasan' },
  { n: 6, ringkas: 'Motivasi', tajuk: 'Motivasi dan Personaliti', warna: '#FF7A45', lencana: 'Pemacu Motivasi' },
  { n: 7, ringkas: 'MBPK', tajuk: 'Murid Berkeperluan Pendidikan Khas', warna: '#18A999', lencana: 'Pejuang Inklusif' },
  { n: 8, ringkas: 'Pelaziman', tajuk: 'Pelaziman Klasik dan Operan', warna: '#E8483B', lencana: 'Pakar Pelaziman' },
  { n: 9, ringkas: 'Bandura', tajuk: 'Teori Pembelajaran Sosial Bandura', warna: '#9B5DE5', lencana: 'Rakan Bandura' },
  { n: 10, ringkas: 'Isu semasa', tajuk: 'Isu-Isu Semasa dalam Pendidikan', warna: '#2F6FE4', lencana: 'Penganalisis Isu' },
  { n: 11, ringkas: 'Bilik darjah', tajuk: 'Pengurusan Bilik Darjah', warna: '#C2410C', lencana: 'Pengurus Kelas' },
  { n: 12, ringkas: 'Saya sebagai guru', tajuk: 'Penutup: Saya sebagai Guru', warna: '#FFB627', lencana: 'Guru Memahami Murid' },
];
export const namaUnit = n => (n === 12 ? 'Penutup' : `Unit ${n}`);

// ---------- Avatar ----------
export const AVATAR = ['🐯', '🐼', '🦊', '🐸', '🐵', '🦉', '🐢', '🐬', '🦄', '🐙', '🦁', '🐨', '🐧', '🦋', '🐝', '🐘'];
export const WARNA = ['#E8483B', '#2F6FE4', '#F2A900', '#1E9E62', '#9B5DE5', '#FF7A45', '#18A999', '#F25F8B'];
export const KUMPULAN = ['AJ', 'AT05SB', 'Lain-lain'];

// ---------- Skor ----------
export const MASA_SOALAN = 20; // saat lalai
/** Mata bagi jawapan betul: 500 hingga 1000 bergantung pada kelajuan, + bonus streak. */
export function kiraMata({ betul, ms, masaS, streak = 0, ganda = false }) {
  if (!betul) return 0;
  const nisbah = Math.min(1, Math.max(0, ms / (masaS * 1000)));
  let m = Math.round(1000 * (1 - nisbah / 2));
  m += Math.min(500, Math.max(0, streak - 1) * 100);
  return ganda ? m * 2 : m;
}
export const arasXP = xp => Math.floor(Math.sqrt(Math.max(0, xp) / 120)) + 1;
export const xpUntukAras = aras => (aras - 1) ** 2 * 120;

// ---------- Bunyi (WebAudio, tanpa fail) ----------
let ctx = null;
export const bunyi = {
  get aktif() { return simpan.get('bunyi', true); },
  set aktif(v) { simpan.set('bunyi', v); },
  nada(seq) {
    if (!this.aktif) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      let t = ctx.currentTime;
      for (const [f, d, jenis = 'triangle', vol = 0.12] of seq) {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = jenis; o.frequency.value = f;
        g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + d);
        o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + d);
        t += d * 0.85;
      }
    } catch { /* audio tidak tersedia */ }
  },
  betul() { this.nada([[523, .1], [659, .1], [784, .18]]); },
  salah() { this.nada([[220, .18, 'sawtooth', .08], [165, .25, 'sawtooth', .08]]); },
  detik() { this.nada([[880, .05, 'square', .04]]); },
  klik() { this.nada([[660, .04, 'sine', .06]]); },
  sertai() { this.nada([[392, .08], [523, .12]]); },
  menang() { this.nada([[523, .12], [659, .12], [784, .12], [1047, .3]]); },
};

// ---------- Konfeti (kanvas 2D) ----------
export function konfeti(kekal = 2600) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const c = el('canvas.konfeti', { 'aria-hidden': 'true' });
  document.body.append(c);
  const g = c.getContext('2d');
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const W = c.width = innerWidth * dpr, H = c.height = innerHeight * dpr;
  const warna = ['#FFB627', '#E8483B', '#2F6FE4', '#1E9E62', '#9B5DE5', '#F25F8B'];
  const p = Array.from({ length: 140 }, () => ({
    x: Math.random() * W, y: -Math.random() * H * 0.5, vx: (Math.random() - .5) * 4 * dpr,
    vy: (2 + Math.random() * 4) * dpr, r: Math.random() * Math.PI, vr: (Math.random() - .5) * .3,
    w: (6 + Math.random() * 6) * dpr, h: (8 + Math.random() * 8) * dpr, c: warna[Math.floor(Math.random() * warna.length)],
  }));
  const mula = performance.now();
  (function frame(t) {
    g.clearRect(0, 0, W, H);
    for (const q of p) {
      q.x += q.vx; q.y += q.vy; q.r += q.vr; q.vy += 0.05 * dpr;
      g.save(); g.translate(q.x, q.y); g.rotate(q.r); g.fillStyle = q.c; g.fillRect(-q.w / 2, -q.h / 2, q.w, q.h); g.restore();
    }
    if (t - mula < kekal) requestAnimationFrame(frame); else c.remove();
  })(mula);
}

// ---------- Notis ringkas ----------
export function toast(teks, jenis = '') {
  const t = el('div.toast' + (jenis ? '.' + jenis : ''), { role: 'status' }, teks);
  document.body.append(t);
  setTimeout(() => t.classList.add('keluar'), 2400);
  setTimeout(() => t.remove(), 2900);
}

export function kodRawak(n = 6, abjad = '0123456789') {
  const a = new Uint32Array(n); crypto.getRandomValues(a);
  return [...a].map(x => abjad[x % abjad.length]).join('');
}

export function muatTurun(namaFail, teks, jenis = 'text/csv;charset=utf-8') {
  const url = URL.createObjectURL(new Blob(['﻿' + teks], { type: jenis }));
  const a = el('a', { href: url, download: namaFail });
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function keCSV(baris) {
  return baris.map(r => r.map(v => {
    const s = v == null ? '' : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  }).join(',')).join('\n');
}

export const bolehWebGL = (() => {
  let jawapan;
  return () => {
    if (jawapan !== undefined) return jawapan;
    if (simpan.get('2d', false)) return (jawapan = false);
    try { const c = document.createElement('canvas'); jawapan = !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl'))); }
    catch { jawapan = false; }
    return jawapan;
  };
})();
export const kurangGerak = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
