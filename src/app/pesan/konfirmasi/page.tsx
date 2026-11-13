"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  QrCode,
  Share2,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Truck,
  Users,
  MapPin,
  Calendar,
  Sparkles,
} from "lucide-react";
import { usePindahStore } from "@/store/usePindahStore";
import { POPULAR_LOCATIONS, VEHICLE_FLEET } from "@/data/mockData";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const { draft, calculatePricing, createOrder } = usePindahStore();
  const pricing = calculatePricing();

  const [paymentMethod, setPaymentMethod] = useState<"parent_link" | "qris">("parent_link");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [createdOrderId, setCreatedOrderId] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const pickupAreaObj = POPULAR_LOCATIONS.find((l) => l.id === draft.pickupAreaId);
  const delivAreaObj = POPULAR_LOCATIONS.find((l) => l.id === draft.deliveryAreaId);
  const vehicleObj = VEHICLE_FLEET.find((v) => v.id === draft.vehicleId) || VEHICLE_FLEET[0];

  // Generate order and share link
  const handleProceedOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const orderId = createOrder(paymentMethod);
      setCreatedOrderId(orderId);
      setIsProcessing(false);

      if (paymentMethod === "parent_link") {
        setIsShareModalOpen(true);
      } else {
        router.push(`/tracking/${orderId}`);
      }
    }, 600);
  };

  const invoiceUrl = typeof window !== "undefined" ? `${window.location.origin}/invoice/${createdOrderId || "PNDH-98214"}` : `https://pindah.in/invoice/PNDH-98214`;

  const waMessage = `Halo Pa/Ma, ini rincian pemesanan jasa pindahan kos ${draft.customerName || "saya"} di Surabaya menggunakan platform resmi Pindah.in. Sudah terverifikasi resmi kampus, aman, dan mencakup armada pikap serta helper sampai kamar kos:\n\nTotal Tagihan: ${formatRupiah(
    pricing.totalAmount
  )}\nTautan Pembayaran Resmi: ${invoiceUrl}\n\nMohon bantuannya ya Pa/Ma. Terima kasih banyak!`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(invoiceUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const encoded = encodeURIComponent(waMessage);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Langkah Terakhir Pemesanan
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Konfirmasi Pesanan & Opsi Pembayaran
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pilih apakah ingin membayar mandiri atau meneruskan tagihan ke orang tua selaku penyandang dana.
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm mb-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-brand-600" />
              <span className="font-bold text-sm text-slate-900">{vehicleObj.name}</span>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {draft.helperCount} Helper Door-to-Door
            </span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[11px]">Titik Jemput (Asal)</span>
                <span className="font-semibold text-slate-800">{draft.pickupAddress}</span>
                <span className="text-slate-500 block text-[11px]">
                  ({pickupAreaObj?.name} · Lantai {draft.pickupFloor})
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-accent-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[11px]">Titik Antar (Tujuan)</span>
                <span className="font-semibold text-slate-800">{draft.deliveryAddress}</span>
                <span className="text-slate-500 block text-[11px]">
                  ({delivAreaObj?.name} · Lantai {draft.deliveryFloor})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-1 text-slate-600">
              <Calendar className="h-4 w-4 text-slate-500" />
              <span>
                Jadwal: {draft.scheduledDate} · Pukul {draft.scheduledTime} WIB
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="rounded-2xl bg-brand-50/60 p-4 border border-brand-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 block">Total Tagihan Transparan:</span>
              <span className="text-2xl font-extrabold text-brand-800">{formatRupiah(pricing.totalAmount)}</span>
            </div>
            <span className="text-xs text-brand-700 bg-white px-3 py-1 rounded-xl border border-brand-200 font-semibold shadow-2xs">
              Fix Tanpa Nawar
            </span>
          </div>
        </div>

        {/* Payment Choices: Self or Payer (Parent) */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm mb-6">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-3">Pilih Metode Pembayaran</h3>

          <div className="space-y-3">
            {/* Parent Link (Payer Support) */}
            <div
              onClick={() => setPaymentMethod("parent_link")}
              className={`rounded-2xl border p-4 cursor-pointer transition flex items-start gap-3 ${
                paymentMethod === "parent_link"
                  ? "border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <div className="h-10 w-10 rounded-xl bg-accent-100 text-accent-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                <Share2 className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">
                    Bagi Tagihan ke Orang Tua (Payer Share Link)
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent-500 text-white">
                    Rekomendasi
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Kirimkan tautan invoice resmi ke WhatsApp orang tua. Orang tua dapat melihat rincian barang dan
                  membayarnya langsung via QRIS/M-Banking.
                </p>
              </div>
            </div>

            {/* QRIS Direct */}
            <div
              onClick={() => setPaymentMethod("qris")}
              className={`rounded-2xl border p-4 cursor-pointer transition flex items-start gap-3 ${
                paymentMethod === "qris"
                  ? "border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                <QrCode className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900">Bayar Mandiri via QRIS / Virtual Account</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Bayar langsung menggunakan aplikasi dompet digital (GoPay, OVO, ShopeePay) atau m-banking.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={handleProceedOrder}
              isLoading={isProcessing}
              size="lg"
              className="w-full text-sm sm:text-base"
            >
              {paymentMethod === "parent_link" ? "Buat Tautan Invoice untuk Orang Tua" : "Bayar Sekarang via QRIS"}
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </div>
        </div>

        {/* Modal Share WhatsApp ke Orang Tua */}
        <Modal
          isOpen={isShareModalOpen}
          onClose={() => router.push(`/tracking/${createdOrderId || "PNDH-98214"}`)}
          title="Tautan Tagihan Berhasil Dibuat!"
          description="Kirimkan link ini ke WhatsApp orang tua agar dapat dibayarkan langsung."
        >
          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-200 text-xs text-slate-700 leading-relaxed font-mono whitespace-pre-wrap">
              {waMessage}
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCopyLink} variant="outline" className="flex-1 text-xs">
                {isCopied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-600 mr-1" />
                    Tersalin!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Salin Teks
                  </>
                )}
              </Button>

              <Button onClick={handleShareWhatsApp} variant="accent" className="flex-1 text-xs text-slate-950 font-bold">
                <MessageCircle className="h-4 w-4 mr-1" />
                Buka WhatsApp
              </Button>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link href={`/invoice/${createdOrderId || "PNDH-98214"}`} target="_blank">
                <Button variant="secondary" className="w-full text-xs">
                  <ExternalLink className="h-3.5 w-3.5 mr-1" />
                  Pratinjau Halaman Invoice Orang Tua
                </Button>
              </Link>

              <Link href={`/tracking/${createdOrderId || "PNDH-98214"}`}>
                <Button className="w-full text-xs">
                  Lanjut ke Halaman Tracking Pesanan
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

