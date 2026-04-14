import { useState } from "react";
const API = "http://localhost:8080/api";

export default function Login({ onLogin, navigate }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch(`${API}/auth/login?email=${form.email}&password=${form.password}`, { method: "POST" });
      if (res.ok) {
        const user = await res.json();
        onLogin(user);
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch {
      setError("Unable to connect to server. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="fade-in" style={{ minHeight: "calc(100vh - 72px)", display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F0E8", padding: "40px 16px" }}>
      <div style={{ width: "100%", maxWidth: "440px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p className="label" style={{ textAlign: "center" }}>Welcome Back</p>
          <h1 className="section-title" style={{ fontSize: "38px" }}>Sign In</h1>
          <div className="divider" style={{ margin: "16px auto" }} />
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "14px", color: "#7A6555", fontWeight: 300 }}>Access your Home Studio account</p>
        </div>
        <div className="card" style={{ padding: "40px" }}>
          <div style={{ marginBottom: "24px" }}>
            <label className="label">Email Address</label>
            <input className="input-field" type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div style={{ marginBottom: "32px" }}>
            <label className="label">Password</label>
            <input className="input-field" type="password" placeholder="Enter your password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} onKeyDown={e => e.key === "Enter" && handleSubmit()} />
          </div>
          {error && (
            <div style={{ padding: "12px 16px", background: "rgba(196,113,74,0.1)", border: "1px solid rgba(196,113,74,0.3)", marginBottom: "24px", fontFamily: "'Jost', sans-serif", fontSize: "13px", color: "#A85A35" }}>{error}</div>
          )}
          <button className="btn-primary" onClick={handleSubmit} disabled={loading} style={{ width: "100%", padding: "15px", fontSize: "12px" }}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <p style={{ textAlign: "center", marginTop: "24px", fontFamily: "'Jost', sans-serif", fontSize: "13px", color: "#7A6555" }}>
            Don't have an account?{" "}
            <span onClick={() => navigate("register")} style={{ color: "#C4714A", cursor: "pointer", textDecoration: "underline" }}>Register here</span>
          </p>
        </div>
      </div>
    </div>
  );
}