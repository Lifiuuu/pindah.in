import HeroSection from "@/components/home/HeroSection";
import QuickEstimator from "@/components/home/QuickEstimator";
import FourPillars from "@/components/home/FourPillars";
import FleetSection from "@/components/home/FleetSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import FAQSection from "@/components/home/FAQSection";
import Link from "next/link";
import { Truck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <QuickEstimator />
      <FourPillars />
      <FleetSection />
      <TestimonialSection />
      <FAQSection />

      {/* Structured Customer Footer */}
      <footer className="bg-surface-900 text-surface-400 text-xs border-t border-surface-800 pt-12 pb-10 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-surface-800">
            {/* Col 1: Brand Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 text-white">
                  <Truck className="h-4 w-4" />
                </div>
                <span className="text-base font-extrabold text-white">
                  Pindah<span className="text-accent-400">.in</span>
                </span>
                <span className="rounded-full bg-surface-800 px-2 py-0.5 text-[10px] font-semibold text-accent-300 border border-surface-700">
                  Surabaya
                </span>
              </div>
              <p className="text-xs text-surface-400 leading-relaxed">
                Platform logistik pindahan kos mahasiswa di Surabaya dengan tarif transparan tanpa tawar-menawar & tenaga angkut door-to-door.
              </p>
            </div>

            {/* Col 2: Pelanggan (Mahasiswa) */}
            <div className="space-y-2.5">
              <strong className="text-surface-200 font-bold block uppercase tracking-wider text-[11px]">
                Navigasi Layanan
              </strong>
              <ul className="space-y-2 text-surface-400">
                <li>
                  <Link href="/pesan" className="hover:text-white transition">Pesan Pindahan Kos</Link>
                </li>
                <li>
                  <Link href="/tracking/PNDH-98214" className="hover:text-white transition">Lacak Perjalanan Armada</Link>
                </li>
                <li>
                  <Link href="/riwayat" className="hover:text-white transition">Riwayat Pemesanan</Link>
                </li>
                <li>
                  <a href="#kalkulator" className="hover:text-white transition">Kalkulator Estimasi Biaya</a>
                </li>
              </ul>
            </div>

            {/* Col 3: Cakupan Wilayah Operasional */}
            <div className="space-y-2.5">
              <strong className="text-surface-200 font-bold block uppercase tracking-wider text-[11px]">
                Cakupan Operasional
              </strong>
              <p className="text-surface-400 text-xs leading-relaxed">
                Melayani seluruh koridor kampus & kos mahasiswa Surabaya (UNAIR Kampus A/B/C, ITS Sukolilo, UNESA Ketintang/Lidah Wetan, UPN Veteran Jatim, dan sekitarnya).
              </p>
              <div className="pt-1">
                <span className="inline-block text-[11px] text-accent-300 bg-surface-800 px-2.5 py-1 rounded-lg border border-surface-700">
                  Armada Siaga & Helper Terstandarisasi
                </span>
              </div>
            </div>
          </div>

          {/* Clean Startup Copyright */}
          <div className="text-center space-y-1 text-surface-400 text-xs border-t border-surface-800 pt-6">
            <p className="font-semibold text-surface-200">
              © 2026 Pindah.in Surabaya. Platform Logistik Pindahan Kos Mahasiswa.
            </p>
            <p className="text-[11px] text-surface-500">
              Menghadirkan tarif transparan, armada terpercaya, dan tenaga helper door-to-door.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
