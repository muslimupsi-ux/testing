/* =====================================================================
   KANDUNGAN BENGKEL — sunting di sini sahaja
   Sumber: Prompt Template Pedagogi Gen AI & Prompt Template Bina Web App
   dengan Gemini (Prof. Dr. Izwan Shahril, Dr. Mohd Muslim Md Zalli,
   Dr. Nik Muhammad Hanis; Pusat Akademik, UPSI Holdings Sdn. Bhd., 2026).
   Petak [ ... ] diisi secara automatik oleh Pembina Prompt.
   ===================================================================== */
var D = {};

/* ---------- maklumat bengkel ---------- */
D.SITE_URL = 'https://drmuslimzalli.aila.my/bengkel-ai-jpn-melaka';
D.DELIMA = 'https://d3.delima.edu.my/landing';
D.EXPERT = 'https://directory.upsi.edu.my/experts/profile/CCA4434941954F12';
D.TOOLS = {
  gemini: { name: 'Gemini', url: 'https://gemini.google.com/app', logo: '/media/logo-gemini' },
  chatgpt: { name: 'ChatGPT', url: 'https://chatgpt.com/', logo: '/media/logo-chatgpt' },
  notebooklm: { name: 'NotebookLM', url: 'https://notebooklm.google.com/', logo: '/media/logo-notebooklm' }
};

/* ---------- fasilitator (tab Utama) ----------
   n = nama, i = inisial (avatar), o = institusi, url = pautan profil (pilihan).
   Untuk memasang gambar: tambah  foto: '/media/<nama-aset-AILA>'  pada orang berkenaan. */
D.FASIL = [
  { n: 'Dr. Muslim Zalli', i: 'MZ', o: 'Universiti Pendidikan Sultan Idris', url: D.EXPERT },
  { n: 'Dr. Nik Muhammad Hanis', i: 'NH', o: 'Universiti Pendidikan Sultan Idris' },
  { n: 'En. Farid Zul', i: 'FZ', o: 'Universiti Pendidikan Sultan Idris' },
  { n: 'En. Rais Mujahid', i: 'RM', o: 'Universiti Pendidikan Sultan Idris' }
];

/* ---------- pilihan borang ---------- */
D.SUBJEK = ['Bahasa Melayu', 'Bahasa Inggeris', 'Bahasa Cina', 'Bahasa Tamil', 'Bahasa Arab', 'Kesusasteraan Melayu Komunikatif', 'Literature in English'];
D.TAHUN = ['Tahun 1', 'Tahun 2', 'Tahun 3', 'Tahun 4', 'Tahun 5', 'Tahun 6', 'Tingkatan 1', 'Tingkatan 2', 'Tingkatan 3', 'Tingkatan 4', 'Tingkatan 5'];
D.MASA = ['5 minit', '10 minit', '15 minit', '30 minit', '60 minit', '80 minit'];
D.BAHASA = ['Bahasa Melayu', 'Bahasa Inggeris', 'Dwibahasa (Bahasa Melayu dan Bahasa Inggeris)'];
D.WARNA = ['biru lembut', 'hijau segar', 'pastel', 'merah jambu lembut', 'ungu', 'oren ceria'];

/* ---------- etika ---------- */
D.ETIKA = [
  ['Guru penentu', 'AI membantu, keputusan akhir di tangan guru.'],
  ['Semak fakta', 'AI boleh menjana fakta yang salah dengan yakin.'],
  ['Lindungi murid', 'Jangan masukkan nama penuh, nombor kad pengenalan atau maklumat kesihatan murid.'],
  ['Selari DSKP', 'Hasil AI mesti selari dengan DSKP dan Objektif Pembelajaran.'],
  ['Telus', 'Nyatakan bahan yang dihasilkan dengan bantuan AI.']
];

/* =====================================================================
   PEDAGOGI GEN AI (formula R-T-F)
   ===================================================================== */
D.FASA = [
  { k: 'Set Induksi', d: 'Fasa pembukaan yang menarik perhatian murid, mencungkil pengetahuan sedia ada, dan menimbulkan rasa ingin tahu terhadap topik baharu.' },
  { k: 'Kandungan', d: 'Fasa penyampaian isi pelajaran secara jelas, berperingkat, dan pada aras yang sesuai dengan kemampuan murid.' },
  { k: 'Pengukuhan', d: 'Fasa yang membolehkan murid mengaplikasi, membincang, dan mengukuhkan kefahaman melalui penglibatan aktif.' },
  { k: 'Pentaksiran', d: 'Fasa menilai penguasaan murid dengan alat yang selari dengan Objektif Pembelajaran, merentasi pelbagai aras pemikiran.' },
  { k: 'Penutup', d: 'Fasa merumus pembelajaran, mengukuhkan ingatan murid, dan menutup sesi dengan bermakna.' },
  { k: 'Sokongan PdP', d: 'Templat tambahan untuk tugas di sekeliling sesi pengajaran: perancangan sebelum masuk kelas, sokongan murid yang berbeza keperluan, dan refleksi selepas mengajar.' }
];

/* Proses Pedagogi: setiap langkah dipetakan kepada fasa templat (D.FASA) */
D.PROSES = [
  { k: 'Penyediaan Bahan', f: 'Sokongan PdP', d: 'Sebelum masuk kelas: rancang RPH, bina objektif pembelajaran yang boleh diukur, dan sediakan bahan mengikut tahap murid.' },
  { k: 'Induksi', f: 'Set Induksi' },
  { k: 'Pengetahuan Kandungan', f: 'Kandungan' },
  { k: 'Pengukuhan', f: 'Pengukuhan' },
  { k: 'Pentaksiran', f: 'Pentaksiran' },
  { k: 'Penutup', f: 'Penutup' }
];

