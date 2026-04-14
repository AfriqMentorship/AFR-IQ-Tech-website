import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "../supabaseClient";

const styles = `
  .page { 
    min-height: calc(100vh - 75px); 
    background: var(--bg-base); 
    color: var(--text-primary); 
    font-family: 'Poppins', sans-serif; 
    overflow-x: hidden; 
    width: 100%;
    position: relative;
    transition: background 0.3s ease;
  }
  .page * { user-select: text; }
  .ims-hero-graphic, .feat-card, .package-card { -webkit-user-drag: none; }

  /* Hero Section */
  .ims-hero {
    position: relative;
    padding: 120px 48px 100px;
    border-bottom: 1px solid var(--border-medium);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 64px;
    overflow: hidden;
    background: var(--bg-base);
  }
  .ims-hero::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(circle at 10% 20%, var(--accent-green-glow) 0%, transparent 60%);
    pointer-events: none;
    opacity: 0.6;
  }
  .ims-hero-content {
    flex: 1.2;
    max-width: 640px;
    position: relative;
    z-index: 2;
  }
  .ims-eyebrow {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: var(--accent-green);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 24px;
    display: flex; align-items: center; gap: 12px;
    font-weight: 700;
  }
  .ims-eyebrow::before { content: ''; display: block; width: 32px; height: 1.5px; background: var(--accent-green); opacity: 0.6; }
  .ims-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(56px, 9vw, 96px);
    line-height: 0.88;
    color: var(--text-primary);
    margin-bottom: 28px;
    letter-spacing: 0.02em;
  }
  .ims-title .hl { color: var(--accent-orange); text-shadow: 0 0 30px var(--accent-orange-glow); }
  .ims-desc {
    font-size: 18px; color: var(--text-secondary); line-height: 1.7; margin-bottom: 48px; max-width: 580px;
  }
  .ims-hero-btns {
    display: flex; gap: 24px;
  }
  .btn-primary {
    padding: 18px 36px;
    background: var(--accent-orange);
    color: var(--text-inverse);
    border: none;
    border-radius: 10px;
    font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 15px; text-transform: uppercase; letter-spacing: 0.1em;
    cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 10px 20px var(--accent-orange-glow);
  }
  .btn-primary:hover { background: #00e68a; transform: translateY(-3px); box-shadow: 0 15px 30px var(--accent-green-glow); }
  
  .btn-secondary {
    padding: 18px 36px;
    background: transparent;
    color: var(--text-primary);
    border: 2px solid var(--border-strong);
    border-radius: 10px;
    font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 15px; text-transform: uppercase; letter-spacing: 0.1em;
    cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .btn-secondary:hover { border-color: var(--accent-orange); color: var(--accent-orange); transform: translateY(-3px); }

  /* Hero Graphic */
  .ims-hero-graphic {
    flex: 1;
    position: relative;
    max-width: 580px;
    height: 420px;
    background: var(--bg-level1);
    border: 1px solid var(--border-medium);
    border-radius: 20px;
    box-shadow: 0 40px 80px rgba(0,0,0,0.15);
    display: flex; flex-direction: column; padding: 28px;
    transform: perspective(1200px) rotateY(-8deg) rotateX(2deg);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, box-shadow;
  }
  .ims-hero-graphic:hover { transform: perspective(1200px) rotateY(0deg) rotateX(0deg); border-color: var(--accent-green); box-shadow: 0 50px 100px rgba(0,0,0,0.2); }
  
  /* Mock Dashboard UI */
  .dash-header { display: flex; justify-content: space-between; margin-bottom: 32px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 18px; }
  .dash-title { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--accent-green); font-weight: 700; }
  .dash-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 32px; }
  .dash-stat-box { background: var(--bg-level2); border-radius: 12px; padding: 20px; border: 1px solid var(--border-subtle); }
  .stat-label { font-size: 10px; color: var(--text-muted); text-transform: uppercase; margin-bottom: 10px; font-family: 'Inter', sans-serif; font-weight: 700; }
  .stat-val { font-size: 28px; font-weight: 800; color: var(--text-primary); font-family: 'Poppins', sans-serif; letter-spacing: -0.02em; }
  .dash-activity { flex: 1; background: var(--bg-level2); border-radius: 12px; border-top: 3px solid var(--accent-green); position: relative; padding: 20px; display: flex; flex-direction: column; gap: 14px; }
  .activity-item { display: flex; align-items: center; gap: 14px; background: var(--bg-level1); padding: 12px; border-radius: 8px; border: 1px solid var(--border-subtle); }
  .activity-dot { width: 10px; height: 10px; background: var(--accent-green); border-radius: 50%; box-shadow: 0 0 8px var(--accent-green-glow); }
  .activity-text { font-size: 13px; color: var(--text-primary); font-weight: 600; }
  .activity-time { font-size: 11px; color: var(--text-muted); margin-left: auto; font-family: 'Inter', sans-serif; }

  /* Features Section */
  .features-sec { padding: 100px 48px; background: var(--bg-base); position: relative; }
  .features-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px;
    max-width: 1440px; margin: 0 auto;
  }
  .feat-card {
    padding: 48px; background: var(--bg-level1); border: 1px solid var(--border-subtle); border-radius: 20px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); position: relative; overflow: hidden;
    box-shadow: var(--shadow-soft);
  }
  .feat-card:hover { border-color: var(--accent-green); background: var(--bg-level2); transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
  .feat-icon {
    width: 64px; height: 64px; border-radius: 16px; background: var(--bg-level2); border: 1px solid var(--border-medium);
    display: flex; align-items: center; justify-content: center; font-size: 28px; margin-bottom: 28px; color: var(--accent-green);
    transition: all 0.3s ease;
  }
  .feat-card:hover .feat-icon { background: var(--accent-green); color: var(--text-inverse); transform: scale(1.1) rotate(5deg); }
  .feat-title { font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 26px; color: var(--text-primary); margin-bottom: 18px; letter-spacing: -0.02em; }
  .feat-desc { font-size: 16px; color: var(--text-secondary); line-height: 1.7; }

  /* Packages Section */
  .packages-sec { padding: 100px 48px; background: var(--bg-level1); border-top: 1px solid var(--border-medium); border-bottom: 1px solid var(--border-medium); }
  .package-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 32px; max-width: 1440px; margin: 0 auto; }
  .package-card { background: var(--bg-level2); border: 1px solid var(--border-medium); border-radius: 20px; padding: 48px; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: var(--shadow-soft); }
  .package-card:hover { border-color: var(--accent-green); transform: translateY(-10px); box-shadow: 0 30px 60px rgba(0,0,0,0.1); }
  .package-title { font-family: 'Poppins', sans-serif; font-size: 36px; color: var(--text-primary); margin-bottom: 16px; letter-spacing: 0.04em; }
  .package-price { font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 22px; color: var(--accent-green); margin-bottom: 32px; letter-spacing: -0.01em; }
  .package-features { list-style: none; padding: 0; margin: 0 0 40px 0; }
  .package-features li { font-size: 16px; color: var(--text-secondary); margin-bottom: 16px; display: flex; align-items: center; gap: 14px; font-weight: 600; }
  .package-features li::before { content: '✓'; color: var(--accent-green); font-weight: 800; font-size: 18px; }

  /* CTA Section */
  .cta-sec {
    padding: 120px 48px; text-align: center; overflow: hidden; position: relative;
    background: var(--bg-base);
  }
  .cta-sec::after {
    content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
    width: 100%; height: 100%;
    background: radial-gradient(circle at 50% 120%, var(--accent-green-glow) 0%, transparent 70%);
    pointer-events: none; opacity: 0.4;
  }
  .cta-title { font-family: 'Poppins', sans-serif; font-size: clamp(50px, 8vw, 84px); color: var(--text-primary); margin-bottom: 28px; line-height: 0.9; }
  .cta-desc { font-size: 19px; color: var(--text-secondary); max-width: 640px; margin: 0 auto 48px; line-height: 1.6; }

  @media (max-width: 1200px) {
    .ims-hero { flex-direction: column; padding: 100px 40px; text-align: center; }
    .ims-hero-content { max-width: 800px; display: flex; flex-direction: column; align-items: center; }
    .ims-eyebrow { justify-content: center; }
    .ims-hero-btns { justify-content: center; }
    .ims-hero-graphic { width: 100%; transform: none !important; height: auto; min-height: 400px; }
  }
  @media (max-width: 768px) {
    .ims-hero { padding: 80px 24px; }
    .features-sec, .packages-sec, .cta-sec { padding: 60px 24px; }
    .ims-title { font-size: 52px; }
    .dash-stats { grid-template-columns: 1fr; }
    .ims-hero-btns { flex-direction: column; width: 100%; }
    .btn-primary, .btn-secondary { width: 100%; padding: 14px 20px; font-size: 13px; text-align: center; }
  }
  @media (max-width: 500px) {
    .ims-hero { padding: 40px 16px; }
    .ims-title { font-size: 40px; }
    .ims-hero-graphic { padding: 16px; margin: 0 -8px; width: calc(100% + 16px); }
    .dash-header { margin-bottom: 20px; padding-bottom: 12px; }
    .dash-stats { gap: 12px; margin-bottom: 20px; }
    .dash-stat-box { padding: 16px; }
    .dash-activity { padding: 16px; gap: 10px; }
    .activity-item { padding: 10px; }
  }
`;

