"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Truck, BellRing, WalletCards, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MitraBottomNav() {
  const pathname = usePathname();

  const items = [
    {
      href: "/mitra",
      label: "Tugas Aktif",
      icon: Truck,
    },
    {
      href: "/mitra#order-masuk",
      label: "Order Masuk",
      icon: BellRing,
    },
    {
      href: "/mitra#dompet",
      label: "Dompet 80%",
      icon: WalletCards,
    },
    {
      href: "/",
      label: "Ke Pelanggan",
      icon: ArrowLeft,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 z-40 w-full border-t border-surface-200/90 bg-white/95 backdrop-blur shadow-elevated">
      <nav className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-2 rounded-xl transition text-center",
                isActive
                  ? "text-brand-800 font-bold"
                  : "text-surface-500 hover:text-surface-900 font-medium"
              )}
            >
              <Icon className={cn("h-5 w-5 mb-0.5", isActive && "stroke-[2.5px] text-brand-700")} />
              <span className="text-[10px] leading-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

