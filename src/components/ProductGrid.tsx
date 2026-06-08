'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  tag?: string;
}

const LOOKBOOK_PRODUCTS: Product[] = [
  {
    id: 'aether-shell',
    name: 'Aether Black Techwear Shell',
    category: 'Outerwear // Drop 001',
    price: '$240.00',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=600&auto=format&fit=crop',
    tag: 'LIMITED'
  },
  {
    id: 'obsidian-cargo',
    name: 'Obsidian Modular Cargo Pants',
    category: 'Trousers // Drop 001',
    price: '$180.00',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'phantom-cap',
    name: 'Phantom Structured Cap',
    category: 'Accessories // Drop 001',
    price: '$45.00',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop',
    tag: 'RESTOCK'
  }
];

export default function ProductGrid() {
  const { addToCart } = useCart();

  return (
    <section className="bg-black text-white w-full py-12 flex justify-center border-t border-zinc-900">
      {/* Centered, desktop-constrained container */}
      <div className="max-w-6xl w-full px-4 md:px-8">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-12 border-b border-zinc-900 pb-4 text-left">
          <div>
            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-1">Curated Collection</p>
            <h2 className="text-lg font-light tracking-widest text-zinc-100 uppercase">DROP_001 // THE CATALOG</h2>
          </div>
        </div>

        {/* 3-Column Spaced Desktop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LOOKBOOK_PRODUCTS.map((product) => (
            <div 
              key={product.id} 
              className="flex flex-col justify-between bg-zinc-950/40 border border-zinc-900 p-5 hover:border-zinc-800 transition duration-300"
            >
              
              {/* Product Image Wrapper - constrained aspect ratio */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900 mb-4 border border-zinc-900">
                {product.tag && (
                  <span className="absolute top-3 left-3 z-10 bg-white text-black text-[9px] font-bold tracking-widest uppercase px-2 py-0.5">
                    {product.tag}
                  </span>
                )}
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition duration-500"
                />
              </div>

              {/* Product Metadata */}
              <div className="mb-4 text-left space-y-1">
                <p className="text-[10px] text-zinc-500 font-mono tracking-wider">{product.category}</p>
                <h3 className="text-sm font-normal tracking-wide text-zinc-200">
                  {product.name}
                </h3>
                <p className="text-xs font-mono text-zinc-400 font-bold">{product.price}</p>
              </div>

              {/* CTA Button linked directly to Cart State */}
              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-zinc-900 hover:bg-white text-zinc-300 hover:text-black border border-zinc-800 hover:border-white font-mono text-[10px] uppercase tracking-widest py-3 transition-all duration-300"
              >
                Acquire Asset
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