D.PED = [
  /* B1 SET INDUKSI */
  { id: 'B1.1', s: 'Set Induksi', t: 'Soalan Pencetus Berasaskan Pengalaman', p: 'Anda seorang guru [Mata Pelajaran] yang kreatif dan berpengalaman. Bina SATU set induksi selama [Tempoh Masa] untuk topik [Tajuk/Topik] bagi murid [Tahun/Tingkatan]. Set induksi ini perlu mengaitkan pengalaman harian murid dengan konsep yang akan dipelajari, dan diakhiri dengan satu soalan pencetus yang menimbulkan rasa ingin tahu. Sertakan skrip pertuturan guru dan jangkaan respons murid.' },
  { id: 'B1.2', s: 'Set Induksi', t: 'Set Induksi Berasaskan Visual', p: 'Cadangkan SATU aktiviti set induksi berasaskan visual (gambar atau video pendek) untuk topik [Tajuk/Topik] bagi murid [Tahun/Tingkatan] dalam mata pelajaran [Mata Pelajaran]. Nyatakan jenis visual yang sesuai, tiga soalan aruhan untuk dibincangkan bersama murid, dan cara mengaitkannya dengan Objektif Pembelajaran [Objektif Pembelajaran].' },
  { id: 'B1.3', s: 'Set Induksi', t: 'Teka-teki atau Permainan Ringkas', p: 'Reka SATU teka-teki atau permainan ringkas (tidak lebih [Tempoh Masa], tanpa memerlukan bahan khas) sebagai set induksi bagi topik [Tajuk/Topik], murid [Tahun/Tingkatan], mata pelajaran [Mata Pelajaran]. Permainan ini mesti berjaya mencungkil miskonsepsi sedia ada murid berkaitan topik ini.' },
  { id: 'B1.4', s: 'Set Induksi', t: 'Jadual KWL untuk Mengaktifkan Pengetahuan Sedia Ada', p: 'Bina jadual KWL (Know, Want to know, Learn) untuk topik [Tajuk/Topik] bagi murid [Tahun/Tingkatan]. Sertakan tiga contoh soalan permulaan untuk kolum K yang membantu guru menilai pengetahuan sedia ada murid sebelum topik ini diajar, serta cadangan cara mengendalikan sesi ini dalam bilik darjah.' },
  { id: 'B1.5', s: 'Set Induksi', t: 'Senario atau Cerita Pendek', p: 'Cipta SATU senario atau cerita pendek (100 hingga 150 patah perkataan) berkaitan kehidupan seharian yang boleh digunakan sebagai set induksi untuk topik [Tajuk/Topik], mata pelajaran [Mata Pelajaran], murid [Tahun/Tingkatan]. Akhiri cerita dengan satu masalah atau persoalan yang mendorong murid meneroka topik pembelajaran hari ini.' },
  { id: 'B1.6', s: 'Set Induksi', t: 'Demonstrasi atau Fakta Mengejutkan', p: 'Cadangkan SATU demonstrasi ringkas atau fakta mengejutkan berkaitan topik [Tajuk/Topik] yang boleh digunakan untuk membuka sesi pengajaran bagi murid [Tahun/Tingkatan]. Nyatakan bahan yang diperlukan (mesti mudah didapati di sekolah), langkah pelaksanaan, dan soalan susulan untuk mengaitkannya dengan konsep yang akan diajar.' },

  /* B2 PENGETAHUAN KANDUNGAN */
  { id: 'B2.1', s: 'Kandungan', t: 'Penerangan Menggunakan Analogi', p: 'Anda seorang pakar kandungan [Mata Pelajaran]. Terangkan konsep [Tajuk/Topik] kepada murid [Tahun/Tingkatan] menggunakan SATU analogi yang mudah difahami dan berkaitan dengan kehidupan seharian murid. Sertakan penerangan langkah demi langkah dan dua contoh tambahan yang menggunakan analogi yang sama.' },
  { id: 'B2.2', s: 'Kandungan', t: 'Penerangan Berbeza Tahap', p: 'Sediakan TIGA versi penerangan bagi konsep [Tajuk/Topik] (mata pelajaran [Mata Pelajaran], murid [Tahun/Tingkatan]) mengikut tahap pencapaian murid: pertama untuk murid yang memerlukan bimbingan lanjut, kedua untuk murid pada tahap sederhana, dan ketiga untuk murid cemerlang yang memerlukan cabaran tambahan. Nyatakan perbezaan utama antara ketiga-tiga versi.' },
  { id: 'B2.3', s: 'Kandungan', t: 'Rangka Nota Berstruktur', p: 'Bina rangka nota berstruktur untuk konsep [Tajuk/Topik] bagi murid [Tahun/Tingkatan]. Susun kandungan mengikut hierarki daripada konsep utama kepada subkonsep, dan cadangkan format visual yang paling sesuai untuk topik ini sama ada peta minda, jadual, atau carta alir. Terangkan sebab format itu paling sesuai.' },
  { id: 'B2.4', s: 'Kandungan', t: 'Soalan Socratic untuk Membina Kefahaman', p: 'Bina satu set lima soalan Socratic untuk membantu murid [Tahun/Tingkatan] membina kefahaman sendiri tentang konsep [Tajuk/Topik] dalam mata pelajaran [Mata Pelajaran]. Susun soalan daripada aras mudah kepada aras pemikiran kritis mengikut Taksonomi Bloom, dan sertakan jangkaan respons murid bagi setiap soalan.' },
  { id: 'B2.5', s: 'Kandungan', t: 'Pelbagai Perwakilan Konsep', p: 'Terangkan konsep [Tajuk/Topik] dalam TIGA cara perwakilan berbeza: pertama penerangan verbal ringkas, kedua contoh berangka atau konkrit, dan ketiga gambaran visual atau simbolik. Sesuaikan dengan tahap murid [Tahun/Tingkatan] mata pelajaran [Mata Pelajaran].' },
  { id: 'B2.6', s: 'Kandungan', t: 'Menangani Miskonsepsi Lazim', p: 'Senaraikan [Bilangan] miskonsepsi yang paling lazim dalam kalangan murid [Tahun/Tingkatan] berkaitan topik [Tajuk/Topik]. Bagi setiap miskonsepsi, terangkan mengapa murid cenderung berfikir sedemikian, dan cadangkan satu cara penerangan atau aktiviti khusus untuk membetulkannya.' },

  /* B3 AKTIVITI PENGUKUHAN */
  { id: 'B3.1', s: 'Pengukuhan', t: 'Aktiviti Berkumpulan', p: 'Reka bentuk SATU aktiviti pengukuhan secara berkumpulan (empat hingga lima murid sekumpulan) untuk topik [Tajuk/Topik], murid [Tahun/Tingkatan], mata pelajaran [Mata Pelajaran]. Aktiviti perlu menggalakkan murid menganalisis, membincangkan atau menyelesaikan masalah berkaitan konsep yang dipelajari. Sertakan arahan langkah demi langkah, pembahagian peranan dalam kumpulan, dan tempoh masa yang dicadangkan bagi setiap langkah.' },
  { id: 'B3.2', s: 'Pengukuhan', t: 'Latihan Berperingkat', p: 'Bina set latihan pengukuhan yang mengandungi tiga aras kesukaran (mudah, sederhana dan mencabar) untuk topik [Tajuk/Topik] bagi murid [Tahun/Tingkatan]. Setiap aras perlu mengandungi tiga soalan berserta jawapan penuh dan langkah penyelesaian ringkas.' },
  { id: 'B3.3', s: 'Pengukuhan', t: 'Think-Pair-Share', p: 'Cadangkan struktur aktiviti Think-Pair-Share untuk topik [Tajuk/Topik], mata pelajaran [Mata Pelajaran], murid [Tahun/Tingkatan]. Sertakan soalan pencetus perbincangan, tempoh masa setiap fasa, cara guru boleh menilai penglibatan murid semasa aktiviti, dan cara mengendalikan murid yang enggan bercakap.' },
  { id: 'B3.4', s: 'Pengukuhan', t: 'Aktiviti Berbentuk Permainan', p: 'Cadangkan SATU aktiviti pengukuhan berbentuk permainan untuk mengukuhkan kefahaman murid [Tahun/Tingkatan] tentang topik [Tajuk/Topik] dalam mata pelajaran [Mata Pelajaran]. Nyatakan bahan yang diperlukan (mesti mudah disediakan), peraturan permainan, cara pemarkahan, dan cara guru memantau pembelajaran semasa permainan berjalan.' },
  { id: 'B3.5', s: 'Pengukuhan', t: 'Tugasan Aplikasi Dunia Sebenar', p: 'Reka SATU tugasan aplikasi dunia sebenar yang membolehkan murid [Tahun/Tingkatan] mengaplikasikan konsep [Tajuk/Topik] mata pelajaran [Mata Pelajaran] dalam konteks harian mereka. Sertakan arahan tugasan, kriteria hasil kerja yang diharapkan, dan cadangan cara murid membentangkan hasil mereka.' },
  { id: 'B3.6', s: 'Pengukuhan', t: 'Stesen Pembelajaran', p: 'Reka bentuk aktiviti stesen pembelajaran dengan [Bilangan] stesen untuk topik [Tajuk/Topik], murid [Tahun/Tingkatan]. Bagi setiap stesen, nyatakan tugasan yang berbeza, bahan yang diperlukan, tempoh masa, dan kemahiran yang disasarkan. Pastikan setiap stesen boleh dijalankan secara berdikari tanpa pengawasan guru sepanjang masa.' },

  /* B4 PENTAKSIRAN */
  { id: 'B4.1', s: 'Pentaksiran', t: 'Soalan Formatif Pelbagai Aras Bloom', p: 'Bina [Bilangan] soalan pentaksiran formatif untuk topik [Tajuk/Topik] bagi murid [Tahun/Tingkatan], merangkumi pelbagai aras Taksonomi Bloom iaitu mengingati, memahami, mengaplikasi dan menganalisis. Sertakan skema jawapan ringkas dan nyatakan aras Bloom bagi setiap soalan.' },
  { id: 'B4.2', s: 'Pentaksiran', t: 'Soalan KBAT Selari Objektif Pembelajaran', p: 'Bina tiga soalan berbentuk KBAT yang selari dengan Objektif Pembelajaran [Objektif Pembelajaran] bagi topik [Tajuk/Topik], murid [Tahun/Tingkatan]. Pastikan soalan memerlukan murid menganalisis, menilai atau mencipta, bukan sekadar mengingati fakta. Sertakan panduan pemarkahan yang menerangkan apa yang membezakan jawapan cemerlang daripada jawapan sederhana.' },
  { id: 'B4.3', s: 'Pentaksiran', t: 'Rubrik Pentaksiran Prestasi', p: 'Bina SATU rubrik pentaksiran dengan empat tahap penguasaan untuk menilai hasil kerja murid [Tahun/Tingkatan] bagi tugasan berkaitan [Tajuk/Topik], mata pelajaran [Mata Pelajaran]. Nyatakan kriteria yang jelas dan boleh diperhatikan bagi setiap tahap, dan susun dalam bentuk jadual.' },
  { id: 'B4.4', s: 'Pentaksiran', t: 'Exit Ticket', p: 'Bina tiga soalan exit ticket ringkas yang boleh dijawab dalam dua hingga tiga minit untuk menilai kefahaman murid [Tahun/Tingkatan] selepas sesi pembelajaran topik [Tajuk/Topik], mata pelajaran [Mata Pelajaran]. Sertakan panduan ringkas cara guru mentafsir jawapan murid untuk merancang sesi seterusnya.' },
  { id: 'B4.5', s: 'Pentaksiran', t: 'Senarai Semak Penilaian Kendiri', p: 'Bina senarai semak penilaian kendiri atau penilaian rakan sebaya untuk murid [Tahun/Tingkatan] menilai penguasaan mereka tentang konsep [Tajuk/Topik]. Sertakan lima pernyataan yang boleh ditanda sebagai Ya, Tidak atau Belum Pasti, ditulis dalam bahasa yang mudah difahami murid.' },
  { id: 'B4.6', s: 'Pentaksiran', t: 'Jadual Spesifikasi Ujian', p: 'Bina Jadual Spesifikasi Ujian (JSU) untuk ujian topik [Tajuk/Topik] bagi murid [Tahun/Tingkatan], mata pelajaran [Mata Pelajaran], dengan jumlah [Bilangan] soalan. Susun dalam bentuk jadual dengan lajur konstruk, aras Taksonomi Bloom, bilangan soalan, dan wajaran markah. Pastikan taburan aras seimbang dan selari dengan Objektif Pembelajaran [Objektif Pembelajaran].' },

  /* B5 PENUTUP */
  { id: 'B5.1', s: 'Penutup', t: 'One-Minute Paper', p: 'Cadangkan SATU aktiviti penutup ringkas berbentuk One-Minute Paper untuk topik [Tajuk/Topik] bagi murid [Tahun/Tingkatan]. Sertakan dua soalan reflektif yang membantu murid merumuskan pembelajaran hari ini dalam ayat mereka sendiri, dan cara guru menggunakan jawapan itu untuk merancang sesi seterusnya.' },
  { id: 'B5.2', s: 'Penutup', t: 'Teknik Rumusan 3-2-1', p: 'Bina SATU teknik rumusan pembelajaran berbentuk 3-2-1 atau exit slip untuk topik [Tajuk/Topik], mata pelajaran [Mata Pelajaran], murid [Tahun/Tingkatan]. Terangkan cara pelaksanaan dalam masa tidak lebih [Tempoh Masa], dan sertakan contoh jawapan murid yang baik.' },
  { id: 'B5.3', s: 'Penutup', t: 'Jambatan ke Topik Seterusnya', p: 'Cadangkan cara menutup sesi pembelajaran topik [Tajuk/Topik] dengan mengaitkannya kepada topik seterusnya dalam mata pelajaran [Mata Pelajaran] bagi murid [Tahun/Tingkatan]. Sertakan satu soalan renungan yang mendorong murid membuat sambungan pemikiran, dan skrip ringkas guru untuk menyampaikannya.' },
  { id: 'B5.4', s: 'Penutup', t: 'Penutup Bernilai Murni', p: 'Cadangkan SATU sesi penutup yang mengaitkan pengajaran topik [Tajuk/Topik] dengan nilai murni atau pengajaran kehidupan yang relevan, sesuai untuk murid [Tahun/Tingkatan]. Sertakan skrip ringkas guru untuk sesi refleksi ini, dan pastikan kaitan yang dibuat munasabah serta tidak dipaksakan.' },
  { id: 'B5.5', s: 'Penutup', t: 'Rumusan Bergamifikasi', p: 'Reka SATU aktiviti rumusan berbentuk permainan pantas untuk menutup sesi pembelajaran topik [Tajuk/Topik] bagi murid [Tahun/Tingkatan], mata pelajaran [Mata Pelajaran]. Aktiviti mesti melibatkan seluruh kelas, tidak memerlukan bahan khas, dan boleh disiapkan dalam [Tempoh Masa].' },
  { id: 'B5.6', s: 'Penutup', t: 'Peta Konsep Rumusan Bersama', p: 'Cadangkan cara membina peta konsep rumusan secara bersama-sama dengan murid [Tahun/Tingkatan] pada penghujung sesi topik [Tajuk/Topik]. Nyatakan konsep utama yang perlu muncul dalam peta itu, soalan yang guru boleh tanya untuk mencungkil setiap konsep daripada murid, dan cara mengendalikan jika murid tersasar.' },

  /* C TEMPLAT SOKONGAN PdP */
  { id: 'C1.1', s: 'Sokongan PdP', g: 'RPH', t: 'RPH Lengkap Satu Sesi', p: 'Anda seorang guru [Mata Pelajaran] yang berpengalaman. Bina Rancangan Pengajaran Harian lengkap untuk topik [Tajuk/Topik], murid [Tahun/Tingkatan], tempoh [Tempoh Masa]. Susun dalam bentuk jadual dengan lajur fasa, masa, aktiviti guru, aktiviti murid, dan catatan. Fasa mesti merangkumi set induksi, penyampaian kandungan, aktiviti pengukuhan, pentaksiran dan penutup. Selaraskan keseluruhan RPH dengan Objektif Pembelajaran [Objektif Pembelajaran].' },
  { id: 'C1.2', s: 'Sokongan PdP', g: 'RPH', t: 'Objektif Pembelajaran Boleh Diukur', p: 'Bina tiga Objektif Pembelajaran yang jelas dan boleh diukur untuk topik [Tajuk/Topik] bagi murid [Tahun/Tingkatan]. Setiap objektif mesti menggunakan kata kerja tindakan yang boleh diperhatikan, menyatakan syarat pelaksanaan, dan menyatakan aras pencapaian yang diterima. Nyatakan juga aras Taksonomi Bloom bagi setiap objektif.' },
  { id: 'C1.3', s: 'Sokongan PdP', g: 'RPH', t: 'Penyesuaian RPH Mengikut Kekangan', p: 'Saya mempunyai RPH untuk topik [Tajuk/Topik] tetapi menghadapi kekangan berikut: [nyatakan kekangan, contohnya masa dipendekkan, tiada kemudahan ICT, kelas terlalu ramai, atau murid pelbagai aras]. Cadangkan cara menyesuaikan rancangan pengajaran ini supaya Objektif Pembelajaran [Objektif Pembelajaran] masih tercapai. Berikan tiga pilihan penyesuaian beserta kelebihan dan kekurangan setiap satu.' },
  { id: 'C2.1', s: 'Sokongan PdP', g: 'Pembezaan', t: 'Aktiviti Pemulihan', p: 'Cadangkan SATU aktiviti pemulihan untuk murid [Tahun/Tingkatan] yang masih belum menguasai konsep [Tajuk/Topik] dalam mata pelajaran [Mata Pelajaran]. Aktiviti mesti bermula daripada asas yang paling mudah, menggunakan bahan konkrit atau visual, dan boleh dijalankan dalam kumpulan kecil sambil murid lain membuat aktiviti lain. Sertakan langkah pelaksanaan dan tanda-tanda murid sudah bersedia untuk beralih ke aras seterusnya.' },
  { id: 'C2.2', s: 'Sokongan PdP', g: 'Pembezaan', t: 'Aktiviti Pengayaan', p: 'Cadangkan SATU aktiviti pengayaan untuk murid [Tahun/Tingkatan] yang sudah menguasai konsep [Tajuk/Topik] lebih awal daripada rakan sekelas. Aktiviti mesti mencabar pemikiran aras tinggi, boleh dijalankan secara berdikari tanpa pengawasan guru, dan menghasilkan sesuatu yang boleh dikongsi dengan kelas.' },
  { id: 'C2.3', s: 'Sokongan PdP', g: 'Pembezaan', t: 'Menyokong Murid Berkeperluan Khas', p: 'Cadangkan penyesuaian pengajaran untuk topik [Tajuk/Topik] bagi murid [Tahun/Tingkatan] yang menghadapi [nyatakan keperluan, contohnya kesukaran membaca, kesukaran menumpukan perhatian, atau keperluan sokongan bahasa]. Berikan cadangan penyesuaian dari segi bahan, arahan, aktiviti dan pentaksiran. Pastikan cadangan bersifat praktikal untuk dilaksanakan dalam kelas biasa.' },
  { id: 'C3.1', s: 'Sokongan PdP', g: 'Refleksi', t: 'Refleksi Selepas Mengajar', p: 'Saya baru sahaja mengajar topik [Tajuk/Topik] kepada murid [Tahun/Tingkatan]. Perkara yang berlaku: [terangkan apa yang berjaya dan apa yang tidak menjadi]. Bantu saya membuat refleksi berstruktur dengan menganalisis kemungkinan punca, dan cadangkan tiga penambahbaikan konkrit untuk sesi yang sama pada masa akan datang.' },
  { id: 'C3.2', s: 'Sokongan PdP', g: 'Refleksi', t: 'Menganalisis Jawapan Murid', p: 'Berikut ialah pola jawapan murid [Tahun/Tingkatan] bagi ujian topik [Tajuk/Topik]: [nyatakan pola kesilapan yang anda perhatikan]. Analisis kemungkinan punca kesilapan ini dari sudut kefahaman konsep, dan cadangkan tindakan susulan yang khusus untuk membetulkannya.' },
  { id: 'C3.3', s: 'Sokongan PdP', g: 'Refleksi', t: 'Menambah Baik Aktiviti Sedia Ada', p: 'Berikut ialah aktiviti yang saya gunakan untuk mengajar topik [Tajuk/Topik] kepada murid [Tahun/Tingkatan]: [terangkan aktiviti anda]. Nilaikan aktiviti ini dari sudut penglibatan murid, keselarasan dengan Objektif Pembelajaran, dan aras pemikiran yang dituntut. Kemudian cadangkan penambahbaikan tanpa mengubah struktur asasnya secara menyeluruh.' }
];

/* Kamus Penambah: ayat tambahan untuk hujung mana-mana prompt PdP */
D.KAMUS_PED = [
  { h: 'Menyesuaikan Aras & Bahasa', i: [
    'Gunakan bahasa yang mudah dan ayat pendek, sesuai untuk murid yang masih lemah dalam kemahiran membaca.',
    'Naikkan aras kesukaran supaya menuntut pemikiran analitis, bukan sekadar mengingati fakta.',
    'Hasilkan dalam dwibahasa, dengan versi Bahasa Melayu dan Bahasa Inggeris bersebelahan.',
    'Sesuaikan semua contoh dengan konteks murid luar bandar yang mungkin tidak biasa dengan situasi bandar.'
  ] },
  { h: 'Menambah Kedalaman Pedagogi', i: [
    'Nyatakan aras Taksonomi Bloom bagi setiap soalan atau aktiviti yang dicadangkan.',
    'Sertakan jangkaan respons murid dan cara guru bertindak balas terhadap setiap respons tersebut.',
    'Nyatakan miskonsepsi yang mungkin timbul semasa aktiviti ini dan cara guru menanganinya.',
    'Kaitkan aktiviti ini dengan Kemahiran Abad Ke-21, khususnya [nyatakan kemahiran yang disasarkan].',
    'Sertakan cadangan cara mentaksir pembelajaran murid semasa aktiviti ini sedang berjalan, bukan selepasnya.'
  ] },
  { h: 'Menyesuaikan Bentuk Output', i: [
    'Susun jawapan dalam bentuk jadual dengan lajur yang jelas.',
    'Tulis dalam bentuk skrip pertuturan guru yang boleh dibaca terus semasa mengajar.',
    'Ringkaskan menjadi satu muka surat sahaja supaya boleh dicetak sebagai rujukan pantas.',
    'Sertakan versi untuk murid dan versi untuk guru secara berasingan.',
    'Hasilkan dalam bentuk yang mudah disalin ke dalam borang RPH rasmi sekolah.'
  ] },
  { h: 'Kekangan Praktikal Bilik Darjah', i: [
    'Pastikan aktiviti ini boleh dijalankan tanpa sebarang peralatan ICT atau capaian internet.',
    'Pastikan semua bahan yang diperlukan mudah didapati di sekolah dan tidak memerlukan kos tambahan.',
    'Sesuaikan aktiviti ini untuk kelas seramai [bilangan murid] orang murid dalam bilik darjah yang sempit.',
    'Pastikan keseluruhan aktiviti boleh disiapkan dalam [Tempoh Masa] termasuk masa peralihan.',
    'Cadangkan versi ringkas yang boleh dilaksanakan jika masa terpaksa dipendekkan secara mengejut.'
  ] },
  { h: 'Ketepatan & Kesahan', i: [
    'Berdasarkan sumber yang dimuat naik sahaja, dan nyatakan bahagian mana dalam sumber itu yang menjadi rujukan bagi setiap jawapan.',
    'Selaraskan kandungan dengan Dokumen Standard Kurikulum dan Pentaksiran (DSKP) bagi mata pelajaran ini.',
    'Semak semula ketepatan fakta dalam jawapan anda, dan nyatakan mana-mana bahagian yang anda kurang pasti.'
  ] }
];

/* Prompt Iterasi PdP: guna dalam perbualan yang SAMA */
D.ITER_PED = [
  { h: 'Apabila hasil terlalu umum', i: [
    'Jawapan ini terlalu umum dan boleh digunakan untuk mana-mana topik. Jadikan lebih khusus kepada topik [Tajuk/Topik] dengan menggunakan contoh sebenar yang berkaitan dengan topik itu sahaja.',
    'Berikan contoh konkrit bagi setiap cadangan yang anda buat, supaya saya dapat membayangkan bagaimana ia kelihatan dalam bilik darjah sebenar.'
  ] },
  { h: 'Apabila aras tidak sesuai', i: [
    'Aras ini terlalu tinggi untuk murid saya. Turunkan aras supaya sesuai untuk murid [Tahun/Tingkatan] yang masih memerlukan bimbingan asas, tanpa mengubah objektif pembelajaran.',
    'Aras ini terlalu mudah dan murid saya akan cepat bosan. Tingkatkan cabaran supaya menuntut pemikiran aras tinggi.'
  ] },
  { h: 'Apabila tidak praktikal', i: [
    'Cadangan ini tidak praktikal untuk kelas saya kerana [nyatakan sebab]. Ubah suai supaya boleh dilaksanakan dengan kekangan tersebut.',
    'Aktiviti ini mengambil masa terlalu lama. Padatkan supaya boleh disiapkan dalam [Tempoh Masa] tanpa menjejaskan objektif utamanya.'
  ] },
  { h: 'Apabila mahu pilihan lain', i: [
    'Berikan tiga alternatif lain yang berbeza pendekatan daripada cadangan tadi, supaya saya boleh memilih yang paling sesuai dengan murid saya.',
    'Cadangan tadi baik, tetapi saya mahu versi yang lebih [nyatakan: melibatkan pergerakan / berasaskan perbincangan / berasaskan penulisan / berasaskan visual].'
  ] },
  { h: 'Apabila mahu menyemak kualiti', i: [
    'Nilaikan semula cadangan anda sendiri: adakah ia benar-benar selari dengan Objektif Pembelajaran [Objektif Pembelajaran]? Jika ada bahagian yang tersasar, betulkan.',
    'Semak sama ada aktiviti ini benar-benar menuntut murid berfikir, atau sekadar kelihatan menarik tanpa kedalaman pembelajaran. Jika sekadar menarik, perbaiki.'
  ] }
];

