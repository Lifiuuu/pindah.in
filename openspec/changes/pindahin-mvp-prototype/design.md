## Context

Platform **Pindah.in** dirancang berdasarkan temuan empiris dalam *Business Plan* Kewirausahaan Mahasiswa TI Vokasi Universitas Airlangga. Riset menunjukkan bahwa mahasiswa perantau di Surabaya menghadapi *pain points* akut:
1. **Ketidakpastian Tarif**: 100% responden survei (R-01 s.d R-04) memberi skor 5/5 untuk kekhawatiran tarif yang tidak menentu dan tawar-menawar sepihak oleh pemilik pikap konvensional.
2. **Ketiadaan Helper**: Tidak ada jaminan tenaga angkut barang berat (kasur, lemari, kardus) dari lantai kamar kos menuju kendaraan.
3. **Keterlambatan Armada**: 2 dari 3 pengguna kendaraan sewa mengalami keterlambatan tanpa ada visibilitas pelacakan.
4. **Kekhawatiran Keamanan**: Ketiadaan garansi barang rusak/hilang.

Sesuai silabus dan rubrik penilaian UAS Kewirausahaan Bidang TI (FVK25612002), tim diwajibkan menyajikan demo prototipe (durasi 3–4 menit pada sesi 12 menit presentasi tim) serta menyusun **Laporan Uji Pengguna** dengan minimal 5 orang pengguna target yang mencakup skenario tugas (*task scenarios*) dan evaluasi kuesioner *System Usability Scale* (SUS).

Aplikasi ini akan di-deploy ke **Vercel** dengan arsitektur frontend modern, menggunakan pendekatan desain **Mobile-First** (mengutamakan viewport smartphone 360–430px, lalu adaptif ke tablet 768px dan desktop 1024px+), serta mengusung data *dummy* realistis interaktif tanpa ketergantungan server database eksternal yang rentan down saat presentasi.

## Goals / Non-Goals

**Goals:**
- **Mobile-First Responsive Experience**: Memastikan antarmuka tampil layaknya aplikasi native mobile (Bottom Navigation Bar, Sheet Drawer, Card List yang sentuh-sentuh nyaman) dan tetap proporsional saat dibuka pada layar tablet dan desktop.
- **Transparansi Kalkulasi Tarif (Instant Cost Estimator)**: Menghitung ongkos pindahan secara otomatis dan akurat berdasarkan jarak tempuh (km), jenis armada (Motor Kargo Roda Tiga, Pikap Bak Terbuka, Pikap Box Tertutup), jumlah tenaga angkut (Helper 1 atau 2 orang), dan faktor akses lantai kos (Lantai dasar, Tangga Lt. 2–4, atau Lift).
- **Alur Pemesanan Interaktif & Checklist Barang Kos**: Menyediakan wizard langkah demi langkah yang intuitif dengan data inventaris bawaan khas anak kos (kasur, lemari lipat, meja belajar, rak sepatu, galon, kontainer).
- **Validasi Finansial & Fitur Payer (Dukungan Orang Tua)**: Menyediakan fitur salin tautan tagihan (*Shareable Payment Link*) dan simulasi QRIS/Transfer agar mahasiswa dapat dengan mudah meneruskan biaya ke orang tua sebagai penyandang dana (*Payer*).
- **Simulasi Live Tracking & Status Interaktif**: Timeline visual pelacakan tahapan penjemputan hingga kamar tujuan dengan tombol simulasi percepatan status untuk keperluan demo presentasi UAS 3-4 menit.
- **Built-in SUS & Usability Testing Suite**: Menyediakan modal/halaman pengujian langsung yang memandu 5 skenario tugas uji coba dan formulir 10 pertanyaan standar SUS beserta penghitungan skor otomatis (0–100) dan klasifikasi Adjektif (OK, Good, Excellent).

**Non-Goals:**
- Mengembangkan backend server riil (Node.js/Express, PostgreSQL, Redis) pada fase prototipe ini; semua transaksi dan status dikelola melalui Client-side Storage (LocalStorage / In-memory Zustand).
- Mengintegrasikan Payment Gateway riil (Midtrans/Xendit live production); prototipe menggunakan simulated payment flow dengan verifikasi instan.
- Menghubungkan GPS driver native riil; pelacakan disimulasikan melalui state machine visual yang interaktif dan realistis.

## Decisions

