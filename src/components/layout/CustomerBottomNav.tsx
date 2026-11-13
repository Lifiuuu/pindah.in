"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, Clock, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CustomerBottomNav() {
  const pathname = usePathname();

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
      href: "/tracking/PNDH-98214",
      label: "Lacak",
      icon: Compass,
    },
    {
      href: "/riwayat",
      label: "Riwayat",
      icon: Clock,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 z-40 w-full border-t border-surface-200/80 bg-surface-50/95 backdrop-blur supports-[backdrop-filter]:bg-surface-50/90 shadow-elevated">
      <nav className="mx-auto flex h-18 max-w-md items-center justify-around px-4 py-2">
        {items.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href.split("/")[1] ? `/${item.href.split("/")[1]}` : item.href);
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
                "flex flex-col items-center justify-center py-1 px-3 rounded-xl transition text-center min-w-[60px]",
                isActive
                  ? "text-brand-800 font-bold"
                  : "text-surface-500 hover:text-surface-800 font-medium"
              )}
            >
              <Icon className={cn("h-5 w-5 mb-1", isActive && "stroke-[2.5px]")} />
              <span className="text-[11px] leading-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

