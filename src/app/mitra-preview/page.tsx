"use client";

import Link from "next/link";
import {
  Store,
  DollarSign,
  TrendingUp,
  Truck,
  Users,
  ShieldCheck,
  CheckCircle2,
  Clock,
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
    <div className="min-h-screen bg-slate-100/90 py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Academic Validation Header */}
        <div className="rounded-3xl bg-slate-900 text-white p-6 shadow-card">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/20 px-3 py-1 text-xs font-bold text-teal-300 border border-teal-500/30 mb-2">
            <PieChart className="h-3.5 w-3.5 text-brand-400" />
            <span>Validasi Finansial BAB IV Business Model Canvas</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold">Preview Ekosistem Mitra & Bagi Hasil</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
            Menunjukkan kelayakan bisnis dua sisi (*two-sided platform*): skema komisi 20% platform (Rp 30.000) vs 80%
            hak mitra pengemudi & helper (Rp 120.000) pada standar transaksi Rp 150.000.
          </p>
        </div>

        {/* Financial Unit Economics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-[11px] text-slate-400 font-bold uppercase block">Rata-Rata Tarif Transaksi (P)</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">{formatRupiah(transactionTarif)}</span>
            <span className="text-xs text-slate-500 mt-1 block">Paket pikap + 1 helper</span>
          </div>

          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-5 shadow-sm">
            <span className="text-[11px] text-emerald-800 font-bold uppercase block">Hak Mitra (80%)</span>
            <span className="text-2xl font-black text-emerald-700 mt-1 block">{formatRupiah(mitraShare)}</span>
            <span className="text-xs text-emerald-600 mt-1 block">Driver Rp 85rb + Helper Rp 35rb</span>
          </div>

          <div className="rounded-3xl border border-brand-200 bg-brand-50/60 p-5 shadow-sm">
            <span className="text-[11px] text-brand-800 font-bold uppercase block">Margin Platform (20%)</span>
            <span className="text-2xl font-black text-brand-700 mt-1 block">{formatRupiah(platformFee)}</span>
            <span className="text-xs text-brand-600 mt-1 block">BEP: 67 transaksi/bulan</span>
          </div>
        </div>

        {/* Incoming Job Simulation in Driver App */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
              <h3 className="text-base font-bold text-slate-900">Pesanan Masuk di Aplikasi Driver</h3>
            </div>
            <span className="text-xs font-mono font-bold text-slate-500">ID: PNDH-98214</span>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Pelanggan:</span>
              <strong className="text-slate-900">Putri Atika M. (Mahasiswi UNAIR)</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Rute Pindahan:</span>
              <span className="font-medium text-slate-800 text-right">
                Kost Sutorejo (Lt. 2) → Wisma Dharmawangsa (Lt. 1)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Muatan Barang:</span>
              <span className="text-slate-700">Kasur Busa, Lemari Plastik, Meja Belajar, 2 Box</span>
            </div>
          </div>

          {/* Partner Share Breakdown */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2 text-xs">
            <div className="flex justify-between font-bold text-emerald-900">
              <span>Pendapatan Bersih Mitra untuk Trip Ini:</span>
              <span className="text-sm">{formatRupiah(mitraShare)}</span>
            </div>
            <div className="flex justify-between text-emerald-700 pt-1 border-t border-emerald-200/60 text-[11px]">
              <span>• Driver (Armada & Bensin):</span>
              <span>{formatRupiah(driverCut)}</span>
            </div>
            <div className="flex justify-between text-emerald-700 text-[11px]">
              <span>• Helper (Bongkar-Muat Sampai Kamar):</span>
              <span>{formatRupiah(helperCut)}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Link href="/tracking/PNDH-98214" className="flex-1">
              <Button size="md" className="w-full text-xs">
                Terima Pesanan & Buka Navigasi
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Academic BEP Analysis Box */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-xs leading-relaxed text-slate-600 space-y-2">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-brand-600" />
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

