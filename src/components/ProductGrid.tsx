'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { LOOKBOOK_PRODUCTS } from '@/services/products';

type CategoryType = 'ALL' | 'OUTERWEAR' | 'TROUSERS' | 'ACCESSORIES';

export default function ProductGrid() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('ALL');

  // Filter products based on selected tab category
  const filteredProducts = LOOKBOOK_PRODUCTS.filter(product => {
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'OUTERWEAR') return product.category.toLowerCase().includes('outerwear');
    if (selectedCategory === 'TROUSERS') return product.category.toLowerCase().includes('trousers');
    if (selectedCategory === 'ACCESSORIES') return product.category.toLowerCase().includes('accessories');
    return true;
  });

  return (
    <section className="bg-[#050506] text-white w-full py-16 flex justify-center border-t border-zinc-900/60">
      {/* Centered, desktop-constrained container */}
      <div className="max-w-6xl w-full px-4 md:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 border-b border-zinc-900/60 pb-5 text-left gap-4">
          <div>
            <p className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.2em] mb-1.5">[ Curated Catalog ]</p>
            <h2 className="text-xl font-light tracking-[0.15em] text-white uppercase font-sans">DROP_001 // SYSTEM GEAR</h2>
          </div>
          
          {/* Category Filter Capsules */}
          <div className="flex flex-wrap gap-2.5">
            {(['ALL', 'OUTERWEAR', 'TROUSERS', 'ACCESSORIES'] as CategoryType[]).map((cat) => {
              const label = cat === 'ALL' ? 'All Gear' : cat === 'OUTERWEAR' ? 'Shell Jackets' : cat === 'TROUSERS' ? 'Modular Trousers' : 'Accessories';
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`filter-capsule ${selectedCategory === cat ? 'active' : 'text-zinc-400 hover:text-white bg-[#0c0d0f]/60 hover:bg-[#0c0d0f]'}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Spaced Desktop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id} 
              style={{ animationDelay: `${index * 120}ms` }}
              className="flex flex-col justify-between bg-[#0c0d0f]/50 border border-zinc-900/80 p-5 rounded-2xl relative group border-glow-card animate-fade-in-up opacity-0"
            >
              
              {/* Product Image Wrapper - constrained aspect ratio with luxury hover scales */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black mb-5 border border-zinc-900/40 rounded-xl">
                {product.tag && (
                  <span className={`absolute top-3 left-3 z-10 text-black text-[9px] font-mono font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-sm shadow-lg ${
                    product.tag === 'LIMITED' 
                      ? 'bg-[#ff5500] border border-[#ff5500]/40 shadow-[0_0_12px_rgba(255,85,0,0.35)]' 
                      : 'bg-[#00ffd5] border border-[#00ffd5]/40 shadow-[0_0_12px_rgba(0,255,213,0.35)]'
                  }`}>
                    {product.tag}
                  </span>
                )}
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                />
              </div>

              {/* Product Metadata */}
              <div className="mb-6 text-left space-y-1.5 px-1">
                <p className="text-[9px] text-[#ff5500] font-mono tracking-widest uppercase">{product.category}</p>
                <h3 className="text-sm font-semibold tracking-wide text-zinc-100 group-hover:text-[#ff5500] transition-colors duration-300 font-sans">
                  {product.name}
                </h3>
                {/* Unified Price Output */}
                <div className="flex gap-2.5 items-center pt-1">
                  <span className="text-xs font-mono text-white font-bold">${product.priceUSD.toFixed(2)}</span>
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
                className="w-full bg-[#050506] hover:bg-[#ff5500] text-zinc-400 hover:text-black border border-zinc-900 hover:border-[#ff5500] font-sans font-bold text-[10px] uppercase tracking-widest py-4 rounded-full transition-all duration-300 kinetic-hover-btn"
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
