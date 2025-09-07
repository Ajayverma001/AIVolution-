import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";
const SESSION_ID = "demo-session-1"; // simple fixed session for demo; you can randomize per user.

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [] });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  async function fetchProducts() {
    try {
      const res = await axios.get(`${API}/products`);
      setProducts(res.data);
    } catch (e) { console.error(e); }
  }

  async function fetchCart() {
    try {
      const res = await axios.get(`${API}/cart`, { headers: { "X-Session-Id": SESSION_ID }});
      setCart(res.data.cart);
      setTotal(res.data.total_cents || 0);
    } catch (e) { console.error(e); }
  }

  async function addToCart(productId) {
    try {
      const res = await axios.post(`${API}/cart/add`, { productId, quantity: 1 }, { headers: { "X-Session-Id": SESSION_ID }});
      setCart(res.data.cart);
      setTotal(res.data.total_cents);
    } catch (e) { console.error(e); }
  }

  async function removeFromCart(productId) {
    try {
      const res = await axios.post(`${API}/cart/remove`, { productId }, { headers: { "X-Session-Id": SESSION_ID }});
      setCart(res.data.cart);
      setTotal(res.data.total_cents);
    } catch (e) { console.error(e); }
  }

  async function checkout() {
    if (!cart.items.length) return alert("Cart is empty");
    setLoading(true);
    try {
      const res = await axios.post(`${API}/checkout`, { sessionId: SESSION_ID }, { headers: { "X-Session-Id": SESSION_ID }});
      setLoading(false);
      if (res.data.success) {
        alert("Order placed! (payment simulated)");
        setCart({ items: [] });
        setTotal(0);
      } else {
        alert("Checkout failed: " + (res.data.error || "Unknown"));
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Checkout error");
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>🛍️ Demo E-commerce Store</h1>
        <div>
          <strong>Cart:</strong> {cart.items.length} item(s) • <span className="small">Total: ₹{(total/100).toFixed(2)}</span>
        </div>
      </div>

      <section>
        <h2>Products</h2>
        <div className="products">
          {products.map(p => (
            <div className="card" key={p.id}>
              <h3>{p.title}</h3>
              <p className="small">{p.description}</p>
              <p><strong>₹{(p.price_cents/100).toFixed(2)}</strong></p>
              <button onClick={() => addToCart(p.id)}>Add to cart</button>
            </div>
          ))}
        </div>
      </section>

      <section className="cart">
        <h2>Shopping Cart</h2>
        {cart.items.length === 0 ? <p className="small">Cart is empty</p> : (
          <>
            {cart.items.map(it => (
              <div className="cart-item" key={it.productId}>
                <div>
                  <div><strong>{it.title}</strong></div>
                  <div className="small">Qty: {it.quantity} • ₹{(it.price_cents/100).toFixed(2)}</div>
                </div>
                <div>
                  <button onClick={() => removeFromCart(it.productId)}>Remove</button>
                </div>
              </div>
            ))}
            <div style={{marginTop:12}}>
              <strong>Total: ₹{(total/100).toFixed(2)}</strong>
            </div>
            <div style={{marginTop:8}}>
              <button onClick={checkout} disabled={loading}>{loading ? "Processing..." : "Checkout (simulate)"}</button>
            </div>
          </>
        )}
      </section>
    </div>
  )
}
