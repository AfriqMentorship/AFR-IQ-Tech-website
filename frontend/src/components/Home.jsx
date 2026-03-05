const styles = `
  .home { background: #080c0a; color: #e8f0e4; font-family: 'Syne', sans-serif; }

  /* ─── HERO ─── */
  .hero {
    position: relative;
    min-height: calc(100vh - 70px);
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 80px 48px 80px 72px;
    gap: 60px;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute; inset: 0; z-index: 0;
    background:
      radial-gradient(ellipse 60% 50% at 20% 50%, rgba(255,165,0,0.08) 0%, transparent 70%),
      radial-gradient(ellipse 40% 60% at 75% 30%, rgba(0,200,120,0.06) 0%, transparent 60%);
  }
  .hero-grid {
    position: absolute; inset: 0; z-index: 0;
    background-image: linear-gradient(rgba(255,165,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,165,0,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .hero-lines { position: absolute; inset: 0; z-index: 0; display: flex; gap: 60px; padding: 0 5%; pointer-events: none; }
  .hero-line { flex: 1; height: 100%; position: relative; overflow: hidden; }
  .hero-line::after {
    content: ''; position: absolute; width: 1px;
    background: linear-gradient(180deg, transparent 0%, rgba(255,165,0,0.15) 30%, rgba(255,165,0,0.3) 50%, rgba(255,165,0,0.15) 70%, transparent 100%);
    left: 50%; height: 60%; top: 0; animation: lineSlide 4s ease-in-out infinite;
  }
  .hero-line:nth-child(2n)::after { animation-delay:-1s; background:linear-gradient(180deg,transparent 0%,rgba(0,200,120,0.1) 30%,rgba(0,200,120,0.2) 50%,rgba(0,200,120,0.1) 70%,transparent 100%); }
  .hero-line:nth-child(3n)::after { animation-delay:-2s; }
  .hero-line:nth-child(4n)::after { animation-delay:-3s; }
  @keyframes lineSlide { 0% { top: -60%; } 100% { top: 100%; } }

  .hero-left { position: relative; z-index: 10; }

  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 14px;
    background: rgba(0,200,120,0.08); border: 1px solid rgba(0,200,120,0.25); border-radius: 2px;
    font-family: 'Space Mono', monospace; font-size: 11px; color: #00c878;
    letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 28px;
    animation: fadeUp 0.7s ease both 0.2s;
  }
  .hero-tag-dot { width:6px; height:6px; border-radius:50%; background:#00c878; animation:blink 2s infinite; }
  @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.3; } }

  .hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(52px,6vw,88px); line-height:0.95; letter-spacing:0.01em; color:#e8f0e4; animation:fadeUp 0.8s ease both 0.35s; }
  .hero-title .accent { color:#ffa500; text-shadow:0 0 40px rgba(255,165,0,0.35); display:block; }
  .hero-title .accent2 { color:#00c878; display:block; }

  .hero-subtitle { font-size:17px; color:rgba(232,240,228,0.55); line-height:1.7; max-width:480px; margin:24px 0 40px; animation:fadeUp 0.8s ease both 0.5s; }

  .hero-ctas { display:flex; gap:16px; flex-wrap:wrap; animation:fadeUp 0.8s ease both 0.65s; }

  .hero-btn-primary {
    padding:16px 40px; background:#ffa500; color:#080c0a; border:none; border-radius:3px;
    font-family:'Syne',sans-serif; font-weight:800; font-size:14px; letter-spacing:0.08em; text-transform:uppercase;
    cursor:pointer; transition:all 0.25s; position:relative; overflow:hidden;
  }
  .hero-btn-primary::before { content:''; position:absolute; inset:0; background:rgba(255,255,255,0.18); transform:translateX(-105%); transition:transform 0.35s ease; }
  .hero-btn-primary:hover::before { transform:translateX(0); }
  .hero-btn-primary:hover { transform:translateY(-2px); box-shadow:0 10px 30px rgba(255,165,0,0.4); }

  .hero-btn-outline {
    padding:15px 36px; background:transparent; color:#e8f0e4; border:1px solid rgba(232,240,228,0.2); border-radius:3px;
    font-family:'Syne',sans-serif; font-weight:700; font-size:14px; letter-spacing:0.06em; text-transform:uppercase;
    cursor:pointer; transition:all 0.25s;
  }
  .hero-btn-outline:hover { border-color:rgba(232,240,228,0.5); background:rgba(232,240,228,0.04); transform:translateY(-2px); }

  .hero-stats { display:flex; gap:40px; margin-top:52px; padding-top:32px; border-top:1px solid rgba(255,165,0,0.12); animation:fadeUp 0.8s ease both 0.8s; }
  .stat-value { font-family:'Bebas Neue',sans-serif; font-size:36px; color:#ffa500; line-height:1; }
  .stat-label { font-size:11px; color:rgba(232,240,228,0.4); letter-spacing:0.08em; text-transform:uppercase; font-family:'Space Mono',monospace; margin-top:4px; }

  /* RIGHT DASHBOARD */
  .hero-right { position:relative; z-index:10; animation:fadeLeft 0.9s ease both 0.4s; }
  @keyframes fadeLeft { from { transform:translateX(40px); opacity:0; } to { transform:translateX(0); opacity:1; } }

  .dashboard-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }

  .dash-card { background:rgba(20,28,17,0.85); border:1px solid rgba(255,165,0,0.12); border-radius:10px; padding:18px; backdrop-filter:blur(10px); transition:all 0.3s; position:relative; overflow:hidden; }
  .dash-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,#ffa500,transparent); opacity:0; transition:opacity 0.3s; }
  .dash-card:hover { border-color:rgba(255,165,0,0.3); transform:translateY(-3px); }
  .dash-card:hover::before { opacity:1; }
  .dash-card.green::before { background:linear-gradient(90deg,#00c878,transparent); }
  .dash-card.green:hover { border-color:rgba(0,200,120,0.3); }
  .dash-card.wide { grid-column:span 2; }

  .card-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
  .card-title { font-family:'Space Mono',monospace; font-size:10px; color:rgba(232,240,228,0.4); text-transform:uppercase; letter-spacing:0.1em; }
  .card-badge { font-family:'Space Mono',monospace; font-size:10px; padding:3px 8px; border-radius:20px; background:rgba(0,200,120,0.1); color:#00c878; border:1px solid rgba(0,200,120,0.2); }
  .card-badge.warn { background:rgba(255,165,0,0.1); color:#ffa500; border-color:rgba(255,165,0,0.2); }

  .card-value { font-family:'Bebas Neue',sans-serif; font-size:38px; color:#e8f0e4; line-height:1; }
  .card-value span { font-size:17px; color:rgba(232,240,228,0.4); }
  .card-sub { font-size:11px; color:rgba(232,240,228,0.4); font-family:'Space Mono',monospace; margin-top:4px; }
  .card-meta-row { display:flex; gap:20px; margin-top:10px; padding-top:10px; border-top:1px solid rgba(255,255,255,0.05); }
  .card-meta .label { font-family:'Space Mono',monospace; font-size:10px; color:rgba(232,240,228,0.35); }
  .card-meta .val { font-family:'Space Mono',monospace; font-size:11px; color:#e8f0e4; font-weight:700; }

  .mini-chart { display:flex; align-items:flex-end; gap:3px; height:44px; margin-top:10px; }
  .bar { flex:1; border-radius:2px 2px 0 0; background:#ffa500; opacity:0.5; transition:opacity 0.2s; animation:growBar 0.8s ease both; }
  @keyframes growBar { from { transform:scaleY(0); transform-origin:bottom; } to { transform:scaleY(1); transform-origin:bottom; } }
  .bar.green { background:#00c878; }
  .bar:hover { opacity:1; }

  .service-map { display:flex; align-items:center; gap:8px; margin-top:10px; }
  .service-node { display:flex; flex-direction:column; align-items:center; gap:3px; }
  .node-circle { width:28px; height:28px; border-radius:50%; border:1.5px solid rgba(255,165,0,0.4); background:rgba(255,165,0,0.08); display:flex; align-items:center; justify-content:center; font-size:7px; color:#ffa500; font-family:'Space Mono',monospace; }
  .node-circle.active { background:#ffa500; color:#080c0a; box-shadow:0 0 12px rgba(255,165,0,0.4); width:36px; height:36px; }
  .node-label { font-family:'Space Mono',monospace; font-size:7px; color:rgba(232,240,228,0.4); text-align:center; }
  .node-connector { flex:1; height:1px; border-top:1px dashed rgba(255,165,0,0.25); margin-bottom:12px; }

  .uptime-row { display:flex; gap:3px; margin-top:8px; flex-wrap:wrap; }
  .uptime-dot { width:9px; height:9px; border-radius:2px; background:#00c878; opacity:0.7; }
  .uptime-dot.down { background:#ffa500; }

  .progress-list { display:flex; flex-direction:column; gap:8px; margin-top:10px; }
  .prog-label { display:flex; justify-content:space-between; font-family:'Space Mono',monospace; font-size:10px; color:rgba(232,240,228,0.4); margin-bottom:3px; }
  .prog-bar { height:4px; background:rgba(255,255,255,0.07); border-radius:2px; overflow:hidden; }
  .prog-fill { height:100%; border-radius:2px; background:linear-gradient(90deg,#ffa500,#00c878); animation:fillBar 1.2s ease both; }
  @keyframes fillBar { from { width:0 !important; } }

  /* Services strip */
  .services-strip {
    background:rgba(15,21,16,0.9); border-top:1px solid rgba(255,165,0,0.1);
    padding:28px 72px; display:flex;
  }
  .service-item { flex:1; display:flex; align-items:center; gap:12px; padding:0 28px; border-right:1px solid rgba(255,165,0,0.1); cursor:pointer; transition:all 0.2s; }
  .service-item:first-child { padding-left:0; }
  .service-item:last-child { border-right:none; }
  .service-item:hover .svc-icon { background:rgba(255,165,0,0.14); border-color:rgba(255,165,0,0.4); }
  .svc-icon { width:42px; height:42px; border-radius:8px; background:rgba(255,165,0,0.06); border:1px solid rgba(255,165,0,0.15); display:flex; align-items:center; justify-content:center; font-size:18px; transition:all 0.2s; flex-shrink:0; }
  .svc-name { font-size:13px; font-weight:700; color:#e8f0e4; }
  .svc-desc { font-size:10px; color:rgba(232,240,228,0.4); font-family:'Space Mono',monospace; margin-top:2px; }

  @keyframes fadeUp { from { transform:translateY(24px); opacity:0; } to { transform:translateY(0); opacity:1; } }

  @media (max-width:900px) {
    .hero { grid-template-columns:1fr; padding:50px 24px; }
    .hero-right { display:none; }
    .services-strip { flex-direction:column; gap:20px; padding:28px 24px; }
    .service-item { border-right:none; border-bottom:1px solid rgba(255,165,0,0.08); padding:0 0 16px; }
    .service-item:last-child { border-bottom:none; padding-bottom:0; }
  }
`;

