import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, ArrowRight, Star, Clock, Filter, Search, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

const courses = [
  { id: 1, title: 'Introduction to E-commerce', description: 'Start your journey with foundational e-commerce principles.', price: 'Free', rating: 4.8, reviews: 124, duration: '2h 15m' },
  { id: 2, title: 'Creating a Professional Online Store', description: 'Master the tools to build a robust storefront from scratch.', price: '$49', rating: 4.9, reviews: 85, duration: '5h 30m' },
  { id: 3, title: 'Marketing and Customer Acquisition', description: 'Grow your business with proven modern marketing strategies.', price: '$39', rating: 4.7, reviews: 56, duration: '4h 45m' },
  { id: 4, title: 'Website Creation', description: 'A complete guide to building high-performance websites.', price: 'Free', rating: 4.9, reviews: 210, duration: '3h 10m' },
];

const CourseCatalog = () => {
  return (
    <div className="container fade-in" style={{ padding: '4rem 2rem' }}>
      <header style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '3.5rem' }}>Course <span className="gradient-text">Catalog</span></h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '0.5rem' }}>
            Choose from a variety of expert-led courses designed for your success.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
             <Search size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-muted)' }} />
             <input 
               placeholder="Search courses..." 
               style={{ padding: '0.75rem 1rem 0.75rem 3rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', color: 'white', width: '300px' }}
             />
          </div>
          <button className="btn-secondary" style={{ padding: '0.75rem 1rem' }}>
            <Filter size={20} /> Filter
          </button>
        </div>
      </header>

      <div className="grid-courses">
        {courses.map((course, i) => (
          <motion.div 
            key={course.id} 
            className="glass-card" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -8 }}
          >
            <div style={{
              height: '200px',
              background: 'var(--secondary-bg)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', padding: '0.25rem 0.75rem', background: 'var(--accent-gradient)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', fontWeight: 700 }}>
                 {course.price === 'Free' ? 'FREE' : 'PRO'}
              </div>
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraduationCap size={64} style={{ opacity: 0.1 }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', color: 'var(--warning)' }}><Star size={16} fill="currentColor" /></div>
              <span style={{ fontWeight: 600 }}>{course.rating}</span>
              <span style={{ color: 'var(--text-muted)' }}>({course.reviews} reviews)</span>
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', minHeight: '3.5rem' }}>{course.title}</h3>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={16} /> {course.duration}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><BookOpen size={16} /> {course.id + 4} modules</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>{course.price}</span>
              <Link to={`/course/${course.id}`} className="btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
                Enroll Now <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default CourseCatalog
