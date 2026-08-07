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
      setError('Please enter a valid website URL (e.g. google.com)');
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

  return (
    <div className="website-tester-container">
      <AdSlot slotId="web-test-top" type="banner" />

      <div className="page-header">
        <h1>🌐 Website Speed <span className="gradient-text">Tester</span></h1>
        <p>Analyze response time, page weight, TTFB, and performance score of any URL worldwide.</p>
      </div>

      {/* Input Box */}
      <form onSubmit={handleTest} className="tester-form glass-panel">
        <div className="input-row">
          <input
            type="text"
            placeholder="Enter website URL (e.g. https://google.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="url-input-field"
          />
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? '⏳ Analyzing...' : '🚀 Test Website'}
          </button>
        </div>
        {error && <div className="error-alert">❌ {error}</div>}
      </form>

      {/* Results Dashboard */}
      {result && (
        <div className="web-results-card glass-panel">
          <div className="results-head">
            <div>
              <h3>📊 Results for <span className="gradient-text">{result.url}</span></h3>
              <span className="timestamp-badge">Measured at {new Date(result.timestamp).toLocaleTimeString()}</span>
            </div>
            <div className="score-badge-circle">
              <span className="score-num mono">{result.performanceScore}</span>
              <span className="score-lbl">Score</span>
            </div>
          </div>

          <div className="web-metrics-grid">
            <div className="web-metric-card">
              <span className="wm-label">Status</span>
              <span className="wm-val mono" style={{ color: '#00ff87' }}>
                {result.statusCode} {result.statusText}
              </span>
            </div>

            <div className="web-metric-card">
              <span className="wm-label">Response Time</span>
              <span className="wm-val mono">{result.durationMs} ms</span>
            </div>

            <div className="web-metric-card">
              <span className="wm-label">Page Weight</span>
              <span className="wm-val mono">{result.sizeKB}</span>
            </div>

            <div className="web-metric-card">
              <span className="wm-label">Rating</span>
              <span className="wm-val">{result.rating}</span>
            </div>
          </div>

          {/* Phase Timings */}
          <div className="timings-breakdown">
            <h4>⏱️ Network Phase Timings</h4>
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