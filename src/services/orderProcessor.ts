import { CustomerOrder } from '../types/shop';

// Dynamic Exchange Rate (Defensive default, can be hooked to an exchange API later)
const USD_TO_PKR_RATE = 278; 

/**
 * Calculates local retail pricing with customs, shipping safety buffers, and profit margin.
 */
export function calculatePakistaniRetailPrice(supplierPriceUSD: number): number {
  const baseCostPKR = supplierPriceUSD * USD_TO_PKR_RATE;
  // Add 15% for estimated local import/customs friction and 35% profit margin
  const secureMarkup = 1.50; 
  
  return Math.ceil((baseCostPKR * secureMarkup) / 10) * 10; // Rounds up to the nearest 10 PKR
}

/**
 * Validates Pakistani phone numbers and structural city inputs defensively
 * to reduce delivery failure rates before sending to Vercel production.
 */
export function validateLocalOrder(order: Omit<CustomerOrder, 'orderId' | 'totalAmountPKR' | 'isVerifiedCOD'>) {
  // Defensive Check: Pakistani phone formats (03xxxxxxxx or +923xxxxxxxxx)
  const phoneRegex = /^((\+92)|(0092)|(0))?3\d{9}$/;
  
  if (!phoneRegex.test(order.phone)) {
    return { isValid: false, error: "Kindly provide a valid Pakistani mobile number (e.g., 03001234567) so our delivery rider can reach you." };
  }

  if (order.shippingAddress.length < 15) {
    return { isValid: false, error: "The address looks too short. Please provide a detailed street address to ensure safe delivery." };
  }

  return { isValid: true, error: null };
}
