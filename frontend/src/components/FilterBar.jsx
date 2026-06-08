import React from 'react';

export default function FilterBar({ search, setSearch, cat, setCat, sort, setSort }) {
  const options = ['All', 'Phones', 'Laptops', 'Audio', 'Cameras', 'Wearables'];

  return (
    <div style={{ padding: '16px 6%', display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {options.map(o => (
          <button key={o} onClick={() => setCat(o)} className={`category-pill`} style={{ background: cat === o ? 'var(--cyber-blue)' : 'var(--panel-bg)', color: cat === o ? '#0b0f19' : '#fff', fontWeight: cat === o ? '700' : '400', border: '1px solid var(--border-line)' }}>{o}</button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '550px' }}>
        <input type="text" placeholder="Search operational asset key..." value={search} onChange={e => setSearch(e.target.value)} className="matrix-input" style={{ flex: 1 }} />
        <select value={sort} onChange={e => setSort(e.target.value)} className="matrix-input" style={{ background: 'var(--bg-dark)' }}>
          <option value="default">Standard Order</option>
          <option value="low">Value: Low → High</option>
          <option value="high">Value: High → Low</option>
        </select>
      </div>
    </div>
  );
}