const navStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --orange: #ffa500;
    --green: #00c878;
    --dark: #080c0a;
    --text: #e8f0e4;
    --muted: rgba(232,240,228,0.5);
    --border: rgba(255,165,0,0.12);
  }

  body { margin: 0; background: var(--dark); }

  .navbar {
    position: sticky;
    top: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 48px;
    height: 70px;
    background: rgba(8,12,10,0.97);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }

  .nav-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
  }

  .nav-logo-box {
    width: 38px; height: 38px;
    border-radius: 8px;
    background: linear-gradient(135deg, var(--orange), #e67e00);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    color: #080c0a;
    box-shadow: 0 0 20px rgba(255,165,0,0.3);
    flex-shrink: 0;
  }

  .nav-brand-text {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 0.08em;
    color: var(--text);
    line-height: 1;
  }

  .nav-brand-sub {
    font-family: 'Space Mono', monospace;
    font-size: 8px;
    color: var(--orange);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 2px;
    list-style: none;
  }

  .nav-links li button {
    display: block;
    padding: 8px 15px;
    color: var(--muted);
    background: none;
    border: none;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.04em;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
  }

  .nav-links li button:hover {
    color: var(--text);
    background: rgba(255,165,0,0.06);
  }

  .nav-links li button.active {
    color: var(--orange);
    background: rgba(255,165,0,0.08);
  }

  .nav-links li button.active::after {
    content: '';
    position: absolute;
    bottom: 4px; left: 50%; transform: translateX(-50%);
    width: 4px; height: 4px;
    border-radius: 50%;
    background: var(--orange);
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .nav-btn-ghost {
    padding: 8px 18px;
    background: transparent;
    color: var(--muted);
    border: 1px solid rgba(232,240,228,0.15);
    border-radius: 4px;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  .nav-btn-ghost:hover { color: var(--text); border-color: rgba(232,240,228,0.4); }

  .nav-btn-cta {
    padding: 9px 22px;
    background: var(--orange);
    color: #080c0a;
    border: none;
    border-radius: 4px;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.25s;
    letter-spacing: 0.04em;
  }
  .nav-btn-cta:hover { background: #ffb733; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(255,165,0,0.35); }

  @media (max-width: 900px) {
    .navbar { padding: 0 20px; }
    .nav-links { display: none; }
    .nav-actions { display: none; }
  }
    .nav-logo-img {
  width: 42px;
  height: 42px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 0 18px rgba(255,165,0,0.35);
}
`;
import logo from "../assets/logo-removebg-preview.png";
export default function Navbar({ currentPage, navigate }) {
  const links = [
    { label: "Services", key: "Services" },
    { label: "Academy",      key: "Academy" },
    { label: "IMS",  key: "IMS" },
    { label: "Shop",     key: "Shop" },
    { label: "About Us", key: "AboutUs" },
    {label:   "Blog",  key:   "Blog" },
     { label: "Contact",  key: "Contact" },
  ];

  return (
    <>
      <style>{navStyles}</style>
      <nav className="navbar">
        <div className="nav-brand" onClick={() => navigate("/")}>
          <img
          src={logo}
          alt="AFR-IQ logo"
          className="nav-logo-img"
          />
          <div>
            <div className="nav-brand-text">AFR-IQ</div>
            <div className="nav-brand-sub">Technologies Ltd</div>
          </div>
        </div>

        <ul className="nav-links">
          {links.map(({ label, key }) => (
            <li key={key}>
              <button
                className={currentPage === key ? "active" : ""}
                onClick={() => navigate(key)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="nav-btn-ghost">Log In</button>
          <button className="nav-btn-cta" onClick={() => navigate("Contact")}>Get Started →</button>
        </div>
      </nav>
    </>
  );
}