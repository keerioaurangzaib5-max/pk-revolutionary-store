'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

export default function RevolutionCheckout() {
  const { cart, cartTotal, clearCart } = useCart();

  // Form States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Karachi');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'CARD'>('COD');
  
  // Interactive UI UX States
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Simulated Voice AI Activation
  const handleVoiceOrderToggle = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      setFeedbackMessage(null);
      // Simulate advanced local Urdu/English NLP processing 
      setTimeout(() => {
        setIsRecordingVoice(false);
        setName("Aurangzaib Keerio");
        setPhone("03001234567");
        setCity("Karachi");
        setAddress("House 42, Street 5, DHA Phase 6");
        setVoiceTranscript("Yaar mujhe ye Aether Black jacket Cash on Delivery chahiye Karachi ke liye.");
      }, 3000);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setFeedbackMessage({ type: 'error', text: 'Your shopping bag is empty.' });
      return;
    }
    setIsSubmitting(true);
    setFeedbackMessage(null);

    const payload = {
      name,
      phone,
      address: `${address}, ${city}`,
      voiceTranscript: voiceTranscript || undefined,
      cartItems: cart.map(item => ({ id: item.id, name: item.name, quantity: item.quantity, price: item.price }))
    };

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setFeedbackMessage({
          type: 'success',
          text: `🎉 Order Setup Complete! Tracking ID: ${result.trackingId}. A verification SMS will be sent shortly.`
        });
        clearCart();
        setName('');
        setPhone('');
        setAddress('');
        setVoiceTranscript('');
      } else {
        setFeedbackMessage({
          type: 'error',
          text: result.error || "An unexpected transaction error occurred."
        });
      }
    } catch (err) {
      setFeedbackMessage({
        type: 'error',
        text: err instanceof Error ? err.message : "A connection disruption occurred during order processing."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050506] text-neutral-100 font-sans antialiased selection:bg-neutral-800 flex flex-col justify-between pt-20">
      
      {/* Navbar */}
      <Navigation />

      {/* Main Container: preventing desktop scaling blow-up */}
      <div className="w-full flex-grow flex justify-center py-12 px-4 md:px-8">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Left Column: Sleek Shipping Form (Col-span 7) */}
          <div className="md:col-span-7 space-y-8 text-left animate-fade-in-up">
            <div>
              <h1 className="text-xl font-light tracking-[0.2em] uppercase text-white">Secure Order Setup</h1>
              <p className="text-[10px] text-zinc-500 font-mono tracking-widest mt-1">Transaction Node // Operational</p>
            </div>

            {/* AI Voice Assist Box */}
            <div className="bg-[#ff5500]/5 border border-[#ff5500]/20 rounded-sm p-6 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff5500]/5 rounded-full blur-3xl"></div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-300 flex items-center gap-2 font-mono">
                  <span className="flex h-2 w-2 relative">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isRecordingVoice ? 'bg-[#ff5500]' : 'bg-zinc-600'}`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${isRecordingVoice ? 'bg-[#ff5500]' : 'bg-zinc-600'}`}></span>
                  </span>
                  AI One-Tap Voice Order
                </h3>
                <p className="text-[11px] text-zinc-400 mt-2 font-light leading-relaxed">Don't want to type your details? Tap listen, say your location in Urdu or English, and watch the forms auto-fill.</p>
              </div>
              
              <button 
                type="button"
                onClick={handleVoiceOrderToggle}
                className={`w-full py-3.5 rounded-sm font-mono tracking-widest uppercase text-[10px] border transition-all duration-300 flex items-center justify-center gap-2 ${
                  isRecordingVoice 
                    ? 'bg-[#ff5500]/20 border-[#ff5500] text-[#ff5500] cyber-pulse-active' 
                    : 'bg-[#ff5500] text-black border-[#ff5500] hover:bg-transparent hover:text-[#ff5500] kinetic-hover-btn'
                }`}
              >
                {isRecordingVoice ? 'Parsing voice coordinates...' : 'Tap to Test Voice Setup'}
              </button>

              {voiceTranscript && (
                <div className="bg-black border border-zinc-900 rounded-sm p-4 text-[11px] text-zinc-400 italic text-left font-mono">
                  <span className="text-[9px] uppercase tracking-wider block text-zinc-600 not-italic font-bold mb-1">[ Decoded Transcript ]</span>
                  "{voiceTranscript}"
                </div>
              )}
            </div>

            {/* Standard Checkout Form */}
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 font-mono block">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Aurangzaib Keerio"
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black border border-zinc-900 focus:border-[#ff5500] focus:shadow-[0_0_10px_rgba(255,85,0,0.15)] rounded-sm px-4 py-3 text-xs text-white transition outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 font-mono block">Mobile Number (For Courier)</label>
                <input 
                  type="tel" 
                  required
                  placeholder="e.g., 03001234567"
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-black border border-zinc-900 focus:border-[#ff5500] focus:shadow-[0_0_10px_rgba(255,85,0,0.15)] rounded-sm px-4 py-3 text-xs text-white transition outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1 space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 font-mono block">City</label>
                  <select 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-black border border-zinc-900 focus:border-[#ff5500] rounded-sm px-3 py-3 text-xs text-white transition outline-none appearance-none"
                  >
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 font-mono block">Delivery Address</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Street, sector, house/apartment #"
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-black border border-zinc-900 focus:border-[#ff5500] focus:shadow-[0_0_10px_rgba(255,85,0,0.15)] rounded-sm px-4 py-3 text-xs text-white transition outline-none"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 font-mono block">Secure Payment Mode</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    className={`p-3.5 rounded-sm text-[10px] font-mono uppercase border text-center transition-all ${
                      paymentMethod === 'COD' 
                        ? 'bg-[#ff5500]/10 border-[#ff5500] text-[#ff5500] font-bold' 
                        : 'bg-black border-zinc-900 text-zinc-500 hover:border-zinc-800'
                    }`}
                  >
                    Cash on Delivery (COD)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CARD')}
                    className={`p-3.5 rounded-sm text-[10px] font-mono uppercase border text-center transition-all ${
                      paymentMethod === 'CARD' 
                        ? 'bg-[#ff5500]/10 border-[#ff5500] text-[#ff5500] font-bold' 
                        : 'bg-black border-zinc-900 text-zinc-500 hover:border-zinc-800'
                    }`}
                  >
                    Debit / Credit Card
                  </button>
                </div>
              </div>

              {/* Status/Feedback Message notifications */}
              {feedbackMessage && (
                <div className={`p-4 rounded-sm text-xs font-mono border text-left ${
                  feedbackMessage.type === 'success' 
                    ? 'bg-[#00ffd5]/10 border-[#00ffd5]/30 text-[#00ffd5]' 
                    : 'bg-rose-950/20 border-rose-900/40 text-rose-400'
                }`}>
                  {feedbackMessage.text}
                </div>
              )}

              {/* Confirm Action Button */}
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full bg-[#ff5500] text-black disabled:bg-zinc-900 disabled:text-zinc-600 disabled:border-transparent border border-[#ff5500] font-mono text-xs uppercase tracking-widest py-4 rounded-sm shadow-xl transition active:scale-[0.99] kinetic-hover-btn"
              >
                {isSubmitting ? 'Verifying transaction stream...' : 'Confirm Order Setup'}
              </button>
            </form>
          </div>

          {/* Right Column: Gear Order Summary (Col-span 5) */}
          <div className="md:col-span-5 space-y-6 text-left animate-fade-in-up animation-delay-100">
            <div className="bg-[#0d0e11] border border-zinc-900 rounded-sm p-6 space-y-6 shadow-2xl sticky top-28">
              <div>
                <h2 className="text-xs font-mono tracking-widest text-zinc-400 uppercase">Selected Gear</h2>
                <p className="text-[9px] text-zinc-600 font-mono uppercase tracking-wider mt-0.5">Asset Allocation List</p>
              </div>

              {/* Cart Items List */}
              <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">No assets selected.</p>
                    <Link href="/" className="text-[10px] font-mono text-[#ff5500] hover:text-white uppercase tracking-widest underline mt-2 block">
                      Browse Lookbook
                    </Link>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center border-b border-zinc-900/60 pb-4">
                      <div className="w-12 aspect-[3/4] overflow-hidden bg-black border border-zinc-900 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale" />
                      </div>
                      <div className="flex-grow text-left">
                        <h3 className="text-[11px] font-normal tracking-wide text-zinc-300">{item.name}</h3>
                        <p className="text-[9px] text-[#ff5500] font-mono mt-0.5">
                          {item.quantity}x {item.priceString}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono text-white">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Price Calculation details */}
              {cart.length > 0 && (
                <div className="border-t border-zinc-900 pt-4 space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center text-zinc-500 text-[10px] uppercase tracking-wider">
                    <span>Standard Shipping</span>
                    <span className="text-zinc-400">FREE</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-500 text-[10px] uppercase tracking-wider">
                    <span>Customs & Import Duties</span>
                    <span className="text-zinc-400">INCLUDED</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-zinc-900 pt-3 text-white">
                    <span className="text-[10px] uppercase tracking-wider">Estimated Total</span>
                    <span className="font-bold text-sm text-[#ff5500]">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="p-6 text-center border-t border-zinc-900 bg-black text-[9px] uppercase tracking-[0.2em] text-zinc-600 mt-12">
        © 2026 PrepGenius Studios // Secure Payments Gateway
      </footer>

    </div>
  );
}
