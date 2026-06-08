'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navigation() {
  const { cart, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {/* Sticky Top Navigation Bar (Crisp Borders and Dedicated Spacing) */}
      <header className="fixed top-0 left-0 right-0 w-full h-20 bg-[#050506]/90 backdrop-blur-md border-b border-zinc-900 px-6 md:px-12 flex items-center justify-between z-50 transition-all">
        <Link href="/" className="group">
          <h1 className="text-xs font-mono font-bold tracking-[0.3em] text-white uppercase group-hover:text-[#ff5500] transition-colors">
            PREPGENIUS STUDIOS
          </h1>
        </Link>
        
        <div className="flex items-center gap-8">
          <Link 
            href="/admin" 
            className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 hover:text-[#ff5500] link-hover-underline transition-colors"
          >
            HQ Node
          </Link>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="text-[10px] font-mono tracking-widest uppercase text-zinc-300 hover:text-white transition-all duration-300 flex items-center gap-2.5 group"
          >
            <span className="link-hover-underline">Shopping Bag</span>
            <span className="bg-[#ff5500]/10 text-[#ff5500] border border-[#ff5500]/30 text-[9px] font-bold px-2 py-0.5 rounded-sm transition-transform group-hover:scale-105">
              {cartCount}
            </span>
          </button>
        </div>
      </header>

      {/* Slide-out Cart Drawer Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop with fade-in-up styled backdrop transition */}
          <div 
            onClick={() => setIsDrawerOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
          ></div>

          {/* Drawer Body (Slide in and premium glow) */}
          <div className="relative w-full max-w-md h-full bg-[#0d0e11] border-l border-zinc-900 p-6 md:p-8 flex flex-col justify-between shadow-2xl animate-fade-in-up">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-zinc-900 pb-4 mb-6">
              <div className="text-left">
                <h2 className="text-xs font-mono tracking-widest text-zinc-400 uppercase">Shopping Bag</h2>
                <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mt-0.5">Asset Inventory // ({cartCount})</p>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="text-zinc-400 hover:text-white text-[10px] uppercase font-mono tracking-widest border border-zinc-900 hover:border-[#ff5500] px-3 py-1.5 transition-all duration-300"
              >
                Close
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto space-y-6 pr-2">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Your bag is currently empty.</p>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="border border-zinc-800 text-[10px] font-mono uppercase tracking-widest px-4 py-2 hover:border-[#ff5500] text-zinc-400 hover:text-white transition duration-300"
                  >
                    Go Explore
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start border-b border-zinc-900/60 pb-6 text-left">
                    {/* Item Image */}
                    <div className="w-16 aspect-[3/4] overflow-hidden bg-zinc-950 border border-zinc-900 flex-shrink-0 relative group">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>

                    {/* Item Details */}
                    <div className="flex-grow flex flex-col justify-between h-full space-y-2">
                      <div className="text-left">
                        <h3 className="text-xs font-normal tracking-wide text-zinc-100">{item.name}</h3>
                        <p className="text-[10px] text-[#ff5500] font-mono tracking-wider mt-0.5">{item.priceString}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-zinc-900 bg-black rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-1 text-zinc-500 hover:text-white transition font-mono text-xs"
                          >
                            -
                          </button>
                          <span className="px-3 text-[11px] font-mono text-zinc-300">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-1 text-zinc-500 hover:text-white transition font-mono text-xs"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[10px] font-mono uppercase text-zinc-500 hover:text-red-400 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout CTA */}
            {cart.length > 0 && (
              <div className="border-t border-zinc-900 pt-6 mt-6 space-y-4">
                <div className="flex justify-between items-center text-xs uppercase tracking-widest font-mono">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="text-[#ff5500] font-bold text-sm">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-[9px] text-zinc-500 font-mono text-left leading-relaxed">Tax & regional custom shipping rates verified at check-out stage.</p>
                <Link 
                  href="/checkout" 
                  onClick={() => setIsDrawerOpen(false)}
                  className="block w-full text-center"
                >
                  <button className="w-full bg-[#ff5500] text-black border border-[#ff5500] font-mono text-xs uppercase tracking-widest py-4 transition duration-300 hover:bg-transparent hover:text-[#ff5500] kinetic-hover-btn">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
