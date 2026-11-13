# Pindah.in 🛻📦

> **Platform Logistik Pindahan Kos Mahasiswa Terintegrasi Surabaya**  
> Proyek Akhir Mata Kuliah Kewirausahaan Bidang TI (FVK25612002) · Program Studi D4 Teknik Informatika Fakultas Vokasi Universitas Airlangga.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
![Next.js 15](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)
![React 19](https://img.shields.io/badge/React-19.0-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-teal?logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)

---

## 📌 Latar Belakang & Validasi Bisnis

Berdasarkan hasil survei kuesioner mahasiswa perantau di Surabaya (*Business Plan Pindah.in*), 100% responden menyatakan kekhawatiran berat (skor 5/5) pada:
1. **Ketidakpastian Tarif**: Sewa pikap konvensional memaksa tawar-menawar sepihak dan rawan biaya tambahan di akhir.
2. **Ketiadaan Tenaga Angkut (Helper)**: Kesulitan mengangkat barang berat (kasur, lemari, kardus) dari kamar kos ke armada.
3. **Keterlambatan Jadwal**: 2 dari 3 pengguna kendaraan mengalami keterlambatan penjemputan.

Platform **Pindah.in** hadir sebagai solusi berbasis teknologi web mobile-first yang menghubungkan mahasiswa dengan armada pikap terverifikasi dan tenaga helper profesional *door-to-door*.

---

## ✨ Fitur Unggulan Prototipe

1. **Kalkulator Tarif Otomatis & Transparan** (`/` & `/pesan`):
   - Perhitungan harga instan berbasis jarak tempuh, tipe kendaraan, dan kompensasi tangga lantai kos tanpa biaya siluman.
2. **Pilihan Armada Lengkap**:
   - Pikap Bak Terbuka (Standar Populer), Pikap Box Aluminium (Anti Hujan), dan Motor Kargo Roda Tiga (Gang Sempit).
   - Paket sudah mencakup 1 orang Helper Door-to-Door (opsi tambah Helper ke-2).
3. **Inventaris Checklist Barang Kos Mahasiswa**:
   - Menghitung persentase keterisian kapasitas muatan armada secara langsung.
4. **Fitur Tagihan Penyandang Dana (Payer Flow)** (`/pesan/konfirmasi` & `/invoice/[id]`):
   - Menghasilkan tautan resmi yang dapat dibagikan ke WhatsApp orang tua selaku penyandang dana, dilengkapi QRIS instan dan rincian transparan.
5. **Simulasi Live Tracking Real-Time** (`/tracking/[id]`):
   - Dilengkapi **Demo Simulation Controller** (tombol maju cepat status) untuk kebutuhan demonstrasi 3–4 menit di hadapan dosen penguji UAS.
6. **Preview Portal Mitra (Ekosistem 80:20)** (`/mitra-preview`):
   - Memvalidasi pembagian hak mitra 80% (Rp 120.000) vs margin platform 20% (Rp 30.000) dari standar transaksi Rp 150.000 (sesuai Bab IV BMC).
7. **Suite Pengujian Pengguna & Kalkulator SUS** (`/uji-pengguna`):
   - Panduan 5 skenario tugas, kuesioner baku 10 pertanyaan *System Usability Scale* (John Brooke), kalkulasi skor otomatis (0–100), dan fitur salin laporan untuk pemenuhan berkas UAS $\ge$ 5 responden target.

---

## 🚀 Cara Menjalankan secara Lokal

Pastikan Node.js (versi 18+) sudah terpasang di komputermu:

```bash
# 1. Masuk ke direktori
cd pindah.in

# 2. Pasang dependensi
npm install

# 3. Jalankan server pengembangan
npm run dev
```

Buka peramban di `http://localhost:3000`.

---

## 🌐 Panduan Deploy ke Vercel

Aplikasi ini telah dikonfigurasi dan diuji agar siap di-deploy langsung ke **Vercel**:

### Opsi 1: Deploy via Vercel Dashboard (Rekomendasi)
1. Push repositori ini ke GitHub (`git push origin main`).
2. Masuk ke dashboard [Vercel](https://vercel.com).
3. Klik **Add New Project** dan pilih repositori `pindah.in`.
4. Framework Preset akan otomatis terdeteksi sebagai **Next.js**.
5. Klik **Deploy**. URL publik langsung aktif dalam kurun waktu 1 menit!

### Opsi 2: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 👥 Tim Pengembang (Kelompok 4)
- **Putri Atika Mahardika Dewi** (434241080)
- **Faatin Sausan Firdaus** (434241090)
- **Maulidina Naurah Salsabila** (434241098)
- **Alifia Putri Marizka** (434241103)
- **Reta Hadiana Unggula** (434241107)

*Program Studi D4 Teknik Informatika · Fakultas Vokasi · Universitas Airlangga 2026*

