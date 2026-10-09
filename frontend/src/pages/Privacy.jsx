import React from 'react';
import SEO from '../components/SEO';
import AdSlot from '../components/AdSlot';
import { Link } from 'react-router-dom';
import './Terms.css';

export default function Privacy() {
  return (
    <>
      <SEO 
        title="Privacy Policy — Speeda Test 360"
        description="Speeda Test 360 Privacy Policy. Information on data collection, privacy protection, Google AdSense compliance, GDPR, and CCPA."
        keywords="privacy policy, speeda test 360 privacy, google adsense privacy, gdpr privacy, ccpa privacy policy"
        canonical="/privacy"
      />

      <div className="legal-page-container">
        <AdSlot slotId="privacy-top-banner" type="banner" />

        <div className="glass-panel legal-card">
          <h1>🔒 Privacy Policy</h1>
          <p className="effective-date">Last Updated: October 2026</p>

          <section>
            <h2>1. Introduction & Overview</h2>
            <p>
              At Speeda Test 360, accessible at <strong>speedatest360.online</strong>, protecting the privacy and personal data of our visitors is paramount. This Privacy Policy outlines the types of information collected, processed, and safeguarded by Speeda Test 360 and explains how we comply with applicable data protection laws, including the European Union General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and Google AdSense publisher policies.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect and Process</h2>
            <p>
              Speeda Test 360 executes internet connection performance tests directly within your web browser. We do NOT require user account creation, registration, or submission of personal identifying information (PII) such as your legal name, physical address, phone number, or payment details.
            </p>
            <p>
              During an active speed or network test, the application temporarily inspects technical diagnostic telemetry to render test results on your screen:
            </p>
            <ul>
              <li><strong>Public IP Address & Geolocation:</strong> Used solely to identify your closest test server node, approximate city, and Autonomous System Number (ASN).</li>
              <li><strong>Internet Service Provider (ISP):</strong> Used to calculate your package performance ratio and display relevant network benchmarks.</li>
              <li><strong>Connection Metrics:</strong> Download throughput (Mbps), upload speed (Mbps), round-trip ping latency (ms), and jitter packet variance (ms).</li>
              <li><strong>Browser User-Agent:</strong> General technical device information (e.g. mobile vs desktop) used to render responsive UI layouts.</li>
            </ul>
            <p>
              Speeda Test 360 does not store this technical telemetry on permanent databases or sell your diagnostic data to third parties.
            </p>
          </section>

          <section>
            <h2>3. Log Files & Performance Monitoring</h2>
            <p>
              Like most standard websites, Speeda Test 360 utilizes standard web server log files. The information inside log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and total clicks. This data is not linked to any information that is personally identifiable and is used exclusively for server security, DDoS mitigation, and website maintenance.
            </p>
          </section>

          <section>
            <h2>4. Google AdSense & Third-Party Advertising Policies</h2>
            <p>
              Google is a third-party vendor on our website. Google uses cookies, including the DoubleClick DART cookie, to serve ads to visitors based upon their visit to speedatest360.online and other websites across the internet.
            </p>
            <ul>
              <li>Google's use of advertising cookies enables it and its partners to serve ads to users based on their prior visits to our site and other internet destinations.</li>
              <li>Users may opt out of personalized advertising by visiting Google's official <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Ads Settings</a>.</li>
              <li>Alternatively, users can opt out of third-party vendor cookie usage for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.</li>
            </ul>
            <p>
              Speeda Test 360 has no access to or control over cookies that are used by third-party advertisers. We recommend consulting the respective privacy policies of these third-party ad servers for more detailed guidance.
            </p>
          </section>

          <section>
            <h2>5. GDPR Data Protection Rights (European Economic Area)</h2>
            <p>
              Under the General Data Protection Regulation (GDPR), users residing in the European Economic Area (EEA) and the United Kingdom are entitled to the following data rights:
            </p>
            <ul>
              <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification:</strong> You have the right to request correction of inaccurate or incomplete information.</li>
              <li><strong>The right to erasure:</strong> You have the right to request deletion of your personal data under certain conditions.</li>
              <li><strong>The right to restrict or object to processing:</strong> You have the right to object to our processing of your personal data.</li>
            </ul>
            <p>
              Because Speeda Test 360 does not maintain registered user accounts or store personal dossiers, tests run ephemerally in browser memory. If you wish to exercise any GDPR right, contact us at <a className="email" href="mailto:privacy@speedatest360.online">privacy@speedatest360.online</a>.
            </p>
          </section>

          <section>
            <h2>6. CCPA / CPRA Privacy Rights (California Residents)</h2>
            <p>
              Under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA), California residents have specific privacy protections:
            </p>
            <ul>
              <li>The right to request disclosure of categories and specific pieces of personal data collected.</li>
              <li>The right to request deletion of any personal data collected.</li>
              <li>The right to opt-out of the sale or sharing of personal data. <strong>Speeda Test 360 does not sell personal data.</strong></li>
            </ul>
          </section>

          <section>
            <h2>7. Children's Online Privacy Protection (COPPA)</h2>
            <p>
              Speeda Test 360 does not knowingly collect any Personal Identifiable Information from children under the age of 13. If a parent or guardian believes that Speeda Test 360 holds personal information of a child under the age of 13, please contact us immediately, and we will promptly remove such records from our logs.
            </p>
          </section>

          <section>
            <h2>8. Contact Our Data Protection Team</h2>
            <p>
              If you have questions or require clarification regarding our Privacy Policy or data handling procedures, please contact us via our <Link to="/contact">Contact Page</Link> or email our privacy team at <a className="email" href="mailto:privacy@speedatest360.online">privacy@speedatest360.online</a>.
            </p>
          </section>
        </div>

        <AdSlot slotId="privacy-bottom-banner" type="banner" />
      </div>
    </>
  );
}