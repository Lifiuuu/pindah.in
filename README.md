# Pindah.in

> **Platform Logistik Pindahan Kos Mahasiswa Terintegrasi Surabaya**  
> Proyek Akhir Mata Kuliah Kewirausahaan Bidang TI (FVK25612002) · Program Studi D4 Teknik Informatika Fakultas Vokasi Universitas Airlangga.

[![Pindah.in CI Pipeline](https://github.com/Lifiuuu/pindah.in/actions/workflows/ci.yml/badge.svg)](https://github.com/Lifiuuu/pindah.in/actions)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
![Next.js 15](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)
![React 19](https://img.shields.io/badge/React-19.0-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-teal?logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)

---

## Arsitektur CI/CD (Continuous Integration & Continuous Deployment)

Meskipun berstatus prototipe/mockup untuk pengujian pengguna, proyek ini menerapkan standar **CI/CD Industri Modern**:

```
[ Developer / Mahasiswa ]
          │
          ▼  (git push origin main)
┌────────────────────────────────────────┐
│  GitHub Repository (Lifiuuu/pindah.in)  │
└───────────────────┬────────────────────┘
                    │
         ┌──────────┴──────────┐
         ▼                     ▼
┌──────────────────┐  ┌─────────────────────────┐
│ Continuous       │  │ Continuous Deployment   │
│ Integration (CI) │  │ (CD) via Vercel Engine  │
├──────────────────┤  ├─────────────────────────┤
│ • GitHub Actions │  │ • Auto Webhook Trigger  │
│ • Node.js 20 Env │  │ • Next.js App Router    │
│ • TypeScript     │  │ • Edge Optimization     │
│   Typecheck      │  │ • Instant Production    │
│ • Production     │  │   URL                   │
│   Build Check    │  │ • Preview Deployment    │
└──────────────────┘  │   for Pull Requests     │
                      └─────────────────────────┘
```

1. **Continuous Integration (CI)** via **GitHub Actions** (`.github/workflows/ci.yml`):
   - Dijalankan otomatis setiap ada `push` atau `pull request` ke branch `main`.
   - Menguji keabsahan tipe TypeScript secara ketat (`npm run typecheck`) dan menguji build produksi Next.js (`npm run build`).
2. **Continuous Deployment (CD)** via **Vercel**:
   - Vercel terhubung langsung dengan repositori GitHub `Lifiuuu/pindah.in`.
   - Setiap commit yang lolos pada branch `main` langsung di-build dan di-deploy ke jaringan CDN global Vercel tanpa downtime.

---

## Latar Belakang & Validasi Bisnis

Berdasarkan hasil survei kuesioner mahasiswa perantau di Surabaya (*Business Plan Pindah.in*), 100% responden menyatakan kekhawatiran berat (skor 5/5) pada:
1. **Ketidakpastian Tarif**: Sewa pikap konvensional memaksa tawar-menawar sepihak dan rawan biaya tambahan di akhir.
2. **Ketiadaan Tenaga Angkut (Helper)**: Kesulitan mengangkat barang berat (kasur, lemari, kardus) dari kamar kos ke armada.
3. **Keterlambatan Jadwal**: 2 dari 3 pengguna kendaraan mengalami keterlambatan penjemputan.

Platform **Pindah.in** hadir sebagai solusi berbasis teknologi web mobile-first yang menghubungkan mahasiswa dengan armada pikap terverifikasi dan tenaga helper profesional *door-to-door*.

---

## Pembagian Role & Endpoint

1. **Role 1: Pelanggan (Mahasiswa)**:
   - `/`: Beranda, kalkulator estimasi cepat, 4 pilar solusi, showcase armada, testimoni UNAIR.
   - `/pesan`: Wizard pemesanan 4 langkah (rute, armada pikap + helper, checklist inventaris barang kos, review tarif).
   - `/pesan/konfirmasi`: Barcode QRIS resmi di layar, tombol salin detail pesanan & kirim ke WhatsApp orang tua jika dibantu bayar, dan tombol simulasi pelunasan langsung.
   - `/tracking/[id]`: Live tracking armada pikap dengan peta rute Surabaya (Kampus A, B, C UNAIR), kontak driver & helper, dan tombol controller simulasi demo 3 menit.
   - `/riwayat`: Daftar riwayat pesanan dengan filter status.

2. **Role 2: Mitra Kerja (Driver & Helper)**:
   - `/mitra`: Portal driver pikap & helper dengan saklar online/offline, penerimaan pesanan masuk sekitar kampus UNAIR, eksekusi tahapan jemput-angkut-antar, dan dompet bagi hasil 80% (Rp 120.000 / trip).

3. **Role 3: Admin Operasional & Bisnis**:
   - `/admin`: Dashboard eksekutif pemantauan target BEP 67 transaksi/bulan (Bab IV Business Model Canvas), margin komisi 20% platform (Rp 30.000/order), monitoring sebaran armada Surabaya, dan verifikasi mitra.

---

## Cara Menjalankan secara Lokal

Pastikan Node.js (versi 18+) sudah terpasang di komputermu:

```bash
# 1. Masuk ke direktori
cd pindah.in

# 2. Pasang dependensi
npm install

# 3. Uji validitas tipe dan build
npm run typecheck
npm run build

# 4. Jalankan server pengembangan
npm run dev
```

Buka peramban di `http://localhost:3000`.

---

## Panduan Menghubungkan ke Vercel (CI/CD Setup)

Aplikasi ini telah dikonfigurasi dengan `vercel.json` dan siap di-deploy langsung:

1. Pastikan seluruh commit telah ter-push ke GitHub:
   ```bash
   git push origin main
   ```
2. Buka [Vercel Dashboard](https://vercel.com/new).
3. Hubungkan akun GitHub milikmu dan pilih repositori **`pindah.in`** (atau `Lifiuuu/pindah.in`).
4. Vercel akan otomatis mendeteksi:
   - **Framework Preset**: `Next.js`
   - **Build Command**: `next build` (atau `npm run build`)
   - **Output Directory**: `.next`
5. Klik **Deploy**.
6. Selesai! Setiap kali kamu melakukan `git commit` dan `git push origin main`, Vercel akan **otomatis melakukan redeploy secara Continuous Deployment (CD)** dalam hitungan detik.

---

## Pengembang & Tim Proyek (Kelompok 4)

- **Mata Kuliah**: Kewirausahaan Bidang TI (FVK25612002)
- **Program Studi**: D4 Teknik Informatika Fakultas Vokasi Universitas Airlangga
- **Dosen Pengampu**: Nambi Sembilu, S.Kom., M.Kom.
- **Anggota Kelompok**:
  1. Putri Atika Mahardika
  2. Faatin Sausan Firdaus
  3. Maulidina Naurah
  4. Alifia Putri
  5. Reta Hadiana
