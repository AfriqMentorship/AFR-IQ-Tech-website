const styles = `
  .page { 
    min-height: calc(100vh - 75px); 
    background: var(--bg-base); 
    color: var(--text-primary); 
    font-family: 'Poppins', sans-serif; 
    transition: background 0.3s ease;
  }

  .page-hero {
    position: relative;
    padding: 100px 48px 80px;
    border-bottom: 1px solid var(--border-medium);
    overflow: hidden;
    background: var(--bg-base);
  }
  .page-hero::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 70% 60% at 10% 50%, var(--accent-orange-glow) 0%, transparent 70%);
    pointer-events: none;
    opacity: 0.6;
  }
  .page-grid-bg {
    position: absolute; inset: 0;
    background-image: 
      linear-gradient(var(--border-subtle) 1px, transparent 1px), 
      linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    opacity: 0.4;
  }
  .page-eyebrow {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: var(--accent-green);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 24px;
    display: flex; align-items: center; gap: 12px;
    font-weight: 700;
  }
  .page-eyebrow::before { content: ''; display: block; width: 32px; height: 1.5px; background: var(--accent-green); opacity: 0.6; }
  .page-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(56px, 9vw, 96px);
    line-height: 0.9;
    color: var(--text-primary);
    margin-bottom: 28px;
    letter-spacing: 0.02em;
  }
  .page-title .hl { color: var(--accent-orange); text-shadow: 0 0 40px var(--accent-orange-glow); }
  .page-desc { font-size: 18px; color: var(--text-secondary); max-width: 580px; line-height: 1.7; }

  /* Services Grid */
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 32px;
    padding: 80px 48px;
    max-width: 1440px;
    margin: 0 auto;
  }

  .srv-card {
    background: var(--bg-level1);
    border: 1px solid var(--border-subtle);
    border-radius: 20px;
    padding: 40px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    cursor: pointer;
    box-shadow: var(--shadow-soft);
  }
  .srv-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 4px;
    background: var(--accent-gradient);
    opacity: 0; transition: opacity 0.3s;
  }
  .srv-card:hover { 
    transform: translateY(-10px); 
    border-color: var(--accent-orange); 
    background: var(--bg-level2);
    box-shadow: 0 30px 60px rgba(0,0,0,0.1); 
  }
  .srv-card:hover::before { opacity: 1; }

  .srv-icon {
    font-size: 36px;
    margin-bottom: 28px;
    width: 72px; height: 72px;
    background: var(--bg-level2);
    border: 1px solid var(--border-medium);
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.3s;
    color: var(--accent-orange);
  }
  .srv-card:hover .srv-icon { 
    background: var(--accent-orange); 
    color: #fff; 
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 0 20px var(--accent-orange-glow);
  }

  .srv-name {
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
    font-size: 26px;
    color: var(--text-primary);
    margin-bottom: 16px;
    letter-spacing: -0.02em;
  }
  .srv-desc { font-size: 15px; color: var(--text-secondary); line-height: 1.7; margin-bottom: 28px; }
  .srv-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .srv-list li {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: var(--text-muted);
    display: flex; align-items: center; gap: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .srv-list li::before { content: '→'; color: var(--accent-orange); font-weight: 900; }

  @media (max-width: 1200px) {
    .services-grid { grid-template-columns: 1fr; padding: 60px 24px; }
    .page-hero { padding: 80px 24px 60px; }
    .page-title { font-size: 52px; }
  }
  @media (max-width: 500px) {
    .page-hero { padding: 40px 16px; }
    .page-title { font-size: 40px; }
    .services-grid { padding: 40px 16px; gap: 24px; }
    .srv-card { padding: 24px; }
  }
`;

const services = [
  {
    icon: "🖥️",
    name: "IT Infrastructure",
    desc: "End-to-end IT setup, maintenance, and support for businesses of all sizes.",
    items: ["Network Installation & Config", "Server Setup & Management", "Hardware Procurement", "Remote IT Support"],
  },
  {
    icon: "☁️",
    name: "Cloud Solutions",
    desc: "Migrate, manage, and scale your operations on leading cloud platforms.",
    items: ["Cloud Migration", "AWS / Azure Setup", "Backup & Recovery", "Cloud Security"],
  },
  {
    icon: "🔒",
    name: "Cybersecurity",
    desc: "Protect your business from modern threats with enterprise-grade security.",
    items: ["Vulnerability Assessments", "Firewall & Endpoint Protection", "Security Audits", "Incident Response"],
  },
  {
    icon: "📱",
    name: "Smart Tech Sales",
    desc: "Genuine smart devices, accessories, and enterprise hardware at the best prices.",
    items: ["Laptops & Desktops", "Smart Phones & Tablets", "Networking Equipment", "CCTV & Surveillance"],
  },
  {
    icon: "🛠️",
    name: "Software Solutions",
    desc: "Custom software, ERP, and business management systems built for Africa.",
    items: ["Custom Web & Mobile Apps", "ERP Implementation", "Database Management", "API Integration"],
  },
  {
    icon: "📡",
    name: "Connectivity & ISP",
    desc: "Fast, reliable internet and networking solutions for homes and businesses.",
    items: ["Fibre & Wireless Internet", "LAN/WAN Design", "VPN Solutions", "24/7 Network Monitoring"],
  },
];

export default function Services() {
  return (
    <>
      <style>{styles}</style>
      <div className="page">
        <div className="page-hero">
          <div className="page-grid-bg" />
          <div className="page-eyebrow">Our Services</div>
          <h1 className="page-title">What We <span className="hl">Do Best</span></h1>
          <p className="page-desc">
            From IT infrastructure to cybersecurity, cloud solutions to smart tech sales — we cover every layer of your technology needs.
          </p>
        </div>
        <div className="services-grid">
          {services.map(s => (
            <div className="srv-card" key={s.name}>
              <div className="srv-icon">{s.icon}</div>
              <div className="srv-name">{s.name}</div>
              <div className="srv-desc">{s.desc}</div>
              <ul className="srv-list">
                {s.items.map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
