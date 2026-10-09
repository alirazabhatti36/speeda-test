import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container glass-panel">
      <div className="footer-content">
        {/* Col 1: Brand & Tagline */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            ⚡ Speeda Test <span className="gradient-text">360</span>
          </Link>
          <p className="footer-tagline">
            Worldwide 360° Internet Speed Test & Broadband Network Analytics Engine. Measure download, upload, ping, and jitter accurately across global edge networks.
          </p>
        </div>

        {/* Col 2: Diagnostic Tools */}
        <div className="footer-col">
          <h4>Speed & Diagnostic Tools</h4>
          <Link to="/">⚡ Core Internet Speed Test</Link>
          <Link to="/gaming-speed-test">🎮 Gaming Ping & Latency</Link>
          <Link to="/streaming-speed-test">📺 4K Video Streaming Test</Link>
          <Link to="/mobile-speed-test">📱 Mobile 4G & 5G Test</Link>
          <Link to="/website-test">🌐 Website Speed & TTFB</Link>
          <Link to="/ping-test">🛰️ Live Multi-Server Ping</Link>
          <Link to="/ip-lookup">🔍 Public IP & ISP Lookup</Link>
          <Link to="/isp-rankings">🏆 ISP Speed Rankings</Link>
        </div>

        {/* Col 3: Guides & Technical Specs */}
        <div className="footer-col">
          <h4>Guides & Technology</h4>
          <Link to="/guide">📖 Speed Optimization Guide</Link>
          <Link to="/how-speed-test-works">🔬 Testing Methodology</Link>
          <Link to="/isp-rankings">📊 Global ISP Comparison</Link>
          <Link to="/guide#ping">🕹️ How to Lower Gaming Ping</Link>
          <Link to="/guide#wifi">📶 2.4 GHz vs 5 GHz Wi-Fi</Link>
          <Link to="/guide#mbps">💡 Mbps vs MB/s Explained</Link>
        </div>

        {/* Col 4: Trust, Company & Legal */}
        <div className="footer-col">
          <h4>Company & Legal</h4>
          <Link to="/about">ℹ️ About Us</Link>
          <Link to="/contact">📞 Contact Us</Link>
          <Link to="/privacy">🔒 Privacy Policy</Link>
          <Link to="/terms">📜 Terms of Service</Link>
          <Link to="/cookies">🍪 Cookie Policy</Link>
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