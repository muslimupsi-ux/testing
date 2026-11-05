/*
 * Tetapan Arena Psikologi KPP3023
 *
 * 1. FIREBASE_CONFIG
 *    Biarkan null untuk mod luar talian: leaderboard disimpan dalam pelayar sahaja, dan mod langsung
 *    hanya berfungsi antara tab dalam satu komputer (sesuai untuk demo).
 *    Untuk kelas sebenar, isi dengan config projek Firebase anda (lihat README.md, bahagian "Setup Firebase").
 *
 * 2. ARENA_TETAPAN
 *    adminKod  : kod laluan untuk halaman Admin dalam mod luar talian (dalam mod Firebase, akses admin
 *                ditentukan oleh peraturan pangkalan data, bukan kod ini)
 *    premium   : maklumat Set Latihan Premium (harga, penerima bayaran, gambar QR DuitNow)
 */
window.FIREBASE_CONFIG = null;
/* Contoh:
window.FIREBASE_CONFIG = {
  apiKey: "AIza...",
  authDomain: "arena-kpp3023.firebaseapp.com",
  databaseURL: "https://arena-kpp3023-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "arena-kpp3023",
  appId: "1:1234567890:web:abcdef"
};
*/

window.ARENA_TETAPAN = {
  adminKod: 'kpp3023',
  premium: {
    aktif: true,
    harga: 'RM10',
    penerima: 'Nama penerima bayaran',
    qr: 'aset/qr-duitnow.svg',
    nota: 'Set Latihan Premium ialah soalan latihan tambahan yang dibina daripada SIM KPP3023. Ia bukan soalan peperiksaan akhir sebenar.'
  }
};
