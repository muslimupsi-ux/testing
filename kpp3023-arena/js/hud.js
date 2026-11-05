// Komponen HUD arena (tanpa three.js, jadi boleh digunakan dalam paparan 2D juga).
import { el } from './util.js';

export const WARNA_ZON = ['#FF5A5F', '#3D7BFF', '#FFB400', '#22B573'];
export const WARNA_OX = ['#3D7BFF', '#FF5A5F'];
export const SIMBOL = ['▲', '◆', '●', '■'];

/** Kad soalan di bahagian atas arena: terus kepada soalan dan pilihan. */
export function kadSoalanHUD(q, i, jumlah) {
  const bs = q.jenis === 'bs';
  return el('div.hud-soalan', {},
    el('span.hud-kiraan', {}, `${i + 1}/${jumlah}`),
    el('button.hud-lipat', { type: 'button', 'aria-label': 'Lipat atau buka kad soalan', onclick: e => { const k = e.currentTarget.closest('.hud-soalan'); k.classList.toggle('lipat'); e.currentTarget.textContent = k.classList.contains('lipat') ? 'Buka' : 'Lipat'; } }, 'Lipat'),
    q.senario ? el('p.hud-senario', {}, q.senario) : null,
    el('h2.hud-teks', {}, q.soalan),
    bs ? el('p.hud-ox', {}, el('b', { style: { '--w': WARNA_OX[0] } }, 'O Betul'), el('b', { style: { '--w': WARNA_OX[1] } }, 'X Salah'))
      : el('ol.hud-pilihan', {}, ...q.pilihan.map((p, k) => el('li', { style: { '--w': WARNA_ZON[k] } }, el('span.bentuk', { 'aria-hidden': 'true' }, SIMBOL[k]), el('span', {}, p)))),
  );
}

export function cincinMasa(baki, masaS) {
  return el('span.pemasa.arena', { role: 'timer', 'aria-label': `${Math.max(0, Math.ceil(baki / 1000))} saat`, style: { '--p': Math.max(0, baki) / (masaS * 1000) } }, el('b', {}, Math.max(0, Math.ceil(baki / 1000))));
}

export const teksJawapan = q => (q.jenis === 'bs' ? (q.jawapan ? 'X, Salah' : 'O, Betul') : `${SIMBOL[q.jawapan]} ${q.pilihan[q.jawapan]}`);
