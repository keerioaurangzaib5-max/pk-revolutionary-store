'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ProductVariant, InventorySyncResponse, PaymentMethod } from '../types/shop';
import { validateLocalOrder } from '../services/orderProcessor';
import { processStorefrontCheckout } from '../services/checkoutEngine';

interface LogEntry {
  timestamp: string;
  type: 'info' | 'warn' | 'error';
  message: string;
}

export default function DashboardPage() {
  const [scenario, setScenario] = useState<string>('success');
  const [missingKeys, setMissingKeys] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<InventorySyncResponse | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // Local Order Simulator States
  const [orderName, setOrderName] = useState<string>('Zain Ahmed');
  const [orderPhone, setOrderPhone] = useState<string>('03001234567');
  const [orderAddress, setOrderAddress] = useState<string>('Flat 4B, Al-Hafiz Heights, Gulshan-e-Iqbal');
  const [orderCity, setOrderCity] = useState<string>('Karachi');
  const [orderPayment, setOrderPayment] = useState<PaymentMethod>('COD');
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; error: string | null } | null>(null);

  const handleOrderValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get the first synced product from our inventory to simulate checking out an item
    const cartItems = data && data.products.length > 0 
      ? [{ product: data.products[0], quantity: 1 }] 
      : [];

    if (cartItems.length === 0) {
      setValidationResult({ isValid: false, error: "Simulator requires at least 1 synced product. Please Force Sync first." });
      addLog('warn', "Checkout Simulation aborted: no synced products available in inventory.");
      return;
    }

    const checkoutResult = await processStorefrontCheckout(
      cartItems,
      {
        customerName: orderName,
        phone: orderPhone,
        city: orderCity,
        shippingAddress: orderAddress,
        paymentMethod: orderPayment,
      },
      "Optional voice customer details transcript"
    );

    if (checkoutResult.success) {
      setValidationResult({ isValid: true, error: null });
      addLog('info', `Order ${checkoutResult.orderId} processed successfully! Amount: Rs. ${cartItems[0].product.retailPricePKR.toLocaleString()}. Payment: ${orderPayment}.`);
    } else {
      setValidationResult({ isValid: false, error: checkoutResult.error });
      addLog('error', `Checkout rejected: ${checkoutResult.error}`);
    }
  };

  const addLog = useCallback((type: 'info' | 'warn' | 'error', message: string) => {
    setLogs((prev) => [
      {
        timestamp: new Date().toLocaleTimeString(),
        type,
        message,
      },
      ...prev,
    ]);
  }, []);

  const handleSync = useCallback(async (currentScenario: string, currentMissingKeys: boolean) => {
    setLoading(true);
    addLog('info', `Initializing inventory sync. Mode: ${currentMissingKeys ? 'UNCONFIGURED_KEYS' : currentScenario.toUpperCase()}`);
    
    try {
      const startTime = performance.now();
      const queryParams = new URLSearchParams();
      if (currentMissingKeys) {
        queryParams.append('missingKeys', 'true');
      } else {
        queryParams.append('scenario', currentScenario);
      }

      const res = await fetch(`/api/sync?${queryParams.toString()}`);
      const duration = (performance.now() - startTime).toFixed(1);

      if (!res.ok) {
        throw new Error(`Sync route HTTP failure (Status: ${res.status})`);
      }

      const result: InventorySyncResponse = await res.json();
      setData(result);

      if (result.error) {
        addLog('error', `Defensive Sync Warning: ${result.error}`);
        addLog('warn', `System automatically fell back to safe state. Products fetched: 0.`);
      } else {
        addLog('info', `Sync completed in ${duration}ms. ${result.products.length} products parsed successfully.`);
        
        // Scan for anomalies caught by our Zod schemas
        result.products.forEach((prod) => {
          if (prod.sku === 'UNKNOWN-SKU') {
            addLog('warn', `Anomalous item parsed: SKU was missing. Assigned 'UNKNOWN-SKU'.`);
          }
          if (prod.title === 'Unnamed Product') {
            addLog('warn', `Anomalous item parsed: Title was missing for SKU ${prod.sku}.`);
          }
          if (prod.stockAvailable === 0 && currentScenario !== 'empty_stock') {
            addLog('info', `Product ${prod.sku} stock level is 0 (marked OUT_OF_STOCK).`);
          }
        });
      }
    } catch (err) {
      addLog('error', `Sync action crashed: ${err instanceof Error ? err.message : 'Unknown exception'}`);
      setData({
        products: [],
        lastSynced: new Date().toISOString(),
        error: err instanceof Error ? err.message : 'Unexpected synchronization crash'
      });
    } finally {
      setLoading(false);
    }
  }, [addLog]);

  // Initial sync on mount
  useEffect(() => {
    handleSync('success', false);
    addLog('info', 'E-Commerce Dashboard initialized. Ready to sync supplier feed.');
  }, [handleSync, addLog]);

  const triggerScenario = (newScenario: string, newMissingKeys: boolean) => {
    setScenario(newScenario);
    setMissingKeys(newMissingKeys);
    handleSync(newScenario, newMissingKeys);
  };

  const totalStock = data?.products.reduce((acc, curr) => acc + curr.stockAvailable, 0) ?? 0;
  const inStockCount = data?.products.filter(p => p.stockAvailable > 0).length ?? 0;
  const outOfStockCount = data?.products.filter(p => p.stockAvailable === 0).length ?? 0;

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-title">
          <h1>Headless Control Hub</h1>
          <div className="header-subtitle">Defensive E-Commerce Supplier Sync System & Margin Protection</div>
        </div>
        <div className="state-indicator">
          <span className={`indicator-dot ${data?.error ? 'active-error' : (outOfStockCount > 0 ? 'active-warning' : 'active-success')}`}></span>
          <span>
            {loading ? 'SYNCING...' : (data?.error ? 'EXCEPTION CAPTURED' : 'SYSTEM HEALTHY')}
          </span>
        </div>
      </header>

      {/* Simulator Scenario Selectors */}
      <section className="glass-panel">
        <div className="panel-header">
          <h2 className="panel-title">
            <span className="panel-title-accent">01.</span> Supplier Feed Simulator
          </h2>
          <span className="badge badge-success">Live Mock API Connected</span>
        </div>
        <div className="controls-grid">
          <button 
            className={`control-btn ${!missingKeys && scenario === 'success' ? 'active' : ''}`}
            onClick={() => triggerScenario('success', false)}
            disabled={loading}
          >
            <span>Normal Active Feed</span>
            <span className="btn-desc">Successful responses, valid products, full stocks.</span>
          </button>
          
          <button 
            className={`control-btn ${!missingKeys && scenario === 'empty_stock' ? 'active mode-empty' : ''}`}
            onClick={() => triggerScenario('empty_stock', false)}
            disabled={loading}
          >
            <span>Zero Stock Feed</span>
            <span className="btn-desc">Valid products, all stocks 0. Checks fallback map.</span>
          </button>

          <button 
            className={`control-btn ${!missingKeys && scenario === 'malformed_data' ? 'active mode-malformed' : ''}`}
            onClick={() => triggerScenario('malformed_data', false)}
            disabled={loading}
          >
            <span>Malformed Feed</span>
            <span className="btn-desc">Missing SKU/Name, string numbers, negative stock.</span>
          </button>

          <button 
            className={`control-btn ${!missingKeys && scenario === 'api_error' ? 'active mode-error' : ''}`}
            onClick={() => triggerScenario('api_error', false)}
            disabled={loading}
          >
            <span>Supplier API Outage</span>
            <span className="btn-desc">API responds with 500 error. Tests fallback boundary.</span>
          </button>

          <button 
            className={`control-btn ${missingKeys ? 'active mode-error' : ''}`}
            onClick={() => triggerScenario('success', true)}
            disabled={loading}
          >
            <span>Missing API Secrets</span>
            <span className="btn-desc">Deletes process.env keys to test production crashes.</span>
          </button>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="dashboard-grid">
        {/* Left Column: Product Table */}
        <section className="glass-panel">
          <div className="panel-header">
            <h2 className="panel-title">
              <span className="panel-title-accent">02.</span> Synced Product Inventory
            </h2>
            <button 
              className="btn-retry" 
              onClick={() => handleSync(scenario, missingKeys)}
              disabled={loading}
            >
              {loading ? 'Syncing...' : 'Force Sync Now'}
            </button>
          </div>

          {data?.error && (
            <div className="alert-box">
              <div className="alert-title">
                ⚠️ Synchronization Safety Protocol Triggered
              </div>
              <div>{data.error}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                The core application was protected from crashing. The components are rendering the safe fallback state.
              </div>
            </div>
          )}

          {!data?.error && (!data?.products || data.products.length === 0) ? (
            <div className="alert-box" style={{ background: 'var(--color-warning-bg)', color: 'var(--color-warning)', borderColor: 'rgba(245, 158, 11, 0.2)' }}>
              <div className="alert-title">
                ⚠️ Empty Product Catalog Mapped
              </div>
              <div>The sync returned no products, or all synced products failed runtime validation checks.</div>
            </div>
          ) : null}

          {data && data.products.length > 0 && (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product details</th>
                    <th>Supplier Cost (USD)</th>
                    <th>Retail Price (PKR)</th>
                    <th>Stock Status</th>
                    <th>Qty Available</th>
                  </tr>
                </thead>
                <tbody>
                  {data.products.map((product) => (
                    <tr key={product.sku}>
                      <td>
                        <div className="product-cell">
                          <img 
                            src={product.imageUrl} 
                            alt={product.title} 
                            className="product-img"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                            }}
                          />
                          <div className="product-details">
                            <span className="product-title">{product.title}</span>
                            <span className="product-sku">{product.sku}</span>
                          </div>
                        </div>
                      </td>
                      <td>${product.supplierPriceUSD.toFixed(2)} USD</td>
                      <td>
                        <strong style={{ color: 'var(--color-secondary)' }}>
                          Rs. {product.retailPricePKR.toLocaleString()}
                        </strong>
                      </td>
                      <td>
                        {product.stockAvailable > 10 ? (
                          <span className="badge badge-success">IN_STOCK</span>
                        ) : product.stockAvailable > 0 ? (
                          <span className="badge badge-warning">LOW_STOCK</span>
                        ) : (
                          <span className="badge badge-error">OUT_OF_STOCK</span>
                        )}
                      </td>
                      <td>
                        <span style={{ fontFamily: 'var(--font-mono)' }}>
                          {product.stockAvailable} units
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Right Column: Console Logs & Core Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* System KPIs */}
          <section className="glass-panel system-card">
            <h2 className="panel-title">
              <span className="panel-title-accent">03.</span> Sync Metrics
            </h2>
            
            <div className="card-metric">
              <span className="metric-label">Total Synced Products</span>
              <span className="metric-value">{data?.products.length ?? 0}</span>
            </div>

            <div className="card-metric">
              <span className="metric-label">Active In-Stock SKU count</span>
              <span className="metric-value">{inStockCount}</span>
            </div>

            <div className="card-metric">
              <span className="metric-label">Cumulative Qty</span>
              <span className="metric-value">{totalStock} units</span>
            </div>

            <div className="card-metric">
              <span className="metric-label">API Rate Limit Cache</span>
              <span className="metric-value" style={{ color: 'var(--color-success)' }}>
                3600s (Revalidate)
              </span>
            </div>

            <div className="card-metric" style={{ borderBottom: 'none' }}>
              <span className="metric-label">Last Successful Sync</span>
              <span className="metric-value" style={{ fontSize: '0.75rem', fontWeight: 'normal' }}>
                {data ? new Date(data.lastSynced).toLocaleTimeString() : 'Never'}
              </span>
            </div>
          </section>

          {/* Real-time Logs Console */}
          <section className="glass-panel" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <h2 className="panel-title" style={{ marginBottom: '1rem' }}>
              <span className="panel-title-accent">04.</span> Defensive Sync Logs
            </h2>
            <div className="logs-console">
              {logs.map((log, index) => (
                <div key={index} className={`log-entry ${log.type}`}>
                  <span className="log-timestamp">[{log.timestamp}]</span>
                  <span className="log-message">{log.message}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Pakistani Order Checkout Simulator */}
          <section className="glass-panel">
            <h2 className="panel-title" style={{ marginBottom: '1rem' }}>
              <span className="panel-title-accent">05.</span> Order Courier Checks
            </h2>
            <form onSubmit={handleOrderValidate} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Customer Name</label>
                <input 
                  type="text" 
                  value={orderName} 
                  onChange={(e) => setOrderName(e.target.value)} 
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '0.5rem', color: '#fff', fontSize: '0.85rem' }} 
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Mobile Number (PK Rider-Ready)</label>
                <input 
                  type="text" 
                  value={orderPhone} 
                  onChange={(e) => setOrderPhone(e.target.value)} 
                  placeholder="e.g. 03001234567" 
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '0.5rem', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }} 
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Shipping Address (15+ Chars Required)</label>
                <input 
                  type="text" 
                  value={orderAddress} 
                  onChange={(e) => setOrderAddress(e.target.value)} 
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '0.5rem', color: '#fff', fontSize: '0.85rem' }} 
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>City</label>
                  <select 
                    value={orderCity} 
                    onChange={(e) => setOrderCity(e.target.value)} 
                    style={{ background: 'rgba(18, 16, 35, 0.95)', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '0.5rem', color: '#fff', fontSize: '0.85rem' }}
                  >
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Payment Method</label>
                  <select 
                    value={orderPayment} 
                    onChange={(e) => setOrderPayment(e.target.value as any)} 
                    style={{ background: 'rgba(18, 16, 35, 0.95)', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '0.5rem', color: '#fff', fontSize: '0.85rem' }}
                  >
                    <option value="COD">Cash on Delivery</option>
                    <option value="CARD">Debit/Credit Card</option>
                    <option value="EASYPAISA_JAZZCASH">EasyPaisa / JazzCash</option>
                  </select>
                </div>
              </div>
              
              <button 
                type="submit" 
                style={{ 
                  background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)', 
                  border: 'none', 
                  padding: '0.75rem', 
                  borderRadius: '8px', 
                  color: '#fff', 
                  fontWeight: 600, 
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                  fontSize: '0.85rem',
                  boxShadow: 'var(--shadow-glow)',
                  transition: 'all 0.2s'
                }}
              >
                Validate Order Setup
              </button>
            </form>

            {validationResult && (
              <div 
                style={{ 
                  marginTop: '0.75rem', 
                  padding: '0.75rem', 
                  borderRadius: '8px', 
                  border: '1px solid',
                  fontSize: '0.8rem',
                  background: validationResult.isValid ? 'var(--color-success-bg)' : 'var(--color-error-bg)',
                  borderColor: validationResult.isValid ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  color: validationResult.isValid ? 'var(--color-success)' : 'var(--color-error)'
                }}
              >
                {validationResult.isValid ? '✓ Verification Passed: Mobile number and street address formats conform to delivery standards.' : `✗ Validation Warning: ${validationResult.error}`}
              </div>
            )}
          </section>
        </div>
      </div>
      
      {/* Defensive E-Commerce Rules Alert footer */}
      <footer className="glass-panel" style={{ background: 'rgba(6, 182, 212, 0.03)', borderColor: 'rgba(6, 182, 212, 0.1)' }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--color-secondary)', marginBottom: '0.5rem', fontWeight: 700 }}>
          🔒 E-Commerce Safety & Defensive Coding System Enabled
        </h3>
        <ul style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <li><strong>Zero Hardcoded Secrets:</strong> Checked at server boundary. If <code>process.env</code> variables are deleted, execution fails cleanly back to a config warning payload instead of crashing the process.</li>
          <li><strong>Zod Type Guarding:</strong> External payloads pass through raw schemas. Missing text names, null fields, and negative stock quantities are safely converted to system defaults.</li>
          <li><strong>Rate Limit Caching:</strong> All external API fetches run with <code>next: &#123; revalidate: 3600 &#125;</code> headers to safeguard supplier endpoint rate limits.</li>
        </ul>
      </footer>
    </div>
  );
}
