import { Star } from "lucide-react";
import { MOCK_TESTIMONIALS } from "@/data/mockData";

export default function TestimonialSection() {
  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 bg-white border-t border-surface-200/80">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-3xl font-extrabold text-surface-950 leading-tight">
            Pengalaman Mahasiswa Pindahan
          </h2>
          <p className="text-xs sm:text-sm text-surface-500 max-w-md mx-auto mt-2 leading-relaxed">
            Cerita mahasiswa perantau di kawasan kampus UNAIR, ITS, UNESA, dan sekitarnya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {MOCK_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-surface-200/80 bg-surface-50/40 p-5 sm:p-6 hover:bg-white hover:border-brand-300 hover:shadow-subtle transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-3 text-accent-600">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent-500 text-accent-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-surface-700 leading-relaxed italic mb-4">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-surface-200/60">
                <div className="h-8 w-8 rounded-full bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center shrink-0">
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-surface-900">{t.name}</h4>
                  <p className="text-[11px] text-surface-500">
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
