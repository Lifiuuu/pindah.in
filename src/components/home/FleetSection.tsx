"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, Weight, Box, Users } from "lucide-react";
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

  return (
    <section className="py-12 px-4 sm:px-6 bg-slate-50">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full">
            Pilihan Armada
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Armada Tepat untuk Segala Jenis Kos
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto mt-1">
            Mulai dari kos lorong sempit hingga kos penuh furnitur besar, kami sediakan armada yang pas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VEHICLE_FLEET.map((v) => (
            <div
              key={v.id}
              className={`rounded-3xl border bg-white p-6 shadow-sm hover:shadow-card transition flex flex-col justify-between relative ${
                v.id === "pikap-bak" ? "border-brand-500 ring-2 ring-brand-500/20" : "border-slate-200"
              }`}
            >
              {v.badge && (
                <span
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[11px] font-bold shadow-sm ${
                    v.id === "pikap-bak"
                      ? "bg-brand-600 text-white"
                      : "bg-slate-800 text-white"
                  }`}
                >
                  {v.badge}
                </span>
              )}

              <div>
                <div className="text-4xl text-center mb-3 mt-1">{v.imageUrl}</div>
                <h3 className="text-lg font-bold text-slate-900 text-center">{v.name}</h3>
                <p className="text-xs text-slate-500 text-center mb-4">{v.subtitle}</p>

                <div className="rounded-xl bg-slate-50 p-3 mb-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Weight className="h-3.5 w-3.5 text-brand-600" />
                      Kapasitas Muatan
                    </span>
                    <span className="font-bold text-slate-900">{v.capacityKg} kg</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Box className="h-3.5 w-3.5 text-brand-600" />
                      Volume Ruang
                    </span>
                    <span className="font-bold text-slate-900">± {v.volumeM3} m³</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-brand-600" />
                      Tenaga Helper
                    </span>
                    <span className="font-bold text-emerald-600">1 Orang (Termasuk)</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mb-4">{v.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="mb-3">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Tarif Mulai</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-extrabold text-slate-900">{formatRupiah(v.basePrice)}</span>
                    <span className="text-xs text-slate-500 font-medium">/ 3 km pertama</span>
                  </div>
                </div>

                <Button
                  onClick={() => handleSelectFleet(v.id)}
                  variant={v.id === "pikap-bak" ? "primary" : "outline"}
                  className="w-full text-xs"
                >
                  Pilih Armada Ini
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

