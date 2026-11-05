# Arena Psikologi · KPP3023

Game kuiz interaktif gaya **ZEP Quiz** untuk **KPP3023 Psikologi dalam Pendidikan** (UPSI, Semester 1 Sesi 2026/2027, A261). Setiap pemain mengawal avatar haiwan comel di sebuah pulau 3D (three.js). Apabila soalan muncul, pemain **berlari ke zon jawapan** (O/X atau ▲ ◆ ● ■) sebelum masa tamat. Lantai zon yang salah runtuh, dan pemain di atasnya jatuh ke laut.

Bank soalan dibina daripada kandungan kursus KPP3023 (Unit 1 hingga 11 dan Penutup) dan ditulis terus kepada soalan. Ia **bukan** soalan peperiksaan akhir sebenar.

## Ciri utama

| Komponen | Penerangan |
|---|---|
| **Arena gaya ZEP Quiz** | Pemain menggerakkan avatar dengan anak panah atau WASD, joystick sentuh, atau ketik/klik lantai. Kekunci 1 hingga 4 (atau O dan X) berjalan terus ke zon. Zon jawapan dilukis besar di lantai, dan ada peta mini yang boleh diketik. Lompat dan emote (👋 😄 😮 👍 🔥) untuk berseronok. |
| **Mod solo** | Main di arena bersama 6 rakan bot yang turut berlari dan kadang-kadang tersalah. Mata ikut kelajuan masuk ke zon yang betul (500 hingga 1000) dengan bonus streak. Mod Biasa atau Cabaran (3 nyawa). Kuasa: 50:50 (dua zon salah runtuh awal), +10 saat, Gandaan x2. Butang **Kunci jawapan** menamatkan pusingan lebih awal. Gaya **Klasik** (tekan butang) masih ada untuk yang lebih suka atau tanpa WebGL. |
| **Mod langsung** | Pensyarah mencipta bilik dan memaparkan PIN serta kod QR di projektor (pandangan atas seluruh arena). Pelajar sertai dari telefon dan menggerakkan avatar masing-masing. Semua orang nampak semua avatar bergerak secara langsung. |
| **Peraturan** | **Mata**: semua terus bermain. **Survival**: jatuh sekali, tersingkir dan menonton sebagai hantu 👻. |
| **Peta Pulau 3D** | Laman utama: 11 pulau unit + Pulau Penutup. Klik pulau untuk bermula. Pulau yang dikuasai (skor ≥ 80%) mendapat bendera. |
| **Leaderboard** | Skor tertinggi atau jumlah mata, ditapis ikut kumpulan kuliah (AJ / AT05SB), unit, tempoh (hari ini / 7 hari / sepanjang masa) dan set. |
| **Podium dan laporan** | Podium 3D tiga teratas dengan konfeti. Eksport CSV mengandungi nama, no. matrik, kumpulan, skor dan betul/salah bagi setiap soalan. |
| **XP, aras dan lencana** | 21 lencana, termasuk satu lencana untuk setiap pulau (contoh: *Penguasa Piaget*, *Rakan Bandura*), *Streak 10*, *Pantas Kilat* dan *Juara Arena*. |
| **Ulang kaji** | Buku Kesilapan (soalan yang pernah salah, main semula sehingga dibetulkan) dan kad imbas setiap unit. |
| **Set Soalan Premium** | Persediaan Pentaksiran Akhir: 48 soalan objektif aras tinggi berbayar, mengikut format peperiksaan akhir KPP3023 (soalan objektif, CLO1). Pelajar membayar melalui QR DuitNow, kemudian pensyarah meluluskan permohonan di halaman Admin. Lihat bahagian [Set Soalan Premium](#set-soalan-premium). |
| **Aksesibiliti** | Tema terang dan gelap, papan kekunci (1 hingga 4 untuk menjawab, Enter untuk seterusnya), menghormati tetapan *reduced motion*, paparan 2D jika WebGL tiada, dan reka letak telefon serta projektor. |

## Fail

| Fail | Isi |
|---|---|
| `index.html` | Laman tunggal (penghala hash: `#/`, `#/solo`, `#/hos`, `#/sertai`, `#/papan`, `#/lencana`, `#/ulangkaji`, `#/premium`, `#/admin`) |
| `css/arena.css` | Gaya, token warna terang/gelap |
| `js/app.js` | Profil, mod solo, keputusan, leaderboard, lencana, ulang kaji, premium, admin |
| `js/solo3d.js` | Mod solo di arena bersama rakan bot |
| `js/live.js` | Mod langsung: skrin hos (projektor) dan skrin pemain (telefon), penyelarasan kedudukan avatar |
| `js/dunia3d.js` | three.js: Peta Pulau, arena kuiz (avatar, pergerakan, zon, lantai runtuh, peta mini, podium), joystick |
| `js/hud.js` | Kad soalan, pemasa dan pemalar warna zon |
| `js/store.js` | Lapisan data: Firebase Realtime Database, atau mod luar talian (localStorage + BroadcastChannel) |
| `js/util.js` | Utiliti: senarai unit, avatar, skor, bunyi, konfeti |
| `data/soalan-sim.js` | 135 soalan SIM (Unit 1 hingga 11 dan Penutup): aneka pilihan, kes dan Betul/Salah, setiap satu dengan huraian |
| `firebase-config.js` | Tetapan Firebase, kod admin, imej pilihan, serta harga, QR dan penerangan Set Soalan Premium |
| `database.rules.json` | Peraturan keselamatan Realtime Database |
| `aset/` | Favicon, tempat letak QR DuitNow, dan `aset/imej/PROMPT-IMEJ.md` (prompt ChatGPT untuk imej pilihan) |

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
- leaderboard dan lencana disimpan dalam pelayar itu sahaja;
- mod langsung hanya berfungsi antara tab dalam pelayar yang sama. Ini sesuai untuk demo, tetapi tidak untuk kelas sebenar;
- Set Soalan Premium tidak boleh dibeli. Untuk demo, pensyarah boleh memuat naik set itu ke pelayar sendiri di `#/admin`, dan set itu terbuka untuk pelayar tersebut sahaja.

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

1. Pensyarah buka `#/hos`, pilih unit, bilangan soalan, masa dan peraturan (Mata atau Survival), kemudian tekan **Cipta bilik**. Tekan **Skrin penuh** untuk projektor.
2. Pelajar imbas kod QR, atau buka `#/sertai` dan masukkan PIN. Kali pertama, pelajar mencipta profil (nama, no. matrik, kumpulan dan avatar). Sementara menunggu, pelajar boleh berlari-lari dan beremote di lobi.
3. Klik nama pelajar dalam senarai lobi dua kali untuk mengeluarkan pemain yang tidak sepatutnya.
4. Tekan **Mula permainan**. Setiap soalan, pelajar berlari ke zon jawapan. Zon tempat mereka berdiri apabila masa tamat ialah jawapan mereka, dan mata dikira dari saat mereka masuk ke zon itu. Tekan **Dedah sekarang** (atau Enter) untuk mendedahkan lebih awal.
5. Pada akhir permainan, tekan **Eksport CSV** untuk mendapatkan laporan kelas.

Nota demo luar talian: jika hos dan pemain dibuka dalam tab berlainan pada satu komputer, avatar hanya bergerak dalam tab yang sedang dilihat. Pelayar menghentikan animasi tab di latar.

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

Untuk menukar atau menambah soalan, sunting `data/soalan-sim.js` mengikut format di atas.

> Repositori ini mungkin awam, dan pemain boleh membaca soalan dalam set yang dimainkan. Jangan letak soalan peperiksaan sebenar dalam repo atau dalam game.

Dalam mod luar talian, kod admin lalai ialah `kpp3023` (tukar dalam `firebase-config.js`).

## Set Soalan Premium

Set berbayar untuk persediaan **Pentaksiran Akhir** KPP3023. Ia mengandungi 48 soalan objektif aras tinggi (aplikasi kes), 4 soalan setiap unit, mengikut format peperiksaan akhir (40%, soalan objektif, CLO1), dengan huraian jawapan. Penerangan yang dipaparkan kepada pelajar boleh disunting dalam `firebase-config.js` → `premium.ringkasan`, `premium.penerangan` dan `premium.penafian`.

Aliran:
1. Pelajar buka `#/premium` dan imbas QR DuitNow.
2. Pelajar isi nama, no. matrik dan no. rujukan transaksi, kemudian tekan **Hantar permohonan**.
3. Pensyarah semak bayaran, kemudian tekan **Luluskan** di `#/admin`.
4. Akses dibuka secara automatik pada peranti pelajar, dan pelajar menerima **kod pemulihan** untuk peranti lain.

Setup:
- Ganti `aset/qr-duitnow.svg` dengan imej QR DuitNow sebenar, kemudian kemas kini `harga`, `penerima` dan `qr` dalam `firebase-config.js`.
- Muat naik soalan di `#/admin` → **Set Soalan Premium** (JSON atau CSV; butang **Muat turun templat CSV** menyediakan contoh). Soalan premium **tidak disimpan dalam repo**. Ia disimpan di Firebase `/premium/soalan`, dan peraturan pangkalan data hanya membenarkan bacaan oleh admin dan pelajar yang diluluskan.
- Set Soalan Premium yang disediakan (48 soalan, 4 setiap unit) diberikan sebagai fail `premium-soalan.json` yang berasingan daripada repo.

Tanggungjawab pensyarah:
- Pastikan jualan bahan kepada pelajar sendiri mematuhi peraturan UPSI.
- Set ini soalan latihan persediaan. Ia mesti kekal berasingan daripada soalan peperiksaan akhir sebenar, dan penafian itu dipaparkan kepada pelajar.
- No. matrik dan no. rujukan bayaran ialah data peribadi. Hanya admin boleh membacanya.

## Ujian yang telah dijalankan

Ujian automatik dengan Playwright (Chromium, WebGL melalui SwiftShader), dalam mod luar talian:
- **Solo arena** (desktop 1366×800 dan iPhone 13): lobi bersama bot, 10 soalan dengan pergerakan ke zon (kekunci nombor dan ketik lantai), Kunci jawapan, lantai runtuh, panel jawapan dan keputusan. Tiada ralat konsol.
- **Langsung arena**: satu hos dan dua pemain dalam tab berasingan. Pemain bergerak dan beremote di lobi, berjalan ke zon, peraturan Survival (tersingkir menjadi hantu), dedah dengan taburan, papan markah, podium 3D dan eksport CSV.
- **Lain-lain**: butang Laman utama selepas menjawab (solo arena, klasik, langsung), mod klasik, admin (import Set Soalan Premium dalam mod demo), paparan 2D tanpa WebGL, tema gelap, config Firebase yang salah beralih ke mod luar talian.
- **Bank soalan**: semakan struktur 135 soalan dan 48 soalan premium.

Laluan Firebase (bilik langsung merentas peranti, kelulusan premium, peraturan pangkalan data) belum diuji dengan projek Firebase sebenar. Uji sekali dengan dua telefon selepas setup dan sebelum kelas pertama.
