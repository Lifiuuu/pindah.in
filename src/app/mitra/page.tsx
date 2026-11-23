"use client";

import { useState } from "react";
import {
  Truck,
  MapPin,
  CheckCircle2,
  Phone,
  Wallet,
  TrendingUp,
  Package,
} from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type MitraTab = "tugas" | "order-masuk" | "dompet";

export default function MitraPortalPage() {
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState<MitraTab>("tugas");
  const [jobStage, setJobStage] = useState<number>(2); // 0: Menuju, 1: Angkut, 2: Perjalanan, 3: Selesai
  const [balance, setBalance] = useState<number>(840000);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const stages = [
    { label: "Menuju Kos", desc: "Perjalanan ke Sutorejo" },
    { label: "Muat Barang", desc: "Helper bantu angkut" },
    { label: "Dalam Perjalanan", desc: "Menuju Dharmawangsa" },
    { label: "Selesai Bongkar", desc: "Barang tertata aman" },
  ];

  const incomingOrders = [
    {
      id: "PNDH-98220",
      customer: "Ahmad Rizky (ITS)",
      route: "Gebang Wetan → Mulyorejo Indah",
      fleet: "Pikap Bak + 1 Helper",
      mitraShare: 120000,
      distance: "3.2 km",
      time: "14:00 WIB",
    },
    {
      id: "PNDH-98225",
      customer: "Nabila Zahra (UNESA)",
      route: "Ketintang Baru → Siwalankerto",
      fleet: "Pikap Box + 1 Helper",
      mitraShare: 140000,
      distance: "4.5 km",
      time: "Besok, 09:30 WIB",
    },
  ];

  return (
    <div className="min-h-screen bg-surface-50 py-5 sm:py-8 px-4 sm:px-6 font-sans">
      <div className="mx-auto max-w-2xl space-y-4">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 rounded-2xl bg-surface-900 text-white px-4 py-2.5 shadow-xl text-xs font-semibold flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            {toastMessage}
          </div>
        )}

        {/* Compact Mitra Top Bar */}
        <div className="rounded-2xl bg-surface-900 text-white p-4 sm:p-5 shadow-sm flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold text-white">Pak Joko & Mas Dimas</h1>
              <span className="text-[10px] font-mono text-surface-400">MTR-0412</span>
            </div>
            <p className="text-xs text-surface-400">Gran Max (L 1832 AB) · Surabaya</p>
          </div>

          {/* Online/Offline Toggle */}
          <button
            type="button"
            onClick={() => {
              setIsOnline(!isOnline);
              showToast(isOnline ? "Status: Offline (Istirahat)" : "Status: Online (Siap Terima Order)");
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition ${
              isOnline
                ? "bg-emerald-600/90 text-white hover:bg-emerald-600"
                : "bg-surface-800 text-surface-400 hover:bg-surface-700"
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${isOnline ? "bg-emerald-300 animate-pulse" : "bg-surface-500"}`} />
            <span>{isOnline ? "Online" : "Offline"}</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-surface-200/70 p-1 border border-surface-200 gap-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("tugas")}
            className={`flex-1 py-2 px-2.5 rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === "tugas" ? "bg-white text-surface-900 shadow-2xs" : "text-surface-600 hover:text-surface-900"
            }`}
          >
            <Truck className="h-3.5 w-3.5 text-brand-600" />
            <span>Tugas Aktif (1)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("order-masuk")}
            className={`flex-1 py-2 px-2.5 rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === "order-masuk" ? "bg-white text-surface-900 shadow-2xs" : "text-surface-600 hover:text-surface-900"
            }`}
          >
            <Package className="h-3.5 w-3.5 text-brand-600" />
            <span>Order Masuk ({incomingOrders.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("dompet")}
            className={`flex-1 py-2 px-2.5 rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === "dompet" ? "bg-white text-surface-900 shadow-2xs" : "text-surface-600 hover:text-surface-900"
            }`}
          >
            <Wallet className="h-3.5 w-3.5 text-brand-600" />
            <span>Dompet</span>
          </button>
        </div>

        {/* TAB 1: TUGAS AKTIF */}
        {activeTab === "tugas" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-surface-200/80 bg-white p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-100">
                <div>
                  <span className="text-[10px] font-mono text-surface-400 block">PNDH-98214</span>
                  <h2 className="text-sm sm:text-base font-bold text-surface-900">Nadira Safitri</h2>
                </div>
                <a
                  href="tel:081234567890"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-surface-200 bg-surface-50 px-3 py-1.5 text-xs font-bold text-surface-700 hover:bg-surface-100 transition"
                >
                  <Phone className="h-3.5 w-3.5 text-brand-600" />
                  <span>Hubungi</span>
                </a>
              </div>

              {/* Status Stepper */}
              <div>
                <span className="text-[11px] font-bold text-surface-500 block mb-2">Update Status Pindahan:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {stages.map((st, idx) => {
                    const isDone = idx <= jobStage;
                    const isCurrent = idx === jobStage;
                    return (
                      <button
                        key={st.label}
                        type="button"
                        onClick={() => {
                          setJobStage(idx);
                          showToast(`Status: ${st.label}`);
                        }}
                        className={`p-2.5 rounded-xl text-left border transition ${
                          isCurrent
                            ? "border-brand-600 bg-brand-50/80 ring-1 ring-brand-500"
                            : isDone
                            ? "border-surface-200 bg-surface-50 text-surface-700"
                            : "border-surface-200/60 bg-white text-surface-400"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-bold uppercase">Tahap {idx + 1}</span>
                          {isDone ? (
                            <CheckCircle2 className="h-3 w-3 text-brand-600" />
                          ) : (
                            <span className="h-2.5 w-2.5 rounded-full border border-surface-300" />
                          )}
                        </div>
                        <strong className="text-xs block text-surface-900 leading-tight">{st.label}</strong>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Route Details */}
              <div className="rounded-xl bg-surface-50 p-3.5 border border-surface-200 text-xs space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-3.5 w-3.5 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-surface-400 text-[10px] block font-semibold">Jemput:</span>
                    <strong className="text-surface-900 block">Kost Sutorejo Prima No. 18 (Lt. 2)</strong>
                    <span className="text-surface-500 text-[11px]">Bawa kasur & meja lewat tangga lorong</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-1 border-t border-surface-200/60">
                  <MapPin className="h-3.5 w-3.5 text-accent-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-surface-400 text-[10px] block font-semibold">Antar:</span>
                    <strong className="text-surface-900 block">Wisma Dharmawangsa No. 45 (Lt. 1)</strong>
                  </div>
                </div>
              </div>

              {/* Earnings Highlight & Action */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-[10px] text-surface-400 block font-medium">Pendapatan Trip Ini</span>
                  <span className="text-base sm:text-lg font-black text-brand-800">{formatRupiah(120000)}</span>
                </div>

                <Button
                  onClick={() => {
                    const next = Math.min(3, jobStage + 1);
                    setJobStage(next);
                    showToast(`Status: ${stages[next].label}`);
                  }}
                  size="sm"
                  className="text-xs px-4 py-2 font-bold"
                >
                  {jobStage >= 3 ? "Tugas Selesai" : "Lanjut Tahap Berikutnya"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDER MASUK */}
        {activeTab === "order-masuk" && (
          <div className="space-y-3">
            {incomingOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-surface-200/80 bg-white p-4 sm:p-5 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-surface-100">
                  <div>
                    <span className="text-[10px] font-mono text-surface-400 block">{order.id}</span>
                    <strong className="text-xs sm:text-sm text-surface-900">{order.customer}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-surface-400 block font-medium">Pendapatan</span>
                    <strong className="text-sm sm:text-base font-black text-brand-800">
                      {formatRupiah(order.mitraShare)}
                    </strong>
                  </div>
                </div>

                <div className="text-xs space-y-1 text-surface-600">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-brand-600 shrink-0" />
                    <span className="font-medium text-surface-800">{order.route}</span>
                  </div>
                  <div className="text-[11px] text-surface-400 pl-5">
                    {order.fleet} · {order.distance} · {order.time}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    onClick={() => showToast(`Order ${order.id} berhasil diterima!`)}
                    size="sm"
                    className="text-xs px-4 py-2 font-bold"
                  >
                    Terima Order
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: DOMPET */}
        {activeTab === "dompet" && (
          <div className="rounded-2xl border border-surface-200/80 bg-white p-5 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-surface-100">
              <div>
                <span className="text-[11px] text-surface-500 font-medium block">Saldo Penghasilan Mitra</span>
                <div className="text-2xl sm:text-3xl font-black text-surface-900 mt-0.5">
                  {formatRupiah(balance)}
                </div>
                <span className="text-xs text-emerald-700 font-semibold mt-0.5 inline-flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> +Rp 240.000 kemarin
                </span>
              </div>

              <Button
                onClick={() => showToast("Pencairan dana diajukan ke rekening mitra.")}
                size="sm"
                className="text-xs px-4 py-2.5 font-bold"
              >
                Tarik Saldo
              </Button>
            </div>

            {/* Riwayat Trip Singkat */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-surface-700 block">Riwayat Pindahan Selesai</span>
              <div className="divide-y divide-surface-100 border border-surface-200/80 rounded-xl overflow-hidden text-xs">
                {[
                  { id: "PNDH-98180", date: "Kemarin", customer: "Bima Pratama", fee: 120000, route: "Tambaksari → Gubeng" },
                  { id: "PNDH-98155", date: "12 Nov", customer: "Rizky Aditya", fee: 120000, route: "Sutorejo → Manyar" },
                  { id: "PNDH-98112", date: "10 Nov", customer: "Clarissa D.", fee: 140000, route: "Kalisari → Dharmawangsa" },
                ].map((item) => (
                  <div key={item.id} className="p-3 bg-white flex items-center justify-between">
                    <div>
                      <strong className="text-surface-900 font-bold block">{item.customer}</strong>
                      <span className="text-surface-500 text-[11px]">{item.route} · {item.date}</span>
                    </div>
                    <span className="font-bold text-emerald-700 font-mono text-xs sm:text-sm">
                      +{formatRupiah(item.fee)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
