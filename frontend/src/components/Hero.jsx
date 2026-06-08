import React from 'react';

export default function Hero() {
  return (
    <div style={{ textAlign: 'center', padding: '36px 6% 16px' }}>
      <h1 style={{ fontSize: '40px', fontWeight: '900', margin: '0 0 10px 0', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        FUTURE OPERATIONAL CORE
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '600px', margin: '0 auto' }}>
        Multi-page system application framework linked to text-file data streams. Access isolated page layouts managed via local client history tracking.
      </p>
    </div>
  );
}