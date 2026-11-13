"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Truck,
  MapPin,
  CheckCircle2,
  Phone,
  Wallet,
  ArrowUpRight,
  UserCheck,
  ShieldAlert,
  HardHat,
  Package,
  Layers,
  ChevronRight,
  TrendingUp,
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
    { label: "Menuju Kos Asal", desc: "Perjalanan ke Kost Sutorejo Prima" },
    { label: "Muat Barang", desc: "Helper bantu angkat kasur & lemari lt. 2" },
    { label: "Dalam Perjalanan", desc: "Armada pikap mengarah ke Dharmawangsa" },
    { label: "Selesai Bongkar", desc: "Barang tertata aman di kos baru" },
  ];

  const incomingOrders = [
    {
      id: "PNDH-98220",
      customer: "Ahmad Rizky (FST UNAIR)",
      route: "Kost Mulyorejo Baru → Asrama UNAIR Kampus C",
      fleet: "Pikap Bak + 1 Helper",
      mitraShare: 120000,
      driverShare: 85000,
      helperShare: 35000,
      distance: "3.2 km",
      time: "14:00 WIB Hari Ini",
    },
    {
      id: "PNDH-98225",
      customer: "Nabila Zahra (FKG UNAIR)",
      route: "Jl. Prof. Moestopo → Gubeng Kertajaya VIII",
      fleet: "Pikap Box + 1 Helper",
      mitraShare: 140000,
      driverShare: 100000,
      helperShare: 40000,
      distance: "4.5 km",
      time: "Besok, 09:30 WIB",
    },
  ];

  return (
    <div className="min-h-screen bg-surface-50 py-6 sm:py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 rounded-2xl bg-surface-900 text-white px-4 py-3 shadow-xl text-xs font-semibold flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            {toastMessage}
          </div>
        )}

        {/* Top Header Card: Status Mitra & Toggle */}
        <div className="rounded-3xl bg-surface-900 text-white p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-brand-800 text-accent-300 px-3 py-0.5 text-xs font-bold border border-brand-700">
                Pindah.in Mitra Surabaya
              </span>
              <span className="text-xs text-surface-400">ID Mitra: MTR-0412</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black">Pak Joko Slamet & Mas Dimas</h1>
            <p className="text-xs sm:text-sm text-surface-300">
              Daihatsu Gran Max (L 1832 AB) · Wilayah Operasi: UNAIR Kampus A, B, C & Sekitarnya
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-3 w-full sm:w-auto">
            {/* Toggle Online/Offline */}
            <button
              onClick={() => {
                setIsOnline(!isOnline);
                showToast(isOnline ? "Status diubah menjadi Istirahat (Offline)" : "Status diubah menjadi Siap Terima Order (Online)");
              }}
              className={`w-full sm:w-auto flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-2xl font-bold text-xs shadow-md transition ${
                isOnline
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-surface-700 hover:bg-surface-600 text-surface-300"
              }`}
            >
              <span className={`h-2.5 w-2.5 rounded-full ${isOnline ? "bg-emerald-200 animate-ping" : "bg-surface-400"}`} />
              {isOnline ? "Status: AKTIF (Siaga Menerima Order)" : "Status: NONAKTIF (Istirahat)"}
            </button>
            <span className="text-[11px] text-surface-400">
              {isOnline ? "Radar order mahasiswa sekitar aktif" : "Aktifkan untuk menerima pesanan baru"}
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-2xl bg-surface-100 p-1.5 border border-surface-200 gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab("tugas")}
            className={`flex-1 py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-2 ${
              activeTab === "tugas"
                ? "bg-white text-surface-900 shadow-sm"
                : "text-surface-600 hover:text-surface-900"
            }`}
          >
            <Truck className="h-4 w-4 text-brand-600" />
            <span>Tugas Aktif (1)</span>
          </button>
          <button
            onClick={() => setActiveTab("order-masuk")}
            className={`flex-1 py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-2 ${
              activeTab === "order-masuk"
                ? "bg-white text-surface-900 shadow-sm"
                : "text-surface-600 hover:text-surface-900"
            }`}
          >
            <Package className="h-4 w-4 text-brand-600" />
            <span>Order Masuk ({incomingOrders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("dompet")}
            className={`flex-1 py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-2 ${
              activeTab === "dompet"
                ? "bg-white text-surface-900 shadow-sm"
                : "text-surface-600 hover:text-surface-900"
            }`}
          >
            <Wallet className="h-4 w-4 text-brand-600" />
            <span>Dompet 80%</span>
          </button>
        </div>

        {/* TAB 1: TUGAS AKTIF LAPANGAN */}
        {activeTab === "tugas" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-surface-200 bg-white p-6 sm:p-8 shadow-subtle space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-surface-100 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-brand-100 text-brand-800 px-2.5 py-0.5 text-[11px] font-bold">
                      Order Sedang Berjalan
                    </span>
                    <span className="text-xs font-mono font-bold text-surface-500">ID: PNDH-98214</span>
                  </div>
                  <h2 className="text-lg font-bold text-surface-900 mt-1">
                    Pindahan Kamar Mahasiswi: Putri Atika M.
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="tel:081234567890"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-surface-200 bg-surface-50 px-3 py-1.5 text-xs font-bold text-surface-700 hover:bg-surface-100 transition"
                  >
                    <Phone className="h-3.5 w-3.5 text-brand-600" />
                    Hubungi Mahasiswa
                  </a>
                </div>
              </div>

              {/* Progress Stepper for Mitra */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-surface-500 uppercase tracking-wider block">
                  Tahapan Eksekusi Lapangan (Update Status):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {stages.map((st, idx) => {
                    const isDone = idx <= jobStage;
                    const isCurrent = idx === jobStage;
                    return (
                      <button
                        key={st.label}
                        onClick={() => {
                          setJobStage(idx);
                          showToast(`Status tugas diperbarui ke: ${st.label}`);
                        }}
                        className={`p-3 rounded-2xl text-left border transition ${
                          isCurrent
                            ? "border-brand-600 bg-brand-50/80 ring-2 ring-brand-600/30"
                            : isDone
                            ? "border-surface-200 bg-surface-50 text-surface-700"
                            : "border-surface-200/60 bg-white text-surface-400"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider">Tahap {idx + 1}</span>
                          {isDone ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-brand-600" />
                          ) : (
                            <span className="h-3 w-3 rounded-full border border-surface-300" />
                          )}
                        </div>
                        <strong className="text-xs block text-surface-900 leading-tight">{st.label}</strong>
                        <p className="text-[10px] text-surface-500 mt-1 leading-snug line-clamp-2">{st.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Route Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl bg-surface-50 p-5 border border-surface-200 text-xs">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-surface-400 uppercase tracking-wider">Titik Muat:</span>
                  <p className="font-bold text-surface-900">Kost Sutorejo Prima No. 18 (Kamar 204, Lantai 2)</p>
                  <p className="text-surface-500">Mulyorejo, Surabaya Timur · Dekat Kampus C UNAIR</p>
                  <p className="text-brand-700 font-semibold pt-1">
                    Catatan: Helper angkat kasur & meja lewat tangga lorong belakang
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-surface-400 uppercase tracking-wider">Titik Bongkar:</span>
                  <p className="font-bold text-surface-900">Wisma Mahasiswa Dharmawangsa No. 45 (Lantai 1)</p>
                  <p className="text-surface-500">Gubeng, Surabaya Timur · Dekat Kampus B UNAIR</p>
                  <p className="text-emerald-700 font-semibold pt-1">
                    Akses pikap langsung ke depan garasi
                  </p>
                </div>
              </div>

              {/* Hak Pendapatan Mitra Trip Ini */}
              <div className="rounded-2xl bg-brand-50/70 border border-brand-200 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand-950 text-sm">Hak Pendapatan Mitra Trip Ini (80%):</span>
                  <span className="text-lg font-black text-brand-900">{formatRupiah(120000)}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-brand-200/70 text-xs">
                  <div>
                    <span className="text-brand-700 block">Jatah Driver Pikap:</span>
                    <strong className="text-brand-950 font-bold">{formatRupiah(85000)}</strong>
                    <span className="text-[10px] text-brand-600 block">(Bahan bakar + armada)</span>
                  </div>
                  <div>
                    <span className="text-brand-700 block">Jatah Helper Angkut:</span>
                    <strong className="text-brand-950 font-bold">{formatRupiah(35000)}</strong>
                    <span className="text-[10px] text-brand-600 block">(Jasa angkut tangga)</span>
                  </div>
                </div>
              </div>

              {/* Complete Job Trigger */}
              {jobStage === 3 && (
                <Button
                  onClick={() => {
                    setBalance((b) => b + 120000);
                    showToast("Order Selesai! Rp 120.000 telah masuk ke saldo dompet mitra.");
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 text-sm rounded-2xl shadow-md"
                >
                  Konfirmasi Pekerjaan Selesai & Klaim Rp 120.000
                </Button>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: ORDER MASUK */}
        {activeTab === "order-masuk" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-surface-900">
                Peluang Order Pindahan Sekitar UNAIR ({incomingOrders.length})
              </h2>
              <span className="text-xs text-surface-500">Auto-refresh setiap saat</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {incomingOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-3xl border border-surface-200 bg-white p-6 shadow-subtle space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-surface-100 gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-surface-100 px-2 py-0.5 text-[10px] font-mono font-bold text-surface-600">
                          {order.id}
                        </span>
                        <span className="text-xs font-bold text-surface-900">{order.customer}</span>
                      </div>
                      <p className="text-xs text-surface-500 mt-0.5">Jadwal: {order.time} · Jarak: {order.distance}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-surface-400 block font-semibold">Pendapatan Bersih (80%)</span>
                      <strong className="text-lg font-black text-brand-800">{formatRupiah(order.mitraShare)}</strong>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-surface-50 p-4 border border-surface-200 text-xs space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-surface-800">{order.route}</span>
                        <span className="text-surface-500 block text-[11px]">Tipe: {order.fleet}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-surface-500">
                      Driver: {formatRupiah(order.driverShare)} · Helper: {formatRupiah(order.helperShare)}
                    </span>
                    <Button
                      onClick={() => showToast(`Pesanan ${order.id} berhasil diterima! Menghubungi pelanggan...`)}
                      className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl"
                    >
                      Terima Tugas Ini
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DOMPET PENDAPATAN 80% */}
        {activeTab === "dompet" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-surface-200 bg-white p-6 sm:p-8 shadow-subtle space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-surface-100 gap-4">
                <div>
                  <span className="text-xs text-surface-500 font-bold uppercase tracking-wider block">
                    Saldo Penghasilan Mitra Terakumulasi
                  </span>
                  <div className="text-3xl font-black text-surface-900 mt-1">{formatRupiah(balance)}</div>
                  <span className="text-xs text-emerald-700 font-semibold mt-1 inline-flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5" /> +{formatRupiah(240000)} dari 2 trip kemarin
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => showToast("Permintaan pencairan dana Rp " + balance.toLocaleString("id-ID") + " diajukan ke rekening BCA Pak Joko.")}
                    className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-6 py-3 rounded-2xl shadow-sm"
                  >
                    Tarik Dana ke Bank / E-Wallet
                  </Button>
                </div>
              </div>

              {/* Model Canvas Transparency Explanation */}
              <div className="rounded-2xl bg-surface-50 p-5 border border-surface-200 space-y-2">
                <div className="flex items-center gap-2">
                  <HardHat className="h-4 w-4 text-brand-700" />
                  <h3 className="font-bold text-xs text-surface-900">Prinsip Keadilan Bagi Hasil Pindah.in (80 : 20)</h3>
                </div>
                <p className="text-xs text-surface-600 leading-relaxed">
                  Pindah.in menjamin mitra mendapatkan <strong>80% penuh</strong> dari nilai pesanan tanpa potongan tersembunyi.
                  Driver mendapatkan rata-rata Rp 85.000 (menutup bahan bakar & depresiasi armada), helper mendapatkan Rp 35.000 per
                  layanan bongkar-muat pintu-ke-pintu, dan platform hanya mengambil 20% (Rp 30.000) untuk operasional server & proteksi.
                </p>
              </div>

              {/* Trip History for Driver */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-surface-500 uppercase tracking-wider block">
                  Riwayat Pekerjaan Selesai
                </span>
                <div className="divide-y divide-surface-100 border border-surface-200 rounded-2xl overflow-hidden">
                  {[
                    { id: "PNDH-98180", date: "Kemarin, 15:30", customer: "Faatin Sausan (FKG)", fee: 120000, route: "Tambaksari → Gubeng" },
                    { id: "PNDH-98155", date: "12 Nov 2026", customer: "Rizky Bima (FST)", fee: 120000, route: "Sutorejo → Manyar Kertoarjo" },
                    { id: "PNDH-98112", date: "10 Nov 2026", customer: "Maulidina Naurah", fee: 140000, route: "Kalisari → Wisma Dharmawangsa" },
                  ].map((item) => (
                    <div key={item.id} className="p-4 bg-white flex items-center justify-between text-xs">
                      <div>
                        <strong className="text-surface-900 font-bold block">{item.customer}</strong>
                        <span className="text-surface-500 text-[11px]">{item.route} · {item.date}</span>
                      </div>
                      <span className="font-bold text-emerald-700 font-mono text-sm">+{formatRupiah(item.fee)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Switcher */}
        <div className="text-center pt-6 pb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-surface-500 hover:text-brand-800 transition"
          >
            ← Kembali ke Tampilan Pelanggan (Mahasiswa Kos)
          </Link>
        </div>
      </div>
    </div>
  );
}
