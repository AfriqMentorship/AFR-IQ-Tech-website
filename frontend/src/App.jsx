import { useState } from "react";

// Pages
import Home from "./components/Home";
import Services from "./components/Services";
import Academy from "./components/Academy";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import Shop from "./components/Shop";
import Checkout from "./components/Checkout";
import IMS from "./components/IMS";
import IMSApply from "./components/IMSApply";
import IMSDashboard from "./components/IMSDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Talented from "./components/Talented";
import { useAuth } from "./components/AuthContext";
import ResetPassword from "./components/ResetPassword";
import Videos from "./components/Videos";

// Shared Navbar
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

const globalStyles = `
  @keyframes pageTransition {
    0% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(0);
    }
  }

  .page-transition-wrapper {
    animation: pageTransition 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    will-change: transform;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
    touch-action: pan-y;
  }
  body { overscroll-behavior-x: none; }

`;

export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");

  const navigate = (page) => {
    // page can be "Dashboard?student_id=123"
    const [basePage, queryString] = page.split('?');
    setCurrentPage(basePage);
    
    // Update browser URL without reload so window.location.search is available to components
    const newUrl = queryString ? `?${queryString}` : '';
    window.history.pushState({}, '', window.location.pathname + newUrl);
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { user, isRecovering, setIsRecovering } = useAuth();

  const renderPage = () => {
    switch (currentPage) {
      case "Home": return <Home navigate={navigate} />;
      case "Services": return <Services navigate={navigate} />;
      case "Academy": return <Academy navigate={navigate} />;
      case "Login": return <Login navigate={navigate} />;
      case "Signup": return <Signup navigate={navigate} />;
      case "AboutUs": return <AboutUs navigate={navigate} />;
      case "Contact": return <Contact navigate={navigate} />;
      case "Blog": return <Blog navigate={navigate} />;
      case "Talented": return <Talented navigate={navigate} />;
      case "Shop": return <Shop navigate={navigate} />;
      case "Checkout": return <Checkout navigate={navigate} />;
      case "IMS": return <IMS navigate={navigate} />;
      case "IMSApply": return <IMSApply navigate={navigate} />;
      case "Dashboard": return <IMSDashboard navigate={navigate} />;
      case "Videos": return <Videos navigate={navigate} />;
      case "Admin":
        if (user?.profile?.role === 'admin' || user?.email === 'iamsifu.dev@gmail.com') {
          return <AdminDashboard navigate={navigate} />;
        }
        return (
          <div className="access-denied-container">
            <div className="denied-icon">🚫</div>
            <h1 className="denied-title">Access Denied</h1>
            <p className="denied-text">You do not have permission to view the administrative dashboard. If you believe this is an error, please contact support.</p>
            <button className="denied-btn" onClick={() => navigate("Home")}>Return to Safety</button>

            <style>{`
              .access-denied-container {
                height: calc(100vh - 75px);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: var(--bg-base);
                color: var(--text-primary);
                font-family: 'Poppins', sans-serif;
                padding: 40px;
                text-align: center;
                transition: background 0.3s ease;
              }
              .denied-icon { font-size: 80px; margin-bottom: 24px; animation: pulse 2s infinite; }
              @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
              .denied-title {
                font-family: 'Poppins', sans-serif;
                font-size: 72px;
                color: var(--accent-orange);
                margin: 0;
                line-height: 1;
                letter-spacing: 0.02em;
              }
              .denied-text {
                font-family: 'Poppins', sans-serif;
                font-size: 16px;
                color: var(--text-secondary);
                max-width: 450px;
                margin-top: 16px;
                line-height: 1.6;
              }
              .denied-btn {
                margin-top: 40px;
                padding: 16px 32px;
                background: var(--accent-orange);
                color: #fff;
                border: none;
                border-radius: 12px;
                font-family: 'Poppins', sans-serif;
                font-weight: 800;
                font-size: 15px;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                box-shadow: 0 10px 20px var(--accent-orange-glow);
              }
              .denied-btn:hover {
                background: var(--accent-orange-hover);
                transform: translateY(-3px) scale(1.02);
                box-shadow: 0 15px 30px var(--accent-orange-glow);
              }
            `}</style>
          </div>
        );
      default: return <Home navigate={navigate} />;
    }
  };

  if (isRecovering) {
    return (
      <ResetPassword onSuccess={() => {
        setIsRecovering(false);
        navigate("Home");
      }} />
    );
  }

  return (
    <>
      <style>{globalStyles}</style>

      {/* Navbar is always visible — receives currentPage to highlight active link */}
      <Navbar currentPage={currentPage} navigate={navigate} />

      {/* Page content swaps here */}
      <div key={currentPage} className="page-transition-wrapper">
        {renderPage()}
      </div>

      <CartDrawer navigate={navigate} />

      <Footer navigate={navigate} />
    </>
  );
}