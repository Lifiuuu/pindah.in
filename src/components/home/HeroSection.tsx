"use client";

import Link from "next/link";
import { ShieldCheck, Users, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function HeroSection() {
  const scrollToCalculator = () => {
    const el = document.getElementById("kalkulator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-surface-50 to-surface-50 pt-8 pb-12 sm:pt-14 sm:pb-20 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl text-center">
        {/* Solution tag */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-100/80 px-3 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-bold text-brand-800 mb-5 border border-brand-200">
          <ShieldCheck className="h-3.5 w-3.5 text-brand-600 shrink-0" />
          <span>Platform Logistik Pindahan Kos Mahasiswa Surabaya</span>
        </div>

        {/* Main Headline with Balanced Mobile/Tablet Typography */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-surface-950 leading-[1.25] sm:leading-[1.18]">
          Pindah Kos Bebas Drama, <br />
          <span className="text-brand-600">
            Tanpa Ribet Nawar
          </span>{" "}
          & Ada Helper Sampai Kamar
        </h1>

        {/* Value Proposition Description */}
        <p className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base text-surface-600 max-w-2xl mx-auto leading-relaxed">
          Tinggalkan cara lama sewa pikap yang tarifnya tidak pasti dan membebani fisik mengangkat barang sendiri.
          Pindah.in menghadirkan kepastian tarif otomatis, armada pikap terawat, dan tenaga helper ramah hingga lorong kamarmu.
        </p>

        {/* Trust Badges with Compact Mobile Layout */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-semibold text-surface-700">
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl border border-surface-200/90 shadow-subtle">
            <CheckCircle2 className="h-3.5 w-3.5 text-brand-600" />
            Tarif Tetap & Transparan
          </span>
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl border border-surface-200/90 shadow-subtle">
            <Users className="h-3.5 w-3.5 text-brand-600" />
            1 Helper Sudah Termasuk
          </span>
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl border border-surface-200/90 shadow-subtle">
            <Clock className="h-3.5 w-3.5 text-accent-700" />
            Jadwal Pasti & Pelacakan
          </span>
        </div>

        {/* Direct Action Buttons (Customer Only) */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link href="/pesan" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-xs sm:text-sm px-6 py-3 sm:px-8 sm:py-3.5">
              Pesan Pindahan Sekarang
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </Link>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={scrollToCalculator}
            className="w-full sm:w-auto text-xs sm:text-sm px-6 py-3 sm:px-8 sm:py-3.5 border-surface-300 text-surface-800 hover:bg-surface-100"
          >
            Cek Estimasi Biaya
          </Button>
        </div>
      </div>
    </section>
  );
}
