import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Zap } from 'lucide-react';

export default function ProductDetails({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        const matchingProduct = data.find(p => p.id === id);
        setItem(matchingProduct);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ color: 'var(--cyber-blue)', textAlign: 'center', marginTop: '80px' }}>Syncing Data Matrix Nodes...</div>;
  if (!item) return <div style={{ color: '#ff4757', textAlign: 'center', marginTop: '80px' }}>Asset not found in database layer.</div>;

  return (
    <div style={{ padding: '30px 6%', maxWidth: '900px', margin: '0 auto' }}>
      <button onClick={() => navigate('/catalog')} className="category-pill" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: '1px solid var(--border-line)', cursor: 'pointer', marginBottom: '20px' }}>
        <ArrowLeft size={14} /> Return to Storefront Stream
      </button>

      <div className="glow-panel" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', padding: '30px' }}>
        <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-line)', height: '320px' }}>
          <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span style={{ color: 'var(--cyber-blue)', fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px', background: 'rgba(0,242,254,0.08)', padding: '4px 8px', borderRadius: '4px' }}>{item.category.toUpperCase()}</span>
            <h1 style={{ fontSize: '26px', margin: '12px 0 6px 0', fontWeight: '800' }}>{item.name}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.5', margin: '0 0 20px 0' }}>{item.desc}</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-muted)', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ShieldCheck size={14} color="var(--cyber-blue)" /> Fully Synchronized Storage Registry</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Zap size={14} color="var(--cyber-blue)" /> Core Telemetry Parameters Verified</div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-line)', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>UNIT ACQUISITION VALUE</div>
              <div style={{ fontSize: '30px', fontWeight: '900' }}>₹{item.price.toLocaleString('en-IN')}</div>
            </div>
            <button onClick={() => onAddToCart(item)} className="cyber-btn" style={{ padding: '12px 24px', fontSize: '14px' }}>Deploy Component</button>
          </div>
        </div>
      </div>
    </div>
  );
}