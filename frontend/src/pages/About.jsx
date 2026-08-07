import React from 'react';
import SEO from '../components/SEO';
import AdSlot from '../components/AdSlot';
import './About.css';

export default function About() {
  return (
    <>
      <SEO 
        title="About Us"
        description="Learn about Speeda Test 360 — our mission, high-precision browser testing engine, and broadband diagnostic technology."
        canonical="/about"
      />

      <div className="about-container">
        <AdSlot slotId="about-top-banner" type="banner" />

        <div className="page-header">
          <h1>ℹ️ About <span className="gradient-text">Speeda Test 360</span></h1>
          <p>The Most Precise, Real-Time Broadband & Network Diagnostic Engine</p>
        </div>

        <div className="glass-panel about-card">
          <section className="about-section">
            <h2>🚀 Our Mission</h2>
            <p>
              Speeda Test 360 was built to provide internet users worldwide with transparent, unthrottled, and accurate network speed measurements. Unlike traditional speed tests that rely on server-side loops or ISP-sponsored routing, Speeda Test 360 runs 100% in your browser using direct Web performance streams.
            </p>
          </section>

          <section className="about-section">
            <h2>⚡ How 360° Testing Works</h2>
            <div className="features-360-grid">
              <div className="feat-box">
                <span className="feat-icon">📶</span>
                <h3>High-Precision Latency</h3>
                <p>Measures millisecond ping and jitter stability over multiple round-trips to edge CDN nodes.</p>
              </div>

              <div className="feat-box">
                <span className="feat-icon">📥</span>
                <h3>Multi-Stream Throughput</h3>
                <p>Downloads multi-megabyte payloads concurrently to saturate your full broadband pipe.</p>
              </div>

              <div className="feat-box">
                <span className="feat-icon">🌐</span>
                <h3>ISP & Location Detection</h3>
                <p>Identifies your public IP address, Autonomous System (ASN), and Internet Service Provider instantly.</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>💡 Built for Everyone</h2>
            <p>
              Whether you're a competitive gamer checking ping stability, a remote worker verifying Zoom call bandwidth, or a web developer analyzing site TTFB, Speeda Test 360 delivers instant insights without ads blocking your view or required software downloads.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}