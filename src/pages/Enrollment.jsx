import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, CreditCard, ChevronRight, CheckCircle2, Lock, Zap } from 'lucide-react'

const Enrollment = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Example data
  const course = { 
    id: courseId, 
    title: courseId === '1' ? 'Introduction to E-commerce' : 'Professional Online Store',
    price: courseId === '1' ? 'Free' : '$49',
    isFree: courseId === '1'
  };

  const handleEnroll = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="container fade-in" style={{ padding: '6rem 2rem', maxWidth: '800px' }}>
      <div className="glass" style={{ padding: '4rem', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          background: 'var(--accent-gradient)', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          margin: '0 auto 2rem auto'
        }}>
          <ShieldCheck size={40} color="white" />
        </div>

        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Secure <span className="gradient-text">Enrollment</span></h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem' }}>
          You are about to join <strong>{course.title}</strong>. This course includes lifetime access and a professional certificate.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem', textAlign: 'left' }}>
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
             <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={20} color="var(--accent-main)" /> Features
             </h3>
             <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#10b981" /> HD Video Lessons</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#10b981" /> Practical Exercises</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#10b981" /> Downloadable Assets</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#10b981" /> Q&A with Instructor</li>
             </ul>
          </div>
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--accent-main)' }}>
             <h3 style={{ marginBottom: '1rem' }}>Order Summary</h3>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Course Fee</span>
                <span style={{ fontWeight: 700 }}>{course.price}</span>
             </div>
             <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem', marginTop: '1rem' }}>
                <span style={{ fontWeight: 700 }}>Total Due</span>
                <span style={{ fontWeight: 800, fontSize: '1.5rem' }} className="gradient-text">{course.isFree ? '$0.00' : course.price}</span>
             </div>
          </div>
        </div>

        {!course.isFree && (
          <div style={{ marginBottom: '3rem', textAlign: 'left' }}>
             <h3 style={{ marginBottom: '1.5rem' }}>Payment Method</h3>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <div className="glass" style={{ padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', cursor: 'pointer', border: '1px solid var(--accent-main)' }}>
                   <CreditCard size={24} style={{ marginBottom: '0.5rem' }} /> <br /> <span style={{ fontSize: '0.8rem' }}>Credit Card</span>
                </div>
                <div className="glass" style={{ padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', cursor: 'pointer' }}>
                   <Lock size={24} style={{ marginBottom: '0.5rem' }} /> <br /> <span style={{ fontSize: '0.8rem' }}>PayPal</span>
                </div>
                <div className="glass" style={{ padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', cursor: 'pointer' }}>
                   <Zap size={24} style={{ marginBottom: '0.5rem' }} /> <br /> <span style={{ fontSize: '0.8rem' }}>Crypto</span>
                </div>
             </div>
          </div>
        )}

        <button 
          onClick={handleEnroll} 
          disabled={loading}
          className="btn-primary" 
          style={{ width: '100%', justifyContent: 'center', padding: '1.5rem', fontSize: '1.25rem' }}
        >
          {loading ? 'Processing...' : (course.isFree ? 'Enroll Now (Free)' : 'Confirm Enrollment')} <ChevronRight size={24} />
        </button>
        <p style={{ marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          By clicking the button above, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}

export default Enrollment
