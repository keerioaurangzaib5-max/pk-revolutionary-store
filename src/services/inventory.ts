import { z } from 'zod';
import { ProductVariant, InventorySyncResponse } from '../types/shop';
import { calculatePakistaniRetailPrice } from './orderProcessor';

const SUPPLIER_API_URL = process.env.SUPPLIER_API_ENDPOINT;
const SUPPLIER_AUTH_TOKEN = process.env.SUPPLIER_ACCESS_TOKEN;

// Zod schema to defensively validate and sanitize raw supplier product items
const RawProductSchema = z.object({
  sku: z.string().optional().default('UNKNOWN-SKU'),
  name: z.string().optional().default('Unnamed Product'),
  images: z.array(z.string()).optional().default([]),
  cost: z.union([z.number(), z.string()]).optional().default(0),
  quantity: z.union([z.number(), z.string()]).optional().default(0),
});

/**
 * Defensively fetches active inventory updates from the dropshipping supplier.
 * Intercepts missing configurations safely to prevent front-end checkout failures.
 */
export async function syncSupplierInventory(): Promise<InventorySyncResponse> {
  // Defensive Check: Ensure keys aren't missing in production
  if (!SUPPLIER_API_URL || !SUPPLIER_AUTH_TOKEN) {
    return {
      products: [],
      lastSynced: new Date().toISOString(),
      error: "System Configuration Error: Supplier access credentials are unconfigured."
    };
  }

  try {
    const response = await fetch(`${SUPPLIER_API_URL}/v1/products?status=active`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SUPPLIER_AUTH_TOKEN}`,
        'Accept': 'application/json',
      },
      // Cache data for 1 hour (3600 seconds) to heavily respect supplier rate-limits
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`Supplier API error. Status: ${response.status}`);
    }

    const rawData = await response.json();
    
    // Safely check if rawData is an array, or has a products array, or fallback to empty array
    const rawProductsArray = Array.isArray(rawData) 
      ? rawData 
      : (rawData && typeof rawData === 'object' && 'products' in rawData && Array.isArray(rawData.products) 
        ? rawData.products 
        : []);

    // Map external supplier data carefully into our strict app contract with Zod validation
    const validatedProducts: ProductVariant[] = rawProductsArray.map((item: any) => {
      const parsed = RawProductSchema.safeParse(item);
      const data = parsed.success ? parsed.data : {
        sku: 'UNKNOWN-SKU',
        name: 'Unnamed Product',
        images: [],
        cost: 0,
        quantity: 0
      };
      
      const costNum = typeof data.cost === 'string' ? parseFloat(data.cost) || 0 : data.cost;
      const quantityNum = typeof data.quantity === 'string' ? parseInt(data.quantity, 10) || 0 : data.quantity;

      return {
        sku: data.sku,
        title: data.name,
        imageUrl: data.images[0] || '/placeholder-product.jpg',
        supplierPriceUSD: costNum,
        // Dynamic markup: Price retail using custom Pakistani pricing formula (incl. customs/shipping buffers)
        retailPricePKR: calculatePakistaniRetailPrice(costNum),
        stockAvailable: quantityNum > 0 ? quantityNum : 0,
      };
    });

    return {
      products: validatedProducts,
      lastSynced: new Date().toISOString(),
      error: null
    };

  } catch (error) {
    // Gracefully fallback to an empty product list instead of throwing a fatal 500 server crash
    return {
      products: [],
      lastSynced: new Date().toISOString(),
      error: error instanceof Error ? error.message : "An unexpected network disruption occurred during sync."
    };
  }
}
