"use client";

import Link from "next/link";
import {
  ShieldCheck,
  PieChart,
  ArrowRight,
} from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function MitraPreviewPage() {
  const transactionTarif = 150000;
  const platformFee = 30000; // 20%
  const mitraShare = 120000; // 80%
  const driverCut = 85000;
  const helperCut = 35000;

  return (
    <div className="min-h-screen bg-surface-50 py-10 sm:py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Academic Validation Header */}
        <div className="rounded-3xl bg-brand-900 text-white p-7 sm:p-9 shadow-card">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-700/60 px-3.5 py-1 text-xs font-bold text-accent-200 border border-brand-600 mb-3">
            <PieChart className="h-4 w-4 text-accent-300" />
            <span>Validasi Finansial BAB IV Business Model Canvas</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold leading-tight">Preview Ekosistem Mitra & Bagi Hasil</h1>
          <p className="text-xs sm:text-sm text-brand-100/90 mt-2 max-w-xl leading-relaxed">
            Menunjukkan kelayakan bisnis dua sisi (*two-sided platform*): skema komisi 20% platform (Rp 30.000) vs 80%
            hak mitra pengemudi & helper (Rp 120.000) pada standar transaksi Rp 150.000.
          </p>
        </div>

        {/* Financial Unit Economics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="rounded-3xl border border-surface-200/90 bg-white p-6 shadow-subtle">
            <span className="text-[11px] text-surface-400 font-bold uppercase tracking-wider block">
              Tarif Rata-Rata (P)
            </span>
            <span className="text-2xl font-black text-surface-900 mt-1.5 block">{formatRupiah(transactionTarif)}</span>
            <span className="text-xs text-surface-500 mt-1 block">Paket pikap + 1 helper</span>
          </div>

          <div className="rounded-3xl border border-brand-200 bg-brand-50/70 p-6 shadow-subtle">
            <span className="text-[11px] text-brand-800 font-bold uppercase tracking-wider block">
              Hak Mitra (80%)
            </span>
            <span className="text-2xl font-black text-brand-900 mt-1.5 block">{formatRupiah(mitraShare)}</span>
            <span className="text-xs text-brand-700 mt-1 block">Driver Rp 85rb + Helper Rp 35rb</span>
          </div>

          <div className="rounded-3xl border border-accent-300 bg-accent-50/70 p-6 shadow-subtle">
            <span className="text-[11px] text-accent-900 font-bold uppercase tracking-wider block">
              Margin Platform (20%)
            </span>
            <span className="text-2xl font-black text-accent-950 mt-1.5 block">{formatRupiah(platformFee)}</span>
            <span className="text-xs text-accent-800 mt-1 block">BEP: 67 transaksi/bulan</span>
          </div>
        </div>

        {/* Incoming Job Simulation in Driver App */}
        <div className="rounded-3xl border border-surface-200/90 bg-white p-7 sm:p-9 shadow-subtle space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-surface-100">
            <div className="flex items-center gap-2.5">
              <span className="h-3 w-3 rounded-full bg-brand-600 animate-ping" />
              <h3 className="text-base sm:text-lg font-bold text-surface-900">Pesanan Masuk di Aplikasi Driver</h3>
            </div>
            <span className="text-xs font-mono font-bold text-surface-500">ID: PNDH-98214</span>
          </div>

          <div className="rounded-2xl bg-surface-50 p-5 border border-surface-200 space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-surface-500">Pelanggan:</span>
              <strong className="text-surface-900">Putri Atika M. (Mahasiswi UNAIR)</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-500">Rute Pindahan:</span>
              <span className="font-medium text-surface-800 text-right">
                Kost Sutorejo (Lt. 2) → Wisma Dharmawangsa (Lt. 1)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-500">Muatan Barang:</span>
              <span className="text-surface-700">Kasur Busa, Lemari Plastik, Meja Belajar, 2 Box</span>
            </div>
          </div>

          {/* Partner Share Breakdown */}
          <div className="p-5 rounded-2xl bg-brand-50/80 border border-brand-200 space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between font-bold text-brand-950">
              <span>Pendapatan Bersih Mitra untuk Trip Ini:</span>
              <span className="text-base">{formatRupiah(mitraShare)}</span>
            </div>
            <div className="flex justify-between text-brand-800 pt-2 border-t border-brand-200/80 text-xs">
              <span>• Driver (Armada & Bensin):</span>
              <span className="font-semibold">{formatRupiah(driverCut)}</span>
            </div>
            <div className="flex justify-between text-brand-800 text-xs">
              <span>• Helper (Bongkar-Muat Sampai Kamar):</span>
              <span className="font-semibold">{formatRupiah(helperCut)}</span>
            </div>
          </div>

          <div className="pt-2">
            <Link href="/tracking/PNDH-98214" className="block">
              <Button size="lg" className="w-full text-xs sm:text-sm py-3.5">
                Terima Pesanan & Buka Navigasi
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Academic BEP Analysis Box */}
        <div className="rounded-3xl border border-surface-200/90 bg-white p-7 sm:p-8 shadow-subtle text-xs sm:text-sm leading-relaxed text-surface-600 space-y-3">
          <h4 className="text-sm sm:text-base font-bold text-surface-900 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-brand-600" />
            Catatan Kelayakan Finansial (Laporan Bisnis Bab 4.3)
          </h4>
          <p>
            • <strong>Biaya Tetap (Fixed Cost)</strong>: Rp 2.000.000 / bulan (Server & Cloud Hosting Rp 500rb, Pemasaran
            Digital Rp 1jt, Lisensi & Domain Rp 300rb, Cadangan Garansi Rp 200rb).
          </p>
          <p>
            • <strong>Titik Impas (BEP)</strong>: Rp 2.000.000 / Rp 30.000 = <strong>67 transaksi / bulan</strong> (hanya
            menyerap 40% dari estimasi 167 mahasiswa pindah per bulan di 10.000 populasi kampus target).
          </p>
        </div>
      </div>
    </div>
  );
}
