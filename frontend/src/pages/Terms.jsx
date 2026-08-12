import React from 'react';
import SEO from '../components/SEO';
import AdSlot from '../components/AdSlot';
import './Terms.css';

export default function Terms() {
  return (
    <>
      <SEO 
        title="Terms of Service — Speeda Test 360"
        description="Terms of Service for using the Speeda Test 360 free internet speed test tool."
        keywords="terms of service, speeda test 360 terms, speed test terms of use"
        canonical="/terms"
      />

      <div className="legal-page-container">
        <AdSlot slotId="terms-top-banner" type="banner" />

        <div className="glass-panel legal-card">
          <h1>📜 Terms of Service</h1>
          <p className="effective-date">Last updated: August 2026</p>

          <p>By accessing or using speedatest360.online (the "Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>

          <h2>1. Use of the Service</h2>
          <p>Speeda Test 360 provides a free tool to measure internet connection speed, including download speed, upload speed, ping, and jitter. The Service is provided for personal, informational use.</p>

          <h2>2. Accuracy of Results</h2>
          <p>Results are estimates based on network conditions at the time of testing and can be affected by factors outside our control, including WiFi signal, device performance, network congestion, and server load. We do not guarantee that results exactly match your ISP's advertised or contracted speed.</p>

          <h2>3. Acceptable Use</h2>
          <p>You agree not to misuse the Service, including attempting to disrupt, overload, or reverse-engineer the testing infrastructure, or using automated scripts to run excessive repeated tests.</p>

          <h2>4. Advertising</h2>
          <p>The Service is supported by third-party advertising, including Google AdSense. Ads are served according to our <a href="/privacy" className="email">Privacy Policy</a>.</p>

          <h2>5. Intellectual Property</h2>
          <p>All content, branding, and code on speedatest360.online, excluding third-party ad content, is the property of Speeda Test 360 and may not be copied or redistributed without permission.</p>

          <h2>6. Limitation of Liability</h2>
          <p>The Service is provided "as is" without warranties of any kind. Speeda Test 360 is not liable for any decisions made, or damages incurred, based on speed test results.</p>

          <h2>7. Changes to These Terms</h2>
          <p>We may update these Terms from time to time. Continued use of the Service after changes are posted constitutes acceptance of the revised Terms.</p>

          <h2>8. Contact</h2>
          <p>Questions about these Terms can be sent to <a className="email" href="mailto:support@speedatest360.online">support@speedatest360.online</a>.</p>
        </div>
      </div>
    </>
  );
}
