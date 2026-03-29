import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { sendAdminAlert } from "../utils/sendEmail";
import logo from "../assets/logo-removebg-preview.png";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .apply-page {
    min-height: calc(100vh - 75px);
    background: var(--bg-level1);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Poppins', sans-serif;
    color: var(--text-primary);
    padding: 60px 24px;
    position: relative;
    overflow: hidden;
  }
  .apply-page::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse 60% 80% at 50% -20%, var(--accent-green-glow) 0%, transparent 70%);
    pointer-events: none;
  }

  .apply-card {
    background: var(--bg-level2);
    border: 1px solid var(--border-subtle);
    border-radius: 24px;
    padding: 48px;
    width: 100%;
    max-width: 580px;
    box-shadow: 0 40px 80px rgba(0,0,0,0.2);
    position: relative;
    z-index: 2;
  }

  .apply-header { text-align: center; margin-bottom: 32px; }
  .apply-logo { width: 60px; height: 60px; margin: 0 auto 16px; display: block; filter: drop-shadow(0 0 10px var(--accent-green-glow)); }
  .apply-title { font-size: 32px; font-weight: 800; color: var(--text-primary); margin-bottom: 8px; letter-spacing: -0.01em; }
  .apply-sub { font-size: 14px; color: var(--text-muted); font-family: 'Inter', sans-serif; }

  .form-group { margin-bottom: 24px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
  @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } .apply-card { padding: 32px 20px; } }
  .form-label { display: block; font-family: 'Inter', sans-serif; font-size: 11px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px; font-weight: 700; letter-spacing: 0.1em; }
  .form-input, .form-select { 
    width: 100%; padding: 14px 18px; 
    background: var(--bg-level1); 
    border: 1px solid var(--border-medium); 
    border-radius: 12px; 
    color: var(--text-primary); 
    font-family: 'Poppins', sans-serif; 
    font-size: 14px; 
    outline: none; transition: all 0.3s ease; 
  }
  .form-input:focus, .form-select:focus { border-color: var(--accent-green); box-shadow: 0 0 0 4px var(--accent-green-glow); }
  
  .btn-submit { 
    width: 100%; padding: 16px; 
    background: var(--accent-orange); 
    color: var(--text-inverse); 
    border: none; border-radius: 12px; 
    font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 15px; 
    cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
    text-transform: uppercase; letter-spacing: 0.05em; 
  }
  .btn-submit:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 15px 30px var(--accent-green-glow); }
  .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

  .pending-msg { text-align: center; }
  .pending-icon { font-size: 64px; margin-bottom: 24px; }
  .pending-title { font-size: 32px; font-weight: 800; color: var(--accent-green); margin-bottom: 16px; }
  .pending-text { font-size: 15px; color: var(--text-secondary); line-height: 1.7; margin-bottom: 32px; }

  .step-indicator { display: flex; gap: 8px; justify-content: center; margin-bottom: 32px; }
  .step-dot { width: 12px; height: 12px; border-radius: 50%; background: var(--border-strong); transition: all 0.3s; }
  .step-dot.active { background: var(--accent-green); box-shadow: 0 0 10px var(--accent-green-glow); transform: scale(1.2); }
