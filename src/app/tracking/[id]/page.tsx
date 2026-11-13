"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  Truck,
  Users,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Star,
  RefreshCw,
  Navigation,
  ArrowRight,
} from "lucide-react";
import { usePindahStore, OrderStatus } from "@/store/usePindahStore";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export default function OrderTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;

  const { getOrderById, advanceOrderStatus, submitOrderRating } = usePindahStore();
  const order = getOrderById(orderId);

  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order?.status || "in_transit");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("Sangat cepat dan helper ramah banget!");

  const trackingSteps = [
    {
      id: "searching_driver",
      title: "Mencari Mitra Driver",
      desc: "Menghubungkan dengan pengemudi pikap terdekat di area kampus",
      icon: RefreshCw,
      eta: "1-2 Menit",
    },
    {
      id: "driver_assigned",
      title: "Driver & Helper Menuju Kos Asal",
      desc: "Armada bergerak menuju lokasi penjemputanmu",
      icon: Navigation,
      eta: "Tiba dalam 10 Menit",
    },
    {
      id: "loading",
      title: "Loading Barang dari Kamar",
      desc: "Helper sedang mengangkat kasur & kardus dari lorong kamarmu ke pikap",
      icon: Users,
      eta: "Estimasi 25 Menit",
    },
    {
      id: "in_transit",
      title: "Dalam Perjalanan ke Kos Baru",
      desc: "Armada melaju aman melintasi jalanan Surabaya",
      icon: Truck,
      eta: "Perjalanan 15 Menit",
    },
    {
      id: "unloading",
      title: "Bongkar Muat di Kamar Baru",
      desc: "Helper menurunkan dan menata barang masuk ke kamar barumu",
      icon: MapPin,
      eta: "Finishing 20 Menit",
    },
    {
      id: "completed",
      title: "Pindahan Selesai!",
      desc: "Semua barang telah aman sampai di kamar kos tujuan",
      icon: CheckCircle2,
      eta: "Selesai",
    },
  ];

  const currentStepIndex = trackingSteps.findIndex((s) => s.id === currentStatus);

  const handleAdvanceSimulation = () => {
    const nextStatus = advanceOrderStatus(orderId);
    setCurrentStatus(nextStatus);

    if (nextStatus === "completed") {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
      setTimeout(() => setIsReviewModalOpen(true), 600);
    }
  };

  const handleSubmitReview = () => {
    submitOrderRating(orderId, rating, comment);
    setIsReviewModalOpen(false);
  };

  const driver = order?.driverInfo || {
    name: "Pak Joko Slamet",
    vehicleModel: "Daihatsu Gran Max Pick Up (Putih)",
    plateNumber: "L 1832 AB",
    rating: 4.9,
    helperName: "Mas Dimas Prasetyo",
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4 sm:px-6">
      <div className="mx-auto max-w-2xl space-y-5">
        {/* PRESENTATION DEMO BANNER */}
        <div className="rounded-3xl bg-gradient-to-r from-brand-700 via-teal-800 to-slate-900 p-4 sm:p-5 text-white shadow-card">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-200 border border-teal-400/30 mb-1">
                <Sparkles className="h-3 w-3 text-amber-300" />
                <span>Simulation Controller Demo UAS (3–4 Menit)</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold">Simulasi Live Tracking Alur Pindahan</h2>
              <p className="text-xs text-teal-100/80">
                Klik tombol di samping untuk memajukan status ke tahap berikutnya secara instan di depan penguji.
              </p>
            </div>

            <Button
              onClick={handleAdvanceSimulation}
              variant="accent"
              size="sm"
              className="w-full sm:w-auto text-slate-950 font-bold text-xs shrink-0"
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1 animate-spin" />
              Maju ke Tahap Berikutnya
            </Button>
          </div>
        </div>

        {/* Order Identification & ETA */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">ID Pesanan:</span>
            <span className="text-base font-extrabold font-mono text-slate-900">{orderId}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Status Sekarang:</span>
            <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
              {trackingSteps[currentStepIndex]?.title || "Aktif"}
            </span>
          </div>
        </div>

        {/* Simulated Map Card */}
        <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          {/* Map Graphic Canvas Mockup */}
          <div className="relative h-44 sm:h-52 bg-slate-100 flex items-center justify-center overflow-hidden border-b border-slate-200">
            {/* SVG Map Lines Mockup */}
            <svg className="absolute inset-0 h-full w-full opacity-60" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Route Path */}
              <path
                d="M 60 140 Q 180 80, 280 110 T 480 70"
                fill="none"
                stroke="#0d9488"
                strokeWidth="5"
                strokeDasharray="8 6"
              />
            </svg>

            {/* Origin Pin */}
            <div className="absolute left-8 bottom-8 flex flex-col items-center">
              <span className="bg-white text-[10px] font-bold text-slate-800 px-2 py-0.5 rounded-md shadow-sm border border-slate-200 mb-1">
                Kos Asal (UNAIR C)
              </span>
              <div className="h-4 w-4 rounded-full bg-brand-600 ring-4 ring-brand-200 animate-pulse" />
            </div>

            {/* Moving Truck Pin */}
            <div
              className="absolute flex flex-col items-center transition-all duration-700"
              style={{
                left: `${Math.min(80, Math.max(20, (currentStepIndex / 5) * 80))}%`,
                top: `${45 - Math.sin((currentStepIndex / 5) * Math.PI) * 15}%`,
              }}
            >
              <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md mb-1 flex items-center gap-1">
                <Truck className="h-3 w-3 text-brand-400" />
                {driver.plateNumber}
              </span>
              <div className="h-7 w-7 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-lg ring-4 ring-white">
                🛻
              </div>
            </div>

            {/* Destination Pin */}
            <div className="absolute right-8 top-6 flex flex-col items-center">
              <span className="bg-white text-[10px] font-bold text-slate-800 px-2 py-0.5 rounded-md shadow-sm border border-slate-200 mb-1">
                Kos Baru (UNAIR B)
              </span>
              <div className="h-4 w-4 rounded-full bg-accent-500 ring-4 ring-accent-200" />
            </div>
          </div>

          {/* Active Status Header */}
          <div className="p-4 bg-brand-50/50 flex items-center justify-between border-b border-brand-100 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-600" />
              <span className="font-semibold text-slate-700">
                {trackingSteps[currentStepIndex]?.eta || "Sedang Berlangsung"}
              </span>
            </div>
            <span className="text-slate-500 font-medium">Jarak Total: ± 7.5 km</span>
          </div>
        </div>

        {/* Driver & Helper Info Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl">
                👨‍✈️
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-slate-900">{driver.name}</h4>
                  <span className="flex items-center text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400 mr-0.5" />
                    {driver.rating}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{driver.vehicleModel}</p>
                <p className="text-xs font-mono font-bold text-brand-700">{driver.plateNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => alert(`Simulasi Panggilan ke ${driver.name} (0812-3456-7890)`)}
                className="h-9 w-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition"
              >
                <Phone className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => alert(`Simulasi WhatsApp ke Driver: Halo Pak Joko, kamar kos saya di lantai 2 ya.`)}
                className="h-9 w-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 shadow-sm transition"
              >
                <MessageCircle className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-3 pt-1 flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-brand-600" />
              Tenaga Helper: <strong className="text-slate-800">{driver.helperName}</strong>
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
              Door-to-Door Aktif
            </span>
          </div>
        </div>

        {/* Vertical Step Timeline */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Tahapan Eksekusi Pindahan Kos
          </h3>

          <div className="space-y-4">
            {trackingSteps.map((step, idx) => {
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const isUpcoming = idx > currentStepIndex;
              const StepIcon = step.icon;

              return (
                <div key={step.id} className="flex items-start gap-3 relative">
                  {idx < trackingSteps.length - 1 && (
                    <div
                      className={`absolute left-4 top-8 -bottom-4 w-0.5 ${
                        isPast ? "bg-emerald-400" : "bg-slate-200"
                      }`}
                    />
                  )}

                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 z-10 transition ${
                      isPast
                        ? "bg-emerald-500 text-white"
                        : isCurrent
                        ? "bg-brand-600 text-white ring-4 ring-brand-100"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                  </div>

                  <div className="flex-1 pb-2">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-xs sm:text-sm font-bold ${
                          isCurrent ? "text-brand-700" : isPast ? "text-slate-900" : "text-slate-400"
                        }`}
                      >
                        {step.title}
                      </h4>
                      <span className="text-[10px] text-slate-400">{step.eta}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
          <Link href="/riwayat" className="hover:text-brand-600 font-semibold">
            ← Kembali ke Riwayat Pesanan
          </Link>
          <Link href="/mitra-preview" className="text-brand-600 font-bold hover:underline">
            Lihat Sisi Driver (Bagi Hasil 80:20) →
          </Link>
        </div>

        {/* Review & Feedback Modal */}
        <Modal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          title="Pindahan Kos Sukses Selesai!"
          description="Bantu kami memberikan apresiasi kepada Pak Joko & Mas Dimas."
        >
          <div className="space-y-4">
            <div className="text-center py-2">
              <span className="text-xs text-slate-500 font-medium block mb-2">Beri Bintang Pengalaman Pindahan</span>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition"
                  >
                    <Star
                      className={`h-7 w-7 ${
                        star <= rating ? "fill-amber-400 text-amber-400" : "text-slate-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Komentar / Pengalaman</label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:border-brand-500 focus:bg-white focus:outline-none"
              />
            </div>

            <Button onClick={handleSubmitReview} size="md" className="w-full text-xs">
              Kirim Ulasan & Selesai
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

