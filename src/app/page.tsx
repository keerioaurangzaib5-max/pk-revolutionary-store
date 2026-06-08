'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import ProductGrid from '@/components/ProductGrid';

export default function CinematicStorefront() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-neutral-100 font-sans antialiased selection:bg-neutral-800 flex flex-col overflow-x-hidden pt-28">
      
      {/* Premium Glassmorphic Header Navigation */}
      <Navigation />

      {/* Hero Showcase Section (Edge-to-Edge Cinematic Showcase) */}
      <div className="w-full h-[85vh] md:h-screen relative flex items-center justify-center overflow-hidden">
        {/* Full-width low-light background imagery simulation */}
        <div className="absolute inset-0 bg-neutral-950">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-10"></div>
          {/* Decorative cinematic scan placeholder */}
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30">
            <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-mono mb-2">// WIDE SCREEN ASSET MATRIX //</span>
            <span className="text-xs text-neutral-600 font-serif italic">"90s Cinema Aesthetic // Low Light Node 001"</span>
          </div>
        </div>

        {/* Floating Centered Hero Metadata */}
        <div className={`relative z-20 max-w-4xl px-6 text-center space-y-6 transition-all duration-1000 ease-out transform ${
          isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] bg-white text-black px-3 py-1 font-extrabold rounded-sm inline-block">
              Drop 001 // Core Architecture
            </span>
            <h1 className="text-4xl md:text-7xl font-light tracking-[0.15em] text-white uppercase leading-none pt-2">
              Aether Black Techwear
            </h1>
            <p className="text-xs md:text-sm text-neutral-400 font-mono tracking-widest max-w-xl mx-auto pt-2 leading-relaxed">
              Waterproof structured tailoring engineered for urban utility. Infused with double-dyed matte fabrics.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link href="/checkout" className="w-full sm:w-auto">
              <button className="w-full sm:px-8 bg-white text-black font-mono tracking-widest text-[11px] uppercase py-4 rounded-sm shadow-xl hover:bg-neutral-200 transition transform active:scale-[0.99]">
                Acquire Asset // Go to Checkout
              </button>
            </Link>
            <button 
              onClick={() => {
                const element = document.getElementById('grid-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full sm:w-auto sm:px-8 bg-transparent hover:bg-white/5 text-white border border-neutral-800 hover:border-white font-mono tracking-widest text-[11px] uppercase py-4 rounded-sm transition"
            >
              Explore Collection
            </button>
          </div>

          <div className="text-[10px] text-neutral-600 uppercase tracking-[0.2em] pt-6 flex justify-center items-center gap-2">
            <span className="h-1 w-1 bg-neutral-700 rounded-full"></span>
            Secured via Vercel Edge Protection Node
            <span className="h-1 w-1 bg-neutral-700 rounded-full"></span>
          </div>
        </div>
      </div>

      {/* Massive Product Grid Section */}
      <div id="grid-section" className="w-full">
        <ProductGrid />
      </div>

      {/* Studio Minimalist Footer */}
      <footer className="p-8 text-center border-t border-neutral-900 bg-neutral-950 text-[9px] uppercase tracking-[0.2em] text-neutral-600">
        © 2026 PrepGenius Studios // Architectural Layout Node Alpha
      </footer>

    </div>
  );
}
