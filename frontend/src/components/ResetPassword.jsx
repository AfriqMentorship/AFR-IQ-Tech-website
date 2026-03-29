import { useState } from "react";
import { useAuth } from "../components/AuthContext";
import logo from "../assets/logo-removebg-preview.png";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
  
  .rp-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-base);
    font-family: 'Poppins', sans-serif;
    color: var(--text-primary);
  }

  .rp-form-wrap {
    width: 100%;
    max-width: 420px;
    padding: 40px;
    background: var(--bg-level1);
    border: 1px solid var(--border-medium);
    border-radius: 12px;
    box-shadow: var(--shadow-soft);
  }

  .rp-logo {
    width: 50px;
    height: 50px;
    margin: 0 auto 20px;
  }
  .rp-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 0 12px var(--accent-orange-glow));
  }

  .rp-title {
    font-size: 28px;
    text-align: center;
    margin-bottom: 8px;
    color: var(--text-primary);
  }

  .rp-sub {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    text-align: center;
    color: var(--text-muted);
    margin-bottom: 30px;
  }

  .rp-field { margin-bottom: 24px; }
  .rp-label {
    display: block; font-family: 'Inter', sans-serif; font-size: 11px;
    color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.15em;
    margin-bottom: 10px; font-weight: 700;
  }
  .rp-input-wrap { position: relative; }
  .rp-input-icon {
    position: absolute; left: 16px; top: 50%; transform: translateY(-50%);
    font-size: 16px; color: var(--text-muted); opacity: 0.6;
  }
  .rp-input {
    width: 100%; padding: 15px 16px 15px 48px;
    background: var(--bg-level2); border: 1px solid var(--border-medium);
    border-radius: 10px; color: var(--text-primary);
    font-family: 'Poppins', sans-serif; font-size: 15px; outline: none; transition: all 0.25s;
  }
  .rp-input:focus { border-color: var(--accent-orange); box-shadow: 0 0 0 4px var(--accent-orange-glow); }
  .rp-input.error { border-color: #ff5050; }

  .rp-submit {
    width: 100%; padding: 16px;
    background: var(--accent-gradient); color: var(--text-inverse);
    border: none; border-radius: 10px;
    font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 16px;
    letter-spacing: 0.08em; text-transform: uppercase;
    cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .rp-submit:hover { transform: translateY(-2px); box-shadow: 0 12px 30px var(--accent-orange-glow); filter: brightness(1.1); }
  .rp-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }

  .rp-error {
    background: rgba(255,80,80,0.1); border: 1px solid rgba(255,80,80,0.25);
    border-radius: 10px; padding: 12px 16px; color: #ff7070;
    font-size: 13px; font-family: 'Inter', sans-serif; margin-bottom: 24px;
    display: flex; align-items: center; gap: 8px;
  }
  
  .rp-success {
    background: rgba(0,200,120,0.08); border: 1px solid rgba(0,200,120,0.25);
    border-radius: 10px; padding: 12px 16px; color: #00c878;
    font-size: 13px; font-family: 'Inter', sans-serif; margin-bottom: 24px;
    display: flex; align-items: center; gap: 8px;
  }
`;

export default function ResetPassword({ onSuccess }) {
  const { updatePassword } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    if (!password || !confirmPassword) {
      return setError("Please fill in both fields.");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }

    setLoading(true);
    const result = await updatePassword(password);
    setLoading(false);

    if (!result.success) {
      setError(result.error);
    } else {
      setSuccess("Password successfully updated. Redirecting to home...");
      setTimeout(() => {
        onSuccess && onSuccess();
      }, 2000);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="rp-container">
        <div className="rp-form-wrap">
          <div className="rp-logo">
            <img src={logo} alt="AFR-IQ" />
          </div>
          <div className="rp-title">Update Password</div>
          <div className="rp-sub">Enter your new secure password below</div>

          {error && <div className="rp-error"><span>⚠</span> {error}</div>}
          {success && <div className="rp-success"><span>✓</span> {success}</div>}

          <div className="rp-field">
            <label className="rp-label">New Password</label>
            <div className="rp-input-wrap">
              <span className="rp-input-icon">🔒</span>
              <input
                className={`rp-input ${error ? "error" : ""}`}
                type="password"
                placeholder="New password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="rp-field">
            <label className="rp-label">Confirm Password</label>
            <div className="rp-input-wrap">
              <span className="rp-input-icon">🔒</span>
              <input
                className={`rp-input ${error ? "error" : ""}`}
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="rp-submit" onClick={handleSubmit} disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </>
  );
}