const features = [
  { icon: "📝", title: "Easy Application", desc: "Apply for internships seamlessly. Upload your resume, cover letter, and track your application status online." },
  { icon: "👀", title: "Real-Time Tracking", desc: "Monitor the status of your applications. Receive notifications for interviews and offers directly on your dashboard." },
  { icon: "📅", title: "Daily Activity Logs", desc: "Log your daily tasks, upload work reports, and maintain a comprehensive portfolio of your internship journey." },
  { icon: "💬", title: "Mentor Communication", desc: "Directly communicate with your assigned mentors. Get feedback, ask questions, and grow your professional skills." },
  { icon: "🎓", title: "Performance Evaluation", desc: "Admins and mentors can assess student performance, leave remarks, and grade daily activities." },
  { icon: "🏅", title: "Certificate Generation", desc: "Automatically generate completion certificates upon successful completion of the internship program." }
];

export default function IMS({ navigate }) {
  const { user } = useAuth();
  const [dbCourses, setDbCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { data } = await supabase.from('courses').select('*').limit(3);
    if (data) setDbCourses(data);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="page">

        {/* HERO */}
        <section className="ims-hero">
          <div className="ims-hero-content">
            <div className="ims-eyebrow">Internship Management System</div>
            <h1 className="ims-title">Accelerate Your <span className="hl">Career.</span><br />Master Your Craft.</h1>
            <p className="ims-desc">
              AFR-IQ's Internship Management System connects ambitious students with real-world tech experience. Apply, track your progress, log daily activities, and get mentored by industry professionals.
            </p>
            <div className="ims-hero-btns">
              <button className="btn-primary" onClick={() => navigate(user ? "Dashboard" : "IMSApply")}>
                {user ? "Go to Dashboard" : "Apply Now"}
              </button>
              <button className="btn-secondary" onClick={() => navigate("Academy")}>View Programs</button>
            </div>
          </div>

          <div className="ims-hero-graphic">
            <div className="dash-header">
              <div className="dash-title">STUDENT DASHBOARD</div>
              <div style={{ display: "flex", gap: "8px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f" }} />
              </div>
            </div>
            <div className="dash-stats">
              <div className="dash-stat-box">
                <div className="stat-label">Active Applications</div>
                <div className="stat-val">2</div>
              </div>
              <div className="dash-stat-box">
                <div className="stat-label">Tasks Completed</div>
                <div className="stat-val" style={{ color: "#00c878" }}>24</div>
              </div>
              <div className="dash-stat-box">
                <div className="stat-label">Mentorship Hours</div>
                <div className="stat-val">18</div>
              </div>
            </div>
            <div className="dash-activity">
              <div className="stat-label" style={{ marginBottom: "0" }}>Recent Activity</div>
              <div className="activity-item">
                <div className="activity-dot" />
                <div className="activity-text">Uploaded React Component Task</div>
                <div className="activity-time">2h ago</div>
              </div>
              <div className="activity-item">
                <div className="activity-dot" style={{ background: "#ffa500" }} />
                <div className="activity-text">Feedback received from Mentor</div>
                <div className="activity-time">5h ago</div>
              </div>
              <div className="activity-item">
                <div className="activity-dot" style={{ background: "#4a90e2" }} />
                <div className="activity-text">Completed Week 2 Evaluation</div>
                <div className="activity-time">1d ago</div>
              </div>
            </div>
          </div>
        </section>

        {/* PACKAGES SECTION */}
        <section className="packages-sec">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "48px", color: "var(--text)" }}>Internship Packages</h2>
            <p style={{ color: "rgba(var(--text-rgb), 0.5)", maxWidth: "600px", margin: "10px auto 0" }}>Choose the path that aligns with your career goals and aspirations.</p>
          </div>
          <div className="package-grid">
            {[
              { title: "Package 01", items: ["Graphics Design", "Repair and Maintenance", "Programming"] },
              { title: "Package 02", items: ["Networking", "Website Development", "Mobile App Dev't"] },
              { title: "Package 03", items: ["Cloud Computing", "Cybersecurity", "Ethical Hacking"] }
            ].map((pkg, i) => (
              <div className="package-card" key={i} style={i === 1 ? { background: "rgba(0,200,120,0.05)", borderColor: "rgba(0,200,120,0.2)" } : {}}>
                <h3 className="package-title">{pkg.title}</h3>
                <ul className="package-features" style={{ marginTop: '24px' }}>
                  {pkg.items.map((item, idx) => (
                    <li key={idx} style={{ color: "var(--text-primary)", fontSize: "18px", fontWeight: "700" }}>{item}</li>
                  ))}
                  <li style={{ marginTop: '20px' }}>Hands-on practicals & portfolio building</li>
                  <li>Industry-standard tooling</li>
                  <li>Certified final internship project</li>
                </ul>
                <button className={i === 1 ? "btn-primary" : "btn-secondary"} style={{ width: "100%" }} onClick={() => navigate("IMSApply")}>
                  Apply for {pkg.title}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="features-sec">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "48px", color: "var(--text)" }}>Built for Growth</h2>
            <p style={{ color: "rgba(var(--text-rgb), 0.5)", maxWidth: "600px", margin: "10px auto 0" }}>A platform designed to streamline your learning experience and maximize your potential.</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feat-card" key={i}>
                <div className="feat-icon">{f.icon}</div>
                <h3 className="feat-title">{f.title}</h3>
                <p className="feat-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="cta-sec">
          <h2 className="cta-title">Start Your Journey Today</h2>
          <p className="cta-desc">Join our vibrant community of learners and kickstart your career in the tech industry with hands-on experience.</p>
          <button className="btn-primary" onClick={() => navigate("IMSApply")} style={{ background: "#FF813E", color: "#ffffff" }}>
            Create Student Account
          </button>
        </section>

      </div>
    </>
  );
}
