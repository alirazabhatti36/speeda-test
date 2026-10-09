import React from 'react';
import SEO from '../components/SEO';
import AdSlot from '../components/AdSlot';
import './Guide.css';

export default function HowItWorks() {
  return (
    <>
      <SEO 
        title="How Speeda Test 360 Works — Methodology & Test Transparency"
        description="Learn how Speeda Test 360 measures internet speed, ping latency, jitter, download throughput, and upload speeds in the browser."
        keywords="how speed test works, speed test methodology, speed test accuracy, Ookla vs Speeda Test 360, browser speed test accuracy, bufferbloat calculation"
        canonical="/how-speed-test-works"
      />

      <div className="guide-container">
        <AdSlot slotId="how-top-banner" type="banner" />

        <div className="page-header">
          <h1>🔬 How Speeda Test 360 <span className="gradient-text">Works</span></h1>
          <p>Complete technical transparency into our browser measurement algorithms and mathematical formulas</p>
        </div>

        <div className="glass-panel guide-card">
          <article className="guide-article">
            <h2>1. Pure Client-Side Measurement Architecture</h2>
            <p>
              Unlike legacy speed test platforms that require Java applets, Flash plugins, or proprietary desktop clients, Speeda Test 360 runs <strong>100% inside your modern web browser</strong>. Our testing engine leverages standard W3C Web APIs:
            </p>
            <ul>
              <li><strong>High-Resolution Timers (<code>performance.now()</code>):</strong> Measures time elapsed with microsecond precision, eliminating operating system clock drift.</li>
              <li><strong>Fetch Streams (<code>ReadableStream</code>):</strong> Reads raw binary stream chunks on-the-fly as packets arrive through the TCP socket, avoiding memory bottlenecks.</li>
              <li><strong>Cross-Origin Resource Sharing (CORS):</strong> Connects directly to global high-speed edge CDN nodes across North America, Europe, Asia, and the Middle East.</li>
            </ul>
          </article>

          <article className="guide-article">
            <h2>2. How Download Speed is Calculated</h2>
            <p>
              When you click "Start Speed Test", Speeda Test 360 initiates concurrent multi-stream HTTP requests to download uncompressed binary payloads of varying sizes (5 MB to 25 MB).
            </p>
            <ul>
              <li><strong>Saturating Bandwidth:</strong> Multiple parallel TCP streams prevent single-thread TCP slow-start from artificially dampening results.</li>
              <li><strong>Real-Time Sampling:</strong> Every 100 milliseconds, our engine samples total accumulated bytes received and divides by exact elapsed seconds.</li>
              <li><strong>Mathematical Formula:</strong> <code>Throughput (Mbps) = (Total Bytes × 8) ÷ (Elapsed Seconds × 1,000,000)</code>.</li>
            </ul>
          </article>

          <article className="guide-article">
            <h2>3. How Ping Latency & Jitter are Measured</h2>
            <p>
              <strong>Ping (Round-Trip Time):</strong> The engine dispatches consecutive encrypted HTTP HEAD requests to edge servers. Because HEAD requests only exchange headers without downloading a payload body, the result represents the raw network transit time between your browser and the server.
            </p>
            <p>
              <strong>Jitter (Latency Variance):</strong> Jitter measures network stability. If packet 1 takes 20ms and packet 2 takes 35ms, the jitter delta is 15ms. Low jitter (&lt; 5ms) is essential for online voice calls (Discord, Zoom) and multiplayer gaming without rubber-banding.
            </p>
            <p>
              <strong>Formula:</strong> <code>Jitter = Sum(|Ping[i] - Ping[i-1]|) ÷ (Number of Samples - 1)</code>.
            </p>
          </article>

          <article className="guide-article">
            <h2>4. How Upload Speed is Measured</h2>
            <p>
              To measure upload capacity, the browser generates pre-allocated cryptographic byte arrays (4 MB chunks) in RAM and transmits them via HTTP POST requests to high-capacity receiving endpoints. By clocking byte transfer over time, we calculate sustained upload bandwidth without writing files to your hard drive.
            </p>
          </article>

          <article className="guide-article">
            <h2>5. Why Our Results Differ from ISP-Sponsored Speed Tests</h2>
            <p>
              Many commercial speed tests partner directly with ISPs who place dedicated test servers inside their local central offices. While this tests local loop wiring, it does not reflect real-world throughput to international cloud servers where Netflix, YouTube, Steam, and AWS host content. Speeda Test 360 measures unthrottled real-world performance.
            </p>
          </article>
        </div>

        <AdSlot slotId="how-bottom-banner" type="banner" />
      </div>
    </>
  );
}
