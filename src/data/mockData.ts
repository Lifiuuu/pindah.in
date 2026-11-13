export interface LocationArea {
  id: string;
  name: string;
  district: string;
  popularKos: string[];
  distanceKmFromCenter: number;
}

export interface VehicleOption {
  id: "motor-roda3" | "pikap-bak" | "pikap-box";
  name: string;
  subtitle: string;
  description: string;
  capacityKg: number;
  volumeM3: number;
  basePrice: number;
  pricePerKm: number;
  iconType: "pickup-open" | "pickup-box" | "cargo-trike";
  badge?: string;
  recommendedFor: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: "furniture" | "electronics" | "boxes" | "misc";
  spaceUnit: number;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  major: string;
  campus: string;
  rating: number;
  comment: string;
  date: string;
}

export const POPULAR_LOCATIONS: LocationArea[] = [
  {
    id: "unair-b",
    name: "UNAIR Kampus B (Dharmawangsa / Gubeng)",
    district: "Gubeng, Surabaya Timur",
    popularKos: ["Kos Karang Menjangan Asri", "Wisma Mahasiswa Dharmawangsa", "Kost Putri Airlangga 2"],
    distanceKmFromCenter: 3.5,
  },
  {
    id: "unair-c",
    name: "UNAIR Kampus C (Mulyorejo / Sutorejo)",
    district: "Mulyorejo, Surabaya Timur",
    popularKos: ["Kost Sutorejo Prima", "Wisma Mulyorejo Indah", "Pondok Mahasiswa Kalisari"],
    distanceKmFromCenter: 7.2,
  },
  {
    id: "unair-a",
    name: "UNAIR Kampus A (Prof. Moestopo / Tambaksari)",
    district: "Tambaksari, Surabaya Pusat",
    popularKos: ["Griya Putri Moestopo", "Kost Kusuma Bangsa", "Wisma Kedokteran Gigi"],
    distanceKmFromCenter: 2.1,
  },
  {
    id: "its-sukolilo",
    name: "Kawasan ITS Sukolilo / Gebang",
    district: "Sukolilo, Surabaya Timur",
    popularKos: ["Kost Putri Gebang Wetan", "Wisma Keputih Permai", "Kost Deles Asri"],
    distanceKmFromCenter: 8.8,
  },
  {
    id: "unesa-ketintang",
    name: "Kawasan UNESA Ketintang / Wonokromo",
    district: "Wonokromo, Surabaya Selatan",
    popularKos: ["Kost Ketintang Baru", "Griya Mahasiswa Karah", "Kost Putri Gayungan"],
    distanceKmFromCenter: 6.4,
  },
  {
    id: "upn-rungkut",
    name: "Kawasan UPN Veteran / Rungkut Madya",
    district: "Rungkut, Surabaya Timur",
    popularKos: ["Kost Wisma Medokan Asri", "Kost Rungkut Harapan", "Griya Putri Gunung Anyar"],
    distanceKmFromCenter: 10.5,
  },
];

export const VEHICLE_FLEET: VehicleOption[] = [
  {
    id: "pikap-bak",
    name: "Pikap Bak Terbuka",
    subtitle: "Suzuki Carry / Daihatsu Gran Max",
    description: "Paling favorit & pas untuk kos tipe sedang dengan kasur, lemari, meja & kontainer.",
    capacityKg: 800,
    volumeM3: 2.5,
    basePrice: 90000,
    pricePerKm: 6000,
    iconType: "pickup-open",
    badge: "Paling Populer",
    recommendedFor: "Pindahan kos lengkap 1 kamar penuh",
  },
  {
    id: "pikap-box",
    name: "Pikap Box Tertutup",
    subtitle: "Gran Max Box Aluminium",
    description: "Ekstra aman dari hujan, terik matahari & debu jalanan. Muatan terkunci rapat.",
    capacityKg: 950,
    volumeM3: 3.2,
    basePrice: 115000,
    pricePerKm: 7000,
    iconType: "pickup-box",
    badge: "Anti Hujan",
    recommendedFor: "Banyak perangkat elektronik & barang berharga",
  },
  {
    id: "motor-roda3",
    name: "Motor Kargo Roda Tiga",
    subtitle: "Viar / Tossa Karya Box",
    description: "Solusi lincah untuk kos di gang sempit yang tidak bisa diakses mobil pikap.",
    capacityKg: 350,
    volumeM3: 1.2,
    basePrice: 60000,
    pricePerKm: 4500,
    iconType: "cargo-trike",
    badge: "Akses Gang",
    recommendedFor: "Barang minimalis / kos lorong sempit",
  },
];

