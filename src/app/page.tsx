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
    <main className="w-full min-h-screen bg-[#030303] text-white overflow-x-hidden select-none flex flex-col relative">
      
      {/* Ambient glowing background mesh to create depth (removes the flat look) */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/10 via-cyan-900/5 to-transparent blur-3xl -z-10 pointer-events-none"></div>

      {/* 1. STICKY TOP NAVIGATION MODULE */}
      <Navigation />

      {/* 2. ASYMMETRIC EDITORIAL GRID */}
      <div className="w-full flex-grow grid grid-cols-1 md:grid-cols-12 gap-0 border-b border-zinc-900 pt-28">
        
        {/* Left Side Panel: Editorial & Brand Specifications */}
        <section className="col-span-12 md:col-span-5 bg-gradient-to-b from-[#0a0814] via-[#030303] to-[#0a0814] p-8 md:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-900 min-h-[75vh] md:min-h-[90vh] relative overflow-hidden group">
          
          {/* Subtle Cyber scanline overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0.007)_50%,rgba(0,0,0,0)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
          
          {/* Ambient Purple glow in the left card panel */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/15 transition-all duration-700"></div>

          {/* Top Brand Specs */}
          <div className="space-y-8 text-left relative z-10">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_#a855f7]"></span>
                <span className="text-[9px] font-mono tracking-[0.3em] text-zinc-500 uppercase">
                  SYSTEM NODE // DROP 001
                </span>
              </div>
              
              <h1 className={`text-4xl md:text-6xl font-black tracking-[0.2em] md:tracking-[0.3em] leading-none transition-all duration-1000 ease-out transform ${
                isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <span className="bg-gradient-to-r from-white via-zinc-200 to-purple-400 bg-clip-text text-transparent">
                  AETHER
                </span>
              </h1>
              <h2 className={`text-3xl md:text-5xl font-light tracking-[0.15em] md:tracking-[0.2em] text-zinc-400 uppercase leading-none transition-all duration-1000 ease-out delay-150 transform ${
                isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                BLACK
              </h2>
            </div>

            {/* Description Paragraph with glowing left border accent */}
            <div className="border-l-2 border-purple-500/40 pl-4 py-1">
              <p className="text-zinc-400 font-light text-xs md:text-sm tracking-wide leading-relaxed max-w-sm">
                Waterproof structured tailoring engineered for urban utility. Infused with double-dyed matte fabrics, laser-cut paneling, and raw cybernetic technical finishes.
              </p>
            </div>

            {/* Technical Parameter Grid - converted to premium glowing specs */}
            <div className="border-t border-zinc-900 pt-6 space-y-3.5 font-mono text-[9px] tracking-widest text-zinc-500 uppercase">
              <div className="flex justify-between items-center group/item hover:text-zinc-300 transition-colors">
                <span>Model Code</span>
                <span className="text-zinc-300 font-semibold bg-zinc-900/60 px-2 py-0.5 border border-zinc-800/80 rounded-sm">SH-001 // ALPHA</span>
              </div>
              <div className="flex justify-between items-center group/item hover:text-zinc-300 transition-colors">
                <span>Material Spec</span>
                <span className="text-zinc-300 font-semibold bg-zinc-900/60 px-2 py-0.5 border border-zinc-800/80 rounded-sm">Bonded Tech Nylon</span>
              </div>
              <div className="flex justify-between items-center group/item hover:text-zinc-300 transition-colors">
                <span>Region Hub</span>
                <span className="text-zinc-300 font-semibold bg-zinc-900/60 px-2 py-0.5 border border-zinc-800/80 rounded-sm">PK // Karachi Hub</span>
              </div>
              <div className="flex justify-between items-center group/item hover:text-zinc-300 transition-colors">
                <span>Fulfillment Node</span>
                <span className="text-purple-400 font-semibold flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-purple-400 animate-ping"></span>
                  Active Sync
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Call To Action Block */}
          <div className="pt-12 md:pt-0 space-y-6 text-left relative z-10">
            <div className="flex flex-col gap-3">
              {/* Premium gradient button with shadow glow */}
              <button 
                onClick={() => {
                  const element = document.getElementById('grid-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full text-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-[10px] font-mono tracking-widest uppercase py-4 rounded-sm shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition duration-300 transform active:scale-[0.98]"
              >
                Acquire Asset
              </button>
              <Link 
                href="/checkout" 
                className="w-full text-center bg-zinc-950/80 text-zinc-400 hover:text-white hover:bg-zinc-900/80 text-[10px] font-mono tracking-widest uppercase py-4 border border-zinc-850 hover:border-zinc-700 transition duration-300"
              >
                Direct Checkout
              </Link>
            </div>

            {/* Micro-brand footnote */}
            <div className="pt-4 border-t border-zinc-900/50 flex justify-between items-center text-[8px] font-mono tracking-widest text-zinc-600">
              <span>PREPGENIUS HQ // ©2026</span>
              <span className="text-zinc-500">SYS_VER_4.92 // PK</span>
            </div>
          </div>

        </section>

        {/* Right Side Panel: Immersive Wall Imagery (Col-span 7) */}
        <div id="grid-section" className="col-span-12 md:col-span-7 w-full bg-[#030303]">
          <ProductGrid />
        </div>

      </div>
    </main>
  );
}
