'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import ProductGrid from '@/components/ProductGrid';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#050506] text-white overflow-x-hidden select-none flex flex-col pt-16 relative">
      
      {/* Ambient glowing background mesh */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#ff5500]/5 via-transparent to-transparent blur-3xl -z-10 pointer-events-none"></div>

      {/* Grid overlay for tactical design texture */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(rgba(255,85,0,0.04)_1px,transparent_1px)] [background-size:24px_24px] -z-10 pointer-events-none"></div>

      {/* 1. STICKY TOP NAVIGATION MODULE */}
      <Navigation />

      {/* 2. HERO CATALOG SECTION */}
      <section className="w-full border-b border-zinc-900/80 relative overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-6 pt-32 pb-24 flex flex-col items-center text-center relative z-10">
          
          {/* Subheading HUD Tag */}
          <div className="flex items-center gap-2 mb-6 bg-zinc-900/50 border border-zinc-800/80 px-3.5 py-1.5 rounded-full animate-fade-in-up">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5500] animate-pulse shadow-[0_0_8px_#ff5500]"></span>
            <p className="text-zinc-400 font-mono text-[9px] uppercase tracking-[0.3em]">
              SYSTEM NODE // DROP 001 // SECURE LAYER
            </p>
          </div>

          {/* Title with wide tracking and gradient */}
          <div className="mb-6 animate-fade-in-up animation-delay-100">
            <h1 className="text-4xl md:text-6xl font-light tracking-[0.25em] uppercase leading-tight bg-gradient-to-b from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
              AETHER BLACK TECHWEAR
            </h1>
          </div>

          {/* Description Paragraph with deliberate luxury top/bottom borders */}
          <div className="max-w-xl mx-auto border-y border-zinc-900/60 py-5 mb-10 animate-fade-in-up animation-delay-200">
            <p className="text-zinc-400 font-light text-xs md:text-sm tracking-wide leading-relaxed">
              Waterproof structured tailoring engineered for urban utility. Infused with double-dyed matte fabrics, laser-cut paneling, and technical layout maps.
            </p>
          </div>

          {/* Centered Spaced Action buttons */}
          <div className="flex gap-4 justify-center animate-fade-in-up animation-delay-300">
            <button 
              onClick={() => {
                const element = document.getElementById('catalog-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-[#ff5500] hover:bg-transparent text-black hover:text-[#ff5500] text-[10px] font-mono tracking-widest uppercase px-8 py-4 border border-[#ff5500] transition duration-300 kinetic-hover-btn"
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
              className="bg-transparent text-zinc-400 hover:text-white text-[10px] font-mono tracking-widest uppercase px-8 py-4 border border-zinc-800 hover:border-zinc-500 transition duration-300"
            >
              View Details
            </button>
          </div>
        </div>

        {/* Diagonal Technical HUD Strip at bottom of Hero */}
        <div className="w-full bg-[#0d0e11] border-t border-zinc-900 py-3.5 px-6 overflow-hidden">
          <div className="max-w-6xl mx-auto flex justify-between items-center text-[8px] font-mono uppercase tracking-[0.35em] text-zinc-500">
            <span>[ SYSTEM LOADED ]</span>
            <span>SHIPPING GLOBAL // COD PACKAGED</span>
            <span>MEMBRANE: 3-LAYER TPU</span>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATALOG GRID */}
      <div id="catalog-section" className="w-full max-w-6xl mx-auto px-6 py-8">
        <ProductGrid />
      </div>

      {/* 4. TECHNICAL SPECIFICATIONS SECTION */}
      <section className="w-full bg-[#07080a] border-t border-zinc-900/80 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="border-l-2 border-[#ff5500] pl-4 mb-12 text-left">
            <p className="text-[#ff5500] font-mono text-[9px] uppercase tracking-widest">Engineering Report</p>
            <h2 className="text-lg font-light uppercase tracking-widest text-white mt-1">Material Integrity & Construction</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
            <div className="bg-[#0c0d0f]/50 border border-zinc-900 p-6 rounded-sm">
              <span className="text-zinc-600 font-mono text-[9px] block mb-2">01 // SHELL PROTECTION</span>
              <h3 className="text-xs uppercase font-bold text-zinc-300 tracking-wider mb-2">3L TPU Membrane</h3>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-light">Complete windproof shielding with 20,000mm hydrostatic water barrier ratings for severe weather defense.</p>
            </div>
            <div className="bg-[#0c0d0f]/50 border border-zinc-900 p-6 rounded-sm">
              <span className="text-zinc-600 font-mono text-[9px] block mb-2">02 // FASTENERS</span>
              <h3 className="text-xs uppercase font-bold text-zinc-300 tracking-wider mb-2">YKK Aquaguard Zips</h3>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-light">Matte urethane coated zippers provide seamless moisture seals across all geometric storage compartments.</p>
            </div>
            <div className="bg-[#0c0d0f]/50 border border-zinc-900 p-6 rounded-sm">
              <span className="text-zinc-600 font-mono text-[9px] block mb-2">03 // UTILITY MODULES</span>
              <h3 className="text-xs uppercase font-bold text-zinc-300 tracking-wider mb-2">Multi-Pocket Grid</h3>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-light">Equipped with 6 tactical cargo chambers positioned ergonomically for quick access without bulk expansion.</p>
            </div>
            <div className="bg-[#0c0d0f]/50 border border-zinc-900 p-6 rounded-sm">
              <span className="text-zinc-600 font-mono text-[9px] block mb-2">04 // FIT MECHANICS</span>
              <h3 className="text-xs uppercase font-bold text-zinc-300 tracking-wider mb-2">Articulated Form</h3>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-light">Sleeves and panels designed anatomically to follow the natural contours of movement without binding.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-8 text-center border-t border-zinc-900 bg-black text-[9px] uppercase tracking-[0.2em] text-zinc-600 mt-auto">
        © 2026 PrepGenius Studios // Classic E-Commerce System // Node 01
      </footer>
    </main>
  );
}
