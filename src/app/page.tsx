'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootLandingPage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically forwards visitors directly to our premium storefront workspace layout
    router.replace('/checkout');
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-neutral-400 flex items-center justify-center font-sans">
      <div className="text-center space-y-2">
        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs uppercase tracking-widest text-neutral-600 font-bold">Connecting to PrepGenius Node...</p>
      </div>
    </div>
  );
}
