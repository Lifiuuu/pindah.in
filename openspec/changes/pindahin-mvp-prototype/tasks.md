## 1. Project Initialization & Foundation

- [x] 1.1 Inisialisasi Next.js 15 App Router dengan TypeScript dan Tailwind CSS
- [x] 1.2 Konfigurasi Tailwind CSS tema kustom, font, warna brand Pindah.in, dan utility classes mobile-first
- [x] 1.3 Install dependencies: Lucide React, clsx, tailwind-merge, canvas-confetti
- [x] 1.4 Setup Mock Data Store (`src/data/mockData.ts`) untuk lokasi kos Surabaya, paket armada, daftar inventaris kos, dan ulasan

## 2. Layout & Reusable Mobile-First UI Components

- [x] 2.1 Buat komponen Header/Navbar responsif dengan badge status dan navigasi cepat
- [x] 2.2 Buat komponen Bottom Navigation Bar untuk mode mobile (Beranda, Pesan, Riwayat, Uji Pengguna)
- [x] 2.3 Buat komponen UI dasar: Button, Badge, Modal/Dialog, Card, Input, Tabs, Accordion
- [x] 2.4 Setup Zustand Store (`src/store/usePindahStore.ts`) untuk persistensi state pemesanan, active order, dan riwayat di LocalStorage

## 3. Landing & Discovery Page Implementation

- [x] 3.1 Implementasi Hero Section dengan value proposition, trust badges, dan tombol CTA utama
- [x] 3.2 Implementasi Quick Cost Estimator Widget interaktif di landing page
- [x] 3.3 Implementasi Showcase 4 Nilai Solusi (Bebas Nawar, Helper Sampai Kamar, Tracking Armada, Garansi Aman)
- [x] 3.4 Implementasi Katalog Pilihan Armada (Motor Kargo, Pikap Bak, Pikap Box) dengan rincian kapasitas
- [x] 3.5 Implementasi Section Testimoni Mahasiswa UNAIR dan FAQ Pindahan Kos

## 4. Order Wizard & Pricing Calculator Implementation

- [x] 4.1 Implementasi Langkah 1: Input Alamat Asal (Kos, Kamar, Lantai/Lift) dan Alamat Tujuan beserta Jadwal Penjemputan
- [x] 4.2 Implementasi Langkah 2: Pemilihan Armada (Pikap Bak/Box/Motor Roda 3) dan Konfigurasi Helper (1 helper gratis + opsi helper tambahan)
- [x] 4.3 Implementasi Langkah 3: Checklist Inventaris Barang Kos Mahasiswa dengan indikator kapasitas muatan
- [x] 4.4 Implementasi Langkah 4: Rincian Kalkulasi Harga Transparan, Breakdown Biaya, Catatan Sopir, dan Toggle Garansi Barang
- [x] 4.5 Implementasi Sticky Bottom Action Bar untuk navigasi langkah dan ringkasan harga langsung

## 5. Payer Financing Support & Invoice Implementation

- [x] 5.1 Implementasi Halaman Konfirmasi Pembayaran (`/pesan/konfirmasi`) dengan rincian biaya lengkap
- [x] 5.2 Implementasi Fitur "Bagi Tagihan ke Orang Tua (Payer Share Link)" dengan generator tautan invoice dan dialog share WhatsApp
- [x] 5.3 Implementasi Halaman Tagihan Khusus Penyandang Dana (`/invoice/[id]`) yang ramah orang tua dengan transparansi biaya
- [x] 5.4 Implementasi Simulasi Pembayaran Instan via QRIS dan Transfer Bank dengan konfirmasi otomatis

## 6. Real-Time Order Tracking & Simulation Controller

- [x] 6.1 Implementasi Halaman Live Tracking (`/tracking/[id]`) dengan visualisasi rute interaktif, kartu armada & identitas helper
- [x] 6.2 Implementasi State Stepper Pelacakan 6 Tahap (Menunggu Driver -> Menuju Kos -> Loading Kamar -> Perjalanan -> Bongkar Muat -> Selesai)
- [x] 6.3 Implementasi "Demo Simulation Controller" (Tombol Maju Tahap Status Cepat untuk presentasi 3-4 menit di hadapan dosen)
- [x] 6.4 Implementasi Modal Penyelesaian Pesanan, Ulasan Bintang, dan Efek Confetti

## 7. Partner/Mitra Portal Preview & History

- [x] 7.1 Implementasi Halaman Riwayat Pesanan (`/riwayat`) dengan riwayat transaksi aktif & selesai serta unduh bukti tanda terima
- [x] 7.2 Implementasi Halaman Preview Portal Mitra (`/mitra-preview`) yang mendemonstrasikan transparansi komisi 20% platform vs 80% hak mitra (memvalidasi BAB IV BMC)

## 8. Built-in User Testing Suite & SUS Calculator

- [x] 8.1 Implementasi Halaman Pengujian Pengguna (`/uji-pengguna`) dengan form profil responden mahasiswa (Nama, Kampus, Angkatan)
- [x] 8.2 Implementasi Panduan Interaktif 5 Skenario Tugas Uji Coba beserta indikator Task Success
- [x] 8.3 Implementasi Kuesioner System Usability Scale (SUS) 10 Butir Pernyataan Skala Likert 1-5
- [x] 8.4 Implementasi Kalkulator Skor SUS Otomatis (formula John Brooke), Grading (A/B/C/D), Adjective Rating, dan Fitur Unduh/Salin Rekap untuk Laporan UAS

## 9. Verification, Optimization & Vercel Deployment Readiness

- [x] 9.1 Uji seluruh viewport: Mobile (375px/390px/412px), Tablet (768px), dan Desktop (1280px)
- [x] 9.2 Verifikasi build Next.js (`npm run build`) dengan zero TypeScript & linter errors
- [x] 9.3 Konfigurasi file `vercel.json` dan panduan deployment instan ke Vercel
