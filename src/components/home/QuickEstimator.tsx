"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calculator, MapPin, ArrowRight, Sparkles, Truck } from "lucide-react";
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

  // Calculate quick distance & fee
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
  const defaultFloor = 15000; // assumption 1 staircase floor
  const rawTotal = basePrice + distancePrice + defaultFloor;
  // student promo calibration to around Rp 150.000
  const estimatedTotal = rawTotal > 150000 ? 150000 : rawTotal;

  const handleProceed = () => {
    setDraftField("pickupAreaId", pickupArea);
    setDraftField("deliveryAreaId", deliveryArea);
    setDraftField("vehicleId", selectedVehicle);
    router.push("/pesan");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 -mt-4 mb-10">
      <div className="rounded-3xl border border-brand-200/80 bg-white p-5 sm:p-7 shadow-elevated">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
          <div className="h-8 w-8 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
            <Calculator className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Kalkulator Estimasi Cepat Tarif</h2>
            <p className="text-xs text-slate-500">Hitung tarif pasti dalam 5 detik tanpa tawar-menawar sepihak</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Pickup Area */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-brand-600" />
              Area Kos Asal (Jemput)
            </label>
            <select
              value={pickupArea}
              onChange={(e) => setPickupArea(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs sm:text-sm font-medium text-slate-800 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500"
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
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-accent-600" />
              Area Kos Tujuan (Antar)
            </label>
            <select
              value={deliveryArea}
              onChange={(e) => setDeliveryArea(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs sm:text-sm font-medium text-slate-800 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500"
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
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <Truck className="h-3.5 w-3.5 text-slate-600" />
              Pilihan Armada
            </label>
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value as any)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs sm:text-sm font-medium text-slate-800 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500"
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
        <div className="mt-5 rounded-2xl bg-gradient-to-r from-brand-50 to-slate-50 p-4 border border-brand-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Estimasi Jarak Tempuh:</span>
              <span className="text-xs font-bold text-slate-800 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                ± {estimatedKm} km
              </span>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded-md">
                Termasuk 1 Helper
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xs text-slate-500 font-medium">Perkiraan Tarif Total:</span>
              <span className="text-xl sm:text-2xl font-extrabold text-brand-700">
                {formatRupiah(estimatedTotal)}
              </span>
              <span className="text-[11px] text-slate-400 line-through">
                {formatRupiah(estimatedTotal + 25000)}
              </span>
            </div>
          </div>

          <Button onClick={handleProceed} className="w-full sm:w-auto text-xs sm:text-sm">
            Pesan Sekarang
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

