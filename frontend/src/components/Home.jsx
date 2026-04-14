import { useEffect, useRef, useState } from "react";

const styles = `
  .home { background: var(--bg-base); color: var(--text-primary); font-family: 'Poppins', sans-serif; transition: all 0.3s ease; }

  @media (max-width: 700px) {
    .stats-grid { grid-template-columns: 1fr 1fr; }
  }

  /* ─── HERO ─── */
  .hero {
    position: relative;
    min-height: calc(100vh - 75px);
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;
    padding: 80px 48px;
    gap: 60px;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute; inset: 0; z-index: 0;
    background:
      radial-gradient(ellipse 60% 50% at 20% 50%, var(--accent-orange-glow) 0%, transparent 70%),
      radial-gradient(ellipse 40% 60% at 75% 30%, var(--accent-green-glow) 0%, transparent 60%);
  }
  .hero-grid {
    position: absolute; inset: 0; z-index: 0;
    background-image: linear-gradient(var(--border-medium) 1px, transparent 1px), 
                      linear-gradient(90deg, var(--border-medium) 1px, transparent 1px);
    background-size: 60px 60px;
    opacity: 0.3;
  }
  .hero-lines { position: absolute; inset: 0; z-index: 0; display: flex; gap: 60px; padding: 0 5%; pointer-events: none; }
  .hero-line { flex: 1; height: 100%; position: relative; overflow: hidden; }
  .hero-line::after {
    content: ''; position: absolute; width: 1px;
    background: linear-gradient(180deg, transparent 0%, var(--accent-orange) 50%, transparent 100%);
    left: 50%; height: 60%; top: 0; animation: lineSlide 4s ease-in-out infinite;
    opacity: 0.2;
  }
  .hero-line:nth-child(2n)::after { animation-delay:-1s; background:linear-gradient(180deg,transparent 0%,var(--accent-green) 50%,transparent 100%); }
  @keyframes lineSlide { 0% { top: -60%; } 100% { top: 100%; } }

  .hero-left { position: relative; z-index: 10; }

  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 8px 16px;
    background: var(--accent-green-glow); border: 1px solid var(--accent-green); border-radius: 4px;
    font-family: 'Inter', sans-serif; font-size: 11px; color: var(--accent-green);
    letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 32px;
    animation: fadeUp 0.7s ease both 0.2s;
  }
  .hero-tag-dot { width:6px; height:6px; border-radius:50%; background:currentColor; animation:blink 2s infinite; }
  @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.3; } }

  .hero-title { 
    font-family:'Poppins', sans-serif; 
    font-size:clamp(52px,6.5vw,94px); 
    line-height:0.9; 
    letter-spacing:0.01em; 
    color:var(--text-primary); 
    animation:fadeUp 0.8s ease both 0.35s; 
  }
  .hero-title .accent { 
    color:var(--accent-orange); 
    text-shadow: 0 0 30px var(--accent-orange-glow);
    display:block; 
  }
  .hero-title .accent2 { color:var(--accent-green); display:block; }

  .hero-subtitle { 
    font-size:18px; 
    color:var(--text-secondary); 
    line-height:1.6; 
    max-width:520px; 
    margin:28px 0 44px; 
    animation:fadeUp 0.8s ease both 0.5s; 
  }

  .hero-ctas { display:flex; gap:16px; flex-wrap:wrap; animation:fadeUp 0.8s ease both 0.65s; }

  .hero-btn-primary {
    padding:18px 44px; background:var(--accent-gradient); color:var(--text-inverse); border:none; border-radius:6px;
    font-family:'Poppins', sans-serif; font-weight:800; font-size:14px; letter-spacing:0.08em; text-transform:uppercase;
    cursor:pointer; transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .hero-btn-primary:hover { transform:translateY(-3px); box-shadow:0 12px 30px var(--accent-orange-glow); }

  .hero-btn-outline {
    padding:17px 40px; background:transparent; color:var(--text-primary); border:1px solid var(--border-strong); border-radius:6px;
    font-family:'Poppins', sans-serif; font-weight:700; font-size:14px; letter-spacing:0.06em; text-transform:uppercase;
    cursor:pointer; transition:all 0.3s;
  }
  .hero-btn-outline:hover { background:var(--bg-level1); border-color:var(--accent-orange); transform:translateY(-3px); }

  .hero-stats { 
    display:flex; gap:48px; margin-top:60px; padding-top:40px; 
    border-top:1px solid var(--border-subtle); 
    animation:fadeUp 0.8s ease both 0.8s; 
  }
  .stat-value { font-family:'Poppins', sans-serif; font-size:42px; color:var(--accent-orange); line-height:1; }
  .stat-label { font-size:11px; color:var(--text-muted); letter-spacing:0.08em; text-transform:uppercase; font-family:'Inter', sans-serif; margin-top:6px; }

  /* RIGHT DASHBOARD */
  .hero-right { position:relative; z-index:10; animation:fadeLeft 0.9s ease both 0.4s; }
  @keyframes fadeLeft { from { transform:translateX(40px); opacity:0; } to { transform:translateX(0); opacity:1; } }

  .dashboard-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }

  .dash-card { 
    background:var(--bg-level1); 
    border:1px solid var(--border-medium); 
    border-radius:12px; 
    padding:20px; 
    backdrop-filter:blur(10px); 
    transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
    position:relative; 
    overflow:hidden; 
    box-shadow: var(--shadow-soft);
  }
  .dash-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:var(--accent-gradient); opacity:0; transition:opacity 0.3s; }
  .dash-card:hover { border-color:var(--accent-orange); transform:translateY(-5px); }
  .dash-card:hover::before { opacity:1; }
  
  .dash-card.green::before { background: linear-gradient(90deg, var(--accent-green), transparent); }
  .dash-card.green:hover { border-color:var(--accent-green); }
  .dash-card.wide { grid-column:span 2; }

  .card-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
  .card-title { font-family:'Inter', sans-serif; font-size:10px; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.1em; }
  .card-badge { font-family:'Inter', sans-serif; font-size:10px; padding:4px 10px; border-radius:20px; background:var(--accent-green-glow); color:var(--accent-green); border:1px solid rgba(var(--accent-green-rgb), 0.2); }
  .card-badge.warn { background:var(--accent-orange-glow); color:var(--accent-orange); border-color:rgba(var(--accent-orange-rgb), 0.2); }

  .card-value { font-family:'Poppins', sans-serif; font-size:42px; color:var(--text-primary); line-height:1; }
  .card-value span { font-size:18px; color:var(--text-muted); }
  .card-sub { font-size:11px; color:var(--text-muted); font-family:'Inter', sans-serif; margin-top:6px; }
  .card-meta-row { display:flex; gap:24px; margin-top:14px; padding-top:14px; border-top:1px solid var(--border-subtle); }
  .card-meta .label { font-family:'Inter', sans-serif; font-size:10px; color:var(--text-muted); }
  .card-meta .val { font-family:'Inter', sans-serif; font-size:12px; color:var(--text-primary); font-weight:700; }

  .mini-chart { display:flex; align-items:flex-end; gap:4px; height:48px; margin-top:12px; }
  .bar { 
    flex:1; border-radius:3px 3px 0 0; background:var(--accent-orange); opacity:0.5; 
    transition:all 0.3s; 
    transform-origin: bottom;
    animation: musicWave 1.5s ease-in-out infinite;
  }
  @keyframes musicWave {
    0%, 100% { transform: scaleY(0.4); }
    50% { transform: scaleY(1); }
  }
  .bar.green { background:var(--accent-green); }
  .bar:hover { opacity:1; transform: scaleX(1.1); }

  .service-map { display:flex; align-items:center; gap:10px; margin-top:12px; }
  .service-node { display:flex; flex-direction:column; align-items:center; gap:4px; }
  .node-circle { width:32px; height:32px; border-radius:50%; border:1.5px solid var(--border-strong); background:var(--bg-level2); display:flex; align-items:center; justify-content:center; font-size:8px; color:var(--accent-orange); font-family:'Inter', sans-serif; }
  .node-circle.active { background:var(--accent-orange); color:var(--text-inverse); box-shadow:0 0 15px var(--accent-orange-glow); width:40px; height:40px; }
  .node-label { font-family:'Inter', sans-serif; font-size:8px; color:var(--text-muted); text-align:center; }
  .node-connector { flex:1; height:1px; border-top:1px dashed var(--border-strong); margin-bottom:14px; }

  .uptime-row { display:flex; gap:4px; margin-top:10px; flex-wrap:wrap; }
  .uptime-dot { width:10px; height:10px; border-radius:3px; background:var(--accent-green); opacity:0.7; }
  .uptime-dot.down { background:var(--accent-orange); }

  .progress-list { display:flex; flex-direction:column; gap:12px; margin-top:12px; }
  .prog-label { display:flex; justify-content:space-between; font-family:'Inter', sans-serif; font-size:11px; color:var(--text-muted); margin-bottom:5px; }
  .prog-bar { height:6px; background:var(--bg-level2); border-radius:3px; overflow:hidden; }
  .prog-fill { height:100%; border-radius:3px; background:linear-gradient(90deg, var(--accent-orange), var(--accent-green)); animation:fillBar 1.2s ease both; }

  /* Services strip */
  .services-strip {
    background:var(--bg-level1); border-top:1px solid var(--border-subtle);
    padding:32px 48px; display:flex; justify-content: center;
    backdrop-filter: blur(10px);
  }
  .service-item { flex:1; max-width: 250px; display:flex; align-items:center; gap:16px; padding:0 24px; border-right:1px solid var(--border-subtle); cursor:pointer; transition:all 0.3s; }
  .service-item:last-child { border-right:none; }
  .service-item:hover { background: var(--bg-level2); border-radius: 8px; }
  .service-item:hover .svc-icon { transform: scale(1.1); background: var(--accent-orange-glow); border-color: var(--accent-orange); }
  
  .svc-icon { 
    width:48px; height:48px; border-radius:10px; 
    background:var(--bg-level2); border:1px solid var(--border-medium); 
    display:flex; align-items:center; justify-content:center; 
    font-size:22px; transition:all 0.3s; flex-shrink:0; 
  }
  .svc-name { font-size:14px; font-weight:700; color:var(--text-primary); }
  .svc-desc { font-size:11px; color:var(--text-muted); font-family:'Inter', sans-serif; margin-top:3px; }

  @keyframes fadeUp { from { transform:translateY(30px); opacity:0; } to { transform:translateY(0); opacity:1; } }

  /* ─── STATS COUNTER SECTION ─── */
  .stats-section {
    padding: 100px 48px;
    background: var(--bg-base);
    position: relative;
    overflow: hidden;
  }
  .stats-section::before {
    content: '';
    position: absolute; inset: 0; z-index: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 50%, var(--accent-orange-glow) 0%, transparent 70%);
    opacity: 0.4;
  }
  .stats-inner {
    position: relative; z-index: 1;
    max-width: 1100px; margin: 0 auto;
  }
  .stats-label {
    font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.15em;
    color: var(--accent-orange); text-align: center; margin-bottom: 16px;
  }
  .stats-heading {
    font-family: 'Poppins', sans-serif; font-size: clamp(32px, 4vw, 52px);
    font-weight: 800; color: var(--text-primary); text-align: center;
    margin-bottom: 72px; letter-spacing: -0.02em; line-height: 1.1;
  }
  .stats-heading span { color: var(--accent-orange); }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px;
  }
  .stats-card {
    background: var(--bg-level1);
    border: 1px solid var(--border-subtle);
    padding: 48px 32px;
    text-align: center;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }
  .stats-card::after {
    content: '';
    position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
    width: 0; height: 3px;
    background: var(--accent-gradient);
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .stats-card:hover { background: var(--bg-level2); transform: translateY(-8px); border-color: var(--accent-orange); box-shadow: 0 20px 60px rgba(0,0,0,0.15); }
  .stats-card:hover::after { width: 100%; }
  .stats-card:first-child { border-radius: 20px 0 0 20px; }
  .stats-card:last-child { border-radius: 0 20px 20px 0; }

  .stats-card-icon {
    font-size: 36px; margin-bottom: 20px;
    display: inline-flex; width: 72px; height: 72px;
    background: var(--bg-level2); border: 1px solid var(--border-subtle);
    border-radius: 20px; align-items: center; justify-content: center;
    transition: all 0.3s ease;
  }
  .stats-card:hover .stats-card-icon {
    background: var(--accent-orange-glow);
    border-color: var(--accent-orange);
    transform: scale(1.1) rotate(-5deg);
  }
  .stats-count {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(40px, 4vw, 64px);
    font-weight: 800; line-height: 1;
    color: var(--accent-orange);
    letter-spacing: -0.02em;
    margin-bottom: 8px;
    transition: all 0.3s;
  }
  .stats-card:nth-child(2) .stats-count { color: var(--accent-green); }
  .stats-card:nth-child(3) .stats-count { color: #4a90e2; }
  .stats-card:nth-child(4) .stats-count { color: #9b59b6; }
  .stats-card-title {
    font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 700;
    color: var(--text-primary); margin-bottom: 6px;
  }
  .stats-card-desc {
    font-family: 'Inter', sans-serif; font-size: 12px; color: var(--text-muted);
    font-weight: 500; line-height: 1.5;
  }

  /* ─── TESTIMONIALS SECTION ─── */
  .testimonials-section {
    padding: 100px 48px;
    background: var(--bg-level1);
    border-top: 1px solid var(--border-subtle);
    position: relative; overflow: hidden;
  }
  .testimonials-section::before {
    content: '';
    position: absolute; top: 0; right: 0;
    width: 500px; height: 500px;
    background: radial-gradient(circle, var(--accent-green-glow) 0%, transparent 70%);
    opacity: 0.3; pointer-events: none;
  }
  .testimonials-inner {
    max-width: 1200px; margin: 0 auto;
    position: relative; z-index: 1;
  }
  .testimonials-top {
    display: flex; justify-content: space-between; align-items: flex-end;
    margin-bottom: 64px; gap: 32px;
  }
  .testimonials-label {
    font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.15em;
    color: var(--accent-green); margin-bottom: 12px;
  }
  .testimonials-heading {
    font-family: 'Poppins', sans-serif; font-size: clamp(30px, 3.5vw, 48px);
    font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em;
    line-height: 1.1; max-width: 480px;
  }
  .testimonials-heading span { color: var(--accent-green); }
  .testimonials-nav { display: flex; gap: 12px; flex-shrink: 0; }
  .t-nav-btn {
    width: 48px; height: 48px; border-radius: 50%;
    background: var(--bg-level2); border: 1px solid var(--border-subtle);
    color: var(--text-secondary); font-size: 20px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.3s ease;
  }
  .t-nav-btn:hover, .t-nav-btn.active { background: var(--accent-orange); color: #fff; border-color: var(--accent-orange); transform: scale(1.08); }

  .testimonials-track {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
  }

  .testimonial-card {
    background: var(--bg-base);
    border: 1px solid var(--border-subtle);
    border-radius: 24px;
    padding: 36px;
    position: relative;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    opacity: 0;
    transform: translateY(30px);
  }
  .testimonial-card.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .testimonial-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: var(--accent-gradient); opacity: 0;
    transition: opacity 0.4s;
  }
  .testimonial-card:hover { border-color: var(--accent-orange); transform: translateY(-8px); box-shadow: 0 30px 60px rgba(0,0,0,0.12); }
  .testimonial-card:hover::before { opacity: 1; }
  .testimonial-card.featured {
    border-color: var(--accent-orange);
    background: linear-gradient(135deg, var(--bg-level1) 0%, var(--bg-base) 100%);
  }
  .testimonial-card.featured::before { opacity: 0.6; }

  .t-quote-icon {
    font-size: 48px; line-height: 1; color: var(--accent-orange);
    opacity: 0.2; font-family: Georgia, serif; margin-bottom: 8px;
    display: block;
  }
  .testimonial-card.featured .t-quote-icon { opacity: 0.4; }

  .t-stars {
    display: flex; gap: 4px; margin-bottom: 16px;
  }
  .t-star { font-size: 16px; }

  .t-text {
    font-family: 'Inter', sans-serif; font-size: 15px;
    color: var(--text-secondary); line-height: 1.75;
    font-weight: 500; margin-bottom: 28px;
    font-style: italic;
  }

  .t-author { display: flex; align-items: center; gap: 14px; }
  .t-avatar {
    width: 50px; height: 50px; border-radius: 50%;
    background: var(--accent-gradient);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Poppins', sans-serif; font-size: 18px; font-weight: 800;
    color: #fff; flex-shrink: 0; border: 2px solid var(--accent-orange);
  }
  .t-avatar.green { background: linear-gradient(135deg, var(--accent-green), #00a84f); border-color: var(--accent-green); }
  .t-avatar.blue { background: linear-gradient(135deg, #4a90e2, #1565c0); border-color: #4a90e2; }
  .t-avatar.purple { background: linear-gradient(135deg, #9b59b6, #6c3483); border-color: #9b59b6; }
  .t-avatar.teal { background: linear-gradient(135deg, #1abc9c, #0e8c6c); border-color: #1abc9c; }
  .t-avatar.red { background: linear-gradient(135deg, #e74c3c, #a93226); border-color: #e74c3c; }

  .t-name {
    font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 800;
    color: var(--text-primary);
  }
  .t-role {
    font-family: 'Inter', sans-serif; font-size: 10px; color: var(--text-muted);
    font-weight: 500; margin-top: 2px;
    white-space: nowrap; 
  }
  .t-tag {
    position: absolute;
    top: 48px;
    right: 36px;
    background: var(--accent-orange-glow); color: var(--accent-orange);
    border: 1px solid rgba(255,165,0,0.2); border-radius: 20px;
    font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em;
    padding: 6px 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  .t-tag.green { background: var(--accent-green-glow); color: var(--accent-green); border-color: rgba(0,200,120,0.2); }
  .t-tag.blue { background: rgba(74,144,226,0.1); color: #4a90e2; border-color: rgba(74,144,226,0.2); }

  /* Dots */
  .testimonials-dots {
    display: flex; justify-content: center; gap: 8px; margin-top: 48px;
  }
  .t-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--border-strong); cursor: pointer;
    transition: all 0.3s ease;
  }
  .t-dot.active { width: 28px; border-radius: 4px; background: var(--accent-orange); }

  /* Trust bar */
  .trust-bar {
    margin-top: 72px; padding-top: 48px;
    border-top: 1px solid var(--border-subtle);
    display: flex; align-items: center; justify-content: center;
    flex-wrap: wrap; gap: 48px;
  }
  .trust-item {
    display: flex; align-items: center; gap: 12px;
    font-family: 'Inter', sans-serif; font-size: 13px;
    color: var(--text-muted); font-weight: 600;
  }
  .trust-icon {
    width: 36px; height: 36px; border-radius: 10px;
    background: var(--bg-level2); border: 1px solid var(--border-subtle);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
  }

  @media (max-width:1100px) {
    .hero { grid-template-columns: 1fr; padding: 60px 24px; text-align: center; }
    .hero-subtitle { margin: 28px auto 44px; }
    .hero-ctas { justify-content: center; }
    .hero-stats { justify-content: center; }
    .hero-right { display:none; }
    .services-strip { flex-wrap: wrap; gap: 24px; }
    .service-item { border-right: none; flex: 1 1 200px; padding: 12px; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .stats-card:first-child { border-radius: 20px 0 0 0; }
    .stats-card:last-child { border-radius: 0 0 20px 0; }
    .stats-section { padding: 70px 24px; }
    .testimonials-section { padding: 70px 24px; }
    .testimonials-track { grid-template-columns: 1fr; }
    .testimonials-top { flex-direction: column; align-items: flex-start; }
    .testimonials-nav { align-self: flex-end; }
  }
  @media (max-width: 500px) {
    .stats-grid { grid-template-columns: 1fr; gap: 12px; }
    .stats-card:first-child { border-radius: 20px 20px 0 0; }
    .stats-card:last-child { border-radius: 0 0 20px 20px; }
    .hero { padding: 20px 16px; }
    .hero-title { font-size: 38px; }
    .hero-ctas { flex-direction: column; width: 100%; gap: 12px; }
    .hero-btn-primary, .hero-btn-outline { width: 100%; text-align: center; }
    .hero-stats { flex-direction: column; align-items: flex-start; gap: 24px; margin-top: 30px; }
  }
  @media (max-width: 700px) {
    .stats-grid { grid-template-columns: 1fr 1fr; }
    .stats-card { padding: 32px 20px; }
    .stats-card:first-child { border-radius: 16px 0 0 0; }
    .stats-card:last-child { border-radius: 0 0 16px 0; }
    .trust-bar { gap: 28px; }
  }
  @media (max-width: 420px) {
    .hero-title { font-size: 34px !important; }
    .hero-subtitle { font-size: 14px; margin: 20px 0 32px; }
    .hero-tag { font-size: 10px; margin-bottom: 20px; }
    .hero-btn-primary, .hero-btn-outline { padding: 14px 28px; font-size: 12px; }
    .stats-heading { font-size: 28px; }
    .stats-card-icon { width: 56px; height: 56px; font-size: 28px; }
    .stats-count { font-size: 32px; }
  }
  @media (max-width: 360px) {
    .hero-title { font-size: 28px !important; }
    .stats-grid { grid-template-columns: 1fr; }
  }
`;

