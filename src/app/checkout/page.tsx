'use client';

import React, { useState } from 'react';
import { calculatePakistaniRetailPrice } from '../../services/orderProcessor';
import { processStorefrontCheckout } from '../../services/checkoutEngine';
import { ProductVariant, PaymentMethod } from '../../types/shop';

// Mock active product for testing our custom UI state
const DISRUPTIVE_PRODUCT: ProductVariant = {
  sku: "PREM-JKT-001",
  title: "Aether Black Techwear Shell",
  imageUrl: "/placeholder-product.jpg",
  supplierPriceUSD: 22, // ~$6,100 PKR base cost
  retailPricePKR: calculatePakistaniRetailPrice(22), // Automatically handles markup (~$9,180 PKR)
  stockAvailable: 14
};

export default function RevolutionCheckout() {
  // Form States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Karachi');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD');
  
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
    setIsSubmitting(true);
    setFeedbackMessage(null);

    const customerDetails = {
      customerName: name,
      phone,
      city,
      shippingAddress: address,
      paymentMethod
    };

    const cart = [{ product: DISRUPTIVE_PRODUCT, quantity: 1 }];
    
    // Fire to our defensive backend controller layer
    const result = await processStorefrontCheckout(cart, customerDetails, voiceTranscript || undefined);

    setIsSubmitting(false);
    if (result.success) {
      setFeedbackMessage({
        type: 'success',
        text: `🎉 Order Placed! Your Tracking ID is ${result.orderId}. We will send a confirmation SMS shortly.`
      });
    } else {
      setFeedbackMessage({
        type: 'error',
        text: result.error || "An unexpected transaction error occurred."
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col justify-between font-sans antialiased selection:bg-neutral-800">
      {/* Top Premium Navbar */}
      <header className="border-b border-neutral-900 bg-neutral-950/50 backdrop-blur px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-black tracking-widest text-white uppercase">PREPGENIUS <span className="text-neutral-500 font-normal">STUDIOS</span></h1>
        <div className="text-xs tracking-wider uppercase text-neutral-400 bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800">PK Node Operational</div>
      </header>

      {/* Main Container */}
      <main className="max-w-md w-full mx-auto px-4 py-8 flex-grow space-y-8">
        
        {/* Product Visual Snapshot Card (Moody 90s aesthetic styling) */}
        <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden p-4 space-y-4 shadow-2xl">
          <div className="aspect-[4/5] w-full bg-gradient-to-b from-neutral-800 to-neutral-950 rounded-xl flex items-center justify-center relative border border-neutral-900">
            <span className="text-xs uppercase tracking-widest text-neutral-500">[ Cinematic Product Scan ]</span>
            <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur px-3 py-1.5 rounded-lg border border-neutral-800 text-[11px] uppercase tracking-wider text-neutral-300">
              In Stock: {DISRUPTIVE_PRODUCT.stockAvailable} units
            </div>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white">{DISRUPTIVE_PRODUCT.title}</h2>
              <p className="text-xs text-neutral-500 uppercase tracking-wider mt-0.5">SKU: {DISRUPTIVE_PRODUCT.sku}</p>
            </div>
            <div className="text-right">
              <span className="text-lg font-black text-white">Rs. {DISRUPTIVE_PRODUCT.retailPricePKR.toLocaleString()}</span>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-0.5">Inc. Customs & Delivery</p>
            </div>
          </div>
        </div>

        {/* AI Voice Checkout Trigger (The Game Changer) */}
        <div className="bg-gradient-to-br from-neutral-950 via-neutral-950 to-neutral-900 border border-neutral-800/60 rounded-2xl p-5 space-y-3 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700"></div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
              <span className="flex h-2 w-2 relative">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isRecordingVoice ? 'bg-red-500' : 'bg-neutral-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isRecordingVoice ? 'bg-red-500' : 'bg-neutral-500'}`}></span>
              </span>
              AI One-Tap Voice Checkout
            </h3>
            <p className="text-xs text-neutral-500 mt-1">Don't want to type your address? Hold down, state your city & location in Urdu/English, and let the AI extract it.</p>
          </div>
          
          <button 
            type="button"
            onClick={handleVoiceOrderToggle}
            className={`w-full py-3 rounded-xl font-bold tracking-wider uppercase text-xs border transition-all duration-300 flex items-center justify-center gap-2 ${
              isRecordingVoice 
                ? 'bg-red-950/40 border-red-800 text-red-400 animate-pulse' 
                : 'bg-white text-black border-white hover:bg-neutral-200'
            }`}
          >
            {isRecordingVoice ? 'Listening & Parsing Address...' : 'Tap to Test Voice Ordering'}
          </button>

          {voiceTranscript && (
            <div className="bg-neutral-900/50 border border-neutral-800/80 rounded-xl p-3 text-xs text-neutral-400 italic">
              <span className="text-[10px] uppercase tracking-wider block text-neutral-600 not-italic font-bold mb-1">Captured Metadata Transcript:</span>
              "{voiceTranscript}"
            </div>
          )}
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 block">Full Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g., Aurangzaib Keerio"
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-900 focus:border-neutral-700 rounded-xl px-4 py-3 text-sm text-white transition outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 block">Mobile Number (For Courier Rider)</label>
            <input 
              type="tel" 
              required
              placeholder="e.g., 03001234567"
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-900 focus:border-neutral-700 rounded-xl px-4 py-3 text-sm text-white transition outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1 space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 block">City</label>
              <select 
                value={city} 
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-900 focus:border-neutral-700 rounded-xl px-3 py-3 text-sm text-white transition outline-none appearance-none"
              >
                <option value="Karachi">Karachi</option>
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>
            </div>
            <div className="col-span-2 space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 block">Detailed Delivery Address</label>
              <input 
                type="text" 
                required
                placeholder="Street number, sector, house/apartment #"
                value={address} 
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-900 focus:border-neutral-700 rounded-xl px-4 py-3 text-sm text-white transition outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 block">Select Secure Payment Mode</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('COD')}
                className={`p-3 rounded-xl text-xs font-bold tracking-wider uppercase border text-center transition ${
                  paymentMethod === 'COD' 
                    ? 'bg-neutral-900 border-neutral-400 text-white shadow-md' 
                    : 'bg-neutral-950 border-neutral-900 text-neutral-500 hover:border-neutral-800'
                }`}
              >
                Cash on Delivery (COD)
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('CARD')}
                className={`p-3 rounded-xl text-xs font-bold tracking-wider uppercase border text-center transition ${
                  paymentMethod === 'CARD' 
                    ? 'bg-neutral-900 border-neutral-400 text-white shadow-md' 
                    : 'bg-neutral-950 border-neutral-900 text-neutral-500 hover:border-neutral-800'
                }`}
              >
                Debit / Credit Card
              </button>
            </div>
          </div>

          {/* Runtime Server Error/Success Notifications */}
          {feedbackMessage && (
            <div className={`p-4 rounded-xl text-xs font-medium border ${
              feedbackMessage.type === 'success' 
                ? 'bg-emerald-950/30 border-emerald-800/80 text-emerald-400' 
                : 'bg-rose-950/30 border-rose-800/80 text-rose-400'
            }`}>
              {feedbackMessage.text}
            </div>
          )}

          {/* Submission Execution Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black disabled:bg-neutral-700 disabled:text-neutral-400 font-bold tracking-widest text-xs uppercase py-4 rounded-xl shadow-xl transition active:scale-[0.99]"
          >
            {isSubmitting ? 'Securing Transaction Connection...' : 'Confirm Order Setup'}
          </button>
        </form>
      </main>

      {/* Minimalist Studio Footer */}
      <footer className="p-6 text-center border-t border-neutral-900 bg-neutral-950/30 text-[10px] uppercase tracking-widest text-neutral-600">
        Engineered via Antigravity Workspace Node // Protected by Vercel Edge Shield
      </footer>
    </div>
  );
}