export const INVENTORY_ITEMS: InventoryItem[] = [
  { id: "kasur-busa", name: "Kasur Busa Single", category: "furniture", spaceUnit: 3, iconName: "Bed" },
  { id: "kasur-springbed", name: "Kasur Springbed (120x200)", category: "furniture", spaceUnit: 5, iconName: "BedDouble" },
  { id: "lemari-plastik", name: "Lemari Plastik 4 Susun", category: "furniture", spaceUnit: 2, iconName: "Archive" },
  { id: "lemari-kayu", name: "Lemari Kayu 2 Pintu", category: "furniture", spaceUnit: 4, iconName: "DoorClosed" },
  { id: "meja-kursi", name: "Meja & Kursi Belajar", category: "furniture", spaceUnit: 3, iconName: "Armchair" },
  { id: "kulkas-mini", name: "Kulkas Mini / Portable", category: "electronics", spaceUnit: 2, iconName: "Refrigerator" },
  { id: "dispenser-galon", name: "Dispenser + Galon Air", category: "electronics", spaceUnit: 1, iconName: "Droplets" },
  { id: "kipas-angin", name: "Kipas Angin Berdiri", category: "electronics", spaceUnit: 1, iconName: "Fan" },
  { id: "box-pakaian", name: "Box Kontainer Plastik (50L)", category: "boxes", spaceUnit: 2, iconName: "Package" },
  { id: "kardus-buku", name: "Kardus Buku & Dokumen", category: "boxes", spaceUnit: 1, iconName: "Box" },
  { id: "jemuran-karpet", name: "Jemuran Lipat & Karpet", category: "misc", spaceUnit: 1, iconName: "Layers" },
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "testi-1",
    name: "Nadira Safitri",
    initials: "NS",
    major: "Sains Data",
    campus: "UNAIR Kampus C",
    rating: 5,
    comment:
      "Pindah dari Sutorejo ke Dharmawangsa sangat tertata. Tidak ada tawar-menawar sepihak, estimasi biaya jelas sejak awal di aplikasi.",
    date: "12 Okt 2026",
  },
  {
    id: "testi-2",
    name: "Siti Nurhaliza",
    initials: "SN",
    major: "Kedokteran Gigi",
    campus: "UNAIR Kampus A",
    rating: 5,
    comment:
      "Helper sangat sigap dan komunikatif. Kasur dan lemari dibantu angkut dari kamar lantai 3 hingga tertata di kamar kos baru.",
    date: "28 Sep 2026",
  },
  {
    id: "testi-3",
    name: "Rizky Bima Aditya",
    initials: "RB",
    major: "Sistem Informasi",
    campus: "UNAIR Kampus B",
    rating: 5,
    comment:
      "Fitur pembayaran QRIS langsung di layar sangat praktis. Rincian biaya transparan dan armada tiba tepat waktu.",
    date: "04 Nov 2026",
  },
];

export const MOCK_ACTIVE_DRIVER = {
  name: "Pak Joko Slamet",
  initials: "JS",
  rating: 4.9,
  completedTrips: 184,
  phone: "0812-3456-7890",
  vehicleModel: "Daihatsu Gran Max Pick Up (Putih)",
  plateNumber: "L 1832 AB",
  helperName: "Mas Dimas Prasetyo",
  helperRole: "Helper Door-to-Door Profesional",
};
