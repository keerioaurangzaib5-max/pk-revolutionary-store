'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import ProductGrid from '@/components/ProductGrid';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black text-white overflow-x-hidden select-none flex flex-col">
      {/* 1. STICKY TOP NAVIGATION MODULE */}
      <Navigation />

      {/* 2. HERO CATALOG SECTION */}
      <section className="w-full bg-black border-b border-zinc-900">
        <div className="w-full max-w-6xl mx-auto px-6 pt-32 pb-16 flex flex-col items-center text-center">
          {/* Subheading */}
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.25em] mb-4">
            SYSTEM NODE // DROP 001
          </p>

          {/* Heading with fixed wide tracking in its own mb-6 block */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-5xl font-bold tracking-[0.2em] text-white uppercase leading-tight">
              AETHER BLACK TECHWEAR
            </h1>
          </div>

          {/* Description Paragraph */}
          <p className="max-w-xl mx-auto text-zinc-400 text-sm mb-8 leading-relaxed font-light">
            Waterproof structured tailoring engineered for urban utility. Infused with double-dyed matte fabrics, laser-cut paneling, and technical layouts.
          </p>

          {/* Centered Spaced Action buttons */}
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => {
                const element = document.getElementById('catalog-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-white text-black text-[10px] font-mono tracking-widest uppercase px-6 py-3.5 border border-white hover:bg-black hover:text-white transition duration-300"
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
