import { z } from 'zod';

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

// Zod validation schema for secure order checkout requests
export const OrderInputSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().regex(/^((\+92)|(0092)|(0))?3\d{9}$/, "Kindly provide a valid Pakistani mobile number (e.g., 03001234567) so our delivery rider can reach you."),
  address: z.string().min(15, "The address is too short. Please provide a detailed address (minimum 15 characters)."),
  voiceTranscript: z.string().optional(),
  cartItems: z.array(z.object({
    id: z.string(),
    name: z.string(),
    quantity: z.number().int().positive(),
    price: z.number().positive(),
    priceString: z.string()
  })).min(1, "Your shopping bag is empty.")
});

