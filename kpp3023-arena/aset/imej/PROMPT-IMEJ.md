# Prompt imej untuk ChatGPT (pilihan)

Game ini tidak memerlukan imej luar kerana semua grafik dilukis dengan kod (three.js). Jika Dr. mahu wajah yang lebih tersendiri, jana imej dengan ChatGPT menggunakan prompt di bawah, simpan dalam folder ini, kemudian isi laluan fail dalam `firebase-config.js` → `ARENA_TETAPAN.imej`.

## 1. Latar langit dunia 3D → `aset/imej/langit.jpg`

> Cartoon sky background for a cheerful 3D island quiz game, bright daytime, soft gradient from sky blue at the top to pale cyan near the horizon, a few fluffy white low-poly clouds, a distant row of small green tropical islands on the horizon, flat toon shading, no text, no characters, wide panoramic image 2048×1024.

Kemudian: `imej: { langit: 'aset/imej/langit.jpg', ... }`

## 2. Logo → `aset/imej/logo.png`

> App icon for an educational quiz game called "Arena Psikologi": a small tropical island with a green grass top and sandy edge on turquoise water, a tiny cute animal character standing on it, a yellow sun behind, rounded square icon, flat cartoon style, bold simple shapes, no text, transparent background, 512×512.

Kemudian: `imej: { ..., logo: 'aset/imej/logo.png' }`

Nota:
- Elakkan meminta teks dalam imej. Teks yang dijana AI sering tersalah eja.
- Saiz fail: simpan bawah 500 KB (gunakan JPG untuk langit, PNG untuk logo).
- Jangan gunakan watak atau logo daripada game lain.
