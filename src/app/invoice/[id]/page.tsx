"use client";

import { use, useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  ShieldCheck,
  CheckCircle2,
  QrCode,
  CreditCard,
  Building2,
  Calendar,
  MapPin,
  Truck,
  Users,
  Package,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { usePindahStore } from "@/store/usePindahStore";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;

  const { getOrderById, updatePaymentStatus } = usePindahStore();
  const order = getOrderById(orderId);

  const [isPaid, setIsPaid] = useState<boolean>(order?.paymentStatus === "paid");
  const [isPaying, setIsPaying] = useState<boolean>(false);

  const handleSimulatePayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaid(true);
      setIsPaying(false);
      updatePaymentStatus(orderId, "paid");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 1000);
  };

  const amount = order?.pricing.totalAmount || 150000;
  const studentName = order?.orderData.customerName || "Putri Atika Mahardika";
  const pickupAddr = order?.orderData.pickupAddress || "Kost Sutorejo Prima No. 18, Kamar 204";
  const delivAddr = order?.orderData.deliveryAddress || "Wisma Mahasiswa Dharmawangsa No. 45, Kamar 12";

  return (
    <div className="min-h-screen bg-slate-100/80 py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-xl">
        {/* Verification Banner */}
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/80 p-4 mb-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-emerald-800 font-bold">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Portal Pembayaran Resmi Orang Tua / Penyandang Dana</span>
          </div>
          <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
            Terverifikasi
          </span>
        </div>

        {/* Invoice Main Paper Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card relative overflow-hidden">
          {/* Header */}
          <div className="flex items-start justify-between pb-5 border-b border-slate-100">
            <div>
              <span className="text-xl font-extrabold text-slate-900 flex items-center gap-1">
                Pindah<span className="text-brand-600">.in</span>
              </span>
              <p className="text-xs text-slate-500 mt-0.5">Layanan Logistik Pindahan Mahasiswa Kampus</p>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-mono text-slate-400 block">ID Tagihan:</span>
              <span className="text-sm font-bold font-mono text-slate-800">{orderId}</span>
              <div className="mt-1">
                {isPaid ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    Lunas Terbayar
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
                    Menunggu Pembayaran
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Student & Service Overview */}
          <div className="py-4 space-y-3 text-xs sm:text-sm border-b border-slate-100">
            <div className="flex justify-between">
              <span className="text-slate-500">Nama Mahasiswa:</span>
              <span className="font-bold text-slate-900">{studentName} (UNAIR Surabaya)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Paket Layanan:</span>
              <span className="font-bold text-slate-900">Armada Pikap + Helper Door-to-Door</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Jaminan Keamanan:</span>
              <span className="font-semibold text-emerald-600 flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                Garansi Barang Dilindungi
              </span>
            </div>
          </div>

          {/* Locations */}
          <div className="py-4 space-y-2.5 border-b border-slate-100 text-xs">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-bold">Kos Asal (Jemput):</span>
                <span className="font-medium text-slate-800">{pickupAddr}</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-accent-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-bold">Kos Baru (Antar):</span>
                <span className="font-medium text-slate-800">{delivAddr}</span>
              </div>
            </div>
          </div>

          {/* Total Amount */}
          <div className="pt-5 pb-6">
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium block">Total Pembayaran:</span>
                <span className="text-2xl sm:text-3xl font-black text-brand-700">{formatRupiah(amount)}</span>
              </div>
              <span className="text-[11px] text-slate-500 max-w-[130px] text-right font-medium">
                Tarif resmi, bebas pungli di lokasi pindahan.
              </span>
            </div>
          </div>

          {/* Payment Action or Confirmation */}
          {isPaid ? (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5 text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-emerald-900">Pembayaran Berhasil Diverifikasi!</h4>
                <p className="text-xs text-emerald-700 mt-1 max-w-sm mx-auto">
                  Terima kasih Pa/Ma! Pesanan pindahan kos ananda sedang dipersiapkan dan armada driver segera menuju
                  lokasi.
                </p>
              </div>

              <Link href={`/tracking/${orderId}`}>
                <Button className="mt-2 text-xs">
                  Pantau Pergerakan Armada (Live Tracking)
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                <span className="text-xs font-bold text-slate-700 block mb-2">Pindai QRIS untuk Bayar Instan</span>
                <div className="h-44 w-44 mx-auto rounded-xl border border-slate-200 p-2 bg-slate-50 flex flex-col items-center justify-center">
                  <QrCode className="h-32 w-32 text-slate-800" />
                  <span className="text-[10px] font-mono text-slate-500 mt-1">NMID: ID102026PINDAHIN</span>
                </div>
                <span className="text-[11px] text-slate-400 block mt-2">
                  Dapat dipindai dari BCA Mobile, Livin Mandiri, BRImo, GoPay, OVO, atau ShopeePay.
                </span>
              </div>

              <Button
                onClick={handleSimulatePayment}
                isLoading={isPaying}
                size="lg"
                variant="accent"
                className="w-full text-slate-950 font-bold text-sm"
              >
                Simulasi Konfirmasi Bayar Sekarang (Demo UAS)
              </Button>
            </div>
          )}
        </div>

        <div className="text-center mt-6 text-xs text-slate-400">
          Butuh bantuan terkait pesanan ini? Layanan Mahasiswa Pindah.in: 0812-3456-7890
        </div>
      </div>
    </div>
  );
}

