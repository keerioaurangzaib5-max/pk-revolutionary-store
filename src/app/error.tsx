'use client';

import React, { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an external service or internal logs
    console.error('Captured by route error boundary:', error);
  }, [error]);

  return (
    <div className="app-container">
      <div className="glass-panel error-boundary-container">
        <div className="error-icon">⚠️</div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-error)' }}>
          Interface Render Failure
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
          A client-side exception was intercepted. Our defensive layout prevented a full website crash. 
          The error details have been logged.
        </p>
        <div 
          style={{ 
            background: 'rgba(239, 68, 68, 0.05)', 
            border: '1px solid rgba(239, 68, 68, 0.15)', 
            padding: '1rem', 
            borderRadius: '8px', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.8rem', 
            color: 'var(--color-error)',
            wordBreak: 'break-all',
            width: '100%'
          }}
        >
          {error.message || 'An unexpected rendering error occurred.'}
        </div>
        <button className="btn-retry" onClick={() => reset()}>
          Attempt Recovery
        </button>
      </div>
    </div>
  );
}