D.SEMAK_PED = [
  'Kandungan telah disemak ketepatannya. AI boleh menjana fakta yang salah dengan penuh yakin, termasuk tarikh, formula dan definisi.',
  'Kandungan selari dengan DSKP dan Objektif Pembelajaran, bukan sekadar menarik atau kreatif.',
  'Aras bahasa dan kesukaran sesuai dengan murid sebenar anda, bukan andaian AI tentang murid pada umumnya.',
  'Contoh dan konteks yang digunakan relevan dengan latar belakang murid anda.',
  'Aktiviti benar-benar boleh dilaksanakan dengan masa, ruang dan bahan yang ada.',
  'Anda sendiri faham sepenuhnya kandungan yang dihasilkan dan boleh menerangkannya tanpa merujuk nota.'
];
D.AMARAN_PED = [
  'AI tidak mengenali murid anda. Ia tidak tahu siapa yang pemalu, siapa yang cepat bosan atau siapa yang memerlukan bimbingan tambahan. Pertimbangan itu kekal tanggungjawab guru.',
  'AI boleh menghasilkan fakta yang salah dengan meyakinkan. Semak setiap fakta, tarikh, formula dan istilah sebelum digunakan, terutamanya bagi mata pelajaran yang menuntut ketepatan.',
  'Jangan masukkan maklumat peribadi murid ke dalam prompt. Elakkan nama penuh, nombor kad pengenalan, keputusan peperiksaan individu, maklumat kesihatan atau butiran keluarga.',
  'AI membantu menjimatkan masa penyediaan, bukan menggantikan pertimbangan profesional guru. Keputusan akhir tentang apa yang sesuai untuk murid anda kekal di tangan anda.'
];
D.PLATFORM = [
  ['ChatGPT, Gemini dan Claude', 'Salin terus prompt selepas mengisi petak [ ]. Anda boleh terus meminta pindaan dalam perbualan yang sama, contohnya "jadikan dalam bentuk jadual" atau "tambah dua contoh lagi".'],
  ['NotebookLM', 'Muat naik dahulu bahan sumber anda, seperti buku teks, DSKP, nota sedia ada atau modul latihan. Kemudian tambah ayat "berdasarkan sumber yang dimuat naik" pada penghujung prompt. Ini pilihan terbaik apabila ketepatan terhadap sukatan pelajaran menjadi keutamaan.'],
  ['Untuk hasil bergambar', 'Gandingkan prompt kandungan dengan prompt gaya visual untuk menukar hasil kepada infografik atau bahan bantu mengajar bergambar.'],
  ['Untuk hasil interaktif', 'Gandingkan hasil prompt PdP dengan templat Bina Web App untuk menukar soalan atau aktiviti kepada kuiz dan permainan digital.']
];

/* =====================================================================
   BINA WEB APP DENGAN GEMINI (formula K-F-A-R-T)
   ===================================================================== */
D.WCAT = ['Aktiviti Murid', 'Pentadbiran & Data', 'Alat Guru'];

D.INDUK = { id: 'A3', ico: 'layers', c: 'Templat Induk', t: 'Templat Induk (Master Blueprint)', w: 'Gunakan templat ini jika tiada templat yang sesuai dalam senarai. Ia boleh disesuaikan untuk apa-apa jenis aplikasi.', p:
'Bina SATU aplikasi web lengkap dalam SATU fail HTML sahaja (HTML, CSS dan JavaScript digabungkan dalam fail yang sama) bertajuk "[Tajuk Aplikasi]".\n\n' +
'KONTEKS\nAplikasi ini digunakan oleh [Pengguna Sasaran] untuk tujuan [Tujuan Aplikasi] dalam konteks [Mata Pelajaran / Unit / Urusan]. Bahasa paparan: [Bahasa].\n\n' +
'FUNGSI UTAMA\n1. [Fungsi pertama]\n2. [Fungsi kedua]\n3. [Fungsi ketiga]\n\n' +
'ALIRAN PENGGUNA\nSkrin 1: [apa yang pengguna lihat dan buat dahulu]\nSkrin 2: [langkah seterusnya]\nSkrin 3: [paparan keputusan / hasil akhir]\nSertakan butang untuk kembali ke skrin sebelumnya dan butang mula semula.\n\n' +
'REKA BENTUK\nTema warna [Warna Pilihan], gaya [profesional / ceria & mesra kanak-kanak / minimalis moden]. Font besar dan mudah dibaca. Reka bentuk responsif (mobile-first) supaya kemas di telefon, tablet dan komputer. Gunakan emoji yang sesuai [ya / tidak].\n\n' +
'KEPERLUAN TEKNIKAL\n- Satu fail HTML sahaja, siap untuk disalin dan dibuka terus dalam pelayar.\n- Gunakan Tailwind CSS melalui CDN untuk paparan. Jangan gunakan framework berat (tiada React, Vue atau Bootstrap).\n- Semua JavaScript inline dalam tag <script>. Tiada panggilan rangkaian luar selain CDN yang dibenarkan.\n- Simpan data dalam localStorage supaya rekod kekal apabila halaman dimuat semula.\n- Susun data utama sebagai array objek di bahagian atas kod, dengan komen jelas, supaya guru mudah menyunting kandungan sendiri kemudian.\n\n' +
'HASIL AKHIR\nBerikan kod HTML penuh yang siap dijalankan. Selepas kod, senaraikan secara ringkas bahagian mana dalam kod yang perlu saya edit jika saya mahu menukar kandungan.' };

