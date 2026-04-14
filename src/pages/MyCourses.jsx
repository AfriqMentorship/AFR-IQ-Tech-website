import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Play, Clock, BookCheck, TrendingUp, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const MyCourses = () => {
  const courses = [
    { 
       id: 1, 
       title: 'Introduction to E-commerce', 
       progress: 100, 
       modules: 6, 
       completed: 6, 
       lastAccessed: 'Finished' 
    },
    { 
       id: 2, 
       title: 'Creating a Professional Online Store', 
       progress: 30, 
       modules: 8, 
       completed: 2, 
       lastAccessed: '2 hours ago' 
    },
  ];

  return (
    <div className="container fade-in" style={{ padding: '4rem 2rem' }}>
      <header style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '3.5rem' }}>My <span className="gradient-text">Courses</span></h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '0.5rem' }}>
            Continue your training and master new modules.
          </p>
        </div>
        <div style={{ padding: '1rem 2rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-lg)', display: 'flex', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
               <h4 style={{ fontSize: '1.5rem', margin: 0 }}>2</h4>
               <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ENROLLED</p>
            </div>
            <div style={{ textAlign: 'center' }}>
               <h4 style={{ fontSize: '1.5rem', margin: 0 }}>1</h4>
               <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>COMPLETED</p>
            </div>
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {courses.map((course, i) => (
          <motion.div 
            key={course.id} 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: i * 0.1 }}
            className="glass"
            style={{ 
              padding: '2.5rem', 
              borderRadius: 'var(--radius-xl)', 
              display: 'grid', 
              gridTemplateColumns: 'minmax(100px, 150px) 1fr minmax(200px, 300px)', 
              gap: '3rem',
              alignItems: 'center',
              borderLeft: i === 0 ? '4px solid #10b981' : '4px solid var(--accent-main)'
            }}
          >
            {/* Left: Icon/Thumb */}
            <div style={{ 
              height: '100px', 
              background: 'var(--secondary-bg)', 
              borderRadius: 'var(--radius-md)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              {course.progress === 100 ? <BookCheck size={40} color="#10b981" /> : <TrendingUp size={40} color="var(--accent-main)" />}
            </div>

            {/* Center: Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                 <h2 style={{ fontSize: '1.75rem' }}>{course.title}</h2>
                 {course.progress === 100 && <span style={{ padding: '0.25rem 0.75rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>CERTIFIED</span>}
              </div>
              <div style={{ display: 'flex', gap: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><GraduationCap size={16} /> {course.modules} Modules</div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16} /> Last Session: {course.lastAccessed}</div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                 <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                    <div style={{ width: `${course.progress}%`, height: '100%', background: 'var(--accent-gradient)' }}></div>
                 </div>
                 <span style={{ fontWeight: 700 }}>{course.progress}%</span>
              </div>
            </div>

            {/* Right: Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               <Link 
                 to={`/learn/${course.id}`} 
                 className="btn-primary" 
                 style={{ justifyContent: 'center', padding: '1rem' }}
               >
                 <Play size={18} fill="currentColor" /> {course.progress === 100 ? 'Review Modules' : 'Resume Training'}
               </Link>
               {course.progress === 100 && (
                 <button className="btn-secondary" style={{ justifyContent: 'center' }}>
                    Download Certificate
                 </button>
               )}
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: '5rem', textAlign: 'center' }}>
         <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>Want to learn more?</h3>
         <Link to="/courses" className="btn-secondary" style={{ padding: '1rem 3rem' }}>
            Explore Full Catalog <ChevronRight size={20} />
         </Link>
      </div>
    </div>
  )
}

export default MyCourses
