import React from 'react';
import SEO from '../components/SEO';
import AdSlot from '../components/AdSlot';

export default function HowItWorks() {
  return (
    <>
      <SEO 
        title="How Speeda Test 360 Works — Methodology & Test Transparency"
        description="Learn how Speeda Test 360 measures internet speed, ping latency, jitter, download throughput, and upload speeds in the browser."
        keywords="how speed test works, speed test methodology, speed test accuracy, Ookla vs Speeda Test 360, browser speed test accuracy"
        canonical="/how-speed-test-works"
      />

      <div className="guide-container">
        <AdSlot slotId="how-top-banner" type="banner" />

        <div className="page-header">
          <h1>🔬 How Speeda Test 360 <span className="gradient-text">Works</span></h1>
          <p>Complete transparency into our client-side measurement methodology & algorithms</p>
        </div>

        <div className="glass-panel guide-card">
          <article className="guide-article">
            <h2>1. Client-Side Measurement Engine</h2>
            <p>
              Unlike traditional speed tests that require heavy Java applets or third-party executable software, Speeda Test 360 runs <strong>100% inside your web browser</strong> using modern W3C Performance APIs, <code>ReadableStream</code>, and high-precision <code>performance.now()</code> timers.
            </p>
          </article>

          <article className="guide-article">
            <h2>2. How Download Speed is Measured</h2>
            <p>
              When you launch a test, Speeda Test 360 opens parallel multi-threaded HTTP connections to low-latency edge CDN nodes.
            </p>
            <ul>
              <li>We measure the exact payload bytes received in real-time as data streams through the browser.</li>
              <li>Peak speed and sustained throughput are calculated using the formula: <code>Mbps = (Total Bits Downloaded / Elapsed Seconds) / 1,000,000</code>.</li>
            </ul>
          </article>

          <article className="guide-article">
            <h2>3. How Upload Speed & Ping Latency are Calculated</h2>
            <p>
              <strong>Ping Latency:</strong> We send consecutive HTTP HEAD requests to edge servers and measure the round-trip time (RTT) in milliseconds. The minimum non-anomalous ping is reported.
            </p>
            <p>
              <strong>Jitter:</strong> Jitter represents the variation or instability in latency over consecutive ping packets. Low jitter (&lt; 5ms) ensures smooth voice calls and gaming.
            </p>
            <p>
              <strong>Upload Speed:</strong> The browser posts binary chunk buffers to HTTPS endpoints and measures real transmission throughput.
            </p>
          </article>

          <article className="guide-article">
            <h2>4. Why Speed Test Results May Differ</h2>
            <p>
              Speed tests measured on different platforms (e.g. Speeda Test 360 vs Ookla Speedtest vs Fast.com) can vary slightly due to:
            </p>
            <ul>
              <li><strong>Wi-Fi vs Ethernet:</strong> Wireless interference and 2.4GHz Wi-Fi congestion cap throughput compared to Cat6 Ethernet wires.</li>
              <li><strong>Background Applications:</strong> Cloud sync (OneDrive, Google Drive), Steam updates, or active browser tabs consume bandwidth.</li>
              <li><strong>Server Selection:</strong> Test distance to the nearest edge CDN server impacts maximum achievable throughput.</li>
            </ul>
          </article>
        </div>

        <AdSlot slotId="how-bottom-banner" type="banner" />
      </div>
    </>
  );
}
