import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Speedometer from '../components/Speedometer';
import SpeedInterpretation from '../components/SpeedInterpretation';
import ComparePackage from '../components/ComparePackage';
import SpeedHistory from '../components/SpeedHistory';
import AdSlot from '../components/AdSlot';
import FAQSection from '../components/FAQSection';
import { getNetworkInfo, measureLatency, measureDownload, measureUpload } from '../utils/speedEngine';
import './Home.css';

const FAQS_LIST = [
  {
    q: 'How does Speeda Test 360 measure my internet speed?',
    a: 'Speeda Test 360 sends multi-stream encrypted HTTP requests directly between your browser and global high-speed edge CDN nodes. It measures latency (ping), jitter, download throughput, and upload throughput using high-precision Web performance APIs.'
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
  const [status, setStatus] = useState('idle');
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [testProgress, setTestProgress] = useState(0);

  // Results
  const [pingData, setPingData] = useState(null);
  const [downloadSpeed, setDownloadSpeed] = useState(null);
  const [uploadSpeed, setUploadSpeed] = useState(null);
  const [currentResultObj, setCurrentResultObj] = useState(null);

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
    setCurrentResultObj(null);

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

    setCurrentResultObj({
      downloadMbps: dlResult.downloadMbps,
      uploadMbps: ulResult.uploadMbps,
      ping: latency.ping,
      jitter: latency.jitter,
      isp: networkInfo ? networkInfo.isp : 'Local ISP'
    });
  };

  const getSpeedLabel = () => {
    if (status === 'pinging') return 'MEASURING LATENCY...';
    if (status === 'downloading') return 'TESTING DOWNLOAD...';
    if (status === 'uploading') return 'TESTING UPLOAD...';
    if (status === 'complete') return 'TEST COMPLETE';
    return 'READY FOR SPEED TEST';
  };

  return (
    <>
      <SEO 
        title="Speeda Test 360 — Free Internet Speed Test & ISP Network Analytics"
        description="Free internet speed test. Measure real download speed, upload speed, ping, and jitter. Compare speeds for PTCL, StormFiber, Nayatel, Transworld, Jazz & Zong."
        keywords="speed test, internet speed test, free speed test, wifi speed test, ptcl speed test, stormfiber speed test, nayatel speed test, transworld speed test, jazz speed test, zong speed test, Speeda Test 360"
        canonical="/"
      />

      <div className="home-container">
        <AdSlot slotId="home-top-banner" type="banner" />

        {/* Hero Section */}
        <section className="hero-section text-center">
          <div className="page-header">
            <h1>Free Internet <span className="gradient-text">Speed Test</span></h1>
            <p>Check your real download speed, upload speed, ping & jitter in real-time</p>
            <div className="hero-trust-pills">
              <span>✓ 100% Free</span>
              <span>✓ No Sign-up Required</span>
              <span>✓ Mobile & Desktop Friendly</span>
            </div>
          </div>
        </section>

        {/* Network & ISP Info Bar */}
        <div className="glass-panel network-panel">
          {networkLoading ? (
            <div className="network-skeleton">⏳ Detecting your broadband provider & local IP...</div>
          ) : (
            <div className="network-grid">
              <div className="network-item">
                <span className="net-icon">{networkInfo?.ispLogo || '🌐'}</span>
                <div>
                  <span className="net-label">ISP Network</span>
                  <span className="net-value" style={{ color: networkInfo?.ispColor || '#38bdf8' }}>
                    {networkInfo?.isp || 'Broadband ISP'}
                  </span>
                </div>
              </div>

              <div className="network-item">
                <span className="net-icon">📍</span>
                <div>
                  <span className="net-label">Location</span>
                  <span className="net-value">
                    {networkInfo?.city || 'Local City'}, {networkInfo?.country || 'Country'} {networkInfo?.countryFlag || ''}
                  </span>
                </div>
              </div>

              <div className="network-item">
                <span className="net-icon">💻</span>
                <div>
                  <span className="net-label">Your Public IP</span>
                  <span className="net-value mono">{networkInfo?.ip || '127.0.0.1'}</span>
                </div>
              </div>

              <div className="network-item">
                <span className="net-icon">🛡️</span>
                <div>
                  <span className="net-label">ASN Route</span>
                  <span className="net-value mono">{networkInfo?.asn || 'AS-LOCAL'}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Speedometer Test Arena */}
        <div className="glass-panel speed-arena">
          <Speedometer
            value={currentSpeed}
            max={200}
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
              {status === 'idle' || status === 'complete' ? '▶ Start Speed Test' : '⏳ Testing Speed...'}
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="metrics-grid">
          <div className="glass-panel metric-card">
            <div className="metric-icon-wrap icon-download">⬇️</div>
            <div>
              <span className="metric-title">Download</span>
              <div className="metric-val-group">
                <span className="metric-val mono">{downloadSpeed !== null ? downloadSpeed : '--'}</span>
                <span className="metric-unit">Mbps</span>
              </div>
              <span className="metric-rating">{downloadSpeed ? (downloadSpeed > 40 ? '🚀 Fast' : '🟡 Moderate') : 'Pending Test'}</span>
            </div>
          </div>

          <div className="glass-panel metric-card">
            <div className="metric-icon-wrap icon-upload">⬆️</div>
            <div>
              <span className="metric-title">Upload</span>
              <div className="metric-val-group">
                <span className="metric-val mono">{uploadSpeed !== null ? uploadSpeed : '--'}</span>
                <span className="metric-unit">Mbps</span>
              </div>
              <span className="metric-rating">{uploadSpeed ? (uploadSpeed > 15 ? '⚡ High Speed' : '🟢 Standard') : 'Pending Test'}</span>
            </div>
          </div>

          <div className="glass-panel metric-card">
            <div className="metric-icon-wrap icon-ping">⏱️</div>
            <div>
              <span className="metric-title">Ping Latency</span>
              <div className="metric-val-group">
                <span className="metric-val mono">{pingData ? pingData.ping : '--'}</span>
                <span className="metric-unit">ms</span>
              </div>
              <span className="metric-rating">{pingData ? (pingData.ping < 30 ? '🎮 Ultra Low Ping' : '🟡 Fair Ping') : 'Pending Test'}</span>
            </div>
          </div>

          <div className="glass-panel metric-card">
            <div className="metric-icon-wrap icon-jitter">📶</div>
            <div>
              <span className="metric-title">Jitter</span>
              <div className="metric-val-group">
                <span className="metric-val mono">{pingData ? pingData.jitter : '--'}</span>
                <span className="metric-unit">ms</span>
              </div>
              <span className="metric-rating">{pingData ? (pingData.jitter < 5 ? '🟢 Super Stable' : '🟡 Moderate') : 'Pending Test'}</span>
            </div>
          </div>
        </div>

        {/* Results Interpretation, Package Comparison & History */}
        {currentResultObj && (
          <>
            <SpeedInterpretation 
              download={currentResultObj.downloadMbps}
              upload={currentResultObj.uploadMbps}
              ping={currentResultObj.ping}
              jitter={currentResultObj.jitter}
            />
            <ComparePackage 
              currentDownload={currentResultObj.downloadMbps} 
              currentIsp={networkInfo?.isp || ''} 
            />
          </>
        )}

        <SpeedHistory currentResult={currentResultObj} />

        {/* Quick Links Navigation for ISP & City Pages */}
        <div className="glass-panel quick-links-card">
          <h3>🇵🇰 Pakistan ISP & City Speed Test Directory</h3>
          <p className="ql-desc">Select your specific internet provider or city for localized speed benchmarks:</p>
          
          <div className="ql-section">
            <h4>Broadband ISPs:</h4>
            <div className="ql-grid">
              <Link to="/ptcl-speed-test">🔵 PTCL Speed Test</Link>
              <Link to="/stormfiber-speed-test">⚡ StormFiber Speed Test</Link>
              <Link to="/nayatel-speed-test">🟢 Nayatel Speed Test</Link>
              <Link to="/transworld-speed-test">🌍 Transworld Speed Test</Link>
              <Link to="/jazz-speed-test">📶 Jazz 4G Speed Test</Link>
              <Link to="/zong-speed-test">🟢 Zong 4G Speed Test</Link>
              <Link to="/isp-rankings">🏆 Pakistan ISP Rankings</Link>
            </div>
          </div>

          <div className="ql-section">
            <h4>City Speed Tests:</h4>
            <div className="ql-grid">
              <Link to="/internet-speed-test-lahore">📍 Lahore Speed Test</Link>
              <Link to="/internet-speed-test-karachi">📍 Karachi Speed Test</Link>
              <Link to="/internet-speed-test-islamabad">📍 Islamabad Speed Test</Link>
              <Link to="/internet-speed-test-rawalpindi">📍 Rawalpindi Speed Test</Link>
              <Link to="/internet-speed-test-faisalabad">📍 Faisalabad Speed Test</Link>
            </div>
          </div>
        </div>

        {/* SEO Educational Content Section */}
        <div className="glass-panel seo-content-section">
          <h2>⚡ Comprehensive Broadband Speed & Network Diagnostics</h2>
          <p>
            Welcome to <strong>Speeda Test 360</strong>, Pakistan’s leading free real-time internet speed test application. Whether you are running a PTCL Flash Fiber speed check, testing StormFiber gaming ping, checking Nayatel FTTH upload throughput, or testing Jazz/Zong 4G LTE mobile data, Speeda Test 360 delivers instant, unthrottled performance measurements.
          </p>

          <div className="seo-article-grid">
            <div className="seo-card">
              <h3>📡 1. Why Test Download Speed?</h3>
              <p>
                Download speed dictates how fast your device fetches web pages, 4K streaming video, and large software updates from remote servers.
              </p>
            </div>

            <div className="seo-card">
              <h3>⬆️ 2. Importance of Upload Speed</h3>
              <p>
                Upload speed determines how smoothly you transmit video during Zoom HD calls, stream live to Twitch, or back up files to cloud storage.
              </p>
            </div>

            <div className="seo-card">
              <h3>🎮 3. Ping Latency & Esports Gaming</h3>
              <p>
                Ping measures network responsiveness in milliseconds (ms). Low ping under 30ms is essential for lag-free multiplayer gaming in Valorant, CS2, and PUBG.
              </p>
            </div>

            <div className="seo-card">
              <h3>📶 4. Understanding Jitter & Bufferbloat</h3>
              <p>
                Jitter reflects variance in packet delivery time. Low jitter ensures stable, uninterrupted VoIP calls and prevents sudden ping spikes.
              </p>
            </div>
          </div>
        </div>

        <FAQSection faqs={FAQS_LIST} />

        <AdSlot slotId="home-bottom-banner" type="banner" />
      </div>
    </>
  );
}