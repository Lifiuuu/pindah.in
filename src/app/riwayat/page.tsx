"use client";

import Link from "next/link";
import { Truck, MapPin, Plus, Compass } from "lucide-react";
import { usePindahStore } from "@/store/usePindahStore";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function OrderHistoryPage() {
  const { activeOrders } = usePindahStore();

  return (
    <div className="min-h-screen bg-surface-50 py-10 sm:py-14 px-4 sm:px-6">
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Header with Open Spacing */}
        <div className="flex items-center justify-between pb-4 border-b border-surface-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-950">Riwayat Pesanan Pindahan</h1>
            <p className="text-xs sm:text-sm text-surface-500 mt-1">Kelola dan pantau seluruh transaksi pindahan kosmu</p>
          </div>

          <Link href="/pesan">
            <Button size="sm" className="text-xs px-4 py-2.5">
              <Plus className="h-4 w-4 mr-1.5" />
              Pesan Baru
            </Button>
          </Link>
        </div>

        {/* Order List */}
        {activeOrders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-surface-300 bg-white p-14 text-center">
            <Truck className="h-12 w-12 text-surface-300 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-bold text-surface-900">Belum Ada Pesanan Pindahan</h3>
            <p className="text-xs sm:text-sm text-surface-500 max-w-sm mx-auto mt-1.5 mb-6 leading-relaxed">
              Mulai pesan armada pikap dan helper untuk memindahkan barang kosmu tanpa drama tawar-menawar.
            </p>
            <Link href="/pesan">
              <Button size="md" className="text-xs sm:text-sm px-6 py-3">
                Buat Pesanan Sekarang
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {activeOrders.map((order) => {
              const isCompleted = order.status === "completed";

              return (
                <div
                  key={order.id}
                  className="rounded-2xl border border-surface-200/80 bg-white p-5 sm:p-6 shadow-2xs space-y-3.5"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-surface-100 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-surface-900">{order.id}</span>
                      <span className="text-surface-300">·</span>
                      <span className="text-surface-500">{order.orderData.scheduledDate}</span>
                    </div>

                    <span
                      className={`font-semibold px-2.5 py-0.5 rounded-full text-[11px] ${
                        isCompleted
                          ? "bg-brand-50 text-brand-900 border border-brand-200"
                          : "bg-accent-50 text-accent-900 border border-accent-200"
                      }`}
                    >
                      {isCompleted ? "Pindahan Selesai" : "Sedang Berlangsung"}
                    </span>
                  </div>

                  {/* Route Overview */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-3.5 w-3.5 text-brand-600 shrink-0 mt-0.5" />
                      <div className="truncate">
                        <span className="font-medium text-surface-900 truncate block">
                          {order.orderData.pickupAddress}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="h-3.5 w-3.5 text-accent-700 shrink-0 mt-0.5" />
                      <div className="truncate">
                        <span className="font-medium text-surface-900 truncate block">
                          {order.orderData.deliveryAddress}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Amount & Actions */}
                  <div className="pt-3 border-t border-surface-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-surface-400 font-medium block">Total Biaya</span>
                      <span className="text-base sm:text-lg font-black text-brand-800">
                        {formatRupiah(order.pricing.totalAmount)}
                      </span>
                    </div>

                    <Link href={`/tracking/${order.id}`}>
                      <Button size="sm" className="text-xs px-3.5 py-2 font-bold flex items-center gap-1.5">
                        <Compass className="h-3.5 w-3.5" />
                        <span>Lacak Pesanan</span>
                      </Button>
                    </Link>
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
