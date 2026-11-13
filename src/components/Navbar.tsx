"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Truck, ClipboardCheck } from "lucide-react";
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
    <header className="sticky top-0 z-40 w-full border-b border-surface-200/70 bg-surface-50/90 backdrop-blur-md supports-[backdrop-filter]:bg-surface-50/80">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-surface-900 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-sm shadow-brand-700/20 group-hover:bg-brand-700 transition">
            <Truck className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg leading-snug font-extrabold text-surface-900 flex items-center gap-1.5">
              Pindah<span className="text-brand-600">.in</span>
              <span className="rounded-full bg-accent-100 px-2 py-0.5 text-[10px] font-bold text-accent-800 border border-accent-200">
                Surabaya
              </span>
            </span>
            <span className="text-[11px] text-surface-500 font-medium hidden sm:inline">
              Logistik Mahasiswa Bebas Tawar-Menawar
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-semibold",
                  isActive
                    ? "bg-brand-100/70 text-brand-800 font-bold"
                    : "text-surface-600 hover:text-surface-900 hover:bg-surface-100"
                )}
              >
                {link.label}
                {link.badge && (
                  <span className="rounded-md bg-accent-600 px-1.5 py-0.5 text-[9px] font-black text-white uppercase tracking-wider">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/uji-pengguna"
            className="md:hidden flex items-center gap-1.5 text-xs font-semibold bg-accent-100 text-accent-900 border border-accent-200 px-3 py-1.5 rounded-full"
          >
            <ClipboardCheck className="h-3.5 w-3.5" />
            <span>Tes SUS</span>
          </Link>

          <Link
            href="/pesan"
            className="hidden sm:inline-flex items-center justify-center rounded-xl bg-brand-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-brand-700 transition"
          >
            Pesan Sekarang
          </Link>
        </div>
      </div>
    </header>
  );
}
