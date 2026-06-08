'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import ProductGrid from '@/components/ProductGrid';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="w-full min-h-screen bg-black text-white overflow-x-hidden select-none flex flex-col">
      {/* 1. STICKY TOP NAVIGATION MODULE */}
      <Navigation />

      {/* 2. ASYMMETRIC EDITORIAL GRID */}
      <div className="w-full flex-grow grid grid-cols-1 md:grid-cols-12 gap-0 border-b border-zinc-900 pt-28">
        
        {/* Left Side Panel: Editorial & Brand Specifications */}
        <section className="col-span-12 md:col-span-5 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 p-8 md:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-900 min-h-[70vh] md:min-h-[90vh]">
          
          {/* Top Brand Specs */}
          <div className="space-y-8 text-left">
            <div className="space-y-2">
              <span className="text-[9px] font-mono tracking-[0.25em] text-zinc-500 uppercase block">
                SYSTEM SPECIFICATIONS // DROP 001
              </span>
              <h1 className={`text-4xl md:text-5xl font-light tracking-[0.3em] md:tracking-[0.45em] text-white uppercase leading-none transition-all duration-1000 ease-out transform ${
                isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}>
                AETHER
              </h1>
              <h2 className={`text-3xl md:text-4xl font-light tracking-[0.25em] md:tracking-[0.35em] text-zinc-400 uppercase leading-none transition-all duration-1000 ease-out delay-150 transform ${
                isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}>
                BLACK
              </h2>
            </div>

            {/* Description Paragraph */}
            <p className="text-zinc-400 font-light text-xs md:text-sm tracking-wide leading-relaxed max-w-sm pt-2">
              Waterproof structured tailoring engineered for urban utility. Infused with double-dyed matte fabrics and raw technical finishes.
            </p>

            {/* Technical Parameter Grid */}
            <div className="border-t border-zinc-900 pt-6 space-y-3 font-mono text-[9px] tracking-widest text-zinc-500 uppercase">
              <div className="flex justify-between items-center">
                <span>Model Code</span>
                <span className="text-zinc-300">SH-001 // ALPHA</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Material Spec</span>
                <span className="text-zinc-300">Bonded Technical Nylon</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Region Node</span>
                <span className="text-zinc-300">PK // Karachi Hub</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Encryption</span>
                <span className="text-zinc-300">Vercel Shield Secured</span>
              </div>
            </div>
          </div>

          {/* Bottom Call To Action Block */}
          <div className="pt-12 md:pt-0 space-y-6 text-left">
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  const element = document.getElementById('grid-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full text-center bg-white text-black text-[10px] font-mono tracking-widest uppercase py-4 border border-white hover:bg-black hover:text-white transition duration-300"
              >
                Acquire Asset
              </button>
              <Link 
                href="/checkout" 
                className="w-full text-center bg-zinc-950 text-zinc-400 hover:text-white text-[10px] font-mono tracking-widest uppercase py-4 border border-zinc-900 hover:border-zinc-700 transition duration-300"
              >
                Direct Checkout
              </Link>
            </div>

            {/* Micro-brand footnote */}
            <div className="pt-4 border-t border-zinc-900/50 flex justify-between items-center text-[8px] font-mono tracking-widest text-zinc-600">
              <span>PREPGENIUS HQ // ©2026</span>
              <span>DROP_01_REVISION_V4</span>
            </div>
          </div>

        </section>

        {/* Right Side Panel: Immersive Wall Imagery (Col-span 7) */}
        <div id="grid-section" className="col-span-12 md:col-span-7 w-full">
          <ProductGrid />
        </div>

      </div>
    </main>
  );
}
