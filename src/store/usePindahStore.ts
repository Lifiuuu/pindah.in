import { create } from "zustand";
import { persist } from "zustand/middleware";
import { POPULAR_LOCATIONS, VEHICLE_FLEET, MOCK_ACTIVE_DRIVER } from "@/data/mockData";

export interface OrderDraft {
  pickupAreaId: string;
  pickupAddress: string;
  pickupFloor: number;
  pickupHasLift: boolean;
  deliveryAreaId: string;
  deliveryAddress: string;
  deliveryFloor: number;
  deliveryHasLift: boolean;
  scheduledDate: string;
  scheduledTime: string;
  vehicleId: "motor-roda3" | "pikap-bak" | "pikap-box";
  helperCount: number;
  inventory: Record<string, number>;
  hasInsurance: boolean;
  driverNotes: string;
  customerName: string;
  customerPhone: string;
  payerName?: string;
}

export type OrderStatus =
  | "awaiting_payment"
  | "searching_driver"
  | "driver_assigned"
  | "loading"
  | "in_transit"
  | "unloading"
  | "completed";

export interface ActiveOrder {
  id: string;
  createdAt: string;
  orderData: OrderDraft;
  pricing: {
    baseVehiclePrice: number;
    distanceKm: number;
    distanceFee: number;
    helperFee: number;
    floorFee: number;
    protectionFee: number;
    discountPromo: number;
    platformFee: number;
    totalAmount: number;
    mitraShare: number;
    platformShare: number;
  };
  status: OrderStatus;
  paymentStatus: "unpaid" | "paid";
  paymentMethod?: "qris" | "transfer_va" | "parent_link";
  driverInfo: typeof MOCK_ACTIVE_DRIVER;
  rating?: number;
  reviewComment?: string;
}

interface PindahStore {
  draft: OrderDraft;
  activeOrders: ActiveOrder[];

  // Draft actions
  setDraftField: <K extends keyof OrderDraft>(field: K, value: OrderDraft[K]) => void;
  updateInventoryItem: (itemId: string, delta: number) => void;
  resetDraft: () => void;

  // Pricing helper
  calculatePricing: (customDraft?: OrderDraft) => ActiveOrder["pricing"];

  // Order actions
  createOrder: (paymentMethod?: "qris" | "transfer_va" | "parent_link") => string;
  getOrderById: (id: string) => ActiveOrder | undefined;
  updatePaymentStatus: (orderId: string, status: "paid" | "unpaid") => void;
  advanceOrderStatus: (orderId: string) => OrderStatus;
  submitOrderRating: (orderId: string, rating: number, comment?: string) => void;
}

const DEFAULT_DRAFT: OrderDraft = {
  pickupAreaId: "unair-c",
  pickupAddress: "Kost Sutorejo Prima No. 18, Kamar 204",
  pickupFloor: 2,
  pickupHasLift: false,
  deliveryAreaId: "unair-b",
  deliveryAddress: "Wisma Mahasiswa Dharmawangsa No. 45, Kamar 12",
  deliveryFloor: 1,
  deliveryHasLift: false,
  scheduledDate: new Date().toISOString().split("T")[0],
  scheduledTime: "10:00",
  vehicleId: "pikap-bak",
  helperCount: 1,
  inventory: {
    "kasur-busa": 1,
    "meja-kursi": 1,
    "box-pakaian": 2,
    "kipas-angin": 1,
    "kardus-buku": 2,
  },
  hasInsurance: true,
  driverNotes: "Akses lorong kos muat motor roda 3 dan mobil pikap. Tolong dibantu angkat kasur dari lt 2.",
  customerName: "Putri Atika M.",
  customerPhone: "0812-3456-7890",
  payerName: "Orang Tua / Mandiri",
};

