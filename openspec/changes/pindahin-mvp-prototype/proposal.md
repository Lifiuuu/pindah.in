## Why

Mahasiswa perantau di kawasan kampus (khususnya Surabaya / Universitas Airlangga) kerap menghadapi beban berat saat pindah kos/kontrakan: harga sewa pikap tidak transparan dan memaksa tawar-menawar sepihak, ketiadaan kepastian tenaga angkut (helper) dari lorong kamar ke kendaraan, jadwal jemput yang sering terlambat, serta kekhawatiran barang rusak tanpa garansi. Berdasarkan dokumen Business Plan "Pindah.in", validasi lapangan menunjukkan 100% responden memberikan skor kekhawatiran 5/5 untuk ketidakpastian harga dan ketiadaan helper.

Untuk memenuhi kriteria Ujian Akhir Semester (UAS) Kewirausahaan Bidang TI (D4 Teknik Informatika Vokasi UNAIR) yang menuntut luaran berupa Prototipe interaktif (demo 3–4 menit) dan Laporan Uji Pengguna (minimal 5 target pengguna dengan instrumen SUS/Task Success), proyek ini membangun prototipe frontend interaktif web application mobile-first yang responsif, dilengkapi data dummy realistis, serta siap di-deploy ke Vercel untuk pengujian pengguna secara langsung.

## What Changes

Membangun aplikasi prototipe web frontend mandiri (standalone frontend prototype) untuk platform Pindah.in dengan pendekatan arsitektur mobile-first (responsif untuk mobile, tablet, dan desktop), mencakup:

- **Landing Page Interaktif**: Beranda pengenalan nilai utama Pindah.in (bebas tawar-menawar, helper kamar-ke-kamar, tarif fixed transparan, garansi barang aman), kalkulator estimasi cepat, ulasan mahasiswa, dan edukasi layanan.
- **Kalkulator Tarif & Wizard Pemesanan (Order Flow)**: Formulir pemesanan multi-langkah yang menghitung tarif otomatis berbasis jarak, jenis kendaraan (pikap bak / pikap box / motor kargo roda tiga), opsi jumlah helper, dan kondisi lantai (tangga/lift).
- **Checklist Inventaris Barang & Estimasi Kapasitas**: Pemilihan kategori barang kos (kasur busa/springbed, lemari baju, meja belajar, kontainer plastik, dispenser/kulkas mini) untuk verifikasi muatan pikap.
- **Fitur Pembagian Tagihan / Dukungan Penyandang Dana (Payer Flow)**: Generasi tautan tagihan (shareable payment link / invoice modal) yang memungkinkan mahasiswa meneruskan rincian pembayaran transparan kepada orang tua selaku penyandang dana, dilengkapi simulasi instruksi QRIS/Transfer.
- **Simulasi Pelacakan Status Real-Time (Live Order Tracking)**: Tampilan visual timeline pergerakan armada dan status pesanan (Mencari Driver → Driver & Helper Menuju Kos Asal → Loading dari Kamar → Dalam Perjalanan → Bongkar Muat di Kamar Baru → Pesanan Selesai).
- **Simulasi Dashboard Mitra Driver & Helper**: Tampilan preview sisi mitra untuk memvalidasi model bisnis komisi 20% / bagi hasil 80% bagi pengemudi dan tenaga angkut.
- **Modul Pengujian Pengguna & Instrumen SUS Terintegrasi**: Fitur pop-up/halaman evaluasi usability testing bawaan (10 pertanyaan System Usability Scale dan pencatatan Task Completion) untuk mempermudah pengambilan data uji pengguna sesuai rubrik UAS.

## Capabilities

### New Capabilities
- `landing-and-discovery`: Halaman muka mobile-first yang memperkenalkan proposisi nilai Pindah.in, estimasi tarif kilat, katalog armada, serta navigasi utama.
- `order-and-pricing-calculator`: Alur pemesanan lengkap dan algoritma kalkulator tarif transparan berdasarkan parameter jarak, armada, helper, dan lantai kos.
- `order-tracking-and-status`: Halaman pelacakan status pesanan real-time interaktif dengan simulasi tahapan operasional dan kontak driver/helper.
- `payer-financing-support`: Tampilan tagihan dan sistem invoice shareable yang memfasilitasi peran orang tua/penyandang dana dalam proses pembayaran non-tunai.
- `user-testing-and-sus`: Instrumen terintegrasi untuk pengujian kegunaan aplikasi (Usability Testing) dengan penghitungan skor SUS otomatis dan feedback form untuk responden mahasiswa.

### Modified Capabilities
<!-- Tidak ada perubahan kapabilitas sebelumnya karena ini adalah inisialisasi awal repositori -->

## Impact

- **Tech Stack & Framework**: Pembangunan frontend modern berbasis Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v3/v4, Lucide React Icons, dan Shadcn/Radix UI components.
- **Deployment**: Teroptimasi untuk zero-config continuous deployment pada platform Vercel dengan dukungan static export / edge runtime yang cepat.
- **Responsivitas**: Desain menerapkan paradigma *mobile-first* (resolusi 360px–430px smartphone), beradaptasi mulus ke tablet (768px), dan desktop modern (1024px–1440px).
- **Data & State**: Menggunakan Client-side state management (Zustand / React Context) dan LocalStorage untuk persistensi sesi pemesanan dummy data tanpa dependensi backend eksternal, menjamin keandalan saat demo UAS dan testing offline/online.
- **Kesiapan Uji Pengguna UAS**: Menghasilkan prototipe yang siap pakai untuk menguji skenario tugas utama (Customer Journey) dengan 5+ responden dan menghitung skor SUS secara empiris.

