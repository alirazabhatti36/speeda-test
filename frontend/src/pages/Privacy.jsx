import React from 'react';
import SEO from '../components/SEO';
import AdSlot from '../components/AdSlot';
import './Terms.css';

export default function Privacy() {
  return (
    <>
      <SEO 
        title="Privacy Policy"
        description="Speeda Test 360 Privacy Policy. Information on data collection, privacy protection, and Google AdSense compliance."
        canonical="/privacy"
      />

      <div className="legal-page-container">
        <AdSlot slotId="privacy-top-banner" type="banner" />

        <div className="glass-panel legal-card">
          <h1>🔒 Privacy Policy</h1>
          <p className="effective-date">Last Updated: August 8, 2026</p>

          <section>
            <h2>1. Introduction</h2>
            <p>
              At Speeda Test 360, accessible from speedatest360.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Speeda Test 360 and how we use it.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <p>
              Speeda Test 360 performs internet speed tests completely client-side in your browser. We do NOT collect, store, or sell personal identifiers such as your full name, physical address, or financial details. We measure technical network parameters (IP address, ISP name, latency, throughput speed) solely to display test results.
            </p>
          </section>

          <section>
            <h2>3. Google DoubleClick DART Cookie & AdSense Policies</h2>
            <p>
              Google is a third-party vendor on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet.
            </p>
            <ul>
              <li>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
              <li>Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Ads Settings</a>.</li>
            </ul>
          </section>

          <section>
            <h2>4. CCPA & GDPR Privacy Rights</h2>
            <p>
              Under CCPA and GDPR, consumers have the right to request deletion of personal data, request disclosure of collected categories, and opt out of the sale of personal data.
            </p>
          </section>

          <section>
            <h2>5. Contact Information</h2>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through our <a href="/contact">Contact Page</a>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}