const bars = [35, 55, 40, 70, 50, 80, 45, 90, 60, 75, 55, 85, 40, 65, 50, 78, 62, 88];

const services = [
  { icon: "🖥️", name: "IT Solutions", desc: "Infrastructure & Support" },
  { icon: "🎓", name: "Academy", desc: "Professional Training" },
  { icon: "📦", name: "Tech Shop", desc: "Smart Device Sales" },
  { icon: "📊", name: "IMS Platform", desc: "Internship Management" },
  { icon: "🔒", name: "Cybersecurity", desc: "Threat Protection" },
];



const TESTIMONIALS = [
  {
    id: 0,
    text: "The Computer Fundamentals course at AFR-IQ Academy gave me the confidence and skills to navigate the digital world. The instructors made complex concepts so easy to understand!",
    name: "Doreen Nimusiima",
    role: "Computer Fundamentals Graduate · Kampala",
    avatar: "DN",
    avatarColor: "teal",
    img: "/doreen.png",
    tag: "Academy",
    tagColor: "green",
    stars: 5,
    featured: false,
  },
  {
    id: 1,
    text: "The programming courses at AFR-IQ Academy are intensive and industry-focused. I gained the skills to build full-scale applications and start my career as a software engineer!",
    name: "Hamidu Kyevuna",
    role: "Full-Stack Developer Graduate · Kampala",
    avatar: "HK",
    avatarColor: "blue",
    img: "/hamidu.jpg.jpeg",
    tag: "Academy",
    tagColor: "green",
    stars: 5,
    featured: false,
  },
  {
    id: 2,
    text: "Our brand visibility and customer acquisition grew by 300% after implementing the Digital Marketing strategies I learned at AFR-IQ. The ROI has been incredible!",
    name: "David Nakimuli",
    role: "Digital Marketing Specialist · Kampala",
    avatar: "DN",
    avatarColor: "gold",
    img: "/david.png",
    tag: "Digital Marketing",
    tagColor: "orange",
    stars: 5,
    featured: true,
  },
  {
    id: 3,
    text: "The Mobile App Development course was a game-changer. I am now building production-ready iOS and Android apps for clients across East Africa!",
    name: "Sarah Achieng",
    role: "Mobile App Developer · Nairobi",
    avatar: "SA",
    avatarColor: "green",
    img: "/sarah.png",
    tag: "Mobile Apps",
    tagColor: "green",
    stars: 5,
    featured: false,
  },
  {
    id: 4,
    text: "The Computer Networking training at AFR-IQ is world-class. I can now design, configure and secure complex enterprise networks with ease.",
    name: "Ronald Ssemakula",
    role: "Network Engineer · Kampala",
    avatar: "RS",
    avatarColor: "blue",
    img: "/ronald.png",
    tag: "Networking",
    tagColor: "blue",
    stars: 5,
    featured: false,
  },
  {
    id: 5,
    text: "The AFR-IQ Internship program provided the hands-on real-world experience I needed to bridge the gap between classroom theory and industry practice!",
    name: "Grace Atim",
    role: "IT Intern Alumna · Jinja",
    avatar: "GA",
    avatarColor: "purple",
    img: "/grace.png",
    tag: "Internship",
    tagColor: "purple",
    stars: 5,
    featured: false,
  },
];



