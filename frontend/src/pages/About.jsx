import React from 'react';
import SEO from '../components/SEO';
import AdSlot from '../components/AdSlot';
import { Link } from 'react-router-dom';
import './About.css';

export default function About() {
  return (
    <>
      <SEO 
        title="About Speeda Test 360 — Real-Time Broadband Diagnostics"
        description="Learn about Speeda Test 360, our mission for network transparency, our pure client-side testing engine, and our engineering team."
        keywords="about speeda test 360, broadband diagnostics, speed test mission, network transparency, web performance engine"
        canonical="/about"
      />

      <div className="about-container">
        <AdSlot slotId="about-top-banner" type="banner" />

        <div className="page-header">
          <h1>ℹ️ About <span className="gradient-text">Speeda Test 360</span></h1>
          <p>Global Real-Time Broadband Diagnostics & Transparent Network Analytics</p>
        </div>

        <div className="glass-panel about-card">
          <section className="about-section">
            <h2>🚀 Our Mission: Unthrottled Network Transparency</h2>
            <p>
              Founded with a commitment to open internet standards, <strong>Speeda Test 360</strong> empowers consumers, gamers, and network engineers to measure their genuine connection performance. Traditional speed tests often partner with local Internet Service Providers (ISPs), routing packets through preferential internal cache servers that produce artificially inflated numbers.
            </p>
            <p>
              Speeda Test 360 operates differently: we execute <strong>100% pure client-side measurements</strong> directly inside your web browser. By testing throughput against high-capacity global Content Delivery Network (CDN) edge nodes (powered by Cloudflare, AWS, and distributed edge endpoints), we report true real-world internet speeds that accurately mirror your actual browsing, streaming, and gaming experience.
            </p>
          </section>

          <section className="about-section">
            <h2>⚡ How Our 360° Diagnostic Engine Works</h2>
            <div className="features-360-grid">
              <div className="feat-box">
                <span className="feat-icon">📶</span>
                <h3>High-Precision Latency</h3>
                <p>Calculates microsecond round-trip time (RTT) and jitter variance using the browser's high-resolution <code>performance.now()</code> API.</p>
              </div>

              <div className="feat-box">
                <span className="feat-icon">📥</span>
                <h3>Multi-Stream Throughput</h3>
                <p>Streams multi-megabyte payloads concurrently using modern <code>ReadableStream</code> to saturate your broadband connection and measure sustained bandwidth.</p>
              </div>

              <div className="feat-box">
                <span className="feat-icon">🌐</span>
                <h3>Autonomous System & ISP Detection</h3>
                <p>Identifies your public IP address, Autonomous System Number (ASN), routing organization, and geographical gateway in real-time.</p>
              </div>

              <div className="feat-box">
                <span className="feat-icon">🎮</span>
                <h3>Esports & Streaming Readiness</h3>
                <p>Analyzes packet timing to score your connection's readiness for competitive games (Valorant, CS2, PUBG) and 4K Ultra HD video streaming.</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>🛡️ Our Privacy-First Commitment</h2>
            <p>
              At Speeda Test 360, your digital privacy is non-negotiable. We never require software installations, browser extensions, or account registrations. We do NOT harvest or sell personally identifiable information. All bandwidth calculations occur directly in your browser memory and are discarded when you close or refresh the tab.
            </p>
          </section>

          <section className="about-section">
            <h2>👥 Engineering & Editorial Standards</h2>
            <p>
              Speeda Test 360 is actively developed and maintained by a dedicated web performance team led by Ali Raza Bhatti. Our benchmarking datasets, ISP rankings, and speed optimization guides undergo continuous peer review to ensure technical accuracy and unbiased reporting.
            </p>
            <p>
              Have a suggestion, bug report, or ISP partnership inquiry? Reach out via our <Link to="/contact">Contact Page</Link> or email us directly at <a href="mailto:support@speedatest360.online" className="email">support@speedatest360.online</a>.
            </p>
          </section>
        </div>

        <AdSlot slotId="about-bottom-banner" type="banner" />
      </div>
    </>
  );
}