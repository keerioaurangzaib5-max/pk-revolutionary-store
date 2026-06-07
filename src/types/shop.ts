// Strict data contract for dropshipped items to guarantee stability on Vercel
export interface ProductVariant {
  sku: string;
  title: string;
  imageUrl: string;
  supplierPriceUSD: number; // Suppliers usually charge in USD/CNY
  retailPricePKR: number;   // Automatically calculated in Rupees
  stockAvailable: number;
}

export interface InventorySyncResponse {
  products: ProductVariant[];
  lastSynced: string;
  error: string | null;
}

export type PaymentMethod = 'COD' | 'CARD' | 'EASYPAISA_JAZZCASH';

export interface CustomerOrder {
  orderId: string;
  customerName: string;
  phone: string;       // Crucial for Pakistani delivery riders
  city: string;        // Must match standardized courier city lists
  shippingAddress: string;
  paymentMethod: PaymentMethod;
  totalAmountPKR: number;
  isVerifiedCOD: boolean; // Tracking fake vs real orders
}
