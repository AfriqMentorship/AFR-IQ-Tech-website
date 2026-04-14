import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, ShoppingCart, GraduationCap, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

const courses = [
  { id: 1, title: 'Introduction to E-commerce', description: 'Start your journey with foundational e-commerce principles.', price: 'Free' },
  { id: 2, title: 'Professional Online Store', description: 'Master the tools to build a robust storefront from scratch.', price: '$49' },
  { id: 3, title: 'Marketing and Customer Acquisition', description: 'Grow your business with proven modern marketing strategies.', price: '$39' },
  { id: 4, title: 'Website Creation 101', description: 'A complete guide to building high-performance websites.', price: 'Free' },
];

const Home = () => {
  return (
    <div className="home-page fade-in">
      {/* Hero Section */}
      <section style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 60%)',
        padding: '4rem 0'
      }}>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <h1 style={{
            fontSize: '4.5rem',
            marginBottom: '1.5rem',
            lineHeight: '1.1',
            maxWidth: '1000px'
          }}>
            Unlock Your <span className="gradient-text">E-Commerce Potential</span> With Expert Training
          </h1>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.25rem',
            maxWidth: '700px',
            margin: '0 auto 3rem auto'
          }}>
            Master the art of building and growing a professional online business. Simple, effective, and results-driven training modules for the next generation of digital entrepreneurs.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link to="/courses" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Explore Course Catalog <ArrowRight size={20} />
            </Link>
            <Link to="/register" className="btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Get Started Free
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features/Description Section */}
      <section className="container" style={{ padding: '6rem 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
          {[
            { icon: <Zap size={32} color="var(--accent-main)" />, title: 'Micro-Learning', text: 'Digestible modules designed for fast-paced learning and retention.' },
            { icon: <CheckCircle2 size={32} color="#10b981" />, title: 'Practical Exercises', text: 'Real-world projects that translate theory into tangible results.' },
            { icon: <GraduationCap size={32} color="var(--accent-secondary)" />, title: 'Certified Success', text: 'Earn certificates validated by industry leaders upon completion.' }
          ].map((f, i) => (
            <motion.div key={i} className="glass-card" initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}>
              {f.icon}
              <h3 style={{ margin: '1.5rem 0 1rem 0', fontSize: '1.5rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{f.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Course Preview */}
      <section className="container" style={{ padding: '4rem 0 8rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <h2 style={{ fontSize: '3rem' }}>Preview Our <span className="gradient-text">Top Courses</span></h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Get a sneak peek into what you'll be learning at Train·HQ.</p>
          </div>
          <Link to="/courses" style={{ fontWeight: 600, color: 'var(--accent-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            View Full Catalog <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid-courses">
          {courses.map((course, i) => (
            <motion.div key={i} className="glass-card" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
              <div style={{
                height: '180px',
                background: 'var(--secondary-bg)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <GraduationCap size={48} style={{ opacity: 0.2 }} />
              </div>
              <h3 style={{ marginBottom: '0.75rem' }}>{course.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', minHeight: '3rem' }}>{course.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: '1.25rem' }}>{course.price}</span>
                <Link to={`/course/${course.id}`} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                  Learn More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
