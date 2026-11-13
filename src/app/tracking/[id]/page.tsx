"use client";

import { use, useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  Truck,
  Users,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles,
  Star,
  RefreshCw,
  Navigation,
} from "lucide-react";
import { usePindahStore, OrderStatus } from "@/store/usePindahStore";
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
  const [comment, setComment] = useState<string>("Sangat cepat dan helper ramah!");

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
      title: "Pindahan Selesai",
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
    <div className="min-h-screen bg-surface-50 py-8 sm:py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* PRESENTATION DEMO BANNER WITH AIRY PADDING */}
        <div className="rounded-3xl bg-gradient-to-r from-brand-800 via-brand-900 to-surface-900 p-6 sm:p-7 text-white shadow-card">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-600/50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-200 border border-brand-500/40 mb-1">
                <Sparkles className="h-3.5 w-3.5 text-accent-300" />
                <span>Simulation Controller Demo UAS</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold leading-snug">Simulasi Pelacakan Alur Pindahan</h2>
              <p className="text-xs text-brand-100/80 leading-relaxed max-w-md">
                Tekan tombol di samping untuk memajukan status pesanan secara instan saat sesi presentasi.
              </p>
            </div>

            <Button
              onClick={handleAdvanceSimulation}
              variant="accent"
              size="sm"
              className="w-full sm:w-auto text-slate-950 font-bold text-xs shrink-0 py-3 px-4 shadow-sm"
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1.5 animate-spin" />
              Maju ke Tahap Berikutnya
            </Button>
          </div>
        </div>

        {/* Order Identification & ETA */}
        <div className="rounded-3xl border border-surface-200/90 bg-white p-6 shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-[10px] text-surface-400 font-bold uppercase tracking-wider block">ID Pesanan:</span>
            <span className="text-base sm:text-lg font-extrabold font-mono text-surface-900">{orderId}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-surface-400 font-bold uppercase tracking-wider block">Status Sekarang:</span>
            <span className="text-xs font-bold text-brand-800 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              {trackingSteps[currentStepIndex]?.title || "Aktif"}
            </span>
          </div>
        </div>

        {/* Simulated Map Card */}
        <div className="rounded-3xl border border-surface-200/90 bg-white overflow-hidden shadow-subtle">
          <div className="relative h-48 sm:h-56 bg-surface-100 flex items-center justify-center overflow-hidden border-b border-surface-200">
            <svg className="absolute inset-0 h-full w-full opacity-60" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e8e1d6" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <path
                d="M 60 140 Q 180 80, 280 110 T 480 70"
                fill="none"
                stroke="#8c6035"
                strokeWidth="5"
                strokeDasharray="8 6"
              />
            </svg>

            {/* Origin Pin */}
            <div className="absolute left-8 bottom-8 flex flex-col items-center">
              <span className="bg-white text-[10px] font-bold text-surface-800 px-2.5 py-0.5 rounded-lg shadow-sm border border-surface-200 mb-1">
                Kos Asal (Sutorejo)
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
              <span className="bg-surface-900 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md mb-1 flex items-center gap-1">
                <Truck className="h-3 w-3 text-accent-300" />
                {driver.plateNumber}
              </span>
              <div className="h-8 w-8 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-md ring-2 ring-white">
                <Truck className="h-4 w-4" />
              </div>
            </div>

            {/* Destination Pin */}
            <div className="absolute right-8 top-6 flex flex-col items-center">
              <span className="bg-white text-[10px] font-bold text-surface-800 px-2.5 py-0.5 rounded-lg shadow-sm border border-surface-200 mb-1">
                Kos Baru (Dharmawangsa)
              </span>
              <div className="h-4 w-4 rounded-full bg-accent-600 ring-4 ring-accent-200" />
            </div>
          </div>

          <div className="p-5 bg-brand-50/50 flex items-center justify-between border-b border-brand-100 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-600" />
              <span className="font-semibold text-surface-800">
                {trackingSteps[currentStepIndex]?.eta || "Sedang Berlangsung"}
              </span>
            </div>
            <span className="text-surface-500 font-medium">Jarak Total: ± 7.5 km</span>
          </div>
        </div>

        {/* Driver & Helper Info Card with Generous Padding */}
        <div className="rounded-3xl border border-surface-200/90 bg-white p-6 sm:p-7 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-surface-100">
            <div className="flex items-center gap-3.5">
              <div className="h-12 w-12 rounded-2xl bg-brand-50 border border-brand-200 text-brand-800 font-bold text-sm flex items-center justify-center shrink-0">
                JS
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-surface-900">{driver.name}</h4>
                  <span className="flex items-center text-[10px] font-bold text-accent-800 bg-accent-50 px-2 py-0.5 rounded border border-accent-200">
                    <Star className="h-3 w-3 fill-accent-500 text-accent-500 mr-1" />
                    {driver.rating}
                  </span>
                </div>
                <p className="text-xs text-surface-500 mt-0.5">{driver.vehicleModel}</p>
                <p className="text-xs font-mono font-bold text-brand-700 mt-0.5">{driver.plateNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => alert(`Simulasi Panggilan ke ${driver.name} (0812-3456-7890)`)}
                className="h-10 w-10 rounded-2xl bg-surface-100 text-surface-700 flex items-center justify-center hover:bg-surface-200 transition"
              >
                <Phone className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => alert(`Simulasi WhatsApp ke Driver: Halo Pak Joko, kamar kos saya di lantai 2 ya.`)}
                className="h-10 w-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center hover:bg-brand-700 shadow-sm transition"
              >
                <MessageCircle className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between text-xs sm:text-sm text-surface-600">
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4 text-brand-600" />
              Tenaga Helper: <strong className="text-surface-900">{driver.helperName}</strong>
            </span>
            <span className="text-[11px] text-brand-800 font-bold bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
              Door-to-Door Aktif
            </span>
          </div>
        </div>

        {/* Vertical Step Timeline with Comfortable Spacing */}
        <div className="rounded-3xl border border-surface-200/90 bg-white p-6 sm:p-8 shadow-subtle">
          <h3 className="text-base font-bold text-surface-950 mb-6 pb-3 border-b border-surface-100">
            Tahapan Eksekusi Pindahan Kos
          </h3>

          <div className="space-y-6">
            {trackingSteps.map((step, idx) => {
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const StepIcon = step.icon;

              return (
                <div key={step.id} className="flex items-start gap-4 relative">
                  {idx < trackingSteps.length - 1 && (
                    <div
                      className={`absolute left-4 top-9 -bottom-6 w-0.5 ${
                        isPast ? "bg-brand-500" : "bg-surface-200"
                      }`}
                    />
                  )}

                  <div
                    className={`h-9 w-9 rounded-2xl flex items-center justify-center shrink-0 z-10 transition ${
                      isPast
                        ? "bg-brand-600 text-white shadow-xs"
                        : isCurrent
                        ? "bg-brand-700 text-white ring-4 ring-brand-100 shadow-sm"
                        : "bg-surface-100 text-surface-400"
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                  </div>

                  <div className="flex-1 pb-1">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-xs sm:text-sm font-bold ${
                          isCurrent ? "text-brand-800" : isPast ? "text-surface-900" : "text-surface-400"
                        }`}
                      >
                        {step.title}
                      </h4>
                      <span className="text-[11px] text-surface-400">{step.eta}</span>
                    </div>
                    <p className="text-xs text-surface-500 mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-surface-500 pt-2">
          <Link href="/riwayat" className="hover:text-brand-700 font-bold">
            ← Kembali ke Riwayat Pesanan
          </Link>
          <Link href="/" className="hover:text-brand-700 font-bold">
            Kembali ke Beranda
          </Link>
        </div>

        {/* Review & Feedback Modal */}
        <Modal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          title="Pindahan Kos Sukses Selesai"
          description="Bantu kami memberikan apresiasi kepada Pak Joko & Mas Dimas."
        >
          <div className="space-y-5">
            <div className="text-center py-2">
              <span className="text-xs text-surface-500 font-medium block mb-2">Beri Bintang Pengalaman Pindahan</span>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= rating ? "fill-accent-500 text-accent-500" : "text-surface-200"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-surface-800 mb-2">Komentar / Pengalaman</label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full rounded-2xl border border-surface-200 bg-surface-50 p-3.5 text-xs sm:text-sm focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition"
              />
            </div>

            <Button onClick={handleSubmitReview} size="md" className="w-full text-xs sm:text-sm py-3.5">
              Kirim Ulasan & Selesai
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
