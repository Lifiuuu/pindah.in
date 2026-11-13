"use client";

import Link from "next/link";
import { Truck, ShieldCheck, ArrowLeft } from "lucide-react";

export default function InvoiceNavbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-200/90 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-sm">
            <Truck className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold text-surface-900">
              Pindah<span className="text-brand-600">.in</span>
            </span>
            <span className="text-[11px] text-surface-500 font-medium">
              Invoice Resmi Tagihan Pindahan Mahasiswa
            </span>
          </div>
        </div>

        {/* Security badge & back */}
        <div className="flex items-center gap-3 text-xs">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 font-bold text-emerald-800">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span className="hidden sm:inline">Pembayaran Terverifikasi</span>
            <span className="sm:hidden">Terverifikasi</span>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1 text-surface-500 hover:text-surface-900 font-semibold px-2 py-1 rounded-lg hover:bg-surface-100 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Beranda</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
