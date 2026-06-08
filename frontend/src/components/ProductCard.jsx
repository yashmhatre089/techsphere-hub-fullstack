import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="glow-panel" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', height: '150px' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <span style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(11,15,25,0.8)', padding: '3px 6px', borderRadius: '4px', fontSize: '10px', color: 'var(--cyber-blue)', fontWeight: 'bold' }}>{product.category}</span>
      </div>
      <div>
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: '700', color: '#fff' }}>{product.name}</h3>
        </Link>
        <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: 'var(--text-muted)', height: '34px', overflow: 'hidden', lineHeigh: '1.4' }}>{product.desc}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
          <span style={{ fontSize: '18px', fontWeight: '800' }}>₹{product.price.toLocaleString('en-IN')}</span>
          <button onClick={() => onAddToCart(product)} className="cyber-btn" style={{ padding: '6px 12px', fontSize: '12px' }}>Deploy</button>
        </div>
      </div>
    </div>
  );
}