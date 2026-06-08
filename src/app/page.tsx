'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import ProductGrid from '@/components/ProductGrid';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#030303] text-white overflow-x-hidden select-none flex flex-col pt-16 relative">
      
      {/* Ambient glowing background mesh to create depth (removes flat look) */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/10 via-cyan-900/5 to-transparent blur-3xl -z-10 pointer-events-none"></div>

      {/* 1. STICKY TOP NAVIGATION MODULE */}
      <Navigation />

      {/* 2. HERO CATALOG SECTION */}
      <section className="w-full border-b border-zinc-900">
        <div className="w-full max-w-6xl mx-auto px-6 pt-32 pb-16 flex flex-col items-center text-center">
          
          {/* Subheading */}
          <div className="flex items-center gap-2 mb-4">
            <span className="h-1 w-1 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_#a855f7]"></span>
            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.25em]">
              SYSTEM NODE // DROP 001
            </p>
          </div>

          {/* Heading with fixed wide tracking in its own mb-6 block and text gradient */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-5xl font-black tracking-[0.2em] uppercase leading-tight bg-gradient-to-r from-white via-zinc-200 to-purple-400 bg-clip-text text-transparent">
              AETHER BLACK TECHWEAR
            </h1>
          </div>

          {/* Description Paragraph with deliberate luxury top/bottom borders */}
          <div className="max-w-xl mx-auto border-y border-zinc-900/60 py-4 mb-8">
            <p className="text-zinc-400 font-light text-xs md:text-sm tracking-wide leading-relaxed">
              Waterproof structured tailoring engineered for urban utility. Infused with double-dyed matte fabrics, laser-cut paneling, and technical layout maps.
            </p>
          </div>

          {/* Centered Spaced Action buttons */}
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => {
                const element = document.getElementById('catalog-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-white hover:bg-zinc-200 text-black text-[10px] font-mono tracking-widest uppercase px-6 py-3.5 border border-white transition duration-300"
            >
              Acquire Asset
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('catalog-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-transparent text-zinc-400 hover:text-white text-[10px] font-mono tracking-widest uppercase px-6 py-3.5 border border-zinc-800 hover:border-zinc-500 transition duration-300"
            >
              View Details
            </button>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATALOG GRID */}
      <div id="catalog-section" className="w-full max-w-6xl mx-auto px-6 py-16">
        <ProductGrid />
      </div>

      {/* Footer */}
      <footer className="p-8 text-center border-t border-zinc-900 bg-zinc-950 text-[9px] uppercase tracking-[0.2em] text-zinc-600 mt-auto">
        © 2026 PrepGenius Studios // Classic E-Commerce System
      </footer>
    </main>
  );
}
