# WebApp Bengkel AI Guru · JPN Melaka 2026

WebApp untuk **Bengkel Pemerkasaan Kompetensi Digital Guru Melalui Kecerdasan Buatan (AI)**, anjuran Unit Bahasa, Sektor Pembelajaran, Jabatan Pendidikan Negeri Melaka.

- Tarikh: 3 November 2026 (Selasa), 11.00 pagi hingga 5.00 petang
- Tempat: Hotel Kingston, Melaka
- Fasilitator: Dr. Muslim Zalli, Dr. Nik Muhammad Hanis, En. Farid Zul, En. Rais Mujahid (UPSI)
- Laman: https://drmuslimzalli.aila.my/bengkel-ai-jpn-melaka (AILA, site 528, page 1829)

## Kandungan (5 tab)

| Tab | Isi |
|---|---|
| **Utama** | Maklumat bengkel, fasilitator, laluan bengkel, log masuk DELIMa, alat AI, etika penggunaan AI |
| **Pedagogi** | Rajah Proses Pedagogi interaktif (Penyediaan Bahan → Induksi → Pengetahuan Kandungan → Pengukuhan → Pentaksiran → Penutup), formula R-T-F, 39 templat prompt mengikut fasa PdP (Set Induksi, Kandungan, Pengukuhan, Pentaksiran, Penutup, Sokongan PdP), Kamus Penambah, Prompt Iterasi, Senarai Semak |
| **Web App** | Langkah Gemini Canvas, formula K-F-A-R-T, Templat Induk, 12 templat web app (B1–B12), Kamus Ciri, Prompt Iterasi, Senarai Semak & Privasi |
| **Pembina** | Alat interaktif: pilih templat, isi maklumat kelas, petak `[ ]` diisi secara automatik, tambah ayat Kamus, salin dan buka Gemini/ChatGPT/NotebookLM |
| **Hantar** | Borang hasil peserta, disimpan dalam koleksi AILA `hasil_bengkel` (hanya pemilik boleh membaca) |

Ciri tambahan: kod QR, mod tayang (skrin penuh dan kekunci ← →), reka bentuk responsif (bar tab di bawah pada telefon, tab atas pada desktop).

## Fail

Setiap fail sepadan dengan satu medan halaman AILA:

| Fail | Medan AILA |
|---|---|
| `head.html` | `head_html` (fon Google, qrcodejs) |
| `body.html` | `html` |
| `style.css` | `css` |
| `app.js` | `js`: bahagian atas ialah **data kandungan** (`var D = {...}`), bahagian bawah ialah logik aplikasi |
| `aset/favicon.svg`, `aset/favicon-512.png` | Favicon laman (pustaka media AILA: `favicon-ai`) |

## Cara menyunting kandungan

Semua teks templat ada di bahagian atas `app.js`, dalam objek `D`:

- `D.FASIL`: senarai fasilitator (`n` = nama, `i` = inisial avatar, `o` = institusi, `url` = pautan profil, pilihan). Untuk memasang gambar, tambah `foto: '/media/<nama-aset-AILA>'` pada orang berkenaan; gambar akan menggantikan inisial
- `D.PROSES`: langkah rajah Proses Pedagogi dan fasa templat yang dipautkan
- `D.PED`: templat Pedagogi Gen AI (`id`, `s` = fasa, `t` = tajuk, `p` = prompt)
- `D.INDUK`, `D.WEB`: Templat Induk dan 12 templat Web App (`ico` = nama ikon, `c` = kategori, `w` = bila digunakan, `p` = prompt)
- `D.KAMUS_PED`, `D.KAMUS_WEB`: ayat Kamus Penambah / Kamus Ciri
- `D.ITER_PED`, `D.ITER_WEB`: prompt iterasi
- `D.SUBJEK`, `D.TAHUN`, `D.MASA`, `D.WARNA`: pilihan dalam Pembina Prompt

Petak berikut diisi secara automatik oleh Pembina: `[Mata Pelajaran]`, `[Tajuk/Topik]`, `[Topik]`, `[Tahun/Tingkatan]`, `[Objektif Pembelajaran]`, `[Tempoh Masa]`, `[Bilangan]`, `[Bahasa]`, `[Pengguna Sasaran]`, `[Warna Pilihan]` dan `[Tajuk …]`. Petak lain menjadi medan tambahan secara automatik. Petak yang mengandungi pilihan seperti `[a / b]` dipaparkan sebagai senarai pilihan.

Selepas menyunting, salin kandungan setiap fail ke medan yang sepadan di AILA. Medan yang tidak berubah tidak perlu disalin.

## Sumber

Kandungan templat diambil daripada *Prompt Template Pedagogi Gen AI* dan *Prompt Template Bina Web App dengan Gemini* (Prof. Dr. Izwan Shahril, Dr. Mohd Muslim Md Zalli dan Dr. Nik Muhammad Hanis; Pusat Akademik, UPSI Holdings Sdn. Bhd., 2026). Beberapa petak dinamakan semula supaya tidak bertindih dalam Pembina, contohnya `[Bilangan saat]` untuk pemasa.
