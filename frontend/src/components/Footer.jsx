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

        {/* Col 2: Global Speed Tests */}
        <div className="footer-col">
          <h4>Global Speed Tests</h4>
          <Link to="/xfinity-speed-test">🇺🇸 Xfinity Speed Test</Link>
          <Link to="/att-speed-test">🇺🇸 AT&T Fiber Test</Link>
          <Link to="/verizon-speed-test">🇺🇸 Verizon Fios Test</Link>
          <Link to="/bt-speed-test">🇬🇧 BT Broadband Test</Link>
          <Link to="/virgin-media-speed-test">🇬🇧 Virgin Media Test</Link>
          <Link to="/etisalat-speed-test">🇦🇪 Etisalat eLife Test</Link>
          <Link to="/jio-speed-test">🇮🇳 JioFiber Test</Link>
          <Link to="/ptcl-speed-test">🇵🇰 PTCL Speed Test</Link>
          <Link to="/stormfiber-speed-test">🇵🇰 StormFiber Test</Link>
          <Link to="/nayatel-speed-test">🇵🇰 Nayatel Speed Test</Link>
          <Link to="/isp-rankings">🏆 Global ISP Rankings</Link>
        </div>

        {/* Col 3: Cities & Special Tests */}
        <div className="footer-col">
          <h4>Cities & Special Tests</h4>
          <Link to="/internet-speed-test-new-york">📍 New York City</Link>
          <Link to="/internet-speed-test-london">📍 London</Link>
          <Link to="/internet-speed-test-dubai">📍 Dubai</Link>
          <Link to="/internet-speed-test-toronto">📍 Toronto</Link>
          <Link to="/internet-speed-test-lahore">📍 Lahore</Link>
          <Link to="/gaming-speed-test">🎮 Gaming Speed Test</Link>
          <Link to="/streaming-speed-test">📺 Streaming Speed Test</Link>
          <Link to="/mobile-speed-test">📱 Mobile Speed Test</Link>
          <Link to="/website-test">🌐 Website Analyzer</Link>
        </div>

        {/* Col 4: Tools & Legal */}
        <div className="footer-col">
          <h4>Tools & Legal</h4>
          <Link to="/ping-test">🛰️ Live Ping Test</Link>
          <Link to="/ip-lookup">🔍 Public IP Lookup</Link>
          <Link to="/how-speed-test-works">🔬 How It Works</Link>
          <Link to="/guide">📖 Speed Guide</Link>
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