import { useState } from "react";
const API = "http://localhost:8080/api";

export default function Register({ navigate }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", address: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) { setError("Name, email and password are required."); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => navigate("login"), 2000);
      } else {
        setError("Registration failed. Email may already be in use.");
      }
    } catch {
      setError("Unable to connect to server. Please try again.");
    }
    setLoading(false);
  };

  if (success) return (
    <div style={{ minHeight: "calc(100vh - 72px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "60px", height: "1px", background: "#6B7A4E", margin: "0 auto 24px" }} />
        <h2 className="section-title" style={{ color: "#6B7A4E" }}>Account Created</h2>
        <p style={{ fontFamily: "'Jost', sans-serif", color: "#7A6555", marginTop: "12px" }}>Redirecting you to login...</p>
      </div>
    </div>
  );

  return (
    <div className="fade-in" style={{ minHeight: "calc(100vh - 72px)", display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F0E8", padding: "40px 16px" }}>
      <div style={{ width: "100%", maxWidth: "480px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p className="label" style={{ textAlign: "center" }}>Join Us</p>
          <h1 className="section-title" style={{ fontSize: "38px" }}>Create Account</h1>
          <div className="divider" style={{ margin: "16px auto" }} />
        </div>
        <div className="card" style={{ padding: "40px" }}>
          {[
            { key: "name", label: "Full Name", type: "text", placeholder: "Your full name", required: true },
            { key: "email", label: "Email Address", type: "email", placeholder: "your@email.com", required: true },
            { key: "password", label: "Password", type: "password", placeholder: "Create a password", required: true },
            { key: "phone", label: "Phone Number", type: "text", placeholder: "+91 00000 00000", required: false },
            { key: "address", label: "Delivery Address", type: "text", placeholder: "Your address", required: false },
          ].map(field => (
            <div key={field.key} style={{ marginBottom: "20px" }}>
              <label className="label">{field.label}{field.required && <span style={{ color: "#C4714A" }}> *</span>}</label>
              <input className="input-field" type={field.type} placeholder={field.placeholder} value={form[field.key]} onChange={e => setForm({ ...form, [field.key]: e.target.value })} />
            </div>
          ))}
          {error && (
            <div style={{ padding: "12px 16px", background: "rgba(196,113,74,0.1)", border: "1px solid rgba(196,113,74,0.3)", marginBottom: "24px", fontFamily: "'Jost', sans-serif", fontSize: "13px", color: "#A85A35" }}>{error}</div>
          )}
          <button className="btn-primary" onClick={handleSubmit} disabled={loading} style={{ width: "100%", padding: "15px", fontSize: "12px", marginTop: "8px" }}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
          <p style={{ textAlign: "center", marginTop: "24px", fontFamily: "'Jost', sans-serif", fontSize: "13px", color: "#7A6555" }}>
            Already have an account?{" "}
            <span onClick={() => navigate("login")} style={{ color: "#C4714A", cursor: "pointer", textDecoration: "underline" }}>Sign in</span>
          </p>
        </div>
      </div>
    </div>
  );
}