## ADDED Requirements

### Requirement: Panduan Skenario Tugas Uji Pengguna (Usability Task Guide)
Sistem SHALL menyediakan modul evaluasi pengujian `/uji-pengguna` yang memandu responden mahasiswa melalui 5 skenario tugas (*task scenarios*) terstandarisasi untuk menguji fungsionalitas utama aplikasi.

#### Scenario: Responden memulai sesi pengujian aplikasi
- **WHEN** responden mengakses halaman `/uji-pengguna`
- **THEN** sistem menampilkan profil responden yang dapat diisi (Nama, Kampus, Angkatan, Pengalaman Pindahan) dan daftar 5 skenario tugas (1: Estimasi Cepat di Beranda, 2: Melakukan Pemesanan Lengkap dengan Helper & Kasur, 3: Memeriksa Rincian Biaya & Fitur Payer, 4: Melakukan Pelacakan Status Penjemputan, 5: Memberikan Ulasan Layanan).

### Requirement: Instrumen Kuesioner System Usability Scale (SUS) Terintegrasi
Sistem SHALL menyediakan formulir 10 butir pertanyaan terstandar *System Usability Scale* (SUS) dengan skala Likert 1 (Sangat Tidak Setuju) hingga 5 (Sangat Setuju) dan menghitung skor akhir SUS secara otomatis menggunakan formula baku John Brooke.

#### Scenario: Responden menyelesaikan kuesioner SUS
- **WHEN** responden menyelesaikan ke-10 butir pernyataan SUS dan mengklik "Hitung Skor SUS"
- **THEN** sistem menghitung skor akhir (skala 0–100), menampilkan tingkat kelayakan (*Grade Scale* A–F, *Adjective Rating*: Best Imaginable/Excellent/Good/OK/Poor, dan *Acceptability Range*), serta menyediakan ringkasan laporan yang siap disalin ke Laporan Uji Pengguna UAS.

