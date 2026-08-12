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
          <NavLink to="/gaming-speed-test" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            🎮 Gaming Ping
          </NavLink>
          <NavLink to="/isp-rankings" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            🏆 ISP Rankings
          </NavLink>
          <NavLink to="/website-test" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            🌐 Website Tester
          </NavLink>
          <NavLink to="/ping-test" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            🛰️ Ping Test
          </NavLink>
          <NavLink to="/guide" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            📖 Guide
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
          <NavLink to="/gaming-speed-test" className="mobile-item" onClick={() => setMobileOpen(false)}>
            🎮 Gaming Ping Test
          </NavLink>
          <NavLink to="/streaming-speed-test" className="mobile-item" onClick={() => setMobileOpen(false)}>
            📺 Streaming Speed Test
          </NavLink>
          <NavLink to="/isp-rankings" className="mobile-item" onClick={() => setMobileOpen(false)}>
            🏆 Pakistan ISP Rankings
          </NavLink>
          <NavLink to="/website-test" className="mobile-item" onClick={() => setMobileOpen(false)}>
            🌐 Website Tester
          </NavLink>
          <NavLink to="/ping-test" className="mobile-item" onClick={() => setMobileOpen(false)}>
            🛰️ Ping Test
          </NavLink>
          <NavLink to="/ip-lookup" className="mobile-item" onClick={() => setMobileOpen(false)}>
            🔍 IP Lookup
          </NavLink>
          <NavLink to="/how-speed-test-works" className="mobile-item" onClick={() => setMobileOpen(false)}>
            🔬 How It Works
          </NavLink>
          <NavLink to="/guide" className="mobile-item" onClick={() => setMobileOpen(false)}>
            📖 Speed Guide
          </NavLink>
          <NavLink to="/about" className="mobile-item" onClick={() => setMobileOpen(false)}>
            ℹ️ About Us
          </NavLink>
          <NavLink to="/contact" className="mobile-item" onClick={() => setMobileOpen(false)}>
            📞 Contact Us
          </NavLink>
        </div>
      )}
    </header>
  );
}