'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navigation() {
  const { cart, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {/* Clean, sticky top navigation bar with solid black background and thin bottom border */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black border-b border-zinc-900 h-16 flex items-center px-6 justify-between transition-all duration-300">
        <Link href="/" className="group">
          <h1 className="text-xs font-bold tracking-[0.25em] text-white uppercase hover:text-zinc-400 transition-colors">
            PREPGENIUS <span className="text-zinc-500 font-normal">STUDIOS</span>
          </h1>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link 
            href="/admin" 
            className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            HQ Node
          </Link>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 hover:text-white transition-all duration-300 flex items-center gap-2"
          >
            <span>Shopping Bag</span>
            <span className="bg-zinc-900 text-zinc-300 border border-zinc-800 text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
              {cartCount}
            </span>
          </button>
        </div>
      </header>

      {/* Slide-out Cart Drawer Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            onClick={() => setIsDrawerOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500"
          ></div>

          {/* Drawer Body */}
          <div className="relative w-full max-w-md h-full bg-zinc-950 border-l border-zinc-900 p-6 flex flex-col justify-between shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-zinc-900 pb-4 mb-6">
              <h2 className="text-xs font-mono tracking-widest text-zinc-400 uppercase text-left">Shopping Bag // ({cartCount})</h2>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="text-zinc-500 hover:text-white text-xs uppercase font-mono tracking-widest border border-zinc-900 hover:border-zinc-800 px-2.5 py-1 transition"
              >
                Close
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto space-y-6 pr-2">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest">Your bag is currently empty.</p>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="border border-zinc-800 text-xs font-mono uppercase tracking-widest px-4 py-2 hover:border-zinc-700 text-zinc-400 hover:text-white transition"
                  >
                    Go Explore
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start border-b border-zinc-900/40 pb-6 text-left">
                    {/* Item Image */}
                    <div className="w-16 aspect-[3/4] overflow-hidden bg-zinc-900 border border-zinc-800 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale" />
                    </div>

                    {/* Item Details */}
                    <div className="flex-grow flex flex-col justify-between h-full space-y-2">
                      <div className="text-left">
                        <h3 className="text-xs font-normal tracking-wide text-zinc-100">{item.name}</h3>
                        <p className="text-[10px] text-zinc-500 font-mono tracking-wider mt-0.5">{item.priceString}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-zinc-900 bg-zinc-950 rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-zinc-500 hover:text-white transition font-mono text-xs"
                          >
                            -
                          </button>
                          <span className="px-3 text-[11px] font-mono text-zinc-300">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-zinc-500 hover:text-white transition font-mono text-xs"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[10px] font-mono uppercase text-zinc-600 hover:text-red-400 transition"
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
                  <span className="text-white font-bold">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-zinc-600 font-mono text-left">Tax & regional customs shipping calculated at checkout stage.</p>
                <Link 
                  href="/checkout" 
                  onClick={() => setIsDrawerOpen(false)}
                  className="block w-full text-center"
                >
                  <button className="w-full bg-white text-black hover:bg-zinc-200 border border-white font-mono text-xs uppercase tracking-widest py-4 transition duration-300">
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
