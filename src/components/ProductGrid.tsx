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
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="bg-black text-white w-full min-h-screen px-0 py-0 border-t border-zinc-900 overflow-hidden">
      {/* Forced 3-Column Zero-Gap Grid displaying solid imagery wall */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 w-full min-h-screen">
        {LOOKBOOK_PRODUCTS.map((product, index) => (
          <div 
            key={product.id} 
            className={`group relative flex flex-col justify-end w-full h-[85vh] md:h-screen overflow-hidden border-b md:border-b-0 md:border-r border-zinc-900 last:border-0 transition-all duration-1000 ease-out ${
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } ${
              index === 1 ? 'delay-150' : index === 2 ? 'delay-300' : ''
            }`}
          >
            {/* Absolute Full Height/Width Image */}
            <div className="absolute inset-0 w-full h-full bg-zinc-950 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover object-center grayscale contrast-115 transition-transform duration-1000 group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>

            {/* Subtle overlay mimicking a film grain/vignette shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 z-10 transition-opacity duration-500 group-hover:opacity-60"></div>

            {/* Tag Badge */}
            {product.tag && (
              <span className="absolute top-28 left-6 z-20 bg-white text-black text-[9px] font-black tracking-widest uppercase px-2 py-0.5">
                {product.tag}
              </span>
            )}

            {/* Overlay Metadata Shield */}
            <div className="relative z-20 p-8 md:p-12 space-y-4 text-left flex flex-col justify-end h-1/2">
              <div>
                <p className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase mb-1">{product.category}</p>
                <h3 className="text-xl md:text-2xl font-light tracking-widest text-white uppercase mb-1.5 leading-tight">
                  {product.name}
                </h3>
                <p className="text-sm font-mono text-zinc-300 font-bold">{product.price}</p>
              </div>

              {/* Action Button: slide up on hover */}
              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-white text-black border border-white hover:bg-black hover:text-white font-mono text-[10px] uppercase tracking-widest py-3.5 transition-all duration-300 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
              >
                Acquire Asset
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
