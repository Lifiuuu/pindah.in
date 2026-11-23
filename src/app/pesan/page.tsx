"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Calendar,
  Truck,
  Users,
  Package,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  Plus,
  Minus,
  Bed,
  DoorClosed,
  Armchair,
  Refrigerator,
  Droplets,
  Fan,
  Layers,
  Sparkles,
  Compass,
} from "lucide-react";
import { POPULAR_LOCATIONS, VEHICLE_FLEET, INVENTORY_ITEMS } from "@/data/mockData";
import { usePindahStore } from "@/store/usePindahStore";
import { formatRupiah, cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function OrderPage() {
  const router = useRouter();
  const { draft, setDraftField, updateInventoryItem, calculatePricing } = usePindahStore();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const pricing = calculatePricing();

  const getInventoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Bed":
      case "BedDouble":
        return <Bed className="h-4 w-4 text-brand-700" />;
      case "DoorClosed":
      case "Archive":
        return <DoorClosed className="h-4 w-4 text-accent-700" />;
      case "Armchair":
        return <Armchair className="h-4 w-4 text-surface-700" />;
      case "Refrigerator":
        return <Refrigerator className="h-4 w-4 text-brand-600" />;
      case "Droplets":
        return <Droplets className="h-4 w-4 text-brand-500" />;
      case "Fan":
        return <Fan className="h-4 w-4 text-surface-600" />;
      case "Package":
      case "Box":
        return <Package className="h-4 w-4 text-brand-800" />;
      default:
        return <Layers className="h-4 w-4 text-surface-500" />;
    }
  };

  const totalSpaceUnits = Object.entries(draft.inventory).reduce((acc, [id, qty]) => {
    const item = INVENTORY_ITEMS.find((i) => i.id === id);
    return acc + (item ? item.spaceUnit * qty : 0);
  }, 0);

  const selectedVehicleObj = VEHICLE_FLEET.find((v) => v.id === draft.vehicleId) || VEHICLE_FLEET[0];
  const maxVehicleUnits = draft.vehicleId === "motor-roda3" ? 15 : draft.vehicleId === "pikap-bak" ? 30 : 35;
  const capacityPercent = Math.min(100, Math.round((totalSpaceUnits / maxVehicleUnits) * 100));

  const steps = [
    { num: 1, label: "Rute & Waktu" },
    { num: 2, label: "Armada & Helper" },
    { num: 3, label: "Barang Kos" },
    { num: 4, label: "Review & Tarif" },
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/pesan/konfirmasi");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 pb-28 pt-6 sm:pt-10 px-4 sm:px-6">
      <div className="mx-auto max-w-2xl">
        {/* Sleek Progress Stepper Bar */}
        <div className="rounded-2xl border border-surface-200/80 bg-white p-3.5 sm:p-4 mb-6 shadow-2xs">
          <div className="flex items-center justify-between">
            {steps.map((s, idx) => {
              const isCompleted = currentStep > s.num;
              const isCurrent = currentStep === s.num;

              return (
                <div key={s.num} className="flex-1 flex items-center">
                  <div
                    onClick={() => s.num < currentStep && setCurrentStep(s.num)}
                    className={`flex items-center gap-2 cursor-pointer transition ${
                      isCurrent
                        ? "text-brand-800 font-bold"
                        : isCompleted
                        ? "text-brand-700 font-semibold"
                        : "text-surface-400"
                    }`}
                  >
                    <div
                      className={`h-7 w-7 sm:h-8 sm:w-8 rounded-xl flex items-center justify-center text-xs font-bold transition ${
                        isCurrent
                          ? "bg-brand-600 text-white ring-2 ring-brand-100"
                          : isCompleted
                          ? "bg-brand-700 text-white"
                          : "bg-surface-100 text-surface-500"
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="h-3.5 w-3.5" /> : s.num}
                    </div>
                    <span className="hidden sm:inline text-xs">{s.label}</span>
                  </div>

                  {idx < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 sm:mx-3 ${
                        currentStep > s.num ? "bg-brand-400" : "bg-surface-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="sm:hidden text-center mt-2 text-[11px] font-semibold text-surface-600">
            Langkah {currentStep} dari 4: {steps[currentStep - 1].label}
          </div>
        </div>

        {/* STEP 1: RUTE & JADWAL */}
        {currentStep === 1 && (
          <div className="space-y-5">
            {/* Unified Route Card */}
            <div className="rounded-2xl border border-surface-200/80 bg-white p-5 sm:p-6 shadow-2xs space-y-5">
              <h3 className="text-sm sm:text-base font-bold text-surface-900 pb-3 border-b border-surface-100">
                Rute Pindahan Kos
              </h3>

              {/* Pickup Point */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-brand-800 font-bold text-xs sm:text-sm">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand-600 ring-4 ring-brand-100 shrink-0" />
                  <span>Lokasi Asal (Jemput)</span>
                </div>

                <div className="space-y-3 pl-4 sm:pl-5 border-l-2 border-dashed border-surface-200 ml-1 pb-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-surface-600 mb-1">Kawasan Kampus</label>
                    <select
                      value={draft.pickupAreaId}
                      onChange={(e) => setDraftField("pickupAreaId", e.target.value)}
                      className="w-full rounded-xl border border-surface-200 bg-surface-50 p-2.5 sm:p-3 text-xs sm:text-sm font-medium focus:border-brand-600 focus:bg-white focus:outline-none transition"
                    >
                      {POPULAR_LOCATIONS.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                          {loc.name} ({loc.district})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-surface-600 mb-1">
                      Alamat & Nomor Kamar
                    </label>
                    <input
                      type="text"
                      value={draft.pickupAddress}
                      onChange={(e) => setDraftField("pickupAddress", e.target.value)}
                      placeholder="Contoh: Kost Asri, Jl. Gebang Timur No. 18, Kamar 204"
                      className="w-full rounded-xl border border-surface-200 bg-surface-50 p-2.5 sm:p-3 text-xs sm:text-sm font-medium focus:border-brand-600 focus:bg-white focus:outline-none transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-semibold text-surface-600 mb-1">Lantai Kamar</label>
                      <select
                        value={draft.pickupFloor}
                        onChange={(e) => setDraftField("pickupFloor", Number(e.target.value))}
                        className="w-full rounded-xl border border-surface-200 bg-surface-50 p-2.5 sm:p-3 text-xs sm:text-sm font-medium focus:border-brand-600 focus:bg-white focus:outline-none transition"
                      >
                        <option value={1}>Lantai 1 / Dasar</option>
                        <option value={2}>Lantai 2 (+15rb)</option>
                        <option value={3}>Lantai 3 (+25rb)</option>
                        <option value={4}>Lantai 4 (+40rb)</option>
                      </select>
                    </div>

                    <div className="flex items-center h-[42px] px-3 rounded-xl border border-surface-200 bg-surface-50 self-end">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-surface-800">
                        <input
                          type="checkbox"
                          checked={draft.pickupHasLift}
                          onChange={(e) => setDraftField("pickupHasLift", e.target.checked)}
                          className="h-4 w-4 rounded text-brand-600 focus:ring-brand-500"
                        />
                        <span>Ada Lift</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Point */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-2 text-accent-800 font-bold text-xs sm:text-sm">
                  <div className="h-2.5 w-2.5 rounded-full bg-accent-600 ring-4 ring-accent-100 shrink-0" />
                  <span>Lokasi Tujuan (Antar)</span>
                </div>

                <div className="space-y-3 pl-4 sm:pl-5 ml-1">
                  <div>
                    <label className="block text-[11px] font-semibold text-surface-600 mb-1">Kawasan Kampus</label>
                    <select
                      value={draft.deliveryAreaId}
                      onChange={(e) => setDraftField("deliveryAreaId", e.target.value)}
                      className="w-full rounded-xl border border-surface-200 bg-surface-50 p-2.5 sm:p-3 text-xs sm:text-sm font-medium focus:border-brand-600 focus:bg-white focus:outline-none transition"
                    >
                      {POPULAR_LOCATIONS.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                          {loc.name} ({loc.district})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-surface-600 mb-1">
                      Alamat & Nomor Kamar
                    </label>
                    <input
                      type="text"
                      value={draft.deliveryAddress}
                      onChange={(e) => setDraftField("deliveryAddress", e.target.value)}
                      placeholder="Contoh: Wisma Mulyorejo Indah B-4, Kamar 108"
                      className="w-full rounded-xl border border-surface-200 bg-surface-50 p-2.5 sm:p-3 text-xs sm:text-sm font-medium focus:border-brand-600 focus:bg-white focus:outline-none transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-semibold text-surface-600 mb-1">Lantai Kamar</label>
                      <select
                        value={draft.deliveryFloor}
                        onChange={(e) => setDraftField("deliveryFloor", Number(e.target.value))}
                        className="w-full rounded-xl border border-surface-200 bg-surface-50 p-2.5 sm:p-3 text-xs sm:text-sm font-medium focus:border-brand-600 focus:bg-white focus:outline-none transition"
                      >
                        <option value={1}>Lantai 1 / Dasar</option>
                        <option value={2}>Lantai 2 (+15rb)</option>
                        <option value={3}>Lantai 3 (+25rb)</option>
                        <option value={4}>Lantai 4 (+40rb)</option>
                      </select>
                    </div>

                    <div className="flex items-center h-[42px] px-3 rounded-xl border border-surface-200 bg-surface-50 self-end">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-surface-800">
                        <input
                          type="checkbox"
                          checked={draft.deliveryHasLift}
                          onChange={(e) => setDraftField("deliveryHasLift", e.target.checked)}
                          className="h-4 w-4 rounded text-brand-600 focus:ring-brand-500"
                        />
                        <span>Ada Lift</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Jadwal Penjemputan Card */}
            <div className="rounded-2xl border border-surface-200/80 bg-white p-5 sm:p-6 shadow-2xs">
              <h3 className="text-sm sm:text-base font-bold text-surface-900 mb-4 pb-3 border-b border-surface-100 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand-600" />
                <span>Waktu Penjemputan</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-surface-600 mb-1">Tanggal</label>
                  <input
                    type="date"
                    value={draft.scheduledDate}
                    onChange={(e) => setDraftField("scheduledDate", e.target.value)}
                    className="w-full rounded-xl border border-surface-200 bg-surface-50 p-2.5 sm:p-3 text-xs sm:text-sm font-medium focus:border-brand-600 focus:bg-white focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-surface-600 mb-1">Jam Penjemputan</label>
                  <select
                    value={draft.scheduledTime}
                    onChange={(e) => setDraftField("scheduledTime", e.target.value)}
                    className="w-full rounded-xl border border-surface-200 bg-surface-50 p-2.5 sm:p-3 text-xs sm:text-sm font-medium focus:border-brand-600 focus:bg-white focus:outline-none transition"
                  >
                    <option value="08:00">08:00 WIB (Pagi)</option>
                    <option value="10:00">10:00 WIB (Favorit)</option>
                    <option value="13:00">13:00 WIB (Siang)</option>
                    <option value="15:30">15:30 WIB (Sore)</option>
                    <option value="19:00">19:00 WIB (Malam)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: ARMADA & HELPER */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-surface-200/80 bg-white p-5 sm:p-6 shadow-2xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-surface-100">
                <h3 className="text-sm sm:text-base font-bold text-surface-900 flex items-center gap-2">
                  <Truck className="h-4 w-4 text-brand-600" />
                  <span>Pilihan Armada</span>
                </h3>
                <span className="text-xs text-surface-500 font-medium">Jarak ± {pricing.distanceKm} km</span>
              </div>

              <div className="space-y-3">
                {VEHICLE_FLEET.map((v) => {
                  const isSelected = draft.vehicleId === v.id;

                  return (
                    <div
                      key={v.id}
                      onClick={() => setDraftField("vehicleId", v.id)}
                      className={`rounded-xl border p-4 cursor-pointer transition flex items-center justify-between gap-3 ${
                        isSelected
                          ? "border-brand-600 bg-brand-50/50 ring-1 ring-brand-500"
                          : "border-surface-200 hover:bg-surface-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-white border border-surface-200 flex items-center justify-center shrink-0">
                          {v.id === "pikap-box" ? (
                            <ShieldCheck className="h-5 w-5 text-brand-700" />
                          ) : v.id === "motor-roda3" ? (
                            <Compass className="h-5 w-5 text-brand-700" />
                          ) : (
                            <Truck className="h-5 w-5 text-brand-700" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs sm:text-sm font-bold text-surface-900">{v.name}</h4>
                            {v.badge && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-surface-900 text-white">
                                {v.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-surface-500">{v.subtitle}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-sm sm:text-base font-bold text-brand-800 block">
                          {formatRupiah(v.basePrice + pricing.distanceKm * v.pricePerKm)}
                        </span>
                        <span className="text-[10px] text-surface-400">Termasuk Supir & BBM</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Helper Configuration */}
            <div className="rounded-2xl border border-surface-200/80 bg-white p-5 sm:p-6 shadow-2xs">
              <h3 className="text-sm sm:text-base font-bold text-surface-900 mb-3 pb-3 border-b border-surface-100 flex items-center gap-2">
                <Users className="h-4 w-4 text-brand-600" />
                <span>Tenaga Angkut (Helper Door-to-Door)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setDraftField("helperCount", 1)}
                  className={`rounded-xl border p-4 cursor-pointer transition ${
                    draft.helperCount === 1
                      ? "border-brand-600 bg-brand-50/50 ring-1 ring-brand-500"
                      : "border-surface-200 hover:bg-surface-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs sm:text-sm font-bold text-surface-900">1 Helper</span>
                    <span className="text-[10px] font-bold text-brand-800 bg-brand-100 px-2 py-0.5 rounded-full">
                      Sudah Termasuk
                    </span>
                  </div>
                  <p className="text-[11px] text-surface-500">
                    Cukup untuk pindahan 1 kamar kos normal dibantu supir armada.
                  </p>
                </div>

                <div
                  onClick={() => setDraftField("helperCount", 2)}
                  className={`rounded-xl border p-4 cursor-pointer transition ${
                    draft.helperCount === 2
                      ? "border-brand-600 bg-brand-50/50 ring-1 ring-brand-500"
                      : "border-surface-200 hover:bg-surface-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs sm:text-sm font-bold text-surface-900">2 Helper</span>
                    <span className="text-[10px] font-bold text-surface-700 bg-surface-100 px-2 py-0.5 rounded-full">
                      +Rp 35.000
                    </span>
                  </div>
                  <p className="text-[11px] text-surface-500">
                    Disarankan untuk kos lantai 3-4 tanpa lift atau banyak perabot kayu berat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: CHECKLIST BARANG KOS */}
        {currentStep === 3 && (
          <div className="rounded-2xl border border-surface-200/80 bg-white p-5 sm:p-6 shadow-2xs space-y-5">
            {/* Kapasitas Header Bar */}
            <div className="pb-4 border-b border-surface-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-bold text-surface-900">
                  Estimasi Muatan: {selectedVehicleObj.name}
                </span>
                <span className="text-xs font-bold text-brand-800">{capacityPercent}%</span>
              </div>
              <div className="w-full bg-surface-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    capacityPercent > 90 ? "bg-rose-600" : "bg-brand-600"
                  }`}
                  style={{ width: `${capacityPercent}%` }}
                />
              </div>
            </div>

            <div>
              <p className="text-xs text-surface-500 mb-4">
                Pilih barang kos yang dipindahkan agar helper membawa troli dan tali pengikat yang pas:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INVENTORY_ITEMS.map((item) => {
                  const qty = draft.inventory[item.id] || 0;

                  return (
                    <div
                      key={item.id}
                      className={`rounded-xl border p-3 flex items-center justify-between gap-3 transition ${
                        qty > 0 ? "border-brand-400 bg-brand-50/30" : "border-surface-200 bg-surface-50/40"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-white border border-surface-200 flex items-center justify-center shrink-0">
                          {getInventoryIcon(item.iconName)}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-surface-900">{item.name}</h4>
                          <span className="text-[10px] text-surface-400 capitalize">{item.category}</span>
                        </div>
                      </div>

                      {/* Counter */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {qty > 0 ? (
                          <>
                            <button
                              type="button"
                              onClick={() => updateInventoryItem(item.id, -1)}
                              className="h-7 w-7 rounded-lg border border-surface-200 bg-white text-surface-700 flex items-center justify-center hover:bg-surface-100 transition"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-4 text-center text-xs font-bold text-surface-900">{qty}</span>
                            <button
                              type="button"
                              onClick={() => updateInventoryItem(item.id, 1)}
                              className="h-7 w-7 rounded-lg bg-brand-600 text-white flex items-center justify-center hover:bg-brand-700 transition"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => updateInventoryItem(item.id, 1)}
                            className="rounded-lg border border-surface-300 bg-white px-2.5 py-1 text-xs font-semibold text-surface-700 hover:border-brand-600 hover:text-brand-700 transition"
                          >
                            + Tambah
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & RINGKASAN */}
        {currentStep === 4 && (
          <div className="space-y-5">
            {/* Invoice Breakdown */}
            <div className="rounded-2xl border border-surface-200/80 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
              <h3 className="text-sm sm:text-base font-bold text-surface-900 pb-3 border-b border-surface-100">
                Rincian Tarif
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-surface-600">
                  <span>Armada ({selectedVehicleObj.name} + BBM + Driver)</span>
                  <span className="font-semibold text-surface-900">{formatRupiah(pricing.baseVehiclePrice)}</span>
                </div>

                <div className="flex justify-between text-surface-600">
                  <span>Jarak Tempuh (± {pricing.distanceKm} km)</span>
                  <span className="font-semibold text-surface-900">{formatRupiah(pricing.distanceFee)}</span>
                </div>

                <div className="flex justify-between text-surface-600">
                  <span>Tenaga Helper ({draft.helperCount} orang)</span>
                  <span className="font-semibold text-brand-800">
                    {pricing.helperFee === 0 ? "Termasuk (Rp 0)" : formatRupiah(pricing.helperFee)}
                  </span>
                </div>

                {pricing.floorFee > 0 && (
                  <div className="flex justify-between text-surface-600">
                    <span>Biaya Tangga Bertingkat</span>
                    <span className="font-semibold text-surface-900">{formatRupiah(pricing.floorFee)}</span>
                  </div>
                )}

                {draft.hasInsurance && (
                  <div className="flex justify-between text-surface-600">
                    <span>Garansi Perlindungan Barang</span>
                    <span className="font-semibold text-surface-900">{formatRupiah(pricing.protectionFee)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-surface-100 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-surface-900 block">Total Tarif Pindahan</span>
                    <span className="text-[11px] text-surface-400">Harga pasti di tempat tujuan</span>
                  </div>
                  <span className="text-xl sm:text-2xl font-black text-brand-700">
                    {formatRupiah(pricing.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Proteksi Checkbox */}
            <div className="rounded-2xl border border-surface-200/80 bg-white p-4 sm:p-5 shadow-2xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-brand-600 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-surface-900">Garansi Perlindungan Barang</h4>
                  <p className="text-[11px] text-surface-500">Kompensasi s/d Rp 2.000.000 jika terjadi kerusakan.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={draft.hasInsurance}
                  onChange={(e) => setDraftField("hasInsurance", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-surface-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-600"></div>
              </label>
            </div>

            {/* Kontak Mahasiswa */}
            <div className="rounded-2xl border border-surface-200/80 bg-white p-5 sm:p-6 shadow-2xs space-y-3.5">
              <h3 className="text-sm font-bold text-surface-900 pb-2 border-b border-surface-100">
                Kontak Mahasiswa (WhatsApp)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-surface-600 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    value={draft.customerName}
                    onChange={(e) => setDraftField("customerName", e.target.value)}
                    placeholder="Nama mahasiswa"
                    className="w-full rounded-xl border border-surface-200 bg-surface-50 p-2.5 text-xs font-medium focus:border-brand-600 focus:bg-white focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-surface-600 mb-1">Nomor WhatsApp</label>
                  <input
                    type="tel"
                    value={draft.customerPhone}
                    onChange={(e) => setDraftField("customerPhone", e.target.value)}
                    placeholder="0812xxxxxxxx"
                    className="w-full rounded-xl border border-surface-200 bg-surface-50 p-2.5 text-xs font-medium focus:border-brand-600 focus:bg-white focus:outline-none transition"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STICKY BOTTOM ACTION BAR */}
        <div className="fixed bottom-0 left-0 z-30 w-full border-t border-surface-200/90 bg-white/95 backdrop-blur shadow-elevated">
          <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4 sm:px-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 text-xs font-bold text-surface-600 hover:text-surface-900 transition py-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{currentStep === 1 ? "Batal" : "Kembali"}</span>
            </button>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-[10px] text-surface-400 block font-medium">Total Tarif</span>
                <span className="text-base sm:text-lg font-black text-brand-800">
                  {formatRupiah(pricing.totalAmount)}
                </span>
              </div>

              <Button onClick={handleNext} size="md" className="text-xs sm:text-sm px-5 py-2.5">
                {currentStep === 4 ? "Lanjut Pembayaran" : "Lanjut"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
