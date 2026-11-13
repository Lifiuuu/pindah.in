import { Star } from "lucide-react";
import { MOCK_TESTIMONIALS } from "@/data/mockData";

export default function TestimonialSection() {
  return (
    <section className="py-12 px-4 sm:px-6 bg-white border-t border-slate-100">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Pengalaman Mahasiswa
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Pindahan Lebih Efisien dan Terencana
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto mt-1">
            Ulasan dari rekan mahasiswa perantau di kawasan kampus Universitas Airlangga Surabaya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MOCK_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 hover:bg-white hover:shadow-card transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-3 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-200/60">
                <div className="h-9 w-9 rounded-full bg-brand-100 border border-brand-200 text-brand-800 font-bold text-xs flex items-center justify-center shrink-0">
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{t.name}</h4>
                  <p className="text-[11px] text-slate-500">
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
