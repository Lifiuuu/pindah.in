import type { Metadata, Viewport } from "next";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pindah.in - Platform Logistik Pindahan Kos Mahasiswa Surabaya",
  description:
    "Layanan angkut pindahan kos mahasiswa lengkap armada pikap & helper door-to-door, tarif otomatis tanpa tawar-menawar, dan fitur pembayaran ramah orang tua.",
  keywords: [
    "pindahin",
    "pindahan kos surabaya",
    "sewa pikap unair",
    "logistik mahasiswa",
    "helper angkut kos",
    "kewirausahaan ti vokasi unair",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0d9488",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 pb-16 md:pb-0 font-sans selection:bg-brand-500 selection:text-white">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}