const bars = [35,55,40,70,50,80,45,90,60,75,55,85,40,65,50,78,62,88];

const services = [
  { icon: "🖥️", name: "IT Solutions", desc: "Infrastructure & Support" },
  { icon: "🎓", name: "AFR Academy", desc: "Professional Training" },
  { icon: "📦", name: "Tech Shop", desc: "Smart Device Sales" },
  { icon: "📊", name: "IMS Platform", desc: "Inventory Management" },
  { icon: "🔒", name: "Cybersecurity", desc: "Threat Protection" },
];

export default function Home({ navigate }) {
  return (
    <>
      <style>{styles}</style>
      <div className="home">
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-grid" />
          <div className="hero-lines">
            {Array.from({ length: 14 }).map((_, i) => <div className="hero-line" key={i} />)}
          </div>

          {/* LEFT */}
          <div className="hero-left">
            <div className="hero-tag"><div className="hero-tag-dot" />Learn.Think.Innovate</div>
            <h1 className="hero-title">
              Driving Africa
              <span className="accent">To Technology</span>
              <span className="accent2">Independence.</span>
            </h1>
            <p className="hero-subtitle">
              Innovative IT infrastructure, professional technology training, and cutting-edge smart device sales — empowering businesses across East Africa.
            </p>
            <div className="hero-ctas">
              <button className="hero-btn-primary" onClick={() => navigate("Services")}>Explore Services</button>
              <button className="hero-btn-outline" onClick={() => navigate("Contact")}>Book a Demo</button>
            </div>
            <div className="hero-stats">
              <div><div className="stat-value">500+</div><div className="stat-label">Clients Served</div></div>
              <div><div className="stat-value">98%</div><div className="stat-label">Uptime SLA</div></div>
              <div><div className="stat-value">12+</div><div className="stat-label">Years in Tech</div></div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-right">
            <div className="dashboard-grid">
              <div className="dash-card">
                <div className="card-header"><div className="card-title">Network SLA (7d)</div><div className="card-badge">Live</div></div>
                <div className="card-value">99.8<span>%</span></div>
                <div className="card-sub">Uptime this week</div>
                <div className="card-meta-row">
                  <div className="card-meta"><div className="label">Incidents</div><div className="val">0</div></div>
                  <div className="card-meta"><div className="label">Avg Response</div><div className="val">1.2ms</div></div>
                </div>
                <div className="uptime-row">
                  {Array.from({length:28}).map((_,i) => <div key={i} className={`uptime-dot ${i===11?"down":""}`} />)}
                </div>
              </div>

              <div className="dash-card green">
                <div className="card-header"><div className="card-title">Service Map</div><div className="card-badge">3 Active</div></div>
                <div className="service-map">
                  <div className="service-node"><div className="node-circle">CL</div><div className="node-label">Client</div></div>
                  <div className="node-connector" />
                  <div className="service-node"><div className="node-circle active">API</div><div className="node-label">Gateway</div></div>
                  <div className="node-connector" />
                  <div className="service-node"><div className="node-circle">DB</div><div className="node-label">Database</div></div>
                </div>
                <div className="card-meta-row">
                  <div className="card-meta"><div className="label">Latency</div><div className="val">44ms</div></div>
                  <div className="card-meta"><div className="label">Throughput</div><div className="val">1.2k rps</div></div>
                </div>
              </div>

              <div className="dash-card wide">
                <div className="card-header"><div className="card-title">Client Requests — This Week</div><div className="card-badge warn">↑ 18% vs last week</div></div>
                <div className="mini-chart">
                  {bars.map((h,i) => <div key={i} className={`bar ${i%3===1?"green":""}`} style={{height:`${h}%`,animationDelay:`${i*0.04}s`}} />)}
                </div>
                <div className="card-meta-row" style={{marginTop:"12px"}}>
                  <div className="card-meta"><div className="label">Peak</div><div className="val">2,847</div></div>
                  <div className="card-meta"><div className="label">Avg/day</div><div className="val">1,204</div></div>
                  <div className="card-meta"><div className="label">Total</div><div className="val">8,428</div></div>
                </div>
              </div>

              <div className="dash-card">
                <div className="card-header"><div className="card-title">Academy Progress</div><div className="card-badge">4 Courses</div></div>
                <div className="progress-list">
                  {[{name:"Cybersecurity",pct:82},{name:"Cloud Infra",pct:67},{name:"Networking",pct:91},{name:"Data Systems",pct:54}].map(c => (
                    <div key={c.name}>
                      <div className="prog-label"><span>{c.name}</span><span>{c.pct}%</span></div>
                      <div className="prog-bar"><div className="prog-fill" style={{width:`${c.pct}%`}} /></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="dash-card green">
                <div className="card-header"><div className="card-title">Shop Activity</div><div className="card-badge">Today</div></div>
                <div className="card-value">147<span> orders</span></div>
                <div className="card-sub">↑ 23 from yesterday</div>
                <div className="card-meta-row">
                  <div className="card-meta"><div className="label">Revenue</div><div className="val">UGX 4.2M</div></div>
                  <div className="card-meta"><div className="label">Items</div><div className="val">312 units</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services strip */}
        <div className="services-strip">
          {services.map(s => (
            <div className="service-item" key={s.name} onClick={() => navigate(s.name === "AFR Academy" ? "Academy" : s.name === "IMS Platform" ? "IMS" : s.name === "Tech Shop" ? "Shop" : "Services")}>
              <div className="svc-icon">{s.icon}</div>
              <div><div className="svc-name">{s.name}</div><div className="svc-desc">{s.desc}</div></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}