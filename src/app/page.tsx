'use client';

import React from 'react';
import Link from 'next/link';

export default function CinematicStorefront() {
  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans antialiased selection:bg-neutral-800 flex flex-col justify-between">
      
      {/* Premium Minimalist Navigation */}
      <header className="px-6 py-6 flex justify-between items-center bg-gradient-to-b from-black to-transparent fixed top-0 left-0 right-0 z-50">
        <h1 className="text-lg font-black tracking-widest text-white uppercase">
          PREPGENIUS <span className="text-neutral-500 font-normal">STUDIOS</span>
        </h1>
        <div className="text-[10px] tracking-widest uppercase text-neutral-400 bg-neutral-900/80 backdrop-blur px-4 py-1.5 rounded-full border border-neutral-800/60">
          Drop 001 // Active
        </div>
      </header>

      {/* Hero Showcase Section (Moody 90s Editorial Aesthetic) */}
      <main className="flex-grow pt-24 pb-12 px-4 max-w-md mx-auto w-full space-y-8">
        
        {/* Editorial Image Container */}
        <div className="relative aspect-[3/4] w-full bg-neutral-950 border border-neutral-900 rounded-3xl overflow-hidden shadow-2xl group">
          {/* Subtle overlay mimicking a vintage film grain gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-10"></div>
          
          {/* Visual Placeholder for our Cinematic Golden-Hour Asset */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-amber-500/80 font-bold">Studio Lookbook</span>
            <p className="text-xs text-neutral-500 uppercase tracking-wider italic font-serif">"90s Cinema Aesthetic // Low Light Node"</p>
          </div>

          {/* Floating Product Badge */}
          <div className="absolute bottom-6 left-6 right-6 z-20 space-y-2">
            <span className="text-[9px] uppercase tracking-widest bg-white text-black px-2 py-0.5 font-extrabold rounded">
              Limited Run
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
              Aether Black Techwear Shell
            </h2>
            <p className="text-xs text-neutral-300 line-clamp-2 font-light tracking-wide">
              Waterproof structured tailoring engineered for urban utility. Infused with double-dyed matte fabrics.
            </p>
          </div>
        </div>

        {/* Localized Price & Value Alignment Card */}
        <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-5 flex justify-between items-center shadow-lg">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold block">Launch Price</span>
            <span className="text-xl font-black text-white mt-0.5 block">Rs. 9,180</span>
          </div>
          <div className="text-right space-y-0.5">
            <span className="text-xs text-emerald-400 font-semibold block">✓ Free Delivery Across PK</span>
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Cash on Delivery Available</span>
          </div>
        </div>

        {/* Action Button Segment linking directly to our validation engine */}
        <div className="space-y-3">
          <Link href="/checkout" className="block w-full text-center">
            <button className="w-full bg-white text-black font-bold tracking-widest text-xs uppercase py-4 rounded-xl shadow-xl hover:bg-neutral-200 transition transform active:scale-[0.99] text-center">
              Acquire Asset // Go to Checkout
            </button>
          </Link>
          
          <div className="flex justify-center items-center gap-2 text-[10px] text-neutral-600 uppercase tracking-widest pt-2">
            <span className="h-1 w-1 bg-neutral-700 rounded-full"></span>
            Secured via Vercel Edge Protection Node
            <span className="h-1 w-1 bg-neutral-700 rounded-full"></span>
          </div>
        </div>

      </main>

      {/* Studio Minimalist Footer */}
      <footer className="p-6 text-center border-t border-neutral-900 bg-neutral-950/20 text-[9px] uppercase tracking-[0.2em] text-neutral-600">
        © 2026 PrepGenius Studios // Architectural Layout Node Alpha
      </footer>

    </div>
  );
}
