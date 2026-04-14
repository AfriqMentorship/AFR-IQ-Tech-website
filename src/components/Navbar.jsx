import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, GraduationCap, LogIn, LogOut, User as UserIcon, MessageCircle } from 'lucide-react'

const Navbar = ({ isLoggedIn, setIsLoggedIn, user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid var(--glass-border)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
      }}>
        <Link to="/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem',
          fontSize: '1.5rem',
          fontWeight: '800',
          fontFamily: 'var(--font-display)' 
        }} className="gradient-text">
          <GraduationCap size={32} />
          <span>TRAIN·HQ</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/" style={{ fontWeight: 500 }}>Home</Link>
          <Link to="/courses" style={{ fontWeight: 500 }}>Courses</Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <LayoutDashboard size={20} /> Dashboard
              </Link>
              <Link to="/chat" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageCircle size={20} /> Support
              </Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem' }}>
                <div style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  background: 'var(--accent-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <UserIcon size={18} />
                </div>
                <button onClick={handleLogout} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/login" className="btn-secondary" style={{ padding: '0.5rem 1.25rem' }}>
                <LogIn size={18} /> Login
              </Link>
              <Link to="/register" className="btn-primary" style={{ padding: '0.5rem 1.25rem' }}>
                Join Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
