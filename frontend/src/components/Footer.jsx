import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>⚡ Speeda Test</h3>
          <p>The Real Speed Test — Accurate, Fast, Reliable</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <a href="/">Speed Test</a>
          <a href="/website-test">Website Test</a>
          <a href="/about">About</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
        <div className="footer-section">
          <h4>Connect</h4>
          <p>📧 support@speedatest.com</p>
          <p>🐦 Twitter: @speedatest</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Speeda Test. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;