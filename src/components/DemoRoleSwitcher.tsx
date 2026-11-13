"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, HardHat, BarChart3, Layers, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DemoRoleSwitcher() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // Determine current active role
  const currentRole = pathname.startsWith("/mitra")
    ? "mitra"
    : pathname.startsWith("/admin")
    ? "admin"
    : "pelanggan";

  const roles = [
    {
      id: "pelanggan",
      label: "Pelanggan",
      icon: User,
      href: "/",
      tooltip: "Mode Mahasiswa (Booking, QRIS & Lacak)",
    },
    {
      id: "mitra",
      label: "Mitra Driver",
      icon: HardHat,
      href: "/mitra",
      tooltip: "Mode Driver & Helper (Tugas & Dompet 80%)",
    },
    {
      id: "admin",
      label: "Admin",
      icon: BarChart3,
      href: "/admin",
      tooltip: "Mode Manajemen (Validasi BEP & Bisnis)",
    },
  ];

  return (
    <div className="fixed z-50 bottom-4 md:bottom-6 right-3 sm:right-6 select-none font-sans print:hidden">
      {isExpanded ? (
        <div className="flex items-center gap-1.5 bg-surface-900/95 text-white backdrop-blur-md border border-surface-700/80 shadow-2xl rounded-2xl p-1.5 ring-1 ring-black/20 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Header indicator */}
          <div className="flex items-center gap-1.5 pl-2 pr-1 text-[11px] font-bold text-surface-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">Demo Role:</span>
          </div>

          {/* Role Pills */}
          <div className="flex items-center gap-1 bg-surface-800/80 p-0.5 rounded-xl border border-surface-700">
            {roles.map((role) => {
              const isActive = currentRole === role.id;
              const Icon = role.icon;

              return (
                <Link
                  key={role.id}
                  href={role.href}
                  title={role.tooltip}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                    isActive
                      ? "bg-brand-600 text-white shadow-sm ring-1 ring-white/20"
                      : "text-surface-300 hover:text-white hover:bg-surface-700/60"
                  )}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span>{role.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Minimize Button */}
          <button
            onClick={() => setIsExpanded(false)}
            title="Sembunyikan demo switcher"
            className="h-7 w-7 rounded-lg text-surface-400 hover:text-white hover:bg-surface-800 flex items-center justify-center transition"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        /* Collapsed Icon Trigger */
        <button
          onClick={() => setIsExpanded(true)}
          title="Buka Demo Role Switcher"
          className="h-11 w-11 rounded-2xl bg-surface-900 text-accent-300 border border-surface-700 shadow-2xl flex items-center justify-center hover:bg-surface-800 hover:scale-105 active:scale-95 transition group"
        >
          <Layers className="h-5 w-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-surface-900" />
        </button>
      )}
    </div>
  );
}

