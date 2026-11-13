import Link from "next/link";
import { ShieldCheck, Users, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-slate-50 pt-6 pb-8 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl text-center">
        {/* Academic / Problem-solution tag */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-100/80 px-3 py-1 text-xs font-bold text-brand-800 mb-4 border border-brand-200">
          <ShieldCheck className="h-3.5 w-3.5 text-brand-600" />
          <span>Platform Logistik Pindahan Kos No. 1 Mahasiswa Surabaya</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Pindah Kos Bebas Drama, <br />
          <span className="text-brand-600 underline decoration-accent-400 decoration-wavy decoration-2">
            Tanpa Ribet Nawar
          </span>{" "}
          & Ada Helper Sampai Kamar!
        </h1>

        {/* Value Proposition Description */}
        <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Tinggalkan cara lama sewa pikap yang tarifnya tidak pasti dan bikin pegal angkut kasur sendiri. Pindah.in
          memberikan kepastian tarif otomatis, armada pikap bersih, dan tenaga helper ramah hingga kamar kosmu.
        </p>

        {/* Trust Badges */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-slate-700">
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Tarif Tetap & Transparan
          </span>
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs">
            <Users className="h-4 w-4 text-brand-600" />
            1 Helper Sudah Termasuk
          </span>
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs">
            <Clock className="h-4 w-4 text-amber-500" />
            Jadwal Pasti & Live Tracking
          </span>
        </div>

        {/* Direct Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/pesan" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-sm sm:text-base px-6">
              Pesan Pindahan Sekarang
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
          <Link href="/uji-pengguna" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm border-brand-300 text-brand-700 hover:bg-brand-50">
              Uji Coba Sistem (SUS UAS)
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