### 1. Rekomendasi Framework & UI Library
- **Keputusan**: Menggunakan **Next.js 15 (App Router)** dengan **React 19**, **TypeScript**, dan **Tailwind CSS**.
  - **Alasan Pemilihan**:
    1. *Deployment Zero-Config ke Vercel*: Next.js memiliki integrasi bawaan terbaik dengan platform Vercel, menjamin URL publik instan, pratinjau responsif cepat, dan zero latency.
    2. *App Router & Nested Layout*: Memudahkan pemisahan layout mobile shell (Bottom Navigation Bar pada alur pengguna, Floating Action Buttons) dan halaman terisolasi (Invoice, Tracking, dan Mode Presentasi).
    3. *Kaya Komponen Visual*: Didukung oleh komponen berbasis Tailwind CSS (Shadcn UI primitives / Radix UI) dan Lucide React Icons untuk icon set logistik yang modern dan profesional.
  - **Alternatif yang Dipertimbangkan**:
    - *Vite + React SPA*: Cepat dan ringan, namun routing dan arsitektur Next.js lebih terstruktur untuk pembuatan landing page SEO-friendly sekaligus prototipe multi-halaman.
    - *Vue / Nuxt*: Sangat baik, namun ekosistem komponen mobile UI dan dokumentasi komponen simulasi lebih melimpah pada ekosistem React/Tailwind.

### 2. Pendekatan Desain Responsif: Mobile-First ke Desktop
- **Keputusan**: Seluruh komponen disusun dengan prioritas viewport smartphone (lebar 375px–430px) menggunakan container bertipe `max-w-md mx-auto` untuk mode mobile-centric pada desktop, dengan opsi *Full Desktop View* adaptif pada layar lebar.
  - **Komponen Mobile-First Khas**:
    - *Bottom Navigation Bar* tetap terlihat di ponsel (Home, Riwayat, Tarif, Bantuan).
    - *Floating Price Summary & Action Bar* saat mengisi formulir pemesanan.
    - *Swipeable Bottom Sheets / Modals* untuk memilih kategori barang bawaan dan rincian harga.
  - **Breakpoint Strategy**:
    - `Base (Mobile)`: 360px – 480px (1 kolom vertikal, full-width buttons, tab navigasi bawah).
    - `Tablet (md)`: 768px (2 kolom grid untuk pemilihan armada & checklist barang).
    - `Desktop (lg/xl)`: 1024px+ (Split layout: Form di sisi kiri, Live Interactive Price Summary & Map Card di sisi kanan).

### 3. Arsitektur State Management & Simulasi Data Dummy
- **Keputusan**: Menggunakan **Zustand** didukung dengan persistensi **LocalStorage**.
  - **Alasan**: State pemesanan, riwayat pesanan, profil pengguna, dan hasil skor uji SUS tersimpan secara persisten di browser pengguna penguji. Saat halaman di-refresh di hadapan dosen atau responden, data tidak hilang.
  - **Data Dummy Realistis**:
    - Titik lokasi populer kos mahasiswa Surabaya: Area Kampus A, B, C UNAIR, Mulyorejo, Sutorejo, Dharmawangsa, Gubeng, Sukolilo.
    - Daftar armada: Mobil Pikap Bak (Suzuki Carry / Gran Max), Pikap Box Tertutup (anti-hujan), Motor Roda Tiga (Tossa/Viar untuk lorong gang sempit).
    - Estimasi harga riil: Paket Standar Rp 150.000 (sesuai riset Business Plan, margin Rp 30.000 / 20%, hak mitra Rp 120.000 / 80%).

### 4. Struktur Halaman & Navigasi Terhubung (Page Architecture)
Aplikasi prototipe dibagi menjadi alur halaman yang saling terhubung secara runtut:
1. `/` : **Landing Page (Beranda)**
   - Hero banner: Proposisi nilai "Pindahan Kos Mahasiswa Surabaya Tanpa Ribet Nawar & Pasti Ada Helper".
   - Quick Estimator Widget: Masukkan lokasi jemput & antar, dapat estimasi tarif kilat.
   - 4 Pilar Solusi (Harga Transparan, Helper Sampai Kamar, Tracking Armada, Garansi Aman).
   - Katalog Paket & Armada.
   - Testimoni Mahasiswa (UNAIR Kampus B & C).
2. `/pesan` : **Wizard Pemesanan Pindahan (Multi-step Form)**
   - *Langkah 1 (Lokasi & Waktu)*: Alamat asal (nama kos, nomor kamar, lantai/lift), alamat tujuan, tanggal & jam jemput.
   - *Langkah 2 (Armada & Helper)*: Pilih pikap bak / box / roda tiga, tentukan jumlah helper (1 helper sudah termasuk, opsi tambah helper ke-2).
   - *Langkah 3 (Inventaris Barang)*: Checklist barang bawaan kos (Kasur, Lemari, Meja Belajar, Box Pakaian, Elektronik).
   - *Langkah 4 (Review & Proteksi)*: Ringkasan pesanan, toggle garansi perlindungan barang (+Rp 10.000 free-tier promo), catatan khusus sopir.
