import React, { useState } from 'react';
import { Cpu } from 'lucide-react';

export default function AddProductForm({ onProductAdded }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Phones');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');

  const submitAction = (e) => {
    e.preventDefault();
    if (!name || !price || !desc) return;

    fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, category, price, desc })
    })
    .then(res => res.json())
    .then(() => {
      onProductAdded();
      setName('');
      setPrice('');
      setDesc('');
    });
  };

  return (
    <form onSubmit={submitAction} className="glow-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--cyber-blue)', fontWeight: 'bold', fontSize: '14px' }}>
        <Cpu size={16} /> DATA STRUCTURE INJECTION TERMINAL
      </div>
      <input type="text" placeholder="Component Name" value={name} onChange={e => setName(e.target.value)} className="matrix-input" required />
      
      <select value={category} onChange={e => setCategory(e.target.value)} className="matrix-input" style={{ background: 'var(--bg-dark)' }}>
        <option value="Phones">Phones</option>
        <option value="Laptops">Laptops</option>
        <option value="Audio">Audio</option>
        <option value="Cameras">Cameras</option>
        <option value="Wearables">Wearables</option>
      </select>

      <input type="number" placeholder="Price Matrix (INR)" value={price} onChange={e => setPrice(e.target.value)} className="matrix-input" required />
      <input type="text" placeholder="Telemetry Overview Specifications" value={desc} onChange={e => setDesc(e.target.value)} className="matrix-input" required />
      
      <button type="submit" className="cyber-btn" style={{ padding: '12px', marginTop: '6px' }}>Commit to Database System</button>
    </form>
  );
}