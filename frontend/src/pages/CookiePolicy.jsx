import React from 'react';
import SEO from '../components/SEO';
import AdSlot from '../components/AdSlot';
import './Terms.css';

export default function CookiePolicy() {
  return (
    <>
      <SEO 
        title="Cookie Policy"
        description="Speeda Test 360 Cookie Policy. Information on how we use cookies, Google AdSense DART cookies, and analytics."
        canonical="/cookies"
      />

      <div className="legal-page-container">
        <AdSlot slotId="cookies-top-banner" type="banner" />

        <div className="glass-panel legal-card">
          <h1>🍪 Cookie Policy</h1>
          <p className="effective-date">Last Updated: August 8, 2026</p>

          <section>
            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when visiting websites. They help remember preferences, enhance browsing speed, and deliver relevant advertisements.
            </p>
          </section>

          <section>
            <h2>2. Google AdSense & Third-Party Cookies</h2>
            <p>
              Speeda Test 360 uses Google AdSense to serve advertisements. Google uses cookies (including the DoubleClick DART cookie) to serve ads based on your visit to our site and other sites on the Internet.
            </p>
            <ul>
              <li>Third party vendors, including Google, use cookies to serve ads based on prior visits.</li>
              <li>You may opt out of personalized advertising by visiting Google Ad Settings (<a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">www.google.com/settings/ads</a>).</li>
            </ul>
          </section>

          <section>
            <h2>3. Managing Cookie Preferences</h2>
            <p>
              You can instruct your web browser to refuse all cookies or notify you when a cookie is sent. However, some site features may function with reduced personalization.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