function TestimonialCard({ t, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`testimonial-card ${t.featured ? 'featured' : ''} ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.12}s`, transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s, border-color 0.4s, box-shadow 0.4s, background 0.4s` }}
    >
      <span className="t-quote-icon">"</span>
      <div className="t-stars">
        {Array.from({ length: t.stars }).map((_, i) => (
          <span key={i} className="t-star">⭐</span>
        ))}
      </div>
      <p className="t-text">"{t.text}"</p>
      <div className="t-author">
        {t.img ? (
          <img src={t.img} alt={t.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-orange)' }} />
        ) : (
          <div className={`t-avatar ${t.avatarColor}`}>{t.avatar}</div>
        )}
        <div>
          <div className="t-name">{t.name}</div>
          <div className="t-role">{t.role}</div>
        </div>
        <span className={`t-tag ${t.tagColor}`}>{t.tag}</span>
      </div>
    </div>
  );
}

export default function Home({ navigate }) {

  const [tPage, setTPage] = useState(0);

  // Determine testimonials per page based on viewport
  const perPage = typeof window !== 'undefined' && window.innerWidth < 1100 ? 1 : 3;
  const totalPages = Math.ceil(TESTIMONIALS.length / perPage);
  const visibleTestimonials = TESTIMONIALS.slice(tPage * perPage, tPage * perPage + perPage);



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
            <div className="hero-tag"><div className="hero-tag-dot" />Learn. Think. Innovate</div>
            <h1 className="hero-title">
              Driving
              <span className="accent">Africa To Technology</span>
              <span className="accent2">Independence.</span>
            </h1>
            <p className="hero-subtitle">
              Innovative IT infrastructure, professional technology training, and cutting-edge smart device sales — empowering businesses across East Africa.
            </p>
            <div className="hero-ctas">
              <button className="hero-btn-primary" onClick={() => navigate("Services")}>Explore Services</button>
              <button className="hero-btn-outline" onClick={() => navigate("Contact")}>Contact Us</button>
              <button className="hero-btn-outline" onClick={() => navigate("Videos")} style={{ display: 'flex', gap: '8px', alignItems: 'center', borderColor: 'var(--accent-orange)' }}>
                <span style={{ color: 'var(--accent-orange)' }}>▶</span> Video
              </button>
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
                  {Array.from({ length: 28 }).map((_, i) => <div key={i} className={`uptime-dot ${i === 11 ? "down" : ""}`} />)}
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
                  {bars.map((h, i) => (
                    <div
                      key={i}
                      className={`bar ${i % 3 === 1 ? "green" : ""}`}
                      style={{ height: `${h}%`, animationDelay: `${i * 0.15}s`, animationDuration: `${0.8 + (i % 5) * 0.2}s` }}
                    />
                  ))}
                </div>
                <div className="card-meta-row" style={{ marginTop: "12px" }}>
                  <div className="card-meta"><div className="label">Peak</div><div className="val">2,847</div></div>
                  <div className="card-meta"><div className="label">Avg/day</div><div className="val">1,204</div></div>
                  <div className="card-meta"><div className="label">Total</div><div className="val">8,428</div></div>
                </div>
              </div>

              <div className="dash-card">
                <div className="card-header"><div className="card-title">Academy Progress</div><div className="card-badge">4 Courses</div></div>
                <div className="progress-list">
                  {[{ name: "Cybersecurity", pct: 82 }, { name: "Cloud Infra", pct: 67 }, { name: "Networking", pct: 91 }, { name: "Data Systems", pct: 54 }].map(c => (
                    <div key={c.name}>
                      <div className="prog-label"><span>{c.name}</span><span>{c.pct}%</span></div>
                      <div className="prog-bar"><div className="prog-fill" style={{ width: `${c.pct}%` }} /></div>
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
            <div className="service-item" key={s.name} onClick={() => navigate(s.name === "Academy" ? "Academy" : s.name === "IMS Platform" ? "IMS" : s.name === "Tech Shop" ? "Shop" : "Services")}>
              <div className="svc-icon">{s.icon}</div>
              <div><div className="svc-name">{s.name}</div><div className="svc-desc">{s.desc}</div></div>
            </div>
          ))}
        </div>



        {/* ─── TESTIMONIALS SECTION ─── */}
        <section className="testimonials-section">
          <div className="testimonials-inner">
            <div className="testimonials-top">
              <div>
                <div className="testimonials-label">What People Say</div>
                <h2 className="testimonials-heading">
                  Loved by Clients<br /><span>Across Africa</span>
                </h2>
              </div>
              <div className="testimonials-nav">
                <button
                  className={`t-nav-btn`}
                  onClick={() => setTPage(p => Math.max(0, p - 1))}
                  disabled={tPage === 0}
                  style={{ opacity: tPage === 0 ? 0.4 : 1 }}
                >←</button>
                <button
                  className={`t-nav-btn`}
                  onClick={() => setTPage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={tPage >= totalPages - 1}
                  style={{ opacity: tPage >= totalPages - 1 ? 0.4 : 1 }}
                >→</button>
              </div>
            </div>

            <div className="testimonials-track">
              {visibleTestimonials.map((t, i) => (
                <TestimonialCard key={t.id} t={t} index={i} />
              ))}
            </div>

            {/* Dots */}
            <div className="testimonials-dots">
              {Array.from({ length: totalPages }).map((_, i) => (
                <div
                  key={i}
                  className={`t-dot ${i === tPage ? 'active' : ''}`}
                  onClick={() => setTPage(i)}
                />
              ))}
            </div>

            {/* Trust bar */}
            <div className="trust-bar">
              {[
                { icon: "🔒", text: "100% Secure & Verified" },
                { icon: "⭐", text: "4.9/5 Average Rating" },
                { icon: "🌍", text: "Serving East Africa" },
                { icon: "🏆", text: "Award-Winning Service" },
                { icon: "💬", text: "500+ Happy Clients" },
              ].map(item => (
                <div className="trust-item" key={item.text}>
                  <div className="trust-icon">{item.icon}</div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}