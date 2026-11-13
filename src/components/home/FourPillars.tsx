import { DollarSign, UserCheck, Navigation, ShieldCheck } from "lucide-react";

export default function FourPillars() {
  const pillars = [
    {
      icon: DollarSign,
      title: "Tarif Fixed Otomatis",
      description:
        "Tanpa tawar-menawar sepihak di lokasi penjemputan. Tarif transparan dihitung otomatis berdasarkan jarak tempuh dan jenis armada.",
      tag: "Solusi Pain R-01 & R-03",
      color: "text-brand-700 bg-brand-50 border-brand-200",
    },
    {
      icon: UserCheck,
      title: "Helper Sampai Kamar Kos",
      description:
        "Bebas beban fisik mengangkat barang berat sendirian. Tim helper siap mendampingi dan mengangkut dari lorong kamarmu.",
      tag: "Solusi Pain R-02 & R-04",
      color: "text-brand-800 bg-brand-100 border-brand-300",
    },
    {
      icon: Navigation,
      title: "Pelacakan & Jadwal Pasti",
      description:
        "Pantau estimasi kedatangan pengemudi secara langsung dari jemput sampai antar untuk memastikan jadwal perkuliahan tetap aman.",
      tag: "Tepat Waktu",
      color: "text-accent-800 bg-accent-100 border-accent-300",
    },
    {
      icon: ShieldCheck,
      title: "Jaminan Perlindungan Barang",
      description:
        "Perlindungan menyeluruh untuk barang-barang berharga kosmu. Kami pastikan barang tiba di kamar baru dalam kondisi utuh.",
      tag: "Bebas Risiko",
      color: "text-surface-800 bg-surface-100 border-surface-300",
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white border-y border-surface-200/80">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-brand-700 uppercase tracking-widest bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200">
            Keunggulan Layanan Pindah.in
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-surface-950 mt-3 leading-tight">
            4 Pilar Kenyamanan Pindahan Kos
          </h2>
          <p className="text-xs sm:text-sm text-surface-500 max-w-xl mx-auto mt-2 leading-relaxed">
            Dirancang khusus menjawab kendala mahasiswa perantau berdasarkan temuan survei lapangan di Surabaya.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl border border-surface-200/90 bg-surface-50/50 p-7 hover:bg-white hover:shadow-card transition flex flex-col justify-between"
              >
                <div>
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-5 border ${item.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-surface-400 block mb-1.5">
                    {item.tag}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-surface-900 mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-surface-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
