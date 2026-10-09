import React, { useState } from 'react';
import { analyzeWebsite } from '../utils/speedEngine';
import AdSlot from './AdSlot';
import './WebsiteTester.css';

export default function WebsiteTester() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleTest = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please enter a valid website URL (e.g. webbuggs.com)');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeWebsite(url);
      setResult(data);
    } catch (err) {
      setError('Failed to measure target website speed.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (code) => {
    if (code >= 200 && code < 300) return '#00ff87'; // Green
    if (code >= 300 && code < 400) return '#f59e0b'; // Amber
    return '#ff4b4b'; // Red
  };

  return (
    <div className="website-tester-container">
      <AdSlot slotId="web-test-top" type="banner" />

      <div className="page-header">
        <h1>🌐 Website Speed <span className="gradient-text">Tester</span></h1>
        <p>100% Real-Time HTTP Response, TTFB Latency & Throughput Diagnostics</p>
      </div>

      {/* Input Box */}
      <form onSubmit={handleTest} className="tester-form glass-panel">
        <div className="input-row">
          <input
            type="text"
            placeholder="Enter website URL (e.g. https://webbuggs.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="url-input-field"
          />
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? '⏳ Measuring Website...' : '🚀 Test Website'}
          </button>
        </div>
        {error && <div className="error-alert">❌ {error}</div>}
      </form>

      {/* Results Dashboard */}
      {result && (
        <div className="web-results-card glass-panel">
          {/* Header Row */}
          <div className="results-head">
            <div>
              <h3>📊 Diagnostics for <span className="gradient-text">{result.url}</span></h3>
              <span className="timestamp-badge">Measured at {new Date(result.timestamp).toLocaleTimeString()}</span>
            </div>

            <div className="head-badges">
              <span className="status-pill mono" style={{ color: getStatusColor(result.statusCode), borderColor: getStatusColor(result.statusCode) }}>
                STATUS: {result.statusCode} {result.statusText}
              </span>
              {result.isHttps && (
                <span className="ssl-pill">🔒 HTTPS Secure</span>
              )}
            </div>
          </div>

          {/* Speeda 360 Score Banner */}
          <div className="speeda-score-banner">
            <div className="score-main-group">
              <div className="grade-badge">{result.speedGrade}</div>
              <div>
                <div className="score-num-group">
                  <span className="score-big mono">{result.speedaIndex}</span>
                  <span className="score-max">/ 100</span>
                </div>
                <span className="score-title">Speeda 360 Performance Index</span>
              </div>
            </div>
            <div className="rating-tag">{result.speedRating}</div>
          </div>

          {/* Real Metrics Grid */}
          <div className="real-metrics-grid">
            <div className="real-card">
              <span className="rc-icon">⚡</span>
              <div>
                <span className="rc-lbl">Total Response Time</span>
                <span className="rc-val mono">{result.totalDurationMs} ms</span>
              </div>
            </div>

            <div className="real-card">
              <span className="rc-icon">⏱️</span>
              <div>
                <span className="rc-lbl">Time to First Byte (TTFB)</span>
                <span className="rc-val mono">{result.ttfbMs} ms</span>
              </div>
            </div>

            <div className="real-card">
              <span className="rc-icon">📦</span>
              <div>
                <span className="rc-lbl">Total Page Weight</span>
                <span className="rc-val mono">{result.sizeMB}</span>
              </div>
            </div>

            <div className="real-card">
              <span className="rc-icon">🚀</span>
              <div>
                <span className="rc-lbl">Transfer Throughput</span>
                <span className="rc-val mono">{result.transferRateKbps}</span>
              </div>
            </div>
          </div>

          {/* Real Network Phase Timings */}
          <div className="timings-breakdown">
            <h4>⏱️ Measured Network Timings</h4>
            <div className="phase-bars">
              <div className="phase-item">
                <span>DNS Lookup:</span>
                <span className="mono">{result.dnsMs} ms</span>
              </div>
              <div className="phase-item">
                <span>TCP Connect:</span>
                <span className="mono">{result.tcpMs} ms</span>
              </div>
              <div className="phase-item">
                <span>SSL Handshake:</span>
                <span className="mono">{result.sslMs} ms</span>
              </div>
              <div className="phase-item">
                <span>TTFB Header Arrival:</span>
                <span className="mono">{result.ttfbMs} ms</span>
              </div>
              <div className="phase-item">
                <span>Data Stream Download:</span>
                <span className="mono">{result.contentDownloadMs} ms</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Website Speed Optimization & Core Web Vitals Guide */}
      <div className="glass-panel web-guide-card" style={{ marginTop: '2.5rem', padding: '2rem' }}>
        <h2>⚡ Understanding Website Speed & Core Web Vitals</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
          Website loading speed directly impacts bounce rates, conversion rates, and Google organic search rankings. Google utilizes page experience metrics as confirmed ranking signals.
        </p>

        <div className="web-tips-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          <div className="web-tip-box" style={{ background: 'rgba(11, 15, 25, 0.5)', padding: '1.4rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
            <h3 style={{ color: 'var(--primary-cyan)', fontSize: '1.1rem', marginBottom: '0.6rem' }}>⏱️ Time to First Byte (TTFB)</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              TTFB measures the duration between a visitor requesting a URL and the arrival of the first response byte from the web server. Good TTFB should remain under <strong>200 milliseconds</strong>.
            </p>
          </div>

          <div className="web-tip-box" style={{ background: 'rgba(11, 15, 25, 0.5)', padding: '1.4rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
            <h3 style={{ color: 'var(--primary-cyan)', fontSize: '1.1rem', marginBottom: '0.6rem' }}>🌐 Content Delivery Networks (CDNs)</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              Deploying a global edge CDN (such as Cloudflare, Fastly, or CloudFront) caches static assets within milliseconds of global visitors, slashing DNS resolution and SSL handshake overhead.
            </p>
          </div>

          <div className="web-tip-box" style={{ background: 'rgba(11, 15, 25, 0.5)', padding: '1.4rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
            <h3 style={{ color: 'var(--primary-cyan)', fontSize: '1.1rem', marginBottom: '0.6rem' }}>📦 Asset Compression (Brotli & Gzip)</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              Enabling modern Brotli or Gzip compression reduces HTML, CSS, and JavaScript payload sizes by up to 70%, accelerating cellular downloads.
            </p>
          </div>

          <div className="web-tip-box" style={{ background: 'rgba(11, 15, 25, 0.5)', padding: '1.4rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
            <h3 style={{ color: 'var(--primary-cyan)', fontSize: '1.1rem', marginBottom: '0.6rem' }}>🖼️ Next-Gen Image Formats</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              Converting traditional PNG/JPEG images into modern AVIF or WebP formats dramatically reduces page weight without visible loss in visual fidelity.
            </p>
          </div>
        </div>
      </div>

      <AdSlot slotId="web-test-bottom" type="banner" />
    </div>
  );
}