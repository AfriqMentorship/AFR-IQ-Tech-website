import { useState } from "react";
import { createPortal } from "react-dom";

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
    padding: 80px 48px 60px;
    border-bottom: 1px solid var(--border-medium);
    overflow: hidden;
    background: var(--bg-base);
  }
  .page-hero::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 70% 60% at 10% 50%, var(--accent-green-glow) 0%, transparent 70%);
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
  .page-eyebrow::before { content: ''; display: block; width: 32px; height: 1.5px; background: currentColor; opacity: 0.6; }
  .page-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(40px, 9vw, 96px);
    line-height: 0.9;
    color: var(--text-primary);
    margin-bottom: 28px;
    letter-spacing: 0.02em;
  }
  .page-title .hl { color: var(--accent-orange); text-shadow: 0 0 40px var(--accent-orange-glow); }
  .page-desc { font-size: 18px; color: var(--text-secondary); max-width: 640px; line-height: 1.7; }

  /* About Content */
  .about-content {
    display: flex;
    flex-direction: column;
    gap: 80px;
    padding: 60px 48px 80px;
  }

  .about-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 48px;
    align-items: center;
  }

  .about-text-content h2 {
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
    font-size: 48px;
    color: var(--text-primary);
    margin-bottom: 24px;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }
  .about-text-content h2 .hl { color: var(--accent-orange); }

  .about-text-content p {
    font-size: 17px;
    color: var(--text-secondary);
    line-height: 1.8;
    margin-bottom: 16px;
  }

  .about-image-container {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid var(--border-medium);
    background: var(--bg-level1);
    aspect-ratio: 4/3;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-soft);
    transition: all 0.4s ease;
  }
  .about-image-container:hover {
    border-color: var(--accent-green);
    box-shadow: 0 30px 60px rgba(0,0,0,0.1);
    transform: translateY(-5px);
  }

  .about-image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--accent-green-glow) 0%, var(--accent-orange-glow) 100%);
    opacity: 0.4;
  }

  /* Values Grid */
  .values-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    margin-top: 40px;
  }

  .value-card {
    background: var(--bg-level1);
    border: 1px solid var(--border-subtle);
    border-radius: 20px;
    padding: 40px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    box-shadow: var(--shadow-soft);
  }

  .value-card:hover {
    transform: translateY(-10px);
    border-color: var(--accent-green);
    background: var(--bg-level2);
  }

  .value-icon {
    font-size: 32px;
    margin-bottom: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 64px; height: 64px;
    background: var(--bg-level2);
    border-radius: 16px;
    color: var(--accent-orange);
    border: 1px solid var(--border-medium);
    transition: all 0.3s ease;
  }
  .value-card:hover .value-icon {
    background: var(--accent-orange);
    color: var(--text-inverse);
    transform: scale(1.1) rotate(5deg);
  }

  .value-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
    font-size: 24px;
    color: var(--text-primary);
    margin-bottom: 16px;
    letter-spacing: -0.01em;
  }

  .value-desc {
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.7;
  }

  .stats-container {
    display: flex;
    gap: 32px;
    margin-top: 32px;
    padding-top: 32px;
    border-top: 1px solid var(--border-medium);
  }

  .stat-item {
    display: flex;
    flex-direction: column;
  }

  .stat-number {
    font-family: 'Poppins', sans-serif;
    font-size: 48px;
    color: var(--accent-orange);
    line-height: 1;
    margin-bottom: 6px;
  }

  .stat-label {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 700;
  }
  
  .mock-img-text {
    font-family: 'Poppins', sans-serif;
    font-size: 36px;
    color: var(--text-muted);
    letter-spacing: 0.15em;
    transform: rotate(-10deg);
    opacity: 0.2;
  }

  /* Gallery Section */
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    margin-top: 40px;
  }

  .gallery-item {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    border: 1px solid var(--border-medium);
    background: var(--bg-level1);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    cursor: pointer;
    box-shadow: var(--shadow-soft);
  }

  .gallery-item:hover {
    transform: translateY(-12px) scale(1.02);
    border-color: var(--accent-green);
    box-shadow: 0 30px 60px rgba(0,0,0,0.15);
    z-index: 10;
  }

  .gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ease;
  }

  .gallery-item:hover img {
    transform: scale(1.1);
  }

  .gallery-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%);
    opacity: 0;
    transition: all 0.4s ease;
    display: flex;
    align-items: flex-end;
    padding: 32px;
  }

  .gallery-item:hover .gallery-overlay {
    opacity: 1;
  }

  .gallery-caption {
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    letter-spacing: 0.1em;
    transform: translateY(20px);
    transition: transform 0.4s ease;
    text-transform: uppercase;
    font-weight: 700;
  }

  .gallery-item:hover .gallery-caption {
    transform: translateY(0);
  }

  /* Lightbox Modal */
  .lightbox-modal {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.92);
    backdrop-filter: blur(10px);
    z-index: 9999;
    display: flex; align-items: center; justify-content: center;
    padding: 32px;
    animation: fadeIn 0.4s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .lightbox-content {
    position: relative;
    max-width: 90vw; max-height: 85vh;
    display: flex; align-items: center; justify-content: center;
  }
  .lightbox-img {
    max-width: 100%; max-height: 85vh;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 40px 100px rgba(0,0,0,0.6);
    user-select: none;
    border: 1px solid rgba(255,255,255,0.1);
  }
  .lightbox-close {
    position: absolute; top: -48px; right: 0;
    color: #fff; font-size: 36px;
    cursor: pointer; background: none; border: none; padding: 12px;
    transition: all 0.3s ease;
  }
  .lightbox-close:hover { color: var(--accent-orange); transform: rotate(90deg); }
  .lightbox-nav {
    position: absolute; top: 50%; transform: translateY(-50%);
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255,255,255,0.2);
    color: #fff;
    width: 60px; height: 60px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 28px; cursor: pointer; transition: all 0.3s ease;
  }
  .lightbox-nav:hover { background: var(--accent-green); color: #fff; border-color: var(--accent-green); transform: translateY(-50%) scale(1.1); }
  .lightbox-prev { left: -80px; }
  .lightbox-next { right: -80px; }
  .lightbox-caption {
    position: absolute; bottom: -48px; left: 0; right: 0;
    text-align: center; color: rgba(255,255,255,0.6);
    font-family: 'Inter', sans-serif; font-size: 14px;
  }

  @media (max-width: 1200px) {
    .lightbox-prev { left: 16px; }
    .lightbox-next { right: 16px; }
    .lightbox-close { top: -56px; right: 16px; }
    .about-content { padding: 40px 24px; gap: 60px; }
    .about-section { grid-template-columns: 1fr; gap: 32px; }
    .about-section.reverse { direction: ltr; }
    .about-text-content { order: 1; }
    .about-image-container { order: 2; height: 320px; }
    .page-hero { padding: 60px 24px 40px; }
    .values-grid { grid-template-columns: 1fr; }
    .about-text-content h2 { font-size: 38px; }
    .gallery-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 16px; }
  }
  @media (max-width: 600px) {
    .page-hero { padding: 40px 16px 32px; }
    .about-content { padding: 32px 16px; gap: 40px; }
    .gallery-grid { grid-template-columns: 1fr; }
    .stats-container { flex-direction: column; gap: 20px; padding-top: 24px; }
  }
  @media (max-width: 400px) {
    .page-title { font-size: 32px; }
    .about-text-content h2 { font-size: 28px; }
    .page-hero { padding: 32px 16px 24px; }
    .stats-container { gap: 16px; }
    .stat-number { font-size: 32px; }
  }
