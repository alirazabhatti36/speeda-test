import { useState } from 'react';
import SEO from '../components/SEO';
import './Home.css';

function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const startTest = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/speedtest');
      if (!response.ok) throw new Error('Server error');
      const data = await response.json();
      if (data.error) throw new Error(data.message);
      setResult(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Internet Speed Test"
        description="Test your internet speed with AI-powered accuracy. Free download, upload, and ping test with smart termination technology."
        canonical="/"
      />
      
      <div className="page-container">
        <div className="speed-test-section">
          <h1>⚡ Speeda Test</h1>
          <p className="tagline">The Real Speed Test — Accurate. Fast. AI-Powered.</p>
          
          <button onClick={startTest} disabled={loading} className="test-btn">
            {loading ? '⏳ Testing...' : '▶ Start Speed Test'}
          </button>

          {error && <div className="error-msg">❌ {error}</div>}

          {result && (
            <>
              <div className="results-grid">
                <div className="result-card">
                  <h3>📥 Download</h3>
                  <p>{result.download} <span>Mbps</span></p>
                  <small>{result.download > 100 ? '🚀 Excellent' : result.download > 50 ? '⚡ Good' : '🐌 Slow'}</small>
                </div>
                <div className="result-card">
                  <h3>📤 Upload</h3>
                  <p>{result.upload} <span>Mbps</span></p>
                  <small>{result.upload > 50 ? '🚀 Excellent' : result.upload > 20 ? '⚡ Good' : '🐌 Slow'}</small>
                </div>
                <div className="result-card">
                  <h3>📶 Ping</h3>
                  <p>{result.ping} <span>ms</span></p>
                  <small>{result.ping < 30 ? '🟢 Excellent' : result.ping < 60 ? '🟡 Good' : '🔴 Poor'}</small>
                </div>
              </div>
              
              <div className="info-bar">
                <span>⏱️ {new Date(result.timestamp).toLocaleTimeString()}</span>
                <span>🧠 AI {result.terminated ? 'Early' : 'Full'}</span>
                <span>📊 {result.samplesUsed} samples</span>
                <span>⚡ {result.testDuration}s</span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;