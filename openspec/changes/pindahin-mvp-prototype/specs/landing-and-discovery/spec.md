## ADDED Requirements

### Requirement: Tampilan Beranda Mobile-First dan Value Proposition
Sistem SHALL menyediakan halaman beranda (landing page) yang dioptimasi untuk perangkat bergerak (mobile-first) dan responsif hingga layar desktop, menampilkan proposisi nilai utama Pindah.in: tanpa tawar-menawar harga sepihak, layanan door-to-door dengan helper, transparansi tarif, serta jaminan perlindungan barang.

#### Scenario: Mahasiswa mengakses halaman beranda
- **WHEN** pengguna membuka URL utama `/`
- **THEN** sistem menampilkan hero section dengan pesan nilai utama, tombol Call-to-Action "Pesan Sekarang", ringkasan keunggulan layanan, katalog armada, serta navigasi mobile (Bottom Navigation Bar).

### Requirement: Estimasi Cepat Tarif pada Beranda
Sistem SHALL menyediakan widget kalkulator cepat (Quick Estimator) di halaman beranda yang memungkinkan pengguna memasukkan area penjemputan dan tujuan di Surabaya untuk mendapatkan perkiraan tarif instan sebelum masuk ke formulir lengkap.

#### Scenario: Pengguna melakukan estimasi cepat
- **WHEN** pengguna memilih lokasi kos asal (misalnya "Kos Kampus B UNAIR - Dharmawangsa") dan kos tujuan (misalnya "Kos Kampus C UNAIR - Mulyorejo") lalu menekan tombol "Hitung Estimasi"
- **THEN** sistem menampilkan perkiraan jarak tempuh, perkiraan durasi waktu, serta rekomendasi paket armada standar (Rp 150.000) dengan tombol tautan langsung menuju formulir pemesanan penuh `/pesan`.

### Requirement: Katalog Armada dan Testimoni Nyata
Sistem SHALL menyajikan informasi detail spesifikasi armada yang tersedia (Motor Kargo, Pikap Bak Terbuka, Pikap Box Tertutup) beserta testimoni mahasiswa perantau yang relevan dengan konteks kampus Surabaya.

#### Scenario: Pengguna memeriksa pilihan armada
- **WHEN** pengguna menggulir ke bagian armada pada beranda
- **THEN** sistem menampilkan kartu armada dengan dimensi bak, kapasitas maksimal (kg/volume), estimasi muatan barang kos, dan tarif dasar transparan.

