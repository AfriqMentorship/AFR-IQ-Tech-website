import logo from "../assets/logo-removebg-preview.png";

const footerStyles = `
  .footer {
    background: var(--bg-base);
    border-top: 1px solid var(--border-medium);
    color: var(--text-primary);
    font-family: 'Poppins', sans-serif;
    padding: 100px 48px 40px;
    position: relative;
    overflow: hidden;
    transition: background 0.3s ease;
  }

  .footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent-orange), transparent);
    opacity: 0.3;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
    gap: 80px;
    max-width: 1440px;
    margin: 0 auto 80px;
  }

  .footer-brand-section {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .footer-brand {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .footer-logo-box {
    width: 56px;
    height: 56px;
    border-radius: 14px;
    background: var(--bg-level1);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    box-shadow: var(--shadow-soft);
    border: 1px solid var(--border-subtle);
  }

  .footer-logo-box img {
    width: 80%;
    height: 80%;
    object-fit: contain;
    filter: drop-shadow(0 0 10px var(--accent-orange-glow));
  }

  .footer-brand-text {
    font-family: 'Poppins', sans-serif;
    font-size: 32px;
    letter-spacing: 0.05em;
    color: var(--text-primary);
    line-height: 1;
  }

  .footer-brand-sub {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    color: var(--accent-orange);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-weight: 700;
  }

  .footer-desc {
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.8;
    max-width: 420px;
  }

  .footer-socials {
    display: flex;
    gap: 16px;
  }

  .social-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: var(--bg-level1);
    border: 1px solid var(--border-subtle);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    cursor: pointer;
    font-weight: 800;
    font-size: 16px;
    text-decoration: none;
  }

  .social-icon:hover {
    background: var(--accent-orange);
    color: #fff;
    transform: translateY(-5px) scale(1.1);
    border-color: var(--accent-orange);
    box-shadow: 0 10px 20px var(--accent-orange-glow);
  }

  .footer-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
    font-size: 20px;
    color: var(--text-primary);
    margin-bottom: 32px;
    position: relative;
    display: inline-block;
    letter-spacing: -0.01em;
  }

  .footer-title::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 32px;
    height: 3px;
    background: var(--accent-green);
    border-radius: 2px;
  }

  .footer-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .footer-links li button {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 600;
  }

  .footer-links li button::before {
    content: '→';
    font-size: 14px;
    color: var(--accent-orange);
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .footer-links li button:hover {
    color: var(--accent-orange);
    padding-left: 5px;
  }

  .footer-links li button:hover::before {
    opacity: 1;
    transform: translateX(0);
  }

  .footer-contact-info {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .fc-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 16px;
    background: var(--bg-level1);
    border-radius: 16px;
    border: 1px solid var(--border-subtle);
    transition: all 0.3s ease;
  }
  .fc-item:hover { border-color: var(--accent-green); transform: translateX(5px); }

  .fc-icon {
    font-size: 20px;
    color: var(--accent-green);
  }

  .fc-text {
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.6;
    font-weight: 600;
  }

  .footer-newsletter {
    background: var(--bg-level2);
    border: 1px solid var(--border-medium);
    border-radius: 24px;
    padding: 32px;
    box-shadow: var(--shadow-soft);
  }

  .newsletter-desc {
    font-size: 14px;
    color: var(--text-secondary);
    margin-bottom: 24px;
    line-height: 1.6;
    font-weight: 600;
  }

  .newsletter-form {
    display: flex;
    gap: 12px;
  }

  .newsletter-input {
    flex: 1;
    background: var(--bg-base);
    border: 1px solid var(--border-medium);
    border-radius: 12px;
    padding: 14px 20px;
    color: var(--text-primary);
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    outline: none;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    min-width: 0;
  }

  .newsletter-input:focus {
    border-color: var(--accent-green);
    box-shadow: 0 0 0 4px var(--accent-green-glow);
  }

  .newsletter-submit {
    background: var(--accent-green);
    color: var(--text-inverse);
    border: none;
    border-radius: 12px;
    padding: 0 24px;
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    letter-spacing: 0.05em;
    box-shadow: 0 4px 12px var(--accent-green-glow);
  }

  .newsletter-submit:hover {
    background: var(--accent-green-hover);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px var(--accent-green-glow);
  }

  .footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 40px;
    border-top: 1px solid var(--border-subtle);
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: var(--text-muted);
    max-width: 1440px;
    margin: 0 auto;
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  .footer-bottom-links {
    display: flex;
    gap: 32px;
  }

  .footer-bottom-links span {
    cursor: pointer;
    transition: all 0.2s;
    text-transform: uppercase;
  }

  .footer-bottom-links span:hover {
    color: var(--accent-orange);
  }

  @media (max-width: 1200px) {
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 60px; }
  }

  @media (max-width: 768px) {
    .footer { padding: 80px 24px 40px; }
    .footer-grid { grid-template-columns: 1fr; gap: 48px; }
    .footer-bottom { flex-direction: column; gap: 24px; text-align: center; }
    .newsletter-form { flex-direction: column; }
    .newsletter-submit { padding: 14px; }
  }
  @media (max-width: 500px) {
    .footer { padding: 40px 16px; }
    .footer-grid { gap: 32px; }
    .footer-brand-text { font-size: 28px; }
    .footer-title { font-size: 18px; margin-bottom: 24px; }
    .social-icon { width: 40px; height: 40px; }
    .footer-bottom-links { flex-direction: column; gap: 16px; }
  }
`;

