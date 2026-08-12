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
            Pakistan’s premier 360° Internet Speed Test & Broadband Network Analytics Engine. Measure download, upload, ping, and jitter accurately.
          </p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <h4>Pakistan Speed Tests</h4>
            <Link to="/ptcl-speed-test">🔵 PTCL Speed Test</Link>
            <Link to="/stormfiber-speed-test">⚡ StormFiber Speed Test</Link>
            <Link to="/nayatel-speed-test">🟢 Nayatel Speed Test</Link>
            <Link to="/transworld-speed-test">🌍 Transworld Speed Test</Link>
            <Link to="/jazz-speed-test">📶 Jazz 4G Speed Test</Link>
            <Link to="/zong-speed-test">🟢 Zong 4G Speed Test</Link>
            <Link to="/isp-rankings">🏆 ISP Rankings</Link>
          </div>

          <div className="footer-col">
            <h4>City Speed Tests</h4>
            <Link to="/internet-speed-test-lahore">📍 Lahore Speed Test</Link>
            <Link to="/internet-speed-test-karachi">📍 Karachi Speed Test</Link>
            <Link to="/internet-speed-test-islamabad">📍 Islamabad Speed Test</Link>
            <Link to="/internet-speed-test-rawalpindi">📍 Rawalpindi Speed Test</Link>
            <Link to="/internet-speed-test-faisalabad">📍 Faisalabad Speed Test</Link>
          </div>

          <div className="footer-col">
            <h4>Tools & Resources</h4>
            <Link to="/gaming-speed-test">🎮 Gaming Speed Test</Link>
            <Link to="/streaming-speed-test">📺 Streaming Speed Test</Link>
            <Link to="/mobile-speed-test">📱 Mobile Speed Test</Link>
            <Link to="/website-test">🌐 Website Analyzer</Link>
            <Link to="/ping-test">🛰️ Ping Test</Link>
            <Link to="/ip-lookup">🔍 IP Lookup</Link>
            <Link to="/how-speed-test-works">🔬 How It Works</Link>
            <Link to="/guide">📖 Speed Guide</Link>
          </div>

          <div className="footer-col">
            <h4>Company & Legal</h4>
            <Link to="/about">ℹ️ About Us</Link>
            <Link to="/contact">📞 Contact Us</Link>
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