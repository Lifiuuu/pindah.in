"use client";

import { usePathname } from "next/navigation";
import CustomerNavbar from "./layout/CustomerNavbar";
import MitraNavbar from "./layout/MitraNavbar";
import AdminNavbar from "./layout/AdminNavbar";

export default function Navbar() {
  const pathname = usePathname();

  if (pathname.startsWith("/mitra")) {
    return <MitraNavbar />;
  }

  if (pathname.startsWith("/admin")) {
    return <AdminNavbar />;
  }

  return <CustomerNavbar />;
}
