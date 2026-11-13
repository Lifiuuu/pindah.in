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
  imageUrl: string;
  badge?: string;
  recommendedFor: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: "furniture" | "electronics" | "boxes" | "misc";
  spaceUnit: number; // 1-10 arbitrary units for capacity gauge
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  major: string;
  campus: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
}

export interface SUSQuestion {
  id: number;
  text: string;
  isPositive: boolean; // odd is positive, even is negative
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
    imageUrl: "🛻",
    badge: "Paling Populer (UAS Standar)",
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
    imageUrl: "🚚",
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
    imageUrl: "🛺",
    badge: "Gang Sempit",
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
    name: "Putri Atika Mahardika",
    major: "D4 Teknik Informatika",
    campus: "Vokasi UNAIR 2024",
    rating: 5,
    comment:
      "Pindah dari Sutorejo ke Dharmawangsa tenang banget! Gak ada drama tawar-menawar harga sepihak sama abang sopir, tarifnya jelas dari awal di aplikasi.",
    avatar: "👩‍🎓",
    date: "12 Okt 2026",
  },
  {
    id: "testi-2",
    name: "Faatin Sausan Firdaus",
    major: "Fakultas Kedokteran Gigi",
    campus: "UNAIR Kampus A",
    rating: 5,
    comment:
      "Helper-nya sopan dan cekatan banget! Kasur dan lemari berat diangkat dari kamar lantai 3 sampai masuk ke kamar kos baru. Recommended parah!",
    avatar: "👩‍⚕️",
    date: "28 Sep 2026",
  },
  {
    id: "testi-3",
    name: "Rizky Bima Aditya",
    major: "Sistem Informasi",
    campus: "FST UNAIR Kampus C",
    rating: 5,
    comment:
      "Fitur kirim link tagihan ke ortu ngebantu banget. Mama di luar kota tinggal klik link WhatsApp langsung bayar pakai QRIS M-Banking. Beres!",
    avatar: "👨‍💻",
    date: "04 Nov 2026",
  },
];

export const SUS_QUESTIONS: SUSQuestion[] = [
  { id: 1, text: "Saya berpikir akan sering menggunakan platform Pindah.in saat butuh pindah kos.", isPositive: true },
  { id: 2, text: "Saya merasa sistem pemesanan platform ini terlalu rumit dan berbelit-belit.", isPositive: false },
  { id: 3, text: "Saya merasa platform Pindah.in sangat mudah dan praktis untuk digunakan.", isPositive: true },
  { id: 4, text: "Saya merasa membutuhkan bantuan teknis orang lain untuk bisa menggunakan platform ini.", isPositive: false },
  { id: 5, text: "Saya merasa fitur-fitur di dalam aplikasi terintegrasi dengan sangat rapi dan fungsional.", isPositive: true },
  { id: 6, text: "Saya merasa ada terlalu banyak hal yang membingungkan atau tidak konsisten pada aplikasi ini.", isPositive: false },
  { id: 7, text: "Saya yakin mayoritas mahasiswa kos akan dapat mempelajari aplikasi ini dengan sangat cepat.", isPositive: true },
  { id: 8, text: "Saya merasa antarmuka aplikasi ini terasa janggal, kaku, atau menyulitkan saat digunakan.", isPositive: false },
  { id: 9, text: "Saya merasa percaya diri dan nyaman saat melakukan alur pemesanan di Pindah.in.", isPositive: true },
  { id: 10, text: "Saya harus membiasakan diri mempelajari banyak hal sebelum mahir menggunakan sistem ini.", isPositive: false },
];

export const MOCK_ACTIVE_DRIVER = {
  name: "Pak Joko Slamet",
  rating: 4.9,
  completedTrips: 184,
  phone: "0812-3456-7890",
  vehicleModel: "Daihatsu Gran Max Pick Up (Putih)",
  plateNumber: "L 1832 AB",
  photo: "👨‍✈️",
  helperName: "Mas Dimas Prasetyo",
  helperRole: "Helper Door-to-Door Profesional",
};

