import { useState, useEffect } from "react";
const API = "http://localhost:8080/api";


const imageMap = {
  "leather sofa": "/images/Sofa.jpeg",
  "sofa": "/images/Sofa.jpeg",
  "dining table": "/images/DiningTable.jpeg",
  "office chair": "/images/OfficeChair.jpeg",
  "led lamp": "/images/LEDlamp.jpeg",
  "wall art": "/images/WallArt.jpeg",
  "king bed": "/images/KingBed.jpeg",
  "bookshelf": "/images/Bookshelf.jpeg",
  "carpet": "/images/Carpet.jpeg",
  "curtains": "/images/curtains.jpeg",
  "garden chair": "/images/Gardenchair.jpeg",
  "kitchen cabinet": "/images/KitchenCabinet.jpeg",
  "mirror": "/images/Mirror.jpeg",
  "study desk": "/images/StudyDesk.jpeg",
  "study table": "/images/StudyDesk.jpeg",
  "tv unit": "/images/TVunit.jpeg",
  "walk-in wardrobe": "/images/WalkinWardrobe.jpeg",
  "wardrobe": "/images/WalkinWardrobe.jpeg",
};


const getImage = (product) => {
  const name = product?.name?.toLowerCase().trim();
  if (!name) return null;

  if (imageMap[name]) return imageMap[name];

  for (const key of Object.keys(imageMap)) {
    if (name.includes(key) || key.includes(name)) {
      return imageMap[key];
    }
  }

  return null;
};

export default function Cart({ user, navigate }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("login");
      return;
    }
    fetchCart();
  }, [user]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/cart/${user.userId}`);
      const data = await res.json();
      setCartItems(data);
    } catch {
      setCartItems([]);
    }
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
      if (res.ok) {
        setOrdered(true);
        setCartItems([]);
      }
    } catch {}
    setPlacing(false);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  if (ordered)
    return (
      <div style={{ minHeight: "calc(100vh - 72px)", display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F0E8" }}>
        <div style={{ textAlign: "center", padding: "40px" }}>
          <h2 className="section-title" style={{ color: "#6B7A4E" }}>Order Placed!</h2>
          <button className="btn-primary" onClick={() => navigate("orders")}>
            View My Orders
          </button>
        </div>
      </div>
    );

  return (
    <div className="fade-in">
      <div style={{ background: "#2C1F14", padding: "64px 48px 48px" }}>
        <h1 style={{ color: "#F5F0E8" }}>Shopping Cart</h1>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 32px" }}>
        {loading ? (
          <p>Loading cart...</p>
        ) : cartItems.length === 0 ? (
          <div>
            <h2>Your cart is empty</h2>
            <button className="btn-primary" onClick={() => navigate("products")}>
              Browse Products
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "40px" }}>
            
            {/* CART ITEMS */}
            <div>
              {cartItems.map(item => {
                const imgSrc = getImage(item.product); // ✅ FIX HERE

                console.log("Cart:", item.product?.name, imgSrc);

                return (
                  <div key={item.cartItemId} style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                    
                    {/* IMAGE */}
                    <div style={{ width: "80px", height: "80px", background: "#EDE5D0" }}>
                      {imgSrc ? (
                        <img
                          src={imgSrc}
                          alt={item.product?.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <div style={{ textAlign: "center" }}>No Image</div>
                      )}
                    </div>

                    {/* DETAILS */}
                    <div style={{ flex: 1 }}>
                      <h3>{item.product?.name}</h3>
                      <p>Qty: {item.quantity}</p>
                    </div>

                    {/* PRICE + REMOVE */}
                    <div>
                      <p>₹{((item.product?.price || 0) * item.quantity)}</p>
                      <button
                        onClick={() => removeItem(item.cartItemId)}
                        style={{
                          border: "1px solid #D4C5A9",
                          padding: "6px 14px",
                          cursor: "pointer"
                        }}
                      >
                        Remove
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* SUMMARY */}
            <div>
              <div className="card">
                <h3>Total: ₹{total}</h3>

                <button
                  className="btn-primary"
                  onClick={placeOrder}
                  disabled={placing}
                >
                  {placing ? "Placing..." : "Place Order"}
                </button>

                <button
                  className="btn-outline"
                  onClick={() => navigate("products")}
                >
                  Continue Shopping
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}