D.WEB = [
  { id: 'B1', ico: 'target', c: 'Aktiviti Murid', t: 'Kuiz Interaktif Berskor', w: 'Untuk pentaksiran formatif, ulang kaji, atau aktiviti pengukuhan selepas pengajaran.', p:
'Bina SATU aplikasi web kuiz interaktif dalam SATU fail HTML sahaja, bertajuk "[Tajuk Kuiz]" untuk [Pengguna Sasaran] bagi mata pelajaran [Mata Pelajaran], topik [Topik].\n\n' +
'FUNGSI\n- Skrin permulaan meminta pengguna memasukkan nama dan [kelas / kumpulan]. Kedua-duanya wajib diisi; butang Mula hanya aktif selepas kedua-duanya lengkap.\n- Paparkan arahan permainan ringkas sebelum kuiz bermula.\n- [Bilangan] soalan aneka pilihan, 4 pilihan jawapan setiap soalan, satu jawapan betul sahaja.\n- Soalan dan pilihan jawapan diacak setiap kali halaman dimuat semula.\n- Pemasa [Bilangan saat] saat setiap soalan; apabila baki 5 saat, paparan bertukar kemerahan; jika masa habis, teruskan automatik ke soalan seterusnya.\n- Maklum balas serta-merta: jawapan betul menunjukkan animasi confetti, jawapan salah menunjukkan skrin bergegar ringkas dan memaparkan jawapan yang betul.\n- Bar kemajuan menunjukkan soalan ke berapa daripada jumlah keseluruhan.\n\n' +
'PAPARAN KEPUTUSAN\n- Papar jumlah skor (contoh: "Skor: 7/10") bersama nama dan kelas pengguna.\n- Papar semakan penuh: senarai setiap soalan dengan tanda betul/salah dan jawapan sebenar.\n- Jika skor mencapai [Ambang Lulus] ke atas, papar butang "Jana Sijil".\n- Butang "Cuba Lagi" dan "Kembali ke Menu" pada paparan keputusan.\n\n' +
'REKA BENTUK & TEKNIKAL\nTema warna [Warna Pilihan], ceria dan responsif (mobile-first), font besar, emoji yang sesuai. Gunakan Tailwind CSS melalui CDN. Satu fail HTML sahaja, semua JavaScript inline. Simpan soalan sebagai array objek {soalan, pilihan:[], jawapanBetul} di bahagian atas kod dengan komen, supaya saya mudah menukar soalan kemudian. Simpan rekod percubaan dalam localStorage. Berikan kod HTML penuh yang siap dijalankan.' },

  { id: 'B2', ico: 'puzzle', c: 'Aktiviti Murid', t: 'Permainan Padanan (Drag-and-Drop)', w: 'Untuk mengukuhkan hubungan antara dua perkara: istilah dengan maksud, gambar dengan nama, soalan dengan jawapan, sebab dengan kesan.', p:
'Bina SATU permainan drag-and-drop dalam SATU fail HTML sahaja bertajuk "[Tajuk Permainan]" untuk [Pengguna Sasaran], mata pelajaran [Mata Pelajaran], topik [Topik].\n\n' +
'FUNGSI & ALIRAN\n- Terdapat [Bilangan] pasangan item yang perlu dipadankan, iaitu [Item A: contoh emoji/gambar/istilah] di baris atas dan [Item B: contoh perkataan/maksud] di baris bawah.\n- Di bawah setiap item baris atas terdapat petak kosong. Pemain menyeret item dari baris bawah ke petak yang betul.\n- Saiz petak mesti muat dengan teks di dalamnya; pastikan susun atur kemas dan tidak bertindih.\n- Padanan betul: petak bertukar hijau, muncul animasi confetti, dan dipaparkan satu fakta menarik berkaitan item tersebut di bahagian bawah skrin.\n- Padanan salah: item kembali ke tempat asal dengan animasi lembut dan mesej "Cuba lagi!".\n- Papar kiraan padanan berjaya (contoh: "3/5 selesai") secara langsung.\n- Apabila semua padanan selesai, papar mesej tahniah, jumlah percubaan yang digunakan, dan butang "Main Semula" yang mengacak semula kedudukan item.\n\n' +
'REKA BENTUK & TEKNIKAL\nPaparan [ceria dan mesra kanak-kanak / profesional], tema warna [Warna Pilihan], font besar, emoji yang sesuai. Pastikan seretan berfungsi pada skrin sentuh (telefon dan tablet), bukan tetikus sahaja. Satu fail HTML sahaja dengan CSS dan JavaScript inline. Simpan senarai pasangan sebagai array objek di bahagian atas kod dengan komen supaya mudah disunting. Berikan kod HTML penuh yang siap dijalankan.' },

  { id: 'B3', ico: 'doc', c: 'Aktiviti Murid', t: 'Lembaran Kerja Interaktif + Sijil', w: 'Menggantikan lembaran kerja bercetak dengan versi digital yang menyemak jawapan sendiri dan menjana sijil pencapaian.', p:
'Bina SATU lembaran kerja interaktif dalam SATU fail HTML sahaja bertajuk "[Tajuk Lembaran Kerja]" untuk [Pengguna Sasaran], mata pelajaran [Mata Pelajaran], topik [Topik]. Bahasa paparan: [Bahasa].\n\n' +
'KANDUNGAN\n- Fokus kandungan pada subtopik berikut: [Senaraikan 3-5 subtopik].\n- [Bilangan] soalan, gabungan jenis: aneka pilihan, isi tempat kosong, dan betul/salah.\n- Aras soalan sesuai dengan [Tahun/Tingkatan] dan selari dengan objektif pembelajaran [Objektif Pembelajaran].\n\n' +
'ALIRAN\n1. Bahagian atas: medan nama dan kelas (kedua-duanya wajib) dengan pengesahan sebelum boleh menghantar.\n2. Pengguna menjawab semua soalan, kemudian klik butang "Semak Jawapan".\n3. Papar tanda betul atau salah bagi setiap soalan, jawapan sebenar bagi item yang salah, dan jumlah markah bersama nama dan kelas.\n4. Jika markah mencapai [Ambang Lulus] ke atas, papar butang "Jana Sijil".\n5. Sijil yang dijana memaparkan nama, kelas, tajuk lembaran kerja, markah dan tarikh semasa dalam format "DD Bulan YYYY", dihias kemas dan profesional.\n6. Pada sijil, sediakan butang "Cetak / Muat Turun PDF" yang memanggil window.print(), dengan gaya @media print supaya hanya sijil dicetak pada satu halaman penuh.\n\n' +
'REKA BENTUK & TEKNIKAL\nTema warna [Warna Pilihan], reka bentuk kemas dan responsif, emoji yang sesuai. Gunakan Tailwind CSS melalui CDN sahaja; tiada pustaka lain. Satu fail HTML, JavaScript inline, soalan disimpan sebagai array objek yang mudah disunting. Sertakan label borang yang jelas dan atribut aria-live untuk maklum balas, demi kebolehcapaian. Berikan kod HTML penuh yang siap dijalankan.' },

  { id: 'B4', ico: 'cards', c: 'Aktiviti Murid', t: 'Kad Imbas & Alat Hafalan', w: 'Untuk hafalan istilah, kosa kata, peribahasa, tarikh penting atau definisi. Sesuai untuk ulang kaji kendiri murid.', p:
'Bina SATU aplikasi kad imbas (flashcard) dalam SATU fail HTML sahaja bertajuk "[Tajuk Set Kad]" untuk [Pengguna Sasaran], mata pelajaran [Mata Pelajaran], topik [Topik].\n\n' +
'FUNGSI\n- [Bilangan] kad. Bahagian hadapan kad memaparkan [Item Hadapan: istilah/soalan/perkataan], bahagian belakang memaparkan [Item Belakang: maksud/jawapan/contoh ayat].\n- Klik pada kad untuk membalikkannya dengan animasi flip 3D yang lancar.\n- Butang "Seterusnya" dan "Sebelumnya" untuk menavigasi kad, serta butang "Acak" untuk menyusun semula kad secara rawak.\n- Selepas membalikkan kad, pengguna menandakan sama ada dia "Sudah Tahu" atau "Perlu Ulang". Kad yang ditanda "Perlu Ulang" akan muncul semula pada pusingan berikutnya.\n- Papar kemajuan: berapa kad sudah dikuasai daripada jumlah keseluruhan, dalam bentuk bar kemajuan.\n- Apabila semua kad dikuasai, papar mesej tahniah dan butang mula semula.\n\n' +
'REKA BENTUK & TEKNIKAL\nTema warna [Warna Pilihan], reka bentuk bersih dengan satu kad besar di tengah skrin, responsif untuk telefon. Gunakan Tailwind CSS melalui CDN. Satu fail HTML dengan JavaScript inline. Simpan kemajuan pengguna dalam localStorage supaya kekal walaupun halaman ditutup. Letakkan senarai kad sebagai array objek di bahagian atas kod dengan komen jelas untuk memudahkan suntingan. Berikan kod HTML penuh yang siap dijalankan.' },

  { id: 'B5', ico: 'flask', c: 'Aktiviti Murid', t: 'Simulasi & Penerokaan Konsep', w: 'Untuk konsep yang sukar dibayangkan. Murid boleh mengubah nilai dan melihat kesannya secara langsung.', p:
'Bina SATU simulasi interaktif dalam SATU fail HTML sahaja bertajuk "[Tajuk Simulasi]" untuk membantu [Pengguna Sasaran] memahami konsep [Konsep yang Diajar] dalam mata pelajaran [Mata Pelajaran].\n\n' +
'FUNGSI\n- Sediakan kawalan (slider dan/atau kotak input) untuk pengguna mengubah pemboleh ubah berikut: [Senaraikan pemboleh ubah dan julat nilainya].\n- Apabila nilai diubah, paparan visual (rajah, graf atau animasi) mesti dikemas kini serta-merta tanpa perlu memuat semula halaman.\n- Papar nilai semasa setiap pemboleh ubah dengan jelas berserta unitnya.\n- Sertakan panel penerangan ringkas di tepi yang menerangkan apa yang sedang berlaku dalam bahasa mudah yang sesuai untuk [Tahun/Tingkatan].\n- Sediakan 3 butang pratetap senario (contoh: keadaan rendah, sederhana, tinggi) supaya guru boleh menunjukkan perbandingan dengan pantas semasa mengajar.\n- Di bawah simulasi, sertakan 3 soalan penerokaan yang menggalakkan murid membuat ramalan sebelum mencuba.\n\n' +
'REKA BENTUK & TEKNIKAL\nTema warna [Warna Pilihan], paparan bersih dengan visual sebagai fokus utama, responsif. Gunakan Tailwind CSS melalui CDN, dan Chart.js melalui CDN jika graf diperlukan. Satu fail HTML dengan JavaScript inline. Pastikan pengiraan yang digunakan tepat dari segi konsep dan sertakan komen dalam kod yang menerangkan formula yang digunakan. Berikan kod HTML penuh yang siap dijalankan.' },

  { id: 'B6', ico: 'grid', c: 'Aktiviti Murid', t: 'Portal Hab Pelbagai Aktiviti', w: 'Apabila anda mahu menggabungkan beberapa kuiz atau aktiviti dalam satu pautan sahaja, dengan menu utama di hadapan.', p:
'Bina SATU portal aplikasi web dalam SATU fail HTML sahaja bertajuk "[Tajuk Portal]" untuk [Pengguna Sasaran], mata pelajaran [Mata Pelajaran].\n\n' +
'HALAMAN UTAMA\n- Papar nama [Organisasi/Sekolah/Kelas] di bahagian atas dengan huruf besar dan tebal, diikuti tajuk utama portal di bawahnya.\n- Papar [Bilangan subtopik] butang berbentuk kapsul bulat, satu bagi setiap subtopik berikut: [Senaraikan subtopik]. Setiap butang mempunyai emoji unik yang relevan dan disusun kemas dalam grid.\n\n' +
'ALIRAN AKTIVITI\n- Apabila mana-mana butang diklik, minta pengguna memasukkan nama dan [kelas / kumpulan]. Kedua-duanya wajib; jangan benarkan aktiviti bermula sehingga lengkap.\n- Setiap aktiviti mengandungi [Bilangan] soalan aneka pilihan dengan 4 pilihan jawapan, pada aras yang sesuai untuk [Tahun/Tingkatan].\n- Di akhir setiap aktiviti, papar Slip Keputusan yang mengandungi nama, kelas, tajuk aktiviti, skor dan status lulus atau gagal, dihias dalam gaya kad profesional dengan confetti ringkas jika lulus.\n- Pada slip, sediakan butang "Main Lagi" dan "Kembali ke Menu".\n\n' +
'REKA BENTUK & TEKNIKAL\nGaya [ceria dan mesra kanak-kanak / profesional], warna [Warna Pilihan], butang comel dengan bayang lembut, font besar, responsif mobile-first. Gunakan Tailwind CSS melalui CDN. Satu fail HTML dengan JavaScript inline. Simpan setiap percubaan dalam localStorage sebagai rekod. Susun semua soalan bagi semua aktiviti dalam satu objek data di bahagian atas kod supaya mudah ditambah atau disunting. Berikan kod HTML penuh yang siap dijalankan.' },

  { id: 'B7', ico: 'form', c: 'Pentadbiran & Data', t: 'Sistem Borang & Pengumpulan Data', w: 'Untuk urusan pentadbiran: borang kehadiran, permohonan, tempahan, maklum balas, pendaftaran aktiviti dan laporan program.', note: 'Jika anda mahu data dikongsi merentas peranti (bukan hanya pada komputer yang sama), tambah ayat: "Gunakan Firebase Firestore untuk penyimpanan data supaya rekod boleh diakses di pelbagai peranti; sertakan arahan langkah demi langkah cara saya menyediakan projek Firebase dan menampal konfigurasi saya ke dalam kod."', p:
'Bina SATU aplikasi web sistem borang dalam SATU fail HTML sahaja bertajuk "[Tajuk Sistem]" untuk kegunaan [Pengguna Sasaran] bagi tujuan [Tujuan Sistem].\n\n' +
'BORANG UTAMA (HALAMAN HADAPAN)\nBorang mengandungi medan berikut:\n- [Medan 1 — nyatakan jenis: teks / dropdown dengan pilihan / tarikh / nombor]\n- [Medan 2 — nyatakan jenis dan pilihan jika dropdown]\n- [Medan 3 — nyatakan jenis]\n- Sediakan butang tambah (+) bagi medan yang boleh diisi berulang kali, jika berkenaan.\n- Semua medan wajib disahkan sebelum boleh dihantar; papar mesej ralat yang jelas jika tidak lengkap.\n- Selepas berjaya dihantar, papar mesej pengesahan berserta ringkasan maklumat yang dihantar dan cap masa.\n\n' +
'PANEL ADMIN\n- Sediakan butang "Admin" di bahagian [atas kiri / atas kanan] paparan, jelas kelihatan tetapi tidak mengganggu.\n- Apabila diklik, papar modal log masuk. Gunakan kata laluan mudah untuk demo sahaja: pengguna [nama pengguna], kata laluan [kata laluan]. Jika salah, papar mesej ralat.\n- Selepas log masuk berjaya, papar jadual semua rekod dengan lajur: [Senaraikan lajur yang dikehendaki] dan cap masa.\n- Sediakan penapis mengikut [tarikh / kategori / status] dan kotak carian.\n- Sediakan butang "Muat Turun CSV" untuk mengeksport semua rekod, dan butang "Padam Rekod" bagi setiap baris dengan pengesahan dahulu.\n\n' +
'REKA BENTUK & TEKNIKAL\nPaparan moden, minimalis dan profesional dengan tema warna [Warna Pilihan]. Gunakan Tailwind CSS melalui CDN sahaja; jangan gunakan framework berat. Satu fail HTML dengan JavaScript inline. Simpan semua data dalam localStorage. Berikan kod HTML penuh yang siap dijalankan.' },

  { id: 'B8', ico: 'chart', c: 'Pentadbiran & Data', t: 'Panel Admin & Papan Pemuka Analitik', w: 'Untuk memaparkan data yang telah dikumpul dalam bentuk metrik, jadual dan graf bagi memudahkan pemantauan dan pelaporan.', p:
'Bina SATU papan pemuka analitik dalam SATU fail HTML sahaja bertajuk "[Tajuk Papan Pemuka]" untuk [Pengguna Sasaran] bagi memantau [Perkara yang Dipantau].\n\n' +
'KAWALAN AKSES\nLindungi paparan dengan modal log masuk mudah untuk demo: pengguna [nama pengguna], kata laluan [kata laluan].\n\n' +
'KANDUNGAN PAPAN PEMUKA\n1. Empat kad metrik ringkasan di bahagian atas yang memaparkan: [Metrik 1], [Metrik 2], [Metrik 3], [Metrik 4].\n2. Jadual rekod penuh dengan lajur: [Senaraikan lajur]. Jadual boleh diisih dengan klik pada tajuk lajur dan mempunyai kotak carian.\n3. Dua graf menggunakan Chart.js melalui CDN, setiap satu pada kanvas berasingan dengan label jelas dan responsif:\n   - Graf [bar / garis] menunjukkan [Data untuk Graf 1].\n   - Graf [bar / pai] menunjukkan [Data untuk Graf 2].\n4. Butang "Jana Analisis" di bawah jadual. Apabila diklik, papar perenggan analisis automatik (lebih kurang 300 patah perkataan dalam [Bahasa]) yang dijana berdasarkan data semasa, meliputi: corak yang paling ketara, item berprestasi tertinggi dan terendah, item yang paling jarang muncul, serta cadangan tindakan susulan.\n5. Butang "Muat Turun CSV" dan butang "Cetak Laporan" dengan gaya @media print yang kemas.\n\n' +
'REKA BENTUK & TEKNIKAL\nPaparan profesional bergaya papan pemuka korporat dengan tema warna [Warna Pilihan], susun atur grid yang kemas dan responsif. Gunakan Tailwind CSS dan Chart.js melalui CDN sahaja. Satu fail HTML dengan JavaScript inline. Baca data daripada localStorage; jika tiada data, jana data contoh secara automatik supaya paparan boleh diuji. Berikan kod HTML penuh yang siap dijalankan.' },

  { id: 'B9', ico: 'chat', c: 'Pentadbiran & Data', t: 'Chatbot FAQ Berasaskan Sumber', w: 'Untuk menjawab soalan berulang tentang prosedur, peraturan atau maklumat unit, supaya beban menjawab soalan yang sama berkurangan.', p:
'Bina SATU chatbot dalam SATU fail HTML sahaja bertajuk "[Nama Chatbot]". Peranan chatbot ialah menjawab soalan [Pengguna Sasaran] tentang [Skop Maklumat] secara ringkas, tepat dan mesra, berdasarkan senarai soalan lazim yang saya berikan di bawah.\n\n' +
'SUMBER JAWAPAN\nGunakan HANYA maklumat berikut sebagai sumber jawapan. Jika soalan pengguna di luar skop ini, chatbot mesti menjawab dengan sopan bahawa maklumat itu tiada dalam pangkalan datanya dan mencadangkan pengguna merujuk [Rujukan Alternatif].\n[Tampal senarai soalan dan jawapan anda di sini]\n\n' +
'STRUKTUR PAPARAN\n- Header: nama chatbot dan satu baris subteks penerangan ringkas.\n- Panel kiri: senarai soalan lazim yang boleh diklik terus.\n- Panel kanan: tetingkap chat yang memaparkan sejarah perbualan.\n- Setiap jawapan chatbot didahului ikon atau emoji sebagai profil chatbot.\n- Kotak input di bawah tetingkap chat supaya pengguna boleh menaip soalan sendiri; padankan soalan yang ditaip dengan soalan lazim yang paling hampir menggunakan padanan kata kunci.\n- Footer kecil: notis sumber maklumat.\n- Pada telefon, panel kiri bertukar menjadi menu boleh buka-tutup.\n\n' +
'REKA BENTUK & TEKNIKAL\nTema warna [Warna Pilihan] dengan gaya perbualan seperti aplikasi pemesejan biasa (gelembung mesej berlainan warna bagi pengguna dan chatbot). Gunakan Tailwind CSS melalui CDN. Satu fail HTML dengan CSS dan JavaScript inline. Simpan data soalan-jawapan sebagai array objek di bahagian atas kod dengan komen supaya saya mudah menambah soalan baharu. Berikan kod HTML penuh yang siap dijalankan.' },

  { id: 'B10', ico: 'book', c: 'Pentadbiran & Data', t: 'Rak Maya / Portal Sumber Digital', w: 'Untuk mengumpulkan bahan bacaan, video, nota atau pautan dalam satu portal yang kemas, dengan rekod siapa yang mengaksesnya.', p:
'Bina SATU portal sumber digital dalam SATU fail HTML sahaja bertajuk "[Tajuk Portal]" untuk [Pengguna Sasaran].\n\n' +
'KANDUNGAN PORTAL\n- Papar koleksi sumber dalam bentuk grid kad. Setiap kad memaparkan tajuk, kategori, ikon atau emoji, dan penerangan ringkas satu baris.\n- Senarai sumber dan pautannya: [Senaraikan tajuk dan pautan setiap sumber].\n- Sediakan kotak carian dan penapis mengikut kategori di bahagian atas.\n\n' +
'MEKANISME AKSES\n- Apabila mana-mana sumber diklik, pengguna mesti memasukkan nama dan [kelas / unit] terlebih dahulu. Selagi tidak diisi, sumber tidak boleh dibuka.\n- Selepas maklumat sah, buka pautan sumber tersebut dalam tab baharu dan rekodkan capaian itu.\n\n' +
'PANEL ADMIN\n- Butang "Admin" di [atas kiri / atas kanan] paparan. Apabila diklik, papar modal log masuk: pengguna [nama pengguna], kata laluan [kata laluan].\n- Paparan admin menunjukkan jadual rekod capaian dengan lajur nama, kelas, tajuk sumber dan cap masa.\n- Sediakan penapis mengikut hari, minggu dan bulan, serta butang muat turun CSV.\n\n' +
'REKA BENTUK & TEKNIKAL\nTema warna [Warna Pilihan], paparan kemas seperti rak buku digital dengan bayang lembut pada kad, responsif. Gunakan Tailwind CSS melalui CDN. Satu fail HTML dengan JavaScript inline. Simpan rekod dalam localStorage. Letakkan senarai sumber sebagai array objek di bahagian atas kod supaya mudah ditambah. Berikan kod HTML penuh yang siap dijalankan.' },

  { id: 'B11', ico: 'award', c: 'Alat Guru', t: 'Penjana Dokumen (Sijil, Slip, Laporan)', w: 'Untuk menjana sijil penyertaan, slip keputusan, resit atau surat pengesahan secara automatik dan boleh dicetak.', p:
'Bina SATU penjana dokumen dalam SATU fail HTML sahaja bertajuk "[Tajuk Penjana]" untuk menghasilkan [Jenis Dokumen: sijil / slip keputusan / resit / surat pengesahan].\n\n' +
'FUNGSI\n- Borang input di bahagian atas dengan medan berikut: [Senaraikan medan, contoh: nama penerima, jawatan/kelas, tajuk program, tarikh, catatan].\n- Sediakan pilihan untuk memasukkan beberapa nama sekali gus (satu nama setiap baris) supaya boleh menjana dokumen secara pukal.\n- Apabila butang "Jana" diklik, papar pratonton dokumen yang telah dilengkapkan secara langsung.\n\n' +
'REKA BENTUK DOKUMEN\n- Susun atur [landskap / potret] bersaiz A4, dengan sempadan hias, ruang untuk logo (gunakan placeholder yang boleh saya gantikan), tajuk besar, nama penerima yang menonjol, butiran program, tarikh, dan dua ruang tandatangan di bawah.\n- Tema warna [Warna Pilihan] dengan gaya [rasmi dan profesional / ceria].\n\n' +
'CETAKAN\n- Butang "Cetak / Muat Turun PDF" yang memanggil window.print().\n- Gaya @media print yang menyembunyikan borang input dan butang, serta mencetak hanya dokumen pada satu halaman penuh dengan margin yang betul.\n- Jika menjana secara pukal, setiap dokumen bermula pada halaman baharu semasa dicetak.\n\n' +
'TEKNIKAL\nGunakan Tailwind CSS melalui CDN. Satu fail HTML dengan JavaScript inline. Jangan gunakan pustaka PDF yang berat; bergantung pada fungsi cetak pelayar sahaja. Berikan kod HTML penuh yang siap dijalankan.' },

  { id: 'B12', ico: 'calc', c: 'Alat Guru', t: 'Alat Bantu Guru (Kalkulator & Penjana Rawak)', w: 'Alat kecil yang menjimatkan masa harian: pengiraan markah, pemilih nama rawak, pembahagi kumpulan, pemasa aktiviti dan penjana soalan rawak.', p:
'Bina SATU alat bantu dalam SATU fail HTML sahaja bertajuk "[Tajuk Alat]" untuk membantu [Pengguna Sasaran] melaksanakan tugas [Tugas yang Dipermudah].\n\n' +
'FUNGSI\n- Input: pengguna memasukkan [Jenis Input, contoh: senarai nama satu per baris / markah / bilangan kumpulan].\n- Proses: apabila butang [Nama Butang] diklik, sistem akan [Terangkan apa yang perlu berlaku secara terperinci].\n- Output: papar hasil dengan jelas dalam bentuk [kad / jadual / senarai bernombor], dengan animasi ringkas semasa hasil dipaparkan.\n- Sediakan butang "Salin Hasil" yang menyalin output ke papan keratan, dan butang "Set Semula".\n- Simpan input terakhir dalam localStorage supaya pengguna tidak perlu menaip semula setiap kali.\n\n' +
'REKA BENTUK & TEKNIKAL\nPaparan ringkas, bersih dan pantas digunakan, dengan semua fungsi utama pada satu skrin tanpa perlu banyak menatal. Tema warna [Warna Pilihan], font besar supaya boleh dilihat dari belakang kelas jika dipaparkan pada skrin. Responsif untuk telefon. Gunakan Tailwind CSS melalui CDN. Satu fail HTML dengan JavaScript inline. Berikan kod HTML penuh yang siap dijalankan.' }
];

