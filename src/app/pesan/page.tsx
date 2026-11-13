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
  ArrowRight,
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
  Box,
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
        return <Bed className="h-5 w-5 text-brand-700" />;
      case "DoorClosed":
      case "Archive":
        return <DoorClosed className="h-5 w-5 text-accent-700" />;
      case "Armchair":
        return <Armchair className="h-5 w-5 text-surface-700" />;
      case "Refrigerator":
        return <Refrigerator className="h-5 w-5 text-brand-600" />;
      case "Droplets":
        return <Droplets className="h-5 w-5 text-brand-500" />;
      case "Fan":
        return <Fan className="h-5 w-5 text-surface-600" />;
      case "Package":
      case "Box":
        return <Package className="h-5 w-5 text-brand-800" />;
      default:
        return <Layers className="h-5 w-5 text-surface-500" />;
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
      <div className="mx-auto max-w-3xl">
        {/* Progress Stepper Bar with Spacious Padding */}
        <div className="rounded-3xl border border-surface-200/90 bg-white p-5 sm:p-6 mb-8 shadow-subtle">
          <div className="flex items-center justify-between">
            {steps.map((s, idx) => {
              const isCompleted = currentStep > s.num;
              const isCurrent = currentStep === s.num;

              return (
                <div key={s.num} className="flex-1 flex items-center">
                  <div
                    onClick={() => s.num < currentStep && setCurrentStep(s.num)}
                    className={`flex items-center gap-2.5 cursor-pointer transition ${
                      isCurrent
                        ? "text-brand-800 font-bold"
                        : isCompleted
                        ? "text-brand-700 font-semibold"
                        : "text-surface-400"
                    }`}
                  >
                    <div
                      className={`h-8 w-8 sm:h-9 sm:w-9 rounded-2xl flex items-center justify-center text-xs sm:text-sm font-bold transition ${
                        isCurrent
                          ? "bg-brand-600 text-white ring-4 ring-brand-100 shadow-xs"
                          : isCompleted
                          ? "bg-brand-700 text-white"
                          : "bg-surface-100 text-surface-500"
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : s.num}
                    </div>
                    <span className="hidden sm:inline text-xs sm:text-sm">{s.label}</span>
                  </div>

                  {idx < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 sm:mx-4 ${
                        currentStep > s.num ? "bg-brand-400" : "bg-surface-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="sm:hidden text-center mt-3 text-xs font-bold text-surface-700">
            Langkah {currentStep} dari 4: {steps[currentStep - 1].label}
          </div>
        </div>

        {/* STEP 1: RUTE & JADWAL */}
        {currentStep === 1 && (
          <div className="space-y-8">
            {/* Lokasi Asal */}
            <div className="rounded-3xl border border-surface-200/90 bg-white p-6 sm:p-8 shadow-subtle">
              <div className="flex items-center gap-2.5 text-brand-800 font-bold text-base mb-6 pb-3 border-b border-surface-100">
                <MapPin className="h-5 w-5 text-brand-600" />
                <span>Titik Penjemputan (Kos Asal)</span>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-surface-800 mb-2">Pilih Kawasan Kos Kampus</label>
                  <select
                    value={draft.pickupAreaId}
                    onChange={(e) => setDraftField("pickupAreaId", e.target.value)}
                    className="w-full rounded-2xl border border-surface-200 bg-surface-50 p-3.5 text-xs sm:text-sm font-medium focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition"
                  >
                    {POPULAR_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name} ({loc.district})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-surface-800 mb-2">
                    Nama Kos, Alamat Lengkap & Nomor Kamar
                  </label>
                  <input
                    type="text"
                    value={draft.pickupAddress}
                    onChange={(e) => setDraftField("pickupAddress", e.target.value)}
                    placeholder="Contoh: Kost Asri Mahasiswa, Jl. Gebang Timur / Sutorejo No. 18, Kamar 204"
                    className="w-full rounded-2xl border border-surface-200 bg-surface-50 p-3.5 text-xs sm:text-sm font-medium focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-surface-800 mb-2">Lantai Kamar Kos</label>
                    <select
                      value={draft.pickupFloor}
                      onChange={(e) => setDraftField("pickupFloor", Number(e.target.value))}
                      className="w-full rounded-2xl border border-surface-200 bg-surface-50 p-3.5 text-xs sm:text-sm font-medium focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition"
                    >
                      <option value={1}>Lantai 1 / Dasar (Rp 0)</option>
                      <option value={2}>Lantai 2 (+Rp 15.000)</option>
                      <option value={3}>Lantai 3 (+Rp 25.000)</option>
                      <option value={4}>Lantai 4 (+Rp 40.000)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-surface-800 mb-2">Akses Lift</label>
                    <div className="flex items-center h-[50px] px-4 rounded-2xl border border-surface-200 bg-surface-50">
                      <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-surface-800">
                        <input
                          type="checkbox"
                          checked={draft.pickupHasLift}
                          onChange={(e) => setDraftField("pickupHasLift", e.target.checked)}
                          className="h-4 w-4 rounded text-brand-600 focus:ring-brand-500"
                        />
                        <span>Ada Lift (Bebas Biaya Tangga)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lokasi Tujuan */}
            <div className="rounded-3xl border border-surface-200/90 bg-white p-6 sm:p-8 shadow-subtle">
              <div className="flex items-center gap-2.5 text-brand-800 font-bold text-base mb-6 pb-3 border-b border-surface-100">
                <MapPin className="h-5 w-5 text-accent-700" />
                <span>Titik Pengantaran (Kos Tujuan Baru)</span>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-surface-800 mb-2">Pilih Kawasan Kos Kampus</label>
                  <select
                    value={draft.deliveryAreaId}
                    onChange={(e) => setDraftField("deliveryAreaId", e.target.value)}
                    className="w-full rounded-2xl border border-surface-200 bg-surface-50 p-3.5 text-xs sm:text-sm font-medium focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition"
                  >
                    {POPULAR_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name} ({loc.district})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-surface-800 mb-2">
                    Nama Kos Tujuan, Alamat & Nomor Kamar
                  </label>
                  <input
                    type="text"
                    value={draft.deliveryAddress}
                    onChange={(e) => setDraftField("deliveryAddress", e.target.value)}
                    placeholder="Contoh: Wisma Mulyorejo Indah Blok B-4, Kamar 108"
                    className="w-full rounded-2xl border border-surface-200 bg-surface-50 p-3.5 text-xs sm:text-sm font-medium focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-surface-800 mb-2">Lantai Kamar Tujuan</label>
                    <select
                      value={draft.deliveryFloor}
                      onChange={(e) => setDraftField("deliveryFloor", Number(e.target.value))}
                      className="w-full rounded-2xl border border-surface-200 bg-surface-50 p-3.5 text-xs sm:text-sm font-medium focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition"
                    >
                      <option value={1}>Lantai 1 / Dasar (Rp 0)</option>
                      <option value={2}>Lantai 2 (+Rp 15.000)</option>
                      <option value={3}>Lantai 3 (+Rp 25.000)</option>
                      <option value={4}>Lantai 4 (+Rp 40.000)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-surface-800 mb-2">Akses Lift</label>
                    <div className="flex items-center h-[50px] px-4 rounded-2xl border border-surface-200 bg-surface-50">
                      <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-surface-800">
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

            {/* Jadwal Penjemputan */}
            <div className="rounded-3xl border border-surface-200/90 bg-white p-6 sm:p-8 shadow-subtle">
              <div className="flex items-center gap-2.5 text-surface-900 font-bold text-base mb-6 pb-3 border-b border-surface-100">
                <Calendar className="h-5 w-5 text-brand-600" />
                <span>Jadwal Penjemputan</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-surface-800 mb-2">Tanggal Pindahan</label>
                  <input
                    type="date"
                    value={draft.scheduledDate}
                    onChange={(e) => setDraftField("scheduledDate", e.target.value)}
                    className="w-full rounded-2xl border border-surface-200 bg-surface-50 p-3.5 text-xs sm:text-sm font-medium focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-surface-800 mb-2">Jam Standby Penjemputan</label>
                  <select
                    value={draft.scheduledTime}
                    onChange={(e) => setDraftField("scheduledTime", e.target.value)}
                    className="w-full rounded-2xl border border-surface-200 bg-surface-50 p-3.5 text-xs sm:text-sm font-medium focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition"
                  >
                    <option value="08:00">08:00 WIB (Pagi)</option>
                    <option value="10:00">10:00 WIB (Paling Populer)</option>
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
          <div className="space-y-8">
            <div className="rounded-3xl border border-surface-200/90 bg-white p-6 sm:p-8 shadow-subtle">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-surface-100">
                <div className="flex items-center gap-2.5 text-brand-800 font-bold text-base">
                  <Truck className="h-5 w-5 text-brand-600" />
                  <span>Pilih Tipe Kendaraan</span>
                </div>
                <span className="text-xs text-surface-500 font-medium">Estimasi Jarak: ± {pricing.distanceKm} km</span>
              </div>

              <div className="space-y-4">
                {VEHICLE_FLEET.map((v) => {
                  const isSelected = draft.vehicleId === v.id;

                  return (
                    <div
                      key={v.id}
                      onClick={() => setDraftField("vehicleId", v.id)}
                      className={`rounded-3xl border p-5 cursor-pointer transition flex items-center justify-between gap-4 ${
                        isSelected
                          ? "border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/25 shadow-subtle"
                          : "border-surface-200 hover:bg-surface-50/70"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-2xl bg-white border border-surface-200 flex items-center justify-center shrink-0 shadow-2xs">
                          {v.id === "pikap-box" ? (
                            <ShieldCheck className="h-7 w-7 text-brand-700" />
                          ) : v.id === "motor-roda3" ? (
                            <Compass className="h-7 w-7 text-brand-700" />
                          ) : (
                            <Truck className="h-7 w-7 text-brand-700" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm sm:text-base font-bold text-surface-900">{v.name}</h4>
                            {v.badge && (
                              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-surface-900 text-white">
                                {v.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-surface-500 mt-0.5">{v.subtitle}</p>
                          <p className="text-[11px] text-surface-600 mt-1 hidden sm:block leading-relaxed">
                            {v.description}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-base sm:text-lg font-black text-brand-800 block">
                          {formatRupiah(v.basePrice + pricing.distanceKm * v.pricePerKm)}
                        </span>
                        <span className="text-[11px] text-surface-500 font-medium">Bahan Bakar & Sopir</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Helper Configuration */}
            <div className="rounded-3xl border border-surface-200/90 bg-white p-6 sm:p-8 shadow-subtle">
              <div className="flex items-center gap-2.5 text-brand-800 font-bold text-base mb-4 pb-3 border-b border-surface-100">
                <Users className="h-5 w-5 text-brand-600" />
                <span>Konfigurasi Tenaga Angkut (Helper Door-to-Door)</span>
              </div>

              <p className="text-xs sm:text-sm text-surface-600 mb-6 leading-relaxed">
                Helper bertugas mengangkat barang berat dari dalam kamar kos asal, menata di armada pikap, hingga
                mengantar masuk ke dalam kamar kos barumu.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setDraftField("helperCount", 1)}
                  className={`rounded-2xl border p-5 cursor-pointer transition ${
                    draft.helperCount === 1
                      ? "border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/25"
                      : "border-surface-200 hover:bg-surface-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-surface-900">1 Helper Door-to-Door</span>
                    <span className="text-xs font-bold text-brand-800 bg-brand-100 px-2.5 py-0.5 rounded-full border border-brand-200">
                      Termasuk
                    </span>
                  </div>
                  <p className="text-xs text-surface-500 leading-relaxed">
                    Cukup untuk pindahan standar 1 kamar kos (dibantu driver armada).
                  </p>
                </div>

                <div
                  onClick={() => setDraftField("helperCount", 2)}
                  className={`rounded-2xl border p-5 cursor-pointer transition ${
                    draft.helperCount === 2
                      ? "border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/25"
                      : "border-surface-200 hover:bg-surface-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-surface-900">2 Helper Door-to-Door</span>
                    <span className="text-xs font-bold text-surface-800 bg-surface-100 px-2.5 py-0.5 rounded-full border border-surface-200">
                      +Rp 35.000
                    </span>
                  </div>
                  <p className="text-xs text-surface-500 leading-relaxed">
                    Disarankan jika banyak lemari kayu berat atau kos berada di lantai 3–4 tanpa lift.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: CHECKLIST BARANG KOS */}
        {currentStep === 3 && (
          <div className="space-y-8">
            {/* Kapasitas Gauge */}
            <div className="rounded-3xl border border-surface-200/90 bg-white p-6 sm:p-7 shadow-subtle">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <Package className="h-5 w-5 text-brand-600" />
                  <span className="text-sm sm:text-base font-bold text-surface-900">Estimasi Keterisian Muatan</span>
                </div>
                <span className="text-xs sm:text-sm font-black text-brand-800">{capacityPercent}% Muatan</span>
              </div>

              <div className="w-full bg-surface-100 rounded-full h-3.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    capacityPercent > 90
                      ? "bg-rose-600"
                      : capacityPercent > 60
                      ? "bg-accent-500"
                      : "bg-brand-600"
                  }`}
                  style={{ width: `${capacityPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between mt-3 text-xs text-surface-500">
                <span>Armada: {selectedVehicleObj.name}</span>
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      capacityPercent > 90 ? "bg-rose-500" : "bg-brand-600"
                    )}
                  />
                  {capacityPercent > 90
                    ? "Kapasitas muatan hampir penuh"
                    : "Kapasitas muatan aman"}
                </span>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="rounded-3xl border border-surface-200/90 bg-white p-6 sm:p-8 shadow-subtle">
              <h3 className="text-base sm:text-lg font-bold text-surface-900 mb-1.5">
                Pilih Barang Kos yang Dipindahkan
              </h3>
              <p className="text-xs sm:text-sm text-surface-500 mb-6 leading-relaxed">
                Tentukan jumlah barang agar tim helper membawa perlengkapan troli dan tali pengikat yang memadai.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {INVENTORY_ITEMS.map((item) => {
                  const qty = draft.inventory[item.id] || 0;

                  return (
                    <div
                      key={item.id}
                      className={`rounded-2xl border p-4 flex items-center justify-between gap-3 transition ${
                        qty > 0
                          ? "border-brand-500 bg-brand-50/40"
                          : "border-surface-200 bg-surface-50/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-white border border-surface-200 flex items-center justify-center shrink-0">
                          {getInventoryIcon(item.iconName)}
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-surface-900">{item.name}</h4>
                          <span className="text-[11px] text-surface-400 capitalize">{item.category}</span>
                        </div>
                      </div>

                      {/* Counter */}
                      <div className="flex items-center gap-2.5">
                        {qty > 0 ? (
                          <>
                            <button
                              type="button"
                              onClick={() => updateInventoryItem(item.id, -1)}
                              className="h-8 w-8 rounded-xl bg-white border border-surface-200 text-surface-700 flex items-center justify-center hover:bg-surface-100 active:scale-95 transition"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-5 text-center text-xs font-bold text-surface-900">{qty}</span>
                            <button
                              type="button"
                              onClick={() => updateInventoryItem(item.id, 1)}
                              className="h-8 w-8 rounded-xl bg-brand-600 text-white flex items-center justify-center hover:bg-brand-700 active:scale-95 transition"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => updateInventoryItem(item.id, 1)}
                            className="rounded-xl border border-surface-300 bg-white px-3 py-1.5 text-xs font-bold text-surface-700 hover:border-brand-600 hover:text-brand-700 transition"
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

        {/* STEP 4: REVIEW, RINCIAN HARGA & PROTEKSI */}
        {currentStep === 4 && (
          <div className="space-y-8">
            {/* Breakdown Rincian Harga Transparan */}
            <div className="rounded-3xl border border-brand-200 bg-white p-6 sm:p-8 shadow-subtle">
              <div className="flex items-center gap-2.5 text-brand-800 font-bold text-base mb-6 pb-3 border-b border-surface-100">
                <Sparkles className="h-5 w-5 text-brand-600" />
                <span>Rincian Transparansi Tarif</span>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex justify-between text-surface-600">
                  <span>
                    Tarif Dasar Armada ({selectedVehicleObj.name} + BBM + Driver)
                  </span>
                  <span className="font-semibold text-surface-900">{formatRupiah(pricing.baseVehiclePrice)}</span>
                </div>

                <div className="flex justify-between text-surface-600">
                  <span>Biaya Jarak Tempuh (± {pricing.distanceKm} km)</span>
                  <span className="font-semibold text-surface-900">{formatRupiah(pricing.distanceFee)}</span>
                </div>

                <div className="flex justify-between text-surface-600">
                  <span>Tenaga Helper ({draft.helperCount} orang door-to-door)</span>
                  <span className="font-semibold text-brand-800">
                    {pricing.helperFee === 0 ? "Termasuk (Rp 0)" : formatRupiah(pricing.helperFee)}
                  </span>
                </div>

                {pricing.floorFee > 0 && (
                  <div className="flex justify-between text-surface-600">
                    <span>Kompensasi Tangga Lantai Bertingkat</span>
                    <span className="font-semibold text-surface-900">{formatRupiah(pricing.floorFee)}</span>
                  </div>
                )}

                <div className="flex justify-between text-surface-600">
                  <span>Jaminan Perlindungan Barang</span>
                  <span className="font-semibold text-surface-900">
                    {draft.hasInsurance ? formatRupiah(pricing.protectionFee) : "Rp 0"}
                  </span>
                </div>

                {pricing.discountPromo < 0 && (
                  <div className="flex justify-between text-brand-900 font-medium bg-brand-50 p-3 rounded-2xl border border-brand-200">
                    <span>Voucher Spesial Mahasiswa Baru</span>
                    <span>{formatRupiah(pricing.discountPromo)}</span>
                  </div>
                )}

                <div className="pt-4 border-t border-surface-200 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm sm:text-base font-bold text-surface-950 block">Total Tarif Pindahan</span>
                    <span className="text-xs text-surface-400">Harga pasti, sudah termasuk supir & helper</span>
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-brand-700">
                    {formatRupiah(pricing.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Proteksi & Garansi Toggle */}
            <div className="rounded-3xl border border-surface-200/90 bg-white p-6 sm:p-7 shadow-subtle">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="h-11 w-11 rounded-2xl bg-brand-50 border border-brand-200 text-brand-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-surface-900">Garansi Perlindungan Barang Kos</h4>
                    <p className="text-xs text-surface-500 mt-1 leading-relaxed">
                      Klaim kompensasi hingga Rp 2.000.000 jika terjadi kerusakan minor atau kendala saat proses
                      pemindahan oleh tim helper.
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={draft.hasInsurance}
                    onChange={(e) => setDraftField("hasInsurance", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
                </label>
              </div>
            </div>

            {/* Catatan Khusus & Kontak */}
            <div className="rounded-3xl border border-surface-200/90 bg-white p-6 sm:p-8 shadow-subtle space-y-5">
              <div>
                <label className="block text-xs font-bold text-surface-800 mb-2">Catatan Tambahan untuk Sopir / Helper</label>
                <textarea
                  rows={2}
                  value={draft.driverNotes}
                  onChange={(e) => setDraftField("driverNotes", e.target.value)}
                  placeholder="Misal: Kos masuk gang kecil depan warkop, ada anjing penjaga, atau kasur harap ditutup plastik."
                  className="w-full rounded-2xl border border-surface-200 bg-surface-50 p-3.5 text-xs sm:text-sm font-medium focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-surface-800 mb-2">Nama Mahasiswa Pemesan</label>
                  <input
                    type="text"
                    value={draft.customerName}
                    onChange={(e) => setDraftField("customerName", e.target.value)}
                    className="w-full rounded-2xl border border-surface-200 bg-surface-50 p-3.5 text-xs sm:text-sm font-medium focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-800 mb-2">Nomor WhatsApp Aktif</label>
                  <input
                    type="text"
                    value={draft.customerPhone}
                    onChange={(e) => setDraftField("customerPhone", e.target.value)}
                    className="w-full rounded-2xl border border-surface-200 bg-surface-50 p-3.5 text-xs sm:text-sm font-medium focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STICKY BOTTOM ACTION BAR WITH SPACIOUS PADDING */}
        <div className="fixed bottom-0 left-0 z-30 w-full border-t border-surface-200/90 bg-white/95 backdrop-blur shadow-elevated">
          <div className="mx-auto flex h-20 max-w-3xl items-center justify-between px-4 sm:px-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-xs sm:text-sm font-bold text-surface-600 hover:text-surface-900 transition py-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{currentStep === 1 ? "Batal" : "Kembali"}</span>
            </button>

            <div className="flex items-center gap-4">
              <div className="text-right hidden xs:block">
                <span className="text-[10px] text-surface-400 block uppercase font-bold tracking-wider">Total Tarif</span>
                <span className="text-lg sm:text-xl font-black text-brand-800">
                  {formatRupiah(pricing.totalAmount)}
                </span>
              </div>

              <Button onClick={handleNext} size="md" className="text-xs sm:text-sm px-6 py-3">
                {currentStep === 4 ? "Lanjut Pembayaran" : "Langkah Berikutnya"}
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
