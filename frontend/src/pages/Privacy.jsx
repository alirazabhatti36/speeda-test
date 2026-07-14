import SEO from '../components/SEO';
import './Privacy.css';

function Privacy() {
  return (
    <>
      <SEO 
        title="Privacy Policy"
        description="Speeda Test Privacy Policy. We respect your privacy and do not store any personal data. Learn how we protect your information."
        canonical="/privacy"
      />
      
      <div className="page-container">
        <div className="privacy-section">
          <h1>🔒 Privacy Policy</h1>
          <p className="last-updated">Last Updated: July 15, 2026</p>

          <div className="privacy-content">
            <div className="privacy-card">
              <h2>1. Introduction</h2>
              <p>
                Welcome to <strong>Speeda Test</strong>. Your privacy is important to us. 
                This Privacy Policy explains how we handle your data when you use our speed test tool.
              </p>
            </div>

            <div className="privacy-card highlight">
              <h2>2. Data Collection</h2>
              <p>
                <strong>We DO NOT collect, store, or share any personal data.</strong> 
                All speed tests are performed directly between your browser and our servers.
              </p>
              <ul>
                <li>✅ No registration required</li>
                <li>✅ No cookies (except essential ones)</li>
                <li>✅ No IP logging</li>
                <li>✅ No data storage</li>
              </ul>
            </div>

            <div className="privacy-card">
              <h2>3. What We Measure</h2>
              <p>When you run a speed test, we measure:</p>
              <ul>
                <li>📥 Download speed</li>
                <li>📤 Upload speed</li>
                <li>📶 Ping/Latency</li>
                <li>🌐 Website performance (if using website tester)</li>
              </ul>
              <p className="note">
                <strong>Note:</strong> These measurements are temporary and not stored.
              </p>
            </div>

            <div className="privacy-card">
              <h2>4. Third-Party Services</h2>
              <p>
                We may use third-party analytics tools (like Google Analytics) to understand 
                how our tool is used. These services may collect anonymous usage data.
              </p>
            </div>

            <div className="privacy-card">
              <h2>5. Cookies</h2>
              <p>
                We use minimal cookies for:
              </p>
              <ul>
                <li>🍪 Basic site functionality</li>
                <li>🍪 Performance optimization</li>
              </ul>
              <p>
                You can disable cookies in your browser settings at any time.
              </p>
            </div>

            <div className="privacy-card">
              <h2>6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>✅ Use our tool without registration</li>
                <li>✅ Opt-out of analytics</li>
                <li>✅ Clear your browser data anytime</li>
              </ul>
            </div>

            <div className="privacy-card">
              <h2>7. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="contact-info">
                📧 support@speedatest.com
              </p>
            </div>

            <div className="privacy-card highlight">
              <h2>8. Summary</h2>
              <p className="summary-text">
                🔒 <strong>We respect your privacy.</strong> No data collection, 
                no tracking, no storage. Just accurate speed tests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Privacy;