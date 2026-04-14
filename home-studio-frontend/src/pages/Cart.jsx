import { useState, useEffect } from "react";
const API = "http://localhost:8080/api";

export default function Cart({ user, navigate }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    if (!user) { navigate("login"); return; }
    fetchCart();
  }, [user]);

  const fetchCart = async () => {
    setLoading(true);
    try { const res = await fetch(`${API}/cart/${user.userId}`); const data = await res.json(); setCartItems(data); }
    catch { setCartItems([]); }
    setLoading(false);
  };

  const removeItem = async (cartItemId) => {
    try {
      await fetch(`${API}/cart/remove/${cartItemId}`, { method: "DELETE" });
      setCartItems(cartItems.filter(item => item.cartItemId !== cartItemId));
    } catch {}
  };

  const placeOrder = async () => {
    setPlacing(true);
    try {
      const res = await fetch(`${API}/orders/place/${user.userId}`, { method: "POST" });
      if (res.ok) { setOrdered(true); setCartItems([]); }
    } catch {}
    setPlacing(false);
  };

  const total = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

  if (ordered) return (
    <div style={{ minHeight: "calc(100vh - 72px)", display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F0E8" }}>
      <div style={{ textAlign: "center", padding: "40px" }}>
        <div style={{ width: "60px", height: "1px", background: "#6B7A4E", margin: "0 auto 24px" }} />
        <h2 className="section-title" style={{ color: "#6B7A4E", fontSize: "36px" }}>Order Placed!</h2>
        <p style={{ fontFamily: "'Jost', sans-serif", color: "#7A6555", margin: "16px 0 32px", fontWeight: 300 }}>Your order has been successfully placed.</p>
        <button className="btn-primary" onClick={() => navigate("orders")}>View My Orders</button>
      </div>
    </div>
  );

  return (
    <div className="fade-in">
      <div style={{ background: "#2C1F14", padding: "64px 48px 48px", borderBottom: "1px solid #4A3728" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p className="label" style={{ color: "#C4714A" }}>Your Selection</p>
          <h1 className="section-title" style={{ color: "#F5F0E8", fontSize: "48px" }}>Shopping Cart</h1>
          <div style={{ width: "48px", height: "1px", background: "#C4714A", margin: "20px 0 0" }} />
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 32px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px", fontFamily: "'Jost', sans-serif", color: "#7A6555" }}>Loading cart...</div>
        ) : cartItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px" }}>
            <h2 className="section-title" style={{ fontSize: "28px", color: "#7A6555", marginBottom: "24px" }}>Your cart is empty</h2>
            <button className="btn-primary" onClick={() => navigate("products")}>Browse Products</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "40px" }}>
            <div>
              <p className="label" style={{ marginBottom: "16px" }}>{cartItems.length} Item{cartItems.length > 1 ? "s" : ""}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                {cartItems.map(item => (
                  <div key={item.cartItemId} style={{ background: "#FDFAF4", border: "1px solid #D4C5A9", padding: "24px", display: "flex", gap: "20px", alignItems: "center" }}>
                    <div style={{ width: "80px", height: "80px", background: "#EDE5D0", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {item.product?.imageUrl ? <img src={item.product.imageUrl} alt={item.product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "24px", height: "1px", background: "#C4714A" }} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#C4714A", marginBottom: "4px" }}>{item.product?.category?.categoryName}</p>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 500, color: "#2C1F14", marginBottom: "4px" }}>{item.product?.name}</h3>
                      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "13px", color: "#7A6555" }}>Qty: {item.quantity}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 500, color: "#2C1F14", marginBottom: "12px" }}>₹{((item.product?.price || 0) * item.quantity).toLocaleString()}</p>
                      <button onClick={() => removeItem(item.cartItemId)} style={{ background: "none", border: "1px solid #D4C5A9", padding: "6px 14px", fontFamily: "'Jost', sans-serif", fontSize: "11px", color: "#7A6555", cursor: "pointer", transition: "all 0.2s" }}
                        onMouseEnter={e => { e.target.style.borderColor = "#A85A35"; e.target.style.color = "#A85A35"; }}
                        onMouseLeave={e => { e.target.style.borderColor = "#D4C5A9"; e.target.style.color = "#7A6555"; }}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="label" style={{ marginBottom: "16px" }}>Order Summary</p>
              <div className="card" style={{ padding: "32px" }}>
                <div style={{ borderBottom: "1px solid #D4C5A9", paddingBottom: "20px", marginBottom: "20px" }}>
                  {cartItems.map(item => (
                    <div key={item.cartItemId} style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                      <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "13px", color: "#7A6555", fontWeight: 300 }}>{item.product?.name} × {item.quantity}</span>
                      <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "13px", color: "#2C1F14" }}>₹{((item.product?.price || 0) * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "28px" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "#2C1F14" }}>Total</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 500, color: "#2C1F14" }}>₹{total.toLocaleString()}</span>
                </div>
                <button className="btn-primary" onClick={placeOrder} disabled={placing} style={{ width: "100%", padding: "15px", fontSize: "12px" }}>{placing ? "Placing Order..." : "Place Order"}</button>
                <button className="btn-outline" onClick={() => navigate("products")} style={{ width: "100%", padding: "14px", fontSize: "12px", marginTop: "10px" }}>Continue Shopping</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}