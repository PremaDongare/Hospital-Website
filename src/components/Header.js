import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({ 
  currentSection, 
  setCurrentSection, 
  notifications, 
  showNotifications, 
  setShowNotifications, 
  onLogin 
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (section) => {
    setCurrentSection(section);
    setShowMobileMenu(false);
    
    switch(section) {
      case 'home':
        navigate('/');
        break;
      case 'doctors':
        navigate('/doctors');
        break;
      case 'hospitals':
        navigate('/hospitals');
        break;
      case 'appointments':
        navigate('/appointments');
        break;
      default:
        navigate('/');
    }
  };

  const isActive = (section) => {
    if (section === 'home' && location.pathname === '/') return true;
    if (section !== 'home' && location.pathname === `/${section}`) return true;
    return false;
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-brand" onClick={() => handleNavigation('home')}>
          <i className="fas fa-hospital-alt"></i>
          <span>Hospital Finder</span>
        </div>
        
        <div className={`nav-menu ${showMobileMenu ? 'active' : ''}`}>
          <a 
            href="#home" 
            className={`nav-link ${isActive('home') ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('home');
            }}
          >
            Home
          </a>
          <a 
            href="#doctors" 
            className={`nav-link ${isActive('doctors') ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('doctors');
            }}
          >
            Doctors
          </a>
          <a 
            href="#hospitals" 
            className={`nav-link ${isActive('hospitals') ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('hospitals');
            }}
          >
            Hospitals
          </a>
          <a 
            href="#appointments" 
            className={`nav-link ${isActive('appointments') ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('appointments');
            }}
          >
            Appointments
          </a>
        </div>
        
        <div className="nav-actions">
          <div 
            className="notification-bell" 
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <i className="fas fa-bell"></i>
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
          </div>
          <button className="btn-primary" onClick={onLogin}>
            Login
          </button>
        </div>
        
        <div 
          className={`hamburger ${showMobileMenu ? 'active' : ''}`}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
};

export default Header; 