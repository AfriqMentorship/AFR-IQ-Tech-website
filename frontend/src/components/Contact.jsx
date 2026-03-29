import { useState } from "react";
import { supabase } from "../supabaseClient";
import { sendAdminContactNotification } from "../utils/sendEmail";

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
  .page-desc { font-size: 18px; color: var(--text-secondary); max-width: 600px; line-height: 1.7; }

  /* Contact Content */
  .contact-container {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 80px;
    padding: 80px 48px;
    max-width: 1440px;
    margin: 0 auto;
  }

  /* Left Side: Info */
  .contact-details {
    display: flex;
    flex-direction: column;
    gap: 48px;
  }

  .contact-item {
    display: flex;
    gap: 24px;
    padding: 32px;
    background: var(--bg-level1);
    border: 1px solid var(--border-subtle);
    border-radius: 24px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: var(--shadow-soft);
  }
  .contact-item:hover {
    transform: translateY(-8px);
    border-color: var(--accent-orange);
    background: var(--bg-level2);
    box-shadow: 0 20px 40px rgba(0,0,0,0.05);
  }

  .contact-icon {
    width: 64px; height: 64px;
    border-radius: 16px;
    background: var(--bg-level2);
    border: 1px solid var(--border-medium);
    display: flex; align-items: center; justify-content: center;
    font-size: 28px; color: var(--accent-orange);
    flex-shrink: 0;
    transition: all 0.3s ease;
  }
  .contact-item:hover .contact-icon {
    background: var(--accent-orange);
    color: #fff;
    transform: scale(1.1) rotate(5deg);
  }

  .contact-info h3 {
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
    font-size: 22px;
    color: var(--text-primary);
    margin-bottom: 12px;
    letter-spacing: -0.01em;
  }

  .contact-info p {
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 6px;
    font-family: 'Poppins', sans-serif;
  }

  /* Right Side: Form */
  .contact-form-wrapper {
    background: var(--bg-level1);
    border: 1px solid var(--border-subtle);
    border-radius: 28px;
    padding: 56px;
    position: relative;
    overflow: hidden;
    box-shadow: var(--shadow-soft);
  }
  
  .contact-form-wrapper::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 5px;
    background: var(--accent-gradient);
    opacity: 0.8;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 24px;
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 28px;
  }

  .form-label {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 700;
  }

  .form-input, .form-textarea {
    width: 100%;
    padding: 16px 20px;
    background: var(--bg-level2);
    border: 1px solid var(--border-medium);
    border-radius: 12px;
    color: var(--text-primary);
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    outline: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-sizing: border-box;
  }

  .form-input:focus, .form-textarea:focus {
    border-color: var(--accent-orange);
    background: var(--bg-base);
    box-shadow: 0 0 0 4px var(--accent-orange-glow);
  }

  .form-textarea {
    resize: vertical;
    min-height: 160px;
  }

  .form-submit {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 18px 36px;
    background: var(--accent-orange);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
    font-size: 16px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    width: 100%;
    box-shadow: 0 10px 20px var(--accent-orange-glow);
  }

  .form-submit:hover:not(:disabled) {
    background: var(--accent-orange-hover);
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 30px var(--accent-orange-glow);
  }
  .form-submit:disabled { opacity: 0.6; cursor: not-allowed; filter: grayscale(0.3); }

  .form-error {
    background: rgba(255,80,80,0.1); border: 1px solid rgba(255,80,80,0.2);
    border-radius: 10px; padding: 14px 18px; margin-bottom: 20px;
    font-family: 'Inter', sans-serif; font-size: 13px; color: #ff5050; font-weight: 600;
  }

  /* Success State */
  .contact-success {
    text-align: center;
    padding: 60px 20px;
    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .contact-success-icon { font-size: 80px; margin-bottom: 24px; animation: bounce 0.8s ease 0.3s both; }
  @keyframes bounce { 0% { transform: scale(0); } 60% { transform: scale(1.15); } 80% { transform: scale(0.95); } 100% { transform: scale(1); } }
  .contact-success h2 { font-family: 'Poppins', sans-serif; font-size: 36px; font-weight: 800; color: var(--accent-green); margin-bottom: 12px; }
  .contact-success p { color: var(--text-secondary); font-size: 16px; margin-bottom: 32px; line-height: 1.6; max-width: 360px; margin-left: auto; margin-right: auto; }
  .contact-success-btn {
    padding: 14px 36px; background: var(--accent-orange); color: #fff;
    border: none; border-radius: 12px; font-family: 'Poppins', sans-serif;
    font-weight: 800; font-size: 14px; text-transform: uppercase; letter-spacing: 0.08em;
    cursor: pointer; transition: all 0.3s ease; box-shadow: 0 8px 16px var(--accent-orange-glow);
  }
  .contact-success-btn:hover { background: var(--accent-orange-hover); transform: translateY(-2px); }

  /* Map Container */
  .map-container {
    height: 500px;
    background: var(--bg-level1);
    margin: 0 48px 80px;
    border-radius: 28px;
    border: 1px solid var(--border-subtle);
    overflow: hidden;
    position: relative;
    box-shadow: var(--shadow-soft);
  }
  
  .map-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.1);
    pointer-events: none;
  }

  @media (max-width: 1200px) {
    .contact-container { grid-template-columns: 1fr; padding: 60px 24px; gap: 64px; }
    .form-row { grid-template-columns: 1fr; }
    .page-hero { padding: 80px 24px 60px; }
    .map-container { margin: 0 24px 60px; height: 400px; }
    .contact-form-wrapper { padding: 40px 24px; }
  }
  @media (max-width: 500px) {
    .page-hero { padding: 40px 16px; }
    .page-title { font-size: 40px; }
    .contact-container { padding: 40px 16px; gap: 40px; }
    .contact-item { padding: 20px; flex-direction: column; gap: 16px; align-items: flex-start; }
    .contact-icon { width: 48px; height: 48px; font-size: 24px; }
    .contact-form-wrapper { padding: 32px 16px; }
    .map-container { margin: 0 16px 40px; height: 300px; }
  }
