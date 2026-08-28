# How to Use Wordventure

Panduan ini menjelaskan cara menjalankan, menggunakan, dan mengembangkan project Wordventure.

## 1. Persiapan

Pastikan perangkat Kamu sudah memiliki:

* Web browser modern
* Visual Studio Code
* Extension Live Server, jika ingin menggunakan development server

Browser yang disarankan:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari

## 2. Membuka Project

Extract file project Wordventure terlebih dahulu.

Kemudian buka folder project menggunakan Visual Studio Code.

Struktur folder akan terlihat kurang lebih seperti:

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
├── js/
├── assets/
└── README.md
```

## 3. Menjalankan Project

### Cara 1. Membuka HTML langsung

Buka file:

```text
index.html
```

Kemudian buka menggunakan browser.

Cara ini cocok untuk melihat tampilan dasar website.

### Cara 2. Menggunakan Live Server

Cara ini lebih disarankan untuk development.

1. Buka project menggunakan Visual Studio Code.
2. Install extension Live Server.
3. Buka `index.html`.
4. Klik kanan pada file.
5. Pilih `Open with Live Server`.
6. Browser akan otomatis membuka website.

Biasanya website akan berjalan pada alamat lokal seperti:

```text
http://127.0.0.1:5500/
```

Port dapat berbeda tergantung konfigurasi Live Server.

## 4. Menggunakan Website

Setelah website terbuka, pengguna dapat memulai dari halaman utama.

### Landing Page

Landing page berisi informasi mengenai Wordventure dan fitur yang tersedia.

Pengguna dapat masuk ke bagian pembelajaran melalui tombol navigasi yang tersedia.

### Dashboard

Dashboard menjadi pusat aktivitas pengguna.

Di halaman ini pengguna dapat melihat:

* Progress course
* Course yang sedang dipelajari
* Vocabulary
* Achievement
* Analytics
* Community
* Certificate

Gunakan sidebar untuk berpindah halaman.

## 5. Mengikuti Course

Untuk mengikuti course:

1. Buka halaman `Courses`.
2. Pilih course yang ingin dipelajari.
3. Buka lesson pertama.
4. Pelajari materi.
5. Selesaikan lesson.
6. Lanjutkan ke lesson berikutnya.
7. Selesaikan seluruh lesson.

Progress course akan diperbarui selama pengguna menyelesaikan lesson.

## 6. Mengikuti Final Test

Setelah seluruh materi course selesai, pengguna dapat mengikuti final test.

Langkahnya:

1. Buka course yang sudah selesai dipelajari.
2. Pilih final test.
3. Jawab seluruh pertanyaan.
4. Submit jawaban.
5. Sistem akan menghitung nilai.

Jika nilai memenuhi batas minimum, course akan ditandai sebagai completed.

Jika belum memenuhi batas minimum, pengguna dapat mengulang test sesuai sistem yang tersedia.

## 7. Mendapatkan Certificate

Certificate akan tersedia setelah pengguna memenuhi persyaratan course.

Alurnya:

```text
Course
   ↓
Complete Lessons
   ↓
Final Test
   ↓
Pass
   ↓
Course Completed
   ↓
