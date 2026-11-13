import { Star } from "lucide-react";
import { MOCK_TESTIMONIALS } from "@/data/mockData";

export default function TestimonialSection() {
  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 bg-white border-t border-surface-200/80">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-[11px] sm:text-xs font-bold text-brand-800 uppercase tracking-widest bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200">
            Pengalaman Mahasiswa
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-surface-950 mt-3 leading-tight">
            Pindahan Lebih Efisien dan Terencana
          </h2>
          <p className="text-xs sm:text-sm text-surface-500 max-w-xl mx-auto mt-2 leading-relaxed">
            Ulasan nyata dari rekan mahasiswa perantau di berbagai kawasan kampus se-Surabaya (UNAIR, ITS, UNESA, UPN, Petra, dll).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {MOCK_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl sm:rounded-3xl border border-surface-200/90 bg-surface-50/50 p-5 sm:p-7 hover:bg-white hover:shadow-card transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5 mb-4 text-accent-600">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent-500 text-accent-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-surface-700 leading-relaxed italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-surface-200/70">
                <div className="h-10 w-10 rounded-2xl bg-brand-100 border border-brand-200 text-brand-800 font-bold text-xs flex items-center justify-center shrink-0">
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-surface-900">{t.name}</h4>
                  <p className="text-[11px] text-surface-500 mt-0.5">
                    {t.major} · {t.campus}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
