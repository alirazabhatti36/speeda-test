import React from 'react';
import SEO from '../components/SEO';
import AdSlot from '../components/AdSlot';
import './Terms.css';

export default function Terms() {
  return (
    <>
      <SEO 
        title="Terms of Service"
        description="Speeda Test 360 Terms of Service. Learn about our service terms, acceptable use, and disclaimer of warranties."
        canonical="/terms"
      />

      <div className="legal-page-container">
        <AdSlot slotId="terms-top-banner" type="banner" />

        <div className="glass-panel legal-card">
          <h1>📜 Terms of Service</h1>
          <p className="effective-date">Last Updated: August 8, 2026</p>

          <section>
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using Speeda Test 360 ("Website", "Service", "We", "Us"), you agree to be bound by these Terms of Service. If you do not agree to all terms, you must discontinue using our services immediately.
            </p>
          </section>

          <section>
            <h2>2. Description of Service</h2>
            <p>
              Speeda Test 360 provides real-time internet speed testing, latency (ping), jitter measurements, ISP network diagnostics, and website performance testing tools directly in the web browser.
            </p>
          </section>

          <section>
            <h2>3. Acceptable Use Policy</h2>
            <p>
              You agree not to misuse our testing services, perform automated denial-of-service (DoS) attacks, scrape data improperly, or bypass system rate limits.
            </p>
          </section>

          <section>
            <h2>4. Disclaimer of Warranties</h2>
            <p>
              Speeda Test 360 is provided on an "AS IS" and "AS AVAILABLE" basis. While we strive for maximum precision, test results may vary depending on local Wi-Fi interference, ISP routing, device capabilities, and network congestion.
            </p>
          </section>

          <section>
            <h2>5. Contact Us</h2>
            <p>
              If you have any questions regarding these Terms, please contact us via our <a href="/contact">Contact Page</a>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
