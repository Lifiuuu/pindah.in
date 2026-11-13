## ADDED Requirements

### Requirement: Tampilan Visual Pelacakan Pesanan Real-Time
Sistem SHALL menyediakan antarmuka pelacakan status pesanan `/tracking/[id]` yang menampilkan visualisasi peta dummy dengan rute pergerakan, profil driver, nomor plat armada, profil helper, serta tombol kontak cepat (WhatsApp dummy / Call).

#### Scenario: Pengguna membuka halaman pelacakan pesanan aktif
- **WHEN** pengguna membuka tautan pelacakan pesanan atau diarahkan setelah berhasil konfirmasi pesanan
- **THEN** sistem menampilkan status alur terkini, estimasi waktu penjemputan, informasi detail armada & kontak tim operasional.

### Requirement: Simulasi Percepatan Tahapan Status untuk Presentasi UAS
Sistem SHALL menyediakan panel kontrol simulasi (*Demo Simulation Controller*) yang memungkinkan presenter memajukan status pesanan secara manual dalam hitungan detik untuk kebutuhan demonstrasi 3-4 menit di hadapan dosen/penguji.

#### Scenario: Presenter memajukan status pesanan selama demo
- **WHEN** pengguna mengklik tombol "Simulasi: Lanjut ke Tahap Berikutnya" pada panel demo
- **THEN** sistem memperbarui status pesanan dari "Menunggu Driver" -> "Driver & Helper Menuju Kos" -> "Loading Barang dari Kamar" -> "Dalam Perjalanan" -> "Bongkar Muat di Kamar Baru" -> "Selesai" disertai pembaruan badge visual dan notifikasi status.

