"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calculator, MapPin, Truck, CheckCircle2 } from "lucide-react";
import { POPULAR_LOCATIONS, VEHICLE_FLEET } from "@/data/mockData";
import { usePindahStore } from "@/store/usePindahStore";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function QuickEstimator() {
  const router = useRouter();
  const { setDraftField } = usePindahStore();

  const [pickupArea, setPickupArea] = useState<string>("unair-c");
  const [deliveryArea, setDeliveryArea] = useState<string>("unair-b");
  const [selectedVehicle, setSelectedVehicle] = useState<"pikap-bak" | "pikap-box" | "motor-roda3">("pikap-bak");

  const pickupLoc = POPULAR_LOCATIONS.find((l) => l.id === pickupArea);
  const delivLoc = POPULAR_LOCATIONS.find((l) => l.id === deliveryArea);
  const vehicle = VEHICLE_FLEET.find((v) => v.id === selectedVehicle) || VEHICLE_FLEET[0];

  let estimatedKm = 7.5;
  if (pickupLoc && delivLoc) {
    estimatedKm = Math.max(
      3.0,
      Math.round(Math.abs(pickupLoc.distanceKmFromCenter - delivLoc.distanceKmFromCenter) * 1.8 + 2.5)
    );
  }

  const basePrice = vehicle.basePrice;
  const distancePrice = estimatedKm * vehicle.pricePerKm;
  const defaultFloor = 15000;
  const rawTotal = basePrice + distancePrice + defaultFloor;
  const estimatedTotal = rawTotal > 150000 ? 150000 : rawTotal;

  const handleProceed = () => {
    setDraftField("pickupAreaId", pickupArea);
    setDraftField("deliveryAreaId", deliveryArea);
    setDraftField("vehicleId", selectedVehicle);
    router.push("/pesan");
  };

  return (
    <section id="kalkulator" className="w-full bg-surface-50 pt-2 pb-12 sm:pb-16 px-4 sm:px-6 scroll-mt-20">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-surface-200/90 bg-white p-5 sm:p-8 shadow-elevated">
          <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-surface-100">
          <div className="h-10 w-10 rounded-2xl bg-brand-100 text-brand-800 flex items-center justify-center font-bold shrink-0">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-surface-900">Kalkulator Estimasi Tarif Cepat</h2>
            <p className="text-xs sm:text-sm text-surface-500 mt-0.5">
              Dapatkan kepastian tarif tanpa tawar-menawar sepihak di lokasi
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Pickup Area */}
          <div>
            <label className="block text-xs font-bold text-surface-800 mb-2 flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-brand-600 shrink-0" />
              Area Kos Asal (Jemput)
            </label>
            <select
              value={pickupArea}
              onChange={(e) => setPickupArea(e.target.value)}
              className="w-full rounded-2xl border border-surface-200 bg-surface-50 p-3 sm:p-3.5 text-xs sm:text-sm font-medium text-surface-900 focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition"
            >
              {POPULAR_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Delivery Area */}
          <div>
            <label className="block text-xs font-bold text-surface-800 mb-2 flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-accent-700 shrink-0" />
              Area Kos Tujuan (Antar)
            </label>
            <select
              value={deliveryArea}
              onChange={(e) => setDeliveryArea(e.target.value)}
              className="w-full rounded-2xl border border-surface-200 bg-surface-50 p-3 sm:p-3.5 text-xs sm:text-sm font-medium text-surface-900 focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition"
            >
              {POPULAR_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Vehicle Select */}
          <div>
            <label className="block text-xs font-bold text-surface-800 mb-2 flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-surface-600 shrink-0" />
              Pilihan Armada
            </label>
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value as any)}
              className="w-full rounded-2xl border border-surface-200 bg-surface-50 p-3 sm:p-3.5 text-xs sm:text-sm font-medium text-surface-900 focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition"
            >
              {VEHICLE_FLEET.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.capacityKg} kg)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Estimation Result Bar (Mobile & Tablet Optimized) */}
        <div className="mt-6 sm:mt-7 rounded-2xl bg-surface-50 p-4 sm:p-6 border border-surface-200/90 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-3">
            {/* Meta chips: Jarak & Helper */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-surface-800 border border-surface-200 shadow-2xs">
                <span className="text-surface-500 font-medium">Jarak:</span>
                <span>± {estimatedKm} km</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-lg bg-brand-100/90 px-2.5 py-1 text-xs font-semibold text-brand-900 border border-brand-200">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-700 shrink-0" />
                <span>Termasuk 1 Helper</span>
              </div>
            </div>

            {/* Price display with clean typography on mobile/tab */}
            <div>
              <div className="text-[11px] sm:text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">
                Perkiraan Tarif Total
              </div>
              <div className="flex items-baseline gap-2.5 flex-wrap">
                <span className="text-2xl sm:text-3xl font-extrabold text-brand-700 tracking-tight">
                  {formatRupiah(estimatedTotal)}
                </span>
                <span className="text-xs sm:text-sm text-surface-400 line-through">
                  {formatRupiah(estimatedTotal + 25000)}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                  Tarif Pasti
                </span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleProceed}
            size="lg"
            className="w-full sm:w-auto text-xs sm:text-sm px-7 py-3.5 shadow-sm active:scale-98 transition shrink-0"
          >
            <span>Pesan Sekarang</span>
          </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
