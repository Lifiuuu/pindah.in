import HeroSection from "@/components/home/HeroSection";
import QuickEstimator from "@/components/home/QuickEstimator";
import FourPillars from "@/components/home/FourPillars";
import FleetSection from "@/components/home/FleetSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import FAQSection from "@/components/home/FAQSection";
import Link from "next/link";
import { Truck, ShieldCheck, HardHat, BarChart3 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <QuickEstimator />
      <FourPillars />
      <FleetSection />
      <TestimonialSection />
      <FAQSection />

      {/* Structured Multi-Role Footer */}
      <footer className="bg-surface-900 text-surface-400 text-xs border-t border-surface-800 pt-12 pb-10 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-surface-800">
            {/* Col 1: Brand Info */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 text-white">
                  <Truck className="h-4 w-4" />
                </div>
                <span className="text-base font-extrabold text-white">
                  Pindah<span className="text-accent-400">.in</span>
                </span>
              </div>
              <p className="text-xs text-surface-400 leading-relaxed">
                Platform logistik pindahan kos mahasiswa di Surabaya dengan tarif transparan tanpa tawar-menawar & tenaga angkut door-to-door.
              </p>
            </div>

            {/* Col 2: Pelanggan (Mahasiswa) */}
            <div className="space-y-2.5">
              <strong className="text-surface-200 font-bold block uppercase tracking-wider text-[11px]">
                Layanan Mahasiswa
              </strong>
              <ul className="space-y-1.5 text-surface-400">
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
                  <Link href="/pesan" className="hover:text-white transition">Kalkulator Estimasi Biaya</Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Portal Mitra (Driver & Helper) */}
            <div className="space-y-2.5">
              <strong className="text-surface-200 font-bold block uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <HardHat className="h-3.5 w-3.5 text-accent-400" />
                Portal Mitra Kerja
              </strong>
              <ul className="space-y-1.5 text-surface-400">
                <li>
                  <Link href="/mitra" className="text-accent-300 font-semibold hover:text-white transition">
                    Aplikasi Driver & Helper →
                  </Link>
                </li>
                <li>
                  <span className="text-surface-400 text-[11px] block">Bagi Hasil 80% (Driver Rp 85rb + Helper Rp 35rb)</span>
                </li>
                <li>
                  <span className="text-surface-400 text-[11px] block">Wilayah: Kampus A, B, C UNAIR</span>
                </li>
              </ul>
            </div>

            {/* Col 4: Pengelola & Evaluasi Bisnis UAS */}
            <div className="space-y-2.5">
              <strong className="text-surface-200 font-bold block uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <BarChart3 className="h-3.5 w-3.5 text-accent-400" />
                Manajemen Bisnis
              </strong>
              <ul className="space-y-1.5 text-surface-400">
                <li>
                  <Link href="/admin" className="text-accent-300 font-semibold hover:text-white transition">
                    Dashboard Admin & BEP →
                  </Link>
                </li>
                <li>
                  <span className="text-surface-400 text-[11px] block">Validasi BEP 67 Transaksi / Bulan</span>
                </li>
                <li>
                  <span className="text-surface-400 text-[11px] block">Monitoring Armada Surabaya</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Academic Attribution */}
          <div className="text-center space-y-1.5 text-surface-400 text-xs">
            <p className="font-bold text-surface-200">
              Proyek Akhir Mata Kuliah Kewirausahaan Bidang TI (FVK25612002)
            </p>
            <p className="text-[11px] text-surface-400">
              D4 Teknik Informatika Fakultas Vokasi Universitas Airlangga · Dosen Pengampu: Nambi Sembilu, S.Kom., M.Kom.
            </p>
            <p className="text-[10px] text-surface-500 pt-2 border-t border-surface-800">
              Kelompok 4: Putri Atika · Faatin Sausan · Maulidina Naurah · Alifia Putri · Reta Hadiana
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
