"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  Truck,
  Users,
  CheckCircle2,
  DollarSign,
  MapPin,
  ShieldCheck,
  Building,
  Layers,
  ArrowLeft,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"bep" | "orders" | "mitra">("bep");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Business plan metrics
  const monthlyTargetOrders = 67; // BEP target in business plan
  const currentCompletedOrders = 48; // Current mock progress
  const bepPercentage = Math.round((currentCompletedOrders / monthlyTargetOrders) * 100);
  const fixedCostPerMonth = 2000000;
  const platformMarginPerOrder = 30000; // 20% of Rp 150.000
  const currentPlatformGrossProfit = currentCompletedOrders * platformMarginPerOrder; // Rp 1.440.000
  const grossTurnover = currentCompletedOrders * 150000; // Rp 7.200.000
  const mitraPaidTotal = grossTurnover - currentPlatformGrossProfit; // Rp 5.760.000

  const activeSurabayaOrders = [
    {
      id: "PNDH-98214",
      customer: "Nadira Safitri",
      campus: "UNAIR Kampus C → Kampus B",
      status: "Dalam Perjalanan Pikap",
      driver: "Pak Joko Slamet (Gran Max L 1832 AB)",
      helper: "Mas Dimas Prasetyo",
      amount: 150000,
      platformCut: 30000,
    },
    {
      id: "PNDH-98220",
      customer: "Ahmad Rizky",
      campus: "Kost Sutorejo → Asrama Kampus C",
      status: "Mencari Armada Pikap",
      driver: "Belum Ditugaskan",
      helper: "1 Helper Kos",
      amount: 150000,
      platformCut: 30000,
    },
    {
      id: "PNDH-98199",
      customer: "Bima Pratama",
      campus: "Tambaksari (Kampus A) → Gubeng Kertajaya",
      status: "Selesai & Dinilai (Rating 5.0)",
      driver: "Pak Bambang Wijaya (Viar L 4190 XY)",
      helper: "Mas Dimas",
      amount: 120000,
      platformCut: 24000,
    },
  ];

  const registeredPartners = [
    {
      id: "MTR-01",
      name: "Pak Joko Slamet",
      role: "Driver Pikap Bak",
      vehicle: "Daihatsu Gran Max (L 1832 AB)",
      rating: 4.9,
      trips: 184,
      status: "Aktif Terverifikasi",
    },
    {
      id: "MTR-02",
      name: "Mas Dimas Prasetyo",
      role: "Helper Angkut Kamar Kos",
      vehicle: "Tenaga Door-to-Door",
      rating: 4.9,
      trips: 142,
      status: "Aktif Terverifikasi",
    },
    {
      id: "MTR-03",
      name: "Pak Bambang Wijaya",
      role: "Driver Motor Kargo Roda 3",
      vehicle: "Viar Karya 200 (L 4190 XY)",
      rating: 4.8,
      trips: 96,
      status: "Aktif Terverifikasi",
    },
    {
      id: "MTR-04",
      name: "Cak Totok Subagyo",
      role: "Driver Pikap Box Tertutup",
      vehicle: "Gran Max Box (L 9920 CD)",
      rating: 5.0,
      trips: 12,
      status: "Menunggu Verifikasi SIM B1",
    },
  ];

  return (
    <div className="min-h-screen bg-surface-100/60 py-6 sm:py-10 px-4 sm:px-6 font-sans">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 rounded-2xl bg-surface-900 text-white px-4 py-3 shadow-xl text-xs font-semibold flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            {toastMessage}
          </div>
        )}

        {/* Dashboard Title Header */}
        <div className="rounded-3xl bg-surface-900 text-white p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-accent-400/20 text-accent-300 border border-accent-400/30 px-3 py-0.5 text-xs font-bold">
                Dashboard Manajemen Eksekutif
              </span>
              <span className="text-xs text-surface-400 font-mono">Periode: Semester Ganjil 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Pindah<span className="text-accent-400">.in</span> Business Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-surface-300 max-w-xl">
              Memantau indikator operasional logistik pindahan kos mahasiswa, validasi unit economics BEP 67 transaksi,
              dan eksekusi bagi hasil dua sisi platform di Surabaya.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="rounded-2xl bg-surface-800 border border-surface-700 p-4 text-xs space-y-1">
              <span className="text-surface-400 block text-[11px]">Cakupan Operasional:</span>
              <strong className="text-white block font-bold">Surabaya Timur & Pusat</strong>
              <span className="text-accent-300 text-[11px] block">Zona Kampus Terintegrasi</span>
            </div>
          </div>
        </div>

        {/* 4 Financial & BEP KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: BEP Progress */}
          <div className="rounded-3xl border border-surface-200 bg-white p-5 shadow-subtle space-y-2">
            <span className="text-[11px] font-bold text-surface-500 uppercase tracking-wider block">
              Progres BEP Bulanan
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-surface-900">
                {currentCompletedOrders} <span className="text-sm font-normal text-surface-500">/ {monthlyTargetOrders} order</span>
              </span>
              <span className="text-xs font-bold text-brand-800 bg-brand-50 px-2 py-0.5 rounded-lg border border-brand-200">
                {bepPercentage}%
              </span>
            </div>
            <div className="w-full bg-surface-200 h-2 rounded-full overflow-hidden">
              <div className="bg-brand-600 h-full rounded-full transition-all duration-500" style={{ width: `${bepPercentage}%` }} />
            </div>
            <span className="text-[10px] text-surface-400 block">
              Kurang {monthlyTargetOrders - currentCompletedOrders} pesanan untuk menutup Fixed Cost Rp 2jt/bln.
            </span>
          </div>

          {/* Card 2: Gross Turnover */}
          <div className="rounded-3xl border border-surface-200 bg-white p-5 shadow-subtle space-y-2">
            <span className="text-[11px] font-bold text-surface-500 uppercase tracking-wider block">
              Total Omset Layanan
            </span>
            <div className="text-2xl font-black text-surface-900">{formatRupiah(grossTurnover)}</div>
            <span className="text-xs text-emerald-700 font-semibold inline-flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" /> 48 transaksi terlaksana
            </span>
            <span className="text-[10px] text-surface-400 block">
              Rata-rata Rp 150.000 / transaksi pindahan
            </span>
          </div>

          {/* Card 3: Platform Margin (20%) */}
          <div className="rounded-3xl border border-accent-300 bg-accent-50/70 p-5 shadow-subtle space-y-2">
            <span className="text-[11px] font-bold text-accent-900 uppercase tracking-wider block">
              Margin Platform (20%)
            </span>
            <div className="text-2xl font-black text-accent-950">{formatRupiah(currentPlatformGrossProfit)}</div>
            <span className="text-xs text-accent-800 font-semibold block">
              Rp 30.000 net per order
            </span>
            <span className="text-[10px] text-accent-700 block">
              Menutup Fixed Cost Rp 2.000.000/bln
            </span>
          </div>

          {/* Card 4: Mitra Share Paid (80%) */}
          <div className="rounded-3xl border border-brand-200 bg-brand-50/70 p-5 shadow-subtle space-y-2">
            <span className="text-[11px] font-bold text-brand-900 uppercase tracking-wider block">
              Hak Mitra Tersalurkan (80%)
            </span>
            <div className="text-2xl font-black text-brand-950">{formatRupiah(mitraPaidTotal)}</div>
            <span className="text-xs text-brand-800 font-semibold block">
              Driver 85rb · Helper 35rb
            </span>
            <span className="text-[10px] text-brand-700 block">
              Pemberdayaan tenaga lokal Surabaya
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex rounded-2xl bg-surface-200/80 p-1.5 gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab("bep")}
            className={`flex-1 py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-2 ${
              activeTab === "bep" ? "bg-white text-surface-900 shadow-sm" : "text-surface-600 hover:text-surface-900"
            }`}
          >
            <BarChart3 className="h-4 w-4 text-brand-600" />
            <span>Validasi Finansial & BEP (Bab IV)</span>
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex-1 py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-2 ${
              activeTab === "orders" ? "bg-white text-surface-900 shadow-sm" : "text-surface-600 hover:text-surface-900"
            }`}
          >
            <Truck className="h-4 w-4 text-brand-600" />
            <span>Monitoring Order Surabaya ({activeSurabayaOrders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("mitra")}
            className={`flex-1 py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-2 ${
              activeTab === "mitra" ? "bg-white text-surface-900 shadow-sm" : "text-surface-600 hover:text-surface-900"
            }`}
          >
            <Users className="h-4 w-4 text-brand-600" />
            <span>Kelola Mitra ({registeredPartners.length})</span>
          </button>
        </div>

        {/* TAB 1: VALIDASI BEP & UNIT ECONOMICS */}
        {activeTab === "bep" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-surface-200 bg-white p-6 sm:p-8 shadow-subtle space-y-6">
              <div className="border-b border-surface-100 pb-4">
                <h3 className="text-lg font-bold text-surface-900">
                  Kalkulasi Titik Impas (Break-Even Point / BEP) Pindah.in
                </h3>
                <p className="text-xs text-surface-500 mt-1 leading-relaxed">
                  Berdasarkan kalkulasi operasional bisnis logistik mahasiswa: Platform berbasis komisi 20% tanpa aset kendaraan fisik (*asset-light model*).
                </p>
              </div>

              {/* BEP Formula Box */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-surface-50 p-5 border border-surface-200 text-xs space-y-1.5">
                  <span className="font-bold text-surface-500 block uppercase tracking-wider text-[11px]">
                    1. Fixed Cost (FC)
                  </span>
                  <div className="text-lg font-black text-surface-900">{formatRupiah(fixedCostPerMonth)} / bln</div>
                  <ul className="text-[11px] text-surface-600 space-y-1 pt-1 border-t border-surface-200">
                    <li>• Hosting Server & Domain: Rp 450.000</li>
                    <li>• Kuota & Komunikasi: Rp 250.000</li>
                    <li>• Operasional Admin: Rp 800.000</li>
                    <li>• Promosi Kampus & Flyer: Rp 500.000</li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-surface-50 p-5 border border-surface-200 text-xs space-y-1.5">
                  <span className="font-bold text-surface-500 block uppercase tracking-wider text-[11px]">
                    2. Margin Kontribusi (CM)
                  </span>
                  <div className="text-lg font-black text-brand-800">{formatRupiah(platformMarginPerOrder)} / order</div>
                  <ul className="text-[11px] text-surface-600 space-y-1 pt-1 border-t border-surface-200">
                    <li>• Tarif Standar: Rp 150.000</li>
                    <li>• Hak Mitra (80%): Rp 120.000</li>
                    <li>• Platform Fee (20%): Rp 30.000</li>
                    <li>• Margin Kontribusi = 20% Net</li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-brand-50/70 p-5 border border-brand-200 text-xs space-y-1.5">
                  <span className="font-bold text-brand-900 block uppercase tracking-wider text-[11px]">
                    3. Target BEP Pesanan
                  </span>
                  <div className="text-2xl font-black text-brand-950">67 Pesanan / bln</div>
                  <p className="text-[11px] text-brand-800 pt-1 border-t border-brand-200 leading-relaxed">
                    Formula: FC / CM = Rp 2.000.000 / Rp 30.000 = <strong>66.67 ≈ 67 Transaksi</strong>.
                    Target ini setara dengan hanya 2.2 pesanan per hari di seluruh kawasan kampus Surabaya.
                  </p>
                </div>
              </div>

              {/* Status Simulation Action */}
              <div className="rounded-2xl bg-surface-50 p-5 border border-surface-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs">
                  <strong className="text-surface-900 block font-bold">Simulasi Tambah 1 Pesanan Selesai</strong>
                  <span className="text-surface-500">Uji langsung lonjakan omset dan laba bersih platform saat presentasi</span>
                </div>
                <Button
                  onClick={() => showToast("Simulasi berhasil! Transaksi selesai tercatat, komisi platform bertambah Rp 30.000.")}
                  className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-4 py-2 rounded-xl"
                >
                  + Tambah 1 Order Selesai
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MONITORING ORDER SURABAYA */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            <div className="rounded-3xl border border-surface-200 bg-white p-6 shadow-subtle space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-100">
                <h3 className="text-base font-bold text-surface-900">
                  Daftar Pesanan Lapangan di Surabaya
                </h3>
                <span className="text-xs text-surface-500">Kawasan UNAIR Kampus A, B, C</span>
              </div>

              <div className="divide-y divide-surface-100">
                {activeSurabayaOrders.map((ord) => (
                  <div key={ord.id} className="py-4 space-y-2 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-surface-700 bg-surface-100 px-2 py-0.5 rounded-md">
                          {ord.id}
                        </span>
                        <strong className="text-surface-900 text-sm">{ord.customer}</strong>
                      </div>
                      <span className="inline-flex items-center gap-1 font-bold text-brand-800 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200 text-[11px]">
                        {ord.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-surface-600">
                      <div>
                        <span className="text-[11px] text-surface-400 block">Rute Kampus:</span>
                        <span className="font-medium text-surface-800">{ord.campus}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-surface-400 block">Mitra Ditugaskan:</span>
                        <span className="font-medium text-surface-800">{ord.driver}</span>
                      </div>
                      <div className="sm:text-right">
                        <span className="text-[11px] text-surface-400 block">Total Tagihan (Komisi 20%):</span>
                        <strong className="text-surface-900 font-bold">
                          {formatRupiah(ord.amount)} ({formatRupiah(ord.platformCut)})
                        </strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KELOLA MITRA */}
        {activeTab === "mitra" && (
          <div className="space-y-4">
            <div className="rounded-3xl border border-surface-200 bg-white p-6 shadow-subtle space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-100">
                <h3 className="text-base font-bold text-surface-900">
                  Verifikasi & Database Mitra Armada Surabaya
                </h3>
                <span className="text-xs text-surface-500">{registeredPartners.length} mitra tercatat</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {registeredPartners.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 rounded-2xl border border-surface-200 bg-surface-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-surface-500">{m.id}</span>
                        <strong className="text-sm font-bold text-surface-900">{m.name}</strong>
                        <span className="rounded-full bg-surface-200 px-2 py-0.5 text-[10px] font-semibold text-surface-700">
                          {m.role}
                        </span>
                      </div>
                      <p className="text-surface-600">
                        {m.vehicle} · {m.trips} trip sukses · Rating {m.rating} / 5.0
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                          m.status.includes("Aktif")
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-amber-100 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {m.status}
                      </span>
                      {m.status.includes("Menunggu") && (
                        <Button
                          onClick={() => showToast(`Dokumen mitra ${m.name} telah disetujui!`)}
                          className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl"
                        >
                          Approve
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Switcher */}
        <div className="text-center pt-6 pb-12 space-x-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-surface-500 hover:text-brand-800 transition"
          >
            ← Kembali ke Tampilan Pelanggan
          </Link>
          <span className="text-surface-300">·</span>
          <Link
            href="/mitra"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-surface-500 hover:text-brand-800 transition"
          >
            Buka Portal Mitra Driver →
          </Link>
        </div>
      </div>
    </div>
  );
}