3. `/pesan/konfirmasi` : **Halaman Pembayaran & Payer Support**
   - Rincian biaya transparan (Biaya armada, Jasa helper, Biaya lantai, Biaya layanan platform).
   - Opsi Pembayaran Mandiri: QRIS instan / Transfer Virtual Account.
   - Opsi Payer (Orang Tua): Tombol "Kirim Tagihan ke Orang Tua via WhatsApp" yang menghasilkan link `/invoice/[id]`.
4. `/invoice/[id]` : **Halaman Tagihan Penyandang Dana (Payer View)**
   - Tampilan bersih untuk orang tua: Nama mahasiswa, rincian barang, alamat jemput & tujuan, jaminan garansi aman, dan tombol "Bayar Sekarang (QRIS/VA)".
5. `/tracking/[id]` : **Simulasi Live Tracking Status**
   - Tampilan peta dummy dengan animasi rute.
   - Status stepper dinamis dengan tombol "Simulasi Maju ke Tahap Berikutnya" (untuk demo UAS 3–4 menit):
     - `1. Menunggu Mitra` → `2. Driver & Helper Menuju Kos` → `3. Loading Barang dari Kamar` → `4. Perjalanan ke Kos Baru` → `5. Bongkar Muat ke Kamar Baru` → `6. Selesai & Beri Ulasan`.
   - Kartu kontak Mitra Pengemudi (Pak Joko - Gran Max L 1234 AB) & Helper (Mas Dimas).
6. `/riwayat` : **Daftar Pesanan & Detail Invoice**
   - Riwayat pesanan aktif dan pesanan selesai, tombol unduh tanda terima, dan laporan klaim garansi.
7. `/mitra-preview` : **Simulasi Portal Mitra (Driver & Helper)**
   - Memperlihatkan sisi mitra: Order masuk, transparansi pembagian komisi 80% mitra (Rp 120.000) vs 20% platform (Rp 30.000), membuktikan kelayakan model bisnis BAB IV.
8. `/uji-pengguna` : **Suite Pengujian Pengguna & Instrumen SUS (UAS Tools)**
   - Panduan 5 skenario tugas untuk responden (Mahasiswa).
   - Lembar kuesioner interaktif 10 butir pernyataan SUS dengan skor Likert 1–5.
   - Kalkulasi otomatis Skor SUS (rumus standar John Brooke: `((Odd-1) + (5-Even)) * 2.5`), interpretasi Grade Scale (A/B/C/D) dan Adjective Rating (Acceptable/Good/Excellent).
   - Tombol ekspor hasil uji ke JSON / ringkasan teks untuk langsung disalin ke Bab Laporan Uji Pengguna UAS!

## Risks / Trade-offs

- **[Risk 1: Dosen meminta demo real-time tanpa koneksi internet yang lambat]**
  → **Mitigasi**: Seluruh aset data dummy, peta simulasi SVG/Canvas, dan gambar kendaraan di-bundle secara lokal di dalam proyek frontend. Aplikasi dapat dijalankan lancar baik secara online di Vercel maupun secara offline melalui `npm run dev` pada laptop saat presentasi.
- **[Risk 2: Navigasi alur pemesanan terasa membingungkan bagi pengguna smartphone]**
  → **Mitigasi**: Menggunakan Progress Stepper yang jelas (1 sampai 4) di bagian atas layar mobile dengan *Sticky Bottom Action Bar* ("Lanjut ke Langkah Berikutnya") agar tombol aksi selalu dalam jangkauan ibu jari (*thumb zone*).
- **[Risk 3: Pengujian SUS oleh responden luar tidak tersimpan terpusat]**
  → **Mitigasi**: Modul `/uji-pengguna` menyediakan fitur "Simpan Sesi Uji" ke LocalStorage dan fitur "Unduh Rekap Hasil Uji (JSON / CSV / Teks Laporan)", sehingga tim dapat mengumpulkan hasil dari 5+ teman kelas dan langsung melampirkannya ke laporan UAS.

## Migration Plan

1. Inisialisasi proyek Next.js 15 dengan TypeScript dan Tailwind CSS di workspace `d:\laragon\www\pindah.in`.
2. Pasang library pendukung: `lucide-react`, `clsx`, `tailwind-merge`, `canvas-confetti` (efek selesai pesanan/uji coba).
3. Buat mock data store (`/src/data/mockData.ts`) yang mencakup daftar armada, tarif dasar, rute Surabaya, daftar barang kos, dan preset pesanan.
4. Bangun komponen UI reusable (Navbar, BottomNav, Card, Stepper, Modal, Button).
5. Implementasikan 5 modul kapabilitas secara berurutan sesuai OpenSpec tasks.
6. Verifikasi build produksi (`npm run build`) dan pastikan zero error TypeScript/lint.
7. Deploy ke platform Vercel via CLI atau integrasi repositori Git.

