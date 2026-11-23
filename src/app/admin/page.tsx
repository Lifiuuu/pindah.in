"use client";

import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Truck,
  Users,
  CheckCircle2,
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

  // Business Intelligence Mock Data
  const monthlyTargetOrders = 67; // BEP target
  const currentCompletedOrders = 48; // Transaksi berjalan
  const bepPercentage = Math.round((currentCompletedOrders / monthlyTargetOrders) * 100);

  const averageOrderPrice = 150000;
  const grossTurnover = currentCompletedOrders * averageOrderPrice; // Rp 7.200.000
  const platformMarginPerOrder = 30000; // 20%
  const currentPlatformGrossProfit = currentCompletedOrders * platformMarginPerOrder; // Rp 1.440.000
  const fixedCostPerMonth = 2000000; // Rp 2.000.000
  const mitraPaidTotal = currentCompletedOrders * 120000; // Rp 5.760.000 (80%)

  const activeSurabayaOrders = [
    {
      id: "PNDH-98214",
      customer: "Nadira Safitri",
      campus: "Sutorejo (UNAIR C) → Dharmawangsa (UNAIR B)",
      driver: "Pak Joko Slamet (Gran Max L 1832 AB)",
      status: "Dalam Perjalanan",
      amount: 150000,
      platformCut: 30000,
    },
    {
      id: "PNDH-98218",
      customer: "Bima Pratama",
      campus: "Gebang Sukolilo (ITS) → Manyar Kertoarjo",
      driver: "Cak Totok (Gran Max Box L 9920 CD)",
      status: "Muat Barang di Kos",
      amount: 175000,
      platformCut: 35000,
    },
    {
      id: "PNDH-98222",
      customer: "Siti Rahmawati",
      campus: "Ketintang (UNESA) → Rungkut Madya (UPN)",
      driver: "Mas Rudi (Viar Karya Roda-3 L 4410 EF)",
      status: "Menuju Kos Asal",
      amount: 120000,
      platformCut: 24000,
    },
  ];

  const registeredPartners = [
    {
      id: "MTR-01",
      name: "Pak Joko Slamet",
      role: "Driver Pikap Bak",
      vehicle: "Gran Max Bak (L 1832 AB)",
      rating: 4.9,
      trips: 34,
      status: "Aktif Terverifikasi",
    },
    {
      id: "MTR-02",
      name: "Mas Dimas Prasetyo",
      role: "Tenaga Helper Door-to-Door",
      vehicle: "Mitra Lapangan Partner",
      rating: 5.0,
      trips: 41,
      status: "Aktif Terverifikasi",
    },
    {
      id: "MTR-03",
      name: "Mas Rudi Hartono",
      role: "Driver Roda Tiga",
      vehicle: "Viar Karya 200 (L 4410 EF)",
      rating: 4.8,
      trips: 18,
      status: "Aktif Terverifikasi",
    },
    {
      id: "MTR-04",
      name: "Cak Totok Subagyo",
      role: "Driver Pikap Box",
      vehicle: "Gran Max Box (L 9920 CD)",
      rating: 5.0,
      trips: 12,
      status: "Menunggu Verifikasi SIM",
    },
  ];

  return (
    <div className="min-h-screen bg-surface-50 py-5 sm:py-8 px-4 sm:px-6 font-sans">
      <div className="mx-auto max-w-4xl space-y-4">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 rounded-2xl bg-surface-900 text-white px-4 py-2.5 shadow-xl text-xs font-semibold flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            {toastMessage}
          </div>
        )}

        {/* Compact Admin Header */}
        <div className="rounded-2xl bg-surface-900 text-white p-4 sm:p-5 shadow-sm flex items-center justify-between gap-3">
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white">
              Dashboard Manajemen Operasional
            </h1>
            <p className="text-xs text-surface-400">Monitoring performa transaksi, BEP, dan armada di Surabaya</p>
          </div>
          <span className="text-[11px] font-mono text-accent-300 bg-surface-800 px-3 py-1 rounded-full border border-surface-700 shrink-0">
            Surabaya · 2026
          </span>
        </div>

        {/* 4 Clean Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Card 1: BEP Progress */}
          <div className="rounded-2xl border border-surface-200/80 bg-white p-3.5 sm:p-4 shadow-2xs space-y-1.5">
            <span className="text-[10px] font-bold text-surface-400 uppercase tracking-wider block">
              Progres BEP
            </span>
            <div className="text-lg sm:text-xl font-black text-surface-900">
              {currentCompletedOrders} <span className="text-xs font-normal text-surface-500">/ {monthlyTargetOrders}</span>
            </div>
            <div className="w-full bg-surface-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-brand-600 h-full rounded-full" style={{ width: `${bepPercentage}%` }} />
            </div>
            <span className="text-[10px] text-surface-500 font-medium block">{bepPercentage}% tercapai</span>
          </div>

          {/* Card 2: Gross Turnover */}
          <div className="rounded-2xl border border-surface-200/80 bg-white p-3.5 sm:p-4 shadow-2xs space-y-1.5">
            <span className="text-[10px] font-bold text-surface-400 uppercase tracking-wider block">
              Total Omset
            </span>
            <div className="text-lg sm:text-xl font-black text-surface-900">{formatRupiah(grossTurnover)}</div>
            <span className="text-[10px] text-emerald-700 font-semibold inline-flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> 48 transaksi
            </span>
          </div>

          {/* Card 3: Platform Margin (20%) */}
          <div className="rounded-2xl border border-surface-200/80 bg-white p-3.5 sm:p-4 shadow-2xs space-y-1.5">
            <span className="text-[10px] font-bold text-surface-400 uppercase tracking-wider block">
              Margin Platform (20%)
            </span>
            <div className="text-lg sm:text-xl font-black text-brand-800">{formatRupiah(currentPlatformGrossProfit)}</div>
            <span className="text-[10px] text-surface-500 block">Rp 30rb net / order</span>
          </div>

          {/* Card 4: Mitra Share (80%) */}
          <div className="rounded-2xl border border-surface-200/80 bg-white p-3.5 sm:p-4 shadow-2xs space-y-1.5">
            <span className="text-[10px] font-bold text-surface-400 uppercase tracking-wider block">
              Hak Mitra (80%)
            </span>
            <div className="text-lg sm:text-xl font-black text-emerald-800">{formatRupiah(mitraPaidTotal)}</div>
            <span className="text-[10px] text-surface-500 block">Tersalurkan ke driver & helper</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex rounded-xl bg-surface-200/70 p-1 border border-surface-200 gap-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("bep")}
            className={`flex-1 py-2 px-2.5 rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === "bep" ? "bg-white text-surface-900 shadow-2xs" : "text-surface-600 hover:text-surface-900"
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5 text-brand-600" />
            <span>Kalkulasi BEP</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`flex-1 py-2 px-2.5 rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === "orders" ? "bg-white text-surface-900 shadow-2xs" : "text-surface-600 hover:text-surface-900"
            }`}
          >
            <Truck className="h-3.5 w-3.5 text-brand-600" />
            <span>Pesanan Aktif ({activeSurabayaOrders.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("mitra")}
            className={`flex-1 py-2 px-2.5 rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === "mitra" ? "bg-white text-surface-900 shadow-2xs" : "text-surface-600 hover:text-surface-900"
            }`}
          >
            <Users className="h-3.5 w-3.5 text-brand-600" />
            <span>Kelola Mitra ({registeredPartners.length})</span>
          </button>
        </div>

        {/* TAB 1: KALKULASI BEP */}
        {activeTab === "bep" && (
          <div className="rounded-2xl border border-surface-200/80 bg-white p-5 shadow-2xs space-y-4">
            <div className="pb-3 border-b border-surface-100">
              <h3 className="text-sm sm:text-base font-bold text-surface-900">
                Unit Economics & Titik Impas (BEP)
              </h3>
              <p className="text-xs text-surface-500 mt-0.5">
                Model komisi 20% platform logistik mahasiswa tanpa aset armada fisik.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-xl bg-surface-50 p-4 border border-surface-200/80 space-y-1">
                <span className="font-bold text-surface-500 block uppercase tracking-wider text-[10px]">
                  Fixed Cost Bulanan
                </span>
                <div className="text-base font-black text-surface-900">{formatRupiah(fixedCostPerMonth)}</div>
                <p className="text-[11px] text-surface-500 pt-1 border-t border-surface-200/60">
                  Server, domain, kuota, & operasional
                </p>
              </div>

              <div className="rounded-xl bg-surface-50 p-4 border border-surface-200/80 space-y-1">
                <span className="font-bold text-surface-500 block uppercase tracking-wider text-[10px]">
                  Margin Kontribusi
                </span>
                <div className="text-base font-black text-brand-800">{formatRupiah(platformMarginPerOrder)} / order</div>
                <p className="text-[11px] text-surface-500 pt-1 border-t border-surface-200/60">
                  20% platform fee dari rata-rata order
                </p>
              </div>

              <div className="rounded-xl bg-brand-50/60 p-4 border border-brand-200 space-y-1">
                <span className="font-bold text-brand-900 block uppercase tracking-wider text-[10px]">
                  Target BEP
                </span>
                <div className="text-lg font-black text-brand-950">67 Order / bln</div>
                <p className="text-[11px] text-brand-800 pt-1 border-t border-brand-200">
                  ± 2.2 pesanan per hari se-Surabaya
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs border-t border-surface-100">
              <span className="text-surface-500">Uji simulasi penambahan order berhasil</span>
              <Button
                onClick={() => showToast("Simulasi: 1 order berhasil ditambahkan, komisi bertambah Rp 30.000.")}
                size="sm"
                className="text-xs px-3.5 py-1.5 font-bold"
              >
                + Simulasi 1 Order
              </Button>
            </div>
          </div>
        )}

        {/* TAB 2: PESANAN AKTIF SURABAYA */}
        {activeTab === "orders" && (
          <div className="rounded-2xl border border-surface-200/80 bg-white p-5 shadow-2xs space-y-3">
            <h3 className="text-sm sm:text-base font-bold text-surface-900 pb-2 border-b border-surface-100">
              Monitoring Pesanan Surabaya
            </h3>

            <div className="divide-y divide-surface-100">
              {activeSurabayaOrders.map((ord) => (
                <div key={ord.id} className="py-3 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-surface-600 bg-surface-100 px-1.5 py-0.5 rounded text-[10px]">
                        {ord.id}
                      </span>
                      <strong className="text-surface-900 text-xs sm:text-sm">{ord.customer}</strong>
                    </div>
                    <span className="font-semibold text-brand-800 bg-brand-50 px-2 py-0.5 rounded-full text-[10px]">
                      {ord.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-surface-600 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span>{ord.campus}</span>
                    <span className="font-bold text-surface-800">
                      {formatRupiah(ord.amount)} <span className="font-normal text-surface-400">(Komisi: {formatRupiah(ord.platformCut)})</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: KELOLA MITRA */}
        {activeTab === "mitra" && (
          <div className="rounded-2xl border border-surface-200/80 bg-white p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-surface-100">
              <h3 className="text-sm sm:text-base font-bold text-surface-900">
                Database Mitra Armada Surabaya
              </h3>
              <span className="text-xs text-surface-500">{registeredPartners.length} mitra</span>
            </div>

            <div className="divide-y divide-surface-100">
              {registeredPartners.map((m) => (
                <div
                  key={m.id}
                  className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-surface-900 text-xs sm:text-sm">{m.name}</strong>
                      <span className="bg-surface-100 px-1.5 py-0.5 rounded text-[10px] text-surface-600 font-medium">
                        {m.role}
                      </span>
                    </div>
                    <p className="text-[11px] text-surface-500 mt-0.5">
                      {m.vehicle} · {m.trips} trip · Rating {m.rating}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        m.status.includes("Aktif")
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {m.status}
                    </span>
                    {m.status.includes("Menunggu") && (
                      <Button
                        onClick={() => showToast(`Dokumen mitra ${m.name} disetujui!`)}
                        size="sm"
                        className="text-[11px] px-2.5 py-1 font-bold"
                      >
                        Approve
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
