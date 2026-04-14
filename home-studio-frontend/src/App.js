import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import BudgetOptimizer from "./pages/BudgetOptimizer";
import Navbar from "./components/Navbar";

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  const navigate = (p) => setPage(p);

  const handleLogin = (userData) => {
    setUser(userData);
    setPage("home");
  };

  const handleLogout = () => {
    setUser(null);
    setPage("home");
  };

  const renderPage = () => {
    switch (page) {
      case "login": return <Login onLogin={handleLogin} navigate={navigate} />;
      case "register": return <Register navigate={navigate} />;
      case "products": return <Products user={user} navigate={navigate} />;
      case "cart": return <Cart user={user} navigate={navigate} />;
      case "orders": return <Orders user={user} navigate={navigate} />;
      case "budget": return <BudgetOptimizer user={user} navigate={navigate} />;
      default: return <Home user={user} navigate={navigate} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F5F0E8", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --sand: #F5F0E8; --cream: #EDE5D0; --terracotta: #C4714A; --terracotta-dark: #A85A35;
          --olive: #6B7A4E; --olive-light: #8A9B65; --brown: #3D2B1F; --brown-light: #6B4F3A;
          --text: #2C1F14; --text-muted: #7A6555; --border: #D4C5A9; --white: #FDFAF4;
        }
        button { cursor: pointer; font-family: 'Jost', sans-serif; }
        input, select, textarea { font-family: 'Jost', sans-serif; }
        .btn-primary { background: var(--terracotta); color: white; border: none; padding: 12px 28px; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; font-weight: 500; transition: all 0.3s ease; }
        .btn-primary:hover { background: var(--terracotta-dark); transform: translateY(-1px); }
        .btn-outline { background: transparent; color: var(--terracotta); border: 1px solid var(--terracotta); padding: 11px 28px; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; font-weight: 500; transition: all 0.3s ease; }
        .btn-outline:hover { background: var(--terracotta); color: white; }
        .btn-olive { background: var(--olive); color: white; border: none; padding: 12px 28px; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; font-weight: 500; transition: all 0.3s ease; }
        .btn-olive:hover { background: #556040; transform: translateY(-1px); }
        .card { background: var(--white); border: 1px solid var(--border); padding: 32px; }
        .section-title { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; color: var(--brown); letter-spacing: 1px; }
        .label { font-family: 'Jost', sans-serif; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 8px; }
        .input-field { width: 100%; padding: 12px 16px; border: 1px solid var(--border); background: var(--sand); color: var(--text); font-size: 15px; outline: none; transition: border 0.2s; }
        .input-field:focus { border-color: var(--terracotta); }
        .divider { width: 60px; height: 1px; background: var(--terracotta); margin: 16px 0; }
        .page-container { max-width: 1200px; margin: 0 auto; padding: 40px 32px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.5s ease forwards; }
      `}</style>
      <Navbar user={user} navigate={navigate} onLogout={handleLogout} currentPage={page} />
      <div>{renderPage()}</div>
    </div>
  );
}
