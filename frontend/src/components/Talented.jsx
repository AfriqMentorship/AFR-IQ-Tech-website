import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const talentedStyles = `
  .talented-container {
    min-height: 80vh;
    padding: 120px 48px 80px;
    background: var(--bg-base);
    color: var(--text-primary);
  }

  .talented-header {
    text-align: left;
    margin: 0 0 60px;
    padding: 120px 48px 100px;
    position: relative;
    overflow: hidden;
    max-width: 100%;
    margin-left: -48px;
    margin-right: -48px;
    margin-top: -120px;
    border-bottom: 1px solid var(--border-medium);
    background: var(--bg-base);
  }

  .talented-header::before {
    content: '';
    position: absolute; inset: 0;
    background: 
      radial-gradient(ellipse 60% 50% at 20% 50%, var(--accent-orange-glow) 0%, transparent 70%),
      radial-gradient(ellipse 40% 60% at 75% 30%, var(--accent-green-glow) 0%, transparent 60%);
    pointer-events: none;
    z-index: 1;
  }

  .page-grid-bg {
    position: absolute; inset: 0;
    background-image: linear-gradient(var(--border-medium) 1px, transparent 1px), 
                      linear-gradient(90deg, var(--border-medium) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    opacity: 0.3;
    z-index: 0;
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

  .talented-header-content {
    position: relative;
    z-index: 2;
    max-width: 900px;
    animation: fadeUp 0.8s ease both;
  }

  @keyframes fadeUp { from { transform:translateY(30px); opacity:0; } to { transform:translateY(0); opacity:1; } }

  .talented-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(48px, 6vw, 72px);
    font-weight: 800;
    margin-bottom: 24px;
    color: var(--text-primary);
    line-height: 1;
    letter-spacing: -0.02em;
  }

  .talented-subtitle {
    font-size: 18px;
    color: var(--text-secondary);
    line-height: 1.6;
    max-width: 600px;
  }

  .talented-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    margin-bottom: 60px;
  }

  .search-box {
    width: 100%;
    max-width: 600px;
    position: relative;
  }

  .search-input {
    width: 100%;
    padding: 18px 24px 18px 56px;
    background: var(--bg-level1);
    border: 1px solid var(--border-medium);
    border-radius: 16px;
    color: var(--text-primary);
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    transition: all 0.3s ease;
    box-shadow: var(--shadow-soft);
  }

  .search-input:focus {
    outline: none;
    border-color: var(--accent-orange);
    box-shadow: 0 0 0 4px var(--accent-orange-glow);
  }

  .search-icon-svg {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    color: var(--text-muted);
  }

  .tab-container {
    display: flex;
    gap: 12px;
    padding: 6px;
    background: var(--bg-level1);
    border-radius: 12px;
    border: 1px solid var(--border-subtle);
  }

  .tab-btn {
    padding: 10px 24px;
    border: none;
    border-radius: 8px;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    background: transparent;
    color: var(--text-secondary);
  }

  .tab-btn.active {
    background: var(--accent-orange);
    color: #fff;
    box-shadow: 0 4px 12px var(--accent-orange-glow);
  }

  .graduates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
    width: 100%;
  }

  @media (max-width: 1100px) {
    .graduates-grid { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }
  }

  @media (max-width: 700px) {
    .graduates-grid { grid-template-columns: 1fr; }
  }

  .graduate-card {
    background: var(--bg-glass);
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
    border: 1px solid var(--border-subtle);
    border-radius: 24px;
    padding: 20px;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }

  .graduate-card:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 129, 62, 0.3);
    box-shadow: 0 30px 60px rgba(0,0,0,0.25);
  }

  /* Sweep animation */
  .graduate-card::before {
    content: '';
    position: absolute;
    top: 0; left: -100%; width: 50%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
    transform: skewX(-25deg);
    transition: none;
    z-index: 2;
  }

  .graduate-card:hover::before {
    left: 150%;
    transition: left 0.8s ease-in-out;
  }

  .grad-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
  }

  .grad-avatar-wrap {
    width: 60px;
    height: 60px;
    flex-shrink: 0;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    background: var(--bg-level2);
    border: 2px solid rgba(255, 129, 62, 0.2);
  }

  .grad-avatar {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 900;
    color: var(--accent-orange);
    transition: transform 0.5s ease;
  }

  .graduate-card:hover .grad-avatar {
    transform: scale(1.1);
  }

  .grad-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.9);
    transition: filter 0.5s ease, transform 0.8s ease;
  }

  .graduate-card:hover .grad-avatar img {
    filter: brightness(1.1);
  }

  .grad-info {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .grad-name {
    font-family: 'Poppins', sans-serif;
    font-size: 17px;
    font-weight: 800;
    color: var(--text-primary);
    margin: 0;
    line-height: 1.2;
  }

  .grad-course {
    font-size: 11px;
    color: var(--accent-orange);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 2px;
  }

  .grad-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;
  }

  .strengths-text {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.5;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
  }

  .skills-toggle {
    background: var(--bg-level2);
    border: 1px solid var(--border-subtle);
    color: var(--text-secondary);
    padding: 6px 12px;
    border-radius: 10px;
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: fit-content;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .skills-toggle:hover {
    background: var(--bg-level1);
    color: var(--text-primary);
  }

  .skills-dropdown {
    max-height: 0;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    opacity: 0;
  }

  .skills-dropdown.active {
    max-height: 300px;
    margin-top: 10px;
    opacity: 1;
  }

  .skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 8px 0;
  }

  .skill-item {
    background: var(--bg-level2);
    color: var(--text-muted);
    padding: 4px 10px;
    border-radius: 16px;
    font-size: 10px;
    font-weight: 600;
    border: 1px solid var(--border-subtle);
  }

  .grad-actions {
    display: flex;
    gap: 8px;
    padding-top: 16px;
    border-top: 1px solid var(--border-subtle);
  }

  .cv-btn, .connect-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px;
    border-radius: 10px;
    font-family: 'Poppins', sans-serif;
    font-size: 11px;
    font-weight: 800;
    text-decoration: none;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  .cv-btn { border: 1px solid var(--border-subtle); color: var(--text-primary); background: var(--bg-level2); }
  .cv-btn:hover { background: var(--text-primary); color: var(--bg-base); }

  .connect-btn { background: #00dc8c; color: #000; }
  .connect-btn:hover { background: #00f0a0; transform: translateY(-2px); }

  .no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: 100px 0;
    color: var(--text-muted);
    font-family: 'Inter', sans-serif;
    font-size: 20px;
  }

  .grad-tags-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
    margin-bottom: 20px;
    width: 100%;
  }

  .strength-tag, .skill-tag {
    padding: 2px 0;
    border-radius: 0;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    width: auto;
    border: none;
    background: none;
    box-shadow: none;
  }

  .strength-tag {
    color: #00dc8c;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    animation: none;
  }

  .skill-tag {
    color: rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .skill-tag::before {
    content: '○';
    margin-right: 8px;
    font-size: 8px;
    opacity: 0.5;
  }

  .graduate-card:hover .strength-tag {
    color: var(--accent-orange);
    transform: translateY(-2px);
  }

  .graduate-card:hover .skill-tag {
    color: #fff;
    transform: translateY(-2px);
  }

  @keyframes tag-glow {
    0% { box-shadow: 0 4px 15px rgba(0, 200, 120, 0.1); border-color: rgba(0, 200, 120, 0.2); }
    50% { box-shadow: 0 4px 20px rgba(0, 200, 120, 0.3); border-color: rgba(0, 200, 120, 0.5); }
    100% { box-shadow: 0 4px 15px rgba(0, 200, 120, 0.1); border-color: rgba(0, 200, 120, 0.2); }
  }

  @media (max-width: 768px) {
    .talented-container { padding: 80px 24px 60px; }
    .talented-title { font-size: clamp(32px, 8vw, 48px); }
    .graduates-grid { gap: 24px; }
    .graduate-card { padding: 32px 24px; }
  }

  @keyframes pulse-glow {
    0% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.05); opacity: 0.8; }
    100% { transform: scale(1); opacity: 0.5; }
  }
`;

