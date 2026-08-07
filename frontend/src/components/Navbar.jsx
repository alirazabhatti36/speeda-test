import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="navbar-header glass-panel">
      <div className="navbar-container">
        <Link to="/" className="brand-logo" onClick={() => setMobileOpen(false)}>
          <span className="brand-icon">⚡</span>
          <span className="brand-name">
            Speeda Test <span className="brand-badge">360</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            ⚡ Speed Test
          </NavLink>
          <NavLink to="/website-test" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            🌐 Website Tester
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            ℹ️ About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            📞 Contact
          </NavLink>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-menu glass-panel">
          <NavLink to="/" end className="mobile-item" onClick={() => setMobileOpen(false)}>
            ⚡ Speed Test
          </NavLink>
          <NavLink to="/website-test" className="mobile-item" onClick={() => setMobileOpen(false)}>
            🌐 Website Tester
          </NavLink>
          <NavLink to="/about" className="mobile-item" onClick={() => setMobileOpen(false)}>
            ℹ️ About Us
          </NavLink>
          <NavLink to="/contact" className="mobile-item" onClick={() => setMobileOpen(false)}>
            📞 Contact Us
          </NavLink>
          <NavLink to="/privacy" className="mobile-item" onClick={() => setMobileOpen(false)}>
            🔒 Privacy Policy
          </NavLink>
          <NavLink to="/terms" className="mobile-item" onClick={() => setMobileOpen(false)}>
            📜 Terms of Service
          </NavLink>
        </div>
      )}
    </header>
  );
}