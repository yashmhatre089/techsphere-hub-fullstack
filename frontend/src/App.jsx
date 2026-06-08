import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import ProductCard from './components/ProductCard';
import AddProductForm from './components/AddProductForm';
import ProductDetails from './components/ProductDetails';
import { CheckCircle, Trash2 } from 'lucide-react';

export default function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('tech_auth')) || null);
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
  const [sort, setSort] = useState('default');
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('tech_cart')) || []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutDone, setCheckoutDone] = useState(false);

  const loadNetworkDatabase = () => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Database tracking link dropped:", err));
  };

  useEffect(() => {
    if (user) loadNetworkDatabase();
  }, [user]);

  useEffect(() => {
    localStorage.setItem('tech_cart', JSON.stringify(cart));
  }, [cart]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!emailInput || !passInput) return;
    const sessionUser = { email: emailInput };
    localStorage.setItem('tech_auth', JSON.stringify(sessionUser));
    setUser(sessionUser);
    navigate('/catalog');
  };

  const handleLogout = () => {
    localStorage.removeItem('tech_auth');
    setUser(null);
    navigate('/');
  };

  const addToCart = (p) => {
    setCart(curr => {
      const exist = curr.find(i => i.id === p.id);
      if (exist) return curr.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...curr, { ...p, qty: 1 }];
    });
  };

  const dropCartItem = (id) => setCart(curr => curr.filter(i => i.id !== id));
  const cartSum = cart.reduce((total, i) => total + (i.price * i.qty), 0);

  const executeCheckout = () => {
    setCheckoutDone(true);
    setCart([]);
    setTimeout(() => {
      setCheckoutDone(false);
      setIsCartOpen(false);
    }, 2000);
  };

  const computedProducts = products.filter(p => {
    const queryMatch = p.name.toLowerCase().includes(search.toLowerCase());
    const catMatch = cat === 'All' || p.category === cat;
    return queryMatch && catMatch;
  });

  if (sort === 'low') computedProducts.sort((a, b) => a.price - b.price);
  if (sort === 'high') computedProducts.sort((a, b) => b.price - a.price);

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '60px' }}>
      {user && <Header cartCount={cart.reduce((a, c) => a + c.qty, 0)} onLogout={handleLogout} user={user} onCartOpen={() => setIsCartOpen(true)} />}

      <Routes>
        {/* VIEW PATH 1: ENTRY PORTAL LOGIN CHECKPOINT */}
        <Route path="/" element={
          !user ? (
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
              <form onSubmit={handleLogin} className="glow-panel" style={{ padding: '40px', width: '100%', maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                  <h2 style={{ margin: '0 0 4px 0', fontSize: '22px', letterSpacing: '0.5px' }}>SECURE ACCESS</h2>
                  <p style={{ margin: '0', color: 'var(--text-muted)', fontSize: '12px' }}>Decrypt router application nodes.</p>
                </div>
                <input type="email" placeholder="Operator Mail ID" value={emailInput} onChange={e => setEmailInput(e.target.value)} className="matrix-input" required />
                <input type="password" placeholder="Terminal Passkey" value={passInput} onChange={e => setPassInput(e.target.value)} className="matrix-input" required />
                <button type="submit" className="cyber-btn" style={{ padding: '12px', fontSize: '13px' }}>INITIALIZE GATEWAY</button>
              </form>
            </div>
          ) : <Navigate to="/catalog" />
        } />

        {/* VIEW PATH 2: ELECTRONICS CATALOG MARKETPLACE */}
        <Route path="/catalog" element={
          user ? (
            <div>
              <Hero />
              <FilterBar search={search} setSearch={setSearch} cat={cat} setCat={setCat} sort={sort} setSort={setSort} />
              <div style={{ padding: '0 6%', marginTop: '10px' }}>
                <h2 style={{ fontSize: '18px', color: 'var(--cyber-blue)', marginBottom: '16px' }}>Live Inventory Registry ({computedProducts.length})</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                  {computedProducts.map(p => <ProductCard key={p.id} product={p} onAddToCart={addToCart} />)}
                </div>
              </div>
            </div>
          ) : <Navigate to="/" />
        } />

        {/* VIEW PATH 3: DEDICATED INSERT PANEL ADMIN CONSOLE */}
        <Route path="/admin" element={
          user ? (
            <div style={{ padding: '40px 6%' }}>
              <h1 style={{ fontSize: '24px', textAlign: 'center', marginBottom: '4px', fontWeight: '800' }}>Admin Routing Console</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center', marginBottom: '24px' }}>Isolate entry workflows syncing directly to database.json system structures.</p>
              <AddProductForm onProductAdded={() => { loadNetworkDatabase(); navigate('/catalog'); }} />
            </div>
          ) : <Navigate to="/" />
        } />

        {/* VIEW PATH 4: MULTI-PAGE COMPONENT PRODUCT PROFILES */}
        <Route path="/product/:id" element={user ? <ProductDetails onAddToCart={addToCart} /> : <Navigate to="/" />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Slide-out Ledger Drawer Component */}
      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, background: 'rgba(11,15,25,0.7)', backdropFilter: 'blur(5px)', zIndex: 300, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '100%', maxWidth: '380px', background: 'var(--bg-dark)', borderLeft: '1px solid var(--border-line)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>Allocation Ledger</h3>
              <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '13px' }}>[ Close ]</button>
            </div>
            {checkoutDone ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', margin: 'auto 0', color: 'var(--cyber-blue)' }}><CheckCircle size={36} /><h4>Vault Sync Complete!</h4></div>
            ) : cart.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '80px', fontSize: '14px' }}>Matrix registry empty.</p>
            ) : (
              <>
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {cart.map(i => (
                    <div key={i.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '10px', borderBottom: '1px solid var(--border-line)' }}>
                      <img src={i.image} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} alt="" />
                      <div style={{ flex: 1 }}><h5 style={{ margin: '0 0 2px 0', fontSize: '13px' }}>{i.name}</h5><span style={{ fontSize: '11px', color: 'var(--cyber-blue)', fontWeight: 'bold' }}>{i.qty}x - ₹{i.price.toLocaleString('en-IN')}</span></div>
                      <button onClick={() => dropCartItem(i.id)} style={{ background: 'none', border: 'none', color: '#ff4757', cursor: 'pointer' }}><Trash2 size={14} /></button>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: '1px solid var(--border-line)', paddingTop: '14px', marginTop: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', fontSize: '16px', fontWeight: 'bold' }}><span>Total Aggregation:</span><span>₹{cartSum.toLocaleString('en-IN')}</span></div>
                  <button onClick={executeCheckout} className="cyber-btn" style={{ width: '100%', padding: '12px', fontSize: '14px' }}>Execute Vault Checkout</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}