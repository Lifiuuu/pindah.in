import type { Metadata, Viewport } from "next";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pindah.in - Platform Logistik Pindahan Kos Mahasiswa Surabaya",
  description:
    "Layanan angkut pindahan kos mahasiswa lengkap armada pikap & helper door-to-door, tarif otomatis tanpa tawar-menawar, dan fitur pembayaran ramah orang tua untuk seluruh mahasiswa di kawasan Surabaya.",
  keywords: [
    "pindahin",
    "pindahan kos surabaya",
    "sewa pikap surabaya",
    "logistik mahasiswa surabaya",
    "helper angkut kos surabaya",
    "pindahan kos unair its unesa upn petra",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#8c6035",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-surface-50 text-surface-900 pb-24 md:pb-8 font-sans selection:bg-brand-600 selection:text-white">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
