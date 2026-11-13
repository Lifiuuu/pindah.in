import HeroSection from "@/components/home/HeroSection";
import QuickEstimator from "@/components/home/QuickEstimator";
import FourPillars from "@/components/home/FourPillars";
import FleetSection from "@/components/home/FleetSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import FAQSection from "@/components/home/FAQSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <QuickEstimator />
      <FourPillars />
      <FleetSection />
      <TestimonialSection />
      <FAQSection />

      {/* Footer Info for UAS */}
      <footer className="py-10 px-4 sm:px-6 bg-surface-900 text-surface-400 text-center text-xs border-t border-surface-800">
        <div className="mx-auto max-w-2xl space-y-2">
          <p className="font-bold text-surface-200 text-sm">
            Pindah.in · Platform Kewirausahaan Logistik Pindahan Mahasiswa
          </p>
          <p className="text-surface-400 leading-relaxed">
            Proyek Akhir Kewirausahaan Bidang TI (FVK25612002) — D4 Teknik Informatika Fakultas Vokasi Universitas Airlangga
          </p>
          <p className="text-[11px] text-surface-500 pt-2 border-t border-surface-800">
            Kelompok 4: Putri Atika · Faatin Sausan · Maulidina Naurah · Alifia Putri · Reta Hadiana
          </p>
        </div>
      </footer>
    </div>
  );
}