/* Kamus Ciri: ayat tambahan untuk hujung mana-mana prompt Web App */
D.KAMUS_WEB = [
  { h: 'Pengenalan Pengguna & Rekod', i: [
    'Sebelum aktiviti bermula, minta pengguna memasukkan nama dan kelas. Kedua-duanya wajib; sahkan sebelum membenarkan pengguna meneruskan.',
    'Simpan setiap penghantaran dalam localStorage sebagai rekod, lengkap dengan cap masa.',
    'Simpan nama dan kelas yang terakhir dimasukkan supaya medan itu diisi secara automatik apabila halaman dibuka semula.'
  ] },
  { h: 'Masa & Cabaran', i: [
    'Tambah pemasa [Bilangan saat] saat bagi setiap soalan; apabila baki 5 saat, tukarkan warna paparan menjadi kemerahan; jika masa habis, teruskan automatik ke soalan seterusnya.',
    'Tambah pemasa keseluruhan yang merekod jumlah masa yang diambil, dan paparkannya pada skrin keputusan.',
    'Tambah sistem nyawa: pengguna mempunyai 3 percubaan; permainan tamat apabila kesemuanya habis.'
  ] },
  { h: 'Maklum Balas & Motivasi', i: [
    'Apabila jawapan betul, papar animasi confetti dan kesan cahaya bersinar; apabila salah, gegarkan skrin secara ringkas dan papar jawapan yang betul.',
    'Tambah bar kemajuan di bahagian atas yang menunjukkan soalan ke berapa daripada jumlah keseluruhan.',
    'Tambah sistem lencana: berikan lencana berbeza mengikut pencapaian (contoh: Cemerlang, Baik, Perlu Ulang Kaji) pada skrin keputusan.',
    'Selepas setiap jawapan salah, papar penjelasan ringkas satu atau dua ayat mengapa jawapan itu salah.'
  ] },
  { h: 'Papan Kedudukan & Perbandingan', i: [
    'Tambah papan kedudukan (leaderboard) yang memaparkan nama, kelas dan skor tertinggi, disusun dari skor tertinggi ke terendah. Papan ini boleh dilihat pada bila-bila masa melalui satu butang khas.',
    'Hadkan papan kedudukan kepada 10 kedudukan teratas sahaja dan serlahkan kedudukan pengguna semasa.'
  ] },
  { h: 'Panel Admin & Data', i: [
    'Tambah butang "Admin" di penjuru [atas kanan / atas kiri] paparan. Apabila diklik, papar modal log masuk dengan pengguna [nama pengguna] dan kata laluan [kata laluan]. Jika salah, papar mesej ralat.',
    'Dalam panel admin, papar jadual semua rekod yang boleh diisih, ditapis mengikut tarikh, dan dicari.',
    'Tambah butang "Muat Turun CSV" dalam panel admin untuk mengeksport semua rekod.',
    'Tambah butang "Padam Semua Data" dalam panel admin, dengan dialog pengesahan sebelum data dipadam.'
  ] },
  { h: 'Cetakan & Dokumen', i: [
    'Tambah butang "Jana Sijil" yang muncul hanya apabila skor mencapai [Ambang Lulus] ke atas. Sijil memaparkan nama, kelas, tajuk, skor dan tarikh semasa.',
    'Tambah butang "Cetak / Muat Turun PDF" yang memanggil window.print(), dengan gaya @media print supaya hanya bahagian dokumen dicetak pada satu halaman penuh.'
  ] },
  { h: 'Visual & Bahasa', i: [
    'Tambah butang tukar bahasa yang menukar seluruh paparan antara Bahasa Melayu dan Bahasa Inggeris tanpa memuat semula halaman.',
    'Tambah mod gelap (dark mode) yang boleh ditogol dan pilihan pengguna disimpan.',
    'Tambah butang untuk membesarkan atau mengecilkan saiz fon seluruh paparan.',
    'Tambah kesan bunyi ringkas untuk jawapan betul dan salah menggunakan Web Audio API, dengan butang untuk mematikan bunyi.'
  ] },
  { h: 'Kandungan Media', i: [
    'Sertakan gambar pada setiap soalan menggunakan pautan berikut: [Senaraikan pautan gambar]. Pastikan gambar dipaparkan kemas dan tidak melebihi lebar skrin.',
    'Benamkan (embed) kandungan daripada pautan berikut ke dalam aplikasi menggunakan iframe yang responsif: [Pautan].',
    'Tambah fungsi teks-ke-pertuturan menggunakan SpeechSynthesis API supaya soalan boleh dibacakan apabila ikon pembesar suara diklik.'
  ] },
  { h: 'Kebolehcapaian', i: [
    'Pastikan aplikasi boleh digunakan sepenuhnya dengan papan kekunci sahaja, dengan penunjuk fokus yang jelas kelihatan.',
    'Gunakan atribut aria-live untuk mesej maklum balas dan label yang jelas pada setiap medan borang.',
    'Pastikan kontras warna mencukupi untuk dibaca dengan selesa, termasuk oleh pengguna yang mengalami masalah penglihatan warna.'
  ] }
];

/* Prompt Iterasi Web App: guna dalam perbualan Gemini yang SAMA */
D.ITER_WEB = [
  { h: 'Apabila ada ralat atau tidak berfungsi', i: [
    'Aplikasi ini tidak berfungsi seperti yang dijangka. Masalahnya: [terangkan apa yang berlaku berbanding apa yang sepatutnya berlaku]. Kenal pasti punca masalah, betulkan, dan berikan semula kod HTML penuh yang telah dibetulkan.',
    'Butang [nama butang] tidak memberikan sebarang tindak balas apabila diklik. Semak fungsi yang berkaitan dengannya dan betulkan.',
    'Paparan bertindih dan tidak kemas apabila dilihat pada telefon. Perbaiki susun atur supaya responsif sepenuhnya pada skrin kecil tanpa mengubah fungsi sedia ada.'
  ] },
  { h: 'Apabila mahu menambah ciri', i: [
    'Kekalkan semua fungsi sedia ada tanpa sebarang perubahan, dan tambah ciri berikut: [terangkan ciri baharu]. Berikan semula kod HTML penuh.',
    'Tambah [bilangan] soalan lagi pada aras yang lebih mencabar, dengan mengekalkan format data yang sedia ada.'
  ] },
  { h: 'Apabila mahu memperbaiki rupa', i: [
    'Kekalkan semua fungsi, tetapi tukarkan tema warna kepada [warna baharu] dan jadikan reka bentuk lebih [profesional / ceria / minimalis].',
    'Besarkan saiz fon dan butang supaya lebih mudah digunakan oleh [murid tahap 1 / pengguna warga emas / paparan pada skrin besar di hadapan kelas].',
    'Susunan elemen sekarang terlalu padat. Tambah ruang yang selesa antara elemen dan susun semula supaya lebih mudah dibaca.'
  ] },
  { h: 'Apabila mahu memudahkan penyelenggaraan', i: [
    'Susun semula kod supaya semua kandungan yang mungkin saya tukar (soalan, senarai item, teks paparan) diletakkan dalam satu bahagian di bahagian atas kod, dengan komen yang jelas dalam Bahasa Melayu menerangkan cara menyuntingnya.',
    'Terangkan kepada saya secara ringkas dan dalam bahasa mudah, bahagian mana dalam kod ini yang perlu saya ubah jika saya mahu menukar [perkara yang hendak ditukar].'
  ] },
  { h: 'Apabila sudah siap dan mahu diedarkan', i: [
    'Berikan saya panduan langkah demi langkah cara memuat naik fail HTML ini supaya boleh dikongsi dengan orang lain melalui satu pautan, menggunakan kaedah percuma yang paling mudah.',
    'Semak semula keseluruhan kod ini dan senaraikan sebarang masalah yang mungkin timbul apabila digunakan oleh ramai pengguna serentak, berserta cadangan penyelesaian.'
  ] }
];

D.SEMAK_WEB = [
  'Aplikasi telah diuji sendiri dari mula hingga tamat, termasuk keadaan apabila pengguna tidak mengisi borang atau menjawab semua soalan dengan salah.',
  'Semua kandungan akademik (soalan, jawapan dan fakta) telah disemak ketepatannya. AI boleh menjana maklumat yang salah dengan yakin.',
  'Aras kesukaran dan bahasa sesuai dengan tahap murid sebenar, bukan sekadar andaian AI.',
  'Aplikasi telah dicuba pada telefon, bukan hanya pada komputer.',
  'Kandungan selari dengan objektif pembelajaran dan DSKP, bukan sekadar menarik dari segi visual.',
  'Jika aplikasi menyimpan data, anda faham di mana data itu disimpan dan siapa yang boleh mengaksesnya.'
];
D.AMARAN_WEB = [
  'Jangan simpan maklumat sensitif murid (nombor kad pengenalan, alamat rumah, nombor telefon peribadi, maklumat kesihatan atau kewangan) dalam aplikasi yang dijana dengan cara ini.',
  'Gunakan nama pertama atau nombor rujukan sahaja jika boleh.',
  'Data yang disimpan dalam localStorage kekal pada peranti dan pelayar yang sama sahaja; ia akan hilang jika cache dipadam.',
  'Jika sistem akan digunakan secara rasmi dan berterusan, rujuk pentadbir sekolah dan pegawai ICT terlebih dahulu, serta patuhi garis panduan perlindungan data yang berkuat kuasa.'
];
D.TABIAT = [
  ['Terperinci mengalahkan ringkas', 'Jangan tulis "buatkan kuiz" sahaja. Nyatakan bilangan soalan, aras, aliran skrin, warna dan format data.'],
  ['Bina berperingkat', 'Mulakan dengan versi paling asas yang berfungsi, kemudian tambah satu ciri pada satu masa. Meminta 15 ciri sekali gus meningkatkan risiko ralat.'],
  ['Jangan mula semula', 'Kekal dalam perbualan yang sama supaya AI mengingati konteks. Chat baharu bermakna bermula dari kosong semula.']
];

/* =====================================================================
   LOGIK APLIKASI
   ===================================================================== */
