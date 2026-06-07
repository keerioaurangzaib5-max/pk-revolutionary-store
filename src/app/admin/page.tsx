'use client';

import React, { useState } from 'react';

// Mock database metrics for our initial launch monitoring
const INITIAL_MOCK_ORDERS = [
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
  const [orders, setOrders] = useState(INITIAL_MOCK_ORDERS);

  // Approve COD order function to send directly to courier API
  const verifyOrderCOD = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.orderId === orderId ? { ...order, status: "Forwarded to Courier (Trax/Markaz)" } : order
    ));
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-neutral-800">
      {/* Admin Top Dashboard Bar */}
      <nav className="border-b border-neutral-900 bg-black/40 backdrop-blur px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-md font-black tracking-widest text-white uppercase">PREPGENIUS HQ</h1>
          <p className="text-[10px] text-neutral-500 uppercase tracking-wider mt-0.5">Global Operations & Metrics Node</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="text-right">
            <span className="text-[11px] block uppercase text-neutral-400 font-medium">Total Volume (PKR)</span>
            <span className="text-sm font-bold text-white">Rs. {orders.reduce((acc, curr) => acc + curr.totalAmountPKR, 0).toLocaleString()}</span>
          </div>
        </div>
      </nav>

      {/* Grid Dashboard Widgets */}
      <main className="max-w-6xl mx-auto px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black border border-neutral-900 rounded-2xl p-5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">Gross Orders</span>
            <p className="text-2xl font-black text-white mt-1">{orders.length}</p>
          </div>
          <div className="bg-black border border-neutral-900 rounded-2xl p-5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">COD Audits Pending</span>
            <p className="text-2xl font-black text-amber-500 mt-1">
              {orders.filter(o => o.status === "Pending Verification").length}
            </p>
          </div>
          <div className="bg-black border border-neutral-900 rounded-2xl p-5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">System Pipeline Integrity</span>
            <p className="text-2xl font-black text-emerald-500 mt-1">100% Secure</p>
          </div>
        </div>

        {/* Master Orders Table Queue */}
        <div className="bg-black border border-neutral-900 rounded-2xl overflow-hidden shadow-2xl">
          <div className="px-6 py-4 border-b border-neutral-900 bg-neutral-950/60 flex justify-between items-center">
            <h2 className="text-xs font-black uppercase tracking-widest text-neutral-400">Active Distribution Pipeline</h2>
            <span className="text-[10px] uppercase text-neutral-500">[ Live Streams Syncing ]</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-900 text-[10px] font-bold uppercase tracking-widest text-neutral-500 bg-neutral-950/20">
                  <th className="px-6 py-4">Order / ID</th>
                  <th className="px-6 py-4">Customer Details</th>
                  <th className="px-6 py-4">Destination</th>
                  <th className="px-6 py-4">Amount / Mode</th>
                  <th className="px-6 py-4">Status Log</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-xs">
                {orders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-neutral-900/30 transition-colors">
                    <td className="px-6 py-5 font-mono text-neutral-400">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-bold text-white">{order.customerName}</p>
                      <p className="text-neutral-500 mt-0.5">{order.phone}</p>
                    </td>
                    <td className="px-6 py-5 text-neutral-300">
                      <span className="font-semibold text-neutral-400 block text-[11px] uppercase tracking-wider mb-0.5">{order.city}</span>
                      {order.shippingAddress}
                    </td>
                    <td className="px-6 py-5">
                      <span className="font-bold text-white block">Rs. {order.totalAmountPKR.toLocaleString()}</span>
                      <span className={`inline-block text-[9px] uppercase font-extrabold tracking-wider px-1.5 py-0.5 rounded mt-1 ${
                        order.paymentMethod === 'COD' ? 'bg-amber-950 text-amber-400 border border-amber-900' : 'bg-emerald-950 text-emerald-400 border border-emerald-900'
                      }`}>
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 font-medium ${
                        order.status.includes('Pending') ? 'text-amber-500' : 'text-emerald-500'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${order.status.includes('Pending') ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                        {order.status}
                      </span>
                      {order.voiceTranscript && (
                        <div className="mt-2 text-[11px] text-neutral-500 bg-neutral-950 p-2 rounded-lg border border-neutral-900 max-w-xs italic">
                          <span className="text-[9px] font-bold text-neutral-600 not-italic uppercase block mb-0.5">Voice Transcript Audit:</span>
                          "{order.voiceTranscript}"
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-5 text-right">
                      {order.status === "Pending Verification" ? (
                        <button
                          onClick={() => verifyOrderCOD(order.orderId)}
                          className="bg-white text-black text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow transition hover:bg-neutral-200"
                        >
                          Verify COD
                        </button>
                      ) : (
                        <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">[ Queue Locked ]</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
