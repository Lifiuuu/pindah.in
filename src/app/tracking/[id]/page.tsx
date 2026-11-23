"use client";

import { useState, use } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  Phone,
  MessageCircle,
  Star,
  Users,
  Navigation,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { OrderStatus, usePindahStore } from "@/store/usePindahStore";
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
      title: "Mencari Driver",
      desc: "Menghubungkan dengan pengemudi pikap terdekat di area kampus",
      icon: RefreshCw,
      eta: "1-2 Menit",
    },
    {
      id: "driver_assigned",
      title: "Driver Menuju Kos Asal",
      desc: "Armada bergerak menuju lokasi penjemputan",
      icon: Navigation,
      eta: "10 Menit",
    },
    {
      id: "loading",
      title: "Muat Barang dari Kamar",
      desc: "Helper membantu angkut barang kos ke armada pikap",
      icon: Users,
      eta: "25 Menit",
    },
    {
      id: "in_transit",
      title: "Perjalanan ke Kos Baru",
      desc: "Armada melaju aman menuju kos tujuan",
      icon: Truck,
      eta: "15 Menit",
    },
    {
      id: "unloading",
      title: "Bongkar di Kamar Baru",
      desc: "Helper menurunkan dan mengantar barang masuk kamar",
      icon: MapPin,
      eta: "20 Menit",
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
    vehicleModel: "Daihatsu Gran Max Pick Up",
    plateNumber: "L 1832 AB",
    rating: 4.9,
    helperName: "Mas Dimas Prasetyo",
  };

  return (
    <div className="min-h-screen bg-surface-50 py-6 sm:py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-xl space-y-4">
        {/* Compact Demo Controller Bar */}
        <div className="rounded-2xl bg-surface-900 text-white p-3 sm:p-3.5 shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-surface-300 font-medium hidden xs:inline">Simulasi Pelacakan:</span>
            <span className="font-bold text-accent-300">{trackingSteps[currentStepIndex]?.title}</span>
          </div>

          <Button
            onClick={handleAdvanceSimulation}
            size="sm"
            className="text-xs font-bold py-1.5 px-3 bg-brand-600 hover:bg-brand-700 text-white shrink-0"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            <span>Maju ({currentStepIndex + 1}/6)</span>
          </Button>
        </div>

        {/* Order Identification & Status */}
        <div className="rounded-2xl border border-surface-200/80 bg-white p-4 sm:p-5 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] text-surface-400 font-medium block">ID Pesanan</span>
            <span className="text-sm sm:text-base font-extrabold font-mono text-surface-900">{orderId}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-surface-400 font-medium block">Status</span>
            <span className="text-xs font-bold text-brand-800 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
              {trackingSteps[currentStepIndex]?.title || "Aktif"}
            </span>
          </div>
        </div>

        {/* Simulated Map Card */}
        <div className="rounded-2xl border border-surface-200/80 bg-white overflow-hidden shadow-2xs">
          <div className="relative h-44 sm:h-52 bg-surface-100 flex items-center justify-center overflow-hidden border-b border-surface-200">
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
            <div className="absolute left-6 bottom-6 flex flex-col items-center">
              <span className="bg-white text-[10px] font-bold text-surface-800 px-2 py-0.5 rounded shadow-xs border border-surface-200 mb-1">
                Kos Asal
              </span>
              <div className="h-3.5 w-3.5 rounded-full bg-brand-600 ring-4 ring-brand-200" />
            </div>

            {/* Moving Truck Pin */}
            <div
              className="absolute flex flex-col items-center transition-all duration-700"
              style={{
                left: `${Math.min(80, Math.max(20, (currentStepIndex / 5) * 80))}%`,
                top: `${45 - Math.sin((currentStepIndex / 5) * Math.PI) * 15}%`,
              }}
            >
              <span className="bg-surface-900 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow mb-1">
                {driver.plateNumber}
              </span>
              <div className="h-7 w-7 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-md ring-2 ring-white">
                <Truck className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Destination Pin */}
            <div className="absolute right-6 top-6 flex flex-col items-center">
              <span className="bg-white text-[10px] font-bold text-surface-800 px-2 py-0.5 rounded shadow-xs border border-surface-200 mb-1">
                Kos Tujuan
              </span>
              <div className="h-3.5 w-3.5 rounded-full bg-accent-600 ring-4 ring-accent-200" />
            </div>
          </div>

          <div className="p-3.5 sm:p-4 bg-brand-50/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-surface-800 font-semibold">
              <Clock className="h-3.5 w-3.5 text-brand-600" />
              <span>{trackingSteps[currentStepIndex]?.eta || "Sedang Berlangsung"}</span>
            </div>
            <span className="text-surface-500 font-medium">Jarak ± 7.5 km</span>
          </div>
        </div>

        {/* Driver & Helper Info Card */}
        <div className="rounded-2xl border border-surface-200/80 bg-white p-4 sm:p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-surface-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-brand-50 text-brand-800 font-bold text-xs flex items-center justify-center shrink-0">
                JS
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs sm:text-sm font-bold text-surface-900">{driver.name}</h4>
                  <span className="flex items-center text-[10px] font-bold text-accent-800 bg-accent-50 px-1.5 py-0.5 rounded">
                    <Star className="h-2.5 w-2.5 fill-accent-500 text-accent-500 mr-0.5" />
                    {driver.rating}
                  </span>
                </div>
                <p className="text-[11px] text-surface-500">{driver.vehicleModel} · {driver.plateNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => alert(`Simulasi Telepon ke Driver: ${driver.name}`)}
                className="h-9 w-9 rounded-xl bg-surface-100 text-surface-700 flex items-center justify-center hover:bg-surface-200 transition"
                title="Telepon Driver"
              >
                <Phone className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => alert(`Simulasi WhatsApp ke Driver: Halo Pak Joko, posisi jemput di mana ya?`)}
                className="h-9 w-9 rounded-xl bg-brand-600 text-white flex items-center justify-center hover:bg-brand-700 transition"
                title="WhatsApp Driver"
              >
                <MessageCircle className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-surface-600">
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-brand-600" />
              Helper: <strong className="text-surface-900">{driver.helperName}</strong>
            </span>
            <span className="text-[10px] text-brand-800 font-semibold bg-brand-50 px-2 py-0.5 rounded-full">
              Door-to-Door
            </span>
          </div>
        </div>

        {/* Vertical Step Timeline */}
        <div className="rounded-2xl border border-surface-200/80 bg-white p-4 sm:p-5 shadow-2xs">
          <h3 className="text-xs sm:text-sm font-bold text-surface-900 mb-4 pb-2 border-b border-surface-100">
            Tahapan Pindahan
          </h3>

          <div className="space-y-4">
            {trackingSteps.map((step, idx) => {
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const StepIcon = step.icon;

              return (
                <div key={step.id} className="flex items-start gap-3 relative">
                  {idx < trackingSteps.length - 1 && (
                    <div
                      className={`absolute left-3.5 top-7 -bottom-4 w-0.5 ${
                        isPast ? "bg-brand-500" : "bg-surface-200"
                      }`}
                    />
                  )}

                  <div
                    className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 z-10 text-xs transition ${
                      isPast
                        ? "bg-brand-600 text-white"
                        : isCurrent
                        ? "bg-brand-700 text-white ring-2 ring-brand-100"
                        : "bg-surface-100 text-surface-400"
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="h-3.5 w-3.5" /> : <StepIcon className="h-3.5 w-3.5" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-xs font-bold ${
                          isCurrent ? "text-brand-800" : isPast ? "text-surface-900" : "text-surface-400"
                        }`}
                      >
                        {step.title}
                      </h4>
                      <span className="text-[10px] text-surface-400">{step.eta}</span>
                    </div>
                    <p className="text-[11px] text-surface-500 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between text-xs text-surface-500 pt-2 pb-6">
          <Link href="/riwayat" className="hover:text-brand-700 font-semibold">
            ← Riwayat Pesanan
          </Link>
          <Link href="/" className="hover:text-brand-700 font-semibold">
            Beranda
          </Link>
        </div>

        {/* Review Modal */}
        <Modal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          title="Pindahan Selesai"
          description="Beri penilaian untuk Pak Joko & Mas Dimas."
        >
          <div className="space-y-4">
            <div className="text-center py-1">
              <div className="flex items-center justify-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition"
                  >
                    <Star
                      className={`h-7 w-7 ${
                        star <= rating ? "fill-accent-500 text-accent-500" : "text-surface-200"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-surface-700 mb-1">Komentar</label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full rounded-xl border border-surface-200 bg-surface-50 p-2.5 text-xs sm:text-sm focus:border-brand-600 focus:bg-white focus:outline-none transition"
              />
            </div>

            <Button onClick={handleSubmitReview} size="md" className="w-full text-xs py-2.5">
              Kirim Ulasan
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
