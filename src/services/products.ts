import { calculatePakistaniRetailPrice } from './orderProcessor';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  priceUSD: number;
  pricePKR: number;
  image: string;
  tag?: string;
  stockAvailable: number;
}

export const LOOKBOOK_PRODUCTS: Product[] = [
  {
    id: 'aether-shell',
    sku: 'PREM-JKT-001',
    name: 'Aether Black Techwear Shell',
    category: 'Outerwear // Drop 001',
    priceUSD: 240.00,
    pricePKR: calculatePakistaniRetailPrice(240.00), // ~100,080 PKR based on markup
    image: '/images/jacket.png',
    tag: 'LIMITED',
    stockAvailable: 14
  },
  {
    id: 'obsidian-cargo',
    sku: 'PREM-PNT-002',
    name: 'Obsidian Modular Cargo Pants',
    category: 'Trousers // Drop 001',
    priceUSD: 180.00,
    pricePKR: calculatePakistaniRetailPrice(180.00),
    image: '/images/pants.png',
    stockAvailable: 8
  },
  {
    id: 'phantom-cap',
    sku: 'PREM-ACC-003',
    name: 'Phantom Structured Cap',
    category: 'Accessories // Drop 001',
    priceUSD: 45.00,
    pricePKR: calculatePakistaniRetailPrice(45.00),
    image: '/images/cap.png',
    tag: 'RESTOCK',
    stockAvailable: 42
  }
];
