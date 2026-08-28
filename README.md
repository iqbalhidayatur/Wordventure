# Wordventure

Wordventure adalah website pembelajaran bahasa Inggris berbasis web dengan pendekatan interaktif dan visual. Website ini dirancang untuk membantu pengguna mempelajari vocabulary, mengikuti course, melakukan practice, mengikuti exam, melihat progress, serta mendapatkan e-certificate setelah menyelesaikan course.

## Fitur

### Dashboard

Dashboard menampilkan ringkasan aktivitas dan progress pengguna.

Fitur utama:

* Progress pembelajaran
* Course yang sedang dipelajari
* Vocabulary progress
* Achievement
* Statistik pembelajaran
* Community

### Courses

Pengguna dapat mengikuti berbagai course bahasa Inggris.

Setiap course memiliki:

* Materi pembelajaran
* Lesson
* Progress course
* Final test
* Status completion
* E-certificate

Pengguna harus menyelesaikan seluruh lesson dan memenuhi nilai minimum final test untuk mendapatkan certificate.

### Practice

Halaman practice digunakan untuk melatih kemampuan bahasa Inggris melalui berbagai jenis latihan.

### Weekly Exam

Pengguna dapat mengikuti ujian untuk menguji pemahaman materi yang telah dipelajari.

### Vocabulary

Pengguna dapat mempelajari dan mengelola vocabulary yang sedang dipelajari.

### Achievements

Achievement memberikan penghargaan berdasarkan aktivitas dan progress pengguna.

### Analytics

Halaman analytics menampilkan perkembangan pembelajaran pengguna dalam bentuk statistik dan progress.

### Community

Community menyediakan halaman untuk aktivitas dan interaksi antar pengguna.

### E-Certificate

Wordventure memiliki sistem e-certificate untuk course yang telah diselesaikan.

Certificate memiliki:

* Nama pengguna
* Nama course
* Tanggal penerbitan
* Certificate ID
* Verified seal
* Wordventure branding
* Ornamen dedaunan
* Preview certificate
* Full certificate preview
* Print / Save as PDF

Certificate dapat dipreview langsung dari halaman Certificates.

## Sistem Certificate

Alur mendapatkan certificate:

1. Pengguna memilih course.
2. Pengguna menyelesaikan seluruh lesson.
3. Pengguna mengikuti final test.
4. Pengguna mendapatkan nilai minimum yang ditentukan.
5. Course berubah menjadi Completed.
6. Certificate otomatis tersedia.
7. Pengguna dapat membuka halaman Certificates.
8. Pengguna dapat melakukan preview certificate.
9. Pengguna dapat melakukan print atau menyimpan certificate sebagai PDF.

Sistem certificate saat ini menggunakan frontend storage sehingga tidak membutuhkan backend.

## Teknologi

Project ini menggunakan:

* HTML5
* CSS3
* JavaScript
* Bootstrap
* Font Awesome
* LocalStorage

Tidak membutuhkan framework frontend seperti React atau Vue.

## Struktur Project

Struktur project secara umum:

```text
Wordventure/
│
├── index.html
├── dashboard.html
├── courses.html
├── practice.html
├── weekly-exam.html
├── vocabulary.html
├── achievements.html
├── analytics.html
├── community.html
├── certificates.html
│
├── css/
│   ├── global.css
│   ├── dashboard.css
│   ├── courses.css
│   ├── practice.css
│   ├── certificate.css
│   └── ...
│
├── js/
│   ├── main.js
│   ├── dashboard.js
│   ├── courses.js
│   ├── certificate.js
│   └── ...
│
└── assets/
    ├── images/
    ├── icons/
    └── ...
```

Nama dan jumlah file dapat berbeda tergantung versi project.

## Sistem Penyimpanan

Wordventure menggunakan LocalStorage untuk menyimpan data frontend.

Data yang dapat disimpan meliputi:

* Progress course
* Lesson completion
* Test result
* Certificate
* Achievement
* Vocabulary progress
* User information

Karena menggunakan LocalStorage, data hanya tersimpan pada browser yang digunakan.

Menghapus data browser dapat menghapus progress pengguna.

## Certificate Preview

Certificate dapat ditampilkan dalam dua mode.

### Preview

Certificate ditampilkan langsung pada halaman Certificates.

Pengguna dapat memilih certificate tertentu untuk melihat detailnya.

### Full Preview

Pengguna dapat membuka certificate dalam ukuran yang lebih besar melalui modal.

Full preview digunakan untuk melihat certificate sebelum melakukan print.

## Print Certificate

Certificate menggunakan format landscape yang disesuaikan dengan ukuran A4.

Pengguna dapat:

1. Membuka certificate.
2. Klik tombol Print.
3. Memilih printer atau Save as PDF.
4. Menyimpan certificate sebagai file PDF.

## Responsive Design

Wordventure dirancang agar dapat digunakan pada berbagai ukuran layar.

Layout menyesuaikan:

* Desktop
* Laptop
* Tablet
* Mobile

Certificate juga menggunakan responsive scaling agar tidak keluar dari area preview.

## Visual Design

Wordventure menggunakan gaya visual yang fun dan modern dengan elemen edukasi.

Beberapa elemen visual yang digunakan:

* Rounded cards
* Soft shadows
* Green based color palette
* Decorative leaves
* Animated elements
* Responsive components
* Light mode
* Dark mode

Dedaunan pada UI dibuat sebagai elemen dekoratif menggunakan HTML, CSS, dan JavaScript.

Posisinya dapat dibuat berbeda pada setiap section untuk memberikan tampilan yang lebih dinamis.

## Frontend Only

Project ini dibuat untuk kebutuhan frontend.

Tidak terdapat:

* Backend server
* Database server
* Authentication server
* API certificate verification
* Cloud storage

Semua interaksi saat ini berjalan di sisi browser.

## Cara Menjalankan

Tidak diperlukan instalasi khusus.

Cara menjalankan:

1. Extract project.
2. Buka folder project.
3. Jalankan `index.html` menggunakan browser.

Untuk pengalaman development yang lebih baik, project dapat dijalankan menggunakan Live Server pada Visual Studio Code.

## Browser

Wordventure dapat dijalankan pada browser modern seperti:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari

Disarankan menggunakan browser versi terbaru.

## Pengembangan Selanjutnya

Beberapa fitur yang dapat dikembangkan:

* Backend authentication
* Database pengguna
* Cloud progress synchronization
* Certificate verification melalui Certificate ID
* QR code pada certificate
* Public certificate verification page
* Download certificate langsung sebagai PDF
* User profile
* Leaderboard
* Community posts
* Course creation system
* Admin dashboard
* Achievement system yang lebih lengkap

## License

Project ini dibuat sebagai project frontend Wordventure.

© Wordventure
