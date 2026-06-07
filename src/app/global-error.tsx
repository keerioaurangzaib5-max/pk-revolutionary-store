'use client';

import React, { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Captured by root global error boundary:', error);
  }, [error]);

  return (
    <html lang="en" style={{ height: '100%' }}>
      <body 
        style={{
          margin: 0,
          padding: '2rem 1.5rem',
          height: '100%',
          backgroundColor: '#030303',
          color: '#f3f4f6',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box'
        }}
      >
        <div 
          style={{
            background: 'rgba(18, 16, 35, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '2.5rem 2rem',
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}
        >
          <div style={{ fontSize: '3.5rem', color: '#ef4444' }}>⚠️</div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ef4444', margin: 0 }}>
            Critical System Outage
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
            A critical root-level routing or layout error occurred. 
            The system successfully intercepted the failure to prevent server-wide disruption.
          </p>
          <div 
            style={{ 
              background: 'rgba(239, 68, 68, 0.05)', 
              border: '1px solid rgba(239, 68, 68, 0.15)', 
              padding: '1rem', 
              borderRadius: '8px', 
              fontFamily: 'monospace', 
              fontSize: '0.8rem', 
              color: '#ef4444',
              wordBreak: 'break-all',
              textAlign: 'left'
            }}
          >
            {error.message || 'Fatal system layout exception.'}
          </div>
          <button 
            style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.75rem',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.15)'
            }}
            onClick={() => reset()}
          >
            Reinitialize Application
          </button>
        </div>
      </body>
    </html>
  );
}
