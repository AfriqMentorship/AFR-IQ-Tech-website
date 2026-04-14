import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, PlayCircle, Clock, GraduationCap, CheckCircle, ShieldCheck, Star } from 'lucide-react'

const courses = [
  { id: 1, title: 'Introduction to E-commerce', description: 'Start your journey with foundational e-commerce principles.', longDescription: 'This comprehensive course covers all the basics of setting up and managing an online store, understanding consumer behavior, and selecting the right platform for your business needs.', price: 'Free', rating: 4.8, reviews: 124, duration: '2h 15m' },
  { id: 2, title: 'Professional Online Store', description: 'Master the tools to build a robust storefront from scratch.', price: '$49', rating: 4.9, reviews: 85, duration: '5h 30m' },
];

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find(c => c.id === parseInt(id)) || courses[0];

  const syllabus = [
    { title: 'Module 1: Getting Started', duration: '30m', description: 'Introduction to digital commerce and market trends.' },
    { title: 'Module 2: Platform Selection', duration: '45m', description: 'Comparing Shopify, WooCommerce, and custom solutions.' },
    { title: 'Module 3: Product Sourcing', duration: '1h 00m', description: 'Finding the right suppliers and managing inventory.' },
    { title: 'Module 4: Launch Strategy', duration: '1h 15m', description: 'Your first 24 hours online and marketing setup.' },
  ];

  return (
    <div className="container fade-in" style={{ padding: '4rem 2rem' }}>
      <header style={{ marginBottom: '3rem', display: 'flex', gap: '1rem', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
         <Link to="/courses" style={{ color: 'var(--text-muted)' }}>Courses</Link>
         <ChevronRight size={14} />
         <span style={{ color: 'var(--text-primary)' }}>{course.title}</span>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '5rem' }}>
        {/* Left Column: Content */}
        <div>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.1' }}>{course.title}</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>{course.longDescription}</p>
          
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '4rem', padding: '2rem', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)' }}>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
               <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Duration</span>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: 600 }}><Clock size={16} color="var(--accent-main)" /> {course.duration}</div>
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
               <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Level</span>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: 600 }}><GraduationCap size={16} color="var(--accent-secondary)" /> Beginner</div>
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
               <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Certificate</span>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: 600 }}><ShieldCheck size={16} color="#10b981" /> Professional</div>
             </div>
          </div>

          <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>What You'll <span className="gradient-text">Learn</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '4rem' }}>
            {['Expertise in online platforms', 'Marketing funnels mastery', 'Supply chain management', 'Customer service optimization', 'Conversion rate optimization'].map((item, i) => (
               <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.1rem' }}>
                  <CheckCircle size={20} color="#10b981" /> {item}
               </div>
            ))}
          </div>

          <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Course <span className="gradient-text">Syllabus</span></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {syllabus.map((m, i) => (
              <div key={i} className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-muted)', opacity: 0.3 }}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{m.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{m.description}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}><Clock size={16} /> {m.duration}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Card */}
        <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
          <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--glass-border)' }}>
             <div style={{ 
               height: '240px', 
               background: 'var(--secondary-bg)', 
               borderRadius: 'var(--radius-lg)', 
               marginBottom: '2rem',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center'
             }}>
               <PlayCircle size={64} style={{ opacity: 0.3 }} />
             </div>

             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
               <h3 style={{ fontSize: '2.5rem' }}>{course.price}</h3>
               {course.price !== 'Free' && (
                 <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through' }}>$129</span>
               )}
             </div>

             <Link to={`/enroll/${course.id}`} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1.25rem', fontSize: '1.2rem', marginBottom: '1.5rem' }}>
               Enroll Now
             </Link>
             
             <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '1.25rem' }}>
               Add to Wishlist
             </button>

             <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2rem' }}>
               30-Day Money-Back Guarantee • Lifetime Access
             </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
