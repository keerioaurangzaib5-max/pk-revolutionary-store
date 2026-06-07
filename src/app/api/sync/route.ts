import { syncSupplierInventory } from '@/services/inventory';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scenario = searchParams.get('scenario') || 'success';
  const missingKeys = searchParams.get('missingKeys') === 'true';

  // Store original environment variables to restore them later
  const originalEndpoint = process.env.SUPPLIER_API_ENDPOINT;
  const originalToken = process.env.SUPPLIER_ACCESS_TOKEN;

  if (missingKeys) {
    // Zero Secrets Rule: simulate unconfigured credentials
    delete process.env.SUPPLIER_API_ENDPOINT;
    delete process.env.SUPPLIER_ACCESS_TOKEN;
  } else {
    // Inject mock credentials pointing to our mock supplier API route
    const origin = new URL(request.url).origin;
    process.env.SUPPLIER_API_ENDPOINT = `${origin}/api/supplier`;
    process.env.SUPPLIER_ACCESS_TOKEN = 'mock-secret-access-token-12345';
  }

  // If a specific scenario is chosen (e.g. empty_stock, malformed_data), 
  // rewrite the endpoint URL dynamically to pass it to our mock supplier route.
  if (process.env.SUPPLIER_API_ENDPOINT && scenario !== 'success') {
    process.env.SUPPLIER_API_ENDPOINT = `${process.env.SUPPLIER_API_ENDPOINT}?scenario=${scenario}`;
  }

  try {
    const syncResult = await syncSupplierInventory();
    return NextResponse.json(syncResult);
  } catch (err) {
    return NextResponse.json({
      products: [],
      lastSynced: new Date().toISOString(),
      error: err instanceof Error ? err.message : "Fatal server action crash caught."
    }, { status: 500 });
  } finally {
    // Restore original environment state to keep testing sandboxed
    if (originalEndpoint) {
      process.env.SUPPLIER_API_ENDPOINT = originalEndpoint;
    } else {
      delete process.env.SUPPLIER_API_ENDPOINT;
    }

    if (originalToken) {
      process.env.SUPPLIER_ACCESS_TOKEN = originalToken;
    } else {
      delete process.env.SUPPLIER_ACCESS_TOKEN;
    }
  }
}
