import React from 'react';
import { ShoppingBag, Sun, Moon, Laptop } from 'lucide-react';

export default function Navbar({ cartCount, theme, toggleTheme, onOpenCart }) {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'nav-layout',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 6%',
      borderBottom: '1px solid var(--glass-border)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '22px', fontWeight: '800', letterSpacing: '0.5px' }}>
        <Laptop size={24} color="var(--accent-blue)" />
        TECH<span>SPHERE</span>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <button onClick={toggleTheme} style={{ background: 'none', border: 'none', color: 'var(--text-color)', cursor: 'pointer' }}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button onClick={onOpenCart} style={{ background: 'none', border: 'none', color: 'var(--text-color)', cursor: 'pointer', position: 'relative' }}>
          <ShoppingBag size={22} />
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-6px',
              right: '-8px',
              background: 'var(--accent-blue)',
              color: 'white',
              fontSize: '11px',
              padding: '2px 6px',
              borderRadius: '50%',
              fontWeight: 'bold'
            }}>{cartCount}</span>
          )}
        </button>
      </div>
    </nav>
  );
}