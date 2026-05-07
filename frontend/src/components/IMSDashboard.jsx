import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "../supabaseClient";
import IMSRegister from "./IMSRegister";

const dashStyles = `
  .ims-dash-page { 
    min-height: calc(100vh - 75px); 
    background: var(--bg-base); 
    color: var(--text-primary); 
    font-family: 'Poppins', sans-serif; 
    padding: 60px 48px; 
    width: 100%;
    overflow-x: hidden;
    position: relative;
    transition: background 0.3s ease;
  }
  .dash-header { margin-bottom: 48px; }
  .dash-title { 
    font-family: 'Poppins', sans-serif; 
    font-size: 56px; 
    color: var(--text-primary); 
    letter-spacing: 0.02em; 
    line-height: 1;
    margin-bottom: 8px;
  }
  .dash-subtitle { 
    font-family: 'Inter', sans-serif; 
    font-size: 11px; 
    color: var(--accent-green); 
    text-transform: uppercase; 
    letter-spacing: 0.2em;
    font-weight: 700;
  }
  
  .card-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); 
    gap: 32px; 
    margin-bottom: 56px; 
  }
  .data-card { 
    background: var(--bg-level1); 
    border: 1px solid var(--border-subtle); 
    border-radius: 24px; 
    padding: 32px; 
    position: relative; 
    overflow: hidden; 
    box-shadow: var(--shadow-soft);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .data-card:hover {
    transform: translateY(-8px);
    border-color: var(--accent-green);
    background: var(--bg-level2);
    box-shadow: 0 30px 60px rgba(0,0,0,0.1);
  }
  .data-card::before { 
    content: ''; 
    position: absolute; top: 0; left: 0; width: 6px; height: 100%; 
    background: var(--accent-green); 
    opacity: 0.8;
  }
  .data-title { 
    font-family: 'Poppins', sans-serif;
    font-weight: 800; 
    font-size: 20px; 
    margin-bottom: 24px; 
    color: var(--text-primary); 
    letter-spacing: -0.01em;
  }
  
  .ims-table-wrapper { 
    background: var(--bg-level1); 
    border: 1px solid var(--border-subtle); 
    border-radius: 24px; 
    overflow-x: auto; 
    margin-bottom: 56px;
    box-shadow: var(--shadow-soft);
  }
  .ims-table { width: 100%; border-collapse: collapse; min-width: 800px; }
  .ims-table th, .ims-table td { 
    padding: 20px 24px; 
    text-align: left; 
    border-bottom: 1px solid var(--border-subtle); 
    font-size: 15px; 
  }
  .ims-table th { 
    font-family: 'Inter', sans-serif; 
    font-size: 11px; 
    color: var(--text-muted); 
    text-transform: uppercase; 
    background: var(--bg-level2); 
    letter-spacing: 0.1em;
    font-weight: 700;
  }
  .ims-table tr:last-child td { border-bottom: none; }
  .ims-table tr:hover td { background: var(--bg-level2-half); }
  
  .badge { 
    padding: 6px 12px; 
    border-radius: 6px; 
    font-family: 'Inter', sans-serif; 
    font-size: 10px; 
    text-transform: uppercase; 
    font-weight: 700;
    letter-spacing: 0.05em;
  }
  .badge.pending { background: var(--accent-orange-glow); color: var(--accent-orange); border: 1px solid var(--accent-orange-glow); }
  .badge.approved { background: var(--accent-green-glow); color: var(--accent-green); border: 1px solid var(--accent-green-glow); }
  .badge.ongoing { background: var(--accent-blue-glow); color: var(--accent-blue); border: 1px solid var(--accent-blue-glow); }
  .badge.completed { background: rgba(155,89,182,0.15); color: #9b59b6; border: 1px solid rgba(155,89,182,0.2); }
  .badge.rejected { background: rgba(255,80,80,0.15); color: #ff5050; border: 1px solid rgba(255,80,80,0.2); }
  
  .action-btn { 
    background: none; 
    border: none; 
    font-family: 'Poppins', sans-serif; 
    font-size: 13px; 
    font-weight: 700; 
    cursor: pointer; 
    text-decoration: none; 
    margin-right: 16px; 
    transition: all 0.3s ease;
  }
  .action-btn:hover { transform: scale(1.05); opacity: 0.8; }
  .action-btn.green { color: var(--accent-green); } 
  .action-btn.red { color: #ff5050; } 
  .action-btn.blue { color: var(--accent-blue); }

  .form-group { margin-bottom: 24px; }
  .form-label { 
    display: block; 
    font-family: 'Inter', sans-serif; 
    font-size: 11px; 
    color: var(--text-muted); 
    text-transform: uppercase; 
    margin-bottom: 10px; 
    font-weight: 700;
    letter-spacing: 0.1em;
  }
  .form-input, .form-textarea, .form-select { 
    width: 100%; padding: 14px 18px; 
    background: var(--bg-level2); 
    border: 1px solid var(--border-medium); 
    border-radius: 12px; 
    color: var(--text-primary); 
    font-family: 'Poppins', sans-serif; 
    font-size: 15px; 
    outline: none; 
    transition: all 0.3s ease; 
  }
  .form-input:focus, .form-textarea:focus, .form-select:focus { 
    border-color: var(--accent-green); 
    background: var(--bg-level1);
    box-shadow: 0 0 0 4px var(--accent-green-glow);
  }
  .form-textarea { min-height: 120px; resize: vertical; }
  
  .btn-submit { 
    padding: 14px 28px; 
    background: var(--accent-orange); 
    color: var(--text-inverse); 
    border: none; 
    border-radius: 12px; 
    font-family: 'Poppins', sans-serif; 
    font-weight: 800; 
    cursor: pointer; 
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
    box-shadow: 0 10px 20px var(--accent-orange-glow);
  }
  .btn-submit:hover { 
    background: var(--accent-green-hover); 
    transform: translateY(-3px) scale(1.02); 
    box-shadow: 0 15px 30px var(--accent-green-glow);
  }
  .btn-secondary { 
    padding: 14px 28px; 
    background: transparent; 
    color: var(--text-primary); 
    border: 1px solid var(--border-medium); 
    border-radius: 12px; 
    font-family: 'Poppins', sans-serif; 
    font-weight: 800; 
    cursor: pointer; 
    transition: all 0.3s ease; 
  }
  .btn-secondary:hover { 
    border-color: var(--accent-orange); 
    color: var(--accent-orange); 
    background: var(--bg-level2);
  }

  @media (max-width: 900px) {
    .ims-dash-page { padding: 40px 24px; }
    .dash-title { font-size: 42px; }
    .card-grid { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr !important; gap: 8px; }
    .data-card { padding: 24px 20px; }
    .ims-table { min-width: 600px; }
  }
`;

