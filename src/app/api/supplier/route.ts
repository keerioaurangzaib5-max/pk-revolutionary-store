import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scenario = searchParams.get('scenario') || 'success';

  // Check auth header to match the behavior of syncSupplierInventory
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: "Unauthorized access token" }, { status: 401 });
  }

  switch (scenario) {
    case 'empty_stock':
      return NextResponse.json([
        {
          sku: "PROD-A12",
          name: "Nova Glass Smartwatch",
          images: ["https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&auto=format&fit=crop&q=60"],
          cost: 45,
          quantity: 0
        },
        {
          sku: "PROD-B45",
          name: "Apex Wireless Earbuds",
          images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&auto=format&fit=crop&q=60"],
          cost: 25,
          quantity: 0
        },
        {
          sku: "PROD-C89",
          name: "Cyber Lumbar Back Support",
          images: [],
          cost: 15,
          quantity: 0
        }
      ]);

    case 'malformed_data':
      // Return a non-array response or items with anomalous types to verify defensive parsing
      return NextResponse.json({
        status: "ok",
        count: 3,
        products: [
          {
            // Missing SKU and name entirely
            images: null,
            cost: "not-a-number",
            quantity: "15" // Stringy number, should be safely converted
          },
          {
            sku: "PROD-B45",
            name: "Apex Wireless Earbuds (Malformed payload)",
            // Missing cost and quantity fields
          },
          {
            sku: "PROD-CRASH",
            name: null, // Null value in place of string
            cost: 200,
            quantity: -50 // Negative quantity, should be normalized to 0
          }
        ]
      });

    case 'api_error':
      return new NextResponse("Internal Server Error (Simulated Supplier Outage)", { status: 500 });

    case 'success':
    default:
      return NextResponse.json([
        {
          sku: "PROD-A12",
          name: "Nova Glass Smartwatch",
          images: ["https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&auto=format&fit=crop&q=60"],
          cost: 45,
          quantity: 120
        },
        {
          sku: "PROD-B45",
          name: "Apex Wireless Earbuds",
          images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&auto=format&fit=crop&q=60"],
          cost: 25,
          quantity: 8
        },
        {
          sku: "PROD-C89",
          name: "Cyber Lumbar Back Support",
          images: ["https://images.unsplash.com/photo-15802630880b5-857587196811?w=200&auto=format&fit=crop&q=60"],
          cost: 15,
          quantity: 0
        }
      ]);
  }
}
