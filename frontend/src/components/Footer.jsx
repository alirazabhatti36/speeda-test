import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container glass-panel">
      <div className="footer-content">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            ⚡ Speeda Test <span className="gradient-text">360</span>
          </Link>
          <p className="footer-tagline">
            Next-Generation 360° Real-Time Speed & Broadband Analytics Engine. Fast, accurate, and 100% free.
          </p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <h4>Features & Guides</h4>
            <Link to="/">⚡ Broadband Speed Test</Link>
            <Link to="/website-test">🌐 Website Analyzer</Link>
            <Link to="/guide">📖 Speed Optimization Guide</Link>
            <Link to="/#faq">❓ Speed FAQ</Link>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <Link to="/about">ℹ️ About Us</Link>
            <Link to="/contact">📞 Contact Us</Link>
          </div>

          <div className="footer-col">
            <h4>Legal & Policies</h4>
            <Link to="/privacy">🔒 Privacy Policy</Link>
            <Link to="/terms">📜 Terms of Service</Link>
            <Link to="/cookies">🍪 Cookie Policy</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Speeda Test 360. All rights reserved. Powered by pure client-side Web APIs.</p>
        <p className="adsense-disclosure">
          Google AdSense Disclosures: Speeda Test 360 uses cookies and third-party vendor services to serve relevant ads based on prior website visits.
        </p>
      </div>
    </footer>
  );
}