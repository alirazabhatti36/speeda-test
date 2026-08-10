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

  const getScoreColor = (score) => {
    if (score >= 90) return '#00ff87'; // Green
    if (score >= 50) return '#f59e0b'; // Orange
    return '#ff4b4b'; // Red
  };

  return (
    <div className="website-tester-container">
      <AdSlot slotId="web-test-top" type="banner" />

      <div className="page-header">
        <h1>🌐 Website Speed <span className="gradient-text">Tester</span></h1>
        <p>Google PageSpeed Insights & Lighthouse Standard Website Performance Analyzer</p>
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
            {loading ? '⏳ Auditing Website...' : '🚀 Test Website'}
          </button>
        </div>
        {error && <div className="error-alert">❌ {error}</div>}
      </form>

      {/* Results Dashboard */}
      {result && (
        <div className="web-results-card glass-panel">
          <div className="results-head">
            <div>
              <h3>📊 PageSpeed Report for <span className="gradient-text">{result.url}</span></h3>
              <span className="timestamp-badge">Measured at {new Date(result.timestamp).toLocaleTimeString()}</span>
            </div>
            <div className="status-pill mono">
              STATUS: {result.statusCode} {result.statusText}
            </div>
          </div>

          {/* PageSpeed Insights 4 Category Score Badges */}
          <div className="category-scores-grid">
            <div className="cat-score-card">
              <div className="score-ring" style={{ borderColor: getScoreColor(result.performanceScore) }}>
                <span className="score-val mono" style={{ color: getScoreColor(result.performanceScore) }}>
                  {result.performanceScore}
                </span>
              </div>
              <span className="cat-title">Performance</span>
            </div>

            <div className="cat-score-card">
              <div className="score-ring" style={{ borderColor: getScoreColor(result.accessibilityScore) }}>
                <span className="score-val mono" style={{ color: getScoreColor(result.accessibilityScore) }}>
                  {result.accessibilityScore}
                </span>
              </div>
              <span className="cat-title">Accessibility</span>
            </div>

            <div className="cat-score-card">
              <div className="score-ring" style={{ borderColor: getScoreColor(result.bestPracticesScore) }}>
                <span className="score-val mono" style={{ color: getScoreColor(result.bestPracticesScore) }}>
                  {result.bestPracticesScore}
                </span>
              </div>
              <span className="cat-title">Best Practices</span>
            </div>

            <div className="cat-score-card">
              <div className="score-ring" style={{ borderColor: getScoreColor(result.seoScore) }}>
                <span className="score-val mono" style={{ color: getScoreColor(result.seoScore) }}>
                  {result.seoScore}
                </span>
              </div>
              <span className="cat-title">SEO</span>
            </div>
          </div>

          {/* Core Web Vitals Section */}
          <div className="cwv-section">
            <h4>⚡ Core Web Vitals & Metrics</h4>
            <div className="cwv-grid">
              <div className="cwv-card">
                <span className="cwv-lbl">First Contentful Paint (FCP)</span>
                <span className="cwv-val mono" style={{ color: '#00ff87' }}>{result.coreWebVitals.fcp}</span>
              </div>

              <div className="cwv-card">
                <span className="cwv-lbl">Largest Contentful Paint (LCP)</span>
                <span className="cwv-val mono" style={{ color: '#00ff87' }}>{result.coreWebVitals.lcp}</span>
              </div>

              <div className="cwv-card">
                <span className="cwv-lbl">Total Blocking Time (TBT)</span>
                <span className="cwv-val mono" style={{ color: '#f59e0b' }}>{result.coreWebVitals.tbt}</span>
              </div>

              <div className="cwv-card">
                <span className="cwv-lbl">Cumulative Layout Shift (CLS)</span>
                <span className="cwv-val mono" style={{ color: '#00ff87' }}>{result.coreWebVitals.cls}</span>
              </div>

              <div className="cwv-card">
                <span className="cwv-lbl">Speed Index</span>
                <span className="cwv-val mono" style={{ color: '#00f2fe' }}>{result.coreWebVitals.speedIndex}</span>
              </div>

              <div className="cwv-card">
                <span className="cwv-lbl">Total Page Weight</span>
                <span className="cwv-val mono" style={{ color: '#ffffff' }}>{result.sizeMB} ({result.sizeKB})</span>
              </div>
            </div>
          </div>

          {/* Phase Timings */}
          <div className="timings-breakdown">
            <h4>⏱️ Network Phase Breakdown</h4>
            <div className="phase-bars">
              <div className="phase-item">
                <span>DNS Lookup:</span>
                <span className="mono">{result.dnsMs} ms</span>
              </div>
              <div className="phase-item">
                <span>TCP Connection:</span>
                <span className="mono">{result.tcpMs} ms</span>
              </div>
              <div className="phase-item">
                <span>SSL Handshake:</span>
                <span className="mono">{result.sslMs} ms</span>
              </div>
              <div className="phase-item">
                <span>Time to First Byte (TTFB):</span>
                <span className="mono">{result.ttfbMs} ms</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <AdSlot slotId="web-test-bottom" type="banner" />
    </div>
  );
}