import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function IMSRegister({ user, onComplete }) {
    const packagesList = [
        "Package 01 (Graphics Design, Repair, Programming)",
        "Package 02 (Networking, Web Dev, Mobile App Dev)",
        "Package 03 (Cloud Computing, Cybersecurity, Ethical Hacking)"
    ];

    const [formData, setFormData] = useState({
        first_name: user?.user_metadata?.full_name?.split(' ')[0] || "",
        last_name: user?.user_metadata?.full_name?.split(' ').slice(1).join(' ') || "",
        email: user?.email || "",
        university: "",
        location: "",
        package_name: "",
    });
    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState(false);

    useEffect(() => {
        // We now use the standard internship packages list
        setFormData(prev => ({ ...prev, package_name: packagesList[0] }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        let introUrl = "";
        if (file) {
            try {
                const fileExt = file.name.split('.').pop();
                const fileName = `${user.id}-${Date.now()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage
                    .from('applications')
                    .upload(fileName, file);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from('applications')
                    .getPublicUrl(fileName);
                introUrl = data.publicUrl;
            } catch (err) {
                setErrorMsg("Failed to upload the PDF. Please ensure an 'applications' storage bucket exists. " + err.message);
                setLoading(false);
                return;
            }
        }

        let { error } = await supabase.from('internships').insert([{
            student_id: user.id,
            company_id: null, // Admin assigns after submission
            package_name: formData.package_name,
            application_url: introUrl,
            university: formData.university,
            location: formData.location,
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            status: 'Pending'
        }]);

        // Smart Fallback: If some columns are missing from the table, use a basic payload
        if (error && (error.code === '42703' || error.message?.toLowerCase().includes('column'))) {
            console.warn("Table schema missing new columns, using fallback payload.");
            const basicPayload = {
                student_id: user.id,
                package_name: formData.package_name,
                application_url: introUrl,
                status: 'Pending'
            };
            const fallbackRes = await supabase.from('internships').insert([basicPayload]);
            error = fallbackRes.error;
        }

        setLoading(false);

        if (error) {
            setErrorMsg("Registration failed: " + error.message);
            console.error("IMS Submission Error:", error);
        } else {
            setSuccessMsg(true);
            setTimeout(() => {
                if (onComplete) onComplete();
            }, 3000);
        }
    };

    if (successMsg) {
        return (
            <div className="registration-success">
                <div className="success-icon">🎉</div>
                <h3 className="success-title">Application Submitted!</h3>
                <p className="success-text">
                    Your internship application has been received successfully.<br />
                    Pending admin approval. You will be redirected shortly.
                </p>
            </div>
        );
    }

    return (
        <div className="registration-container">
            <h3 className="registration-title">Start Your Application</h3>

            {errorMsg && (
                <div className="error-alert">
                    {errorMsg}
                </div>
            )}

            <form onSubmit={handleSubmit}>

                <div className="auth-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                        <label className="form-label">First Name *</label>
                        <input type="text" name="first_name" className="form-input" value={formData.first_name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Last Name *</label>
                        <input type="text" name="last_name" className="form-input" value={formData.last_name} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="auth-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                        <label className="form-label">Name of University / Institution *</label>
                        <input type="text" name="university" className="form-input" value={formData.university} onChange={handleChange} placeholder="e.g. Makerere University" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Current Location *</label>
                        <input type="text" name="location" className="form-input" value={formData.location} onChange={handleChange} placeholder="e.g. Kampala, Uganda" required />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Internship Package *</label>
                    <select
                        name="package_name"
                        className="form-select"
                        value={formData.package_name}
                        onChange={handleChange}
                        required
                    >
                        {packagesList.map(p => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>

                {/* Preferred Company and New Company forms removed per request */}

                {/* CV / Resume Link field removed per request */}

                <div className="form-group">
                    <label className="form-label">Introduction Letter (PDF Only)</label>
                    <input
                        type="file"
                        name="intro_letter_file"
                        accept="application/pdf"
                        className="form-input"
                        onChange={handleFileChange}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-submit"
                >
                    {loading ? "Submitting..." : "Submit Application"}
                </button>
            </form>

            <style>{`
                .registration-container {
                    background: var(--bg-level1);
                    padding: 32px;
                    border-radius: 20px;
                    border: 1px solid var(--border-subtle);
                    box-shadow: var(--shadow-soft);
                }
                .registration-title {
                    font-family: 'Poppins', sans-serif;
                    font-weight: 800;
                    font-size: 28px;
                    color: var(--text-primary);
                    margin-bottom: 28px;
                    letter-spacing: -0.01em;
                }
                .error-alert {
                    background: rgba(255,80,80,0.1);
                    color: #ff5050;
                    padding: 14px 18px;
                    border-radius: 12px;
                    margin-bottom: 24px;
                    font-family: 'Poppins', sans-serif;
                    font-weight: 600;
                    font-size: 14px;
                    border: 1px solid rgba(255,80,80,0.2);
                }
                {/* Preferred Company and New Company logic removed */}

                .registration-success {
                    background: var(--bg-level1);
                    padding: 60px 32px;
                    border-radius: 24px;
                    border: 1px solid var(--accent-green-glow);
                    text-align: center;
                    box-shadow: var(--shadow-soft);
                    animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                }
                @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                .success-icon { font-size: 64px; margin-bottom: 24px; }
                .success-title {
                    font-family: 'Poppins', sans-serif;
                    font-weight: 800;
                    font-size: 32px;
                    color: var(--accent-green);
                    margin-bottom: 16px;
                    letter-spacing: -0.01em;
                }
                .success-text {
                    color: var(--text-secondary);
                    font-size: 16px;
                    line-height: 1.7;
                    margin-bottom: 0;
                }
            `}</style>
        </div>
    );
}