Certificate Unlocked
```

Setelah certificate tersedia:

1. Buka halaman `Certificates`.
2. Cari course yang sudah diselesaikan.
3. Klik `View Certificate`.
4. Certificate akan ditampilkan pada preview.
5. Klik certificate jika ingin membuka full preview.

## 8. Preview Certificate

Halaman Certificates menyediakan preview certificate.

Pengguna dapat melihat:

* Nama pengguna
* Nama course
* Certificate ID
* Tanggal penerbitan
* Verification seal
* Wordventure branding

Certificate yang belum diperoleh dapat ditampilkan sebagai preview.

Certificate yang sudah diperoleh akan menampilkan data pengguna dan status certificate yang sebenarnya.

## 9. Menyimpan Certificate

Certificate dapat disimpan melalui fitur print browser.

Langkahnya:

1. Buka certificate.
2. Pilih `Print`.
3. Pilih `Save as PDF`.
4. Gunakan orientasi `Landscape`.
5. Simpan file PDF.

Layout certificate telah dibuat agar sesuai dengan format A4 landscape.

## 10. Practice

Gunakan halaman `Practice` untuk melakukan latihan tambahan.

Pengguna dapat menggunakan latihan untuk memperkuat pemahaman vocabulary dan materi bahasa Inggris.

Progress latihan dapat terhubung dengan sistem penyimpanan frontend yang digunakan oleh project.

## 11. Vocabulary

Halaman `Vocabulary` digunakan untuk mempelajari vocabulary.

Gunakan halaman ini untuk:

* Melihat vocabulary
* Mempelajari kata
* Mengikuti progress vocabulary
* Mengulang materi

## 12. Weekly Exam

Halaman `Weekly Exam` digunakan untuk melakukan evaluasi pembelajaran.

Pengguna dapat mengikuti exam untuk menguji pemahaman terhadap materi yang telah dipelajari.

## 13. Achievements

Halaman `Achievements` menampilkan pencapaian pengguna.

Achievement dapat diberikan berdasarkan aktivitas atau progress tertentu.

Contoh:

* Menyelesaikan course
* Mendapatkan nilai tertentu
* Menyelesaikan sejumlah lesson
* Mencapai progress tertentu

## 14. Analytics

Halaman `Analytics` digunakan untuk melihat perkembangan pembelajaran.

Data yang ditampilkan dapat mencakup:

* Course progress
* Lesson progress
* Test result
* Vocabulary progress
* Aktivitas pembelajaran

## 15. Community

Halaman `Community` digunakan untuk fitur komunitas.

Pengguna dapat melihat konten komunitas dan berinteraksi dengan fitur yang tersedia pada frontend.

## 16. Dark Mode

Wordventure mendukung dark mode.

Gunakan tombol theme switcher yang tersedia pada interface.

Pengaturan tema akan menyesuaikan tampilan:

* Background
* Card
* Text
* Border
* Button
* Certificate preview
* Decorative elements

## 17. Sistem Dedaunan

Wordventure menggunakan elemen dedaunan sebagai dekorasi UI.

Dedaunan dibuat menggunakan:

* HTML
* CSS
* JavaScript

Posisinya dapat dibuat secara dinamis.

Setiap section dapat memiliki:

* Posisi berbeda
* Ukuran berbeda
* Rotasi berbeda
* Opacity berbeda
* Z-index berbeda
* Animation delay berbeda
* Animation duration berbeda

Tujuannya untuk membuat halaman terasa lebih hidup tanpa mengganggu konten utama.

## 18. Data Frontend

Wordventure menggunakan `localStorage` untuk menyimpan data pengguna.

Contoh data:

```text
User
Course Progress
Lesson Progress
Test Result
Certificate
Achievement
Vocabulary Progress
```

Karena data disimpan di browser, data tidak otomatis tersedia pada perangkat atau browser lain.

Jika browser menghapus data website, progress pengguna juga dapat hilang.

## 19. Reset Data

Jika ingin menguji website dari awal, Kamu dapat menghapus data LocalStorage.

Di Google Chrome:

1. Buka Wordventure.
2. Tekan `F12`.
3. Buka tab `Application`.
4. Pilih `Local Storage`.
5. Pilih domain Wordventure.
6. Hapus data yang tersimpan.
7. Refresh halaman.

Setelah itu website akan kembali menggunakan state awal.

## 20. Mengubah Content Course

Content course dapat ditemukan pada file JavaScript yang menangani course.

Cari data seperti:

```javascript
const courses = [
    ...
];
```

atau struktur data yang digunakan project.

Pastikan setiap course memiliki informasi yang diperlukan oleh sistem.

Contoh struktur:

```javascript
{
    id: "course-id",
    title: "English Basics",
    lessons: [
        ...
    ],
    finalTest: [
        ...
    ]
}
```

Struktur sebenarnya mengikuti implementasi pada project.

## 21. Menambahkan Course Baru

Untuk menambahkan course:

1. Buka file JavaScript course.
2. Tambahkan object course baru.
3. Tambahkan lesson.
4. Tambahkan materi.
5. Tambahkan final test.
6. Pastikan ID course unik.
7. Pastikan sistem completion dapat membaca course tersebut.
8. Test seluruh flow dari lesson sampai certificate.

Flow yang perlu diuji:

```text
Course
→ Lesson 1
→ Lesson 2
→ Lesson terakhir
→ Final Test
→ Pass
→ Completed
→ Certificate
```

## 22. Mengubah Certificate

Tampilan certificate dapat ditemukan pada file CSS dan JavaScript certificate.

File yang biasanya berkaitan:

```text
css/certificate.css
js/certificate.js
certificates.html
```

Untuk mengubah desain, Kamu dapat mengubah:

* Border
* Typography
* Spacing
* Ornamen
* Logo
* Warna
* Certificate seal
* Footer
* Preview size

Pastikan perubahan tetap menggunakan container certificate agar layout tidak rusak.

## 23. Menambahkan Certificate Baru

Certificate biasanya dibuat berdasarkan course yang sudah selesai.

Jadi Kamu tidak perlu membuat HTML certificate baru untuk setiap course.

Sistem dapat menggunakan template certificate yang sama dan mengganti:

```text
User Name
Course Name
Certificate ID
Issue Date
```

Dengan data pengguna dan course.

## 24. Testing

Sebelum project digunakan atau dipresentasikan, lakukan pengujian berikut.

### Navigation

Pastikan semua menu dapat dibuka:

* Dashboard
* Courses
* Practice
* Weekly Exam
* Vocabulary
* Achievements
* Analytics
* Community
* Certificates

### Course

Pastikan:

* Lesson dapat dibuka.
* Lesson dapat diselesaikan.
* Progress berubah.
* Final test dapat dibuka.
* Nilai dihitung.
* Course berubah menjadi completed.

### Certificate

Pastikan:

* Certificate muncul setelah course selesai.
* View Certificate dapat diklik.
* Preview muncul.
* Full preview muncul.
* Data certificate benar.
* Certificate ID muncul.
* Tanggal muncul.
* Print berfungsi.
* Layout tidak terpotong.

### Responsive

Test minimal pada:

* Desktop
* Tablet
* Mobile

Pastikan tidak terdapat:

* Horizontal overflow
* Text keluar dari container
* Button bertabrakan
* Certificate terpotong
* Modal keluar dari layar

### Theme

Test:

* Light mode
* Dark mode

Pastikan warna text, background, card, button, dan certificate tetap terlihat dengan jelas.

## 25. Development Tips

Saat mengembangkan Wordventure:

* Gunakan ID yang unik untuk setiap course.
* Hindari mengubah struktur HTML yang digunakan JavaScript.
* Gunakan CSS variable dari `global.css`.
* Hindari hardcoded color jika sudah tersedia theme variable.
* Pastikan perubahan responsive.
* Test setelah mengubah JavaScript.
* Test certificate setelah mengubah course.
* Gunakan browser Developer Tools untuk mencari error.
* Periksa Console jika terdapat fitur yang tidak bekerja.

## 26. Troubleshooting

### Website tidak tampil dengan benar

Periksa:

* Path CSS.
* Path JavaScript.
* Path assets.
* Console browser.

### Button tidak bekerja

Periksa:

* ID element.
* Class element.
* Event listener JavaScript.
* Apakah file JavaScript sudah dimuat.

### Certificate tidak muncul

Periksa:

* Course sudah completed.
* Final test sudah lulus.
* Data LocalStorage tersedia.
* Certificate JavaScript sudah dimuat.

### Certificate layout rusak

Periksa:

* Container certificate.
* CSS `position`.
* Width dan height certificate.
* Responsive scaling.
* Print CSS.

Jangan menambahkan `position: relative` atau `position: absolute` secara sembarangan pada container halaman utama karena dapat memengaruhi layout yang sudah ada.

## 27. Production

Project saat ini merupakan frontend project.

Untuk production dengan data pengguna yang sebenarnya, disarankan menambahkan:

* Backend
* Database
* Authentication
* API
* Cloud storage
* Server-side certificate generation
* Certificate verification
* QR code verification

Dengan backend, certificate dapat memiliki ID yang dapat diverifikasi secara online.

## 28. Ringkasan Penggunaan

Flow utama Wordventure:

```text
Landing Page
     ↓
Dashboard
     ↓
Courses
     ↓
Lessons
     ↓
Final Test
     ↓
Course Completed
     ↓
Certificate
     ↓
Preview
     ↓
Print / Save as PDF
```

Project dapat digunakan langsung sebagai frontend prototype untuk website pembelajaran bahasa Inggris dan dapat dikembangkan lebih lanjut menjadi aplikasi pembelajaran dengan backend.
