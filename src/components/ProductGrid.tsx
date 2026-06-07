'use client';

import React, { useState } from 'react';

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
  const [cartCount, setCartCount] = useState(0);

  return (
    <section className="bg-black text-white py-20 px-6 md:px-16 border-t border-zinc-900 w-full">
      {/* 🎯 THIS CONTAINER SECTIONS WRAPS EVERYTHING TO CENTER IT */}
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-16 border-b border-zinc-900 pb-6">
          <div>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-2">Curated Collection</p>
            <h2 className="text-xl md:text-2xl font-light tracking-widest text-zinc-100">DROP_001 // THE CORE ARCHITECTURE</h2>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono tracking-widest uppercase border border-zinc-800 px-4 py-1.5 bg-zinc-950 text-zinc-400">
              Bag ({cartCount})
            </span>
          </div>
        </div>

        {/* 🎯 FORCED 3-COLUMN GRID DISPLAY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {LOOKBOOK_PRODUCTS.map((product) => (
            <div key={product.id} className="group relative flex flex-col justify-between bg-zinc-950 border border-zinc-900 p-4 transition-all duration-300 hover:border-zinc-800">
              
              {/* Product Image Wrapper - Sized to a clean aspect ratio */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900 mb-4">
                {product.tag && (
                  <span className="absolute top-3 left-3 z-10 bg-white text-black text-[9px] font-bold tracking-widest uppercase px-2 py-0.5">
                    {product.tag}
                  </span>
                )}
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center grayscale contrast-115 transition-transform duration-700 group-hover:scale-102 group-hover:grayscale-0"
                />
              </div>

              {/* Product Metadata */}
              <div className="mb-4">
                <p className="text-[11px] text-zinc-500 font-mono tracking-wider mb-1">{product.category}</p>
                <h3 className="text-sm font-normal tracking-wide text-zinc-200 mb-1">
                  {product.name}
                </h3>
                <p className="text-xs font-mono text-zinc-400">{product.price}</p>
              </div>

              {/* CTA Button */}
              <button 
                onClick={() => setCartCount(prev => prev + 1)}
                className="w-full bg-zinc-900 hover:bg-white text-zinc-300 hover:text-black border border-zinc-800 hover:border-white font-mono text-[11px] uppercase tracking-widest py-3 transition-all duration-300"
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
