"use client";

import Link from "next/link";
import { Clock, Truck, MapPin, ChevronRight, FileText, CheckCircle2, ShieldCheck, Plus } from "lucide-react";
import { usePindahStore } from "@/store/usePindahStore";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function OrderHistoryPage() {
  const { activeOrders } = usePindahStore();

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Riwayat Pesanan Pindahan</h1>
            <p className="text-xs text-slate-500 mt-0.5">Kelola dan pantau seluruh transaksi pindahan kosmu</p>
          </div>

          <Link href="/pesan">
            <Button size="sm" className="text-xs">
              <Plus className="h-4 w-4 mr-1" />
              Pesan Baru
            </Button>
          </Link>
        </div>

        {/* Order List */}
        {activeOrders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <Truck className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">Belum Ada Pesanan Pindahan</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5">
              Mulai pesan armada pikap dan helper untuk memindahkan barang kosmu tanpa drama tawar-menawar.
            </p>
            <Link href="/pesan">
              <Button size="md" className="text-xs">
                Buat Pesanan Sekarang
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {activeOrders.map((order) => {
              const isCompleted = order.status === "completed";

              return (
                <div
                  key={order.id}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-card transition space-y-3"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">{order.id}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500">{order.orderData.scheduledDate}</span>
                    </div>

                    <span
                      className={`font-semibold px-2.5 py-0.5 rounded-full text-[11px] ${
                        isCompleted
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-brand-50 text-brand-700 border border-brand-200"
                      }`}
                    >
                      {isCompleted ? "Pindahan Selesai" : "Sedang Berlangsung"}
                    </span>
                  </div>

                  {/* Route Overview */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" />
                      <div className="truncate">
                        <span className="text-slate-400 text-[10px] block">Jemput:</span>
                        <span className="font-semibold text-slate-800 truncate block">
                          {order.orderData.pickupAddress}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-accent-600 shrink-0 mt-0.5" />
                      <div className="truncate">
                        <span className="text-slate-400 text-[10px] block">Antar:</span>
                        <span className="font-semibold text-slate-800 truncate block">
                          {order.orderData.deliveryAddress}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Amount & Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Biaya</span>
                      <span className="text-base font-extrabold text-brand-700">
                        {formatRupiah(order.pricing.totalAmount)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link href={`/invoice/${order.id}`}>
                        <button className="h-8 px-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition flex items-center gap-1">
                          <FileText className="h-3.5 w-3.5" />
                          <span>Invoice</span>
                        </button>
                      </Link>

                      <Link href={`/tracking/${order.id}`}>
                        <Button size="sm" className="text-xs">
                          <span>Live Tracking</span>
                          <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

