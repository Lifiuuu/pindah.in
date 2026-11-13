"use client";

import { usePathname } from "next/navigation";
import CustomerBottomNav from "./layout/CustomerBottomNav";
import MitraBottomNav from "./layout/MitraBottomNav";

export default function BottomNav() {
  const pathname = usePathname();

  // Hide bottom nav on Admin pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  // Show dedicated Mitra bottom nav on /mitra routes
  if (pathname.startsWith("/mitra")) {
    return <MitraBottomNav />;
  }

  // Default customer bottom nav for all customer routes
  return <CustomerBottomNav />;
}
