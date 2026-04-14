import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, User, MessageCircle, Info, ChevronLeft, MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'

const Chat = () => {
  const [messages, setMessages] = useState([
    { role: 'support', text: 'Hello! I am your lead instructor. How can I help you today with your e-commerce project?', time: '10:30 AM' },
    { role: 'user', text: 'Hi, I am having some trouble understanding the drop-shipping model vs private labeling.', time: '10:32 AM' },
    { role: 'support', text: 'That is a great question. In drop-shipping, you do not hold inventory. In private labeling, you own the brand and stock. Would you like a detailed comparison?', time: '10:33 AM' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages([...messages, { role: 'user', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInput('');
    
    // Simulate support reply
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'support', 
        text: "Understood. I've sent some resources to your email. I'll also be available for a live session tomorrow at 3 PM if you'd like to dive deeper.", 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    }, 1500);
  };

  return (
    <div className="container" style={{ padding: '3rem 2rem', minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
           <Link to="/dashboard" style={{ color: 'var(--text-muted)' }}><ChevronLeft size={24} /></Link>
           <div>
              <h1 style={{ fontSize: '2rem' }}>Live <span className="gradient-text">Support</span></h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#10b981' }}>
                 <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }}></div> Premium Support Active
              </div>
           </div>
        </div>
        <button className="btn-secondary" style={{ padding: '0.75rem' }}><MoreHorizontal size={20} /></button>
      </header>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem' }}>
         {/* Chat Area */}
         <div className="glass" style={{ borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Messages Area */}
            <div style={{ flex: 1, padding: '2.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               {messages.map((m, i) => (
                 <motion.div 
                   key={i} 
                   initial={{ opacity: 0, scale: 0.95, y: 10 }} 
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   style={{
                     alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                     maxWidth: '70%',
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: m.role === 'user' ? 'flex-end' : 'flex-start',
                   }}
                 >
                    <div style={{
                      padding: '1rem 1.5rem',
                      borderRadius: m.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                      background: m.role === 'user' ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.05)',
                      color: 'white',
                      fontSize: '1rem',
                      lineHeight: '1.5',
                      boxShadow: m.role === 'user' ? '0 10px 25px rgba(99, 102, 241, 0.2)' : 'none'
                    }}>
                       {m.text}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>{m.time}</span>
                 </motion.div>
               ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} style={{ padding: '2rem', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '1rem' }}>
               <input 
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 placeholder="Type your message..." 
                 style={{
                   flex: 1,
                   padding: '1rem 1.5rem',
                   background: 'rgba(255,255,255,0.05)',
                   border: '1px solid var(--glass-border)',
                   borderRadius: 'var(--radius-md)',
                   color: 'white',
                   outline: 'none'
                 }}
               />
               <button type="submit" className="btn-primary" style={{ padding: '1rem 2rem' }}>
                  <Send size={20} />
               </button>
            </form>
         </div>

         {/* Sidebar Area */}
         <aside>
            <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }}>
               <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Your <span className="gradient-text">Instructor</span></h3>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                 <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={30} />
                 </div>
                 <div>
                    <h4 style={{ fontSize: '1.1rem' }}>Mark Thompson</h4>
                    <p style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 600 }}>Available Now</p>
                 </div>
               </div>
               <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Mark has over 10 years of experience in e-commerce and has built multiple 7-figure online stores. 
               </p>
            </div>

            <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
               <Info size={24} color="var(--accent-main)" />
               <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Support Hours</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Mon - Fri: 9:00 AM - 6:00 PM <br /> Weekend: Emergency only</p>
               </div>
            </div>
         </aside>
      </div>
    </div>
  )
}

export default Chat
