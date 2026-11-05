/*
 * Bank soalan SIM, KPP3023 Psikologi dalam Pendidikan (A261)
 * Dibina daripada kandungan Bahan Pembelajaran Kendiri (SIM) KPP3023, Unit 1 hingga 11 dan Penutup.
 * Ini BUKAN soalan peperiksaan akhir sebenar. Ia set latihan untuk game Arena Psikologi.
 *
 * Format setiap soalan:
 *   id      : kod unik, contoh 'U2-05'
 *   unit    : 1 hingga 11, atau 12 untuk Penutup
 *   jenis   : 'pilihan' (4 pilihan), 'bs' (Betul/Salah, pusingan Arena O/X) atau 'kes' (senario + 4 pilihan)
 *   senario : (pilihan) teks kes untuk jenis 'kes'
 *   soalan  : teks soalan
 *   pilihan : senarai jawapan; untuk 'bs' sentiasa ['Betul', 'Salah']
 *   jawapan : indeks jawapan betul dalam senarai pilihan (0 = pertama)
 *   huraian : penerangan yang dipaparkan selepas menjawab
 *   aras    : 1 = ingat, 2 = faham, 3 = aplikasi
 * Susunan pilihan dikocok semasa main (kecuali Betul/Salah).
 */
window.SOALAN_SIM = [

  /* ---------------- Unit 1: Pengenalan kepada Psikologi Pendidikan ---------------- */
  { id: 'U1-01', unit: 1, jenis: 'pilihan', aras: 1,
    soalan: 'Psikologi pendidikan ialah bidang yang…',
    pilihan: [
      'mengkaji tingkah laku dan proses mental secara saintifik dalam konteks pengajaran dan pembelajaran, serta menggunakannya untuk membimbing keputusan pendidikan',
      'mengawal tingkah laku murid yang bermasalah di dalam bilik darjah sahaja',
      'mengkaji sejarah teori pendidikan sejak zaman Yunani',
      'merawat gangguan klinikal kanak-kanak di sekolah'],
    jawapan: 0,
    huraian: 'Psikologi pendidikan menghubungkan kajian saintifik tentang tingkah laku dan proses mental dengan keputusan pengajaran dan pembelajaran. Ia bukan sekadar kawalan tingkah laku atau kes bermasalah.' },

  { id: 'U1-02', unit: 1, jenis: 'pilihan', aras: 2,
    soalan: 'Yang manakah satu PEMERHATIAN, bukan tafsiran?',
    pilihan: [
      'Murid belum menulis apa-apa selepas lima minit.',
      'Murid itu malas.',
      'Murid itu tidak bermotivasi.',
      'Murid itu memang lemah dalam pembelajaran.'],
    jawapan: 0,
    huraian: 'Pemerhatian ialah sesuatu yang boleh dilihat, didengar, dikira atau disemak. Pilihan lain sudah mengandungi penjelasan (label).' },

  { id: 'U1-03', unit: 1, jenis: 'pilihan', aras: 2,
    soalan: 'Satu kajian mendapati penggunaan telefon sebelum tidur berkait dengan prestasi sekolah yang lebih rendah. Kesimpulan yang paling berhati-hati ialah…',
    pilihan: [
      'terdapat hubungan yang perlu dikaji lanjut; sebab dan akibat belum dibuktikan',
      'telefon menyebabkan semua murid gagal',
      'prestasi rendah menyebabkan murid menggunakan telefon',
      'guru perlu mengharamkan semua telefon'],
    jawapan: 0,
    huraian: 'Ini kajian korelasi. Hubungan antara dua pemboleh ubah tidak membuktikan sebab dan akibat, dan tidak menolak kemungkinan faktor ketiga.' },

  { id: 'U1-04', unit: 1, jenis: 'pilihan', aras: 1,
    soalan: 'Bentuk penyelidikan yang menguji kesan perubahan pemboleh ubah dengan kawalan yang sesuai ialah penyelidikan…',
    pilihan: ['eksperimen', 'deskriptif', 'korelasi', 'naratif'],
    jawapan: 0,
    huraian: 'Deskriptif menggambarkan pola, korelasi meneliti hubungan, manakala eksperimen menguji kesan perubahan pemboleh ubah dengan kawalan.' },

  { id: 'U1-05', unit: 1, jenis: 'kes', aras: 3,
    senario: 'Guru menggunakan tiket keluar untuk memeriksa pemahaman murid sebelum meneruskan pelajaran.',
    soalan: 'Penekanan tokoh manakah yang paling hampir dengan tindakan guru ini?',
    pilihan: ['Edward Lee Thorndike', 'William James', 'John Dewey', 'Ibn Sina'],
    jawapan: 0,
    huraian: 'Thorndike menekankan penyelidikan, pengukuran dan penilaian: apakah bukti bahawa pembelajaran berlaku?' },

  { id: 'U1-06', unit: 1, jenis: 'pilihan', aras: 1,
    soalan: 'Tokoh yang menerbitkan Talks to Teachers on Psychology (1899) dan menekankan pemerhatian serta kesediaan perkembangan murid ialah…',
    pilihan: ['William James', 'John Dewey', 'Edward Lee Thorndike', 'B.F. Skinner'],
    jawapan: 0,
    huraian: 'William James menerbitkan Principles of Psychology (1890) dan Talks to Teachers on Psychology (1899).' },

  { id: 'U1-07', unit: 1, jenis: 'pilihan', aras: 2,
    soalan: 'John Dewey menekankan murid sebagai peserta aktif. Soalan profesional yang paling sesuai dengan pandangan beliau ialah…',
    pilihan: [
      'Adakah aktiviti ini benar-benar menghasilkan pemikiran dan pembelajaran?',
      'Berapakah markah purata kelas dalam ujian ini?',
      'Adakah murid duduk diam sepanjang pelajaran?',
      'Adakah murid menyalin nota dengan lengkap?'],
    jawapan: 0,
    huraian: 'Dewey menekankan pengalaman, penyelesaian masalah dan refleksi. Aktiviti "aktif" tidak semestinya menghasilkan pemikiran.' },

  { id: 'U1-08', unit: 1, jenis: 'pilihan', aras: 1,
    soalan: 'Konsep malakah, iaitu kecekapan yang terbina melalui pengajaran dan latihan secara berperingkat daripada mudah kepada sukar, dikaitkan dengan…',
    pilihan: ['Ibn Khaldun', 'Ibn Sina', 'Miskawayh', 'Al-Ghazali'],
    jawapan: 0,
    huraian: 'Ibn Khaldun menekankan pembelajaran berperingkat, mudah kepada sukar, pengulangan yang semakin mendalam dan mudarat kekerasan serta penghinaan.' },

  { id: 'U1-09', unit: 1, jenis: 'bs', aras: 2,
    soalan: 'Ibn Sina, Miskawayh, al-Ghazali dan Ibn Khaldun ialah pengasas psikologi pendidikan moden.',
    pilihan: ['Betul', 'Salah'], jawapan: 1,
    huraian: 'Salah. Mereka ialah pemikir pramoden. Gagasan mereka perlu dibaca dalam konteks sejarah masing-masing sebagai titik dialog, bukan disamakan dengan konstruk psikologi moden.' },

  { id: 'U1-10', unit: 1, jenis: 'bs', aras: 2,
    soalan: 'Satu tingkah laku murid tidak semestinya mempunyai satu sebab sahaja.',
    pilihan: ['Betul', 'Salah'], jawapan: 0,
    huraian: 'Betul. Faktor individu (contohnya pengetahuan sedia ada, emosi) dan faktor persekitaran (contohnya reka bentuk tugasan, keluarga) saling berinteraksi.' },

  { id: 'U1-11', unit: 1, jenis: 'kes', aras: 3,
    senario: 'Danish (Tingkatan 1) lambat memulakan tugasan penulisan. Dia boleh menjawab soalan lisan, dan mula menulis lebih cepat apabila diberi satu contoh jawapan.',
    soalan: 'Langkah pertama yang paling profesional dalam kitaran keputusan guru ialah…',
    pilihan: [
      'menyatakan fakta yang diperhatikan tanpa label, kemudian membina beberapa hipotesis',
      'merumuskan bahawa Danish malas dan memberi amaran',
      'merujuk Danish terus kepada kaunselor',
      'memberikan tugasan yang lebih panjang supaya dia berlatih'],
    jawapan: 0,
    huraian: 'Kitaran keputusan guru: kenal pasti fakta, bina hipotesis, kumpul data tambahan, pilih tindakan pedagogi, pantau kesan dan ubah suai keputusan.' },

  { id: 'U1-12', unit: 1, jenis: 'pilihan', aras: 1,
    soalan: 'Yang manakah satu FAKTOR PERSEKITARAN yang mempengaruhi pembelajaran?',
    pilihan: ['Reka bentuk tugasan dan arahan guru', 'Tahap perkembangan murid', 'Motivasi dan emosi murid', 'Kebolehan bahasa murid'],
    jawapan: 0,
    huraian: 'Faktor persekitaran termasuk reka bentuk tugasan, arahan dan contoh, hubungan guru-murid, rakan sebaya, keluarga, sumber dan budaya sekolah.' },

  /* ---------------- Unit 2: Perkembangan Kognitif ---------------- */
  { id: 'U2-01', unit: 2, jenis: 'pilihan', aras: 1,
    soalan: 'Dalam teori Piaget, menggunakan skema sedia ada untuk mentafsir pengalaman baharu dinamakan…',
    pilihan: ['asimilasi', 'akomodasi', 'pengimbangan', 'organisasi'],
    jawapan: 0,
    huraian: 'Asimilasi memasukkan pengalaman baharu ke dalam skema lama. Akomodasi pula mengubah atau membina skema baharu.' },

  { id: 'U2-02', unit: 2, jenis: 'kes', aras: 3,
    senario: 'Seorang kanak-kanak memanggil kelawar "burung". Selepas mengetahui kelawar ialah mamalia, dia memahami bahawa bukan semua benda yang terbang ialah burung.',
    soalan: 'Perubahan pada bahagian akhir kes ini ialah contoh…',
    pilihan: ['akomodasi', 'asimilasi', 'konservasi', 'internalisasi'],
    jawapan: 0,
    huraian: 'Skema lama tidak lagi mencukupi, lalu kanak-kanak itu membina pembezaan baharu. Ini akomodasi.' },

  { id: 'U2-03', unit: 2, jenis: 'pilihan', aras: 1,
    soalan: 'Peringkat Piaget yang ditandai oleh penaakulan logik tentang objek konkrit, konservasi, pengelasan dan seriasi ialah…',
    pilihan: ['operasi konkrit (sekitar 7 hingga 11 tahun)', 'praoperasi (sekitar 2 hingga 7 tahun)', 'operasi formal (sekitar 12 tahun ke atas)', 'sensorimotor (lahir hingga 2 tahun)'],
    jawapan: 0,
    huraian: 'Operasi konkrit: konservasi, pengelasan, seriasi, keterbalikan dan penyahpusatan berkembang. Gunakan bahan maujud dan pelbagai representasi.' },

  { id: 'U2-04', unit: 2, jenis: 'pilihan', aras: 1,
    soalan: 'Kekekalan objek berkembang dalam peringkat…',
    pilihan: ['sensorimotor', 'praoperasi', 'operasi konkrit', 'operasi formal'],
    jawapan: 0,
    huraian: 'Dalam peringkat sensorimotor, pengetahuan dibina melalui deria dan tindakan, dan kekekalan objek serta representasi mental berkembang.' },

  { id: 'U2-05', unit: 2, jenis: 'pilihan', aras: 1,
    soalan: 'Zon Perkembangan Proksimal (ZPD) ialah…',
    pilihan: [
      'jarak antara prestasi yang boleh dicapai secara kendiri dengan prestasi yang boleh dicapai melalui bantuan yang sesuai',
      'tahap umur apabila murid boleh berfikir secara abstrak',
      'bantuan tetap yang diberikan guru sepanjang tahun',
      'kawasan tugasan yang terlalu sukar walaupun dengan bantuan'],
    jawapan: 0,
    huraian: 'ZPD berkaitan murid, tugasan, prasyarat dan bentuk bantuan pada masa tertentu. Ia bukan label tetap.' },

  { id: 'U2-06', unit: 2, jenis: 'kes', aras: 3,
    senario: 'Guru berkata kepada murid: "Jawapannya 24. Sekarang salin langkah saya."',
    soalan: 'Adakah ini perancahan yang baik?',
    pilihan: [
      'Tidak, kerana tugas berfikir dipindahkan daripada murid kepada guru',
      'Ya, kerana murid mendapat jawapan yang betul',
      'Ya, kerana guru memodelkan langkah',
      'Tidak, kerana guru sepatutnya tidak membantu langsung'],
    jawapan: 0,
    huraian: 'Perancahan ialah bantuan sementara yang mengekalkan pemikiran pada murid dan dikurangkan apabila kecekapan meningkat. Memberikan jawapan bukan perancahan.' },

  { id: 'U2-07', unit: 2, jenis: 'bs', aras: 2,
    soalan: 'Jika murid boleh melakukan sesuatu tugasan dengan bantuan, ini bermakna dia sudah menguasainya.',
    pilihan: ['Betul', 'Salah'], jawapan: 1,
    huraian: 'Salah. Prestasi berbantukan berbeza daripada penguasaan kendiri. Penguasaan memerlukan bukti prestasi kendiri dan pemindahan pembelajaran.' },

  { id: 'U2-08', unit: 2, jenis: 'pilihan', aras: 2,
    soalan: 'Menurut Vygotsky, ucapan yang boleh didengar ketika seseorang membimbing tindakannya sendiri, contohnya "Mula-mula saya samakan penyebut", ialah…',
    pilihan: ['pertuturan kendiri', 'pertuturan sosial', 'pertuturan dalaman', 'egosentrisme'],
    jawapan: 0,
    huraian: 'Tiga bentuk pertuturan: sosial, kendiri (didengar, membimbing diri) dan dalaman (sudah diinternalisasi).' },

  { id: 'U2-09', unit: 2, jenis: 'pilihan', aras: 2,
    soalan: 'Murid kini mengetahui 800 perkataan berbanding 500 perkataan sebelum ini. Ini contoh perubahan…',
    pilihan: ['kuantitatif', 'kualitatif', 'struktural', 'akomodasi'],
    jawapan: 0,
    huraian: 'Perubahan kuantitatif ialah peningkatan jumlah, kelajuan atau ketepatan kebolehan yang sama. Perubahan kualitatif mengubah cara pemikiran disusun.' },

  { id: 'U2-10', unit: 2, jenis: 'pilihan', aras: 1,
    soalan: 'Proses kognitif yang memantau dan mengawal pemikiran sendiri, contohnya menyedari strategi tidak berkesan lalu menukarnya, ialah…',
    pilihan: ['metakognisi', 'persepsi', 'perhatian', 'penaakulan'],
    jawapan: 0,
    huraian: 'Metakognisi ialah satu daripada tujuh proses dalam roda kognisi: persepsi, perhatian, ingatan, bahasa, penaakulan, penyelesaian masalah dan metakognisi.' },

  { id: 'U2-11', unit: 2, jenis: 'bs', aras: 2,
    soalan: 'Menurut Vygotsky, apa-apa kerja kumpulan secara automatik menghasilkan pembelajaran sosial.',
    pilihan: ['Betul', 'Salah'], jawapan: 1,
    huraian: 'Salah. Interaksi perlu mempunyai tujuan. Guru tidak boleh menganggap interaksi semata-mata akan menghasilkan pembelajaran.' },

  /* ---------------- Unit 3: Perkembangan Sosioemosi ---------------- */
  { id: 'U3-01', unit: 3, jenis: 'kes', aras: 3,
    senario: 'Ibu seorang murid menukar syif kerja, menyebabkan murid itu sukar menghadiri program petang di sekolah.',
    soalan: 'Tempat kerja ibu berada dalam sistem Bronfenbrenner yang manakah?',
    pilihan: ['Eksosistem', 'Mikrosistem', 'Mesosistem', 'Makrosistem'],
    jawapan: 0,
    huraian: 'Eksosistem ialah konteks yang tidak disertai murid secara langsung tetapi tetap mempengaruhi hidupnya, contohnya tempat kerja penjaga.' },

  { id: 'U3-02', unit: 3, jenis: 'pilihan', aras: 1,
    soalan: 'Hubungan antara dua atau lebih mikrosistem, contohnya komunikasi rumah dengan sekolah, dinamakan…',
    pilihan: ['mesosistem', 'eksosistem', 'kronosistem', 'makrosistem'],
    jawapan: 0,
    huraian: 'Mesosistem ialah hubungan antara mikrosistem, contohnya rumah ↔ sekolah.' },

  { id: 'U3-03', unit: 3, jenis: 'pilihan', aras: 1,
    soalan: 'Peralihan hidup, pertukaran sekolah dan pandemik termasuk dalam…',
    pilihan: ['kronosistem', 'makrosistem', 'eksosistem', 'mikrosistem'],
    jawapan: 0,
    huraian: 'Kronosistem ialah dimensi masa: peralihan hidup, perubahan keluarga, pertukaran sekolah, pandemik, teknologi dan perubahan dasar.' },

  { id: 'U3-04', unit: 3, jenis: 'pilihan', aras: 2,
    soalan: 'Dalam model bioekologi, interaksi yang berlaku secara berulang, semakin kompleks dan cukup lama untuk mempengaruhi perkembangan dinamakan…',
    pilihan: ['proses proksimal', 'zon perkembangan proksimal', 'pengimbangan', 'krisis psikososial'],
    jawapan: 0,
    huraian: 'Proses proksimal ialah teras model PPCT (Proses, Individu, Konteks, Masa). Melukis lima bulatan sahaja bukan analisis ekologi yang lengkap.' },

  { id: 'U3-05', unit: 3, jenis: 'pilihan', aras: 1,
    soalan: 'Krisis psikososial Erikson yang berkaitan dengan membina rasa kecekapan melalui usaha dan penguasaan di sekolah ialah…',
    pilihan: ['kerajinan lawan rasa rendah diri', 'identiti lawan kekeliruan peranan', 'autonomi lawan malu dan ragu', 'inisiatif lawan rasa bersalah'],
    jawapan: 0,
    huraian: 'Kerajinan lawan rasa rendah diri: murid bertanya "Adakah saya mampu membuat perkara yang bernilai?"' },

  { id: 'U3-06', unit: 3, jenis: 'bs', aras: 2,
    soalan: 'Dalam teori Erikson, "krisis" bermaksud penyakit atau bencana dalam kehidupan individu.',
    pilihan: ['Betul', 'Salah'], jawapan: 1,
    huraian: 'Salah. Krisis psikososial ialah ketegangan perkembangan antara dua kecenderungan, bukan penyakit atau bencana, dan bukan ujian lulus atau gagal.' },

  { id: 'U3-07', unit: 3, jenis: 'kes', aras: 3,
    senario: 'Seorang murid berkata: "Saya tidak mahu memberitahu guru kerana kawan yang baik mesti melindungi kawan."',
    soalan: 'Alasan ini paling hampir dengan peringkat Kohlberg yang manakah?',
    pilihan: ['Peringkat 3: hubungan dan penerimaan', 'Peringkat 1: kepatuhan dan hukuman', 'Peringkat 4: sistem sosial dan peraturan', 'Peringkat 5: kontrak sosial dan hak'],
    jawapan: 0,
    huraian: 'Peringkat 3 (konvensional) dipengaruhi jangkaan untuk menjadi "orang baik" dan penerimaan kumpulan. Guru menilai cara alasan dibina, bukan hanya keputusan.' },

  { id: 'U3-08', unit: 3, jenis: 'pilihan', aras: 1,
    soalan: '"Saya membantu dia jika dia membantu saya." Alasan ini berada pada peringkat Kohlberg…',
    pilihan: ['kepentingan dan pertukaran (peringkat 2)', 'kepatuhan dan hukuman (peringkat 1)', 'hubungan dan penerimaan (peringkat 3)', 'prinsip etika sejagat (peringkat 6)'],
    jawapan: 0,
    huraian: 'Peringkat 2 (pra-konvensional) memberi perhatian kepada faedah diri atau pertukaran.' },

  { id: 'U3-09', unit: 3, jenis: 'bs', aras: 2,
    soalan: 'Penaakulan moral yang tinggi menjamin tingkah laku moral yang baik.',
    pilihan: ['Betul', 'Salah'], jawapan: 1,
    huraian: 'Salah. Penaakulan moral tidak sama dengan tingkah laku moral. Emosi, tekanan rakan, kuasa dan keadaan masih berperanan.' },

  { id: 'U3-10', unit: 3, jenis: 'kes', aras: 3,
    senario: 'Amir baru berpindah sekolah. Dia jarang bercakap dalam kelas selepas dua murid mentertawakan sebutannya, tetapi di rumah dia banyak bercakap.',
    soalan: 'Tindakan awal guru yang paling munasabah ialah…',
    pilihan: [
      'menangani ejekan, membina semula rasa selamat dan memberi cara penyertaan berisiko rendah',
      'memaksa Amir membuat pembentangan solo supaya dia berani',
      'melabel Amir sebagai introvert dan membiarkannya',
      'memindahkan Amir ke kelas lain dengan segera'],
    jawapan: 0,
    huraian: 'Tingkah laku Amir berbeza mengikut konteks (mesosistem) dan berubah selepas pertukaran sekolah (kronosistem). Guru menangani konteks hubungan, bukan menambah risiko dimalukan.' },

  { id: 'U3-11', unit: 3, jenis: 'pilihan', aras: 2,
    soalan: 'Respons yang paling lengkap terhadap buli di sekolah ialah…',
    pilihan: [
      'memeriksa norma kelas, pengawasan, respons saksi dan pemulihan hubungan',
      'menasihati mangsa supaya lebih tabah',
      'mengabaikannya kerana ia sebahagian daripada membesar',
      'menghukum seluruh kelas'],
    jawapan: 0,
    huraian: 'Respons terhadap buli tidak memadai dengan hanya menasihati mangsa. Norma kelas, pengawasan, respons saksi dan pemulihan hubungan perlu diperiksa.' },

  /* ---------------- Unit 4: Faktor Pertumbuhan dan Perkembangan ---------------- */
  { id: 'U4-01', unit: 4, jenis: 'pilihan', aras: 1,
    soalan: 'Perubahan kuantitatif pada tubuh atau struktur biologi, contohnya pertambahan tinggi atau berat, dinamakan…',
    pilihan: ['pertumbuhan', 'perkembangan', 'kematangan', 'pembelajaran'],
    jawapan: 0,
    huraian: 'Pertumbuhan bersifat kuantitatif. Perkembangan ialah perubahan jangka panjang dalam organisasi dan fungsi, kematangan berkaitan kesiapsiagaan biologi, dan pembelajaran berlaku melalui pengalaman.' },

  { id: 'U4-02', unit: 4, jenis: 'pilihan', aras: 2,
    soalan: '"Koordinasi motor menjadi semakin stabil dengan perubahan biologi." Pernyataan ini paling tepat menggambarkan…',
    pilihan: ['kematangan', 'pembelajaran', 'pertumbuhan', 'transaksi'],
    jawapan: 0,
    huraian: 'Kematangan menekankan kesiapsiagaan biologi, manakala pembelajaran menekankan perubahan melalui pengalaman.' },

  { id: 'U4-03', unit: 4, jenis: 'bs', aras: 2,
    soalan: 'Murid yang lebih tinggi dan kelihatan matang secara fizikal pasti mempunyai pemikiran yang lebih matang.',
    pilihan: ['Betul', 'Salah'], jawapan: 1,
    huraian: 'Salah. Perubahan fizikal tidak boleh digunakan secara automatik untuk menentukan kematangan kognitif atau emosi.' },

  { id: 'U4-04', unit: 4, jenis: 'kes', aras: 3,
    senario: 'Murid yang sering menjawab dengan cepat diberi lebih banyak soalan mencabar oleh guru, lalu mendapat lebih banyak peluang mengembangkan kemahiran.',
    soalan: 'Bentuk korelasi genotip–persekitaran yang digambarkan ialah…',
    pilihan: ['evokatif', 'pasif', 'aktif', 'kumulatif'],
    jawapan: 0,
    huraian: 'Korelasi evokatif: ciri atau tingkah laku murid mencetuskan respons tertentu daripada orang lain. Guru perlu mengagihkan peluang dan cabaran secara seimbang.' },

  { id: 'U4-05', unit: 4, jenis: 'pilihan', aras: 1,
    soalan: 'Remaja memilih menyertai kelab yang selaras dengan minatnya. Ini contoh korelasi genotip–persekitaran…',
    pilihan: ['aktif', 'pasif', 'evokatif', 'transaksi'],
    jawapan: 0,
    huraian: 'Korelasi aktif: individu memilih atau membina persekitaran yang selaras dengan minat atau kecenderungannya.' },

  { id: 'U4-06', unit: 4, jenis: 'pilihan', aras: 2,
    soalan: 'Prinsip yang menyatakan bahawa murid dan persekitaran saling mempengaruhi secara berulang dinamakan…',
    pilihan: ['transaksi', 'interaksi', 'kebarangkalian', 'kematangan'],
    jawapan: 0,
    huraian: 'Empat prinsip: interaksi (kesan faktor bergantung faktor lain), transaksi (dua hala, berulang), kebarangkalian (bukan jaminan) dan masa.' },

  { id: 'U4-07', unit: 4, jenis: 'pilihan', aras: 2,
    soalan: 'Kesukaran membaca menyebabkan murid mengelak tugasan membaca, peluang berlatih berkurang dan rasa kecekapan terjejas. Fenomena ini dinamakan…',
    pilihan: ['kesan berantai perkembangan (developmental cascade)', 'korelasi pasif', 'kematangan tertangguh', 'pengimbangan'],
    jawapan: 0,
    huraian: 'Kesan berantai ialah kesan perubahan dalam satu domain terhadap domain lain merentas masa. Guru boleh campur tangan melalui akses, latihan, maklum balas, pengalaman kejayaan dan hubungan sokongan.' },

  { id: 'U4-08', unit: 4, jenis: 'bs', aras: 2,
    soalan: 'Murid yang mengalami beberapa faktor risiko pasti akan mendapat hasil perkembangan yang kurang baik.',
    pilihan: ['Betul', 'Salah'], jawapan: 1,
    huraian: 'Salah. Risiko meningkatkan kebarangkalian tetapi bukan kepastian. Faktor pelindung dan sokongan boleh mengubah trajektori.' },

  { id: 'U4-09', unit: 4, jenis: 'pilihan', aras: 1,
    soalan: 'Tokoh yang memperkenalkan konsep tugas perkembangan yang menghubungkan kematangan biologi, nilai peribadi dan jangkaan masyarakat ialah…',
    pilihan: ['Havighurst', 'Gesell', 'Erikson', 'Bronfenbrenner'],
    jawapan: 0,
    huraian: 'Havighurst: tugas perkembangan. Gesell: kematangan dan urutan perkembangan umum. Kedua-duanya titik mula, bukan jawapan akhir.' },

  { id: 'U4-10', unit: 4, jenis: 'pilihan', aras: 2,
    soalan: 'Kenyataan yang paling tepat tentang status sosioekonomi (SES) murid ialah…',
    pilihan: [
      'SES ialah keadaan sumber dan peluang, bukan sifat peribadi murid',
      'SES menentukan kebolehan intelek murid',
      'murid SES rendah pasti kurang bermotivasi',
      'SES tidak mempunyai kaitan langsung dengan peluang pendidikan'],
    jawapan: 0,
    huraian: 'SES ialah keadaan sumber dan peluang. Hubungannya dengan hasil tidak membuktikan kekurangan nilai, kebolehan atau usaha murid.' },

  { id: 'U4-11', unit: 4, jenis: 'kes', aras: 3,
    senario: 'Iman memahami penerangan lisan dengan baik, tetapi lambat dalam tugasan membaca. Bahasa di rumah berbeza daripada bahasa bahan sekolah. Kefahamannya meningkat apabila diberi masa tambahan dan penerangan kosa kata.',
    soalan: 'Respons guru yang paling wajar ialah…',
    pilihan: [
      'Prestasi Iman mungkin dipengaruhi beberapa faktor yang berinteraksi; saya perlu membezakan kefahaman, kelancaran, bahasa dan bentuk bahan, kemudian memantau sokongan',
      'Kebolehan membaca Iman memang rendah secara semula jadi',
      'Iman perlu diasingkan ke kelas pemulihan serta-merta',
      'Iman tidak berusaha kerana kehadirannya baik tetapi prestasinya rendah'],
    jawapan: 0,
    huraian: 'Pisahkan fakta daripada hipotesis, cari faktor yang berinteraksi, kenal pasti perkara yang boleh diubah, guna lebih daripada satu sumber data dan pantau.' },

  /* ---------------- Unit 5: Keperluan, Kecerdasan dan Gaya Pembelajaran ---------------- */
  { id: 'U5-01', unit: 5, jenis: 'pilihan', aras: 1,
    soalan: 'Dalam hierarki keperluan Maslow, keperluan yang berada di tingkat paling asas ialah keperluan…',
    pilihan: ['fisiologi', 'keselamatan', 'kasih sayang dan kepunyaan', 'penghargaan'],
    jawapan: 0,
    huraian: 'Tingkat Maslow: fisiologi, keselamatan, kasih sayang dan kepunyaan, penghargaan, dan penyempurnaan kendiri di puncak.' },

  { id: 'U5-02', unit: 5, jenis: 'bs', aras: 2,
    soalan: 'Hierarki Maslow paling sesuai digunakan sebagai urutan tegar untuk mendiagnosis murid.',
    pilihan: ['Betul', 'Salah'], jawapan: 1,
    huraian: 'Salah. Keperluan boleh hadir serentak. Maslow lebih sesuai sebagai senarai semak untuk mencetuskan pertanyaan profesional, bukan formula atau alat diagnosis.' },

  { id: 'U5-03', unit: 5, jenis: 'kes', aras: 3,
    senario: 'Seorang murid cepat putus asa, takut melakukan kesilapan dan terlalu bergantung pada pujian.',
    soalan: 'Keperluan Maslow yang mungkin terlibat dan respons guru yang sesuai ialah…',
    pilihan: [
      'penghargaan; beri maklum balas khusus, kejayaan berperingkat dan fokus pada kemajuan',
      'fisiologi; sediakan makanan dan rehat',
      'keselamatan; tukar murid ke kelas lain',
      'penyempurnaan kendiri; beri projek yang sangat sukar'],
    jawapan: 0,
    huraian: 'Tanda keperluan penghargaan: cepat putus asa, takut salah, bergantung pada pujian. Respons: maklum balas khusus, kejayaan berperingkat dan fokus pada kemajuan.' },

  { id: 'U5-04', unit: 5, jenis: 'pilihan', aras: 1,
    soalan: 'Kecerdasan Gardner yang melibatkan memahami perasaan, motif, kekuatan dan matlamat diri sendiri ialah…',
    pilihan: ['intrapersonal', 'interpersonal', 'eksistensial', 'naturalis'],
    jawapan: 0,
    huraian: 'Intrapersonal: refleksi, jurnal, penetapan matlamat. Interpersonal pula memahami niat dan perasaan orang lain.' },

  { id: 'U5-05', unit: 5, jenis: 'kes', aras: 2,
    senario: 'Murid mengelaskan serangga yang ditemui di kawasan sekolah mengikut ciri badannya.',
    soalan: 'Kecerdasan Gardner yang paling ketara ialah…',
    pilihan: ['naturalis', 'logik-matematik', 'visual-ruang', 'kinestetik badan'],
    jawapan: 0,
    huraian: 'Naturalis: mengenal, membezakan dan mengelaskan tumbuhan, haiwan dan pola alam.' },

  { id: 'U5-06', unit: 5, jenis: 'pilihan', aras: 1,
    soalan: 'Berapakah jenis kecerdasan dalam teori kecerdasan pelbagai Gardner (termasuk naturalis dan eksistensial)?',
    pilihan: ['Sembilan', 'Tujuh', 'Lapan', 'Tiga'],
    jawapan: 0,
    huraian: 'Gardner asalnya mengemukakan tujuh (1983). Naturalis ditambah kemudian dan eksistensial dibincangkan sebagai yang kesembilan.' },

  { id: 'U5-07', unit: 5, jenis: 'pilihan', aras: 1,
    soalan: 'Tiga dimensi kecerdasan triarkik Sternberg ialah…',
    pilihan: ['analitikal, kreatif dan praktikal', 'bendalir, terkristal dan umum', 'visual, auditori dan kinestetik', 'verbal, logik dan ruang'],
    jawapan: 0,
    huraian: 'Sternberg menekankan penggunaan kebolehan analitikal, kreatif dan praktikal untuk mencapai matlamat dalam konteks.' },

  { id: 'U5-08', unit: 5, jenis: 'pilihan', aras: 2,
    soalan: 'Faktor umum "g" yang menerangkan korelasi antara prestasi dalam pelbagai tugasan kognitif dikaitkan dengan…',
    pilihan: ['Spearman', 'Gardner', 'Sternberg', 'Maslow'],
    jawapan: 0,
    huraian: 'Spearman: faktor umum g. Cattell dan CHC: kecerdasan bendalir dan terkristal.' },

  { id: 'U5-09', unit: 5, jenis: 'bs', aras: 2,
    soalan: 'Kajian (contohnya semakan Pashler dan rakan-rakan) menemukan bukti yang kukuh bahawa murid belajar lebih baik apabila pengajaran dipadankan dengan gaya pembelajaran VAK mereka.',
    pilihan: ['Betul', 'Salah'], jawapan: 1,
    huraian: 'Salah. Bukti untuk hipotesis pemadanan (interaksi silang) tidak mencukupi. Pilih medium berdasarkan hasil dan sifat kandungan, bukan label murid.' },

  { id: 'U5-10', unit: 5, jenis: 'kes', aras: 3,
    senario: 'Seorang murid yang mengalami masalah pendengaran memerlukan kapsyen semasa tayangan video.',
    soalan: 'Situasi ini ialah contoh…',
    pilihan: ['keperluan pembelajaran', 'pilihan belajar', 'modaliti kandungan', 'gaya pembelajaran visual'],
    jawapan: 0,
    huraian: 'Keperluan pembelajaran wujud kerana halangan sebenar (sensori, bahasa, perhatian, ketidakupayaan) dan memerlukan sokongan berasaskan data.' },

  { id: 'U5-11', unit: 5, jenis: 'pilihan', aras: 2,
    soalan: 'Sebutan perkataan baharu diajar melalui audio dan latihan lisan kerana sifat kandungan itu memerlukannya. Ini contoh…',
    pilihan: ['modaliti kandungan', 'pilihan belajar', 'keperluan pembelajaran', 'hipotesis pemadanan'],
    jawapan: 0,
    huraian: 'Modaliti kandungan: sesetengah kandungan secara semula jadi memerlukan bentuk representasi tertentu.' },

  { id: 'U5-12', unit: 5, jenis: 'pilihan', aras: 2,
    soalan: 'Yang manakah kenyataan paling tepat tentang skor kecerdasan?',
    pilihan: [
      'Skor ialah sampel prestasi yang perlu ditafsir bersama maklumat lain',
      'Skor IQ menentukan had maksimum potensi murid',
      'Murid dengan IQ 90 tidak patut diberi tugasan mencabar',
      'Skor kecerdasan sama dengan pencapaian akademik'],
    jawapan: 0,
    huraian: 'Skor ialah sampel prestasi, bukan identiti. Ia ditafsir bersama sejarah pembelajaran, bahasa dan peluang, dan digunakan untuk merancang sokongan.' },

  /* ---------------- Unit 6: Motivasi dan Personaliti ---------------- */
  { id: 'U6-01', unit: 6, jenis: 'pilihan', aras: 1,
    soalan: 'Motivasi ditakrifkan sebagai proses yang…',
    pilihan: ['membangkitkan, mengarahkan dan mengekalkan tingkah laku', 'menghukum dan memberi ganjaran', 'mengukur kecerdasan murid', 'menentukan personaliti murid'],
    jawapan: 0,
    huraian: 'Membangkitkan (tenaga: mengapa murid bermula), mengarahkan (arah: memilih tugasan) dan mengekalkan (ketekalan: terus mencuba).' },

  { id: 'U6-02', unit: 6, jenis: 'pilihan', aras: 2,
    soalan: 'Murid membaca tentang astronomi kerana benar-benar ingin tahu. Ini contoh motivasi…',
    pilihan: ['intrinsik', 'ekstrinsik', 'prestasi–pengelakan', 'kawalan luaran'],
    jawapan: 0,
    huraian: 'Motivasi intrinsik datang daripada minat, rasa ingin tahu, keseronokan atau cabaran aktiviti itu sendiri. Ekstrinsik melibatkan hasil terpisah seperti gred atau pujian.' },

  { id: 'U6-03', unit: 6, jenis: 'pilihan', aras: 1,
    soalan: 'Tiga keperluan yang dihuraikan oleh McClelland ialah…',
    pilihan: ['pencapaian, perhubungan dan kuasa', 'autonomi, kompetensi dan keterhubungan', 'fisiologi, keselamatan dan penghargaan', 'jangkaan, nilai dan kos'],
    jawapan: 0,
    huraian: 'McClelland: keperluan pencapaian, perhubungan dan kuasa (pengaruh). Keperluan kuasa tidak semestinya negatif.' },

  { id: 'U6-04', unit: 6, jenis: 'pilihan', aras: 1,
    soalan: 'Tiga keperluan psikologi dalam Teori Penentuan Kendiri ialah…',
    pilihan: ['autonomi, kompetensi dan keterhubungan', 'pencapaian, perhubungan dan kuasa', 'analitikal, kreatif dan praktikal', 'dalaman, stabil dan boleh dikawal'],
    jawapan: 0,
    huraian: 'Autonomi (suara dan pilihan dalam struktur), kompetensi (rasa berkesan) dan keterhubungan (dihormati dan diterima).' },

  { id: 'U6-05', unit: 6, jenis: 'kes', aras: 3,
    senario: 'Seorang murid berkata: "Saya tidak mahu mencuba soalan yang susah. Jika saya menjawab salah di hadapan semua orang, saya akan malu."',
    soalan: 'Menurut teori jangkaan–nilai, masalah utama yang paling mungkin ialah…',
    pilihan: ['kos sosial yang tinggi', 'nilai minat yang rendah', 'keperluan kuasa yang tinggi', 'motivasi intrinsik yang berlebihan'],
    jawapan: 0,
    huraian: 'Murid melihat kos (risiko dipermalukan). Tindakan: beri masa berfikir, respons awal secara berpasangan atau tanpa nama, kemudian tingkatkan keterlihatan secara berperingkat.' },

  { id: 'U6-06', unit: 6, jenis: 'pilihan', aras: 2,
    soalan: 'Atribusi "Saya memang bodoh" mempunyai pola…',
    pilihan: ['dalaman, stabil dan sukar dikawal', 'luaran, tidak stabil dan boleh dikawal', 'dalaman, tidak stabil dan boleh dikawal', 'luaran, stabil dan boleh dikawal'],
    jawapan: 0,
    huraian: 'Pola ini berisiko kerana usaha kelihatan sia-sia. Atribusi "Saya belum menggunakan strategi yang sesuai" (dalaman, tidak stabil, boleh dikawal) lebih produktif.' },

  { id: 'U6-07', unit: 6, jenis: 'pilihan', aras: 2,
    soalan: 'Orientasi matlamat yang ditandai oleh cemas, memilih tugasan mudah dan melindungi imej diri supaya tidak kelihatan gagal ialah…',
    pilihan: ['prestasi–pengelakan', 'penguasaan–pendekatan', 'prestasi–pendekatan', 'penguasaan–pengelakan'],
    jawapan: 0,
    huraian: 'Prestasi–pengelakan: mengelak daripada kelihatan gagal. Iklim yang menekankan kemajuan, strategi dan pembetulan lebih menyokong pembelajaran.' },

  { id: 'U6-08', unit: 6, jenis: 'bs', aras: 2,
    soalan: 'Guru yang berkata "Kamu bebas membuat apa-apa sahaja, saya tidak akan memberikan kriteria" menunjukkan sokongan autonomi yang baik.',
    pilihan: ['Betul', 'Salah'], jawapan: 1,
    huraian: 'Salah. Autonomi bukan kebebasan tanpa batas. Ia memerlukan pilihan bermakna dan rasional yang jelas dalam struktur yang jelas.' },

  { id: 'U6-09', unit: 6, jenis: 'pilihan', aras: 1,
    soalan: 'Ciri Model Lima Faktor yang mempunyai hubungan paling konsisten dengan pencapaian akademik ialah…',
    pilihan: ['kehematan (ketelitian)', 'ekstraversi', 'keterbukaan', 'kesetujuan'],
    jawapan: 0,
    huraian: 'Kehematan paling konsisten berkait dengan pencapaian, tetapi hubungan peringkat kumpulan tidak boleh meramal prestasi individu dengan tepat.' },

  { id: 'U6-10', unit: 6, jenis: 'bs', aras: 2,
    soalan: 'Model Lima Faktor membahagikan manusia kepada lima jenis personaliti yang berasingan.',
    pilihan: ['Betul', 'Salah'], jawapan: 1,
    huraian: 'Salah. Model Lima Faktor menerangkan lima kontinum. Setiap orang berada pada suatu kedudukan dalam setiap kontinum, bukan dalam satu "jenis".' },

  { id: 'U6-11', unit: 6, jenis: 'pilihan', aras: 2,
    soalan: 'Kecenderungan respons yang muncul awal dan mempunyai asas biologi, seperti tahap aktiviti dan kebolehsuaian, dinamakan…',
    pilihan: ['temperamen', 'personaliti', 'atribusi', 'orientasi matlamat'],
    jawapan: 0,
    huraian: 'Temperamen muncul awal dengan asas biologi. Personaliti ialah pola pemikiran, emosi dan tingkah laku yang agak konsisten merentas masa dan situasi.' },

  { id: 'U6-12', unit: 6, jenis: 'kes', aras: 3,
    senario: 'Aina dan Kumar sama-sama jarang bercakap dalam perbincangan. Aina bercakap lebih kerap jika diberi dua minit menulis dahulu. Kumar berkata, "Saya memang tidak pandai dalam subjek ini."',
    soalan: 'Kesimpulan yang paling tepat ialah…',
    pilihan: [
      'tingkah laku luaran yang sama boleh mempunyai hipotesis dan tindakan yang berbeza',
      'kedua-duanya introvert dan kurang bermotivasi',
      'kedua-duanya perlu diberi ganjaran yang sama',
      'kedua-duanya perlu dipaksa bercakap di hadapan kelas'],
    jawapan: 0,
    huraian: 'Aina mungkin melihat kos dinilai secara terbuka (cuba fikir-tulis-pasangan-kongsi). Kumar mungkin mempunyai jangkaan kejayaan rendah dan atribusi stabil (beri contoh, maklum balas strategi, bukti kemajuan).' },

  /* ---------------- Unit 7: Murid Berkeperluan Pendidikan Khas ---------------- */
  { id: 'U7-01', unit: 7, jenis: 'pilihan', aras: 1,
    soalan: 'Yang manakah BUKAN satu daripada enam kategori MBPK?',
    pilihan: ['Pencapaian rendah', 'Ketidakupayaan pendengaran', 'Masalah pembelajaran', 'Ketidakupayaan pelbagai'],
    jawapan: 0,
    huraian: 'Enam kategori MBPK: ketidakupayaan penglihatan, pendengaran, pertuturan, fizikal, masalah pembelajaran dan ketidakupayaan pelbagai. Pencapaian rendah dan kesukaran belajar bukan kategori.' },

  { id: 'U7-02', unit: 7, jenis: 'pilihan', aras: 1,
    soalan: 'Program yang membolehkan MBPK belajar bersama-sama murid lain dalam kelas yang sama ialah…',
    pilihan: ['Program Pendidikan Inklusif (PPI)', 'Program Pendidikan Khas Integrasi (PPKI)', 'Sekolah Pendidikan Khas (SPK)', 'Rancangan Pendidikan Individu (RPI)'],
    jawapan: 0,
    huraian: 'PPI: MBPK belajar bersama murid lain (penuh atau separa). PPKI: program pendidikan khas dalam sekolah kerajaan. SPK: sekolah khas bagi kategori tertentu.' },

  { id: 'U7-03', unit: 7, jenis: 'bs', aras: 2,
    soalan: 'Guru kelas boleh membuat diagnosis ADHD berdasarkan pemerhatian dalam kelas sahaja.',
    pilihan: ['Betul', 'Salah'], jawapan: 1,
    huraian: 'Salah. Diagnosis dibuat oleh profesional berkelayakan. Peranan guru ialah mengenal pasti pola, mencuba strategi, merekod respons dan berkolaborasi.' },

  { id: 'U7-04', unit: 7, jenis: 'kes', aras: 3,
    senario: 'Hasil pembelajaran: "Terangkan proses fotosintesis." Seorang murid dibenarkan menaip menggunakan papan kekunci kerana tulisan tangan bukan hasil utama.',
    soalan: 'Perubahan ini ialah…',
    pilihan: ['penyesuaian', 'pengubahsuaian', 'pembezaan kandungan', 'menurunkan standard'],
    jawapan: 0,
    huraian: 'Penyesuaian mengubah cara akses atau cara menunjukkan pembelajaran, tetapi hasil utama dikekalkan.' },

  { id: 'U7-05', unit: 7, jenis: 'kes', aras: 3,
    senario: 'Kelas menyelesaikan masalah Matematik berbilang langkah, manakala seorang murid hanya dikehendaki menyelesaikan satu langkah operasi.',
    soalan: 'Perubahan ini ialah…',
    pilihan: ['pengubahsuaian', 'penyesuaian', 'UDL', 'pembezaan persekitaran'],
    jawapan: 0,
    huraian: 'Pengubahsuaian mengubah tahap, keluasan atau kerumitan hasil pembelajaran.' },

  { id: 'U7-06', unit: 7, jenis: 'pilihan', aras: 1,
    soalan: 'Tiga prinsip Reka Bentuk Sejagat untuk Pembelajaran (UDL) ialah pelbagai cara…',
    pilihan: ['penglibatan, representasi, serta tindakan dan ekspresi', 'kandungan, proses dan produk', 'penglihatan, pendengaran dan pergerakan', 'saringan, pentaksiran dan diagnosis'],
    jawapan: 0,
    huraian: 'UDL mengurangkan halangan sejak perancangan melalui pelbagai cara penglibatan, representasi, serta tindakan dan ekspresi.' },

  { id: 'U7-07', unit: 7, jenis: 'pilihan', aras: 2,
    soalan: 'Catatan manakah yang merupakan PROFIL FUNGSIAN?',
    pilihan: [
      'Siti memberi idea secara aktif dan mengakses teks digital yang boleh dizum lebih baik berbanding cetakan kecil.',
      'Siti ialah murid kurang upaya penglihatan.',
      'Siti tergolong dalam kategori MBPK.',
      'Siti lemah dalam membaca.'],
    jawapan: 0,
    huraian: 'Profil fungsian menerangkan apa yang murid boleh lakukan, keadaan yang memudahkan prestasi, halangan, cara berkomunikasi dan sokongan yang berkesan.' },

  { id: 'U7-08', unit: 7, jenis: 'pilihan', aras: 2,
    soalan: 'Satu matlamat RPI yang berguna perlu mengandungi…',
    pilihan: ['tingkah laku, keadaan dan kriteria kemajuan', 'diagnosis, ubat dan rawatan', 'harapan umum guru sahaja', 'kategori MBPK dan skor IQ'],
    jawapan: 0,
    huraian: 'Contoh lemah: "Hakim akan menjadi lebih baik dalam belajar." Matlamat yang baik khusus, boleh diperhatikan dan boleh dipantau.' },

  { id: 'U7-09', unit: 7, jenis: 'bs', aras: 2,
    soalan: 'Kesukaran belajar sama dengan kategori rasmi masalah pembelajaran.',
    pilihan: ['Betul', 'Salah'], jawapan: 1,
    huraian: 'Salah. Kesukaran belajar boleh berpunca daripada kosa kata, bahasa, prasyarat atau reka bentuk teks, dan tidak semestinya bermaksud diagnosis atau ketidakupayaan.' },

  { id: 'U7-10', unit: 7, jenis: 'kes', aras: 3,
    senario: 'Danial (Tahun 4) kerap bangun apabila latihan bertulis melebihi 10 minit dan menjawab sebelum soalan habis dibaca, tetapi tekun selama 30 minit membina litar elektrik.',
    soalan: 'Respons awal yang paling wajar oleh guru ialah…',
    pilihan: [
      'pecahkan tugasan bertulis, beri peluang bergerak berstruktur dan gunakan kekuatan Danial dalam aktiviti hands-on',
      'pindahkan Danial ke belakang kelas dan tarik waktu rehatnya',
      'beritahu ibu bapa bahawa Danial ada ADHD dan perlu ubat',
      'labelkan Danial sebagai murid nakal dalam buku rekod'],
    jawapan: 0,
    huraian: 'Catat pola, kenal pasti halangan, gunakan kekuatan dan uji sokongan. Guru tidak membuat diagnosis.' },

  { id: 'U7-11', unit: 7, jenis: 'pilihan', aras: 2,
    soalan: 'Memberikan sokongan berbeza untuk mengurangkan halangan yang tidak berkaitan dengan hasil pembelajaran dinamakan…',
    pilihan: ['kesaksamaan', 'kesamarataan', 'keadilan mutlak', 'pengubahsuaian'],
    jawapan: 0,
    huraian: 'Kesamarataan: semua menerima masa dan format yang sama. Kesaksamaan: sokongan berbeza untuk mengurangkan halangan. Keadilan: keputusan mencerminkan pengetahuan yang hendak diukur.' },

  /* ---------------- Unit 8: Pelaziman Klasik dan Operan ---------------- */
  { id: 'U8-01', unit: 8, jenis: 'pilihan', aras: 1,
    soalan: 'Dalam eksperimen Pavlov, bunyi loceng SELEPAS pelaziman ialah…',
    pilihan: ['Rangsangan Terlazim (RT)', 'Rangsangan Neutral (RN)', 'Rangsangan Tidak Terlazim (RTT)', 'Tindak Balas Terlazim (TT)'],
    jawapan: 0,
    huraian: 'Sebelum pelaziman loceng ialah RN. Selepas dipasangkan berulang kali dengan makanan (RTT), loceng menjadi RT yang menghasilkan air liur (TT).' },

  { id: 'U8-02', unit: 8, jenis: 'pilihan', aras: 1,
    soalan: 'Dalam eksperimen Pavlov, makanan ialah…',
    pilihan: ['Rangsangan Tidak Terlazim (RTT)', 'Rangsangan Terlazim (RT)', 'Rangsangan Neutral (RN)', 'Tindak Balas Tidak Terlazim (TTT)'],
    jawapan: 0,
    huraian: 'RTT secara semula jadi menghasilkan respons refleksif (air liur = TTT) tanpa pembelajaran baharu.' },

  { id: 'U8-03', unit: 8, jenis: 'kes', aras: 3,
    senario: 'Kebimbangan Lina terhadap ujian Matematik kemudian muncul pada pelbagai ujian lain dan lembaran latihan yang serupa.',
    soalan: 'Proses pelaziman ini dinamakan…',
    pilihan: ['generalisasi', 'diskriminasi', 'penghapusan', 'pemulihan spontan'],
    jawapan: 0,
    huraian: 'Generalisasi: respons terlazim muncul terhadap rangsangan lain yang menyerupai rangsangan terlazim.' },

  { id: 'U8-04', unit: 8, jenis: 'kes', aras: 3,
    senario: 'Selepas kebimbangannya berkurang, Lina kembali berasa sedikit cemas pada ujian pertama selepas cuti panjang.',
    soalan: 'Fenomena ini dinamakan…',
    pilihan: ['pemulihan spontan', 'generalisasi', 'pembentukan', 'peneguhan negatif'],
    jawapan: 0,
    huraian: 'Pemulihan spontan: respons yang telah berkurang muncul semula selepas tempoh tertentu. Ini tidak bermakna semua kemajuan telah hilang.' },

  { id: 'U8-05', unit: 8, jenis: 'kes', aras: 3,
    senario: 'Bunyi peringatan berhenti apabila kumpulan memulakan peralihan aktiviti. Peralihan pantas semakin kerap berlaku.',
    soalan: 'Akibat ini ialah…',
    pilihan: ['peneguhan negatif', 'hukuman negatif', 'peneguhan positif', 'hukuman positif'],
    jawapan: 0,
    huraian: 'Sesuatu dialihkan (negatif) dan tingkah laku meningkat (peneguhan). "Negatif" bermaksud mengalihkan, bukan hukuman.' },

  { id: 'U8-06', unit: 8, jenis: 'kes', aras: 3,
    senario: 'Selepas murid bermain telefon semasa pelajaran, guru menyimpan telefon itu sehingga pelajaran tamat. Tingkah laku bermain telefon menurun.',
    soalan: 'Akibat ini ialah…',
    pilihan: ['hukuman negatif', 'hukuman positif', 'peneguhan negatif', 'penghapusan'],
    jawapan: 0,
    huraian: 'Sesuatu yang digemari dialihkan (negatif) dan tingkah laku menurun (hukuman).' },

  { id: 'U8-07', unit: 8, jenis: 'kes', aras: 3,
    senario: 'Setiap kali murid mengetuk meja, guru berhenti mengajar dan menegurnya dengan panjang. Murid semakin kerap mengetuk meja.',
    soalan: 'Dari segi kesan, teguran guru berfungsi sebagai…',
    pilihan: ['peneguhan positif', 'hukuman positif', 'hukuman negatif', 'peneguhan negatif'],
    jawapan: 0,
    huraian: 'Perhatian guru ditambah dan tingkah laku meningkat. Kategori akibat ditentukan oleh kesan pada tingkah laku, bukan niat guru.' },

  { id: 'U8-08', unit: 8, jenis: 'pilihan', aras: 2,
    soalan: 'Pernyataan manakah yang merupakan TAKRIF OPERASI?',
    pilihan: [
      'Aina bercakap dengan rakan semasa guru memberi arahan sebanyak empat kali dalam 20 minit.',
      'Aina tidak menghormati guru.',
      'Aina memang suka mengganggu kelas.',
      'Aina tidak bermotivasi dalam kelas Sains.'],
    jawapan: 0,
    huraian: 'Takrif operasi menerangkan tingkah laku dalam bentuk yang boleh diperhatikan, direkod, dibandingkan dan dinilai semula.' },

  { id: 'U8-09', unit: 8, jenis: 'pilihan', aras: 2,
    soalan: 'Guru merekod masa dari arahan "Buka buku" sehingga murid mula membuka buku. Jenis ukuran garis dasar ini ialah…',
    pilihan: ['latensi', 'kekerapan', 'tempoh', 'sela'],
    jawapan: 0,
    huraian: 'Latensi ialah masa antara arahan dengan permulaan tingkah laku. Sela pula ialah masa antara dua kejadian tingkah laku.' },

  { id: 'U8-10', unit: 8, jenis: 'pilihan', aras: 2,
    soalan: 'Kuiz disemak setiap hari Jumaat, dan murid mula mengulang kaji apabila hari Jumaat hampir. Ini menggambarkan jadual peneguhan…',
    pilihan: ['selang tetap', 'nisbah tetap', 'nisbah berubah', 'berterusan'],
    jawapan: 0,
    huraian: 'Selang tetap: respons pertama selepas tempoh yang tetap diteguhkan, dan respons meningkat apabila masa semakan hampir.' },

  { id: 'U8-11', unit: 8, jenis: 'pilihan', aras: 1,
    soalan: 'Peneguhan penghampiran berturutan menuju tingkah laku sasaran dinamakan…',
    pilihan: ['pembentukan (shaping)', 'penghapusan', 'generalisasi', 'ekonomi token'],
    jawapan: 0,
    huraian: 'Contoh: pembentangan 30 saat, 1 minit, 3 minit, kemudian 5 minit. Jangan kekalkan sasaran kecil selama-lamanya.' },

  { id: 'U8-12', unit: 8, jenis: 'bs', aras: 2,
    soalan: 'Dalam kerangka A–B–C, "A" merujuk kepada akibat yang berlaku selepas tingkah laku.',
    pilihan: ['Betul', 'Salah'], jawapan: 1,
    huraian: 'Salah. A = anteseden (sebelum tingkah laku), B = tingkah laku, C = akibat (consequence).' },

  { id: 'U8-13', unit: 8, jenis: 'pilihan', aras: 1,
    soalan: 'Pengasas behaviorisme yang menjalankan eksperimen "Little Albert" (1920) ialah…',
    pilihan: ['John B. Watson', 'B. F. Skinner', 'Ivan Pavlov', 'Albert Bandura'],
    jawapan: 0,
    huraian: 'Watson dan Rosalie Rayner memasangkan tikus putih dengan bunyi kuat. Eksperimen ini menimbulkan isu etika yang serius dan tidak dibenarkan hari ini.' },

  /* ---------------- Unit 9: Teori Pembelajaran Sosial Bandura ---------------- */
  { id: 'U9-01', unit: 9, jenis: 'pilihan', aras: 1,
    soalan: 'Hubungan dinamik antara faktor peribadi, tingkah laku dan persekitaran dalam teori Bandura dinamakan…',
    pilihan: ['penentuan timbal balik', 'pelaziman operan', 'pembelajaran vikarius', 'ekonomi token'],
    jawapan: 0,
    huraian: 'Setiap unsur boleh menjadi sebab dan akibat kepada unsur yang lain, dengan enam arah pengaruh.' },

  { id: 'U9-02', unit: 9, jenis: 'pilihan', aras: 2,
    soalan: '"Kelas yang selamat boleh mengurangkan kebimbangan murid." Arah pengaruh yang ditunjukkan ialah…',
    pilihan: ['persekitaran mempengaruhi faktor peribadi', 'faktor peribadi mempengaruhi tingkah laku', 'tingkah laku mempengaruhi persekitaran', 'tingkah laku mempengaruhi faktor peribadi'],
    jawapan: 0,
    huraian: 'Kelas (persekitaran) mempengaruhi kebimbangan (faktor peribadi).' },

  { id: 'U9-03', unit: 9, jenis: 'pilihan', aras: 1,
    soalan: 'Empat proses pembelajaran melalui pemerhatian menurut Bandura ialah…',
    pilihan: ['perhatian, penyimpanan, pengeluaran dan motivasi', 'anteseden, tingkah laku, akibat dan data', 'asimilasi, akomodasi, organisasi dan adaptasi', 'kekerapan, tempoh, latensi dan sela'],
    jawapan: 0,
    huraian: 'Jika pemodelan tidak berkesan, tanya ikut urutan: adakah dia melihatnya, boleh menerangkannya semula, boleh melakukannya, dan ada sebab serta keyakinan untuk mencuba?' },

  { id: 'U9-04', unit: 9, jenis: 'kes', aras: 3,
    senario: 'Selepas demonstrasi, seorang pelajar berkata: "Saya faham semasa cikgu menunjukkannya, tetapi sekarang saya tidak ingat langkah kedua."',
    soalan: 'Proses yang paling mungkin menjadi halangan ialah…',
    pilihan: ['penyimpanan', 'perhatian', 'pengeluaran', 'motivasi'],
    jawapan: 0,
    huraian: 'Penyimpanan: tingkah laku perlu dikod dan disimpan. Bantu dengan menamakan langkah, rajah alir dan meminta pelajar menerangkan semula.' },

  { id: 'U9-05', unit: 9, jenis: 'kes', aras: 3,
    senario: 'Murid boleh menyebut keempat-empat kriteria menilai sumber dalam talian dengan lancar, tetapi belum dapat menggunakannya pada sumber sebenar.',
    soalan: 'Proses yang menjadi halangan ialah…',
    pilihan: ['pengeluaran', 'penyimpanan', 'perhatian', 'motivasi'],
    jawapan: 0,
    huraian: 'Pengeluaran: menterjemah apa yang diingati kepada tindakan. Beri latihan terbimbing, maklum balas dan peluang mencuba semula.' },

  { id: 'U9-06', unit: 9, jenis: 'pilihan', aras: 2,
    soalan: 'Seorang murid melihat rakan setaranya mula-mula gagal, kemudian berjaya selepas menukar strategi. Sumber efikasi kendiri yang terlibat ialah…',
    pilihan: ['pengalaman vikarius', 'pengalaman penguasaan', 'pujukan sosial', 'keadaan fisiologi dan afektif'],
    jawapan: 0,
    huraian: 'Empat sumber efikasi kendiri: pengalaman penguasaan, pengalaman vikarius, pujukan sosial, serta keadaan fisiologi dan afektif.' },

  { id: 'U9-07', unit: 9, jenis: 'pilihan', aras: 1,
    soalan: 'Sumber efikasi kendiri yang paling berkuasa kerana melibatkan kejayaan sebenar melalui usaha dan strategi sendiri ialah…',
    pilihan: ['pengalaman penguasaan', 'pujukan sosial', 'pengalaman vikarius', 'keadaan afektif'],
    jawapan: 0,
    huraian: 'Pengalaman penguasaan dibina melalui tugasan berperingkat dan kemajuan yang autentik.' },

  { id: 'U9-08', unit: 9, jenis: 'bs', aras: 2,
    soalan: 'Efikasi kendiri sama dengan kebolehan sebenar seseorang.',
    pilihan: ['Betul', 'Salah'], jawapan: 1,
    huraian: 'Salah. Efikasi kendiri ialah kepercayaan tentang keupayaan melakukan tugasan tertentu. Ia tidak sama dengan kebolehan sebenar atau keyakinan umum.' },

  { id: 'U9-09', unit: 9, jenis: 'kes', aras: 3,
    senario: 'Seorang murid dihina di hadapan kelas selepas memberikan jawapan yang salah.',
    soalan: 'Apakah yang paling mungkin dipelajari oleh murid lain yang memerhati?',
    pilihan: [
      'mengambil risiko akademik dalam kelas ini berbahaya',
      'kesilapan ialah sebahagian daripada pembelajaran',
      'guru menghargai setiap percubaan',
      'bertanya soalan meningkatkan status dalam kelas'],
    jawapan: 0,
    huraian: 'Ini hukuman vikarius. Betulkan kesilapan secara bermaruah dan jangan gunakan murid sebagai "contoh negatif".' },

  { id: 'U9-10', unit: 9, jenis: 'pilihan', aras: 2,
    soalan: 'Seorang murid sudah tahu cara meminta bantuan tetapi jarang berbuat demikian. Selepas melihat rakannya meminta bantuan dengan tenang, dia mula melakukannya. Kesan pemodelan ini ialah…',
    pilihan: ['memudahkan tingkah laku sedia ada', 'pemerolehan tingkah laku baharu', 'menghalang tingkah laku', 'membangkitkan emosi'],
    jawapan: 0,
    huraian: 'Memudahkan: pemerhatian meningkatkan kemungkinan tindakan yang sebenarnya sudah diketahui.' },

  { id: 'U9-11', unit: 9, jenis: 'pilihan', aras: 2,
    soalan: 'Model yang menunjukkan kesukaran, kesilapan, strategi dan kemajuan ("Saya tersilap di sini, saya cuba cara lain") dinamakan…',
    pilihan: ['model daya tindak', 'model pakar', 'model simbolik', 'model autoriti'],
    jawapan: 0,
    huraian: 'Model daya tindak berguna apabila pemerhati kurang yakin, kerana kejayaan kelihatan boleh dicapai melalui strategi.' },

  { id: 'U9-12', unit: 9, jenis: 'bs', aras: 2,
    soalan: 'Menurut Bandura, pembelajaran boleh berlaku walaupun tingkah laku belum ditunjukkan.',
    pilihan: ['Betul', 'Salah'], jawapan: 0,
    huraian: 'Betul. Pembelajaran ialah proses dalaman, jadi pelajar yang boleh menerangkan langkah tetapi enggan melakukannya mungkin sudah belajar.' },

  /* ---------------- Unit 10: Isu-Isu Semasa dalam Pendidikan ---------------- */
  { id: 'U10-01', unit: 10, jenis: 'pilihan', aras: 2,
    soalan: '"Arahan panjang dan kebimbangan mungkin menyumbang kepada kelewatan murid memulakan tugasan." Pernyataan ini ialah satu…',
    pilihan: ['hipotesis', 'pemerhatian', 'label', 'diagnosis'],
    jawapan: 0,
    huraian: 'Hipotesis ialah penjelasan sementara yang boleh diuji. Pemerhatian bersifat khusus dan boleh disemak, label tidak menerangkan mekanisme, dan diagnosis memerlukan penilaian profesional.' },

  { id: 'U10-02', unit: 10, jenis: 'pilihan', aras: 1,
    soalan: 'Menggunakan pelbagai sumber atau kaedah, contohnya rekod kehadiran, perbualan dengan murid dan maklumat keluarga, untuk memahami sesuatu isu dinamakan…',
    pilihan: ['triangulasi', 'generalisasi', 'garis dasar', 'saringan'],
    jawapan: 0,
    huraian: 'Satu data tidak sama dengan satu kesimpulan. Triangulasi menghasilkan gambaran yang lebih kukuh.' },

  { id: 'U10-03', unit: 10, jenis: 'kes', aras: 3,
    senario: 'Ketidakhadiran Daniel meningkat selepas laluan basnya berubah. Dia kini perlu berjalan melalui kawasan tempat sekumpulan murid pernah membulinya.',
    soalan: 'Respons yang paling sepadan dengan mekanisme masalah ialah…',
    pilihan: [
      'semak keselamatan perjalanannya, libatkan keluarga dan sekolah, dan aktifkan saluran laporan buli',
      'beri hadiah jika Daniel hadir setiap hari',
      'beri amaran bahawa ketidakhadiran akan dihukum',
      'pindahkan Daniel ke kelas lain tanpa berbincang dengannya'],
    jawapan: 0,
    huraian: 'Mekanisme masalahnya ialah keselamatan dan ekologi, bukan ketiadaan motivasi. Ketidakhadiran tidak semestinya ponteng dengan sengaja.' },

  { id: 'U10-04', unit: 10, jenis: 'pilihan', aras: 1,
    soalan: 'Urutan respons yang paling wajar terhadap kes buli ialah…',
    pilihan: [
      'perlindungan, prosedur, pemulihan, pencegahan dan pemantauan',
      'hukuman, amaran, pemantauan dan pengabaian',
      'nasihat kepada mangsa, kemudian pemantauan',
      'pencegahan, hukuman dan penggantungan'],
    jawapan: 0,
    huraian: 'Respons bermula dengan melindungi, mendengar secara berasingan dan mendokumentasi bukti, termasuk bukti digital.' },

  { id: 'U10-05', unit: 10, jenis: 'bs', aras: 2,
    soalan: 'Buli siber yang berlaku di luar waktu sekolah bukan tanggungjawab sekolah dan boleh diabaikan.',
    pilihan: ['Betul', 'Salah'], jawapan: 1,
    huraian: 'Salah. Kesannya memasuki sekolah melalui emosi, keselamatan, pembelajaran dan kehadiran.' },

  { id: 'U10-06', unit: 10, jenis: 'kes', aras: 3,
    senario: 'Dalam jurnal refleksinya, seorang murid menulis bahawa dia "tidak mahu hidup lagi".',
    soalan: 'Tindakan pertama guru ialah…',
    pilihan: [
      'ambil serius, pastikan murid tidak ditinggalkan bersendirian, dan aktifkan prosedur kecemasan serta rujukan dengan segera',
      'tunggu beberapa hari untuk melihat sama ada kenyataan itu berulang',
      'jalankan sesi terapi sendiri selepas waktu sekolah',
      'bincangkan kenyataan itu di hadapan kelas supaya rakan dapat membantu'],
    jawapan: 0,
    huraian: 'Prinsip keputusan: keselamatan dahulu, sebelum motivasi atau pencapaian dibincangkan.' },

  { id: 'U10-07', unit: 10, jenis: 'pilihan', aras: 2,
    soalan: 'Ekuiti dalam pendidikan bermaksud…',
    pilihan: [
      'sokongan disesuaikan untuk mengurangkan halangan dan mewujudkan peluang pembelajaran yang adil',
      'semua murid menerima perkara yang sama',
      'standard sentiasa dikurangkan untuk murid tertentu',
      'tiada perbezaan sokongan antara murid'],
    jawapan: 0,
    huraian: 'Kesamaan: perkara yang sama kepada semua. Ekuiti: sokongan yang diperlukan untuk peluang yang adil.' },

  { id: 'U10-08', unit: 10, jenis: 'kes', aras: 3,
    senario: 'Seorang pelajar menyerahkan jawapan yang sangat baik, tetapi tidak dapat menerangkannya. Guru mengesyaki penggunaan AI.',
    soalan: 'Respons yang paling mendidik ialah…',
    pilihan: [
      'menyemak bantuan yang dibenarkan, kefahaman tugasan, kemahiran sintesis dan reka bentuk pentaksiran, kemudian memberi akibat yang adil serta peluang menunjukkan pembelajaran',
      'terus memberi markah sifar dan menutup kes',
      'mengharamkan semua penggunaan AI dalam kursus',
      'membiarkannya kerana jawapan itu betul'],
    jawapan: 0,
    huraian: 'Integriti akademik juga isu pembelajaran. Respons bukan semata-mata "tangkap dan hukum".' },

  { id: 'U10-09', unit: 10, jenis: 'pilihan', aras: 2,
    soalan: 'Penggunaan teori yang paling kukuh dalam analisis isu pendidikan ialah…',
    pilihan: ['menerangkan mekanisme dan memandu tindakan', 'menyenaraikan seberapa banyak tokoh', 'menggunakan istilah umum', 'memilih teori yang paling terkenal'],
    jawapan: 0,
    huraian: 'Ujian keselarasan: jika teori ditukar tetapi cadangan penyelesaian kekal sama, hubungan teori itu mungkin terlalu umum.' },

  { id: 'U10-10', unit: 10, jenis: 'pilihan', aras: 2,
    soalan: 'Seorang guru mendapati hanya dua daripada lima sesi intervensi yang dirancang benar-benar dijalankan. Kategori penilaian yang terlibat ialah…',
    pilihan: ['proses', 'hasil', 'pengalaman', 'ekuiti dan kesan sampingan'],
    jawapan: 0,
    huraian: 'Penilaian proses bertanya: adakah intervensi dilaksanakan seperti yang dirancang?' },

  { id: 'U10-11', unit: 10, jenis: 'bs', aras: 2,
    soalan: 'Jika murid mengugut untuk mencederakan rakannya, guru patut mengumpulkan data garis dasar selama dua minggu dahulu sebelum bertindak.',
    pilihan: ['Betul', 'Salah'], jawapan: 1,
    huraian: 'Salah. Jika terdapat ancaman atau risiko serius, jangan tunggu kitaran intervensi biasa. Aktifkan respons keselamatan dan prosedur dengan segera.' },

  { id: 'U10-12', unit: 10, jenis: 'kes', aras: 3,
    senario: 'Aina menyiapkan semua latihan dengan cepat dan tepat, kemudian menunggu lama tanpa tugasan lanjutan. Selepas itu dia mula berbual dan mengganggu rakan.',
    soalan: 'Pola kesukaran pembelajaran yang paling sesuai ialah…',
    pilihan: ['kebolehan tinggi yang tidak dicabar', 'jurang pengetahuan', 'kemungkinan ketidakupayaan', 'perhatian dan fungsi eksekutif'],
    jawapan: 0,
    huraian: 'Respons awal: berikan pengayaan, kedalaman dan cabaran.' },

  /* ---------------- Unit 11: Pengurusan Bilik Darjah ---------------- */
  { id: 'U11-01', unit: 11, jenis: 'pilihan', aras: 1,
    soalan: 'Lima dimensi pengurusan bilik darjah ialah…',
    pilihan: ['fizikal, psikososial, pengajaran, organisasi dan digital', 'peraturan, hukuman, ganjaran, rekod dan laporan', 'mikro, meso, ekso, makro dan krono', 'jangkaan, peraturan, rutin, prosedur dan disiplin'],
    jawapan: 0,
    huraian: 'Perubahan pada satu dimensi boleh mempengaruhi dimensi lain. Pengurusan bilik darjah bukan hanya membetulkan salah laku.' },

  { id: 'U11-02', unit: 11, jenis: 'kes', aras: 3,
    senario: 'Seorang guru baharu memulakan perancangan pengurusan kelasnya dengan menyenaraikan hukuman.',
    soalan: 'Apakah masalah utama pendekatan ini?',
    pilihan: [
      'Dia melangkau konteks, matlamat, persekitaran dan pengajaran',
      'Tiada masalah kerana hukuman perlu ditetapkan dahulu',
      'Hukuman sepatutnya ditetapkan oleh murid',
      'Dia sepatutnya bermula dengan penilaian pelan'],
    jawapan: 0,
    huraian: 'Tujuh langkah: teliti konteks, utamakan matlamat, jajarkan persekitaran, uraikan jangkaan, hidupkan melalui pengajaran, laksana dan pantau, laraskan berdasarkan bukti.' },

  { id: 'U11-03', unit: 11, jenis: 'pilihan', aras: 2,
    soalan: '"Letak beg, ambil buku latihan, salin tarikh dan mula menjawab soalan pembuka." Ini contoh…',
    pilihan: ['rutin', 'jangkaan', 'peraturan', 'akibat logik'],
    jawapan: 0,
    huraian: 'Rutin ialah urutan tindakan yang berulang. Jangkaan ialah nilai umum, peraturan ialah batas penting, dan prosedur ialah langkah terperinci bagi situasi tertentu.' },

  { id: 'U11-04', unit: 11, jenis: 'pilihan', aras: 2,
    soalan: '"Tiada tindakan fizikal yang boleh mencederakan orang lain." Ini contoh…',
    pilihan: ['peraturan', 'rutin', 'prosedur', 'jangkaan umum'],
    jawapan: 0,
    huraian: 'Peraturan ialah batas penting yang merentas situasi.' },

  { id: 'U11-05', unit: 11, jenis: 'bs', aras: 2,
    soalan: 'Kelas yang sangat senyap pasti menunjukkan murid sedang belajar dengan berkesan.',
    pilihan: ['Betul', 'Salah'], jawapan: 1,
    huraian: 'Salah. Kepatuhan luaran tidak sama dengan penglibatan kognitif. Ukur pengurusan melalui pembelajaran dan pengalaman murid.' },

  { id: 'U11-06', unit: 11, jenis: 'kes', aras: 3,
    senario: 'Guru bertanya "Semua faham?" dan tiada sesiapa menjawab.',
    soalan: 'Langkah yang lebih baik ialah…',
    pilihan: [
      'gunakan papan mini atau soalan diagnostik supaya setiap murid memberikan respons',
      'teruskan pelajaran kerana tiada soalan bermaksud semua faham',
      'tegur kelas kerana tidak menjawab',
      'ulang soalan yang sama dengan suara yang lebih kuat'],
    jawapan: 0,
    huraian: 'PBD dan pengurusan bilik darjah berjalan bersama. Respons murid memberi data tentang kefahaman, perhatian dan halangan.' },

  { id: 'U11-07', unit: 11, jenis: 'pilihan', aras: 1,
    soalan: 'Empat tindakan utama dalam pemantauan aktif ialah…',
    pilihan: ['mengimbas, berinteraksi, merekod dan melaras', 'menegur, menghukum, merekod dan melapor', 'memerhati, menilai, menggred dan melapor', 'menyusun, mengarah, mengawal dan menghukum'],
    jawapan: 0,
    huraian: 'Keempat-empat tindakan berulang sepanjang pelajaran.' },

  { id: 'U11-08', unit: 11, jenis: 'pilihan', aras: 2,
    soalan: 'Dalam analisis A–T–A–F, huruf "F" merujuk kepada…',
    pilihan: ['fungsi hipotesis', 'faktor persekitaran', 'fasa pelaziman', 'fokus pengajaran'],
    jawapan: 0,
    huraian: 'A–T–A–F: Anteseden, Tingkah laku, Akibat dan Fungsi hipotesis (hasil yang dicari atau keadaan yang cuba dielakkan).' },

  { id: 'U11-09', unit: 11, jenis: 'kes', aras: 3,
    senario: 'Semasa kerja individu, Irfan meninggalkan tempat duduk tiga kali dalam 15 minit selepas arahan yang panjang diberikan. Tiada risiko keselamatan.',
    soalan: 'Respons yang paling berkadar ialah…',
    pilihan: [
      'dekati Irfan secara neutral, semak bahagian arahan yang belum jelas, dan tunjukkan cara meminta bantuan',
      'keluarkan Irfan dari kelas sehingga waktu tamat',
      'tegur Irfan di hadapan kelas supaya murid lain tidak meniru',
      'aktifkan respons krisis'],
    jawapan: 0,
    huraian: 'Respons perlu berperingkat, berkadar, mendidik dan mempunyai jalan kembali kepada pembelajaran.' },

  { id: 'U11-10', unit: 11, jenis: 'kes', aras: 3,
    senario: 'Amir memerlukan jadual visual untuk mengikuti urutan aktiviti.',
    soalan: 'Tindakan yang paling kurang menstigma ialah…',
    pilihan: [
      'paparkan jadual visual untuk seluruh kelas dan bincangkan keperluan khusus Amir secara peribadi',
      'umumkan kepada kelas bahawa Amir memerlukan bantuan khas',
      'asingkan Amir di meja belakang dengan jadualnya sendiri',
      'beri Amir tugasan yang lebih mudah tanpa berbincang dengannya'],
    jawapan: 0,
    huraian: 'Tawarkan sebahagian sokongan kepada seluruh kelas apabila sesuai, dan bincangkan keperluan khusus secara peribadi.' },

  { id: 'U11-11', unit: 11, jenis: 'kes', aras: 3,
    senario: 'Dalam kelas Cikgu Aina, tiga murid hanya menunggu rakan melakukan tugasan kumpulan.',
    soalan: 'Tindakan yang paling sepadan dengan mekanisme masalah ialah…',
    pilihan: [
      'tetapkan peranan yang bergilir, produk individu yang ringkas dan kriteria sumbangan',
      'susun semua meja dalam barisan',
      'larang semua kerja kumpulan',
      'tegur seluruh kelas setiap kali perkara ini berlaku'],
    jawapan: 0,
    huraian: 'Jangan ubah seluruh kelas untuk menyelesaikan satu gejala jika reka bentuk sebenar masalah belum disentuh.' },

  { id: 'U11-12', unit: 11, jenis: 'pilihan', aras: 2,
    soalan: 'Ciri akibat logik yang baik TIDAK termasuk…',
    pilihan: ['memalukan murid supaya menjadi pengajaran kepada kelas', 'berkaitan dengan tindakan', 'berkadar', 'memulihkan akses kepada pembelajaran'],
    jawapan: 0,
    huraian: 'Enam ciri akibat logik: berkaitan, berkadar, mendidik, menghormati maruah dan privasi, memulihkan akses, dan boleh dinilai.' },

  /* ---------------- Penutup: Saya sebagai Guru yang Memahami Murid ---------------- */
  { id: 'P-01', unit: 12, jenis: 'kes', aras: 3,
    senario: 'Hana tidak menyerahkan tiga tugasan bertulis, tetapi dapat menerangkan isi tugasan apabila ditanya secara lisan.',
    soalan: 'Tindakan awal yang paling selaras dengan cara berfikir guru yang memahami murid ialah…',
    pilihan: [
      'sediakan rangka respons untuk satu tugasan pendek, kemudian pantau sama ada Hana dapat menyiapkannya',
      'beri Hana amaran bertulis supaya dia belajar bertanggungjawab',
      'rujuk Hana kepada kaunselor kerana dia malas',
      'potong markah sehingga Hana menyerahkan semua tugasan'],
    jawapan: 0,
    huraian: 'Respons yang berkembang: pemerhatian tanpa label, beberapa hipotesis, data tambahan, tindakan yang selamat, kemudian pantau kesan.' },

  { id: 'P-02', unit: 12, jenis: 'pilihan', aras: 1,
    soalan: 'Yang manakah BUKAN satu daripada empat elemen karakter KP2027?',
    pilihan: ['Integriti', 'Penyayang', 'Berdaya Tahan', 'Warganegara Aktif'],
    jawapan: 0,
    huraian: 'Empat elemen KP2027: Penyayang, Berdaya Tahan, Berupaya Memimpin dan Warganegara Aktif. Integriti ialah satu daripada enam nilai teras VBE.' },

  { id: 'P-03', unit: 12, jenis: 'pilihan', aras: 1,
    soalan: 'Enam nilai teras Pendidikan Berasaskan Nilai (VBE) MQA ialah Kemuliaan Insan, Keadilan, Integriti, Kesyukuran, Keberanian dan…',
    pilihan: ['Altruisme', 'Kerajinan', 'Kepimpinan', 'Ketaatan'],
    jawapan: 0,
    huraian: 'Enam nilai teras VBE: Kemuliaan Insan, Keadilan, Integriti, Kesyukuran, Keberanian dan Altruisme.' },

  { id: 'P-04', unit: 12, jenis: 'pilihan', aras: 2,
    soalan: 'Soalan "Adakah kita mengukur hasil pembelajaran atau halangan akses?" paling berkait dengan…',
    pilihan: ['kepelbagaian murid dan MBPK', 'perkembangan kognitif', 'susunan fizikal bilik darjah', 'pelaziman operan'],
    jawapan: 0,
    huraian: 'Soalan tentang akses berkait dengan kepelbagaian murid dan MBPK: penyesuaian mengurangkan halangan yang bukan sebahagian daripada hasil yang diukur.' },

  { id: 'P-05', unit: 12, jenis: 'bs', aras: 2,
    soalan: 'Proses keputusan guru ialah satu garis lurus yang tamat sebaik sahaja tindakan diambil.',
    pilihan: ['Betul', 'Salah'], jawapan: 1,
    huraian: 'Salah. Ia ialah kitaran. Selepas melaras, maklumat baharu boleh membawa guru kembali kepada pemerhatian dan hipotesis.' },

  { id: 'P-06', unit: 12, jenis: 'pilihan', aras: 2,
    soalan: 'Nilai Kemuliaan Insan diterjemahkan kepada tindakan guru dengan…',
    pilihan: ['mengelakkan penghinaan dan melindungi privasi murid', 'memberi hadiah kepada murid cemerlang', 'menyamakan semua tugasan untuk semua murid', 'menghukum murid di hadapan kelas'],
    jawapan: 0,
    huraian: 'Setiap nilai dan karakter perlu diterjemahkan kepada tindakan yang boleh diperhatikan.' },
];
