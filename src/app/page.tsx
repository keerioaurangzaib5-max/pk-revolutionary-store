'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import ProductGrid from '@/components/ProductGrid';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black text-white overflow-x-hidden select-none flex flex-col pt-16">
      {/* 1. STICKY TOP NAVIGATION MODULE */}
      <Navigation />

      {/* 2. HERO CATALOG SECTION */}
      <section className="w-full bg-black border-b border-zinc-900">
        <div className="max-w-4xl mx-auto text-center py-24 px-4 space-y-6">
          {/* Subheading */}
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.25em]">
            SYSTEM NODE // DROP 001
          </p>

          {/* Heading */}
          <h1 className="text-3xl md:text-5xl font-bold tracking-[0.15em] text-white uppercase leading-tight">
            AETHER BLACK TECHWEAR
          </h1>

          {/* Description Paragraph */}
          <p className="text-zinc-400 font-light text-xs md:text-sm tracking-wide max-w-xl mx-auto leading-relaxed">
            Waterproof structured tailoring engineered for urban utility. Infused with double-dyed matte fabrics, laser-cut paneling, and technical layouts.
          </p>

          {/* Centered Spaced CTAs */}
          <div className="flex flex-row gap-4 justify-center items-center pt-6">
            <button 
              onClick={() => {
                const element = document.getElementById('grid-section');
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
                const element = document.getElementById('grid-section');
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
      <div id="grid-section" className="w-full">
        <ProductGrid />
      </div>

      {/* Footer */}
      <footer className="p-8 text-center border-t border-zinc-900 bg-zinc-950 text-[9px] uppercase tracking-[0.2em] text-zinc-600">
        © 2026 PrepGenius Studios // Classic E-Commerce System
      </footer>
    </main>
  );
}
