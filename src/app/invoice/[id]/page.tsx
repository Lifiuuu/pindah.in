"use client";

import { use, useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  ShieldCheck,
  CheckCircle2,
  QrCode,
  MapPin,
  ArrowRight,
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
    <div className="min-h-screen bg-surface-100/70 py-10 sm:py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-xl">
        {/* Verification Banner */}
        <div className="rounded-3xl border border-brand-200 bg-brand-50/80 p-5 mb-6 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 text-brand-900 font-bold">
            <ShieldCheck className="h-5 w-5 text-brand-600 shrink-0" />
            <span>Portal Pembayaran Resmi Orang Tua / Penyandang Dana</span>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-brand-800 border border-brand-200 shadow-2xs">
            Terverifikasi
          </span>
        </div>

        {/* Invoice Main Paper Card */}
        <div className="rounded-3xl border border-surface-200/90 bg-white p-7 sm:p-10 shadow-card relative overflow-hidden">
          {/* Header */}
          <div className="flex items-start justify-between pb-6 border-b border-surface-100">
            <div>
              <span className="text-2xl font-extrabold text-surface-950 flex items-center gap-1.5">
                Pindah<span className="text-brand-600">.in</span>
              </span>
              <p className="text-xs sm:text-sm text-surface-500 mt-1">Layanan Logistik Pindahan Mahasiswa Kampus</p>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-mono text-surface-400 block font-bold uppercase">ID Tagihan:</span>
              <span className="text-sm sm:text-base font-bold font-mono text-surface-900">{orderId}</span>
              <div className="mt-1.5">
                {isPaid ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-900 border border-brand-200">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-700" />
                    Lunas Terbayar
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent-100 px-3 py-1 text-xs font-bold text-accent-900 border border-accent-300">
                    Menunggu Pembayaran
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Student & Service Overview */}
          <div className="py-6 space-y-4 text-xs sm:text-sm border-b border-surface-100">
            <div className="flex justify-between">
              <span className="text-surface-500">Nama Mahasiswa:</span>
              <span className="font-bold text-surface-900">{studentName} (UNAIR Surabaya)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-500">Paket Layanan:</span>
              <span className="font-bold text-surface-900">Armada Pikap + Helper Door-to-Door</span>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-500">Jaminan Keamanan:</span>
              <span className="font-semibold text-brand-700 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                Garansi Barang Dilindungi
              </span>
            </div>
          </div>

          {/* Locations */}
          <div className="py-6 space-y-3.5 border-b border-surface-100 text-xs sm:text-sm">
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-surface-400 text-[10px] block uppercase font-bold tracking-wider">
                  Kos Asal (Jemput):
                </span>
                <span className="font-medium text-surface-800 leading-snug block mt-0.5">{pickupAddr}</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-accent-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-surface-400 text-[10px] block uppercase font-bold tracking-wider">
                  Kos Baru (Antar):
                </span>
                <span className="font-medium text-surface-800 leading-snug block mt-0.5">{delivAddr}</span>
              </div>
            </div>
          </div>

          {/* Total Amount */}
          <div className="pt-6 pb-8">
            <div className="rounded-2xl bg-surface-50 p-5 sm:p-6 border border-surface-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-surface-500 font-medium block">Total Pembayaran:</span>
                <span className="text-2xl sm:text-3xl font-black text-brand-800">{formatRupiah(amount)}</span>
              </div>
              <span className="text-xs text-surface-500 max-w-[150px] text-right font-medium leading-relaxed">
                Tarif resmi, bebas biaya siluman di lokasi pindahan.
              </span>
            </div>
          </div>

          {/* Payment Action or Confirmation */}
          {isPaid ? (
            <div className="rounded-2xl bg-brand-50 border border-brand-200 p-6 text-center space-y-4">
              <div className="h-14 w-14 rounded-full bg-brand-600 text-white flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-brand-900">Pembayaran Berhasil Diverifikasi</h4>
                <p className="text-xs sm:text-sm text-brand-800 mt-1 max-w-sm mx-auto leading-relaxed">
                  Terima kasih Pa/Ma! Pesanan pindahan kos ananda sedang dipersiapkan dan armada driver segera menuju
                  lokasi.
                </p>
              </div>

              <Link href={`/tracking/${orderId}`}>
                <Button size="md" className="mt-2 text-xs sm:text-sm px-6 py-3">
                  Pantau Pergerakan Armada (Live Tracking)
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="rounded-3xl border border-surface-200 bg-white p-6 text-center">
                <span className="text-xs sm:text-sm font-bold text-surface-800 block mb-3">
                  Pindai QRIS untuk Bayar Instan
                </span>
                <div className="h-48 w-48 mx-auto rounded-2xl border border-surface-200 p-3 bg-surface-50 flex flex-col items-center justify-center shadow-xs">
                  <QrCode className="h-36 w-36 text-surface-800" />
                  <span className="text-[10px] font-mono text-surface-500 mt-1.5">NMID: ID102026PINDAHIN</span>
                </div>
                <span className="text-xs text-surface-400 block mt-3 leading-relaxed">
                  Dapat dipindai dari BCA Mobile, Livin Mandiri, BRImo, GoPay, OVO, atau ShopeePay.
                </span>
              </div>

              <Button
                onClick={handleSimulatePayment}
                isLoading={isPaying}
                size="lg"
                variant="accent"
                className="w-full text-slate-950 font-bold text-sm sm:text-base py-4"
              >
                Simulasi Konfirmasi Bayar Sekarang (Demo UAS)
              </Button>
            </div>
          )}
        </div>

        <div className="text-center mt-8 text-xs text-surface-500">
          Layanan Bantuan Mahasiswa Pindah.in: 0812-3456-7890
        </div>
      </div>
    </div>
  );
}
