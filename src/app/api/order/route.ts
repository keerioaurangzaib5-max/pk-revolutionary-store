import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Support both direct fields and nested checkout page payload structures
    const name = body.name || body.customerName;
    const phone = body.phone;
    const address = body.address || body.shippingAddress;
    const voiceTranscript = body.voiceTranscript || body.voice_transcript;

    // Defensive validation check for missing fields
    const missingFields: string[] = [];
    if (!name) missingFields.push('name');
    if (!phone) missingFields.push('phone');
    if (!address) missingFields.push('address');

    if (missingFields.length > 0) {
      return NextResponse.json({
        success: false,
        error: `Required order fields are missing: [${missingFields.join(', ')}].`
      }, { status: 400 });
    }

    // Pakistani phone number format verification (03xxxxxxxx or +923xxxxxxxxx)
    const phoneRegex = /^((\+92)|(0092)|(0))?3\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({
        success: false,
        error: 'Kindly provide a valid Pakistani mobile number (e.g., 03001234567).'
      }, { status: 400 });
    }

    // Safe address length check
    if (address.length < 15) {
      return NextResponse.json({
        success: false,
        error: 'The address is too short. Please provide a detailed address (minimum 15 characters).'
      }, { status: 400 });
    }

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
