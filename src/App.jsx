import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Pages (to be implemented)
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CourseCatalog from './pages/CourseCatalog'
import CourseDetail from './pages/CourseDetail'
import TrainingModule from './pages/TrainingModule'
import AdminPanel from './pages/AdminPanel'
import Chat from './pages/Chat'
import Enrollment from './pages/Enrollment'
import Quiz from './pages/Quiz'
import MyCourses from './pages/MyCourses'

// Components
import Navbar from './components/Navbar'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Protected Route component (logic simplified for now)
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} />
        
        <main className="main-content">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
              <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard user={user} />
                </ProtectedRoute>
              } />
              
              <Route path="/courses" element={<CourseCatalog />} />
              <Route path="/my-courses" element={
                <ProtectedRoute>
                  <MyCourses />
                </ProtectedRoute>
              } />
              <Route path="/course/:id" element={<CourseDetail />} />
              <Route path="/enroll/:courseId" element={
                <ProtectedRoute>
                  <Enrollment />
                </ProtectedRoute>
              } />
              
              <Route path="/learn/:courseId" element={
                <ProtectedRoute>
                  <TrainingModule />
                </ProtectedRoute>
              } />

              <Route path="/quiz/:courseId" element={
                <ProtectedRoute>
                  <Quiz />
                </ProtectedRoute>
              } />
              
              <Route path="/chat" element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              } />

              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              } />

            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  )
}

export default App
