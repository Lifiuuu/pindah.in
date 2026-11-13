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
      <footer className="py-6 px-4 bg-slate-900 text-slate-400 text-center text-xs border-t border-slate-800">
        <p className="font-semibold text-slate-200">
          Pindah.in · Platform Kewirausahaan Logistik Pindahan Mahasiswa
        </p>
        <p className="mt-1 text-slate-400">
          Proyek Akhir Kewirausahaan Bidang TI (FVK25612002) — D4 Teknik Informatika Fakultas Vokasi Universitas Airlangga
        </p>
        <p className="mt-1 text-[11px] text-slate-500">
          Kelompok 4: Putri Atika · Faatin Sausan · Maulidina Naurah · Alifia Putri · Reta Hadiana
        </p>
      </footer>
    </div>
  );
}

