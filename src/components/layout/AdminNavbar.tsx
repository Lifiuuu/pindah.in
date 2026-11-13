"use client";

import Link from "next/link";
import { BarChart3 } from "lucide-react";

export default function AdminNavbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-800 bg-surface-900 text-white shadow-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Admin */}
        <Link href="/admin" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-sm shadow-brand-700/40 group-hover:bg-brand-500 transition">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold tracking-tight">
                Pindah<span className="text-accent-400">.in</span>
              </span>
              <span className="rounded-full bg-surface-800 px-2 py-0.5 text-[10px] font-bold text-accent-300 border border-surface-700">
                ADMIN OPERATIONS
              </span>
            </div>
            <span className="text-[11px] text-surface-400 font-medium hidden sm:inline">
              Dashboard Validasi Bisnis & Operasional Logistik
            </span>
          </div>
        </Link>

        {/* Live Metrics Tag */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs">
          <div className="flex items-center gap-2 rounded-xl bg-surface-800/80 border border-surface-700 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-surface-300 hidden sm:inline">BEP Target:</span>
            <strong className="text-accent-300">48 / 67 Order (71.6%)</strong>
          </div>

          <div className="hidden sm:flex items-center gap-2 rounded-xl bg-surface-800/80 border border-surface-700 px-3 py-1.5">
            <span className="text-surface-300">Komisi Platform:</span>
            <strong className="text-white">20% Net</strong>
          </div>
        </div>
      </div>
    </header>
  );
}

