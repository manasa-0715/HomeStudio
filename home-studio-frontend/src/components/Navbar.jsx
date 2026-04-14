export default function Navbar({ user, navigate, onLogout, currentPage }) {
  const links = [
    { key: "home", label: "Home" },
    { key: "products", label: "Products" },
    { key: "cart", label: "Cart" },
    { key: "orders", label: "Orders" },
    { key: "budget", label: "Budget Optimizer" },
  ];

  return (
    <nav style={{
      background: "#2C1F14", padding: "0 48px", display: "flex",
      alignItems: "center", justifyContent: "space-between", height: "72px",
      position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid #4A3728"
    }}>
      <div onClick={() => navigate("home")} style={{ cursor: "pointer", display: "flex", alignItems: "baseline", gap: "10px" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 600, color: "#F5F0E8", letterSpacing: "3px", textTransform: "uppercase" }}>Home Studio</span>
        <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "4px", color: "#C4714A", textTransform: "uppercase" }}>Interiors</span>
      </div>

      <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
        {links.map(link => (
          <button key={link.key} onClick={() => navigate(link.key)} style={{
            background: "none", border: "none", fontFamily: "'Jost', sans-serif",
            fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase",
            color: currentPage === link.key ? "#C4714A" : "#D4C5A9", cursor: "pointer",
            padding: "4px 0", borderBottom: currentPage === link.key ? "1px solid #C4714A" : "1px solid transparent",
            transition: "all 0.2s ease"
          }}>{link.label}</button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", color: "#D4C5A9", letterSpacing: "1px" }}>Welcome, {user.name}</span>
            <button className="btn-outline" onClick={onLogout} style={{ padding: "8px 20px", fontSize: "11px", color: "#D4C5A9", borderColor: "#D4C5A9" }}>Logout</button>
          </div>
        ) : (
          <>
            <button className="btn-outline" onClick={() => navigate("login")} style={{ padding: "8px 20px", fontSize: "11px", color: "#D4C5A9", borderColor: "#D4C5A9" }}>Login</button>
            <button className="btn-primary" onClick={() => navigate("register")} style={{ padding: "8px 20px", fontSize: "11px" }}>Register</button>
          </>
        )}
      </div>
    </nav>
  );
}