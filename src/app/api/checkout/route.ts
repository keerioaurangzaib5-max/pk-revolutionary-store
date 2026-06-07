import { processStorefrontCheckout } from '@/services/checkoutEngine';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cartItems, customerDetails, voiceTranscript } = body;

    // Execute the Master Checkout Engine transaction boundary on the server
    const result = await processStorefrontCheckout(cartItems, customerDetails, voiceTranscript);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({
      success: false,
      orderId: null,
      error: error instanceof Error ? error.message : "Fatal server checkout transaction exception."
    }, { status: 500 });
  }
}