(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var esc=function(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
var store={get:function(k){try{return localStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
document.documentElement.lang='ms';
var TITLE='Bengkel AI Guru · JPN Melaka 2026';

/* ---------- ikon ---------- */
var P={
home:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
bulb:'<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"/>',
code:'<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>',
wand:'<path d="M15 4V2M15 10V8M11 6h2M17 6h2"/><path d="M3 21l12-12"/>',
send:'<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>',
qr:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM18 18h3v3h-3z"/>',
screen:'<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
copy:'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
ext:'<path d="M14 3h7v7"/><path d="M21 3l-9 9"/><path d="M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/>',
check:'<path d="M20 6L9 17l-5-5"/>',
right:'<path d="M5 12h14M13 5l7 7-7 7"/>',
left:'<path d="M19 12H5M11 5l-7 7 7 7"/>',
clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
pin:'<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
x:'<path d="M18 6L6 18M6 6l12 12"/>',
down:'<path d="M6 9l6 6 6-6"/>',
login:'<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="M10 17l5-5-5-5M15 12H3"/>',
shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
list:'<path d="M9 6h12M9 12h12M9 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
alert:'<path d="M12 3l10 18H2z"/><path d="M12 10v4M12 18h.01"/>',
refresh:'<path d="M3 12a9 9 0 0 1 15.5-6.3L21 8M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.5 6.3L3 16M3 21v-5h5"/>',
star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
checkc:'<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.5L16 9.5"/>',
layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
puzzle:'<path d="M9 3h6v3a2 2 0 1 0 4 0V3h2v6h-3a2 2 0 1 0 0 4h3v8h-6v-3a2 2 0 1 0-4 0v3H3v-8h3a2 2 0 1 0 0-4H3V3z"/>',
doc:'<path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h8M9 17h6"/>',
cards:'<rect x="7" y="3" width="13" height="16" rx="2"/><path d="M4 7v12a2 2 0 0 0 2 2h10"/>',
flask:'<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7 15h10"/>',
grid:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
form:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v3h6V3M9 11h6M9 15h4"/>',
chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
chat:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
book:'<path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-4a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h5z"/>',
award:'<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>',
users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17.5" cy="9" r="2.8"/><path d="M17 14.2a5.5 5.5 0 0 1 4.5 5.3"/>',
calc:'<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8v4H8zM8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>'
};
function ic(n,s){s=s||22;return '<svg class="ic" width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+P[n]+'</svg>'}
function logo(k){return '<img class="lg" src="'+D.TOOLS[k].logo+'" alt="" width="128" height="128">'}
function toolBtn(k){var t=D.TOOLS[k];return '<a class="btn btn-white" href="'+t.url+'" target="_blank" rel="noopener">'+logo(k)+' Buka '+t.name+'</a>'}

/* ---------- navigasi ---------- */
var ORDER=['utama','pedagogi','webapp','pembina','hantar'];
var LABEL={utama:'Utama',pedagogi:'Pedagogi Gen AI',webapp:'Bina Web App',pembina:'Pembina Prompt',hantar:'Hantar Hasil'};
var TABS=[['utama','home','Utama'],['pedagogi','bulb','Pedagogi'],['webapp','code','Web App'],['pembina','wand','Pembina'],['hantar','send','Hantar']];
var cur='utama';

/* daftar teks untuk butang salin */
var REG=[];
function reg(t){var i=REG.indexOf(t);if(i<0){REG.push(t);i=REG.length-1}return i}

function nextBtn(id){var n=ORDER[ORDER.indexOf(id)+1];return n?'<button class="next" data-go="'+n+'">Seterusnya: '+LABEL[n]+' '+ic('right',20)+'</button>':''}
function head(e,h,l){return '<span class="eyebrow">'+e+'</span><h2 class="h2">'+h+'</h2>'+(l?'<p class="lead">'+l+'</p>':'')}
function acc(n,title,sub,body){return '<div class="acc"><button class="acc-h" aria-expanded="false"><span class="n">'+n+'</span><span class="acc-t"><b>'+title+'</b><small>'+sub+'</small></span><span class="ch">'+ic('down',22)+'</span></button><div class="acc-b">'+body+'</div></div>'}
function klist(groups){return groups.map(function(g){return '<h4 class="kh">'+esc(g.h)+'</h4><ul class="klist">'+g.i.map(function(x){return '<li><span>'+esc(x)+'</span><button class="mini" data-copy="'+reg(x)+'" aria-label="Salin ayat" title="Salin">'+ic('copy',18)+'</button></li>'}).join('')+'</ul>'}).join('')}
function checks(a){return '<ul class="checks">'+a.map(function(x){return '<li>'+ic('check',18)+'<span>'+esc(x)+'</span></li>'}).join('')+'</ul>'}

/* kad prompt (boleh kembang) */
function pcard(o,mode){
 var tags='<span class="tag">'+esc(o.id)+'</span><span class="tag y">'+esc(o.g?o.s+' · '+o.g:(o.s||o.c))+'</span>';
 return '<article class="pc" data-s="'+esc(o.s||o.c)+'"><button class="pc-h" aria-expanded="false">'+(o.ico?'<span class="emo" aria-hidden="true">'+ic(o.ico,24)+'</span>':'')+
 '<span class="tt"><span class="tags">'+tags+'</span><b>'+esc(o.t)+'</b>'+(o.w?'<span class="when">'+esc(o.w)+'</span>':'')+'</span><span class="pc-toggle">'+ic('down',22)+'</span></button>'+
 '<div class="pc-b"><pre class="prompt">'+esc(o.p)+'</pre>'+(o.note?'<p class="pnote">'+ic('info',18)+'<span><b>Nota:</b> '+esc(o.note)+'</span></p>':'')+
 '<div class="pacts"><button class="copy" data-copy="'+reg(o.p)+'">'+ic('copy',18)+' Salin prompt</button><button class="tobuild" data-build="'+mode+'|'+o.id+'">'+ic('wand',18)+' Isi dalam Pembina</button></div></div></article>';
}

/* ================= UTAMA ================= */
function fasilHTML(){
 return '<div class="sec"><h3 class="h3">'+ic('users',22)+' Fasilitator</h3><div class="fasil">'+D.FASIL.map(function(x){
  var av=x.foto?'<img src="'+esc(x.foto)+'" alt="'+esc(x.n)+'" width="72" height="72" loading="lazy">':esc(x.i);
  var inner='<span class="fav"'+(x.foto?'':' aria-hidden="true"')+'>'+av+'</span><span class="fr">Fasilitator</span><b class="fn">'+esc(x.n)+'</b><span class="fo">'+esc(x.o)+'</span>';
  return x.url?'<a class="fcard" href="'+esc(x.url)+'" target="_blank" rel="noopener" aria-label="'+esc(x.n)+': profil (tab baharu)">'+inner+'<span class="fext">'+ic('ext',14)+'</span></a>':'<div class="fcard">'+inner+'</div>';
 }).join('')+'</div></div>';
}
function renderUtama(){
 var route=[
  ['pedagogi','#1E7A4C','Langkah 1','Pedagogi Gen AI','Prompt mengikut 5 fasa PdP dengan formula R-T-F.'],
  ['webapp','#3434D6','Langkah 2','Bina Web App','Kuiz, permainan dan alat guru dengan Gemini Canvas (K-F-A-R-T).'],
  ['pembina','#0B2A5B','Langkah 3','Pembina Prompt','Isi maklumat kelas, prompt siap untuk disalin.'],
  ['hantar','#E06C00','Langkah 4','Hantar Hasil','Kongsi prompt atau web app terbaik anda.']
 ];
 $('#v-utama').innerHTML=
 '<div class="hero"><span class="blob b1"></span><span class="blob b3"></span>'+
 '<div><span class="kicker">Bengkel AI (JPN Melaka) · 3 November 2026</span>'+
 '<h1>Kompetensi Digital Guru <span class="yr">melalui AI</span></h1>'+
 '<p class="sub">Bengkel Pemerkasaan Kompetensi Digital Guru Melalui Kecerdasan Buatan (Artificial Intelligence – AI)</p>'+
 '<p class="org">Anjuran Unit Bahasa, Sektor Pembelajaran, Jabatan Pendidikan Negeri Melaka</p></div></div>'+

 '<div class="sec info">'+
  '<div><span class="ib">'+ic('cal',22)+'</span><span><small>Tarikh</small><b>3 November 2026 (Selasa)</b></span></div>'+
  '<div><span class="ib">'+ic('clock',22)+'</span><span><small>Masa</small><b>11.00 pagi – 5.00 petang</b></span></div>'+
  '<div><span class="ib">'+ic('pin',22)+'</span><span><small>Tempat</small><b>Hotel Kingston, Melaka</b></span></div>'+
 '</div>'+

 fasilHTML()+

 '<div class="sec"><h3 class="h3">'+ic('list',20)+' Laluan bengkel</h3><ol class="route">'+route.map(function(r){
  return '<li><button data-go="'+r[0]+'"><span class="rn"><span class="rnum">'+r[2].slice(-1)+'</span><span>'+r[2]+'</span>'+ic('right',20)+'</span><b>'+r[3]+'</b><p>'+r[4]+'</p></button></li>'}).join('')+'</ol></div>'+

 '<div class="sec cols"><div class="delima"><div class="delima-h"><span class="num">0</span><div><h3>Log masuk DELIMa dahulu</h3><small>Akaun DELIMa guru memberi akses kepada Gemini dan NotebookLM</small></div></div>'+
 '<ol class="steps"><li><b>1</b>Buka laman DELIMa</li><li><b>2</b>Log masuk dengan ID DELIMa anda</li><li><b>3</b>Kekal log masuk dalam pelayar ini</li></ol>'+
 '<a class="btn btn-navy" href="'+D.DELIMA+'" target="_blank" rel="noopener">'+ic('login',20)+' Log Masuk DELIMa</a></div>'+
 '<div class="card"><h3 class="h3">Alat AI yang digunakan</h3><div class="tools">'+Object.keys(D.TOOLS).map(function(k){var t=D.TOOLS[k];
  return '<a class="tool" href="'+t.url+'" target="_blank" rel="noopener">'+logo(k)+t.name+ic('ext',16)+'</a>'}).join('')+'</div>'+
 '<p class="tip" style="--cs:#E8F0FD;--c:#1565D8">'+ic('info',18)+'<span>Gemini digunakan untuk kedua-dua bahagian. Untuk <b>Bina Web App</b>, pastikan anda memilih <b>Canvas</b> dalam kotak prompt Gemini.</span></p></div></div>'+

 '<div class="sec"><h3 class="h3">'+ic('shield',22)+' Guna AI secara beretika</h3><div class="grid g2 g5">'+D.ETIKA.map(function(b){return '<div class="ok"><span class="ck">'+ic('check',18)+'</span><span><b>'+b[0]+'</b><small>'+b[1]+'</small></span></div>'}).join('')+'</div></div>'+

 '<div class="sec moto"><p>AI bukanlah jalan <b>PINTAS</b>, AI adalah jalan <b>PANTAS</b>.</p><small>Aplikasi dan bahan yang dibina hanya bermakna apabila ia menyelesaikan masalah pembelajaran yang sebenar.</small></div>'+
 nextBtn('utama');
}

/* ================= PEDAGOGI ================= */
function psBtn(i,cls){var x=D.PROSES[i];return '<button class="'+cls+'" data-ps="'+i+'" aria-pressed="false" style="--d:'+(i*70)+'ms"><span class="psn">'+(i?'Langkah '+i:'Persediaan')+'</span><span class="pst">'+esc(x.k)+'</span></button>'}
function psDesc(x){if(x.d)return x.d;for(var i=0;i<D.FASA.length;i++)if(D.FASA[i].k===x.f)return D.FASA[i].d;return ''}
function psSelect(i){
 $$('.proses [data-ps]').forEach(function(b){var on=+b.dataset.ps===i;b.classList.toggle('on',on);b.setAttribute('aria-pressed',String(on))});
 var p=$('#psPanel');if(i<0||!p){if(p)p.innerHTML='<p class="ps-hint">'+ic('info',18)+'<span>Pilih satu langkah di atas untuk bermula.</span></p>';return}
 var x=D.PROSES[i],list=D.PED.filter(function(o){return o.s===x.f});
 p.innerHTML='<span class="ps-step">'+(i?'Langkah '+i+' daripada 5':'Sebelum PdP')+'</span><h4>'+esc(x.k)+'</h4><p>'+esc(psDesc(x))+'</p>'+
  '<div class="ps-tags">'+list.slice(0,4).map(function(o){return '<span>'+esc(o.id)+' · '+esc(o.t)+'</span>'}).join('')+(list.length>4?'<span>+'+(list.length-4)+' lagi</span>':'')+'</div>'+
  '<button class="btn btn-navy" data-psgo="'+esc(x.f)+'">'+ic('down',18)+' Lihat '+list.length+' templat</button>';
}
function renderPedagogi(){
 var el=$('#v-pedagogi');
 var contoh='Anda seorang guru Bahasa Melayu Tahun 5 yang berpengalaman. Bina lima soalan kefahaman tentang peribahasa yang mengaitkan situasi harian murid. Susun dalam jadual dengan lajur soalan, jawapan dan aras Taksonomi Bloom.';
 var filters=['Semua'].concat(D.FASA.map(function(f){return f.k}));
 el.innerHTML='<div class="thero"><span class="blob"></span><div class="thero-h"><span class="tlogo">'+ic('bulb',34)+'</span><div><span class="eyebrow" style="color:rgba(255,255,255,.72)">Bahagian 1</span><h2>Pedagogi Gen AI</h2><p>Prompt mengikut 5 fasa PdP: salin, isi petak [ ] dan tampal.</p></div></div>'+
 '<div class="btns">'+toolBtn('gemini')+toolBtn('chatgpt')+'</div></div>'+

 '<div class="sec"><h3 class="h3">Proses Pedagogi</h3><p class="lead">Klik setiap langkah untuk melihat huraian dan templat prompt yang berkaitan.</p>'+
 '<div class="proses" role="group" aria-label="Proses Pedagogi">'+
  psBtn(0,'ps ps-prep')+
  '<span class="ps-arrow" aria-hidden="true"><svg viewBox="0 0 52 24" width="52" height="24"><path d="M2 12h34" stroke="#E53935" stroke-width="6" stroke-dasharray="7 5"/><path d="M34 3l10 9-10 9" fill="none" stroke="#E53935" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'+
  '<div class="ps-chev">'+D.PROSES.slice(1).map(function(x,i){return psBtn(i+1,'ps chev')}).join('')+'</div>'+
 '</div><div class="ps-panel" id="psPanel" aria-live="polite"><p class="ps-hint">'+ic('info',18)+'<span>Pilih satu langkah di atas untuk bermula.</span></p></div></div>'+

 '<div class="sec"><h3 class="h3">Formula prompt PdP: R-T-F</h3><div class="pktf n3">'+[
  ['R','Role (Peranan)','Beritahu AI siapa dirinya.','Anda seorang guru Bahasa Melayu Tahun 5 yang berpengalaman.','#1E7A4C'],
  ['T','Task (Tugasan)','Nyatakan apa yang perlu dihasilkan, berapa banyak dan untuk siapa.','Bina lima soalan kefahaman tentang peribahasa.','#E06C00'],
  ['F','Format (Bentuk)','Nyatakan bentuk output: jadual, senarai, skrip, peta minda atau rubrik.','Susun dalam jadual dengan lajur soalan, jawapan dan aras Bloom.','#1565D8']
 ].map(function(x){return '<div class="pk"><span class="L">'+x[0]+'</span><b>'+x[1]+'</b><small>'+x[2]+'</small><span class="eg">'+x[3]+'</span></div>'}).join('')+'</div>'+
 '<div class="card full"><div class="lbl">Contoh lengkap R-T-F dalam satu prompt</div><pre class="prompt">'+esc(contoh)+'</pre><button class="copy" data-copy="'+reg(contoh)+'">'+ic('copy',18)+' Salin contoh</button></div>'+
 '<p class="tip">'+ic('wand',18)+'<span>Petak seperti <b>[Mata Pelajaran]</b>, <b>[Tajuk/Topik]</b> dan <b>[Tahun/Tingkatan]</b> perlu diganti dengan maklumat kelas anda. Tekan <b>Isi dalam Pembina</b> untuk mengisinya secara automatik.</span></p></div>'+

 '<div class="sec"><h3 class="h3">Templat prompt mengikut fasa PdP</h3><div class="filters">'+filters.map(function(s,i){return '<button class="fchip'+(i?'':' on')+'" data-filter="'+esc(s)+'">'+esc(s)+'</button>'}).join('')+'</div>'+
 '<p class="lead" id="fasaDesc">'+D.PED.length+' templat. Pilih fasa untuk menapis.</p>'+
 '<div class="plist">'+D.PED.map(function(o){return pcard(o,'p')}).join('')+'</div></div>'+

 '<div class="sec">'+
  acc(ic('layers',22),'Kamus Penambah','Ayat tambahan untuk memperhalusi mana-mana prompt',klist(D.KAMUS_PED))+
  acc(ic('refresh',22),'Prompt Iterasi','Apabila hasil pertama belum sesuai',klist(D.ITER_PED)+'<p class="tip">'+ic('info',18)+'<span>Teruskan dalam perbualan yang <b>sama</b> supaya AI mengekalkan konteks.</span></p>')+
  acc(ic('checkc',22),'Senarai Semak & Peringatan','Sebelum digunakan dalam bilik darjah',checks(D.SEMAK_PED)+'<div class="warn"><b>'+ic('alert',18)+' Peringatan penggunaan AI dalam pengajaran</b>AI menjana jawapan berdasarkan pola bahasa, bukan berdasarkan kefahaman tentang murid anda. Oleh itu:<ul>'+D.AMARAN_PED.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul></div>')+
  acc(ic('info',22),'Nota mengikut platform AI','ChatGPT, Gemini, Claude dan NotebookLM','<div class="grid">'+D.PLATFORM.map(function(x){return '<div class="ex"><span>'+esc(x[0])+'</span>'+esc(x[1])+'</div>'}).join('')+'</div>')+
 '</div>'+nextBtn('pedagogi');
}

/* ================= WEB APP ================= */
function renderWebapp(){
 var el=$('#v-webapp');
 var filters=['Semua'].concat(D.WCAT);
 el.innerHTML='<div class="thero"><span class="blob"></span><div class="thero-h"><span class="tlogo">'+logo('gemini')+'</span><div><span class="eyebrow" style="color:rgba(255,255,255,.72)">Bahagian 2</span><h2>Bina Web App dengan Gemini</h2><p>Kuiz, permainan dan alat bantu mengajar dalam SATU fail HTML, tanpa menulis kod.</p></div></div>'+
 '<div class="btns">'+toolBtn('gemini')+'</div></div>'+

 '<div class="sec"><h3 class="h3">Langkah kerja</h3><ol class="flow"><li><span>Buka Gemini dengan akaun DELIMa</span></li><li><span>Pilih <b>Canvas</b> dalam kotak prompt</span></li><li><span>Tampal prompt dan tekan hantar</span></li><li><span>Uji, perbaiki dan kongsi pautan</span></li></ol></div>'+

 '<div class="sec"><h3 class="h3">Formula prompt Web App: K-F-A-R-T</h3><div class="pktf n5">'+[
  ['K','Konteks','Siapa pengguna, untuk tujuan apa, dan tajuk aplikasi.','Murid Tahun 4, BM, topik Kata Nama Am dan Khas.','#3434D6'],
  ['F','Fungsi','Apa yang aplikasi buat, satu per satu dalam bentuk poin.','10 soalan aneka pilihan, pemasa, skor.','#E06C00'],
  ['A','Aliran','Urutan skrin dari mula hingga tamat.','Masuk nama → arahan → kuiz → keputusan → sijil.','#0E8A6B'],
  ['R','Reka Bentuk','Tema warna, gaya, saiz fon, emoji dan responsif telefon.','Biru lembut, ceria, fon besar, mesra telefon.','#D6336C'],
  ['T','Teknikal','Satu fail HTML, pustaka dibenarkan, cara data disimpan.','Satu fail HTML, Tailwind CDN, localStorage.','#7B4FD6']
 ].map(function(x){return '<div class="pk"><span class="L">'+x[0]+'</span><b>'+x[1]+'</b><small>'+x[2]+'</small><span class="eg">'+x[3]+'</span></div>'}).join('')+'</div></div>'+

 '<div class="sec"><h3 class="h3">Templat Induk</h3><div class="plist" style="grid-template-columns:minmax(0,1fr)">'+pcard(D.INDUK,'w')+'</div></div>'+

 '<div class="sec"><h3 class="h3">12 templat mengikut jenis web app</h3><div class="filters">'+filters.map(function(s,i){return '<button class="fchip'+(i?'':' on')+'" data-filter="'+esc(s)+'">'+esc(s)+'</button>'}).join('')+'</div>'+
 '<div class="plist">'+D.WEB.map(function(o){return pcard(o,'w')}).join('')+'</div></div>'+

 '<div class="sec">'+
  acc(ic('layers',22),'Kamus Ciri','Tambah apa-apa ciri ke dalam mana-mana prompt',klist(D.KAMUS_WEB))+
  acc(ic('refresh',22),'Prompt Iterasi','Membaiki dan menambah baik aplikasi',klist(D.ITER_WEB)+'<p class="tip">'+ic('info',18)+'<span>Jarang sekali hasil pertama terus sempurna. Teruskan dalam perbualan yang <b>sama</b>; jangan mula chat baharu.</span></p>')+
  acc(ic('shield',22),'Senarai Semak & Privasi','Sebelum digunakan dengan murid',checks(D.SEMAK_WEB)+'<div class="warn"><b>'+ic('alert',18)+' Peringatan tentang data dan privasi</b>Kata laluan yang ditulis terus dalam kod HTML boleh dilihat oleh sesiapa sahaja yang membuka kod sumber halaman. Kaedah ini hanya sesuai untuk mengelakkan capaian tidak sengaja dalam persekitaran demo atau kelas. Ia <b style="display:inline">bukan</b> perlindungan keselamatan sebenar.<ul>'+D.AMARAN_WEB.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul></div>')+
  acc(ic('star',22),'Tiga tabiat hasil hebat','Yang membezakan hasil biasa dengan hasil hebat','<div class="grid">'+D.TABIAT.map(function(x){return '<div class="ex"><span>'+esc(x[0])+'</span>'+esc(x[1])+'</div>'}).join('')+'</div>')+
 '</div>'+nextBtn('webapp');
}

/* ================= PEMBINA PROMPT ================= */
var DEF={mode:'p',tpl:{p:'B1.1',w:'B1'},f:{subjek:'Bahasa Melayu',tahun:'Tahun 4',topik:'',objektif:'',masa:'30 minit',bilangan:'10',bahasa:'Bahasa Melayu',warna:'biru lembut',pengguna:'',tajuk:''},g:{},adds:[]};
var V=(function(){try{var s=JSON.parse(store.get('jpnm_pembina')||'null');if(s&&s.f&&s.tpl){var o=JSON.parse(JSON.stringify(DEF));
 o.mode=s.mode==='w'?'w':'p';o.tpl.p=s.tpl.p||o.tpl.p;o.tpl.w=s.tpl.w||o.tpl.w;for(var k in o.f)if(typeof s.f[k]==='string')o.f[k]=s.f[k];o.g=s.g||{};o.adds=s.adds||[];return o}}catch(e){}return JSON.parse(JSON.stringify(DEF))})();
function save(){store.set('jpnm_pembina',JSON.stringify(V))}

function tplList(m){return m==='p'?D.PED:[D.INDUK].concat(D.WEB)}
function curTpl(){var l=tplList(V.mode);for(var i=0;i<l.length;i++)if(l[i].id===V.tpl[V.mode])return l[i];return l[0]}
function kamus(){return V.mode==='p'?D.KAMUS_PED:D.KAMUS_WEB}
function addText(id){var a=id.split('-'),g=kamus()[+a[0]];return g&&g.i[+a[1]]}

/* petak yang diisi daripada medan borang */
var KNOWN=[
 ['subjek',/\[Mata Pelajaran(?: \/ Unit \/ Urusan)?\]/g],
 ['topik',/\[(?:Tajuk\/Topik|Topik|Konsep yang Diajar)\]/g],
 ['tahun',/\[Tahun\/Tingkatan\]/g],
 ['objektif',/\[Objektif Pembelajaran\]/g],
 ['masa',/\[Tempoh Masa\]/g],
 ['bilangan',/\[Bilangan\]/g],
 ['bahasa',/\[Bahasa\]/g],
 ['pengguna',/\[Pengguna Sasaran\]/g],
 ['warna',/\[Warna Pilihan\]/g],
 ['tajuk',/\[(?:Tajuk [^\]\/][^\]]*|Nama Chatbot)\]/g]
];
var FL={
 subjek:['Mata pelajaran','list',D.SUBJEK,'cth. Bahasa Melayu'],
 tahun:['Tahun / Tingkatan','select',D.TAHUN],
 topik:['Tajuk / Topik','text',null,'cth. Peribahasa, Kata Adjektif, Simple Past Tense'],
 objektif:['Objektif Pembelajaran','area',null,'Salin daripada RPH atau DSKP. Boleh dibiarkan kosong.'],
 masa:['Tempoh masa','select',D.MASA],
 bilangan:['Bilangan (soalan / item / stesen)','number',null,'cth. 10'],
 bahasa:['Bahasa paparan','select',D.BAHASA],
 pengguna:['Pengguna sasaran','text',null,'cth. murid Tahun 4, guru penasihat kokurikulum'],
 warna:['Tema warna','select',D.WARNA],
 tajuk:['Tajuk aplikasi','text',null,'cth. Kuiz Kata Nama Tahun 4']
};
function val(k){
 var v=(V.f[k]||'').trim();
 if(k==='pengguna'&&!v&&V.f.tahun)v='murid '+V.f.tahun;
 return v;
}
function baseText(){var t=curTpl().p;var a=V.adds.map(addText).filter(Boolean);return a.length?t+'\n\n'+a.join('\n'):t}
function usedKnown(t){var u={};KNOWN.forEach(function(k){k[1].lastIndex=0;if(k[1].test(t))u[k[0]]=1});if(u.pengguna)u.tahun=1;return u}
function fillKnown(t){KNOWN.forEach(function(k){var v=val(k[0]);if(v)t=t.replace(k[1],v)});return t}
function genTokens(t){KNOWN.forEach(function(k){t=t.replace(k[1],'')});var m=t.match(/\[[^\[\]\n]{2,}\]/g)||[],u=[];m.forEach(function(x){if(u.indexOf(x)<0)u.push(x)});return u}
function fillAll(t){t=fillKnown(t);Object.keys(V.g).forEach(function(tok){var v=(V.g[tok]||'').trim();if(v)t=t.split(tok).join(v)});return t}
function tokOpts(tok){
 var s=tok.slice(1,-1),lab='',body=s,m;
 if(/—|contoh/i.test(s))return null;
 m=s.match(/^([^:]+):\s*(.+)$/);if(m){lab=m[1];body=m[2]}
 if(body.indexOf(' / ')<0)return null;
 return {lab:lab,o:body.split(' / ')};
}
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}

function fieldHTML(k){
 var d=FL[k],id='pf-'+k,v=esc(V.f[k]||''),h='<div class="fld"><label for="'+id+'">'+d[0]+(k==='objektif'?' <span class="opt">(pilihan)</span>':'')+'</label>';
 if(d[1]==='select')h+='<select id="'+id+'" data-f="'+k+'">'+d[2].map(function(o){return '<option'+(o===V.f[k]?' selected':'')+'>'+esc(o)+'</option>'}).join('')+'</select>';
 else if(d[1]==='list')h+='<input id="'+id+'" data-f="'+k+'" list="dl-subjek" value="'+v+'" placeholder="'+esc(d[3])+'" autocomplete="off"><datalist id="dl-subjek">'+d[2].map(function(o){return '<option value="'+esc(o)+'">'}).join('')+'</datalist>';
 else if(d[1]==='area')h+='<textarea id="'+id+'" data-f="'+k+'" rows="2" placeholder="'+esc(d[3])+'">'+v+'</textarea>';
 else h+='<input id="'+id+'" data-f="'+k+'" '+(d[1]==='number'?'type="number" min="1" max="100" inputmode="numeric"':'')+' value="'+v+'" placeholder="'+esc(d[3]||'')+'" autocomplete="off">';
 if(k==='pengguna')h+='<p class="hint">Jika kosong, diisi sebagai “murid '+esc(V.f.tahun||'')+'”.</p>';
 return h+'</div>';
}
function genHTML(tok,i){
 var id='pg-'+i,v=V.g[tok]||'',o=tokOpts(tok),lbl=tok.slice(1,-1),h;
 if(o){
  h='<div class="fld"><label for="'+id+'">'+esc(cap(o.lab||o.o.join(' / ')))+'</label><select id="'+id+'" data-g="'+esc(tok)+'"><option value="">— biarkan '+esc(tok)+' —</option>'+o.o.map(function(x){return '<option'+(x===v?' selected':'')+'>'+esc(x)+'</option>'}).join('')+'</select></div>';
 }else{
  var long=lbl.length>38||/^(Senaraikan|Tampal|terangkan|Terangkan)/.test(lbl);
  h='<div class="fld"><label for="'+id+'">'+esc(cap(lbl.split(/\s—\s|:\s/)[0]))+'</label>'+
   (long?'<textarea id="'+id+'" data-g="'+esc(tok)+'" rows="2" placeholder="'+esc(lbl)+'">'+esc(v)+'</textarea>':'<input id="'+id+'" data-g="'+esc(tok)+'" value="'+esc(v)+'" placeholder="'+esc(lbl)+'" autocomplete="off">')+'</div>';
 }
 return h;
}

function renderPembina(){
 var el=$('#v-pembina');
 el.innerHTML=head('Alat interaktif','Pembina Prompt','Pilih templat, isi maklumat kelas anda dan salin. Petak [ ] diisi secara automatik.')+
 '<div class="pgrid"><div class="card form" id="pForm"><div class="fld"><label>1. Pilih jenis prompt</label><div class="mode" id="pMode">'+
  '<button type="button" data-mode="p" class="th-ped">Pedagogi PdP<small>Formula R-T-F</small></button>'+
  '<button type="button" data-mode="w" class="th-web">Web App Gemini<small>Formula K-F-A-R-T</small></button></div></div>'+
 '<div class="fld"><label for="pTpl">2. Pilih templat</label><select id="pTpl"></select><p class="hint" id="pWhen"></p></div>'+
 '<div><p style="margin:0 0 10px;font-weight:700;font-size:.9rem">3. Isi maklumat kelas</p><div class="fg" id="pKnown"></div></div>'+
 '<div class="xtra" id="pGenW"><p>Petak tambahan untuk templat ini <span class="opt">(boleh diisi kemudian)</span></p><div class="fg" id="pGen"></div></div>'+
 '<div class="xtra"><p id="pAddT"></p><div class="adds" id="pAdds"></div></div></div>'+
 '<div class="out"><div class="lbl">Prompt anda</div><pre class="prompt" id="pOut" aria-live="polite"></pre><div class="status" id="pStat"></div>'+
 '<div class="out-acts"><button class="btn btn-gold" id="pCopy">'+ic('copy',18)+' Salin prompt</button><span id="pOpen" style="display:contents"></span></div>'+
 '<p style="margin:12px 0 0;text-align:right"><button class="reset" id="pReset" type="button" style="color:#C9D6EE">Set semula borang</button></p></div></div>'+
 nextBtn('pembina');

 $('#pMode').addEventListener('click',function(e){var b=e.target.closest('[data-mode]');if(!b||b.dataset.mode===V.mode)return;V.mode=b.dataset.mode;V.adds=[];V.g={};save();syncPembina(true)});
 $('#pTpl').addEventListener('change',function(){V.tpl[V.mode]=this.value;V.g={};save();syncPembina(false)});
 el.addEventListener('input',function(e){var t=e.target;
  if(t.dataset.f){V.f[t.dataset.f]=t.value;if(t.dataset.f==='tahun'){var h=$('#pf-pengguna');if(h)h.parentNode.querySelector('.hint').textContent='Jika kosong, diisi sebagai “murid '+t.value+'”.'}save();updOut();return}
  if(t.dataset.g!==undefined){V.g[t.dataset.g]=t.value;save();updOut();return}
 });
 el.addEventListener('change',function(e){var t=e.target;
  if(t.dataset.add){var i=V.adds.indexOf(t.dataset.add);if(t.checked&&i<0)V.adds.push(t.dataset.add);if(!t.checked&&i>-1)V.adds.splice(i,1);save();syncFields();updAddCount();return}
  if(t.dataset.f&&t.tagName==='SELECT'){V.f[t.dataset.f]=t.value;save();updOut()}
 });
 $('#pCopy').addEventListener('click',function(){copyText(fillAll(baseText()))});
 $('#pReset').addEventListener('click',function(){var m=V.mode,tp=V.tpl;V=JSON.parse(JSON.stringify(DEF));V.mode=m;V.tpl=tp;save();syncPembina(true);toast('Borang telah diset semula')});
 syncPembina(true);
}
function syncPembina(full){
 $$('#pMode button').forEach(function(b){var on=b.dataset.mode===V.mode;b.classList.toggle('on',on);b.setAttribute('aria-pressed',String(on))});
 var el=$('#v-pembina');el.classList.toggle('th-ped',V.mode==='p');el.classList.toggle('th-web',V.mode==='w');el.classList.toggle('th-pem',false);
 if(full){
  var l=tplList(V.mode),h='';
  if(V.mode==='p'){D.FASA.forEach(function(f){h+='<optgroup label="'+esc(f.k)+'">'+l.filter(function(o){return o.s===f.k}).map(function(o){return '<option value="'+o.id+'">'+o.id+' · '+esc(o.t)+'</option>'}).join('')+'</optgroup>'})}
  else h=l.map(function(o){return '<option value="'+o.id+'">'+o.id+' · '+esc(o.t)+'</option>'}).join('');
  $('#pTpl').innerHTML=h;
  $('#pAddT').innerHTML=(V.mode==='p'?'4. Kamus Penambah':'4. Kamus Ciri')+' <span class="opt">(pilihan: tandakan ayat untuk ditambah di hujung prompt)</span>';
  $('#pAdds').innerHTML=kamus().map(function(g,gi){return '<details><summary>'+esc(g.h)+' <span class="cnt" hidden></span></summary>'+g.i.map(function(x,ii){var id=gi+'-'+ii;
   return '<label><input type="checkbox" data-add="'+id+'"'+(V.adds.indexOf(id)>-1?' checked':'')+'><span>'+esc(x)+'</span></label>'}).join('')+'</details>'}).join('');
  updAddCount();
  $('#pOpen').innerHTML=(V.mode==='p'?['gemini','chatgpt','notebooklm']:['gemini']).map(function(k){return toolBtn(k)}).join('');
 }
 var t=curTpl();$('#pTpl').value=t.id;V.tpl[V.mode]=t.id;
 $('#pWhen').textContent=t.w||(t.s?'Fasa: '+t.s+(t.g?' · '+t.g:''):'');
 syncFields();
}
function syncFields(){
 var b=baseText(),u=usedKnown(b),order=['subjek','tahun','topik','tajuk','pengguna','bilangan','masa','bahasa','warna','objektif'];
 $('#pKnown').innerHTML=order.filter(function(k){return u[k]}).map(fieldHTML).join('')||'<p class="hint" style="margin:0">Templat ini tidak menggunakan maklumat kelas. Isi petak tambahan di bawah.</p>';
 var gt=genTokens(b);
 $('#pGen').innerHTML=gt.map(genHTML).join('');
 $('#pGenW').hidden=!gt.length;
 updOut();
}
function updAddCount(){$$('#pAdds details').forEach(function(d){var n=$$('input:checked',d).length,c=$('.cnt',d);c.hidden=!n;c.textContent=n+' dipilih'})}
function updOut(){
 var t=fillAll(baseText()),left=t.match(/\[[^\[\]\n]{2,}\]/g)||[];
 $('#pOut').innerHTML=esc(t).replace(/\[[^\[\]\n]{2,}\]/g,function(m){return '<mark>'+m+'</mark>'});
 var s=$('#pStat');
 if(left.length){s.className='status';s.innerHTML=ic('info',18)+' '+left.length+' petak belum diisi (diserlahkan). Isi di atas, atau lengkapkan selepas menampal.'}
 else{s.className='status ok2';s.innerHTML=ic('check',18)+' Semua petak telah diisi. Prompt sedia untuk disalin.'}
}
function toBuilder(mode,id){
 if(mode!==V.mode)V.adds=[];
 V.mode=mode;V.tpl[mode]=id;V.g={};save();
 syncPembina(true);show('pembina');toast('Templat '+id+' dimuatkan dalam Pembina');
}

/* ================= HANTAR HASIL ================= */
function renderHantar(){
 $('#v-hantar').innerHTML=head('Langkah akhir','Hantar hasil anda','Kongsi prompt atau web app terbaik anda. Anda boleh menghantar lebih daripada sekali.')+
 '<p class="priv">'+ic('shield',20)+'<span>Jangan masukkan data peribadi murid (nama penuh, nombor kad pengenalan, markah individu) dalam hasil yang dihantar.</span></p>'+
 '<form class="card form sec" id="fHantar" novalidate><div class="fg">'+
 '<div class="fld"><label for="fNama">Nama guru <span class="req">*</span></label><input id="fNama" name="nama" autocomplete="name" maxlength="80"></div>'+
 '<div class="fld"><label for="fSekolah">Sekolah <span class="req">*</span></label><input id="fSekolah" name="sekolah" autocomplete="organization" maxlength="120" placeholder="cth. SK Bukit Beruang"></div>'+
 '<div class="fld"><label for="fSub">Mata pelajaran</label><input id="fSub" name="subjek" list="dl-subjek2" autocomplete="off" placeholder="cth. Bahasa Melayu"><datalist id="dl-subjek2">'+D.SUBJEK.map(function(s){return '<option value="'+esc(s)+'">'}).join('')+'</datalist></div>'+
 '<div class="fld"><label for="fJenis">Jenis hasil</label><select id="fJenis" name="jenis"><option>Prompt PdP (Pedagogi Gen AI)</option><option>Web App (Gemini Canvas)</option><option>Lain-lain</option></select></div></div>'+
 '<div class="fld"><label for="fTajuk">Tajuk hasil <span class="req">*</span></label><input id="fTajuk" name="tajuk" placeholder="cth. Kuiz Peribahasa Tahun 5" maxlength="150"></div>'+
 '<div class="fld"><label for="fPrompt">Prompt yang digunakan</label><textarea id="fPrompt" name="prompt"></textarea><p class="hint"><button type="button" class="reset" id="fUseP" style="padding:0">Guna prompt terakhir daripada Pembina</button></p></div>'+
 '<div class="fld"><label for="fPautan">Pautan kongsi</label><input id="fPautan" name="pautan" type="url" inputmode="url" placeholder="https://gemini.google.com/share/..."><p class="hint">Gemini: tekan butang Kongsi (Share), kemudian Salin pautan.</p></div>'+
 '<div class="fld"><label for="fHasil">Hasil (tampal teks)</label><textarea id="fHasil" name="hasil"></textarea></div>'+
 '<div class="fld"><label for="fRef">Refleksi ringkas</label><textarea id="fRef" name="refleksi" placeholder="Satu perkara yang akan saya cuba dalam PdP minggu ini…"></textarea></div>'+
 '<div class="fld"><label for="fFail">Fail (pilihan)</label><input id="fFail" name="fail" type="file" accept=".png,.jpg,.jpeg,.gif,.webp,.pdf,.txt,.csv"><p class="hint">Gambar, PDF atau TXT, maksimum 5 MB. Fail Word: simpan sebagai PDF dahulu.</p></div>'+
 '<p class="fmsg" id="fMsg" role="alert"></p><button class="btn btn-blue big" id="fBtn" type="submit">'+ic('send',20)+' Hantar hasil</button></form>'+
 '<div class="card done sec" id="fDone" hidden><span class="donei">'+ic('check',44)+'</span><h3 id="fDoneT">Terima kasih!</h3><p>Hasil anda telah diterima.</p><button class="btn btn-navy" id="fAgain" type="button">Hantar hasil lain</button></div>';
 var f=$('#fHantar');
 f.nama.value=store.get('jpnm_nama')||'';f.sekolah.value=store.get('jpnm_sekolah')||'';
 $('#fUseP').addEventListener('click',function(){f.prompt.value=fillAll(baseText());f.jenis.value=V.mode==='w'?'Web App (Gemini Canvas)':'Prompt PdP (Pedagogi Gen AI)';if(!f.subjek.value)f.subjek.value=V.f.subjek||'';toast('Prompt daripada Pembina dimasukkan')});
 f.addEventListener('submit',async function(e){
  e.preventDefault();
  var msg=$('#fMsg'),btn=$('#fBtn');msg.textContent='';
  var nama=f.nama.value.trim(),sekolah=f.sekolah.value.trim(),tajuk=f.tajuk.value.trim(),hasil=f.hasil.value.trim(),pautan=f.pautan.value.trim(),prompt=f.prompt.value.trim(),file=f.fail.files[0];
  if(!nama){msg.textContent='Sila isi nama anda.';f.nama.focus();return}
  if(!sekolah){msg.textContent='Sila isi nama sekolah.';f.sekolah.focus();return}
  if(!tajuk){msg.textContent='Sila isi tajuk hasil.';f.tajuk.focus();return}
  if(!hasil&&!pautan&&!file&&!prompt){msg.textContent='Isi sekurang-kurangnya satu: prompt, pautan, hasil atau fail.';return}
  if(pautan&&!/^https?:\/\//i.test(pautan))pautan='https://'+pautan;
  if(file&&file.size>5*1024*1024){msg.textContent='Fail melebihi 5 MB.';return}
  if(!window.AILA){msg.textContent='Borang hanya berfungsi pada laman AILA.';return}
  btn.disabled=true;btn.textContent='Menghantar…';
  try{
   var fail_url='',fail_nama='';
   if(file){var up=await AILA.storage.upload('hasil_bengkel',file);fail_url=up.data.url;fail_nama=up.data.filename}
   await AILA.collection('hasil_bengkel').create({nama:nama,sekolah:sekolah,subjek:f.subjek.value.trim(),jenis:f.jenis.value,tajuk:tajuk,prompt:prompt,pautan:pautan,hasil:hasil,refleksi:f.refleksi.value.trim(),fail_url:fail_url,fail_nama:fail_nama});
   store.set('jpnm_nama',nama);store.set('jpnm_sekolah',sekolah);
   f.reset();f.nama.value=nama;f.sekolah.value=sekolah;
   $('#fDoneT').textContent='Terima kasih, '+nama+'!';
   f.hidden=true;$('#fDone').hidden=false;window.scrollTo(0,0);
  }catch(err){msg.textContent='Gagal dihantar: '+(err&&err.message?err.message:'sila cuba lagi')+'.'}
  finally{btn.disabled=false;btn.innerHTML=ic('send',20)+' Hantar hasil'}
 });
 $('#fAgain').addEventListener('click',function(){$('#fDone').hidden=true;f.hidden=false});
}

/* ================= interaksi umum ================= */
var tt;
function toast(t){var el=$('#toast');el.textContent=t;el.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){el.classList.remove('on')},2200)}
function copyText(t){
 var done=function(){toast('✓ Disalin! Tampal dalam alat AI')};
 var fallback=function(){var ta=document.createElement('textarea');ta.value=t;ta.setAttribute('readonly','');ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');done()}catch(e){toast('Tidak dapat menyalin. Pilih teks secara manual.')}ta.remove()};
 if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(t).then(done,fallback);else fallback();
}
function renderNav(){
 $('#tabs').innerHTML=TABS.map(function(t){return '<button data-go="'+t[0]+'">'+ic(t[1],22)+'<span>'+t[2]+'</span></button>'}).join('');
 $('#btnQR').innerHTML=ic('qr',22);$('#btnPresent').innerHTML=ic('screen',22);
 $('#pPrev').innerHTML=ic('left',24);$('#pNext').innerHTML=ic('right',24);$('#qrClose').innerHTML=ic('x',22);
}
function show(id,noScroll,replace){
 if(ORDER.indexOf(id)<0)id='utama';
 cur=id;
 $$('.view').forEach(function(v){v.classList.toggle('on',v.id==='v-'+id)});
 $$('#tabs button').forEach(function(b){var on=b.dataset.go===id;b.classList.toggle('on',on);if(on)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
 if(location.hash!=='#'+id){try{history[replace?'replaceState':'pushState'](null,'','#'+id)}catch(e){}}
 if(!noScroll)window.scrollTo(0,0);
 $('#pLbl').textContent=(ORDER.indexOf(id)+1)+'/'+ORDER.length+' · '+LABEL[id];
 document.title=(id==='utama'?'':LABEL[id]+' · ')+TITLE;
}
function step(d){var i=ORDER.indexOf(cur)+d;if(i>=0&&i<ORDER.length)show(ORDER[i])}

document.addEventListener('click',function(e){
 var ps=e.target.closest('[data-ps]');if(ps){psSelect(+ps.dataset.ps);if(window.innerWidth<1000){var pp=$('#psPanel');if(pp&&pp.scrollIntoView)pp.scrollIntoView({behavior:'smooth',block:'nearest'})}return}
 var pg=e.target.closest('[data-psgo]');if(pg){var ch=$('#v-pedagogi .fchip[data-filter="'+pg.dataset.psgo+'"]');if(ch){ch.click();var t=ch.closest('.sec');window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-90,behavior:'smooth'})}return}
 var bd=e.target.closest('[data-build]');if(bd){var a=bd.dataset.build.split('|');toBuilder(a[0],a[1]);return}
 var go=e.target.closest('[data-go]');if(go){e.preventDefault();show(go.dataset.go);return}
 var cp=e.target.closest('[data-copy]');if(cp){copyText(REG[+cp.dataset.copy]);return}
 var ah=e.target.closest('.acc-h');if(ah){var ac=ah.parentNode,was=ac.classList.contains('open');
  $$('.acc',ac.parentNode).forEach(function(a){a.classList.remove('open');$('.acc-h',a).setAttribute('aria-expanded','false')});
  if(!was){ac.classList.add('open');ah.setAttribute('aria-expanded','true')}return}
 var ph=e.target.closest('.pc-h');if(ph){var pc=ph.parentNode,o=pc.classList.toggle('open');ph.setAttribute('aria-expanded',String(o));return}
 var fc=e.target.closest('[data-filter]');if(fc){var view=fc.closest('.view'),f=fc.dataset.filter;
  $$('[data-filter]',view).forEach(function(b){b.classList.toggle('on',b===fc)});
  $$('.plist .pc',fc.closest('.sec')).forEach(function(c){c.hidden=f!=='Semua'&&c.dataset.s!==f});
  if(view.id==='v-pedagogi'){var pi=-1;D.PROSES.forEach(function(x,k){if(x.f===f)pi=k});if(!e.isTrusted||pi<0){$$('.proses [data-ps]').forEach(function(b){var on=+b.dataset.ps===pi;b.classList.toggle('on',on);b.setAttribute('aria-pressed',String(on))})}else psSelect(pi);var fd=null;D.FASA.forEach(function(x){if(x.k===f)fd=x});$('#fasaDesc').textContent=fd?fd.d:D.PED.length+' templat. Pilih fasa untuk menapis.'}
  return}
});
document.addEventListener('keydown',function(e){
 if(/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;
 if(e.key==='ArrowRight')step(1);else if(e.key==='ArrowLeft')step(-1);else if(e.key==='Escape'&&!$('#qrModal').hidden)closeQR();
});
window.addEventListener('hashchange',function(){var h=location.hash.slice(1);if(h&&h!==cur)show(h,false,true)});
window.addEventListener('popstate',function(){var h=location.hash.slice(1)||'utama';if(h!==cur)show(h,false,true)});

/* mod tayang */
$('#btnPresent').addEventListener('click',function(){
 var de=document.documentElement,on=de.classList.toggle('present');
 if(on){if(de.requestFullscreen)de.requestFullscreen().catch(function(){});toast('Mod tayang: guna ← → untuk menukar bahagian')}
 else if(document.fullscreenElement&&document.exitFullscreen)document.exitFullscreen().catch(function(){});
});
document.addEventListener('fullscreenchange',function(){if(!document.fullscreenElement)document.documentElement.classList.remove('present')});
$('#pPrev').addEventListener('click',function(){step(-1)});
$('#pNext').addEventListener('click',function(){step(1)});

/* kod QR */
var qrDone=false;
function openQR(){
 $('#qrModal').hidden=false;$('#qrUrl').textContent=D.SITE_URL.replace('https://','');
 if(!qrDone){
  if(window.QRCode){new QRCode($('#qrbox'),{text:D.SITE_URL,width:560,height:560,colorDark:'#0B2A5B',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.M});qrDone=true}
  else $('#qrbox').innerHTML='<p class="qrfail">Kod QR tidak dapat dimuatkan. Gunakan pautan di bawah.</p>';
 }
 $('#qrClose').focus();
}
function closeQR(){$('#qrModal').hidden=true;$('#btnQR').focus()}
$('#btnQR').addEventListener('click',openQR);
$('#qrClose').addEventListener('click',closeQR);
$('#qrModal').addEventListener('click',function(e){if(e.target===this)closeQR()});

/* mula */
renderNav();renderUtama();renderPedagogi();renderWebapp();renderPembina();renderHantar();
show(location.hash.slice(1)||'utama',true,true);
})();
