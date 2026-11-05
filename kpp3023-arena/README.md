# Arena Psikologi · KPP3023

Game kuiz interaktif untuk **KPP3023 Psikologi dalam Pendidikan** (UPSI, Semester 1 Sesi 2026/2027, A261). Pelajar belayar ke **Kepulauan Psikologi** 3D (three.js): setiap pulau ialah satu unit kursus. Pelajar boleh main solo atau bersama seluruh kelas dalam mod langsung dengan PIN, serta mengumpul lencana dan bersaing di leaderboard.

Bank soalan dibina daripada kandungan SIM KPP3023 (Unit 1 hingga 11 dan Penutup). Ia **bukan** soalan peperiksaan akhir sebenar.

## Ciri utama

| Komponen | Penerangan |
|---|---|
| **Peta Pulau 3D** | 11 pulau unit + Pulau Penutup di laut senja. Klik pulau untuk memulakan cabaran unit. Pulau yang dikuasai (skor ≥ 80%) mendapat bendera emas. |
| **Mod solo** | Pilih unit, set soalan dan bilangan soalan (10/20/40). Tiga mod: Biasa (20 saat), Cabaran (3 nyawa) dan Latihan (tanpa masa). Skor ikut kelajuan (500 hingga 1000 mata) dengan bonus streak. Ada tiga kuasa sekali guna: 50:50, +10 saat dan Gandaan x2. Huraian dipaparkan selepas setiap jawapan. |
| **Mod langsung** | Pensyarah mencipta bilik dan memaparkan PIN 6 digit serta kod QR di projektor. Pelajar sertai dari telefon. Avatar 3D setiap pelajar berlari ke zon jawapan pilihan mereka secara langsung. |
| **Arena O/X** | Untuk soalan Betul/Salah, pelajar boleh bertukar zon O atau X sehingga masa tamat. Apabila jawapan didedah, lantai zon salah runtuh bersama avatar di atasnya. Setiap permainan langsung sentiasa ada pusingan O/X. |
| **Leaderboard** | Skor tertinggi atau jumlah mata, ditapis ikut kumpulan kuliah (AJ / AT05SB), unit, tempoh (hari ini / 7 hari / sepanjang masa) dan set. |
| **Podium dan laporan** | Podium 3D tiga teratas dengan konfeti. Eksport CSV mengandungi nama, no. matrik, kumpulan, skor dan betul/salah bagi setiap soalan. |
| **XP, aras dan lencana** | 21 lencana, termasuk satu lencana untuk setiap pulau (contoh: *Penguasa Piaget*, *Rakan Bandura*), *Streak 10*, *Pantas Kilat* dan *Juara Arena*. |
| **Ulang kaji** | Buku Kesilapan (soalan yang pernah salah, main semula sehingga dibetulkan) dan kad imbas setiap unit. |
| **Set Final A261** | Slot untuk set soalan pensyarah, diimport melalui halaman Admin (JSON atau CSV). |
| **Latihan Premium** | Set soalan kes tambahan berbayar. Pelajar membayar melalui QR DuitNow, kemudian pensyarah meluluskan permohonan di halaman Admin. Lihat bahagian [Latihan Premium](#latihan-premium). |
| **Aksesibiliti** | Tema terang dan gelap, papan kekunci (1 hingga 4 untuk menjawab, Enter untuk seterusnya), menghormati tetapan *reduced motion*, paparan 2D jika WebGL tiada, dan reka letak telefon serta projektor. |

## Fail

| Fail | Isi |
|---|---|
| `index.html` | Laman tunggal (penghala hash: `#/`, `#/solo`, `#/hos`, `#/sertai`, `#/papan`, `#/lencana`, `#/ulangkaji`, `#/premium`, `#/admin`) |
| `css/arena.css` | Gaya, token warna terang/gelap |
| `js/app.js` | Profil, mod solo, keputusan, leaderboard, lencana, ulang kaji, premium, admin |
| `js/live.js` | Mod langsung: skrin hos (projektor) dan skrin pemain (telefon) |
| `js/dunia3d.js` | three.js: Peta Pulau, Arena (lobi, zon jawapan, podium) |
| `js/store.js` | Lapisan data: Firebase Realtime Database, atau mod luar talian (localStorage + BroadcastChannel) |
| `js/util.js` | Utiliti: senarai unit, avatar, skor, bunyi, konfeti |
| `data/soalan-sim.js` | 135 soalan SIM (Unit 1 hingga 11 dan Penutup): aneka pilihan, kes dan Betul/Salah, setiap satu dengan huraian |
| `data/soalan-final-a261.js` | Slot set Final A261 (kosong) |
| `firebase-config.js` | Tetapan Firebase, kod admin dan maklumat bayaran premium |
| `database.rules.json` | Peraturan keselamatan Realtime Database |
| `aset/` | Favicon, dan tempat letak QR DuitNow (ganti dengan QR sebenar) |

## Jalankan

Modul JavaScript memerlukan pelayan web, jadi fail tidak boleh dibuka terus dengan `file://`.

```bash
cd kpp3023-arena
```

```bash
python3 -m http.server 8000
```

Kemudian buka `http://localhost:8000`.

Untuk kelas sebenar, hos folder ini di mana-mana hos statik HTTPS, contohnya GitHub Pages, Netlify atau Firebase Hosting.

**Mod luar talian** (tanpa Firebase) ialah mod lalai. Dalam mod ini:
- leaderboard, lencana dan set Final disimpan dalam pelayar itu sahaja;
- mod langsung hanya berfungsi antara tab dalam pelayar yang sama. Ini sesuai untuk demo, tetapi tidak untuk kelas sebenar;
- Latihan Premium tidak tersedia.

## Setup Firebase (untuk kelas sebenar)

1. Buka [Firebase Console](https://console.firebase.google.com) dan cipta projek baharu, contohnya `arena-kpp3023`.
2. **Build → Realtime Database → Create database**. Pilih lokasi `asia-southeast1` (Singapura), mod *locked*.
3. **Build → Authentication → Get started → Sign-in method → Anonymous → Enable**.
4. **Realtime Database → Rules**: tampal kandungan `database.rules.json`, kemudian tekan **Publish**.
5. **Project settings → Your apps → Web (</>)**: daftar app, kemudian salin objek `firebaseConfig` ke `window.FIREBASE_CONFIG` dalam `firebase-config.js`. Pastikan `databaseURL` ada.
6. **Authentication → Settings → Authorized domains**: tambah domain tempat game dihoskan.
7. **Jadikan diri anda admin**: buka `#/admin` dalam pelayar yang akan anda gunakan. Halaman itu memaparkan UID pelayar tersebut. Dalam **Realtime Database → Data**, tambah `admin/<UID itu> = true`, kemudian muat semula halaman.

Nota:
- UID pelajar ialah *anonymous* dan terikat kepada pelayar. Jika pelajar memadam data pelayar atau bertukar peranti, mereka menjadi pemain baharu di leaderboard. Akses premium pula boleh dipulihkan dengan kod pemulihan.
- Pelan percuma Firebase (Spark) mencukupi untuk satu kelas: 100 sambungan serentak dan 1 GB storan.

## Main dalam kelas

1. Pensyarah buka `#/hos`, pilih unit, bilangan soalan dan masa, kemudian tekan **Cipta bilik**. Tekan **Skrin penuh** untuk projektor.
2. Pelajar imbas kod QR, atau buka `#/sertai` dan masukkan PIN. Kali pertama, pelajar mencipta profil (nama, no. matrik, kumpulan dan avatar).
3. Klik nama pelajar dalam lobi untuk mengeluarkan pemain yang tidak sepatutnya.
4. Tekan **Mula permainan**. Jawapan didedah secara automatik apabila semua pelajar sudah menjawab, kecuali pusingan O/X yang berjalan sehingga masa tamat. Anda juga boleh tekan **Dedah jawapan** atau kekunci Enter.
5. Pada akhir permainan, tekan **Eksport CSV** untuk mendapatkan laporan kelas.

## Soalan

Format setiap soalan (sama untuk semua set):

```js
{ id: 'U2-05', unit: 2, jenis: 'pilihan', aras: 1,
  senario: '…',            // pilihan, untuk jenis 'kes'
  soalan: '…',
  pilihan: ['…', '…', '…', '…'],   // 'bs' sentiasa ['Betul', 'Salah']
  jawapan: 0,              // indeks jawapan betul
  huraian: '…' }
```

- `jenis`: `pilihan` (4 pilihan), `kes` (senario dan 4 pilihan) atau `bs` (Betul/Salah, untuk pusingan Arena O/X).
- `unit`: 1 hingga 11, atau 12 untuk Penutup.
- Susunan pilihan dikocok semasa main, jadi jawapan betul boleh ditulis pada mana-mana kedudukan.

**Set Final A261**: buka `#/admin`, kemudian tampal JSON atau CSV (butang **Muat turun templat CSV** menyediakan contoh). Lajur CSV: `unit,jenis,soalan,senario,a,b,c,d,jawapan,huraian,aras`, dengan `jawapan` = A/B/C/D atau Betul/Salah. Dalam mod Firebase, set ini dikongsi kepada semua pemain.

> Repositori ini mungkin awam, dan pemain boleh membaca soalan dalam set yang dimainkan. Jangan letak soalan peperiksaan sebenar yang belum diduduki dalam repo atau dalam game sebelum peperiksaan.

Dalam mod luar talian, kod admin lalai ialah `kpp3023` (tukar dalam `firebase-config.js`).

## Latihan Premium

Aliran:
1. Pelajar buka `#/premium` dan imbas QR DuitNow.
2. Pelajar isi nama, no. matrik dan no. rujukan transaksi, kemudian tekan **Hantar permohonan**.
3. Pensyarah semak bayaran, kemudian tekan **Luluskan** di `#/admin`.
4. Akses dibuka secara automatik pada peranti pelajar, dan pelajar menerima **kod pemulihan** untuk peranti lain.

Setup:
- Ganti `aset/qr-duitnow.svg` dengan imej QR DuitNow sebenar, kemudian kemas kini `harga`, `penerima` dan `qr` dalam `firebase-config.js`.
- Muat naik soalan premium di `#/admin` → **Soalan premium**. Soalan premium **tidak disimpan dalam repo**. Ia disimpan di Firebase `/premium/soalan`, dan peraturan pangkalan data hanya membenarkan bacaan oleh admin dan pelajar yang diluluskan.
- Set Latihan Premium yang disediakan (48 soalan kes aras tinggi, 4 setiap unit) diberikan sebagai fail `premium-soalan.json` yang berasingan daripada repo.

Tanggungjawab pensyarah:
- Pastikan jualan bahan kepada pelajar sendiri mematuhi peraturan UPSI.
- Kandungan premium mesti kekal berasingan daripada soalan peperiksaan akhir sebenar.
- No. matrik dan no. rujukan bayaran ialah data peribadi. Hanya admin boleh membacanya.

## Ujian yang telah dijalankan

Ujian automatik dengan Playwright (Chromium, WebGL melalui SwiftShader), dalam mod luar talian:
- **Solo**: profil, peta 3D dimuatkan, pusingan 10 soalan, skor, XP, lencana, Buku Kesilapan, leaderboard, kad imbas. Paparan telefon (iPhone 13) tanpa limpahan mendatar.
- **Langsung**: satu hos dan dua pemain dalam tab berasingan. Lobi dengan QR, 10 soalan termasuk pusingan Arena O/X (tukar zon, lantai runtuh), dedah dengan taburan jawapan, papan markah, podium 3D dan eksport CSV.
- **Lain-lain**: admin (import CSV/JSON, baris rosak ditolak), paparan 2D tanpa WebGL, tema gelap, dan config Firebase yang salah beralih ke mod luar talian.
- **Bank soalan**: semakan struktur 135 soalan SIM dan 48 soalan premium (medan wajib, 4 pilihan, indeks jawapan sah, tiada ID berulang).

Laluan Firebase (bilik langsung merentas peranti, kelulusan premium, peraturan pangkalan data) belum diuji dengan projek Firebase sebenar. Uji sekali dengan dua telefon selepas setup dan sebelum kelas pertama.
