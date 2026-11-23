"use client";

import { useRouter } from "next/navigation";
import { Truck, ShieldCheck, Compass } from "lucide-react";
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
        return <ShieldCheck className="h-6 w-6 text-brand-700" />;
      case "cargo-trike":
        return <Compass className="h-6 w-6 text-brand-700" />;
      default:
        return <Truck className="h-6 w-6 text-brand-700" />;
    }
  };

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 bg-surface-50">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-3xl font-extrabold text-surface-950 leading-tight">
            Pilihan Armada Sesuai Kebutuhan
          </h2>
          <p className="text-xs sm:text-sm text-surface-500 max-w-md mx-auto mt-2 leading-relaxed">
            Semua armada sudah termasuk 1 supir dan 1 tenaga helper door-to-door.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {VEHICLE_FLEET.map((v) => (
            <div
              key={v.id}
              className={`rounded-2xl border bg-white p-5 sm:p-6 shadow-subtle hover:shadow-card transition flex flex-col justify-between relative ${
                v.id === "pikap-bak"
                  ? "border-brand-500 ring-2 ring-brand-500/15"
                  : "border-surface-200/80"
              }`}
            >
              {v.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-brand-700 text-white shadow-xs">
                  {v.badge}
                </span>
              )}

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0">
                    {getVehicleIcon(v.iconType)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-surface-900">{v.name}</h3>
                    <p className="text-xs text-surface-500">{v.subtitle}</p>
                  </div>
                </div>

                {/* Inline clean specs */}
                <div className="flex items-center gap-2 text-[11px] text-surface-600 my-3 flex-wrap">
                  <span className="bg-surface-100 px-2.5 py-1 rounded-md font-medium">Muatan {v.capacityKg} kg</span>
                  <span className="bg-surface-100 px-2.5 py-1 rounded-md font-medium">Vol ± {v.volumeM3} m³</span>
                  <span className="bg-brand-50 text-brand-800 px-2.5 py-1 rounded-md font-semibold">1 Helper</span>
                </div>

                <p className="text-xs text-surface-600 mb-4 leading-relaxed line-clamp-2">{v.description}</p>
              </div>

              <div className="pt-4 border-t border-surface-100 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-surface-400 block font-medium">Mulai dari</span>
                  <span className="text-lg sm:text-xl font-black text-surface-900">{formatRupiah(v.basePrice)}</span>
                </div>

                <Button
                  onClick={() => handleSelectFleet(v.id)}
                  variant={v.id === "pikap-bak" ? "primary" : "outline"}
                  size="sm"
                  className="text-xs px-4 py-2"
                >
                  Pilih Armada
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
