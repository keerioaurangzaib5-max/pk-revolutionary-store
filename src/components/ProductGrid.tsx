'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { LOOKBOOK_PRODUCTS } from '@/services/products';

export default function ProductGrid() {
  const { addToCart } = useCart();

  return (
    <section className="bg-black text-white w-full py-16 flex justify-center border-t border-zinc-900">
      {/* Centered, desktop-constrained container */}
      <div className="max-w-6xl w-full px-4 md:px-8">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-12 border-b border-zinc-900 pb-4 text-left">
          <div>
            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-1">Curated Catalog</p>
            <h2 className="text-lg font-light tracking-widest text-zinc-100 uppercase">DROP_001 // SYSTEM GEAR</h2>
          </div>
        </div>

        {/* 3-Column Spaced Desktop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LOOKBOOK_PRODUCTS.map((product) => (
            <div 
              key={product.id} 
              className="flex flex-col justify-between bg-zinc-950/30 border border-zinc-900 hover:border-zinc-800 p-5 transition-all duration-300 relative group"
            >
              
              {/* Product Image Wrapper - constrained aspect ratio with luxury hover scales */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900 mb-4 border border-zinc-900">
                {product.tag && (
                  <span className={`absolute top-3 left-3 z-10 text-white text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-sm ${
                    product.tag === 'LIMITED' 
                      ? 'bg-purple-600/90 border border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.3)]' 
                      : 'bg-cyan-600/90 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                  }`}>
                    {product.tag}
                  </span>
                )}
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center grayscale hover:grayscale-0 group-hover:scale-102 transition duration-700"
                />
              </div>

              {/* Product Metadata */}
              <div className="mb-4 text-left space-y-1">
                <p className="text-[10px] text-zinc-500 font-mono tracking-wider">{product.category}</p>
                <h3 className="text-sm font-normal tracking-wide text-zinc-200 group-hover:text-purple-300 transition duration-300">
                  {product.name}
                </h3>
                {/* Unified Price Output */}
                <div className="flex gap-2 items-center pt-0.5">
                  <span className="text-xs font-mono text-zinc-300 font-bold">${product.priceUSD.toFixed(2)}</span>
                  <span className="text-[10px] font-mono text-zinc-500">/ Rs. {product.pricePKR.toLocaleString()}</span>
                </div>
              </div>

              {/* CTA Button linked directly to Cart Context */}
              <button 
                onClick={() => addToCart({
                  id: product.id,
                  name: product.name,
                  price: `$${product.priceUSD.toFixed(2)}`,
                  image: product.image
                })}
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
