import { NextResponse } from 'next/server';
import { OrderInputSchema } from '@/types/shop';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Normalize properties for validation
    const normalizedBody = {
      name: body.name || body.customerName,
      phone: body.phone,
      address: body.address || body.shippingAddress,
      voiceTranscript: body.voiceTranscript || body.voice_transcript,
      cartItems: body.cartItems
    };

    // Zod Safe Parse Guard
    const validation = OrderInputSchema.safeParse(normalizedBody);
    if (!validation.success) {
      // Gather Zod validation error messages cleanly
      const errorMessage = validation.error.issues.map(err => err.message).join(' | ');
      return NextResponse.json({
        success: false,
        error: errorMessage
      }, { status: 400 });
    }

    const { name, phone, address, voiceTranscript } = validation.data;

    // Generate a secure, trackable Pakistani regional Order Identifier
    const trackingID = `PK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Log the payload to the server terminal
    console.log('\n--- Incoming Order Received ---');
    console.log(`Tracking ID: ${trackingID}`);
    console.log(`Customer Name: ${name}`);
    console.log(`Phone: ${phone}`);
    console.log(`Address: ${address}`);
    if (voiceTranscript) {
      console.log(`Voice Transcript: "${voiceTranscript}"`);
    } else {
      console.log('Voice Transcript: None');
    }
    console.log('-------------------------------\n');

    return NextResponse.json({
      success: true,
      trackingId: trackingID,
      message: 'Order received and logged successfully.',
      order: {
        name,
        phone,
        address,
        voiceTranscript: voiceTranscript || null
      }
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Fatal server order processing exception.'
    }, { status: 500 });
  }
}
