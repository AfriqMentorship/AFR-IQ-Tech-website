import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, BookCheck, TrendingUp, Search, User, Play, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

const Dashboard = ({ user }) => {
  const stats = [
    { label: 'Courses Enrolled', value: '2', icon: <BookOpen size={24} color="var(--accent-main)" /> },
    { label: 'Completed', value: '1', icon: <BookCheck size={24} color="#10b981" /> },
    { label: 'Overall Progress', value: '65%', icon: <TrendingUp size={24} color="var(--accent-secondary)" /> },
  ];

  const currentCourses = [
    { id: 1, title: 'Introduction to E-commerce', progress: 100, lastAccessed: '2 days ago' },
    { id: 2, title: 'Professional Online Store', progress: 30, lastAccessed: 'Today' },
  ];

  return (
    <div className="container fade-in" style={{ padding: '3rem 2rem' }}>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '3rem' }}>Hello, <span className="gradient-text">{user?.name || 'Explorer'}</span>!</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>You're making great progress. Keep it up!</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/courses" className="btn-primary">
            <Search size={18} /> Browse Catalog
          </Link>
          <Link to="/chat" className="btn-secondary">
            Support Chat
          </Link>
        </div>
      </header>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
        {stats.map((s, i) => (
          <div key={i} className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)' }}>{s.icon}</div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{s.label}</p>
              <h3 style={{ fontSize: '1.75rem' }}>{s.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
        {/* Enrolled Courses */}
        <div>
          <h2 style={{ marginBottom: '2rem', fontSize: '1.75rem' }}>Continue <span className="gradient-text">Learning</span></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {currentCourses.map((course) => (
              <div key={course.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>{course.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ flex: 1, maxWidth: '300px', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${course.progress}%`, height: '100%', background: 'var(--accent-gradient)' }}></div>
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{course.progress}%</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '1rem' }}>
                    <Clock size={14} /> Last accessed {course.lastAccessed}
                  </div>
                </div>
                <Link to={`/learn/${course.id}`} className="btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
                  <Play size={18} fill="currentColor" /> Resume
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Profile/Sidebar Info */}
        <div>
          <h2 style={{ marginBottom: '2rem', fontSize: '1.75rem' }}>Quick <span className="gradient-text">Actions</span></h2>
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={30} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.25rem' }}>{user?.name || 'Guest'}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{user?.email || 'guest@example.com'}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button className="btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }}>Edit Profile</button>
              <button className="btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }}>Billing & Subscriptions</button>
              <button className="btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }}>Learning Settings</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