export default function Footer({ navigate }) {
  return (
    <>
      <style>{footerStyles}</style>
      <footer className="footer">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand-section">
            <div className="footer-brand" onClick={() => navigate("Home")} style={{ cursor: "pointer" }}>
              <div className="footer-logo-box">
                <img src={logo} alt="AFR-IQ Logo" />
              </div>
              <div>
                <div className="footer-brand-text">AFR-IQ</div>
                <div className="footer-brand-sub">Technologies Ltd</div>
              </div>
            </div>
            <p className="footer-desc">
              Empowering  Africa through innovative IT solutions, professional training, and premium smart devices. We bridge the gap between ambition and technology.
            </p>
            <div className="footer-socials">
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-icon">𝕏</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">in</a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>
                </svg>
              </a>
              <a href="https://wa.me/256783402796" target="_blank" rel="noopener noreferrer" className="social-icon" title="WhatsApp Us">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><button onClick={() => navigate("Home")}>Home Page</button></li>
              <li><button onClick={() => navigate("AboutUs")}>About Us</button></li>
              <li><button onClick={() => navigate("Services")}>Our Services</button></li>
              <li><button onClick={() => navigate("Academy")}>Academy</button></li>
              <li><button onClick={() => navigate("Contact")}>Contact Support</button></li>
            </ul>
          </div>

          {/* Legal & Help Column */}
          <div>
            <h4 className="footer-title">Support</h4>
            <ul className="footer-links">
              <li><button onClick={() => navigate("Login")}>Client Portal</button></li>
              <li><button>Privacy Policy</button></li>
              <li><button>Terms of Service</button></li>
              <li><button>FAQ</button></li>
            </ul>
          </div>

          {/* Contact & Newsletter Column */}
          <div>
            <h4 className="footer-title">Contact & Updates</h4>
            <div className="footer-contact-info" style={{ marginBottom: "24px" }}>
              <div className="fc-item">
                <div className="fc-icon">📍</div>
                <div className="fc-text">Kasule Mall, level 2<br />Kampala, Makerere ON Sr.Apollo Kagwa Road</div>
              </div>
              <div className="fc-item">
                <div className="fc-icon">📞</div>
                <div className="fc-text">+256 783402796</div>
              </div>
            </div>

            <div className="footer-newsletter">
              <div className="newsletter-desc">Subscribe to our newsletter for the latest tech insights and academy updates.</div>
              <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }}>
                <input type="email" placeholder="Your email..." className="newsletter-input" required />
                <button type="submit" className="newsletter-submit">Join</button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>&copy; {new Date().getFullYear()} AFR-IQ Technologies Ltd. All rights reserved.</div>
          <div className="footer-bottom-links">
            <span>Sitemap</span>
            <span>Accessibility</span>
          </div>
        </div>
      </footer>
    </>
  );
}
