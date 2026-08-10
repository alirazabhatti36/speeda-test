import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import Speedometer from '../components/Speedometer';
import AdSlot from '../components/AdSlot';
import FAQSection from '../components/FAQSection';
import { getNetworkInfo, measureLatency, measureDownload, measureUpload } from '../utils/speedEngine';
import './Home.css';

const FAQS_LIST = [
  {
    q: 'How does Speeda Test 360 measure my internet speed?',
    a: 'Speeda Test 360 sends multi-stream encrypted HTTP requests directly between your browser and global high-speed edge CDN nodes (such as Cloudflare). It measures latency (ping), jitter, download throughput, and upload throughput using high-precision Web performance APIs.'
  },
  {
    q: 'What is a good Ping, Download, and Upload speed?',
    a: 'For smooth 4K video streaming and online gaming: Ping under 30ms is excellent, Download speed above 50 Mbps is ideal for families, and Upload speed above 15 Mbps ensures crisp video calls and fast file sharing.'
  },
  {
    q: 'Why does my speed test differ from my internet plan?',
    a: 'Speed test results can be impacted by Wi-Fi distance, router load, background app downloads, browser extensions, VPNs, or network congestion from your Internet Service Provider (ISP).'
  },
  {
    q: 'What is Jitter and why does it matter?',
    a: 'Jitter measures the stability of your network latency over time. Low jitter (under 5ms) ensures smooth video calls (Zoom/Teams) and lag-free online multiplayer gaming without rubber-banding.'
  },
  {
    q: 'Is Speeda Test 360 completely free?',
    a: 'Yes! Speeda Test 360 is 100% free with unlimited tests, zero registration, and complete privacy.'
  }
];

