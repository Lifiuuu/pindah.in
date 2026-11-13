"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Truck,
  Compass,
  Clock,
  PlusCircle,
  Menu,
  X,
  Calculator,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CustomerNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when menu is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const customerLinks = [
    {
      href: "/",
      label: "Beranda",
      icon: Truck,
      desc: "Halaman utama & keunggulan layanan",
    },
    {
      href: "/pesan",
      label: "Pesan Pindahan",
      icon: PlusCircle,
      desc: "Form booking pikap & helper angkut",
    },
    {
      href: "/tracking/PNDH-98214",
      label: "Lacak Pesanan",
      icon: Compass,
      desc: "Pantau status & posisi armada realtime",
    },
    {
      href: "/riwayat",
      label: "Riwayat",
      icon: Clock,
      desc: "Daftar pemesanan sebelumnya",
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-200/70 bg-surface-50/90 backdrop-blur-md supports-[backdrop-filter]:bg-surface-50/80">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo Pelanggan */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2.5 font-bold tracking-tight text-surface-900 group"
        >
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

        {/* Customer Desktop Nav Links (Hidden on mobile & tablet: < lg) */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          {customerLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href.split("/")[1] ? `/${link.href.split("/")[1]}` : link.href);
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
              </Link>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/pesan"
            className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-3.5 sm:px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-brand-700 active:scale-95 transition"
          >
            Pesan Sekarang
          </Link>

          {/* Hamburger Menu Toggle (Visible on Mobile & Tablet: < lg) */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            aria-expanded={isOpen}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-surface-200/90 bg-white text-surface-800 hover:bg-surface-100 hover:text-surface-950 active:scale-95 transition"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Hamburger Navigation Drawer / Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-surface-50 border-b border-surface-200 shadow-2xl overflow-y-auto max-h-[calc(100vh-4rem)] p-5 animate-in slide-in-from-top-3 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-1">
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-surface-400">
                Menu Navigasi
              </div>

              {customerLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href.split("/")[1] ? `/${link.href.split("/")[1]}` : link.href);
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center justify-between p-3.5 rounded-2xl transition",
                      isActive
                        ? "bg-brand-100/90 text-brand-900 border border-brand-200/90 font-bold"
                        : "text-surface-700 hover:bg-surface-100 hover:text-surface-950"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-xl",
                          isActive
                            ? "bg-brand-600 text-white shadow-sm"
                            : "bg-surface-200 text-surface-700"
                        )}
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{link.label}</div>
                        <div className="text-[11px] text-surface-500 font-normal">
                          {link.desc}
                        </div>
                      </div>
                    </div>
                    {isActive && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-brand-200 text-brand-900">
                        Aktif
                      </span>
                    )}
                  </Link>
                );
              })}

              {/* Quick Estimator Link inside menu */}
              <a
                href="/#kalkulator"
                onClick={() => {
                  setIsOpen(false);
                  setTimeout(() => {
                    const el = document.getElementById("kalkulator");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 150);
                }}
                className="flex items-center justify-between p-3.5 rounded-2xl text-surface-700 hover:bg-surface-100 hover:text-surface-950 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-100 text-accent-800">
                    <Calculator className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Cek Estimasi Tarif</div>
                    <div className="text-[11px] text-surface-500 font-normal">
                      Hitung simulasi biaya pindahan Surabaya
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Bottom CTA within Drawer */}
            <div className="mt-5 pt-4 border-t border-surface-200 space-y-3">
              <Link
                href="/pesan"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-brand-700/25 hover:bg-brand-700 active:scale-98 transition"
              >
                <span>Pesan Pindahan Sekarang</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[11px] text-surface-500 pt-1">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-600" />
                <span>Tarif transparan • 1 Helper termasuk • Seluruh Surabaya</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

