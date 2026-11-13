"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  ShieldCheck,
  QrCode,
  Copy,
  Check,
  ArrowRight,
  Share2,
  Truck,
  MapPin,
  Calendar,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { usePindahStore } from "@/store/usePindahStore";
import { POPULAR_LOCATIONS, VEHICLE_FLEET } from "@/data/mockData";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const { draft, calculatePricing, createOrder } = usePindahStore();
  const pricing = calculatePricing();

  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const pickupAreaObj = POPULAR_LOCATIONS.find((l) => l.id === draft.pickupAreaId);
  const delivAreaObj = POPULAR_LOCATIONS.find((l) => l.id === draft.deliveryAreaId);
  const vehicleObj = VEHICLE_FLEET.find((v) => v.id === draft.vehicleId) || VEHICLE_FLEET[0];

  const waShareText = `Halo Pa/Ma, ini tagihan resmi pindahan kos ${
    draft.customerName || "aku"
  } di Surabaya via Pindah.in:\n\n• Paket: ${vehicleObj.name} + ${draft.helperCount} Helper Door-to-Door\n• Total Biaya: ${formatRupiah(
    pricing.totalAmount
  )}\n• Rute: ${draft.pickupAddress} ➔ ${draft.deliveryAddress}\n\nBarcode QRIS-nya sudah aku screenshot dari aplikasi Pindah.in. Mohon bantuannya untuk di-scan via m-Banking ya Pa/Ma. Terima kasih!`;

  const handleCopyDetails = () => {
    navigator.clipboard.writeText(waShareText);
    setIsCopied(true);
    showToast("Detail tagihan tersalin! Siap dikirim ke WhatsApp orang tua.");
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const encoded = encodeURIComponent(waShareText);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const orderId = createOrder("qris");
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
      showToast("Pembayaran QRIS Terverifikasi! Mengalihkan ke pelacakan driver...");
      setTimeout(() => {
        router.push(`/tracking/${orderId}`);
      }, 900);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-surface-50 py-8 sm:py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-xl space-y-6">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 rounded-2xl bg-surface-900 text-white px-4 py-3 shadow-xl text-xs font-semibold flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            {toastMessage}
          </div>
        )}

        {/* Page Title */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-brand-800 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Langkah Terakhir Pemesanan
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-950">
            Pembayaran QRIS Pindahan Kos
          </h1>
          <p className="text-xs sm:text-sm text-surface-500 max-w-md mx-auto leading-relaxed">
            Scan langsung dengan m-Banking apa saja, atau screenshot kode QRIS di bawah untuk dikirimkan ke orang tua via WhatsApp.
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="rounded-3xl border border-surface-200/90 bg-white p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-100">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-brand-600" />
              <span className="font-bold text-sm sm:text-base text-surface-900">{vehicleObj.name}</span>
            </div>
            <span className="text-xs font-bold text-brand-800 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
              {draft.helperCount} Helper Door-to-Door
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-surface-400 text-[10px] block font-bold uppercase tracking-wider">
                  Jemput (Kos Asal):
                </span>
                <span className="font-semibold text-surface-900 block leading-snug">{draft.pickupAddress}</span>
                <span className="text-surface-500 text-[11px] block">
                  {pickupAreaObj?.name} · Lt. {draft.pickupFloor}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-accent-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-surface-400 text-[10px] block font-bold uppercase tracking-wider">
                  Antar (Kos Baru):
                </span>
                <span className="font-semibold text-surface-900 block leading-snug">{draft.deliveryAddress}</span>
                <span className="text-surface-500 text-[11px] block">
                  {delivAreaObj?.name} · Lt. {draft.deliveryFloor}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 text-surface-600 border-t border-surface-100">
              <Calendar className="h-3.5 w-3.5 text-surface-400" />
              <span>
                Jadwal: <strong>{draft.scheduledDate}</strong> · Pukul <strong>{draft.scheduledTime} WIB</strong>
              </span>
            </div>
          </div>
        </div>

        {/* QRIS Card Component */}
        <div className="rounded-3xl border border-surface-200/90 bg-white p-6 sm:p-8 shadow-card text-center space-y-5">
          {/* QRIS Header */}
          <div className="flex items-center justify-between pb-4 border-b border-surface-100">
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-surface-950">
                QR<span className="text-rose-600">IS</span>
              </span>
              <span className="text-[10px] font-bold text-surface-400 border-l border-surface-200 pl-2">
                Standar Pembayaran Nasional
              </span>
            </div>
            <span className="rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Aktif 15:00
            </span>
          </div>

          <div>
            <span className="text-xs text-surface-500 block">Total Tagihan Fix Tanpa Nawar:</span>
            <div className="text-3xl font-black text-brand-800 mt-1">{formatRupiah(pricing.totalAmount)}</div>
            <span className="text-[11px] text-surface-400 block mt-0.5">
              Merchant: PINDAH.IN SURABAYA (NMID: ID1020083921)
            </span>
          </div>

          {/* QR Code Graphic Box */}
          <div className="mx-auto w-64 p-4 rounded-3xl bg-white border-2 border-surface-200 shadow-inner flex flex-col items-center">
            {/* SVG Visual of Clean QR Code */}
            <svg
              className="w-52 h-52 text-surface-900"
              viewBox="0 0 100 100"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Corners */}
              <rect x="5" y="5" width="26" height="26" rx="4" fill="currentColor" />
              <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
              <rect x="13" y="13" width="10" height="10" rx="2" fill="currentColor" />

              <rect x="69" y="5" width="26" height="26" rx="4" fill="currentColor" />
              <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
              <rect x="77" y="13" width="10" height="10" rx="2" fill="currentColor" />

              <rect x="5" y="69" width="26" height="26" rx="4" fill="currentColor" />
              <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
              <rect x="13" y="77" width="10" height="10" rx="2" fill="currentColor" />

              {/* Data Grid Simulation Patterns */}
              <rect x="36" y="8" width="5" height="5" />
              <rect x="44" y="8" width="8" height="5" />
              <rect x="55" y="8" width="8" height="5" />

              <rect x="36" y="16" width="10" height="5" />
              <rect x="50" y="16" width="5" height="5" />
              <rect x="58" y="16" width="6" height="5" />

              <rect x="36" y="24" width="6" height="5" />
              <rect x="45" y="24" width="10" height="5" />
              <rect x="58" y="24" width="6" height="5" />

              <rect x="8" y="36" width="5" height="8" />
              <rect x="16" y="36" width="12" height="5" />
              <rect x="32" y="36" width="5" height="5" />
              <rect x="40" y="36" width="20" height="5" />
              <rect x="64" y="36" width="10" height="5" />
              <rect x="78" y="36" width="14" height="5" />

              <rect x="8" y="47" width="10" height="5" />
              <rect x="22" y="47" width="14" height="6" />
              <rect x="40" y="44" width="20" height="12" rx="3" fill="#8c6035" />
              <rect x="64" y="47" width="14" height="6" />
              <rect x="82" y="47" width="10" height="5" />

              <rect x="8" y="56" width="16" height="5" />
              <rect x="28" y="56" width="8" height="5" />
              <rect x="64" y="56" width="8" height="5" />
              <rect x="76" y="56" width="16" height="5" />

              <rect x="36" y="69" width="6" height="6" />
              <rect x="45" y="69" width="8" height="5" />
              <rect x="56" y="69" width="6" height="6" />
              <rect x="65" y="69" width="10" height="5" />
              <rect x="78" y="69" width="14" height="5" />

              <rect x="36" y="78" width="14" height="5" />
              <rect x="54" y="78" width="6" height="6" />
              <rect x="64" y="78" width="8" height="5" />
              <rect x="76" y="78" width="16" height="6" />

              <rect x="36" y="86" width="8" height="6" />
              <rect x="48" y="86" width="12" height="6" />
              <rect x="64" y="86" width="6" height="6" />
              <rect x="74" y="86" width="8" height="6" />
              <rect x="86" y="86" width="6" height="6" />
            </svg>
            <span className="text-[10px] text-surface-500 font-bold mt-2">
              BCA · Mandiri · BRI · BNI · GoPay · ShopeePay
            </span>
          </div>

          <p className="text-xs text-surface-500 max-w-sm mx-auto leading-relaxed">
            Screenshot barcode di atas atau salin detail pesanan untuk dikirimkan ke orang tua jika dibantu bayar.
          </p>

          {/* Quick Action Buttons for Sharing */}
          <div className="flex gap-2.5 pt-2">
            <Button
              onClick={handleCopyDetails}
              variant="outline"
              className="flex-1 text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 font-bold"
            >
              {isCopied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              <span>{isCopied ? "Tersalin!" : "Salin Tagihan"}</span>
            </Button>

            <Button
              onClick={handleShareWhatsApp}
              className="flex-1 text-xs py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center gap-1.5 font-bold shadow-sm"
            >
              <Share2 className="h-4 w-4" />
              <span>Kirim ke WhatsApp</span>
            </Button>
          </div>

          {/* Prominent Instant Simulation Button */}
          <div className="pt-4 border-t border-surface-100">
            <Button
              onClick={handleSimulatePayment}
              isLoading={isProcessing}
              className="w-full text-sm font-bold py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              <span>Simulasi Pembayaran Berhasil (Uji Demo)</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <span className="text-[11px] text-surface-400 block mt-2">
              Klik tombol di atas untuk simulasi jika QRIS telah selesai dibayar
            </span>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center pt-2">
          <Link
            href="/pesan"
            className="text-xs font-semibold text-surface-500 hover:text-surface-800 transition"
          >
            ← Kembali ke Form Pemesanan
          </Link>
        </div>
      </div>
    </div>
  );
}
