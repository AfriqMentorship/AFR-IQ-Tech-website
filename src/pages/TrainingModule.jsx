import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayCircle, ChevronLeft, ChevronRight, CheckCircle, FileText, Download, Trophy, MessageCircle } from 'lucide-react'

const TrainingModule = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const modules = [
    { title: 'The Basics of Product Sourcing', type: 'Video', duration: '12:45', content: 'In this video, we will explore the different ways to source products for your online store, including private labeling, wholesale, and dropshipping.' },
    { title: 'Choosing Your Niche', type: 'Reading', duration: '8 min', content: 'Finding a profitable niche is the foundation of any successful e-commerce business. Follow this guide to research market demand and competition.' },
    { title: 'Hands-on Exercise: Market Research', type: 'Exercise', duration: '20 min', content: 'Use the provided tools to research three potential niches and analyze their viability using the criteria we discussed.' },
    { title: 'Final Assessment', type: 'Quiz', duration: '15 min', content: 'Test your understanding of the concepts covered in this module to earn your certificate.' },
  ];

  const handleNext = () => {
    if (activeModule < modules.length - 1) {
      setActiveModule(activeModule + 1);
    } else {
      navigate(`/quiz/${courseId}`);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 350px) 1fr', minHeight: 'calc(100vh - 70px)' }}>
      {/* Sidebar Navigation */}
      <aside className="glass" style={{ borderRight: '1px solid var(--glass-border)', padding: '2rem 0' }}>
        <div style={{ padding: '0 2rem 2rem 2rem' }}>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
             <ChevronLeft size={16} /> Back to Dashboard
          </Link>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>E-Commerce Basics</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
             <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>
                <div style={{ width: `${(activeModule / modules.length) * 100}%`, height: '100%', background: 'var(--accent-gradient)' }}></div>
             </div>
             <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{Math.round((activeModule / modules.length) * 100)}%</span>
          </div>
        </div>

        <nav>
           {modules.map((m, i) => (
             <div 
               key={i} 
               onClick={() => setActiveModule(i)}
               style={{
                 padding: '1.25rem 2rem',
                 display: 'flex',
                 alignItems: 'center',
                 gap: '1rem',
                 cursor: 'pointer',
                 background: activeModule === i ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                 borderLeft: `4px solid ${activeModule === i ? 'var(--accent-main)' : 'transparent'}`,
                 transition: 'all 0.2s ease',
                 color: activeModule === i ? 'var(--text-primary)' : 'var(--text-secondary)'
               }}
             >
               {activeModule > i ? <CheckCircle size={18} color="#10b981" /> : (m.type === 'Video' ? <PlayCircle size={18} /> : <FileText size={18} />)}
               <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: activeModule === i ? 700 : 500 }}>{m.title}</h4>
                  <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>{m.type} • {m.duration}</span>
               </div>
             </div>
           ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main style={{ padding: '3rem 4rem', overflowY: 'auto', background: 'var(--secondary-bg)' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            {!showCertificate ? (
              <motion.div 
                key={activeModule}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                   <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-main)', fontWeight: 700, fontSize: '0.9rem' }}>{modules[activeModule].type}</span>
                   <div style={{ display: 'flex', gap: '1rem' }}>
                      <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}><MessageCircle size={18} /> Ask AI</button>
                      <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}><FileText size={18} /> Notes</button>
                   </div>
                </div>

                <h1 style={{ fontSize: '3rem', marginBottom: '2.5rem' }}>{modules[activeModule].title}</h1>
                
                <div className="glass" style={{ 
                  width: '100%', 
                  height: '450px', 
                  borderRadius: 'var(--radius-lg)', 
                  marginBottom: '3rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: modules[activeModule].type === 'Video' ? '#000' : 'rgba(255,255,255,0.02)'
                }}>
                  {modules[activeModule].type === 'Video' ? (
                    <PlayCircle size={80} style={{ color: 'white', opacity: 0.5 }} />
                  ) : (
                    <div style={{ padding: '3rem', textAlign: 'center' }}>
                       <FileText size={64} style={{ opacity: 0.1, marginBottom: '1.5rem' }} />
                       <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px' }}>{modules[activeModule].content}</p>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4rem' }}>
                   <button 
                     disabled={activeModule === 0}
                     onClick={() => setActiveModule(activeModule - 1)}
                     className="btn-secondary" style={{ padding: '0.75rem 2rem' }}
                   >
                     <ChevronLeft size={20} /> Previous
                   </button>
                   <button 
                     onClick={handleNext}
                     className="btn-primary" style={{ padding: '0.75rem 2.5rem' }}
                   >
                     {activeModule === modules.length - 1 ? 'Finish & Get Certificate' : 'Complete & Continue'} <ChevronRight size={20} />
                   </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '4rem 0' }}
              >
                 <div style={{ 
                   width: '120px', 
                   height: '120px', 
                   background: 'var(--accent-gradient)', 
                   borderRadius: '50%', 
                   display: 'flex', 
                   alignItems: 'center', 
                   justifyContent: 'center',
                   margin: '0 auto 3rem auto',
                   boxShadow: '0 0 50px rgba(99, 102, 241, 0.4)'
                 }}>
                   <Trophy size={60} color="white" />
                 </div>
                 <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>Congratulations!</h1>
                 <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '4rem' }}>You have successfully completed the course <br /> <strong>Introduction to E-commerce</strong>.</p>
                 
                 <div className="glass" style={{ padding: '4rem', borderRadius: 'var(--radius-xl)', maxWidth: '700px', margin: '0 auto 4rem auto', border: '2px solid var(--accent-main)' }}>
                    <GraduationCap size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                    <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Certificate of Completion</h3>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>This is to certify that you have mastered the foundational concepts of modern e-commerce.</p>
                    <div style={{ marginTop: '3rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                       <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>ID: TRAIN-HQ-77X-2026</span>
                       <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Date: {new Date().toLocaleDateString()}</span>
                    </div>
                 </div>

                 <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                   <button className="btn-primary" style={{ padding: '1rem 2.5rem' }}>
                      <Download size={20} /> Download PDF
                   </button>
                   <Link to="/dashboard" className="btn-secondary" style={{ padding: '1rem 2.5rem' }}>
                      Return to Dashboard
                   </Link>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

export default TrainingModule
