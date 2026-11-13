"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, Clock, ClipboardCheck, Store } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/invoice")) {
    return null;
  }

  const items = [
    {
      href: "/",
      label: "Beranda",
      icon: Home,
    },
    {
      href: "/pesan",
      label: "Pesan",
      icon: PlusCircle,
      highlight: true,
    },
    {
      href: "/riwayat",
      label: "Riwayat",
      icon: Clock,
    },
    {
      href: "/mitra-preview",
      label: "Mitra",
      icon: Store,
    },
    {
      href: "/uji-pengguna",
      label: "Uji SUS",
      icon: ClipboardCheck,
      badge: "UAS",
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 z-40 w-full border-t border-surface-200/80 bg-surface-50/95 backdrop-blur supports-[backdrop-filter]:bg-surface-50/90 shadow-elevated">
      <nav className="mx-auto flex h-18 max-w-md items-center justify-around px-3 py-2">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.highlight) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-6 group"
              >
                <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-700/35 group-active:scale-95 transition">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-[11px] font-bold text-brand-800 mt-1.5">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-colors",
                isActive ? "text-brand-700 font-bold" : "text-surface-500 hover:text-surface-800"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[11px] mt-1 font-medium">{item.label}</span>
              {item.badge && (
                <span className="absolute top-1 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-600"></span>
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
