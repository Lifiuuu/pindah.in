"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Weight, Box, Users, Truck, ShieldCheck, Compass } from "lucide-react";
import { VEHICLE_FLEET } from "@/data/mockData";
import { usePindahStore } from "@/store/usePindahStore";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function FleetSection() {
  const router = useRouter();
  const { setDraftField } = usePindahStore();

  const handleSelectFleet = (vehicleId: "motor-roda3" | "pikap-bak" | "pikap-box") => {
    setDraftField("vehicleId", vehicleId);
    router.push("/pesan");
  };

  const getVehicleIcon = (iconType: string) => {
    switch (iconType) {
      case "pickup-box":
        return <ShieldCheck className="h-7 w-7 text-brand-700" />;
      case "cargo-trike":
        return <Compass className="h-7 w-7 text-brand-700" />;
      default:
        return <Truck className="h-7 w-7 text-brand-700" />;
    }
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-surface-50">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-brand-700 uppercase tracking-widest bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200">
            Katalog Armada
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-surface-950 mt-3 leading-tight">
            Armada Logistik Sesuai Kebutuhan Kos
          </h2>
          <p className="text-xs sm:text-sm text-surface-500 max-w-xl mx-auto mt-2 leading-relaxed">
            Mulai dari akses lorong sempit hingga kapasitas penuh satu kamar bertingkat, armada kami terverifikasi dan bersih.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VEHICLE_FLEET.map((v) => (
            <div
              key={v.id}
              className={`rounded-3xl border bg-white p-7 sm:p-8 shadow-subtle hover:shadow-card transition flex flex-col justify-between relative ${
                v.id === "pikap-bak"
                  ? "border-brand-600 ring-2 ring-brand-500/20"
                  : "border-surface-200/90"
              }`}
            >
              {v.badge && (
                <span
                  className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-[11px] font-bold shadow-sm ${
                    v.id === "pikap-bak" ? "bg-brand-700 text-white" : "bg-surface-800 text-white"
                  }`}
                >
                  {v.badge}
                </span>
              )}

              <div>
                <div className="flex justify-center mb-5 mt-2">
                  <div className="h-16 w-16 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center shadow-xs">
                    {getVehicleIcon(v.iconType)}
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-surface-900 text-center">{v.name}</h3>
                <p className="text-xs text-surface-500 text-center mb-5 mt-1">{v.subtitle}</p>

                <div className="rounded-2xl bg-surface-50 p-4 mb-5 space-y-3 text-xs">
                  <div className="flex items-center justify-between text-surface-600">
                    <span className="flex items-center gap-2">
                      <Weight className="h-4 w-4 text-brand-600" />
                      Kapasitas Muatan
                    </span>
                    <span className="font-bold text-surface-900">{v.capacityKg} kg</span>
                  </div>
                  <div className="flex items-center justify-between text-surface-600">
                    <span className="flex items-center gap-2">
                      <Box className="h-4 w-4 text-brand-600" />
                      Volume Ruang
                    </span>
                    <span className="font-bold text-surface-900">± {v.volumeM3} m³</span>
                  </div>
                  <div className="flex items-center justify-between text-surface-600">
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-brand-600" />
                      Tenaga Helper
                    </span>
                    <span className="font-bold text-brand-700">1 Orang (Termasuk)</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-surface-600 mb-6 leading-relaxed">{v.description}</p>
              </div>

              <div className="pt-5 border-t border-surface-100">
                <div className="mb-4">
                  <span className="text-[10px] text-surface-400 uppercase font-bold tracking-wider block">Tarif Mulai</span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-2xl font-black text-surface-900">{formatRupiah(v.basePrice)}</span>
                    <span className="text-xs text-surface-500 font-medium">/ 3 km pertama</span>
                  </div>
                </div>

                <Button
                  onClick={() => handleSelectFleet(v.id)}
                  variant={v.id === "pikap-bak" ? "primary" : "outline"}
                  className="w-full text-xs sm:text-sm py-3"
                >
                  Pilih Armada Ini
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
