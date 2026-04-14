import React from 'react'
import { motion } from 'framer-motion'
import { Users, BookOpen, BarChart3, Settings, Shield, Plus, MessageCircle, MoreVertical } from 'lucide-react'

const AdminPanel = () => {
  const stats = [
    { label: 'Active Students', value: '1,284', icon: <Users size={20} color="var(--accent-main)" />, change: '+12% this month' },
    { label: 'Courses Published', value: '42', icon: <BookOpen size={20} color="var(--accent-secondary)" />, change: '+3 new this week' },
    { label: 'Total Revenue', value: '$24,850', icon: <BarChart3 size={20} color="#10b981" />, change: '+8% vs last month' },
  ];

  const recentUsers = [
    { name: 'Alice Johnson', email: 'alice@example.com', status: 'Enrolled', course: 'Professional Online Store' },
    { name: 'Bob Smith', email: 'bob@example.com', status: 'Completed', course: 'Website Creation 101' },
    { name: 'Charlie Davis', email: 'charlie@example.com', status: 'In-progress', course: 'Dropshipping Strategies' },
  ];

  return (
    <div className="container fade-in" style={{ padding: '3rem 2rem' }}>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '3rem' }}>Admin <span className="gradient-text">Commands</span></h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Manage your courses, users, and platform settings.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
           <button className="btn-secondary" style={{ padding: '0.75rem 1rem' }}><Settings size={20} /> Settings</button>
           <button className="btn-primary" style={{ padding: '0.75rem 1.5rem' }}><Plus size={20} /> New Course</button>
        </div>
      </header>

      {/* Admin Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
        {stats.map((s, i) => (
          <div key={i} className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
               <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)' }}>{s.icon}</div>
               <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>{s.change}</span>
             </div>
             <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{s.label}</p>
             <h3 style={{ fontSize: '2rem' }}>{s.value}</h3>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
         {/* User Management */}
         <div className="glass" style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
            <div style={{ padding: '2rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <h3 style={{ fontSize: '1.5rem' }}>Recent <span className="gradient-text">Activity</span></h3>
               <button style={{ color: 'var(--accent-main)', background: 'transparent', fontWeight: 600 }}>View All</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  <th style={{ padding: '1.5rem 2rem' }}>NAME</th>
                  <th style={{ padding: '1.5rem' }}>STATUS</th>
                  <th style={{ padding: '1.5rem' }}>COURSE</th>
                  <th style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((u, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--glass-border)', fontSize: '0.95rem' }}>
                    <td style={{ padding: '1.5rem 2rem' }}>
                       <div style={{ fontWeight: 600 }}>{u.name}</div>
                       <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{u.email}</div>
                    </td>
                    <td style={{ padding: '1.5rem' }}>
                       <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, background: u.status === 'Completed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(99, 102, 241, 0.1)', color: u.status === 'Completed' ? '#10b981' : 'var(--accent-main)' }}>
                         {u.status.toUpperCase()}
                       </span>
                    </td>
                    <td style={{ padding: '1.5rem', opacity: 0.8 }}>{u.course}</td>
                    <td style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>
                       <button style={{ background: 'transparent', color: 'var(--text-muted)' }}><MoreVertical size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>

         {/* Admin Quick Options */}
         <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
               <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Shield size={18} /> Safety Controls</h4>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <button className="btn-secondary" style={{ padding: '0.75rem 1rem', justifyContent: 'flex-start' }}>Moderate Comments</button>
                  <button className="btn-secondary" style={{ padding: '0.75rem 1rem', justifyContent: 'flex-start', color: 'var(--error)' }}>Report Abuse Logs</button>
               </div>
            </div>
            <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
               <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MessageCircle size={18} /> Support Overview</h4>
               <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>You have <strong>4</strong> unassigned support tickets from students.</p>
               <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Open Support Hub</button>
            </div>
         </div>
      </div>
    </div>
  )
}

export default AdminPanel
