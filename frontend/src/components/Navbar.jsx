import React, { useState, useEffect, useCallback } from "react";
import logo from "../assets/logo-removebg-preview.png";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";
import { supabase } from "../supabaseClient";
import NotificationsDrawer from "./NotificationsDrawer";

const navStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --orange: var(--accent-orange); --green: var(--accent-green);
    --dark: var(--bg-base); --dark2: var(--bg-level1);
    --text: var(--text-primary); --muted: var(--text-secondary);
    --border: var(--border-subtle);
  }
  body { margin: 0; background: var(--bg-base); color: var(--text-primary); }

  /* ── NAVBAR ── */
  .navbar {
    position: sticky; top: 0; z-index: 1000;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px; height: 75px;
    background: var(--bg-glass); backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border-medium);
    width: 100%;
    box-sizing: border-box;
    transition: all 0.3s ease;
  }

  /* ── BRAND / LOGO ── */
  .nav-brand {
    display: flex; align-items: center; gap: 10px;
    cursor: pointer; user-select: none;
  }
  .nav-logo-box {
    width: 44px; height: 44px; border-radius: 8px;
    background: transparent;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
  }
  .nav-logo-box img {
    width: 100%; height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 0 6px rgba(255,165,0,0.35));
    -webkit-user-drag: none;
    pointer-events: none;
  }
  .nav-brand-text {
    font-family: 'Poppins', sans-serif; font-size: 22px;
    letter-spacing: 0.08em; color: var(--text); line-height: 1;
  }
  .nav-brand-sub {
    font-family: 'Inter', sans-serif; font-size: 8px;
    color: var(--orange); letter-spacing: 0.12em; text-transform: uppercase;
  }

  /* ── DESKTOP NAV LINKS ── */
  .nav-links { display: flex; align-items: center; gap: 2px; list-style: none; }
  .nav-links li button {
    display: block; padding: 8px 13px;
    color: var(--muted); background: none; border: none;
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 600;
    letter-spacing: 0.04em; border-radius: 4px;
    cursor: pointer; transition: all 0.2s; position: relative;
  }
  .nav-links li button:hover { color: var(--text); background: rgba(255,165,0,0.06); }
  .nav-links li button.active { color: var(--orange); background: rgba(255,165,0,0.08); }
  .nav-links li button.active::after {
    content: ''; position: absolute; bottom: 4px; left: 50%;
    transform: translateX(-50%);
    width: 4px; height: 4px; border-radius: 50%; background: var(--orange);
  }

  /* ── NAV ACTIONS ── */
  .nav-actions { display: flex; align-items: center; gap: 10px; }
  .nav-btn-ghost {
    padding: 8px 18px; background: rgba(var(--text-primary-rgb), 0.04); color: var(--text);
    border: 1px solid var(--border-medium); border-radius: 6px;
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    cursor: pointer; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .nav-btn-ghost:hover {
    background: rgba(var(--text-primary-rgb), 0.08);
    border-color: var(--border-strong);
    transform: translateY(-1px);
  }
  .nav-btn-cta {
    padding: 9px 22px; background: var(--orange); color: #ffffff;
    border: none; border-radius: 4px;
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 800;
    cursor: pointer; transition: all 0.25s; letter-spacing: 0.04em;
  }
  .nav-btn-cta:hover { background: #ffb733; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(255,165,0,0.35); }

  /* ── HAMBURGER ── */
  .nav-hamburger {
    display: none; flex-direction: column; justify-content: center; gap: 5px;
    width: 40px; height: 40px; padding: 8px;
    background: none; border: 1px solid var(--border); border-radius: 6px;
    cursor: pointer; transition: border-color 0.2s; flex-shrink: 0;
  }
  .nav-hamburger:hover { border-color: rgba(255,165,0,0.4); }
  .nav-hamburger span {
    display: block; width: 100%; height: 2px;
    background: var(--text); border-radius: 2px; transition: all 0.3s;
  }
  .nav-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .nav-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  .mobile-only-icon { display: none; }

  /* ── DRAWER OVERLAY ── */
  .drawer-overlay {
    position: fixed; inset: 0; z-index: 1999;
    background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
    opacity: 0; pointer-events: none; transition: opacity 0.3s;
  }
  .drawer-overlay.open { opacity: 1; pointer-events: all; }

  /* ── RIGHT SLIDE DRAWER ── */
  .drawer {
    position: fixed; top: 0; right: 0; bottom: 0; z-index: 2000;
    width: 300px; max-width: 85vw;
    background: var(--dark2);
    border-left: 1px solid var(--border);
    display: flex; flex-direction: column;
    transform: translateX(100%);
    transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
    box-shadow: -20px 0 60px rgba(0,0,0,0.6);
    visibility: hidden;
  }
  .drawer.open { transform: translateX(0); visibility: visible; }

  /* Drawer header */
  .drawer-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 24px; border-bottom: 1px solid var(--border); flex-shrink: 0;
  }
  .drawer-brand { display: flex; align-items: center; gap: 10px; }
  .drawer-logo {
    width: 36px; height: 36px; border-radius: 7px;
    overflow: hidden; background: transparent;
    display: flex; align-items: center; justify-content: center;
  }
  .drawer-logo img {
    width: 100%; height: 100%; object-fit: contain;
    filter: drop-shadow(0 0 4px rgba(255,165,0,0.3));
  }
  .drawer-brand-text {
    font-family: 'Poppins', sans-serif; font-size: 19px;
    letter-spacing: 0.06em; color: var(--text); line-height: 1;
  }
  .drawer-brand-sub {
    font-family: 'Inter', sans-serif; font-size: 7px;
    color: var(--orange); letter-spacing: 0.1em;
  }
  .drawer-close {
    width: 34px; height: 34px; border-radius: 6px;
    background: rgba(255,165,0,0.06); border: 1px solid var(--border);
    color: var(--text); font-size: 18px; cursor: pointer;
    display: flex; align-items: center; justify-content: center; transition: all 0.2s;
  }
  .drawer-close:hover { background: rgba(255,165,0,0.12); border-color: rgba(255,165,0,0.3); }

  /* Drawer search */
  .drawer-search {
    margin: 16px 24px 0;
    display: flex; align-items: center; gap: 10px;
    padding: 10px 14px;
    background: rgba(var(--dark-rgb), 0.8); border: 1px solid var(--border); border-radius: 6px;
    flex-shrink: 0;
  }
  .drawer-search-icon { font-size: 14px; color: var(--muted); }
  .drawer-search input {
    flex: 1; background: none; border: none; outline: none;
    font-family: 'Poppins', sans-serif; font-size: 13px; color: var(--text);
  }
  .drawer-search input::placeholder { color: rgba(var(--text-rgb), 0.25); }

  /* Drawer nav items */
  .drawer-nav { flex: 1; overflow-y: auto; padding: 12px 0; }
  .drawer-nav-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 24px; cursor: pointer; transition: all 0.15s;
    border-bottom: 1px solid rgba(255,255,255,0.03);
  }
  .drawer-nav-item:hover { background: rgba(255,165,0,0.05); }
  .drawer-nav-item.active { background: rgba(255,165,0,0.08); }

  .drawer-nav-left { display: flex; align-items: center; gap: 14px; }
  .drawer-nav-icon {
    width: 36px; height: 36px; border-radius: 8px;
    background: rgba(255,165,0,0.06); border: 1px solid rgba(255,165,0,0.12);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; flex-shrink: 0; transition: all 0.15s;
  }
  .drawer-nav-item:hover .drawer-nav-icon,
  .drawer-nav-item.active .drawer-nav-icon {
    background: rgba(255,165,0,0.12); border-color: rgba(255,165,0,0.35);
  }
  .drawer-nav-label {
    font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700;
    color: var(--text); line-height: 1;
  }
  .drawer-nav-item.active .drawer-nav-label { color: var(--orange); }
  .drawer-nav-sub {
    font-family: 'Inter', sans-serif; font-size: 10px;
    color: var(--muted); margin-top: 2px;
  }
  .drawer-arrow { color: var(--muted); font-size: 16px; transition: transform 0.2s; }
  .drawer-nav-item:hover .drawer-arrow { transform: translateX(4px); color: var(--orange); }
  .drawer-nav-item.active .drawer-arrow { color: var(--orange); }

  /* Drawer footer */
  .drawer-footer { padding: 20px 24px; border-top: 1px solid var(--border); flex-shrink: 0; }
  .drawer-footer-btns { display: flex; gap: 10px; }
  .df-btn-ghost {
    flex: 1; padding: 11px; background: transparent; color: var(--muted);
    border: 1px solid rgba(var(--text-rgb), 0.15); border-radius: 4px;
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    cursor: pointer; transition: all 0.2s; text-align: center;
  }
  .df-btn-ghost:hover { color: var(--text); border-color: rgba(var(--text-rgb), 0.4); }
  .df-btn-cta {
    flex: 1; padding: 11px; background: var(--orange); color: #ffffff;
    border: none; border-radius: 4px;
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 800;
    cursor: pointer; transition: all 0.2s; text-align: center;
  }
  .df-btn-cta:hover { background: #ffb733; }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .navbar { padding: 0 16px; height: 65px; backdrop-filter: blur(10px); }
    .nav-links { display: none; }
    .nav-actions { gap: 8px; }
    .nav-btn-ghost { padding: 6px 12px; font-size: 12px; }
    .nav-btn-cta { padding: 7px 16px; font-size: 12px; }
    .nav-hamburger { display: flex; }
  }
  @media (max-width: 500px) {
    .navbar { padding: 0 12px; height: 60px; }
    .nav-brand-text { font-size: 16px; letter-spacing: 0.02em; }
    .nav-brand-sub { font-size: 6px; }
    .nav-logo-box { width: 30px; height: 30px; }
    .nav-hamburger { width: 34px; height: 34px; padding: 7px; gap: 4px; }
    .nav-brand { gap: 4px; }
    
    /* Keep essential icons on tiny phones but hide text labels */
    .nav-actions { gap: 6px; }
    .nav-btn-ghost, .nav-btn-cta { width: 32px; height: 32px; padding: 0 !important; display: flex; align-items: center; justify-content: center; border-radius: 6px; }
    .btn-text-label { display: none; }
    .mobile-only-icon { display: block !important; font-size: 14px; }
  }
  @media (max-width:380px) {
    .nav-brand-text, .nav-brand-sub { display: none; } /* Show only logo on extremely small screens */
    .nav-actions { gap: 4px; }
    .nav-hamburger { width: 32px; height: 32px; }
  }
