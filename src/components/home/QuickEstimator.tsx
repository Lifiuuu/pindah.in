"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calculator, MapPin, ArrowRight, Truck } from "lucide-react";
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
    <div className="mx-auto max-w-4xl px-4 sm:px-6 -mt-8 mb-16">
      <div className="rounded-3xl border border-surface-200/90 bg-white p-7 sm:p-9 shadow-elevated">
        <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-surface-100">
          <div className="h-10 w-10 rounded-2xl bg-brand-100 text-brand-800 flex items-center justify-center font-bold">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-surface-900">Kalkulator Estimasi Tarif Cepat</h2>
            <p className="text-xs sm:text-sm text-surface-500 mt-0.5">
              Dapatkan kepastian tarif tanpa tawar-menawar sepihak di lokasi
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Pickup Area */}
          <div>
            <label className="block text-xs font-bold text-surface-800 mb-2 flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-brand-600" />
              Area Kos Asal (Jemput)
            </label>
            <select
              value={pickupArea}
              onChange={(e) => setPickupArea(e.target.value)}
              className="w-full rounded-2xl border border-surface-200 bg-surface-50 p-3.5 text-xs sm:text-sm font-medium text-surface-900 focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition"
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
              <MapPin className="h-4 w-4 text-accent-700" />
              Area Kos Tujuan (Antar)
            </label>
            <select
              value={deliveryArea}
              onChange={(e) => setDeliveryArea(e.target.value)}
              className="w-full rounded-2xl border border-surface-200 bg-surface-50 p-3.5 text-xs sm:text-sm font-medium text-surface-900 focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition"
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
              <Truck className="h-4 w-4 text-surface-600" />
              Pilihan Armada
            </label>
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value as any)}
              className="w-full rounded-2xl border border-surface-200 bg-surface-50 p-3.5 text-xs sm:text-sm font-medium text-surface-900 focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition"
            >
              {VEHICLE_FLEET.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.capacityKg} kg)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Estimation Result Bar */}
        <div className="mt-7 rounded-2xl bg-surface-50 p-5 sm:p-6 border border-surface-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-surface-500 font-medium">Estimasi Jarak Tempuh:</span>
              <span className="text-xs font-bold text-surface-800 bg-white px-2.5 py-1 rounded-lg border border-surface-200">
                ± {estimatedKm} km
              </span>
              <span className="text-xs text-brand-800 font-semibold bg-brand-100 px-2.5 py-1 rounded-lg border border-brand-200">
                Sudah Termasuk 1 Helper
              </span>
            </div>
            <div className="flex items-baseline gap-2.5 pt-1">
              <span className="text-xs text-surface-500 font-medium">Perkiraan Tarif Total:</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-brand-700">
                {formatRupiah(estimatedTotal)}
              </span>
              <span className="text-xs text-surface-400 line-through">
                {formatRupiah(estimatedTotal + 25000)}
              </span>
            </div>
          </div>

          <Button onClick={handleProceed} size="lg" className="w-full sm:w-auto text-xs sm:text-sm px-7 py-3.5">
            Pesan Sekarang
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
