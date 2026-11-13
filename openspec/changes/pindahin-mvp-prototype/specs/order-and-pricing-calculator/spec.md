## ADDED Requirements

### Requirement: Wizard Pemesanan Multi-Langkah Interaktif
Sistem SHALL menyediakan formulir pemesanan terpadu berbasis tahapan bertahap (*step-by-step wizard*) yang mudah digunakan pada smartphone dengan tombol aksi yang menempel di bagian bawah layar (*sticky bottom bar*).

#### Scenario: Pengguna menavigasi langkah pemesanan
- **WHEN** pengguna berada pada halaman `/pesan`
- **THEN** sistem menampilkan indikator progres visual (Langkah 1: Rute & Jadwal, Langkah 2: Armada & Helper, Langkah 3: Checklist Barang, Langkah 4: Rincian & Proteksi) dan memungkinkan navigasi maju-mundur dengan validasi input.

### Requirement: Kalkulator Tarif Dinamis dan Transparan
Sistem SHALL menghitung total biaya pindahan secara real-time berdasarkan rumus formula baku: tarif dasar armada + (biaya per kilometer * jarak tempuh) + biaya tenaga helper tambahan + biaya kompensasi akses tangga/lantai tanpa lift.

#### Scenario: Pengguna mengubah opsi helper atau lantai
- **WHEN** pengguna memilih opsi penambahan Helper ke-2 atau memilih kondisi lantai kamar asal "Lantai 3 (Tanpa Lift)"
- **THEN** sistem memperbarui rincian harga secara instan pada ringkasan biaya dengan transparansi komponen harga tanpa biaya tersembunyi.

### Requirement: Checklist Inventaris Barang Kos Mahasiswa
Sistem SHALL menyediakan katalog checklist barang bawaan kos dengan counter jumlah (misalnya: Kasur Single/Queen, Lemari 2 Pintu, Meja & Kursi Belajar, Box Pakaian, Kulkas Mini/Dispenser, Kipas Angin) dan indikator kecukupan kapasitas armada.

#### Scenario: Pengguna memilih inventaris barang
- **WHEN** pengguna menambah atau mengurangi jumlah barang bawaan pada Langkah 3
- **THEN** sistem memperbarui daftar inventaris pesanan dan menampilkan indikator persentase keterisian kapasitas armada yang dipilih.

