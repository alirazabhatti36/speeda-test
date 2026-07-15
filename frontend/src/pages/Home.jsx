import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import './Home.css';

function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [networkInfo, setNetworkInfo] = useState(null);
  const [networkLoading, setNetworkLoading] = useState(true);

  // Fetch network info when component loads
  useEffect(() => {
    const fetchNetworkInfo = async () => {
      try {
        console.log('🔍 Fetching network info...');
        const response = await fetch('http://localhost:5000/api/network-info');
        const data = await response.json();
        console.log('📡 Network data received:', data);
        
        if (data.error) {
          console.error('Network info error:', data.error);
        } else {
          setNetworkInfo(data);
        }
      } catch (error) {
        console.error('❌ Failed to fetch network info:', error);
      } finally {
        setNetworkLoading(false);
      }
    };
    fetchNetworkInfo();
  }, []);

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

  // ISP Logo mapping for display
  const getIspLogo = (isp) => {
    const logos = {
      'PTCL': '🔵',
      'Pakistan Telecommunication company limited': '🔵',
      'Pakistan Telecommunication Company Limited': '🔵',
      'Storm Fiber': '⚡',
      'StormFiber': '⚡',
      'Supernet': '🟣',
      'Supernet Limited': '🟣',
      'Nayatel': '🟢',
      'Cybernet': '🟠',
      'Cyber Internet Services': '🟠',
      'WorldCall': '📡',
      'Wateen': '📶',
      'Multinet': '🌐',
      'Fiberlink': '🔗',
      'Comsats': '🛰️',
      'Transworld': '🌍',
      'DHA Cable': '📺',
      'Optix': '💡',
      'Brain Tel': '🧠',
      'Root Internet': '🌱'
    };
    return logos[isp] || '🌐';
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

          {/* Network Information Display */}
          {networkLoading ? (
            <div className="network-loading">🔍 Detecting your network...</div>
          ) : networkInfo ? (
            <div className="network-info">
              <div className="network-card">
                <span className="network-label">🌐 Network Provider</span>
                <span className="network-value">
                  <span className="isp-logo">{getIspLogo(networkInfo.isp)}</span>
                  {networkInfo.isp || 'Unknown'}
                </span>
              </div>
              <div className="network-card">
                <span className="network-label">🏢 Organization</span>
                <span className="network-value">{networkInfo.organization || 'Unknown'}</span>
              </div>
              <div className="network-card">
                <span className="network-label">📍 Location</span>
                <span className="network-value">{networkInfo.city || 'Unknown'}, {networkInfo.country || 'Unknown'}</span>
              </div>
              <div className="network-card">
                <span className="network-label">📡 ASN</span>
                <span className="network-value">{networkInfo.asn || 'N/A'}</span>
              </div>
            </div>
          ) : (
            <div className="network-error">⚠️ Could not detect network information</div>
          )}
          
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