`;

const packagesList = [
    "Package 01 (Graphics Design, Repair, Programming)",
    "Package 02 (Networking, Web Dev, Mobile App Dev)",
    "Package 03 (Cloud Computing, Cybersecurity, Ethical Hacking)"
];

export default function IMSApply({ navigate }) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        password: "",
        email: "",
        university: "",
        location: "",
        registration_number: "",
        package_name: packagesList[0]
    });
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };
    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleNext = () => {
        setErrorMsg("");
        if (!form.first_name || !form.last_name || !form.email || !form.password) {
            return setErrorMsg("Please fill in all fields.");
        }
        if (form.password.length < 8) {
            return setErrorMsg("Password must be at least 8 characters.");
        }
        setStep(2);
    };

    const handleSubmit = async () => {
        setErrorMsg("");
        if (!form.university || !form.location || !form.registration_number) {
            return setErrorMsg("Please fill in University, Location, and Registration Number.");
        }

        setLoading(true);

        const fullName = `${form.first_name} ${form.last_name}`.trim();

        // 1. Try to create a Supabase Auth user (signup)
        let userId = null;

        const { data: signupData, error: signupError } = await supabase.auth.signUp({
            email: form.email,
            password: form.password,
            options: { data: { full_name: fullName, phone: "0000000000" } }
        });

        if (!signupError && signupData?.user) {
            // Signup successful — we have the user ID directly
            userId = signupData.user.id;

            // Sync to public.users — attempt silently (may fail if email not confirmed)
            try {
                await supabase.from('users').insert([{
                    id: userId,
                    email: form.email,
                    full_name: fullName,
                    phone: "0000000000",
                    role: 'student',
                    status: 'Active'
                }]);
            } catch (_) {
                // Ignore — the users row will be created when they log in
            }
        } else if (signupError) {
            // Signup failed — check if user already exists
            const alreadyExists =
                signupError.message?.toLowerCase().includes("already registered") ||
                signupError.message?.toLowerCase().includes("user already") ||
                signupError.message?.toLowerCase().includes("email address is already") ||
                signupError.status === 422;

            if (alreadyExists) {
                // Try signing in to get the user ID
                const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
                    email: form.email,
                    password: form.password
                });

                if (loginError) {
                    const msg = loginError.message?.toLowerCase().includes("email not confirmed")
                        ? "Your email address is not confirmed yet. Please check your inbox for a verification link and confirm your email before submitting."
                        : loginError.message?.toLowerCase().includes("invalid")
                        ? "This email is already registered with a different password. Please go back and use the correct password."
                        : "Sign-in failed: " + loginError.message;
                    setErrorMsg(msg);
                    setLoading(false);
                    return;
                }

                userId = loginData?.user?.id ?? loginData?.session?.user?.id ?? null;
            } else {
                // Some other signup error
                setErrorMsg("Account creation failed: " + signupError.message);
                setLoading(false);
                return;
            }
        }

        // Final guard: we must have a userId to proceed
        if (!userId) {
            setErrorMsg("Could not determine your user account. Please try again or contact support.");
            setLoading(false);
            return;
        }

        // 2. Upload Introduction Letter PDF (optional)
        let introUrl = "";
        if (file) {
            try {
                const fileExt = file.name.split('.').pop();
                const fileName = `${userId}-${Date.now()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage
                    .from('applications')
                    .upload(fileName, file);

                if (uploadError) throw uploadError;

                const { data: urlData } = supabase.storage
                    .from('applications')
                    .getPublicUrl(fileName);

                introUrl = urlData.publicUrl;
            } catch (err) {
                setErrorMsg("Failed to upload the PDF. Error: " + err.message);
                setLoading(false);
                return;
            }
        }

        // 3. Insert Internship Application record
        const insertPayload = {
            student_id: userId,
            package_name: form.package_name,
            application_url: introUrl,
            university: form.university,
            location: form.location,
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email,
            registration_number: form.registration_number,
            status: 'Pending'
        };

        let { error: insertError } = await supabase.from('internships').insert([insertPayload]);

        // Fallback A: columns don't exist — use basic schema
        if (insertError && (insertError.code === '42703' || insertError.message?.toLowerCase().includes('column') || insertError.message?.toLowerCase().includes('does not exist'))) {
            const basicPayload = {
                student_id: userId,
                package_name: form.package_name,
                application_url: introUrl,
                status: 'Pending'
            };
            const fallbackRes = await supabase.from('internships').insert([basicPayload]);
            insertError = fallbackRes.error;
        }

        // Fallback B: FK violation (student_id not in public.users yet) — insert without student_id
        if (insertError && (insertError.code === '23503' || insertError.message?.toLowerCase().includes('foreign key') || insertError.message?.toLowerCase().includes('violates'))) {
            const noFkPayload = {
                package_name: form.package_name,
                application_url: introUrl,
                university: form.university,
                location: form.location,
                first_name: form.first_name,
                last_name: form.last_name,
                email: form.email,
                registration_number: form.registration_number,
                status: 'Pending'
            };
            const fallbackRes2 = await supabase.from('internships').insert([noFkPayload]);
            insertError = fallbackRes2.error;
        }

        setLoading(false);

        if (insertError) {
            setErrorMsg("Failed to save your application. Error: " + insertError.message + " (code: " + insertError.code + ")");
            console.error("Insert error:", insertError);
        } else {
            // Notify Admin
            sendAdminAlert(
                `New IMS Application: ${fullName}`,
                `A new student (${fullName}) has applied for ${form.package_name}.\n\nUniversity: ${form.university}\nEmail: ${form.email}\nReg No: ${form.registration_number}\nLocation: ${form.location}`,
                fullName,
                form.email
            );
            setStep(3); // Show success screen
        }
    };

    return (
        <>
            <style>{styles}</style>
            <div className="apply-page">
                <div className="apply-card">
                    
                    {step < 3 && (
                        <div className="step-indicator">
                            <div className={`step-dot ${step === 1 ? 'active' : ''}`} />
                            <div className={`step-dot ${step === 2 ? 'active' : ''}`} />
                        </div>
                    )}

                    <div className="apply-header">
                        <img src={logo} alt="AFR-IQ" className="apply-logo" />
                        <h2 className="apply-title">IMS Application</h2>
                        {step === 1 && <div className="apply-sub">Account Creation</div>}
                        {step === 2 && <div className="apply-sub">Internship Details</div>}
                    </div>

                    {errorMsg && (
                        <div style={{ background: "rgba(255,80,80,0.1)", color: "#ff5050", padding: "14px", borderRadius: "10px", marginBottom: "24px", fontSize: "14px", border: "1px solid rgba(255,80,80,0.2)", fontWeight: "bold" }}>
                            ⚠ {errorMsg}
                        </div>
                    )}

                    {step === 1 && (
                        <>
                            <div className="form-row">
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="form-label">First Name *</label>
                                    <input type="text" name="first_name" className="form-input" value={form.first_name} onChange={handleChange} placeholder="e.g. John" />
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="form-label">Last Name *</label>
                                    <input type="text" name="last_name" className="form-input" value={form.last_name} onChange={handleChange} placeholder="e.g. Doe" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email Address *</label>
                                <input type="email" name="email" className="form-input" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Create Password *</label>
                                <input type="password" name="password" className="form-input" value={form.password} onChange={handleChange} placeholder="Min. 8 characters" />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Select Package</label>
                                <select name="package_name" className="form-select" value={form.package_name} onChange={handleChange}>
                                    {packagesList.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </div>

                            <button className="btn-submit" onClick={handleNext}>Next Step →</button>
                            <div style={{ textAlign: "center", marginTop: "24px", fontSize: "13px", color: "var(--text-muted)", fontFamily: "'Inter', sans-serif" }}>
                                Already have an account? <span style={{ color: "var(--accent-green)", fontWeight: 700, cursor: "pointer", textDecoration: "underline" }} onClick={() => navigate("Login")}>Log In</span>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="form-group">
                                <label className="form-label">Name of University *</label>
                                <input type="text" name="university" className="form-input" value={form.university} onChange={handleChange} placeholder="e.g. Makerere University" />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Registration Number *</label>
                                <input type="text" name="registration_number" className="form-input" value={form.registration_number} onChange={handleChange} placeholder="e.g. 21/U/1234/EVE" />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Current Location *</label>
                                <input type="text" name="location" className="form-input" value={form.location} onChange={handleChange} placeholder="e.g. Kampala, Uganda" />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Introduction Letter (PDF) — Optional</label>
                                <input type="file" name="intro_letter_file" accept="application/pdf" className="form-input" onChange={handleFileChange} />
                            </div>

                            <div style={{ display: "flex", gap: "16px" }}>
                                <button className="btn-submit" style={{ background: "transparent", border: "2px solid var(--border-strong)", color: "var(--text-primary)" }} onClick={() => setStep(1)}>← Back</button>
                                <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
                                    {loading ? "Submitting..." : "Submit Application"}
                                </button>
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <div className="pending-msg">
                            <div className="pending-icon">✅</div>
                            <h2 className="pending-title">Application Submitted</h2>
                            <p className="pending-text">
                                Your application has been received! It will remain pending until confirmed by our admin team.<br/><br/>
                                Once confirmed, you will be able to access your dashboard to log daily activities and track your progress.
                            </p>
                            <button className="btn-submit" onClick={() => navigate("Dashboard")}>Go to Dashboard</button>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}