function DocumentIcon({ color = "currentColor", size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  );
}

function StarIcon({ color = "currentColor", size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );
}

function SearchIcon({ color = "currentColor", size = 20 }) {
  return (
    <svg className="search-icon-svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
}

export default function Talented() {
  const [activeTab, setActiveTab] = useState("Afric Graduate");
  const [search, setSearch] = useState("");
  const [graduates, setGraduates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSkills, setExpandedSkills] = useState({});

  async function fetchGraduates() {
    setLoading(true);
    const { data, error } = await supabase
      .from('talented')
      .select('*')
      .eq('status', 'Active')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setGraduates(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    // Avoid synchronous setState in effect
    const t = setTimeout(() => fetchGraduates(), 0);
    return () => clearTimeout(t);
  }, []);

  const toggleSkills = (id) => {
    setExpandedSkills(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered = graduates.filter(g => 
    g.category === activeTab &&
    (g.name.toLowerCase().includes(search.toLowerCase()) || 
     g.course.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="talented-container">
      <style>{talentedStyles}</style>
      
      <div className="talented-header">
        <div className="page-grid-bg" />
        <div className="hero-lines">
          {Array.from({ length: 14 }).map((_, i) => <div className="hero-line" key={i} />)}
        </div>
        <div className="talented-header-content">
          <h1 className="talented-title">
            Hire the <span style={{ color: 'var(--accent-orange)' }}>Best Talent</span>
          </h1>
          <p className="talented-subtitle">
            Access a curated pool of industry-ready professionals, innovators, and world-class experts. 
            We bridge the gap between continental ambition and global technological excellence, 
            providing you with the high-caliber human capital required to scale your vision.
          </p>
        </div>
      </div>

      <div className="talented-controls">
        <div className="search-box">
          <SearchIcon />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search by name or course (e.g. Graphics, Web)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="tab-container">
          <button 
            className={`tab-btn ${activeTab === 'Afric Graduate' ? 'active' : ''}`}
            onClick={() => setActiveTab('Afric Graduate')}
          >
            Academy Graduates
          </button>
          <button 
            className={`tab-btn ${activeTab === 'Intern Graduate' ? 'active' : ''}`}
            onClick={() => setActiveTab('Intern Graduate')}
          >
            Internship Graduates
          </button>
        </div>
      </div>

      {loading ? (
        <div className="no-results">Loading talent pool...</div>
      ) : (
        <div className="graduates-grid">
          {filtered.length > 0 ? (
            filtered.map((grad) => (
              <div key={grad.id} className="graduate-card">
                {/* Profile Header */}
                <div className="grad-header">
                  <div className="grad-avatar-wrap">
                    <div className="grad-avatar">
                      {grad.image_url ? (
                        <img src={grad.image_url} alt={grad.name} />
                      ) : (
                        grad.name.charAt(0)
                      )}
                    </div>
                  </div>
                  <div className="grad-info">
                    <h3 className="grad-name">{grad.name}</h3>
                    <div className="grad-course">{grad.course}</div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="grad-body">
                  {grad.strengths && (
                    <div>
                      <div className="grad-section-label">Core Strengths</div>
                      <div className="strengths-text">
                        <StarIcon size={14} />
                        {grad.strengths.split(',').filter(s => s.trim()).join(', ')}
                      </div>
                    </div>
                  )}

                  {grad.skills && (
                    <div>
                      <button 
                        className="skills-toggle"
                        onClick={() => toggleSkills(grad.id)}
                      >
                        {expandedSkills[grad.id] ? "Hide Specialized Skills" : "View Specialized Skills"}
                        <span style={{ transform: expandedSkills[grad.id] ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>▼</span>
                      </button>
                      <div className={`skills-dropdown ${expandedSkills[grad.id] ? 'active' : ''}`}>
                        <div className="skills-list">
                          {grad.skills.split(',').filter(s => s.trim()).map((skill, idx) => (
                            <span key={idx} className="skill-item">{skill.trim()}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="grad-actions">
                  <a 
                    href={grad.cv_url || "#"} 
                    target={grad.cv_url ? "_blank" : "_self"} 
                    rel="noopener noreferrer" 
                    className="cv-btn"
                    onClick={(e) => {
                      if (!grad.cv_url) {
                        e.preventDefault();
                        alert("CV will be provided upon request. Please contact AFR-IQ Technologies for placement details.");
                      }
                    }}
                  >
                    <DocumentIcon size={14} />
                    {grad.cv_url ? "DOWNLOAD CV" : "REQUEST CV"}
                  </a>

                  <a 
                    href={`https://wa.me/256783402796?text=${encodeURIComponent(`Hello AFR-IQ! I'm interested in connecting with ${grad.name} from the ${grad.course} course.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="connect-btn"
                  >
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                    </svg>
                    Connect
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              {search ? `No graduates found matching "${search}"` : `No ${activeTab}s listed yet.`}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
