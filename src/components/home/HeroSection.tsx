import Link from "next/link";
import { ShieldCheck, Users, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-surface-50 to-surface-50 pt-12 pb-16 sm:pt-16 sm:pb-24 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl text-center">
        {/* Academic / Problem-solution tag */}
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-100/80 px-4 py-1.5 text-xs font-bold text-brand-800 mb-6 border border-brand-200">
          <ShieldCheck className="h-4 w-4 text-brand-600" />
          <span>Platform Logistik Pindahan Kos Mahasiswa Surabaya</span>
        </div>

        {/* Main Headline with Generous Spacing */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-surface-950 leading-[1.2] sm:leading-[1.18]">
          Pindah Kos Bebas Drama, <br />
          <span className="text-brand-600 underline decoration-accent-400 decoration-wavy decoration-2 underline-offset-8">
            Tanpa Ribet Nawar
          </span>{" "}
          & Ada Helper Sampai Kamar
        </h1>

        {/* Value Proposition Description */}
        <p className="mt-6 text-sm sm:text-base lg:text-lg text-surface-600 max-w-2xl mx-auto leading-relaxed">
          Tinggalkan cara lama sewa pikap yang tarifnya tidak pasti dan membebani fisik mengangkat barang sendiri.
          Pindah.in menghadirkan kepastian tarif otomatis, armada pikap terawat, dan tenaga helper ramah hingga lorong kamarmu.
        </p>

        {/* Trust Badges with Open Spacing */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-surface-700">
          <span className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-surface-200/90 shadow-subtle">
            <CheckCircle2 className="h-4 w-4 text-brand-600" />
            Tarif Tetap & Transparan
          </span>
          <span className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-surface-200/90 shadow-subtle">
            <Users className="h-4 w-4 text-brand-600" />
            1 Helper Sudah Termasuk
          </span>
          <span className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-surface-200/90 shadow-subtle">
            <Clock className="h-4 w-4 text-accent-700" />
            Jadwal Pasti & Pelacakan
          </span>
        </div>

        {/* Direct Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/pesan" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-sm sm:text-base px-8 py-4">
              Pesan Pindahan Sekarang
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </Link>
          <Link href="/uji-pengguna" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-sm sm:text-base px-8 py-4 border-surface-300 text-surface-800 hover:bg-surface-100"
            >
              Uji Coba Sistem (SUS UAS)
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
