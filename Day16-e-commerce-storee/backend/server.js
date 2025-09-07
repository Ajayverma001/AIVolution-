const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory products (id, title, description, price cents)
let products = [
  { id: 1, title: "Classic T-Shirt", description: "100% cotton, comfy.", price_cents: 1999, image: "" },
  { id: 2, title: "Sneakers", description: "Lightweight running shoes.", price_cents: 4599, image: "" },
  { id: 3, title: "Wireless Headphones", description: "Noise-cancelling.", price_cents: 8999, image: "" }
];

// In-memory carts keyed by sessionId (very simple, for demo)
let carts = {};

// Helpers
function getCartTotal(cart) {
  if (!cart || !cart.items) return 0;
  return cart.items.reduce((s, it) => s + it.price_cents * it.quantity, 0);
}

// Routes
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Get cart by sessionId header (X-Session-Id) or ?sessionId=...
app.get("/api/cart", (req, res) => {
  const sessionId = req.headers["x-session-id"] || req.query.sessionId || "anon";
  const cart = carts[sessionId] || { items: [] };
  res.json({ cart, total_cents: getCartTotal(cart) });
});

app.post("/api/cart/add", (req, res) => {
  const sessionId = req.headers["x-session-id"] || req.body.sessionId || "anon";
  const { productId, quantity = 1 } = req.body;
  const prod = products.find(p => p.id == productId);
  if (!prod) return res.status(404).json({ error: "Product not found" });

  if (!carts[sessionId]) carts[sessionId] = { items: [] };
  const cart = carts[sessionId];

  const existing = cart.items.find(i => i.productId == productId);
  if (existing) existing.quantity += quantity;
  else cart.items.push({ productId: prod.id, title: prod.title, price_cents: prod.price_cents, quantity });

  res.json({ cart, total_cents: getCartTotal(cart) });
});

app.post("/api/cart/remove", (req, res) => {
  const sessionId = req.headers["x-session-id"] || req.body.sessionId || "anon";
  const { productId } = req.body;
  const cart = carts[sessionId] || { items: [] };
  cart.items = cart.items.filter(i => i.productId != productId);
  carts[sessionId] = cart;
  res.json({ cart, total_cents: getCartTotal(cart) });
});

// Checkout (demo): accepts cart and returns success.
// In real app, you'd call Stripe/PayPal here with secret keys.
app.post("/api/checkout", (req, res) => {
  const sessionId = req.headers["x-session-id"] || req.body.sessionId || "anon";
  const cart = carts[sessionId] || { items: [] };
  const total = getCartTotal(cart);
  if (total === 0) return res.status(400).json({ error: "Cart is empty" });

  // --- PAYMENT INTEGRATION PLACEHOLDER ---
  // Replace this block with Stripe Checkout / PaymentIntent code.
  // Example: create PaymentIntent with stripe.paymentIntents.create({amount: total, currency: 'usd'});
  // --------------------------------------

  // For demo: "empty" the cart and return success
  carts[sessionId] = { items: [] };
  res.json({ success: true, message: "Payment simulated — order placed", total_cents: total });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`E-commerce backend running on http://localhost:${PORT}`));




