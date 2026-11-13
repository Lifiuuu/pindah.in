"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Truck, ShieldCheck, Sparkles, UserCheck, ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/pesan", label: "Pesan Pindahan" },
    { href: "/riwayat", label: "Riwayat" },
    { href: "/mitra-preview", label: "Portal Mitra (80:20)" },
    { href: "/uji-pengguna", label: "Uji Pengguna (SUS)", badge: "UAS" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-slate-900 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm group-hover:bg-brand-700 transition">
            <Truck className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg leading-tight font-extrabold text-slate-900 flex items-center gap-1">
              Pindah<span className="text-brand-600">.in</span>
              <span className="rounded-full bg-accent-100 px-1.5 py-0.2 text-[10px] font-semibold text-accent-700">
                Surabaya
              </span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">
              Logistik Mahasiswa Anti Tawar-Menawar
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5",
                  isActive
                    ? "bg-brand-50 text-brand-700 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                {link.label}
                {link.badge && (
                  <span className="rounded bg-accent-500 px-1.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/uji-pengguna"
            className="md:hidden flex items-center gap-1 text-xs font-semibold bg-accent-50 text-accent-700 border border-accent-200 px-2.5 py-1 rounded-full"
          >
            <ClipboardCheck className="h-3.5 w-3.5" />
            <span>Tes SUS</span>
          </Link>

          <Link
            href="/pesan"
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-brand-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-700 transition"
          >
            Pesan Sekarang
          </Link>
        </div>
      </div>
    </header>
  );
}

