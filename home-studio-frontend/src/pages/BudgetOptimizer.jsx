import { useState } from "react";
const API = "http://localhost:8080/api";

export default function BudgetOptimizer({ user, navigate }) {
  const [budget, setBudget] = useState("");
  const [roomType, setRoomType] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [error, setError] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  const roomTypes = ["Bedroom", "Living Room", "Dining Room", "Kitchen", "Office", "Outdoor"];

  const handleGenerate = async () => {
    if (!user) { navigate("login"); return; }
    if (!budget || !roomType) { setError("Please enter a budget and select a room type."); return; }
    if (isNaN(budget) || Number(budget) <= 0) { setError("Please enter a valid budget amount."); return; }
    setLoading(true); setError(""); setGenerated(false);
    try {
      const budgetRes = await fetch(`${API}/budget/set?userId=${user.userId}&totalBudget=${budget}&roomType=${roomType}`, { method: "POST" });
      const savedBudget = await budgetRes.json();
      const recRes = await fetch(`${API}/budget/${savedBudget.budgetId}/generate`, { method: "POST" });
      const recs = await recRes.json();
      setRecommendations(recs);
      setTotalCost(recs.reduce((sum, r) => sum + (r.product?.price || 0), 0));
      setGenerated(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="fade-in">
      <div style={{ background: "#6B7A4E", padding: "64px 48px 48px", borderBottom: "1px solid #556040" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p className="label" style={{ color: "#B8C49A" }}>Smart Shopping</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "48px", fontWeight: 300, color: "#F5F0E8", letterSpacing: "1px" }}>Budget Optimizer</h1>
          <div style={{ width: "48px", height: "1px", background: "#B8C49A", margin: "20px 0 16px" }} />
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "15px", color: "#C8D4A8", fontWeight: 300, maxWidth: "500px" }}>
            Tell us your budget and room type. We'll recommend the best combination of products that fit perfectly.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "64px 32px" }}>
        <div className="card" style={{ padding: "48px", marginBottom: "48px" }}>
          <p className="label" style={{ marginBottom: "32px", fontSize: "12px", letterSpacing: "4px" }}>Configure Your Budget</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
            <div>
              <label className="label">Total Budget (₹)</label>
              <input className="input-field" type="number" placeholder="e.g. 50000" value={budget} onChange={e => setBudget(e.target.value)} />
            </div>
            <div>
              <label className="label">Room Type</label>
              <select className="input-field" value={roomType} onChange={e => setRoomType(e.target.value)} style={{ cursor: "pointer" }}>
                <option value="">Select a room...</option>
                {roomTypes.map(r => <option key={r} value={r.toLowerCase()}>{r}</option>)}
              </select>
            </div>
          </div>
          {error && (
            <div style={{ padding: "12px 16px", background: "rgba(196,113,74,0.1)", border: "1px solid rgba(196,113,74,0.3)", marginBottom: "24px", fontFamily: "'Jost', sans-serif", fontSize: "13px", color: "#A85A35" }}>{error}</div>
          )}
          <button className="btn-olive" onClick={handleGenerate} disabled={loading} style={{ padding: "15px 48px", fontSize: "12px" }}>
            {loading ? "Generating Recommendations..." : "Generate Recommendations"}
          </button>
          {!user && (
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "13px", color: "#7A6555", marginTop: "16px" }}>
              Please <span onClick={() => navigate("login")} style={{ color: "#C4714A", cursor: "pointer", textDecoration: "underline" }}>sign in</span> to use the budget optimizer.
            </p>
          )}
        </div>

        {generated && (
          <div className="fade-in">
            {recommendations.length === 0 ? (
              <div className="card" style={{ padding: "48px", textAlign: "center" }}>
                <div style={{ width: "40px", height: "1px", background: "#C4714A", margin: "0 auto 24px" }} />
                <h3 className="section-title" style={{ fontSize: "24px", color: "#7A6555", marginBottom: "12px" }}>No Matches Found</h3>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "14px", color: "#7A6555", fontWeight: 300 }}>
                  No products found for "{roomType}" within ₹{Number(budget).toLocaleString()}. Try a different room type or increase your budget.
                </p>
              </div>
            ) : (
              <>
                <div style={{ background: "#2C1F14", padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px" }}>
                  <div>
                    <p className="label" style={{ color: "#7A6555", marginBottom: "4px" }}>Recommended Collection</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "#F5F0E8" }}>{recommendations.length} products for your {roomType}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p className="label" style={{ color: "#7A6555", marginBottom: "4px" }}>Total Cost</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", color: "#C4714A" }}>₹{totalCost.toLocaleString()}</p>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", color: "#6B7A4E", marginTop: "4px" }}>₹{(Number(budget) - totalCost).toLocaleString()} saved</p>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {recommendations.map((rec, i) => (
                    <div key={rec.recId} style={{ background: "#FDFAF4", border: "1px solid #D4C5A9", padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                        <div style={{ width: "48px", height: "48px", background: "#EDE5D0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "#7A6555" }}>{i + 1}</span>
                        </div>
                        <div>
                          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#C4714A", marginBottom: "4px" }}>{rec.product?.category?.categoryName}</p>
                          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 500, color: "#2C1F14", marginBottom: "4px" }}>{rec.product?.name}</h3>
                          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "13px", color: "#7A6555", fontWeight: 300 }}>{rec.product?.description}</p>
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "24px" }}>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 500, color: "#2C1F14" }}>₹{rec.product?.price?.toLocaleString()}</p>
                        <span style={{ display: "inline-block", marginTop: "6px", padding: "4px 10px", background: "rgba(107,122,78,0.1)", border: "1px solid rgba(107,122,78,0.3)", fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#556040" }}>Recommended</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "12px", marginTop: "32px" }}>
                  <button className="btn-primary" onClick={() => navigate("products")} style={{ padding: "14px 32px", fontSize: "12px" }}>Browse All Products</button>
                  <button className="btn-outline" onClick={() => { setGenerated(false); setBudget(""); setRoomType(""); }} style={{ padding: "13px 32px", fontSize: "12px" }}>Start Over</button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}