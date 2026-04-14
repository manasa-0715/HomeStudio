import { useState, useEffect } from "react";
const API = "http://localhost:8080/api";

export default function Products({ user, navigate }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => { fetchProducts(); fetchCategories(); }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetch(`${API}/products/category/${selectedCategory}`).then(r => r.json()).then(setProducts).catch(() => {});
    } else { fetchProducts(); }
  }, [selectedCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    try { const res = await fetch(`${API}/products`); const data = await res.json(); setProducts(data); }
    catch { setProducts([]); }
    setLoading(false);
  };

  const fetchCategories = async () => {
    try { const res = await fetch(`${API}/categories`); const data = await res.json(); setCategories(data); }
    catch { setCategories([]); }
  };

  const addToCart = async (productId) => {
    if (!user) { navigate("login"); return; }
    try {
      await fetch(`${API}/cart/add?userId=${user.userId}&productId=${productId}&quantity=1`, { method: "POST" });
      setAddedId(productId);
      setTimeout(() => setAddedId(null), 2000);
    } catch {}
  };

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fade-in">
      <div style={{ background: "#2C1F14", padding: "64px 48px 48px", borderBottom: "1px solid #4A3728" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p className="label" style={{ color: "#C4714A" }}>Our Collection</p>
          <h1 className="section-title" style={{ color: "#F5F0E8", fontSize: "48px" }}>All Products</h1>
          <div style={{ width: "48px", height: "1px", background: "#C4714A", margin: "20px 0 32px" }} />
          <input className="input-field" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: "400px", background: "#3D2B1F", borderColor: "#4A3728", color: "#F5F0E8" }} />
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 32px" }}>
        <div style={{ display: "flex", gap: "40px" }}>
          {/* Sidebar */}
          <div style={{ width: "200px", flexShrink: 0 }}>
            <p className="label" style={{ marginBottom: "16px" }}>Filter by Room</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <button onClick={() => setSelectedCategory(null)} style={{ padding: "10px 16px", background: !selectedCategory ? "#2C1F14" : "transparent", border: "1px solid", borderColor: !selectedCategory ? "#2C1F14" : "#D4C5A9", color: !selectedCategory ? "#F5F0E8" : "#6B4F3A", fontFamily: "'Jost', sans-serif", fontSize: "12px", letterSpacing: "1px", textAlign: "left", cursor: "pointer", transition: "all 0.2s" }}>All Rooms</button>
              {categories.map(cat => (
                <button key={cat.categoryId} onClick={() => setSelectedCategory(cat.categoryId)} style={{ padding: "10px 16px", background: selectedCategory === cat.categoryId ? "#2C1F14" : "transparent", border: "1px solid", borderColor: selectedCategory === cat.categoryId ? "#2C1F14" : "#D4C5A9", color: selectedCategory === cat.categoryId ? "#F5F0E8" : "#6B4F3A", fontFamily: "'Jost', sans-serif", fontSize: "12px", letterSpacing: "1px", textAlign: "left", cursor: "pointer", transition: "all 0.2s" }}>{cat.categoryName}</button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div style={{ flex: 1 }}>
            {loading ? (
              <div style={{ textAlign: "center", padding: "80px", fontFamily: "'Jost', sans-serif", color: "#7A6555" }}>Loading collection...</div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px" }}>
                <p className="section-title" style={{ fontSize: "28px", color: "#7A6555" }}>No products found</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
                {filtered.map(product => (
                  <div key={product.productId} style={{ background: "#FDFAF4", border: "1px solid #D4C5A9", transition: "transform 0.2s, box-shadow 0.2s", overflow: "hidden" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(44,31,20,0.12)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                    <div style={{ height: "200px", background: "#EDE5D0", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #D4C5A9" }}>
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ textAlign: "center" }}>
                          <div style={{ width: "40px", height: "1px", background: "#C4714A", margin: "0 auto 12px" }} />
                          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "2px", color: "#A89880", textTransform: "uppercase" }}>{product.category?.categoryName || "Product"}</p>
                        </div>
                      )}
                    </div>
                    <div style={{ padding: "20px" }}>
                      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#C4714A", marginBottom: "6px" }}>{product.category?.categoryName}</p>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 500, color: "#2C1F14", marginBottom: "8px" }}>{product.name}</h3>
                      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "13px", color: "#7A6555", lineHeight: 1.6, marginBottom: "16px", fontWeight: 300, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{product.description}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 500, color: "#2C1F14" }}>₹{product.price?.toLocaleString()}</span>
                        <button className={addedId === product.productId ? "btn-olive" : "btn-primary"} onClick={() => addToCart(product.productId)} style={{ padding: "8px 16px", fontSize: "10px" }}>
                          {addedId === product.productId ? "Added!" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}