// ==========================================
// STUDENT DASHBOARD
// ==========================================
function StudentDashboard({ user }) {
    const [internship, setInternship] = useState(null);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const [dailyLogs, setDailyLogs] = useState([{
        date: new Date().toISOString().split('T')[0],
        activity: "",
        challenges: "",
        tools: "",
        image: null,
        imageUrl: ""
    }]);
    const [weeklyRecommendation, setWeeklyRecommendation] = useState("");
    const [week, setWeek] = useState(1);

    const fetchStudentData = React.useCallback(async () => {
        setLoading(true);
        // Fetch user's internship
        const { data: intData } = await supabase
            .from('internships')
            .select('*, companies(name), users!internships_supervisor_id_fkey(full_name)')
            .eq('student_id', user.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (intData) {
            setInternship(intData);
            // Fetch weekly reports
            const { data: repData } = await supabase
                .from('weekly_reports')
                .select('*')
                .eq('internship_id', intData.id)
                .order('week_number', { ascending: false });
            if (repData) setReports(repData);
        }
        setLoading(false);
    }, [user.id]);

    useEffect(() => { 
        const t = setTimeout(() => fetchStudentData(), 0); 
        return () => clearTimeout(t);
    }, [fetchStudentData]);

    const handleAddDay = () => {
        setDailyLogs([...dailyLogs, {
            date: new Date().toISOString().split('T')[0],
            activity: "",
            challenges: "",
            tools: "",
            image: null,
            imageUrl: ""
        }]);
    };

    const handleDailyChange = (index, field, value) => {
        const newLogs = [...dailyLogs];
        newLogs[index][field] = value;
        setDailyLogs(newLogs);
    };

    const handleDailyImageChange = (index, file) => {
        const newLogs = [...dailyLogs];
        newLogs[index].image = file;
        setDailyLogs(newLogs);
    };

    const submitReport = async (e) => {
        e.preventDefault();
        if (!internship) return;
        setLoading(true);

        // Upload images for each day that has one
        const processedLogs = [...dailyLogs];
        for (let i = 0; i < processedLogs.length; i++) {
            if (processedLogs[i].image) {
                try {
                    const file = processedLogs[i].image;
                    const fileExt = file.name.split('.').pop();
                    const fileName = `${user.id}-day-${i}-${Date.now()}.${fileExt}`;
                    const { error: uploadError } = await supabase.storage
                        .from('applications')
                        .upload(`daily/${fileName}`, file);

                    if (!uploadError) {
                        const { data } = supabase.storage.from('applications').getPublicUrl(`daily/${fileName}`);
                        processedLogs[i].imageUrl = data.publicUrl;
                    }
                } catch (err) {
                   console.error("Image upload failed for daily log", i, err);
                }
            }
        }

        const reportPayload = {
            internship_id: internship.id,
            student_id: user.id,
            week_number: week,
            report_text: JSON.stringify({
                daily_logs: processedLogs.map(l => {
                    const row = { ...l };
                    delete row.image;
                    return row;
                }),
                recommendation: weeklyRecommendation
            }),
            status: 'Submitted'
        };

        const { error } = await supabase.from('weekly_reports').insert([reportPayload]);

        if (!error) {
            alert("Comprehensive weekly report submitted successfully!");
            setDailyLogs([{
                date: new Date().toISOString().split('T')[0],
                activity: "",
                challenges: "",
                tools: "",
                image: null,
                imageUrl: ""
            }]);
            setWeeklyRecommendation("");
            setWeek(prev => prev + 1);
            fetchStudentData();
        } else {
            alert("Error submitting report: " + error.message);
        }
        setLoading(false);
    };

    if (loading) return (
        <div className="card-grid">
            <div className="data-card" style={{ opacity: 0.3, height: "200px", background: "rgba(255,255,255,0.05)" }} />
            <div className="data-card" style={{ opacity: 0.3, height: "200px", background: "rgba(255,255,255,0.05)" }} />
        </div>
    );

    // If student hasn't applied
    if (!internship) {
        return (
            <div className="card-grid">
                <div className="data-card">
                    <h3 className="data-title">You don't have an active internship yet.</h3>
                    <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "20px" }}>Head over to the application portal to register with a company or apply to a package.</p>
                    <IMSRegister user={user} onComplete={fetchStudentData} />
                </div>
            </div>
        );
    }

    if (internship && internship.status === 'Pending') {
        return (
            <div className="card-grid">
                <div className="data-card" style={{ textAlign: "center", padding: "80px 48px" }}>
                    <div style={{ fontSize: "72px", marginBottom: "24px" }}>⏳</div>
                    <h3 className="data-title" style={{ fontSize: "36px", color: "var(--accent-orange)" }}>Application Under Review</h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: "1.8", maxWidth: "600px", margin: "0 auto" }}>
                        Your application for <strong style={{ color: "#fff" }}>{internship.package_name || internship.title}</strong> is currently pending administrative approval.
                        <br /><br />
                        Once the admin reviews and approves your submission, your full student dashboard will instantly unlock right here, and you will be able to upload your daily activities and track your progress!
                    </p>
                </div>
            </div>
        );
    }

    const parseReport = (text) => {
        try {
            return JSON.parse(text);
        } catch {
            return { daily_logs: [{ activity: text }], recommendation: "" };
        }
    };

    return (
        <>
            <div className="card-grid">
                <div className="data-card">
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}>Current Internship</div>
                    <h2 className="data-title" style={{ fontSize: "28px", color: "#00c878" }}>{internship.package_name || internship.title}</h2>
                    
                    <div style={{ padding: "12px", background: "rgba(0, 200, 120, 0.1)", border: "1px dashed rgba(0, 200, 120, 0.4)", borderRadius: "8px", marginBottom: "20px" }}>
                        <div style={{ fontSize: "11px", color: "var(--accent-green)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: "700", marginBottom: "4px" }}>Student Registration Number</div>
                        <div style={{ fontSize: "13px", color: "#fff", wordBreak: "break-all" }}>{internship.registration_number}</div>
                    </div>

                    <div style={{ marginBottom: "12px" }}>
                        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>Company: </span>
                        <span style={{ fontWeight: "700" }}>{internship.companies?.name || "Pending Assignment"}</span>
                    </div>
                    <div style={{ marginBottom: "12px" }}>
                        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>Supervisor: </span>
                        <span style={{ fontWeight: "700" }}>{internship.users?.full_name || "Unassigned"}</span>
                    </div>
                    <div>
                        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>Status: </span>
                        <span className={`badge ${internship.status.toLowerCase()}`}>{internship.status}</span>
                    </div>
                </div>

                {!user.isViewer && (internship.status === 'Ongoing' || internship.status === 'Approved') && (
                    <div className="data-card" style={{ gridColumn: "span 2" }}>
                        <h3 className="data-title">Submit Daily Activity Log & Weekly Progress</h3>
                        <form onSubmit={submitReport}>
                            <div className="form-group" style={{ maxWidth: '200px' }}>
                                <label className="form-label">Week Number</label>
                                <input type="number" className="form-input" placeholder="Week #" value={week} onChange={e => setWeek(parseInt(e.target.value))} required min={1} />
                            </div>

                            {dailyLogs.map((log, idx) => (
                                <div key={idx} style={{ 
                                    background: 'rgba(255,255,255,0.03)', 
                                    padding: '24px', 
                                    borderRadius: '16px', 
                                    border: '1px solid var(--border-subtle)', 
                                    marginBottom: '32px',
                                    animation: 'slideIn 0.3s ease'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                        <h4 style={{ color: 'var(--accent-green)', fontSize: '14px', textTransform: 'uppercase', fontStyle: 'italic' }}>Day Log #{idx + 1}</h4>
                                        {dailyLogs.length > 1 && (
                                            <button type="button" onClick={() => setDailyLogs(dailyLogs.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', color: '#ff5050', cursor: 'pointer', fontSize: '12px' }}>Remove Day</button>
                                        )}
                                    </div>
                                    
                                    <div className="form-row" style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 2fr', gap: '16px', marginBottom: '20px' }}>
                                        <div className="form-group">
                                            <label className="form-label">Date</label>
                                            <input type="date" className="form-input" value={log.date} onChange={e => handleDailyChange(idx, 'date', e.target.value)} required />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Activity / Task Accomplished *</label>
                                            <input type="text" className="form-input" placeholder="What did you do today?" value={log.activity} onChange={e => handleDailyChange(idx, 'activity', e.target.value)} required />
                                        </div>
                                    </div>

                                    <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                                        <div className="form-group">
                                            <label className="form-label">Challenges Faced</label>
                                            <textarea className="form-textarea" style={{ minHeight: '80px' }} placeholder="Any blockers today?" value={log.challenges} onChange={e => handleDailyChange(idx, 'challenges', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Tools Used</label>
                                            <textarea className="form-textarea" style={{ minHeight: '80px' }} placeholder="e.g. VS Code, SQL Editor, Figma..." value={log.tools} onChange={e => handleDailyChange(idx, 'tools', e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Pictures Taken (Optional)</label>
                                        <input type="file" accept="image/*" className="form-input" onChange={e => handleDailyImageChange(idx, e.target.files[0])} />
                                        {log.image && <div style={{ fontSize: '11px', color: 'var(--accent-orange)', marginTop: '8px' }}>✓ Image selected: {log.image.name}</div>}
                                    </div>
                                </div>
                            ))}

                            <button type="button" className="btn-secondary" onClick={handleAddDay} style={{ marginBottom: '40px', width: '100%', borderStyle: 'dashed' }}>
                                + Add Daily Entry
                            </button>

                            <div className="form-group">
                                <label className="form-label" style={{ color: 'var(--accent-orange)' }}>Weekly Recommendation / Conclusion</label>
                                <textarea className="form-textarea" placeholder="How has the week moved on? Any final thoughts or recommendations?" value={weeklyRecommendation} onChange={e => setWeeklyRecommendation(e.target.value)} required />
                            </div>

                            <button type="submit" className="btn-submit" disabled={loading} style={{ width: '100%' }}>
                                {loading ? "Uploading Activity Data..." : "Submit Weekly Workspace Report"}
                            </button>
                        </form>
                    </div>
                )}
            </div>

            <h3 className="data-title" style={{ marginTop: "40px" }}>My Reports & Feedback</h3>
            <div className="ims-table-wrapper">
                <table className="ims-table">
                    <thead>
                        <tr><th>Week</th><th>Activity Summary</th><th>Recommendation</th><th>Supervisor Comment</th><th>Date</th></tr>
                    </thead>
                    <tbody>
                        {reports.map(r => {
                            const data = parseReport(r.report_text);
                            const dailyString = data.daily_logs?.map(l => l.activity).join(", ");
                            return (
                                <tr key={r.id}>
                                    <td style={{ fontWeight: "bold" }}>Week {r.week_number}</td>
                                    <td style={{ maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {dailyString || "No activities listed"}
                                    </td>
                                    <td style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {data.recommendation}
                                    </td>
                                    <td style={{ color: r.supervisor_comment ? "#00c878" : "rgba(255,255,255,0.4)" }}>
                                        {r.supervisor_comment || "Pending feedback..."}
                                    </td>
                                    <td style={{ color: "rgba(255,255,255,0.5)" }}>{new Date(r.created_at).toLocaleDateString()}</td>
                                </tr>
                            );
                        })}
                        {reports.length === 0 && <tr><td colSpan="5" style={{ textAlign: "center", color: "rgba(255,255,255,0.4)" }}>No reports submitted yet.</td></tr>}
                    </tbody>
                </table>
            </div>
        </>
    );
}

// ==========================================
// SUPERVISOR DASHBOARD
// ==========================================
function SupervisorDashboard({ user }) {
    const [interns, setInterns] = useState([]);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSupervisorData = React.useCallback(async () => {
        setLoading(true);
        // Fetch assigned interns
        const { data: indata } = await supabase
            .from('internships')
            .select('*, users!internships_student_id_fkey(full_name, email, phone)')
            .eq('supervisor_id', user.id);

        if (indata) {
            setInterns(indata);

            const ids = indata.map(i => i.id);
            if (ids.length > 0) {
                const { data: repData } = await supabase
                    .from('weekly_reports')
                    .select('*, users(full_name)')
                    .in('internship_id', ids)
                    .order('created_at', { ascending: false });
                if (repData) setReports(repData);
            }
        }
        setLoading(false);
    }, [user.id]);

    useEffect(() => { 
       const t = setTimeout(() => fetchSupervisorData(), 0); 
       return () => clearTimeout(t);
    }, [fetchSupervisorData]);

    const updateInternStatus = async (id, stat) => {
        await supabase.from('internships').update({ status: stat }).eq('id', id);
        fetchSupervisorData();
    };

    const provideFeedback = async (reportId) => {
        const comment = prompt("Enter your comment/feedback for this report:");
        if (!comment) return;
        await supabase.from('weekly_reports').update({ supervisor_comment: comment, status: 'Reviewed' }).eq('id', reportId);
        alert("Feedback saved!");
        fetchSupervisorData();
    };

    if (loading) return (
        <div className="card-grid">
            <div className="data-card" style={{ opacity: 0.3, height: "120px", background: "rgba(255,255,255,0.05)" }} />
            <div className="data-card" style={{ opacity: 0.3, height: "120px", background: "rgba(255,255,255,0.05)" }} />
        </div>
    );

    const parseReport = (text) => {
        try {
            return JSON.parse(text);
        } catch {
            return { daily_logs: [{ activity: text }], recommendation: "" };
        }
    };

    return (
        <>
            <div className="card-grid">
                <div className="data-card">
                    <div className="stat-label">Assigned Interns</div>
                    <div className="stat-val" style={{ fontSize: "36px", color: "#4a90e2", fontFamily: "'Poppins', sans-serif" }}>{interns.length}</div>
                </div>
                <div className="data-card">
                    <div className="stat-label">Pending Reports</div>
                    <div className="stat-val" style={{ fontSize: "36px", color: "#ffa500", fontFamily: "'Poppins', sans-serif" }}>
                        {reports.filter(r => !r.supervisor_comment).length}
                    </div>
                </div>
            </div>

            <h3 className="data-title">My Assigned Interns</h3>
            <div className="ims-table-wrapper">
                <table className="ims-table">
                    <thead><tr><th>Student Name</th><th>Program</th><th>Contact</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                        {interns.map(i => (
                            <tr key={i.id}>
                                <td style={{ fontWeight: "bold" }}>{i.users?.full_name}</td>
                                <td>{i.package_name || i.title}</td>
                                <td style={{ color: "rgba(255,255,255,0.6)" }}>{i.users?.email}<br />{i.users?.phone}</td>
                                <td><span className={`badge ${i.status.toLowerCase()}`}>{i.status}</span></td>
                                <td>
                                    {i.status === 'Approved' && <button className="action-btn blue" onClick={() => updateInternStatus(i.id, 'Ongoing')}>Start Internship</button>}
                                    {i.status === 'Ongoing' && <button className="action-btn green" onClick={() => updateInternStatus(i.id, 'Completed')}>Mark Completed</button>}
                                </td>
                            </tr>
                        ))}
                        {interns.length === 0 && <tr><td colSpan="5" style={{ textAlign: "center" }}>No students assigned yet.</td></tr>}
                    </tbody>
                </table>
            </div>

            <h3 className="data-title">Recent Weekly Reports</h3>
            <div className="ims-table-wrapper">
                <table className="ims-table">
                    <thead><tr><th>Student</th><th>Week</th><th>Daily Summary</th><th>Status</th><th>Action</th></tr></thead>
                    <tbody>
                        {reports.map(r => {
                            const data = parseReport(r.report_text);
                            const dailyString = data.daily_logs?.map(l => l.activity).join(", ");
                            return (
                                <tr key={r.id}>
                                    <td style={{ fontWeight: "bold" }}>{r.users?.full_name}</td>
                                    <td>Week {r.week_number}</td>
                                    <td style={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {dailyString || "No daily data"}
                                    </td>
                                    <td style={{ color: r.supervisor_comment ? "#00c878" : "#ffa500" }}>{r.supervisor_comment ? "Reviewed" : "Needs Review"}</td>
                                    <td>
                                        <button className="action-btn blue" onClick={() => provideFeedback(r.id)}>Review Details</button>
                                        <button 
                                            className="action-btn" 
                                            style={{ color: 'var(--accent-orange)' }}
                                            onClick={() => {
                                                const logDetails = data.daily_logs.map(l => 
                                                    `DATE: ${l.date}\nACTIVITY: ${l.activity}\nCHALLENGES: ${l.challenges}\nTOOLS: ${l.tools}\nIMAGE: ${l.imageUrl || 'None'}\n`
                                                ).join("\n---\n");
                                                alert(`FULL WEEKLY LOG:\n\n${logDetails}\n\nRECOMMENDATION:\n${data.recommendation}`);
                                            }}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        {reports.length === 0 && <tr><td colSpan="5" style={{ textAlign: "center" }}>No reports found.</td></tr>}
                    </tbody>
                </table>
            </div>
        </>
    );
}


// ==========================================
// CENTRAL HUB
// ==========================================
export default function IMSDashboard({ navigate }) {
    const { user } = useAuth();
    const queryParams = new URLSearchParams(window.location.search);
    const viewerStudentId = queryParams.get('student_id');

    // If a student_id is provided in the URL, we're in "Supervisor/Lecturer Viewer Mode"
    if (viewerStudentId) {
        return (
            <>
                <style>{dashStyles}</style>
                <div className="ims-dash-page">
                    <div className="dash-header" style={{ borderBottom: "1px solid var(--border-subtle)", paddingBottom: "20px" }}>
                        <div style={{ background: "rgba(0,120,255,0.1)", border: "1px solid rgba(0,120,255,0.2)", borderRadius: "8px", padding: "12px 18px", display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
                            <span style={{ fontSize: "24px" }}>👨‍🏫</span>
                            <div>
                                <div style={{ fontWeight: "800", color: "#4a90e2", fontSize: "14px" }}>Supervisor Viewer Mode</div>
                                <div style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "'Inter', sans-serif" }}>Viewing student progress as an authorized lecturer/supervisor.</div>
                            </div>
                            <button onClick={() => navigate("IMS")} style={{ marginLeft: "auto", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-medium)", color: "var(--text-primary)", padding: "8px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "11px", fontWeight: "700" }}>Exit Viewer</button>
                        </div>
                        <div className="dash-subtitle">Internship Intelligence</div>
                        <h1 className="dash-title">Student Workspace</h1>
                    </div>
                    {/* Render StudentDashboard for the ID (wrap it in a dummy user object) */}
                    <div className="viewer-mode-readonly">
                        <StudentDashboard user={{ id: viewerStudentId, isViewer: true }} />
                    </div>
                </div>
            </>
        );
    }

    if (!user) {
        return (
            <div style={{ height: "calc(100vh - 70px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--text)", fontFamily: "'Poppins', sans-serif" }}>
                <h1 style={{ fontSize: "48px", color: "#ffa500" }}>Authentication Required</h1>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px", color: "rgba(var(--text-rgb), 0.5)", marginBottom: "20px" }}>Please log in or use the Supervisor Access to view a student's workspace.</p>
                <button className="btn-primary" onClick={() => navigate("Login")} style={{ background: "#FF813E", padding: "12px 24px", color: "#ffffff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>Log In Now</button>
            </div>
        );
    }

    // Determine user role
    const role = (user.profile?.role === 'admin' || user.email === 'iamsifu.dev@gmail.com' || user.email === 'afriqtechnologies@gmail.com' || user.email === 'kuteesamoses@gmail.com') ? 'admin' : (user.profile?.role || "student");

    return (
        <>
            <style>{dashStyles}</style>
            <div className="ims-dash-page">
                <div className="dash-header">
                    <div className="dash-subtitle">IMS Control Panel</div>
                    <h1 className="dash-title">
                        {role === 'admin' ? "System Administrator" : role === 'supervisor' ? "Company Supervisor Portal" : "Student Workspace"}
                    </h1>
                </div>

                {role === 'admin' && (
                    <div className="card-grid">
                        <div className="data-card">
                            <h3 className="data-title">Admin Dashboard</h3>
                            <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "20px" }}>Please manage the IMS from the central Administrator Control Panel.</p>
                            <button className="btn-submit" onClick={() => navigate("Admin")}>Go to Admin Control Panel</button>
                        </div>
                    </div>
                )}

                {(role === 'supervisor') && <SupervisorDashboard user={user} />}
                {(role === 'student' || role === 'user') && <StudentDashboard user={user} />}

            </div>
        </>
    );
}
