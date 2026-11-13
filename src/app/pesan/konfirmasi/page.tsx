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
  MapPin,
  Calendar,
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

  const invoiceUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/invoice/${createdOrderId || "PNDH-98214"}`
      : `https://pindah.in/invoice/PNDH-98214`;

  const waMessage = `Halo Pa/Ma, ini rincian pemesanan jasa pindahan kos ${
    draft.customerName || "saya"
  } di Surabaya menggunakan platform resmi Pindah.in. Sudah terverifikasi resmi kampus, aman, dan mencakup armada pikap serta helper sampai kamar kos:\n\nTotal Tagihan: ${formatRupiah(
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
    <div className="min-h-screen bg-surface-50 py-10 sm:py-14 px-4 sm:px-6">
      <div className="mx-auto max-w-2xl">
        {/* Header with Open Spacing */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-brand-800 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200">
            Langkah Terakhir Pemesanan
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-950 mt-3">
            Konfirmasi Pesanan & Opsi Pembayaran
          </h1>
          <p className="text-xs sm:text-sm text-surface-500 mt-1.5 leading-relaxed">
            Pilih metode pembayaran mandiri atau bagikan tautan invoice ke orang tua selaku penyandang dana.
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="rounded-3xl border border-surface-200/90 bg-white p-7 sm:p-9 shadow-subtle mb-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-surface-100">
            <div className="flex items-center gap-2.5">
              <Truck className="h-5 w-5 text-brand-600" />
              <span className="font-bold text-sm sm:text-base text-surface-900">{vehicleObj.name}</span>
            </div>
            <span className="text-xs font-bold text-brand-800 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              {draft.helperCount} Helper Door-to-Door
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-brand-600 shrink-0 mt-1" />
              <div>
                <span className="text-surface-400 block text-[11px] font-bold uppercase">Titik Jemput (Asal)</span>
                <span className="font-semibold text-surface-900 leading-snug block">{draft.pickupAddress}</span>
                <span className="text-surface-500 block text-xs mt-0.5">
                  {pickupAreaObj?.name} · Lantai {draft.pickupFloor}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-accent-700 shrink-0 mt-1" />
              <div>
                <span className="text-surface-400 block text-[11px] font-bold uppercase">Titik Antar (Tujuan)</span>
                <span className="font-semibold text-surface-900 leading-snug block">{draft.deliveryAddress}</span>
                <span className="text-surface-500 block text-xs mt-0.5">
                  {delivAreaObj?.name} · Lantai {draft.deliveryFloor}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-2 text-surface-600 border-t border-surface-100">
              <Calendar className="h-4 w-4 text-surface-400" />
              <span>
                Jadwal: <strong>{draft.scheduledDate}</strong> · Pukul <strong>{draft.scheduledTime} WIB</strong>
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="rounded-2xl bg-brand-50/70 p-5 border border-brand-200 flex items-center justify-between">
            <div>
              <span className="text-xs text-surface-500 font-medium block">Total Tagihan Transparan:</span>
              <span className="text-2xl sm:text-3xl font-black text-brand-800">{formatRupiah(pricing.totalAmount)}</span>
            </div>
            <span className="text-xs text-brand-800 bg-white px-3 py-1.5 rounded-xl border border-brand-200 font-bold shadow-2xs">
              Fix Tanpa Nawar
            </span>
          </div>
        </div>

        {/* Payment Choices */}
        <div className="rounded-3xl border border-surface-200/90 bg-white p-7 sm:p-9 shadow-subtle mb-8">
          <h3 className="text-base sm:text-lg font-bold text-surface-900 mb-4">Pilih Metode Pembayaran</h3>

          <div className="space-y-4">
            {/* Parent Link (Payer Support) */}
            <div
              onClick={() => setPaymentMethod("parent_link")}
              className={`rounded-2xl border p-5 cursor-pointer transition flex items-start gap-4 ${
                paymentMethod === "parent_link"
                  ? "border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/25 shadow-subtle"
                  : "border-surface-200 hover:bg-surface-50"
              }`}
            >
              <div className="h-11 w-11 rounded-2xl bg-accent-100 text-accent-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                <Share2 className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm sm:text-base font-bold text-surface-900">
                    Bagi Tagihan ke Orang Tua (Payer Share Link)
                  </h4>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-accent-600 text-white">
                    Rekomendasi
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-surface-600 mt-1.5 leading-relaxed">
                  Kirimkan tautan invoice resmi ke WhatsApp orang tua. Orang tua dapat melihat rincian barang dan
                  membayarnya langsung via QRIS atau M-Banking tanpa membebani mahasiswa.
                </p>
              </div>
            </div>

            {/* QRIS Direct */}
            <div
              onClick={() => setPaymentMethod("qris")}
              className={`rounded-2xl border p-5 cursor-pointer transition flex items-start gap-4 ${
                paymentMethod === "qris"
                  ? "border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/25 shadow-subtle"
                  : "border-surface-200 hover:bg-surface-50"
              }`}
            >
              <div className="h-11 w-11 rounded-2xl bg-surface-100 text-surface-700 flex items-center justify-center shrink-0 mt-0.5">
                <QrCode className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm sm:text-base font-bold text-surface-900">Bayar Mandiri via QRIS</h4>
                <p className="text-xs sm:text-sm text-surface-600 mt-1.5 leading-relaxed">
                  Bayar langsung menggunakan aplikasi dompet digital (GoPay, OVO, ShopeePay) atau m-banking dengan QRIS instan.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Button
              onClick={handleProceedOrder}
              isLoading={isProcessing}
              size="lg"
              className="w-full text-sm sm:text-base py-4"
            >
              {paymentMethod === "parent_link" ? "Buat Tautan Invoice untuk Orang Tua" : "Bayar Sekarang via QRIS"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Modal Share WhatsApp ke Orang Tua */}
        <Modal
          isOpen={isShareModalOpen}
          onClose={() => router.push(`/tracking/${createdOrderId || "PNDH-98214"}`)}
          title="Tautan Tagihan Berhasil Dibuat"
          description="Kirimkan pesan ini ke WhatsApp orang tua agar dapat dibayarkan langsung secara online."
        >
          <div className="space-y-5">
            <div className="rounded-2xl bg-surface-50 p-4 border border-surface-200 text-xs text-surface-700 leading-relaxed font-mono whitespace-pre-wrap">
              {waMessage}
            </div>

            <div className="flex gap-3">
              <Button onClick={handleCopyLink} variant="outline" className="flex-1 text-xs py-3">
                {isCopied ? (
                  <>
                    <Check className="h-4 w-4 text-brand-700 mr-1.5" />
                    Tersalin!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1.5" />
                    Salin Teks
                  </>
                )}
              </Button>

              <Button
                onClick={handleShareWhatsApp}
                variant="accent"
                className="flex-1 text-xs text-slate-950 font-bold py-3"
              >
                <MessageCircle className="h-4 w-4 mr-1.5" />
                Buka WhatsApp
              </Button>
            </div>

            <div className="pt-3 border-t border-surface-100 flex flex-col gap-2.5">
              <Link href={`/invoice/${createdOrderId || "PNDH-98214"}`} target="_blank">
                <Button variant="secondary" className="w-full text-xs py-3">
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                  Pratinjau Halaman Invoice Orang Tua
                </Button>
              </Link>

              <Link href={`/tracking/${createdOrderId || "PNDH-98214"}`}>
                <Button className="w-full text-xs py-3">
                  Lanjut ke Halaman Tracking Pesanan
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