export default function Home() {
  const [networkInfo, setNetworkInfo] = useState(null);
  const [networkLoading, setNetworkLoading] = useState(true);

  // Test states
  const [status, setStatus] = useState('idle'); // idle | pinging | downloading | uploading | complete
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [testProgress, setTestProgress] = useState(0);

  // Results
  const [pingData, setPingData] = useState(null);
  const [downloadSpeed, setDownloadSpeed] = useState(null);
  const [uploadSpeed, setUploadSpeed] = useState(null);

  // Load network info on mount
  useEffect(() => {
    async function loadNetwork() {
      setNetworkLoading(true);
      const data = await getNetworkInfo();
      setNetworkInfo(data);
      setNetworkLoading(false);
    }
    loadNetwork();
  }, []);

  const runFullTest = async () => {
    setStatus('pinging');
    setCurrentSpeed(0);
    setTestProgress(5);
    setPingData(null);
    setDownloadSpeed(null);
    setUploadSpeed(null);

    // Step 1: Latency & Jitter
    const latency = await measureLatency();
    setPingData(latency);
    setTestProgress(20);

    // Step 2: Download Speed
    setStatus('downloading');
    const dlResult = await measureDownload((speed, progress) => {
      setCurrentSpeed(speed);
      setTestProgress(20 + Math.round(progress * 0.4));
    });
    setDownloadSpeed(dlResult.downloadMbps);

    // Step 3: Upload Speed
    setStatus('uploading');
    const ulResult = await measureUpload((speed, progress) => {
      setCurrentSpeed(speed);
      setTestProgress(60 + Math.round(progress * 0.4));
    });
    setUploadSpeed(ulResult.uploadMbps);

    // Step 4: Complete
    setStatus('complete');
    setCurrentSpeed(dlResult.downloadMbps);
    setTestProgress(100);
  };

  const getSpeedLabel = () => {
    if (status === 'pinging') return 'MEASURING LATENCY...';
    if (status === 'downloading') return 'TESTING DOWNLOAD...';
    if (status === 'uploading') return 'TESTING UPLOAD...';
    if (status === 'complete') return 'TEST COMPLETE';
    return 'READY FOR 360° TEST';
  };

  return (
    <>
      <SEO 
        title="Real-Time Internet Speed Test & Broadband Analytics"
        description="Free real-time internet speed test. Measure download speed, upload speed, ping latency, and jitter for PTCL, StormFiber, Nayatel, Cybernet, Transworld & global ISPs."
        keywords="internet speed test, speed test, wifi speed test, broadband speed test, ping test, download speed, upload speed, jitter test, PTCL speed test, StormFiber speed test, Nayatel speed test, Cybernet speed test"
        canonical="/"
        faqs={FAQS_LIST}
      />

      <div className="home-container">
        {/* Top AdSlot */}
        <AdSlot slotId="home-top-banner" type="banner" />

        {/* Hero Section */}
        <div className="hero-section page-header">
          <h1>
            ⚡ Speeda Test <span className="gradient-text">360</span>
          </h1>
          <p>Real-Time Internet Speed Test & 360° Broadband Analytics Engine</p>
        </div>

        {/* Network Detector Card */}
        <div className="network-panel glass-panel">
          {networkLoading ? (
            <div className="network-skeleton">🔍 Detecting network ISP & location...</div>
          ) : networkInfo ? (
            <div className="network-grid">
              <div className="network-item">
                <span className="net-icon">{networkInfo.ispLogo || '🌐'}</span>
                <div>
                  <span className="net-label">ISP Network</span>
                  <span className="net-value" style={{ color: networkInfo.ispColor }}>
                    {networkInfo.isp}
                  </span>
                </div>
              </div>

              <div className="network-item">
                <span className="net-icon">📍</span>
                <div>
                  <span className="net-label">Location</span>
                  <span className="net-value">{networkInfo.city}, {networkInfo.country}</span>
                </div>
              </div>

              <div className="network-item">
                <span className="net-icon">💻</span>
                <div>
                  <span className="net-label">Public IP</span>
                  <span className="net-value mono">{networkInfo.ip}</span>
                </div>
              </div>

              <div className="network-item">
                <span className="net-icon">📡</span>
                <div>
                  <span className="net-label">ASN Tag</span>
                  <span className="net-value mono">{networkInfo.asn}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="network-error">⚠️ Local network detected</div>
          )}
        </div>

        {/* Speedometer Test Arena */}
        <div className="speed-arena glass-panel">
          <Speedometer
            value={currentSpeed}
            max={status === 'uploading' ? 100 : 250}
            unit="Mbps"
            label={getSpeedLabel()}
            isTesting={status !== 'idle' && status !== 'complete'}
          />

          <div className="test-control">
            <button
              onClick={runFullTest}
              disabled={status !== 'idle' && status !== 'complete'}
              className="btn-primary start-btn"
            >
              {status === 'idle'
                ? '▶ Start 360° Speed Test'
                : status === 'complete'
                ? '🔄 Test Again'
                : `⏳ Testing (${testProgress}%)`}
            </button>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="metrics-grid">
          <div className="metric-card glass-panel">
            <div className="metric-icon-wrap icon-download">📥</div>
            <div className="metric-info">
              <span className="metric-title">Download</span>
              <div className="metric-val-group">
                <span className="metric-val mono">{downloadSpeed !== null ? downloadSpeed : '--'}</span>
                <span className="metric-unit">Mbps</span>
              </div>
              <small className="metric-rating">
                {downloadSpeed > 100 ? '🚀 Ultra Fast' : downloadSpeed > 40 ? '⚡ Fast' : downloadSpeed ? '🐌 Slow' : 'Ready'}
              </small>
            </div>
          </div>

          <div className="metric-card glass-panel">
            <div className="metric-icon-wrap icon-upload">📤</div>
            <div className="metric-info">
              <span className="metric-title">Upload</span>
              <div className="metric-val-group">
                <span className="metric-val mono">{uploadSpeed !== null ? uploadSpeed : '--'}</span>
                <span className="metric-unit">Mbps</span>
              </div>
              <small className="metric-rating">
                {uploadSpeed > 50 ? '🚀 Ultra Fast' : uploadSpeed > 15 ? '⚡ Good' : uploadSpeed ? '🐌 Slow' : 'Ready'}
              </small>
            </div>
          </div>

          <div className="metric-card glass-panel">
            <div className="metric-icon-wrap icon-ping">📶</div>
            <div className="metric-info">
              <span className="metric-title">Ping</span>
              <div className="metric-val-group">
                <span className="metric-val mono">{pingData ? pingData.ping : '--'}</span>
                <span className="metric-unit">ms</span>
              </div>
              <small className="metric-rating">
                {pingData && pingData.ping < 35 ? '🟢 Excellent' : pingData ? '🟡 Normal' : 'Ready'}
              </small>
            </div>
          </div>

          <div className="metric-card glass-panel">
            <div className="metric-icon-wrap icon-jitter">〰️</div>
            <div className="metric-info">
              <span className="metric-title">Jitter</span>
              <div className="metric-val-group">
                <span className="metric-val mono">{pingData ? pingData.jitter : '--'}</span>
                <span className="metric-unit">ms</span>
              </div>
              <small className="metric-rating">
                {pingData && pingData.jitter < 5 ? '🟢 Stable' : pingData ? '🟡 Variable' : 'Ready'}
              </small>
            </div>
          </div>
        </div>

        {/* In-Feed AdSlot */}
        <AdSlot slotId="home-mid-banner" type="banner" />

        {/* SEO Article & Content Guide */}
        <section className="seo-content-section glass-panel">
          <h2>🌐 Why Test Your Internet Speed with Speeda Test 360?</h2>
          <p>
            Speeda Test 360 is an advanced, 100% free broadband speed testing platform designed to give internet users real-time insights into their connection performance. Whether you use <strong>PTCL, StormFiber, Nayatel, Cybernet, Transworld, Wateen, WorldCall</strong>, or any mobile 4G/5G carrier, Speeda Test 360 accurately measures your download throughput, upload rate, ping latency, and jitter.
          </p>

          <div className="seo-article-grid">
            <article className="seo-card">
              <h3>📥 Download Speed (Mbps)</h3>
              <p>Download speed measures how quickly data transfers from the internet to your device. A download speed of 25+ Mbps is recommended for HD video streaming, while 100+ Mbps is ideal for 4K streaming and large file downloads.</p>
            </article>

            <article className="seo-card">
              <h3>📤 Upload Speed (Mbps)</h3>
              <p>Upload speed indicates how fast your device sends data to external servers. High upload speeds (20+ Mbps) are vital for video conferencing (Zoom, Google Meet, Teams), cloud backups, and live streaming.</p>
            </article>

            <article className="seo-card">
              <h3>📶 Ping & Latency (ms)</h3>
              <p>Ping measures network response time in milliseconds (ms). Lower ping (under 30ms) ensures instant responsiveness for online gaming, VoIP calls, and real-time multiplayer applications.</p>
            </article>

            <article className="seo-card">
              <h3>〰️ Network Jitter (ms)</h3>
              <p>Jitter measures the stability and variance of your ping over time. Low jitter (under 5ms) prevents buffering, voice dropouts, and sudden lag spikes during online activities.</p>
            </article>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <FAQSection />
      </div>
    </>
  );
}