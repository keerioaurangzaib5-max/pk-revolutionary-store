'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navigation() {
  const { cart, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {/* Premium Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 w-full h-20 bg-[#050506]/80 backdrop-blur-xl border-b border-zinc-900/50 px-6 md:px-16 flex items-center justify-between z-50 transition-all">
        <Link href="/" className="group">
          <h1 className="text-[13px] font-bold tracking-[0.25em] text-white uppercase group-hover:text-[#ff5500] transition-colors font-sans">
            PREPGENIUS STUDIOS
          </h1>
        </Link>
        
        <div className="flex items-center gap-10">
          <Link 
            href="/admin" 
            className="text-[11px] font-medium uppercase tracking-widest text-zinc-400 hover:text-[#ff5500] link-hover-underline transition-colors font-sans"
          >
            HQ Node
          </Link>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="text-[11px] font-medium tracking-widest uppercase text-zinc-300 hover:text-white transition-all duration-300 flex items-center gap-2.5 group font-sans"
          >
            <span className="link-hover-underline">Shopping Bag</span>
            <span className="bg-[#ff5500] text-black text-[10px] font-bold px-2.5 py-0.5 rounded-full transition-transform group-hover:scale-105">
              {cartCount}
            </span>
          </button>
        </div>
      </header>

      {/* Slide-out Cart Drawer Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop with blur */}
          <div 
            onClick={() => setIsDrawerOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
          ></div>

          {/* Drawer Body (Dribbble style: soft shadow, clean typography, rounded corners on left side) */}
          <div className="relative w-full max-w-md h-full bg-[#0a0a0c] border-l border-zinc-900 p-8 flex flex-col justify-between shadow-2xl animate-fade-in-up md:rounded-l-[2rem] overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-zinc-900/60 pb-5 mb-6">
              <div className="text-left">
                <h2 className="text-sm font-semibold tracking-wider text-white font-sans">Shopping Bag</h2>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono mt-1">Asset Allocation // ({cartCount} Items)</p>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="text-zinc-400 hover:text-white text-[10px] uppercase font-mono tracking-widest border border-zinc-800 hover:border-[#ff5500] px-3.5 py-1.5 rounded-full transition-all duration-300"
              >
                Close
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto space-y-6 pr-1">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <p className="text-[13px] font-sans text-zinc-500">Your bag is currently empty.</p>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="border border-zinc-800 text-[10px] font-mono uppercase tracking-widest px-5 py-2.5 rounded-full hover:border-[#ff5500] text-zinc-400 hover:text-white transition duration-300"
                  >
                    Go Explore
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start border-b border-zinc-900/40 pb-6 text-left">
                    {/* Item Image */}
                    <div className="w-20 aspect-[3/4] overflow-hidden bg-zinc-950 border border-zinc-900 rounded-xl flex-shrink-0 relative group">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>

                    {/* Item Details */}
                    <div className="flex-grow flex flex-col justify-between h-full space-y-3">
                      <div className="text-left">
                        <h3 className="text-xs font-semibold tracking-wide text-zinc-100 font-sans">{item.name}</h3>
                        <p className="text-[11px] text-[#ff5500] font-mono tracking-wider mt-1">{item.priceString}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex justify-between items-center mt-1">
                        <div className="flex items-center border border-zinc-900 bg-[#0c0d0f] rounded-full p-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition font-sans text-xs"
                          >
                            -
                          </button>
                          <span className="px-3 text-xs font-mono text-zinc-300">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition font-sans text-xs"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[10px] font-sans uppercase text-zinc-500 hover:text-red-400 transition-colors"
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
              <div className="border-t border-zinc-900/80 pt-6 mt-6 space-y-4">
                <div className="flex justify-between items-center text-xs uppercase tracking-widest font-mono">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="text-[#ff5500] font-bold text-base font-mono">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-zinc-500 font-sans text-left leading-relaxed">Tax, customs, and duty rates will be calculated at checkout.</p>
                <Link 
                  href="/checkout" 
                  onClick={() => setIsDrawerOpen(false)}
                  className="block w-full text-center"
                >
                  <button className="w-full bg-[#ff5500] text-black border border-[#ff5500] font-sans font-bold text-[11px] uppercase tracking-widest py-4 rounded-full transition duration-300 hover:bg-transparent hover:text-[#ff5500] kinetic-hover-btn">
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