`;

// Data for the gallery (29 images)
const galleryImages = Array.from({ length: 29 }, (_, i) => ({
  id: i + 1,
  src: `/gallery/photos/photo-${i + 1}.jpg`,
  caption: `Gallery Photo ${i + 1}`
}));

export default function AboutUs() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const openModal = (index) => setSelectedImageIndex(index);
  const closeModal = () => setSelectedImageIndex(null);

  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  return (
    <>
      <style>{styles}</style>
      <div className="page">
        <div className="page-hero">
          <div className="page-grid-bg" />
          <div className="page-eyebrow">Our Story</div>
          <h1 className="page-title">Innovating for <span className="hl">Africa</span></h1>
          <p className="page-desc">
            Helping Africa attain technology independence by instilling creative thinking, fostering innovation, and delivering comprehensive IT services.
          </p>
          <div style={{ marginTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(0,200,120,0.1)', border: '1px solid rgba(0,200,120,0.3)', borderRadius: '12px', padding: '10px 20px', fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#00c878', fontWeight: 700, letterSpacing: '0.08em' }}>🎯 Learn. Think. Innovate</div>
            <div style={{ background: 'rgba(255,95,86,0.1)', border: '1px solid rgba(255,95,86,0.3)', borderRadius: '12px', padding: '10px 20px', fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#ff5f56', fontWeight: 700, letterSpacing: '0.08em' }}>📍 Makerere Kikoni, Kampala – Uganda</div>
          </div>
        </div>

        <div className="about-content">

          {/* Section 1: Mission */}
          <div className="about-section">
            <div className="about-text-content" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
              <div className="page-eyebrow" style={{ color: 'var(--accent-green)', justifyContent: 'center' }}>Our Purpose</div>
              <h2>Our <span className="hl" style={{ color: 'var(--accent-orange)' }}>Mission</span></h2>
              <p>
                To empower African talent through inventive-driven technology training and the delivery of cutting-edge IT services that solve real-world problems, inspire innovation, and strengthen the continent's digital resilience against emerging technological threats.
              </p>
              <div className="stats-container" style={{ justifyContent: 'center' }}>
                <div className="stat-item">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Enterprise Clients</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">2.4k</span>
                  <span className="stat-label">Students Trained</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Vision */}
          <div className="about-section">
            <div className="about-text-content" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
              <div className="page-eyebrow" style={{ color: 'var(--accent-green)', justifyContent: 'center' }}>Where We're Going</div>
              <h2>Our <span className="hl" style={{ color: 'var(--accent-orange)' }}>Vision</span></h2>
              <p>
                Helping Africa attain technology independence by instilling creative thinking, fostering innovation, and delivering comprehensive IT services, thereby making a lasting impact on the continent's technological landscape.
              </p>
              <p style={{ fontStyle: 'italic', opacity: 0.7, borderLeft: '3px solid var(--accent-green)', paddingLeft: '20px', marginTop: '24px', display: 'inline-block', textAlign: 'left' }}>
                "Driving Africa to Technology Independence"
              </p>
            </div>
          </div>

          {/* Section 3: Core Values */}
          <div>
            <div className="about-text-content" style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div className="page-eyebrow" style={{ color: 'var(--accent-green)', justifyContent: 'center' }}>What Guides Us</div>
              <h2>Our Core <span className="hl" style={{ color: 'var(--accent-orange)' }}>Values</span></h2>
              <p style={{ maxWidth: '600px', margin: '0 auto' }}>Ten key values that define our culture and operations.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px', marginTop: '32px' }}>
              {[
                { icon: '💡', title: 'Creativity', desc: 'Encouraging original thinking and innovative problem-solving.' },
                { icon: '🇺🇬', title: 'Patriotism', desc: "Committed to positively contributing to Africa's tech growth." },
                { icon: '⚖️', title: 'Gender Inclusion', desc: 'Promoting diversity and equal opportunity for all.' },
                { icon: '🤝', title: 'Honesty', desc: 'Ensuring transparency, trust, and ethical conduct.' },
                { icon: '🔗', title: 'Collaboration', desc: 'Embracing teamwork for stronger and more effective solutions.' },
                { icon: '📚', title: 'Continuous Learning', desc: 'Promoting a growth mindset and staying ahead of tech trends.' },
                { icon: '🎯', title: 'Customer-Centric', desc: 'Delivering value-driven, tailored programs and services.' },
                { icon: '⚡', title: 'Ethical Practices', desc: 'Maintaining integrity in all aspects of operation.' },
                { icon: '🌍', title: 'Community Engagement', desc: 'Actively participating in local initiatives and outreach.' },
                { icon: '🔄', title: 'Adaptability', desc: 'Navigating change with agility in a fast-evolving tech world.' },
              ].map((v, i) => (
                <div className="value-card" key={i}>
                  <div className="value-icon">{v.icon}</div>
                  <div className="value-title">{v.title}</div>
                  <div className="value-desc">{v.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Objectives */}
          <div>
            <div className="about-text-content" style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div className="page-eyebrow" style={{ color: 'var(--accent-green)', justifyContent: 'center' }}>What We Aim For</div>
              <h2>Our <span className="hl" style={{ color: 'var(--accent-orange)' }}>Objectives</span></h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              <div className="value-card">
                <div className="value-icon">🖥️</div>
                <div className="value-title" style={{ marginBottom: '20px' }}>IT Services</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', padding: 0 }}>
                  {[
                    'Deliver cutting-edge IT solutions across web dev, mobile apps, networking, cybersecurity, and digital branding.',
                    'Expand our portfolio to include cloud computing, AI, and data analytics.',
                    'Build strong client relationships through excellent service and tailored tech solutions.',
                    'Promote local digital transformation for startups, SMEs, and community organizations across Uganda.',
                    'Encourage real-time learning through supervised, hands-on client projects for interns and trainees.',
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      <span style={{ color: 'var(--accent-orange)', fontWeight: 800, flexShrink: 0 }}>{i + 1}.</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="value-card">
                <div className="value-icon">🎓</div>
                <div className="value-title" style={{ marginBottom: '20px' }}>Tech Training</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', padding: 0 }}>
                  {[
                    'Provide industry-relevant training in software development, ethical hacking, UI/UX design, and tech entrepreneurship.',
                    'Promote inclusive access to tech education, targeting women, school dropouts, and low-income students.',
                    'Foster creative problem-solving through project-based learning, innovation challenges, and mentorship.',
                    'Reduce digital illiteracy through structured programs and outreach in schools and communities.',
                    'Bridge academia and industry via internship and apprenticeship programs with real industry exposure.',
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      <span style={{ color: 'var(--accent-orange)', fontWeight: 800, flexShrink: 0 }}>{i + 1}.</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Section 5: Key Services & Target Market */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div className="value-card">
              <div className="value-icon">🛠️</div>
              <div className="value-title" style={{ marginBottom: '20px' }}>Key Services</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  '💻 Inventive-Driven Computer Training (Web Dev, Networking, Programming)',
                  '🔧 IT Services – Software/App Development, Ethical Hacking, Graphics Design',
                  '🌍 Community Tech Outreach & Events',
                  '💡 Technology Advisory & Consultancy',
                  '♀️ Gender-Inclusive Learning Initiatives',
                  '🏆 Holiday Programs & Competitions for Youth',
                ].map((s, i) => (
                  <div key={i} style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, padding: '10px 14px', background: 'var(--bg-level2)', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>{s}</div>
                ))}
              </div>
            </div>
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <div className="value-title" style={{ marginBottom: '20px' }}>Target Market</div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.7 }}>
                AFR-IQ Technologies serves a broad spectrum of clients and learners:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  '🎓 University Students',
                  '💼 Working Professionals',
                  '🌱 School Dropouts',
                  '🏫 Primary & Secondary Learners (Holiday Programs)',
                  '🏢 Organizations in need of tailored IT solutions',
                ].map((t, i) => (
                  <div key={i} style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, padding: '10px 14px', background: 'var(--bg-level2)', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>{t}</div>
                ))}
              </div>
              <div style={{ marginTop: '28px', padding: '20px', background: 'rgba(255,129,62,0.07)', borderRadius: '14px', border: '1px solid rgba(255,129,62,0.2)' }}>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, color: 'var(--accent-orange)', marginBottom: '6px', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>📍 Head Office</div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>Makerere Kikoni – Kasule Mall, Level 2<br/>Sr. Apollo Kagwa Road, Kampala, Uganda</div>
              </div>
            </div>
          </div>

          {/* Section 3: The Team */}
          <div style={{ marginTop: '40px' }}>
            <div className="about-text-content" style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2>Meet Our <span className="hl">Team</span></h2>
              <p style={{ maxWidth: '600px', margin: '0 auto' }}>
                Software Engineers and Instructors driving our vision.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginTop: '40px' }}>
              {[
                {
                  name: "Obuyinza Bwamukama (Sifu)",
                  role: "C.E.O & Instructor",
                  img: "/team/byamukama.jpg",
                  desc: "Visionary leader and tech expert. Dedicated to driving Afriq's mission of driving Africa to technology independence through Research & Innovation, Quality I.T solutions and Industry Relevant Tech Training.",
                  skills: ["Leadership", "Strategy", "Tech Education", "Software Development", "Cyber Security", "Mobile App Development", "Ethical Hacking", "Networking"],
                  social: { linkedin: "https://linkedin.com", twitter: "https://x.com" }
                },
                {
                  name: "Kuteesa Moses",
                  role: "Operations Manager & Instructor",
                  img: "/team/kuteesa.jpg",
                  desc: "Oversees all operational initiatives and ensures seamless delivery of programs and client services.",
                  skills: ["Operations", "Management", "Project Delivery"],
                  social: { linkedin: "https://www.linkedin.com/in/kuteesamoses-1037972b8", twitter: "https://x.com/kuteesa_moses3?s=21" }
                },
                {
                  name: "Nakimuli Martha",
                  role: "Programmer & Data Science Expert",
                  img: "/team/martha_new.jpg",
                  desc: "A passionate programmer and expert in Data Science and Analysis, turning data into actionable insights.",
                  skills: ["Programming", "Data Science", "Data Analysis"],
                  social: { linkedin: "https://www.linkedin.com/in/nakimuli-martha-taaka-448946286?utm_source=share_via&utm_content=profile&utm_medium=member_android", twitter: "https://x.com" }
                },
                {
                  name: "Mark Kifunye",
                  role: "Software Engineer & Instructor",
                  img: null, emoji: "💻", theme: "rgba(74,144,226,0.2)",
                  desc: "Full-stack developer and certified instructor. Specializes in Python, JavaScript, and modern web technologies.",
                  skills: ["Python", "JavaScript", "Web Development"],
                  social: { linkedin: "https://linkedin.com", twitter: "https://x.com" }
                },
                {
                  name: "Solomon Okullo",
                  role: "Network Engineer & Instructor",
                  img: "/team/solomon.jpg",
                  desc: "Expert in building scalable networks and ensuring robust digital resilience and infrastructure security.",
                  skills: ["Networking", "Routing", "Cybersecurity"],
                  social: { linkedin: "https://www.linkedin.com/in/okullo-solomon-a57b081b0", twitter: "https://x.com/okullosolomon01" }
                },
                {
                  name: "Nakabale Godfry",
                  role: "Video Editor & Graphics Designer",
                  img: "/team/godfry.jpg",
                  desc: "Creative visionary behind our branding. Specializes in high-quality video production and stunning visual graphics.",
                  skills: ["Video Editing", "Graphic Design", "Brand Identity"],
                  social: { linkedin: "https://linkedin.com", twitter: "https://x.com" }
                }
              ].map((member, i) => (
                <div key={i} style={{
                  background: 'var(--bg-level1)', padding: '20px 20px', borderRadius: '20px',
                  border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-soft)',
                  display: 'flex', flexDirection: 'column', textAlign: 'left',
                  transition: 'all 0.3s ease'
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--accent-orange)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{
                      width: '56px', height: '56px', borderRadius: '50%', flexShrink: 0,
                      background: member.img ? 'transparent' : member.theme,
                      border: '2px solid rgba(255,129,62,0.2)', overflow: 'hidden',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px'
                    }}>
                      {member.img ? (
                        <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : member.emoji}
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '17px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>{member.name}</h3>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--accent-orange)', fontWeight: 600, marginTop: '2px' }}>{member.role}</div>
                    </div>
                  </div>

                  {/* Description first */}
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '12px', flex: 1 }}>
                    {member.desc}
                  </p>

                  {/* Expertise — below description */}
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Expertise
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {member.skills.map((skill, idx) => (
                        <span key={idx} style={{
                          background: 'rgba(var(--text-primary-rgb), 0.06)', color: 'var(--text-secondary)',
                          padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                          border: '1px solid var(--border-subtle)'
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social Icons */}
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer"
                      style={{ 
                        width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        background: 'rgba(var(--text-primary-rgb), 0.05)', borderRadius: '8px',
                        color: 'var(--text-muted)', fontSize: '16px', textDecoration: 'none',
                        transition: 'color 0.2s, background 0.2s'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-orange)'; e.currentTarget.style.background = 'rgba(255,129,62,0.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'rgba(var(--text-primary-rgb), 0.05)'; }}
                      title="LinkedIn">in</a>
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer"
                      style={{ 
                        width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        background: 'rgba(var(--text-primary-rgb), 0.05)', borderRadius: '8px',
                        color: 'var(--text-muted)', fontSize: '16px', textDecoration: 'none',
                        transition: 'color 0.2s, background 0.2s'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-orange)'; e.currentTarget.style.background = 'rgba(255,129,62,0.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'rgba(var(--text-primary-rgb), 0.05)'; }}
                      title="Twitter">𝕏</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Gallery */}
          <div style={{ marginTop: '60px' }}>
            <div className="about-text-content" style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2>Our <span className="hl" style={{ color: 'var(--accent-orange)' }}>Gallery</span></h2>
              <p style={{ maxWidth: '600px', margin: '0 auto' }}>
                A glimpse into our world, events, and the people behind AFR-IQ Technologies.
              </p>
            </div>

            <div className="gallery-grid">
              {galleryImages.slice(0, showAll ? galleryImages.length : 7).map((img, index) => (
                <div key={img.id} className="gallery-item" onClick={() => openModal(index)}>
                  <img src={img.src} alt={img.caption} loading="lazy" />
                  <div className="gallery-overlay">
                    <span className="gallery-caption">View Photo</span>
                  </div>
                </div>
              ))}

              {!showAll && (
                <div
                  className="gallery-item"
                  onClick={() => setShowAll(true)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255, 129, 62, 0.05)', border: '2px dashed rgba(255, 129, 62, 0.4)' }}
                >
                  <div style={{ fontSize: '48px', color: 'var(--accent-orange)', marginBottom: '10px' }}>+{galleryImages.length - 7}</div>
                  <div className="gallery-caption" style={{ transform: 'none' }}>View All Photos</div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && createPortal(
        <div className="lightbox-modal" onClick={closeModal}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeModal}>&times;</button>
            <button className="lightbox-nav lightbox-prev" onClick={prevImage}>&#10094;</button>
            <img
              src={galleryImages[selectedImageIndex].src}
              alt={galleryImages[selectedImageIndex].caption}
              className="lightbox-img"
            />
            <button className="lightbox-nav lightbox-next" onClick={nextImage}>&#10095;</button>
            <div className="lightbox-caption">
              {selectedImageIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