export const usePindahStore = create<PindahStore>()(
  persist(
    (set, get) => ({
      draft: DEFAULT_DRAFT,
      activeOrders: [
        {
          id: "PNDH-98214",
          createdAt: new Date().toISOString(),
          orderData: DEFAULT_DRAFT,
          pricing: {
            baseVehiclePrice: 90000,
            distanceKm: 8,
            distanceFee: 48000,
            helperFee: 0,
            floorFee: 15000,
            protectionFee: 10000,
            discountPromo: -13000,
            platformFee: 0,
            totalAmount: 150000,
            mitraShare: 120000,
            platformShare: 30000,
          },
          status: "in_transit",
          paymentStatus: "paid",
          paymentMethod: "parent_link",
          driverInfo: MOCK_ACTIVE_DRIVER,
        },
      ],

      setDraftField: (field, value) =>
        set((state) => ({
          draft: { ...state.draft, [field]: value },
        })),

      updateInventoryItem: (itemId, delta) =>
        set((state) => {
          const currentCount = state.draft.inventory[itemId] || 0;
          const nextCount = Math.max(0, currentCount + delta);
          const nextInventory = { ...state.draft.inventory };
          if (nextCount === 0) {
            delete nextInventory[itemId];
          } else {
            nextInventory[itemId] = nextCount;
          }
          return {
            draft: { ...state.draft, inventory: nextInventory },
          };
        }),

      resetDraft: () => set({ draft: DEFAULT_DRAFT }),

      calculatePricing: (customDraft) => {
        const d = customDraft || get().draft;
        const vehicle = VEHICLE_FLEET.find((v) => v.id === d.vehicleId) || VEHICLE_FLEET[0];

        const pickupLoc = POPULAR_LOCATIONS.find((l) => l.id === d.pickupAreaId);
        const delivLoc = POPULAR_LOCATIONS.find((l) => l.id === d.deliveryAreaId);
        let distanceKm = 7.5;
        if (pickupLoc && delivLoc) {
          distanceKm = Math.max(
            3.0,
            Math.round(Math.abs(pickupLoc.distanceKmFromCenter - delivLoc.distanceKmFromCenter) * 1.8 + 2.5)
          );
        }

        const baseVehiclePrice = vehicle.basePrice;
        const distanceFee = distanceKm * vehicle.pricePerKm;
        const helperFee = d.helperCount > 1 ? 35000 : 0;

        let floorFee = 0;
        if (!d.pickupHasLift && d.pickupFloor > 1) {
          if (d.pickupFloor === 2) floorFee += 15000;
          else if (d.pickupFloor === 3) floorFee += 25000;
          else floorFee += 40000;
        }
        if (!d.deliveryHasLift && d.deliveryFloor > 1) {
          if (d.deliveryFloor === 2) floorFee += 15000;
          else if (d.deliveryFloor === 3) floorFee += 25000;
          else floorFee += 40000;
        }

        const protectionFee = d.hasInsurance ? 10000 : 0;
        const subtotal = baseVehiclePrice + distanceFee + helperFee + floorFee + protectionFee;
        const discountPromo = subtotal > 150000 ? -Math.min(subtotal - 150000, 25000) : 0;
        const totalAmount = Math.max(75000, subtotal + discountPromo);

        const platformShare = Math.round(totalAmount * 0.2);
        const mitraShare = totalAmount - platformShare;

        return {
          baseVehiclePrice,
          distanceKm,
          distanceFee,
          helperFee,
          floorFee,
          protectionFee,
          discountPromo,
          platformFee: 0,
          totalAmount,
          mitraShare,
          platformShare,
        };
      },

      createOrder: (paymentMethod = "parent_link") => {
        const state = get();
        const pricing = state.calculatePricing();
        const newOrderId = `PNDH-${Math.floor(10000 + Math.random() * 90000)}`;

        const newOrder: ActiveOrder = {
          id: newOrderId,
          createdAt: new Date().toISOString(),
          orderData: { ...state.draft },
          pricing,
          status: paymentMethod === "parent_link" ? "awaiting_payment" : "searching_driver",
          paymentStatus: paymentMethod === "parent_link" ? "unpaid" : "paid",
          paymentMethod,
          driverInfo: MOCK_ACTIVE_DRIVER,
        };

        set((s) => ({
          activeOrders: [newOrder, ...s.activeOrders],
        }));

        return newOrderId;
      },

      getOrderById: (id) => {
        return get().activeOrders.find((o) => o.id === id);
      },

      updatePaymentStatus: (orderId, paymentStatus) => {
        set((state) => ({
          activeOrders: state.activeOrders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  paymentStatus,
                  status: paymentStatus === "paid" && o.status === "awaiting_payment" ? "searching_driver" : o.status,
                }
              : o
          ),
        }));
      },

      advanceOrderStatus: (orderId) => {
        const order = get().activeOrders.find((o) => o.id === orderId);
        if (!order) return "completed";

        const orderSteps: OrderStatus[] = [
          "awaiting_payment",
          "searching_driver",
          "driver_assigned",
          "loading",
          "in_transit",
          "unloading",
          "completed",
        ];

        const currentIndex = orderSteps.indexOf(order.status);
        const nextIndex = Math.min(orderSteps.length - 1, currentIndex + 1);
        const nextStatus = orderSteps[nextIndex];

        set((state) => ({
          activeOrders: state.activeOrders.map((o) =>
            o.id === orderId ? { ...o, status: nextStatus, paymentStatus: "paid" } : o
          ),
        }));

        return nextStatus;
      },

      submitOrderRating: (orderId, rating, reviewComment) => {
        set((state) => ({
          activeOrders: state.activeOrders.map((o) => (o.id === orderId ? { ...o, rating, reviewComment } : o)),
        }));
      },
    }),
    {
      name: "pindahin_storage_v1",
    }
  )
);