`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: insertError } = await supabase
        .from('contact_messages')
        .insert([{
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || null,
          subject: form.subject.trim(),
          message: form.message.trim(),
          status: 'unread',
        }]);

      if (insertError) throw insertError;

      // Fire-and-forget: notify admin instantly via email
      sendAdminContactNotification({
        name:    form.name.trim(),
        email:   form.email.trim(),
        phone:   form.phone.trim() || null,
        subject: form.subject.trim(),
        message: form.message.trim(),
      });

      setSuccess(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });

    } catch (err) {
      console.error("Contact form error:", err);
      setError(err.message || "Failed to send message. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="page">
        <div className="page-hero">
          <div className="page-grid-bg" />
          <div className="page-eyebrow">Get In Touch</div>
          <h1 className="page-title">Contact <span className="hl">Us</span></h1>
          <p className="page-desc">
            Have a question about our services, academy, or need technical support?
            Our team of experts is ready to help you navigate your technological journey.
          </p>
        </div>

        <div className="contact-container">

          {/* Left: Contact Info */}
          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div className="contact-info">
                <h3>Our Headquarters</h3>
                <p>Kasule Mall, Level 2</p>
                <p>Makerere, Sir Apollo Kagwa Road</p>
                <p>Kampala, Uganda</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div className="contact-info">
                <h3>Call Us</h3>
                <p>Mon-Fri, 9am to 6pm (EAT)</p>
                <p style={{ color: '#ffa500' }}>+256 783402796</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div className="contact-info">
                <h3>Email Us</h3>
                <p>General Inquiries: info@afr-iq.tech</p>
                <p>Support: helpdesk@afr-iq.tech</p>
                <p>Sales: sales@afr-iq.tech</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-wrapper">
            {success ? (
              <div className="contact-success">
                <div className="contact-success-icon">✅</div>
                <h2>Message Sent!</h2>
                <p>
                  Thank you, there! Your message has been received.
                  Our team will get back to you via your email within 24 hours.
                </p>
                <button className="contact-success-btn" onClick={() => setSuccess(false)}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && <div className="form-error">⚠️ {error}</div>}

                <div className="form-row">
                  <div className="form-field" style={{ marginBottom: 0 }}>
                    <label className="form-label">Your Name *</label>
                    <input
                      className="form-input"
                      placeholder="John Doe"
                      required
                      value={form.name}
                      onChange={e => set('name', e.target.value)}
                    />
                  </div>
                  <div className="form-field" style={{ marginBottom: 0 }}>
                    <label className="form-label">Email Address *</label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field" style={{ marginBottom: 0 }}>
                    <label className="form-label">Phone Number</label>
                    <input
                      className="form-input"
                      type="tel"
                      placeholder="+256 700 000 000"
                      value={form.phone}
                      onChange={e => set('phone', e.target.value)}
                    />
                  </div>
                  <div className="form-field" style={{ marginBottom: 0 }}>
                    <label className="form-label">Subject *</label>
                    <input
                      className="form-input"
                      placeholder="How can we help?"
                      required
                      value={form.subject}
                      onChange={e => set('subject', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-field" style={{ marginTop: '24px' }}>
                  <label className="form-label">Message *</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Write your message here..."
                    required
                    value={form.message}
                    onChange={e => set('message', e.target.value)}
                  />
                </div>

                <button type="submit" className="form-submit" disabled={loading}>
                  {loading ? '⏳ Sending...' : <>Send Message <span>→</span></>}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Interactive Map */}
        <div className="map-container">
          <iframe
            src="https://maps.google.com/maps?q=0.3454585,32.563076&hl=en&z=17&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location Map"
          ></iframe>
        </div>

      </div>
    </>
  );
}