`;

// ─── All nav links with their page keys ───
const navLinks = [
  { label: "Home", key: "Home", icon: "🏠", sub: "Main Page" },
  { label: "Services", key: "Services", icon: "🖥️", sub: "IT & Cloud Solutions" },
  { label: "Academy", key: "Academy", icon: "🎓", sub: "Professional Training" },
  { label: "IMS", key: "IMS", icon: "📊", sub: "Internship Management" },
  { label: "Shop", key: "Shop", icon: "📦", sub: "Smart Tech Sales" },
  { label: "About Us", key: "AboutUs", icon: "🏢", sub: "Our Story & Team" },
  { label: "Talent", key: "Talented", icon: "🌟", sub: "Graduates & Interns" },
  { label: "Contact", key: "Contact", icon: "💬", sub: "Get in Touch" },
  { label: "Admin", key: "Admin", icon: "🛡️", sub: "Control Panel" },
  { label: "Blog", key: "Blog", icon: "📝", sub: "News & Updates" },
];

export default function Navbar({ currentPage, navigate }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { user, logout } = useAuth();
  const { cartItemCount, setCartOpen } = useCart();
  const [notifOpen, setNotifOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  const fetchOrders = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from('orders')
      .select('*, order_items(quantity, products(name, icon))')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) {
      setOrders(data);

      const seenStr = localStorage.getItem(`seen_orders_${user.id}`);
      const seenOrders = seenStr ? JSON.parse(seenStr) : {};

      let unread = 0;
      data.forEach(o => {
        if (seenOrders[o.id] !== o.status) unread++;
      });
      setUnreadCount(unread);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchOrders();

      const subscription = supabase
        .channel('public:orders')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'orders', filter: `user_id=eq.${user.id}` }, () => {
          fetchOrders();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [user, fetchOrders]);


  const openNotifications = () => {
    setNotifOpen(true);
    const newSeen = {};
    orders.forEach(o => {
      newSeen[o.id] = o.status;
    });
    localStorage.setItem(`seen_orders_${user.id}`, JSON.stringify(newSeen));
    setUnreadCount(0);
  };



  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Navigate and close drawer
  const go = (key) => {
    navigate(key);
    setDrawerOpen(false);
  };

  const isAdmin = user?.profile?.role === 'admin' || user?.email === 'iamsifu.dev@gmail.com';
  const visibleLinks = navLinks.filter(l => l.key !== 'Admin' || isAdmin);

  // Filter drawer links by search
  const filtered = search
    ? visibleLinks.filter(l =>
      l.label.toLowerCase().includes(search.toLowerCase()) ||
      l.sub.toLowerCase().includes(search.toLowerCase())
    )
    : visibleLinks;

  return (
    <>
      <style>{navStyles}</style>

      {/* ══ NAVBAR ══ */}
      <nav className="navbar">

        {/* Logo + Brand — clicking goes Home */}
        <div className="nav-brand" onClick={() => navigate("Home")}>
          <div className="nav-logo-box">
            <img src={logo} alt="AFR-IQ Logo" />
          </div>
          <div>
            <div className="nav-brand-text">AFRIQ</div>
            <div className="nav-brand-sub">Technologies Ltd</div>
          </div>
        </div>

        {/* Desktop nav links — uses key for navigation */}
        <ul className="nav-links">
          {visibleLinks.map(({ label, key }) => (
            <li key={key}>
              <button
                className={currentPage === key ? "active" : ""}
                onClick={() => navigate(key)}   // ← FIX: was using 'path', now uses 'key'
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right side: Log In, Sign Up, Profile, Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="nav-actions">
            {user && (
              <button
                onClick={openNotifications}
                className="nav-btn-ghost"
                style={{ position: "relative", padding: "8px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}
                aria-label="Notifications"
              >
                🔔
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '-5px', right: '-5px', background: '#ff5050', color: '#fff',
                    width: '18px', height: '18px', borderRadius: '50%', fontSize: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {unreadCount}
                  </span>
                )}
              </button>
            )}
            <button
              onClick={() => setCartOpen(true)}
              className="nav-btn-ghost"
              style={{ position: "relative", padding: "8px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}
              aria-label="View Cart"
            >
              🛒
              {cartItemCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-5px', right: '-5px', background: '#00c878', color: 'var(--dark)',
                  width: '18px', height: '18px', borderRadius: '50%', fontSize: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={toggleTheme}
              className="nav-btn-ghost"
              style={{ padding: "8px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "#FF813E", color: "#ffffff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: "bold", fontFamily: "'Poppins', sans-serif", fontSize: '13px'
                }}>
                  {user.user_metadata?.full_name?.charAt(0) || "U"}
                </div>
                <div className="btn-text-label" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "11px", fontWeight: "600", color: "var(--text)", fontFamily: "'Poppins', sans-serif", lineHeight: 1 }}>
                    {user.user_metadata?.full_name?.split(" ")[0] || "User"}
                  </span>
                  <button onClick={logout} style={{ fontSize: "9px", color: "rgba(var(--text-rgb), 0.5)", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "'Inter', sans-serif" }}>
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button className="nav-btn-ghost" onClick={() => navigate("Login")}>
                  <span className="btn-text-label">Log In</span>
                  <span className="mobile-only-icon">🔑</span>
                </button>
                <button className="nav-btn-cta" onClick={() => navigate("Signup")}>
                  <span className="btn-text-label">Sign Up</span>
                  <span className="mobile-only-icon">✨</span>
                </button>
              </>
            )}
          </div>
          <button
            className={`nav-hamburger ${drawerOpen ? "open" : ""}`}
            onClick={() => setDrawerOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ══ DARK OVERLAY ══ */}
      <div
        className={`drawer-overlay ${drawerOpen ? "open" : ""}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* ══ RIGHT SLIDE DRAWER ══ */}
      <div className={`drawer ${drawerOpen ? "open" : ""}`}>

        {/* Drawer header with logo */}
        <div className="drawer-header">
          <div className="drawer-brand">
            <div className="drawer-logo">
              <img src={logo} alt="AFR-IQ Logo" />
            </div>
            <div>
              <div className="drawer-brand-text">AFR-IQ</div>
              <div className="drawer-brand-sub">Technologies Ltd</div>
            </div>
          </div>
          <button className="drawer-close" onClick={() => setDrawerOpen(false)}>✕</button>
        </div>

        {/* Search bar */}
        <div className="drawer-search">
          <span className="drawer-search-icon">🔍</span>
          <input
            placeholder="Search pages..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Nav items — each calls go(key) to navigate AND close drawer */}
        <nav className="drawer-nav">
          {filtered.map(({ label, key, icon, sub }) => (
            <div
              key={key}
              className={`drawer-nav-item ${currentPage === key ? "active" : ""}`}
              onClick={() => go(key)}   // ← navigates to the correct page
            >
              <div className="drawer-nav-left">
                <div className="drawer-nav-icon">{icon}</div>
                <div>
                  <div className="drawer-nav-label">{label}</div>
                  <div className="drawer-nav-sub">{sub}</div>
                </div>
              </div>
              <span className="drawer-arrow">›</span>
            </div>
          ))}
        </nav>

        {/* Mobile footer actions */}
        <div className="drawer-footer">
          <button
            onClick={toggleTheme}
            className="df-btn-ghost"
            style={{ width: "100%", marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
          >
            {theme === 'dark' ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
          </button>
          {user ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "42px", height: "42px", borderRadius: "50%",
                  background: "#FF813E", color: "#ffffff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: "bold", fontFamily: "'Poppins', sans-serif", fontSize: "16px"
                }}>
                  {user.user_metadata?.full_name?.charAt(0) || "U"}
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "14px", fontWeight: "700", color: "var(--text)", fontFamily: "'Poppins', sans-serif" }}>
                    {user.user_metadata?.full_name || "User"}
                  </span>
                  <span style={{ fontSize: "10px", color: "rgba(var(--text-rgb), 0.5)", fontFamily: "'Inter', sans-serif" }}>
                    Logged In
                  </span>
                </div>
              </div>
              <button className="df-btn-ghost" onClick={() => { logout(); setDrawerOpen(false); }} style={{ width: "100%" }}>
                Sign Out
              </button>
            </div>
          ) : (
            <div className="drawer-footer-btns">
              <button className="df-btn-ghost" onClick={() => go("Login")}>Log In</button>
              <button className="df-btn-cta" onClick={() => go("Signup")}>Sign Up</button>
            </div>
          )}
        </div>

      </div>

      {user && (
        <NotificationsDrawer
          isOpen={notifOpen}
          onClose={() => setNotifOpen(false)}
          orders={orders}
        />
      )}
    </>
  );
}