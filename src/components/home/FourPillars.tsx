import { DollarSign, UserCheck, Navigation, ShieldCheck } from "lucide-react";

export default function FourPillars() {
  const pillars = [
    {
      icon: DollarSign,
      title: "Tarif Fixed Otomatis",
      description:
        "Tanpa tawar-menawar sepihak di jalan. Harga transparan dihitung berdasarkan jarak tempuh dan armada.",
      tag: "Solusi Pain R-01 & R-03",
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      icon: UserCheck,
      title: "Helper Sampai Kamar Kos",
      description:
        "Gak perlu minta tolong teman atau angkut kasur sendirian. Tim helper siap bantu angkat dari lorong kamarmu.",
      tag: "Solusi Pain R-02 & R-04",
      color: "text-brand-600 bg-brand-50 border-brand-200",
    },
    {
      icon: Navigation,
      title: "Live Tracking & Jadwal Pasti",
      description:
        "Pantau lokasi pengemudi secara real-time dari jemput sampai antar. Ucapkan selamat tinggal pada armada yang telat.",
      tag: "Tepat Waktu",
      color: "text-amber-600 bg-amber-50 border-amber-200",
    },
    {
      icon: ShieldCheck,
      title: "Garansi Aman Bebas Cemas",
      description:
        "Perlindungan ekstra untuk barang-barang berharga kosmu. Kami pastikan barang tiba dalam kondisi utuh dan aman.",
      tag: "Bebas Resiko",
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
    },
  ];

  return (
    <section className="py-10 px-4 sm:px-6 bg-white border-y border-slate-100">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full">
            Kenapa Mahasiswa Memilih Pindah.in?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            4 Pilar Kenyamanan Pindahan Tanpa Stres
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto mt-1">
            Dirancang khusus menjawab kendala mahasiswa perantau berdasarkan riset lapangan di Surabaya.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-5 hover:bg-white hover:shadow-card transition flex flex-col justify-between"
              >
                <div>
                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center mb-3 border ${item.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 block mb-1">
                    {item.tag}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

