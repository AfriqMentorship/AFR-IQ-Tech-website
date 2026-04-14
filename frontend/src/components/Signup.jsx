import { useState } from "react";
import { useAuth } from "../components/AuthContext";
import logo from "../assets/logo-removebg-preview.png";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .auth-page {
    min-height: 100vh;
    background: var(--bg-base);
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-family: 'Poppins', sans-serif;
    color: var(--text-primary);
    overflow: hidden;
    transition: all 0.3s ease;
  }

  /* ── LEFT PANEL ── */
  .auth-left {
    position: relative;
    display: flex; flex-direction: column;
    justify-content: space-between;
    padding: 60px 64px;
    background: var(--bg-level1);
    overflow: hidden;
    border-right: 1px solid var(--border-medium);
  }
  .auth-left::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 20% 30%, var(--accent-green-glow) 0%, transparent 65%),
      radial-gradient(ellipse 60% 80% at 80% 80%, var(--accent-orange-glow) 0%, transparent 60%);
    pointer-events: none;
  }
  .auth-left-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(var(--border-subtle) 1px, transparent 1px),
      linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px);
    background-size: 50px 50px;
    pointer-events: none;
    opacity: 0.4;
  }

  /* Animated vertical lines */
  .auth-lines {
    position: absolute; inset: 0;
    display: flex; gap: 50px; padding: 0 5%;
    pointer-events: none; overflow: hidden;
  }
  .auth-line { flex: 1; position: relative; overflow: hidden; }
  .auth-line::after {
    content: ''; position: absolute; width: 1.5px; left: 50%;
    height: 50%;
    background: linear-gradient(180deg, transparent 0%, var(--accent-green) 40%, var(--accent-green) 60%, transparent 100%);
    animation: authLine 6s linear infinite;
    opacity: 0.3;
  }
  .auth-line:nth-child(2n)::after { animation-delay: -2s; background: linear-gradient(180deg, transparent 0%, var(--accent-orange) 40%, var(--accent-orange) 60%, transparent 100%); }
  .auth-line:nth-child(3n)::after { animation-delay: -4s; }
  @keyframes authLine { 0% { top: -60%; } 100% { top: 120%; } }

  .auth-left-top { position: relative; z-index: 2; }
  .auth-brand {
    display: flex; align-items: center; gap: 14px; margin-bottom: 64px;
  }
  .auth-brand-logo {
    width: 56px; height: 56px; border-radius: 12px;
    overflow: hidden; background: transparent;
    display: flex; align-items: center; justify-content: center;
  }
  .auth-brand-logo img { width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 0 12px var(--accent-green-glow)); }
  .auth-brand-name { font-family: 'Poppins', sans-serif; font-size: 30px; letter-spacing: 0.08em; color: var(--text-primary); line-height: 1; }
  .auth-brand-sub { font-family: 'Inter', sans-serif; font-size: 10px; color: var(--accent-green); letter-spacing: 0.15em; text-transform: uppercase; font-weight: 700; }

  .auth-left-headline {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(48px, 6vw, 76px);
    line-height: 0.9;
    color: var(--text-primary);
    margin-bottom: 24px;
  }
  .auth-left-headline .hl { color: var(--accent-green); display: block; text-shadow: 0 0 40px var(--accent-green-glow); }
  .auth-left-headline .hl2 { color: var(--accent-orange); display: block; }

  .auth-left-desc {
    font-size: 16px; color: var(--text-secondary); line-height: 1.7; max-width: 440px; margin-bottom: 48px;
  }

  .auth-steps { display: flex; flex-direction: column; gap: 0; }
  .auth-step { display: flex; gap: 18px; align-items: flex-start; padding-bottom: 24px; position: relative; }
  .auth-step:not(:last-child)::after { content: ''; position: absolute; left: 19px; top: 40px; bottom: 0; width: 2px; background: var(--border-medium); }
  .auth-step-num { width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0; background: var(--bg-level2); border: 2px solid var(--accent-green); display: flex; align-items: center; justify-content: center; font-family: 'Poppins', sans-serif; font-size: 18px; color: var(--accent-green); box-shadow: 0 0 15px var(--accent-green-glow); }
  .auth-step-title { font-size: 15px; font-weight: 800; color: var(--text-primary); margin-bottom: 4px; }
  .auth-step-sub { font-size: 12px; color: var(--text-muted); font-family: 'Inter', sans-serif; }

  .auth-left-bottom { position: relative; z-index: 2; }
  .auth-trust { 
    display: flex; gap: 24px; align-items: center; padding: 24px 28px; 
    background: var(--bg-glass); backdrop-filter: blur(10px); 
    border: 1px solid var(--border-subtle); border-radius: 12px;
    box-shadow: var(--shadow-soft);
  }
  .auth-trust-item { text-align: center; flex: 1; }
  .auth-trust-n { font-family: 'Poppins', sans-serif; font-size: 34px; color: var(--accent-green); line-height: 1; }
  .auth-trust-l { font-family: 'Inter', sans-serif; font-size: 10px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.12em; margin-top: 4px; font-weight: 700; }
  .auth-trust-div { width: 1px; height: 44px; background: var(--border-medium); flex-shrink: 0; }

  /* RIGHT PANEL */
  .auth-right {
    display: flex; justify-content: center;
    padding: 60px 64px;
    background: var(--bg-base);
    overflow-y: auto;
  }

  .auth-form-wrap { width: 100%; max-width: 480px; }

  .auth-form-title {
    font-family: 'Poppins', sans-serif; font-size: 44px;
    letter-spacing: 0.02em; color: var(--text-primary); margin-bottom: 8px;
  }
  .auth-form-sub { font-size: 15px; color: var(--text-muted); margin-bottom: 40px; font-family: 'Inter', sans-serif; }

  .auth-progress { margin-bottom: 32px; }
  .auth-progress-label { display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 11px; color: var(--text-muted); margin-bottom: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }
  .auth-progress-bar { height: 6px; background: var(--bg-level2); border-radius: 3px; overflow: hidden; }
  .auth-progress-fill { height: 100%; background: var(--accent-gradient); border-radius: 3px; transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1); box-shadow: 0 0 10px var(--accent-orange-glow); }

  .auth-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .auth-field { margin-bottom: 24px; }
  .auth-label {
    display: block; font-family: 'Inter', sans-serif; font-size: 11px;
    color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.15em;
    margin-bottom: 10px; font-weight: 700;
  }
  .auth-input-wrap { position: relative; }
  .auth-input-icon {
    position: absolute; left: 16px; top: 50%; transform: translateY(-50%);
    font-size: 16px; pointer-events: none;
    color: var(--text-muted); opacity: 0.6;
  }
  .auth-input {
    width: 100%; padding: 15px 16px 15px 48px;
    background: var(--bg-level1); border: 1px solid var(--border-medium);
    border-radius: 10px; color: var(--text-primary);
    font-family: 'Poppins', sans-serif; font-size: 14px;
    outline: none; transition: all 0.25s;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
  }
  .auth-input:focus { 
    border-color: var(--accent-orange); 
    background: var(--bg-level2); 
    box-shadow: 0 0 0 4px var(--accent-orange-glow); 
  }
  .auth-input::placeholder { color: var(--text-muted); opacity: 0.4; }
  .auth-input.error { border-color: #ff5050; }

  .auth-eye {
    position: absolute; right: 16px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer;
    font-size: 18px; color: var(--text-muted); transition: color 0.25s; padding: 0;
  }
  .auth-eye:hover { color: var(--accent-orange); }

  .pw-strength { margin-top: 10px; }
  .pw-bar { display: flex; gap: 6px; margin-bottom: 6px; }
  .pw-seg { flex: 1; height: 4px; border-radius: 2px; background: var(--border-subtle); transition: all 0.30s; }
  .pw-seg.weak { background: #ff5050; box-shadow: 0 0 8px rgba(255,80,80,0.4); }
  .pw-seg.fair { background: var(--accent-orange); box-shadow: 0 0 8px var(--accent-orange-glow); }
  .pw-seg.strong { background: var(--accent-green); box-shadow: 0 0 8px var(--accent-green-glow); }
  .pw-label { font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 700; text-transform: uppercase; }
  .pw-label.weak { color: #ff5050; }
  .pw-label.fair { color: var(--accent-orange); }
  .pw-label.strong { color: var(--accent-green); }

  .auth-terms { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 28px; font-size: 13px; color: var(--text-secondary); cursor: pointer; }
  .auth-checkmark { width: 22px; height: 22px; border-radius: 6px; border: 2px solid var(--border-strong); background: var(--bg-level2); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.25s; font-size: 13px; color: var(--text-inverse); }
  .auth-checkmark.checked { background: var(--accent-gradient); border-color: var(--accent-orange); }
  .auth-terms-text { line-height: 1.6; }
  .auth-terms-link { color: var(--accent-orange); text-decoration: underline; font-weight: 700; }

  .auth-error { display: flex; align-items: center; gap: 10px; padding: 14px 18px; margin-bottom: 24px; background: rgba(255,80,80,0.1); border: 1px solid rgba(255,80,80,0.25); border-radius: 10px; font-size: 14px; color: #ff7070; font-family: 'Inter', sans-serif; font-weight: 700; }
  .auth-success { display: flex; align-items: center; gap: 10px; padding: 14px 18px; margin-bottom: 24px; background: rgba(0,200,120,0.1); border: 1px solid rgba(0,200,120,0.25); border-radius: 10px; font-size: 14px; color: var(--accent-green); font-family: 'Inter', sans-serif; font-weight: 700; }

  .auth-submit { width: 100%; padding: 16px; background: var(--accent-gradient); color: var(--text-inverse); border: none; border-radius: 10px; font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 16px; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position: relative; overflow: hidden; margin-bottom: 28px; }
  .auth-submit:hover { transform: translateY(-3px); box-shadow: 0 12px 30px var(--accent-orange-glow); filter: brightness(1.1); }
  .auth-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }

  .auth-spinner { display: inline-block; width: 18px; height: 18px; border: 3px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; margin-right: 12px; vertical-align: middle; }
  @keyframes spin { to { transform: rotate(360deg); } }

  .auth-switch { text-align: center; font-size: 14px; color: var(--text-muted); font-family: 'Inter', sans-serif; }
  .auth-switch button { background: none; border: none; color: var(--accent-orange); font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; text-decoration: underline; transition: all 0.2s; padding: 0; }
  .auth-switch button:hover { filter: brightness(1.2); }

  @media (max-width: 1024px) {
    .auth-page { grid-template-columns: 1fr; }
    .auth-left { display: none; }
    .auth-right { padding: 80px 32px; }
    .auth-row { grid-template-columns: 1fr; }
  }
  @media (max-width: 500px) {
    .auth-right { padding: 40px 16px; }
    .auth-form-title { font-size: 32px; }
  }
`;

function getPasswordStrength(pw) {
  if (!pw) return { level: 0, label: "", cls: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { level: 1, label: "Weak", cls: "weak" };
  if (score <= 2) return { level: 2, label: "Fair", cls: "fair" };
  return { level: 3, label: "Strong", cls: "strong" };
}

export default function Signup({ navigate }) {
  const { signup } = useAuth();

  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", role: "individual", password: "", confirm: ""
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key, val) => { setForm(p => ({ ...p, [key]: val })); setError(""); setSuccess(""); };

  const pwStrength = getPasswordStrength(form.password);
  const progress = Math.round(
    ([form.fullName, form.email, form.phone, form.password, form.confirm].filter(Boolean).length / 5) * 100
  );

  const handleSubmit = async () => {
    setError("");
    if (!form.fullName || !form.email || !form.phone || !form.password || !form.confirm)
      return setError("Please fill in all required fields.");
    if (form.password !== form.confirm)
      return setError("Passwords do not match.");
    if (form.password.length < 8)
      return setError("Password must be at least 8 characters.");
    
    // Enforce strong password
    if (pwStrength.level < 3)
      return setError("Password must be stronger. Please include uppercase letters, numbers, and special characters.");
    if (!terms)
      return setError("You must accept the Terms & Conditions to continue.");

    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    const result = await signup({ fullName: form.fullName, email: form.email, phone: form.phone, password: form.password });
    setLoading(false);

    if (!result.success) {
      return setError(result.error);
    }

    setSuccess("Account created successfully!");
    setForm({ fullName: "", email: "", phone: "", role: "individual", password: "", confirm: "" });
    setTerms(false);

    setTimeout(() => {
      navigate("Home");
    }, 2000);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="auth-page">

        {/* LEFT */}
        <div className="auth-left">
          <div className="auth-left-grid" />
          <div className="auth-lines">
            {Array.from({ length: 10 }).map((_, i) => <div className="auth-line" key={i} />)}
          </div>

          <div className="auth-left-top">
            <div className="auth-brand">
              <div className="auth-brand-logo"><img src={logo} alt="AFR-IQ" /></div>
              <div>
                <div className="auth-brand-name">AFR-IQ</div>
                <div className="auth-brand-sub">Technologies Ltd</div>
              </div>
            </div>

            <h1 className="auth-left-headline">
              Join
              <span className="hl">East Africa's</span>
              <span className="hl2">Tech Hub.</span>
            </h1>
            <p className="auth-left-desc">
              Create your account to access IT services, track your internship, enroll in Academy courses, and shop the latest tech products.
            </p>

            <div className="auth-steps">
              {[
                { n: "1", title: "Create Your Account", sub: "Fill in your details below" },
                { n: "2", title: "Verify Your Email", sub: "Check your inbox for a confirmation" },
                { n: "3", title: "Access Everything", sub: "Full access to all AFR-IQ services" },
              ].map(s => (
                <div className="auth-step" key={s.n}>
                  <div className="auth-step-num">{s.n}</div>
                  <div>
                    <div className="auth-step-title">{s.title}</div>
                    <div className="auth-step-sub">{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="auth-left-bottom">
            <div className="auth-trust">
              {[
                { n: "500+", l: "Clients" },
                { n: "2,400+", l: "Students" },
                { n: "98%", l: "Satisfaction" },
              ].map((t, i) => (
                <>
                  {i > 0 && <div className="auth-trust-div" key={"div" + i} />}
                  <div className="auth-trust-item" key={t.l}>
                    <div className="auth-trust-n">{t.n}</div>
                    <div className="auth-trust-l">{t.l}</div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="auth-right">
          <div className="auth-form-wrap">
            <div className="auth-form-title">Create Account</div>
            <div className="auth-form-sub">Sign up to access all AFR-IQ services</div>

            {/* Progress */}
            <div className="auth-progress">
              <div className="auth-progress-label">
                <span>Form Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="auth-progress-bar">
                <div className="auth-progress-fill" style={{ width: `${progress}% ` }} />
              </div>
            </div>

            {error && <div className="auth-error">⚠ {error}</div>}
            {success && <div className="auth-success">✓ {success}</div>}

            {/* Name + Phone row */}
            <div className="auth-row">
              <div className="auth-field">
                <label className="auth-label">Full Name *</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">👤</span>
                  <input className="auth-input" placeholder="Full Name" value={form.fullName} onChange={e => set("fullName", e.target.value)} />
                </div>
              </div>
              <div className="auth-field">
                <label className="auth-label">Phone Number *</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">📞</span>
                  <input className="auth-input" placeholder="+256 700 000 000" value={form.phone} onChange={e => set("phone", e.target.value)} />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="auth-field">
              <label className="auth-label">Email Address *</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">✉</span>
                <input className="auth-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => set("email", e.target.value)} />
              </div>
            </div>


            {/* Password */}
            <div className="auth-field">
              <label className="auth-label">Password *</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">🔒</span>
                <input
                  className="auth-input"
                  type={showPass ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={e => set("password", e.target.value)}
                  style={{ paddingRight: 44 }}
                />
                <button className="auth-eye" onClick={() => setShowPass(p => !p)}>{showPass ? "🙈" : "👁"}</button>
              </div>
              {form.password && (
                <div className="pw-strength">
                  <div className="pw-bar">
                    {[1, 2, 3].map(n => (
                      <div key={n} className={`pw-seg ${n <= pwStrength.level ? pwStrength.cls : ""}`} />
                    ))}
                  </div>
                  <div className={`pw-label ${pwStrength.cls}`}>Password strength: {pwStrength.label}</div>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div className="auth-field">
              <label className="auth-label">Confirm Password *</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">🔒</span>
                <input
                  className="auth-input"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={form.confirm}
                  onChange={e => set("confirm", e.target.value)}
                  style={{ paddingRight: 44 }}
                />
                <button className="auth-eye" onClick={() => setShowConfirm(p => !p)}>{showConfirm ? "🙈" : "👁"}</button>
              </div>
            </div>

            {/* Terms */}
            <div className="auth-terms" onClick={() => setTerms(p => !p)}>
              <div className={`auth-checkmark ${terms ? "checked" : ""}`}>{terms ? "✓" : ""}</div>
              <div className="auth-terms-text">
                I agree to the <span className="auth-terms-link">Terms & Conditions</span> and <span className="auth-terms-link">Privacy Policy</span> of AFR-IQ Technologies Ltd.
              </div>
            </div>

            <button className="auth-submit" onClick={handleSubmit} disabled={loading}>
              {loading && <span className="auth-spinner" />}
              {loading ? "Creating Account..." : "Create My Account →"}
            </button>

            <div className="auth-switch">
              Already have an account?{" "}
              <button onClick={() => navigate("Login")}>Sign In →</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}