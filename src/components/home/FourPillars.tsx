import { DollarSign, UserCheck, Navigation, ShieldCheck } from "lucide-react";

export default function FourPillars() {
  const pillars = [
    {
      icon: DollarSign,
      title: "Tarif Pasti & Transparan",
      description: "Dihitung otomatis per kilometer. Tanpa tawar-menawar sepihak saat di lokasi.",
      color: "text-brand-700 bg-brand-50",
    },
    {
      icon: UserCheck,
      title: "Helper Sampai Kamar",
      description: "Bebas capek angkat barang berat. Helper siap bantu hingga lantai kamarmu.",
      color: "text-brand-800 bg-brand-100",
    },
    {
      icon: Navigation,
      title: "Jadwal & Lacak Armada",
      description: "Pantau posisi armada pikap secara real-time agar jadwal harimu tetap terencana.",
      color: "text-accent-800 bg-accent-100",
    },
    {
      icon: ShieldCheck,
      title: "Armada Aman & Terawat",
      description: "Kendaraan pikap bersih berterpal dengan ikatan tali kencang berstandar aman.",
      color: "text-surface-800 bg-surface-100",
    },
  ];

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 bg-white border-y border-surface-200/80">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-3xl font-extrabold text-surface-950 leading-tight">
            Kenapa Pindahan Lewat Pindah.in?
          </h2>
          <p className="text-xs sm:text-sm text-surface-500 max-w-lg mx-auto mt-2 leading-relaxed">
            Solusi praktis dan bebas ribet untuk mahasiswa kos di seluruh kawasan kampus Surabaya.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-surface-200/80 bg-surface-50/40 p-5 hover:bg-white hover:border-brand-300 hover:shadow-subtle transition flex flex-col"
              >
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-surface-900 mb-1.5">{item.title}</h3>
                <p className="text-xs text-surface-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
