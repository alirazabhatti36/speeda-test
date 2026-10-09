import React from 'react';
import SEO from '../components/SEO';
import AdSlot from '../components/AdSlot';
import { Link } from 'react-router-dom';
import './Terms.css';

export default function CookiePolicy() {
  return (
    <>
      <SEO 
        title="Cookie Policy — Speeda Test 360"
        description="Speeda Test 360 Cookie Policy. Information on browser cookies, localStorage, Google AdSense DART cookies, and analytics tracking."
        keywords="cookie policy, speeda test 360 cookies, google adsense cookies, dart cookie, browser localstorage"
        canonical="/cookies"
      />

      <div className="legal-page-container">
        <AdSlot slotId="cookies-top-banner" type="banner" />

        <div className="glass-panel legal-card">
          <h1>🍪 Cookie Policy</h1>
          <p className="effective-date">Last Updated: October 2026</p>

          <section>
            <h2>1. What Are Cookies & Web Storage?</h2>
            <p>
              Cookies are compact text files stored on your computer, smartphone, or tablet when you visit websites. They are widely used by modern web applications to ensure proper functionality, remember user preferences (such as dark mode or cookie consent), and provide aggregated visitor analytics.
            </p>
            <p>
              In addition to standard HTTP cookies, Speeda Test 360 utilizes HTML5 <code>localStorage</code> to store your local speed test history and cookie consent state on your device without transmitting it to our servers.
            </p>
          </section>

          <section>
            <h2>2. Categories of Cookies We Use</h2>
            
            <h3>A. Essential / Strictly Necessary Storage</h3>
            <p>
              These storage entries are required for core website features to operate correctly. For example, when you acknowledge our cookie banner, a flag (<code>speeda360_cookie_consent</code>) is stored in your browser's local storage so you are not prompted repeatedly on every visit.
            </p>

            <h3>B. Diagnostic & Performance Storage</h3>
            <p>
              Speeda Test 360 stores your previous speed test history (download Mbps, upload Mbps, ping latency, and ISP name) locally inside your web browser. This data never leaves your device and enables the "Speed History" table on the homepage.
            </p>

            <h3>C. Google AdSense & Third-Party Advertising Cookies</h3>
            <p>
              Speeda Test 360 uses Google AdSense to serve advertisements. Google and its certified advertising partners utilize third-party cookies (including DoubleClick and DART cookies) to deliver ads tailored to your general interests based on visits to this and other websites:
            </p>
            <ul>
              <li>Third-party advertising vendors use cookies to serve ads based on your prior web visits.</li>
              <li>You may opt out of personalized Google advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</li>
            </ul>

            <h3>D. Analytical Cookies (Google Analytics)</h3>
            <p>
              We use aggregated analytics to monitor visitor volume, popular devices, and page load performance. These cookies collect anonymized telemetry that cannot be used to personally identify individual human beings.
            </p>
          </section>

          <section>
            <h2>3. How to Manage & Disable Cookies</h2>
            <p>
              You have full control over cookie permissions. Most web browsers allow you to modify cookie settings through their preferences or options menu:
            </p>
            <ul>
              <li><strong>Google Chrome:</strong> Settings → Privacy and Security → Third-party cookies.</li>
              <li><strong>Mozilla Firefox:</strong> Settings → Privacy & Security → Enhanced Tracking Protection.</li>
              <li><strong>Apple Safari:</strong> Preferences → Privacy → Block all cookies.</li>
              <li><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies and site data.</li>
            </ul>
            <p>
              Please note that disabling cookies may alter your browsing experience or reset your local speed test history.
            </p>
          </section>

          <section>
            <h2>4. Questions Regarding Cookies</h2>
            <p>
              For further questions regarding our cookie practices, please read our full <Link to="/privacy">Privacy Policy</Link> or contact our support team at <a className="email" href="mailto:support@speedatest360.online">support@speedatest360.online</a>.
            </p>
          </section>
        </div>

        <AdSlot slotId="cookies-bottom-banner" type="banner" />
      </div>
    </>
  );
}
