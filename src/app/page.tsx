'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import ProductGrid from '@/components/ProductGrid';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black text-white overflow-x-hidden select-none">
      {/* 1. STICKY TOP NAVIGATION MODULE */}
      <Navigation />

      {/* 2. HERO CAMPAIGN BANNER (MASSIVE BUT SPACED) */}
      <section className="w-full min-h-[85vh] flex flex-col items-center justify-center text-center px-4 md:px-8 pt-36 pb-12 border-b border-zinc-900 relative">
        
        {/* Release Subheading */}
        <p className="text-zinc-500 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mb-4 animate-pulse">
          DROP 001 // CORE ARCHITECTURE
        </p>

        {/* Core Title */}
        <h1 className="text-3xl md:text-6xl font-light tracking-[0.2em] text-white uppercase mb-6 max-w-4xl leading-tight">
          AETHER BLACK TECHWEAR
        </h1>

        {/* Description Copy */}
        <p className="text-zinc-400 font-light text-xs md:text-sm tracking-wide max-w-xl mx-auto mb-10 leading-relaxed">
          Waterproof structured tailoring engineered for urban utility. 
          Infused with double-dyed matte fabrics.
        </p>

        {/* 🎯 SEPARATED & CLEAN ACTION BUTTON GROUP */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mb-12 z-10">
          <button 
            onClick={() => {
              const element = document.getElementById('grid-section');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-full sm:w-auto bg-white text-black text-xs font-mono tracking-widest uppercase px-8 py-4 border border-white hover:bg-black hover:text-white transition-all duration-300"
          >
            ACQUIRE ASSET
          </button>
          <a 
            href="/checkout" 
            className="w-full sm:w-auto text-center bg-zinc-950 text-zinc-400 hover:text-white text-xs font-mono tracking-widest uppercase px-8 py-4 border border-zinc-800 hover:border-zinc-500 transition-all duration-300"
          >
            GO TO CHECKOUT
          </a>
        </div>

        {/* Tactical Footer Elements */}
        <div className="mt-auto pt-6 border-t border-zinc-900/50 w-full max-w-lg">
          <p className="text-[10px] font-mono tracking-[0.15em] text-zinc-600 uppercase mb-2">
            SECURED VIA VERCEL EDGE PROTECTION NODE
          </p>
          <p className="text-[11px] font-serif italic tracking-widest text-zinc-500">
            "90s Cinema Aesthetic // Low Light Node 001"
          </p>
        </div>

      </section>

      {/* 3. FULL-WIDTH EDGE-TO-EDGE LOOKBOOK GRID */}
      <div id="grid-section" className="w-full">
        <ProductGrid />
      </div>
    </main>
  );
}
