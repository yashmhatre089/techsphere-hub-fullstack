import React from 'react';
import { NavLink } from 'react-router-dom';
import { Terminal, ShoppingCart, LogOut, LayoutGrid, PlusCircle } from 'lucide-react';

export default function Header({ cartCount, onLogout, user, onCartOpen }) {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 6%', borderBottom: '1px solid var(--border-line)', background: 'rgba(11,15,25,0.7)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100 }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '20px', fontWeight: '900', letterSpacing: '1px' }}>
        <Terminal color="var(--cyber-blue)" size={24} />
        TECH<span style={{ color: 'var(--cyber-blue)' }}>SPHERE</span>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <NavLink to="/catalog" className="category-pill" style={({ isActive }) => ({ background: isActive ? 'var(--cyber-blue)' : 'transparent', color: isActive ? '#0b0f19' : '#fff', fontWeight: isActive ? '700' : '400', display: 'flex', alignItems: 'center', gap: '6px' })}>
          <LayoutGrid size={15} /> Storefront Catalog
        </NavLink>
        <NavLink to="/admin" className="category-pill" style={({ isActive }) => ({ background: isActive ? 'var(--cyber-blue)' : 'transparent', color: isActive ? '#0b0f19' : '#fff', fontWeight: isActive ? '700' : '400', display: 'flex', alignItems: 'center', gap: '6px' })}>
          <PlusCircle size={15} /> Admin Console
        </NavLink>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>OPERATOR: <strong style={{ color: '#fff' }}>{user.email.split('@')[0]}</strong></span>
        
        <button onClick={onCartOpen} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', position: 'relative' }}>
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span style={{ position: 'absolute', top: '-6px', right: '-8px', background: 'var(--cyber-blue)', color: '#0b0f19', fontSize: '10px', padding: '2px 5px', borderRadius: '50%', fontWeight: '900' }}>{cartCount}</span>
          )}
        </button>

        <button onClick={onLogout} style={{ background: 'none', border: 'none', color: '#ff4757', cursor: 'pointer' }}>
          <LogOut size={18} />
        </button>
      </div>
    </nav>
  );
}