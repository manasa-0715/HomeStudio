import { useState, useEffect } from "react";
const API = "http://localhost:8080/api";

export default function Orders({ user, navigate }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState({});

  useEffect(() => {
    if (!user) { navigate("login"); return; }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    setLoading(true);
    try { const res = await fetch(`${API}/orders/user/${user.userId}`); const data = await res.json(); setOrders(data); }
    catch { setOrders([]); }
    setLoading(false);
  };

  const fetchOrderItems = async (orderId) => {
    if (orderItems[orderId]) { setExpandedOrder(expandedOrder === orderId ? null : orderId); return; }
    try {
      const res = await fetch(`${API}/orders/${orderId}/items`);
      const data = await res.json();
      setOrderItems({ ...orderItems, [orderId]: data });
      setExpandedOrder(orderId);
    } catch {}
  };

  const statusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "PENDING": return { bg: "rgba(196,113,74,0.1)", color: "#A85A35", border: "rgba(196,113,74,0.3)" };
      case "CONFIRMED": return { bg: "rgba(107,122,78,0.1)", color: "#556040", border: "rgba(107,122,78,0.3)" };
      case "DELIVERED": return { bg: "rgba(44,31,20,0.08)", color: "#2C1F14", border: "rgba(44,31,20,0.2)" };
      default: return { bg: "#F5F0E8", color: "#7A6555", border: "#D4C5A9" };
    }
  };

  return (
    <div className="fade-in">
      <div style={{ background: "#2C1F14", padding: "64px 48px 48px", borderBottom: "1px solid #4A3728" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p className="label" style={{ color: "#C4714A" }}>Your History</p>
          <h1 className="section-title" style={{ color: "#F5F0E8", fontSize: "48px" }}>My Orders</h1>
          <div style={{ width: "48px", height: "1px", background: "#C4714A", margin: "20px 0 0" }} />
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "48px 32px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px", fontFamily: "'Jost', sans-serif", color: "#7A6555" }}>Loading orders...</div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px" }}>
            <h2 className="section-title" style={{ fontSize: "28px", color: "#7A6555", marginBottom: "24px" }}>No orders yet</h2>
            <button className="btn-primary" onClick={() => navigate("products")}>Start Shopping</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {orders.map(order => {
              const sc = statusColor(order.status);
              const isExpanded = expandedOrder === order.orderId;
              return (
                <div key={order.orderId} style={{ background: "#FDFAF4", border: "1px solid #D4C5A9", overflow: "hidden" }}>
                  <div style={{ padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }} onClick={() => fetchOrderItems(order.orderId)}>
                    <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
                      <div>
                        <p className="label" style={{ marginBottom: "4px" }}>Order ID</p>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#2C1F14" }}>#{order.orderId}</p>
                      </div>
                      <div>
                        <p className="label" style={{ marginBottom: "4px" }}>Date</p>
                        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "13px", color: "#6B4F3A", fontWeight: 300 }}>
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }) : "—"}
                        </p>
                      </div>
                      <div>
                        <p className="label" style={{ marginBottom: "4px" }}>Total</p>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#2C1F14" }}>₹{order.totalAmount?.toLocaleString()}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                      <span style={{ padding: "6px 14px", background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}>{order.status}</span>
                      <span style={{ color: "#C4714A", fontSize: "18px" }}>{isExpanded ? "−" : "+"}</span>
                    </div>
                  </div>
                  {isExpanded && orderItems[order.orderId] && (
                    <div style={{ borderTop: "1px solid #EDE5D0", padding: "24px 28px", background: "#FAF7F0" }}>
                      <p className="label" style={{ marginBottom: "16px" }}>Order Items</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {orderItems[order.orderId].map(item => (
                          <div key={item.orderItemId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #EDE5D0" }}>
                            <div>
                              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: "#2C1F14" }}>{item.product?.name}</p>
                              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", color: "#7A6555", fontWeight: 300 }}>Quantity: {item.quantity}</p>
                            </div>
                            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "#2C1F14" }}>₹{((item.price || 0) * item.quantity).toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}