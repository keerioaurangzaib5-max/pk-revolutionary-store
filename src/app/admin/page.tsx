'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Order {
  orderId: string;
  customerName: string;
  phone: string;
  city: string;
  shippingAddress: string;
  totalAmountPKR: number;
  paymentMethod: string;
  status: string;
  voiceTranscript: string;
}

const INITIAL_MOCK_ORDERS: Order[] = [
  {
    orderId: "PK-1717782400-842",
    customerName: "Aurangzaib Keerio",
    phone: "03001234567",
    city: "Karachi",
    shippingAddress: "House 42, Street 5, DHA Phase 6",
    totalAmountPKR: 9180,
    paymentMethod: "COD",
    status: "Pending Verification",
    voiceTranscript: "Yaar mujhe ye Aether Black jacket Cash on Delivery chahiye Karachi ke liye."
  },
  {
    orderId: "PK-1717785900-114",
    customerName: "Zain Ahmed",
    phone: "03219876543",
    city: "Lahore",
    shippingAddress: "45-A, Gulberg III",
    totalAmountPKR: 18360,
    paymentMethod: "CARD",
    status: "Paid & Verified",
    voiceTranscript: ""
  }
];

export default function AdminControlRoom() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_MOCK_ORDERS);

  // Approve COD order function to send directly to courier API
  const verifyOrderCOD = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.orderId === orderId ? { ...order, status: "Forwarded to Courier (Trax/Markaz)" } : order
    ));
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans antialiased selection:bg-neutral-800 flex flex-col justify-between">
      
      {/* Admin Top Dashboard Bar */}
      <nav className="border-b border-zinc-900 bg-zinc-950/60 backdrop-blur px-6 py-5 flex justify-between items-center sticky top-0 z-40">
        <div className="text-left">
          <Link href="/">
            <h1 className="text-sm font-black tracking-[0.25em] text-white uppercase hover:text-zinc-400 transition">
              PREPGENIUS <span className="text-zinc-500 font-normal">HQ</span>
            </h1>
          </Link>
          <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono mt-0.5">Control Center Node</p>
        </div>
        <div className="flex gap-4 items-center text-right font-mono">
          <div>
            <span className="text-[10px] block uppercase text-zinc-500">Volume</span>
            <span className="text-xs font-bold text-white">Rs. {orders.reduce((acc, curr) => acc + curr.totalAmountPKR, 0).toLocaleString()}</span>
          </div>
        </div>
      </nav>

      {/* Grid Dashboard Widgets - constrained to prevent stretching */}
      <main className="flex-grow w-full flex justify-center py-10 px-4 md:px-8">
        <div className="w-full max-w-5xl space-y-8">
          
          {/* Key Metric Panels (Dark Zinc Style) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-5 hover:border-zinc-800 transition duration-300">
              <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block">Total Orders</span>
              <p className="text-2xl font-semibold text-white tracking-tight mt-1">{orders.length}</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-5 hover:border-zinc-800 transition duration-300">
              <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block">COD Audits Pending</span>
              <p className="text-2xl font-semibold text-amber-500 tracking-tight mt-1">
                {orders.filter(o => o.status === "Pending Verification").length}
              </p>
            </div>
            <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-5 hover:border-zinc-800 transition duration-300">
              <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block">Node Health</span>
              <p className="text-2xl font-semibold text-emerald-500 tracking-tight mt-1">100% OPERATIONAL</p>
            </div>
          </div>

          {/* Master Orders Table Queue */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-zinc-900 bg-zinc-950/60 flex justify-between items-center">
              <h2 className="text-xs font-mono tracking-widest text-zinc-400 uppercase">Active Distribution Pipeline</h2>
              <span className="text-[9px] font-mono uppercase text-zinc-600">[ Live Audit Stream ]</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-900 text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500 bg-zinc-950/20">
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Destination</th>
                    <th className="px-6 py-4">Amount / Mode</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-xs">
                  {orders.map((order) => (
                    <tr key={order.orderId} className="hover:bg-zinc-900/10 transition-colors">
                      <td className="px-6 py-5 font-mono text-zinc-500">
                        {order.orderId}
                      </td>
                      <td className="px-6 py-5 text-left">
                        <p className="font-normal text-zinc-200">{order.customerName}</p>
                        <p className="text-zinc-500 font-mono text-[10px] mt-0.5">{order.phone}</p>
                      </td>
                      <td className="px-6 py-5 text-zinc-400 text-left">
                        <span className="font-bold text-zinc-500 block text-[9px] font-mono uppercase tracking-wider mb-0.5">{order.city}</span>
                        {order.shippingAddress}
                      </td>
                      <td className="px-6 py-5 text-left">
                        <span className="font-bold text-zinc-200 block font-mono">Rs. {order.totalAmountPKR.toLocaleString()}</span>
                        <span className={`inline-block text-[8px] font-mono uppercase font-bold tracking-widest px-1.5 py-0.5 rounded mt-1 border ${
                          order.paymentMethod === 'COD' 
                            ? 'bg-amber-950/30 text-amber-500 border-amber-900/60' 
                            : 'bg-emerald-950/30 text-emerald-500 border-emerald-900/60'
                        }`}>
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-left">
                        <span className={`inline-flex items-center gap-1.5 font-medium ${
                          order.status.includes('Pending') ? 'text-amber-500' : 'text-emerald-500'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${order.status.includes('Pending') ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                          {order.status}
                        </span>
                        {order.voiceTranscript && (
                          <div className="mt-2 text-[10px] text-zinc-500 bg-zinc-900/50 p-2 rounded border border-zinc-900 max-w-xs italic font-mono text-left">
                            <span className="text-[8px] font-bold text-zinc-600 not-italic uppercase block mb-0.5">Voice Log:</span>
                            "{order.voiceTranscript}"
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-5 text-right">
                        {order.status === "Pending Verification" ? (
                          <button
                            onClick={() => verifyOrderCOD(order.orderId)}
                            className="bg-white text-black text-[9px] font-mono uppercase tracking-widest px-3 py-1.5 rounded hover:bg-neutral-200 transition"
                          >
                            Verify COD
                          </button>
                        ) : (
                          <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">[ Locked ]</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center border-t border-zinc-900 bg-zinc-950/20 text-[9px] uppercase tracking-[0.2em] text-zinc-600">
        © 2026 PrepGenius HQ // Internal Operations Panel
      </footer>

    </div>
  );
}
