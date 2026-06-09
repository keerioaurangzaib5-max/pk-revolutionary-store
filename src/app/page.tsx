'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import ProductGrid from '@/components/ProductGrid';

export default function Home() {
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setIsSubscribed(true);
      setEmailInput('');
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#050506] text-white overflow-x-hidden select-none flex flex-col pt-20 relative font-sans">
      
      {/* Ambient background meshes */}
      <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-[#ff5500]/5 via-transparent to-transparent blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute top-[800px] right-0 w-[400px] h-[400px] bg-gradient-to-b from-[#00ffd5]/3 via-transparent to-transparent blur-3xl -z-10 pointer-events-none"></div>

      {/* Grid overlay */}
      <div className="absolute top-0 left-0 w-full h-[1000px] bg-[radial-gradient(rgba(255,85,0,0.04)_1px,transparent_1px)] [background-size:32px_32px] -z-10 pointer-events-none"></div>

      {/* 1. STICKY TOP NAVIGATION */}
      <Navigation />

      {/* 2. SPLIT HERO SECTION (60/40 Asymmetric Dribbble Shot) */}
      <section className="w-full border-b border-zinc-900/50 relative overflow-hidden py-10 md:py-20 flex justify-center">
        <div className="w-full max-w-6xl px-6 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Panel: Content HUD (Col-span 7) */}
          <div className="md:col-span-7 text-left space-y-6 md:pr-6">
            
            {/* HUD Status Tag */}
            <div className="inline-flex items-center gap-2 bg-[#0c0d0f] border border-zinc-900 px-3.5 py-1.5 rounded-full animate-fade-in-up">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5500] animate-pulse shadow-[0_0_8px_#ff5500]"></span>
              <span className="text-zinc-400 font-mono text-[9px] uppercase tracking-[0.25em]">
                Drop 001 // Core System Gear
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase leading-[1.05] text-white animate-fade-in-up animation-delay-100">
              AETHER BLACK<br />
              <span className="text-[#ff5500]">TECHWEAR.</span>
            </h1>

            {/* Description */}
            <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed max-w-lg animate-fade-in-up animation-delay-200">
              Waterproof structured tailoring engineered for urban utility. Infused with double-dyed matte fabrics, laser-cut paneling, and technical layout maps.
            </p>

            {/* Live Newsletter signup directly inside Hero */}
            <div className="animate-fade-in-up animation-delay-300 pt-2">
              <form onSubmit={handleSubscribe} className="relative max-w-md w-full flex items-center">
                <input 
                  type="email" 
                  required
                  placeholder="Enter email for pre-release alerts" 
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-[#0c0d0f] border border-zinc-900 focus:border-[#ff5500] focus:shadow-[0_0_15px_rgba(255,85,0,0.1)] text-xs text-white px-5 py-4 rounded-full outline-none pr-32 transition-all"
                />
                <button 
                  type="submit"
                  className="absolute right-1.5 bg-[#ff5500] text-black font-semibold font-sans text-[10px] uppercase tracking-wider px-5 py-2.5 rounded-full border border-[#ff5500] transition duration-300 hover:bg-transparent hover:text-[#ff5500]"
                >
                  {isSubscribed ? 'Alert Set' : 'Register'}
                </button>
              </form>
              {isSubscribed && (
                <p className="text-[#00ffd5] text-[10px] font-mono uppercase tracking-widest mt-2 ml-4">✓ Node subscription locked. Welcome, operator.</p>
              )}
            </div>

          </div>

          {/* Right Panel: Tall Visual Showcase Card (Col-span 5) */}
          <div className="md:col-span-5 animate-fade-in-up animation-delay-200">
            <div className="relative aspect-[3/4] w-full bg-[#0c0d0f] border border-zinc-900 rounded-3xl p-4 shadow-2xl group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
              
              {/* Subtle grid elements overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,85,0,0.06)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

              {/* Main Model/Jacket photo */}
              <img 
                src="/images/jacket.png" 
                alt="Aether Shell Model Showcase" 
                className="w-full h-full object-cover rounded-2xl grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />

              {/* HUD Details inside card */}
              <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end text-left font-mono">
                <div>
                  <span className="text-[#ff5500] text-[9px] uppercase tracking-widest block font-bold">Featured Spec // 01</span>
                  <h3 className="text-white text-xs uppercase font-bold tracking-wider mt-0.5">3L TPU Membrane Shell</h3>
                </div>
                <span className="bg-[#050506]/80 border border-zinc-900 text-zinc-400 text-[8px] px-2 py-0.5 rounded-sm">20,000mm Rating</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. PRODUCT CATALOG GRID */}
      <div id="catalog-section" className="w-full max-w-6xl mx-auto px-6 py-6">
        <ProductGrid />
      </div>

      {/* 4. TECHNICAL SPECIFICATIONS MODULE */}
      <section className="w-full bg-[#07080a] border-t border-zinc-900/60 py-24 px-6 flex justify-center">
        <div className="max-w-6xl w-full">
          <div className="border-l-2 border-[#ff5500] pl-4 mb-12 text-left">
            <p className="text-[#ff5500] font-mono text-[9px] uppercase tracking-widest">[ Engineering Report ]</p>
            <h2 className="text-xl font-light uppercase tracking-widest text-white mt-1">Material Integrity & Construction</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
            <div className="bg-[#0c0d0f]/50 border border-zinc-900/60 p-6 rounded-2xl">
              <span className="text-zinc-600 font-mono text-[9px] block mb-2">01 // SHELL PROTECTION</span>
              <h3 className="text-xs uppercase font-bold text-zinc-300 tracking-wider mb-2">3L TPU Membrane</h3>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-light">Complete windproof shielding with 20,000mm hydrostatic water barrier ratings for severe weather defense.</p>
            </div>
            <div className="bg-[#0c0d0f]/50 border border-zinc-900/60 p-6 rounded-2xl">
              <span className="text-zinc-600 font-mono text-[9px] block mb-2">02 // FASTENERS</span>
              <h3 className="text-xs uppercase font-bold text-zinc-300 tracking-wider mb-2">YKK Aquaguard Zips</h3>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-light">Matte urethane coated zippers provide seamless moisture seals across all geometric storage compartments.</p>
            </div>
            <div className="bg-[#0c0d0f]/50 border border-zinc-900/60 p-6 rounded-2xl">
              <span className="text-zinc-600 font-mono text-[9px] block mb-2">03 // UTILITY MODULES</span>
              <h3 className="text-xs uppercase font-bold text-zinc-300 tracking-wider mb-2">Multi-Pocket Grid</h3>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-light">Equipped with 6 tactical cargo chambers positioned ergonomically for quick access without bulk expansion.</p>
            </div>
            <div className="bg-[#0c0d0f]/50 border border-zinc-900/60 p-6 rounded-2xl">
              <span className="text-zinc-600 font-mono text-[9px] block mb-2">04 // FIT MECHANICS</span>
              <h3 className="text-xs uppercase font-bold text-zinc-300 tracking-wider mb-2">Articulated Form</h3>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-light">Sleeves and panels designed anatomically to follow the natural contours of movement without binding.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION (Social proof for completeness) */}
      <section className="w-full border-t border-zinc-900/60 py-24 px-6 flex justify-center bg-[#050506]">
        <div className="max-w-6xl w-full">
          <div className="text-center space-y-2 mb-12">
            <span className="testimonial-badge text-[9px] uppercase tracking-widest font-mono font-bold px-3 py-1 rounded-full">Operator Reviews</span>
            <h2 className="text-2xl font-light uppercase tracking-widest text-white mt-3">Field Validated Equipment</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0c0d0f]/30 border border-zinc-900 p-6 rounded-2xl text-left space-y-4 relative">
              <div className="text-[#ff5500] text-xs">★★★★★</div>
              <p className="text-zinc-400 text-xs font-light leading-relaxed">
                "The Aether Shell jacket exceeds expectations. Tested in heavy rain in Lahore; zero water leakage and the modular straps feel very robust."
              </p>
              <div className="border-t border-zinc-900/60 pt-4 flex justify-between items-center text-[9px] font-mono text-zinc-500">
                <span className="font-bold uppercase tracking-wider text-zinc-400">K. Zain</span>
                <span>Karachi, PK // Verified Buyer</span>
              </div>
            </div>
            <div className="bg-[#0c0d0f]/30 border border-zinc-900 p-6 rounded-2xl text-left space-y-4 relative">
              <div className="text-[#ff5500] text-xs">★★★★★</div>
              <p className="text-zinc-400 text-xs font-light leading-relaxed">
                "Obsidian Modular pants fit perfectly. Articulated paneling means I can crouch and walk comfortably without tight binding. Essential techwear."
              </p>
              <div className="border-t border-zinc-900/60 pt-4 flex justify-between items-center text-[9px] font-mono text-zinc-500">
                <span className="font-bold uppercase tracking-wider text-zinc-400">Ahmed S.</span>
                <span>Lahore, PK // Verified Buyer</span>
              </div>
            </div>
            <div className="bg-[#0c0d0f]/30 border border-zinc-900 p-6 rounded-2xl text-left space-y-4 relative">
              <div className="text-[#ff5500] text-xs">★★★★★</div>
              <p className="text-zinc-400 text-xs font-light leading-relaxed">
                "Cap fabric is actually waterproof. Water slides off immediately. The structured visor holds shape even after being folded into cargo pockets."
              </p>
              <div className="border-t border-zinc-900/60 pt-4 flex justify-between items-center text-[9px] font-mono text-zinc-500">
                <span className="font-bold uppercase tracking-wider text-zinc-400">Farhan M.</span>
                <span>Islamabad, PK // Verified Buyer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DETAILED 4-COLUMN FOOTER */}
      <footer className="w-full bg-[#030304] border-t border-zinc-900 px-6 py-20 flex justify-center">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 text-left">
          
          {/* Brand Info Column (Col-span 4) */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-bold tracking-[0.2em] text-white uppercase font-sans">
              PREPGENIUS STUDIOS
            </h3>
            <p className="text-[11px] text-zinc-500 leading-relaxed font-light">
              High-fashion techwear and modular apparel systems. Engineered for urban operations and weather defense. Made in Pakistan.
            </p>
            <div className="flex gap-2">
              <span className="bg-[#0c0d0f] border border-zinc-900 text-[8px] font-mono text-zinc-500 px-2 py-0.5 rounded-sm">TRAX SYNC READY</span>
              <span className="bg-[#0c0d0f] border border-zinc-900 text-[8px] font-mono text-zinc-500 px-2 py-0.5 rounded-sm">SECURE SSL</span>
            </div>
          </div>

          {/* Catalog Column (Col-span 2) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#ff5500] font-mono">Catalog</h4>
            <ul className="space-y-2 text-[11px] text-zinc-500 font-sans">
              <li><Link href="/" className="hover:text-white transition">All Gear</Link></li>
              <li><Link href="/" className="hover:text-white transition">Shell Jackets</Link></li>
              <li><Link href="/" className="hover:text-white transition">Modular Pants</Link></li>
              <li><Link href="/" className="hover:text-white transition">Caps & Accessories</Link></li>
            </ul>
          </div>

          {/* Customer Care Column (Col-span 3) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#ff5500] font-mono">Support Services</h4>
            <ul className="space-y-2 text-[11px] text-zinc-500 font-sans">
              <li><Link href="/checkout" className="hover:text-white transition">Secure Checkout</Link></li>
              <li><Link href="/" className="hover:text-white transition">Cash on Delivery Terms</Link></li>
              <li><Link href="/" className="hover:text-white transition">Trax Logistics Routing</Link></li>
              <li><Link href="/" className="hover:text-white transition">Size Dimension Audits</Link></li>
            </ul>
          </div>

          {/*HQ Links Column (Col-span 3) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#ff5500] font-mono">Technical nodes</h4>
            <ul className="space-y-2 text-[11px] text-zinc-500 font-sans">
              <li><Link href="/admin" className="hover:text-white transition font-mono">[ Admin HQ Board ]</Link></li>
              <li><Link href="/api/supplier" className="hover:text-white transition font-mono">[ Supplier Feed API ]</Link></li>
              <li><Link href="/api/sync" className="hover:text-white transition font-mono">[ Trax Sync Hook ]</Link></li>
            </ul>
          </div>

        </div>
      </footer>

      {/* Copyright Strip */}
      <div className="w-full bg-black border-t border-zinc-900/50 py-6 px-6 text-center text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
        © 2026 PREPGENIUS STUDIOS // OPERATIONAL NODE 001 // BY COM PLUS
      </div>

    </main>
  );
}
