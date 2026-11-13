"use client";

import Link from "next/link";
import { HardHat, ArrowLeft, Wallet } from "lucide-react";
import { formatRupiah } from "@/lib/utils";

export default function MitraNavbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo Khusus Mitra */}
        <Link href="/mitra" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface-900 text-accent-300 shadow-sm group-hover:bg-surface-800 transition">
            <HardHat className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-surface-900">
                Pindah<span className="text-brand-600">.in</span>
              </span>
              <span className="rounded-full bg-surface-900 px-2 py-0.5 text-[10px] font-bold text-accent-300">
                MITRA KERJA
              </span>
            </div>
            <span className="text-[11px] text-surface-500 font-medium hidden sm:inline">
              Portal Driver Pikap & Helper Angkut
            </span>
          </div>
        </Link>

        {/* Status & Wallet Indicator */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Driver Status Pill */}
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">Status:</span> Siaga Online
          </div>

          {/* Saldo Mitra */}
          <div className="hidden sm:flex items-center gap-2 rounded-xl bg-surface-100 border border-surface-200 px-3 py-1.5 text-xs">
            <Wallet className="h-4 w-4 text-brand-600" />
            <div>
              <span className="text-[10px] text-surface-500 block leading-none">Dompet Mitra (80%)</span>
              <span className="font-bold text-surface-900">{formatRupiah(840000)}</span>
            </div>
          </div>

          {/* Exit / Switch to Customer */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-xl border border-surface-200 bg-white px-3 py-1.5 text-xs font-semibold text-surface-600 hover:text-surface-900 hover:bg-surface-50 transition"
            title="Kembali ke Tampilan Pelanggan Mahasiswa"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Tampilan</span> Pelanggan
          </Link>
        </div>
      </div>
    </header>
  );
}

