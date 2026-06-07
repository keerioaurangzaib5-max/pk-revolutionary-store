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
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=600&auto=format&fit=crop', // Cinematic studio placeholder
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
    <section className="bg-black text-white py-16 px-6 md:px-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-12 border-b border-zinc-900 pb-6">
          <div>
            <p className="text-zinc-500 uppercase tracking-widest text-xs mb-2">Curated Collection</p>
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-zinc-100">DROP_001 // THE CORE ARCHITECTURE</h2>
          </div>
          <div className="text-right">
            <span className="text-xs tracking-widest uppercase border border-zinc-700 px-3 py-1 bg-zinc-950 rounded-full">
              Bag ({cartCount})
            </span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LOOKBOOK_PRODUCTS.map((product) => (
            <div key={product.id} className="group relative flex flex-col justify-between bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden p-4 space-y-4 hover:border-zinc-700 transition">
              {/* Product Image and Tag */}
              <div className="relative aspect-[4/5] w-full bg-zinc-900 rounded-xl overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition duration-500" 
                />
                {product.tag && (
                  <span className="absolute top-3 left-3 bg-white text-black text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded">
                    {product.tag}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="flex justify-between items-start pt-2">
                <div className="text-left">
                  <h3 className="text-sm font-bold text-zinc-100 group-hover:text-white transition">{product.name}</h3>
                  <p className="text-xs text-zinc-500 mt-1">{product.category}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-zinc-200">{product.price}</span>
                </div>
              </div>

              {/* Add to Bag Action Button */}
              <button 
                onClick={() => setCartCount(prev => prev + 1)}
                className="w-full bg-white text-black hover:bg-zinc-200 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition active:scale-[0.98]"
              >
                Add to Bag
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
