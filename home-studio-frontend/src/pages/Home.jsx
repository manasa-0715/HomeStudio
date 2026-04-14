export default function Home({ user, navigate }) {
  const features = [
    { title: "Curated Collections", desc: "Handpicked interior pieces crafted for every room and aesthetic." },
    { title: "Budget Optimizer", desc: "Set your budget and let us recommend the perfect combination of products." },
    { title: "Seamless Ordering", desc: "From browse to doorstep, a refined and effortless shopping experience." },
  ];

  const categories = ["Living Room", "Bedroom", "Dining", "Kitchen", "Outdoor", "Office"];

  return (
    <div className="fade-in">
      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #2C1F14 0%, #4A3728 50%, #3D2B1F 100%)",
        minHeight: "88vh", display: "flex", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "80px 32px", position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(196,113,74,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(107,122,78,0.1) 0%, transparent 50%)",
          pointerEvents: "none"
        }} />
        <div style={{ maxWidth: "700px", position: "relative" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "6px", textTransform: "uppercase", color: "#C4714A", marginBottom: "24px" }}>
            Interior Design Marketplace
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(52px, 8vw, 88px)", fontWeight: 300, color: "#F5F0E8", lineHeight: 1.05, letterSpacing: "2px", marginBottom: "28px" }}>
            Design Your<br />
            <em style={{ color: "#C4714A", fontStyle: "italic" }}>Perfect Space</em>
          </h1>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "16px", color: "#A89880", lineHeight: 1.8, marginBottom: "48px", fontWeight: 300, maxWidth: "520px", margin: "0 auto 48px" }}>
            Discover thoughtfully curated interior products for every room. Set your budget and let our optimizer do the rest.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => navigate("products")} style={{ padding: "16px 40px", fontSize: "12px" }}>Explore Collection</button>
            {!user && <button className="btn-outline" onClick={() => navigate("register")} style={{ padding: "16px 40px", fontSize: "12px", color: "#D4C5A9", borderColor: "#D4C5A9" }}>Get Started</button>}
            <button className="btn-olive" onClick={() => navigate("budget")} style={{ padding: "16px 40px", fontSize: "12px" }}>Budget Optimizer</button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ background: "#EDE5D0", padding: "64px 0" }}>
        <div style={{ display: "flex", gap: "0", justifyContent: "center", flexWrap: "wrap" }}>
          {categories.map((cat, i) => (
            <button key={i} onClick={() => navigate("products")} style={{
              padding: "16px 32px", background: "transparent", border: "none",
              borderRight: i < categories.length - 1 ? "1px solid #D4C5A9" : "none",
              fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "3px",
              textTransform: "uppercase", color: "#6B4F3A", cursor: "pointer", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.target.style.color = "#C4714A"; e.target.style.background = "rgba(196,113,74,0.06)"; }}
              onMouseLeave={e => { e.target.style.color = "#6B4F3A"; e.target.style.background = "transparent"; }}
            >{cat}</button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="page-container" style={{ padding: "96px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p className="label" style={{ textAlign: "center" }}>Why Home Studio</p>
          <h2 className="section-title" style={{ fontSize: "42px" }}>A Different Kind of<br />Interior Experience</h2>
          <div className="divider" style={{ margin: "20px auto" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
          {features.map((f, i) => (
            <div key={i} className="card" style={{ padding: "48px 40px", background: i === 1 ? "#2C1F14" : "#FDFAF4", borderColor: i === 1 ? "#4A3728" : "#D4C5A9" }}>
              <div style={{ width: "32px", height: "1px", background: "#C4714A", marginBottom: "28px" }} />
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 500, color: i === 1 ? "#F5F0E8" : "#2C1F14", marginBottom: "16px" }}>{f.title}</h3>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "14px", color: i === 1 ? "#A89880" : "#7A6555", lineHeight: 1.8, fontWeight: 300 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "#6B7A4E", padding: "80px 32px", textAlign: "center" }}>
        <p className="label" style={{ color: "#B8C49A", textAlign: "center" }}>Smart Shopping</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "42px", fontWeight: 300, color: "#F5F0E8", marginBottom: "16px" }}>Try Our Budget Optimizer</h2>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "15px", color: "#C8D4A8", marginBottom: "40px", fontWeight: 300 }}>Enter your budget and room type. We'll build the perfect collection for you.</p>
        <button className="btn-primary" onClick={() => navigate("budget")} style={{ padding: "16px 48px", fontSize: "12px" }}>Get Recommendations</button>
      </div>

      {/* Footer */}
      <div style={{ background: "#2C1F14", padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #4A3728" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "#F5F0E8", letterSpacing: "3px" }}>HOME STUDIO</span>
        <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", color: "#7A6555" }}>© 2024 Home Studio Interiors. All rights reserved.</span>
      </div>
    </div>
  );
}