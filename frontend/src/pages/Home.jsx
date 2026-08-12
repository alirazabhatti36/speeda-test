import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Speedometer from '../components/Speedometer';
import LiveSparkline from '../components/LiveSparkline';
import ShareResultCard from '../components/ShareResultCard';
import SpeedInterpretation from '../components/SpeedInterpretation';
import ComparePackage from '../components/ComparePackage';
import SpeedHistory from '../components/SpeedHistory';
import AdSlot from '../components/AdSlot';
import FAQSection from '../components/FAQSection';
import { getNetworkInfo, measureLatency, measureDownload, measureUpload } from '../utils/speedEngine';
import { startEngineSound, stopEngineSound, playCompletionSound } from '../utils/soundEffects';
import './Home.css';

const FAQS_LIST = [
  {
    q: 'How does Speeda Test 360 measure my global internet speed?',
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
    q: 'Is Speeda Test 360 completely free worldwide?',
    a: 'Yes! Speeda Test 360 is 100% free globally with unlimited tests, zero registration, and complete privacy.'
  }
];

const GLOBAL_RANKINGS = [
  { rank: 1, name: 'AT&T Fiber', country: '🇺🇸 USA', type: 'Symmetric FTTH', avgDownload: '940 Mbps', avgUpload: '935 Mbps', avgPing: '4 ms' },
  { rank: 2, name: 'Verizon Fios', country: '🇺🇸 USA', type: 'FTTH Fiber', avgDownload: '890 Mbps', avgUpload: '880 Mbps', avgPing: '5 ms' },
  { rank: 3, name: 'Etisalat eLife', country: '🇦🇪 UAE', type: 'FTTH Fiber', avgDownload: '500 Mbps', avgUpload: '250 Mbps', avgPing: '3 ms' },
  { rank: 4, name: 'Virgin Media Gig1', country: '🇬🇧 UK', type: 'DOCSIS 3.1', avgDownload: '1130 Mbps', avgUpload: '104 Mbps', avgPing: '12 ms' },
  { rank: 5, name: 'JioFiber 1G', country: '🇮🇳 India', type: 'FTTH Fiber', avgDownload: '880 Mbps', avgUpload: '850 Mbps', avgPing: '6 ms' }
];

const PAKISTAN_RANKINGS = [
  { rank: 1, name: 'Nayatel Fiber', country: '🇵🇰 Pakistan', type: 'FTTH Fiber', avgDownload: '58.4 Mbps', avgUpload: '48.2 Mbps', avgPing: '8 ms' },
  { rank: 2, name: 'StormFiber (Cybernet)', country: '🇵🇰 Pakistan', type: 'FTTH Fiber', avgDownload: '52.8 Mbps', avgUpload: '44.5 Mbps', avgPing: '10 ms' },
  { rank: 3, name: 'Transworld Home', country: '🇵🇰 Pakistan', type: 'Subsea FTTH', avgDownload: '49.1 Mbps', avgUpload: '42.0 Mbps', avgPing: '11 ms' },
  { rank: 4, name: 'PTCL Flash Fiber', country: '🇵🇰 Pakistan', type: 'GPON Fiber', avgDownload: '41.5 Mbps', avgUpload: '35.0 Mbps', avgPing: '14 ms' }
];

export default function Home() {
  const [networkInfo, setNetworkInfo] = useState(null);
  const [networkLoading, setNetworkLoading] = useState(true);

  // Test states
  const [status, setStatus] = useState('idle');
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [sparklineData, setSparklineData] = useState([]);
  const [activeThemeColor, setActiveThemeColor] = useState('#00f2fe');

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
    startEngineSound();
    setStatus('pinging');
    setCurrentSpeed(0);
    setSparklineData([0]);
    setPingData(null);
    setDownloadSpeed(null);
    setUploadSpeed(null);
    setCurrentResultObj(null);

    // Step 1: Latency & Jitter
    const latency = await measureLatency();
    setPingData(latency);

    // Step 2: Download Speed
    setStatus('downloading');
    const dlResult = await measureDownload((speed) => {
      setCurrentSpeed(speed);
      setSparklineData((prev) => [...prev.slice(-35), speed]);
    });
    setDownloadSpeed(dlResult.downloadMbps);

    // Step 3: Upload Speed
    setStatus('uploading');
    const ulResult = await measureUpload((speed) => {
      setCurrentSpeed(speed);
      setSparklineData((prev) => [...prev.slice(-35), speed]);
    });
    setUploadSpeed(ulResult.uploadMbps);

    // Step 4: Complete
    stopEngineSound();
    playCompletionSound();
    setStatus('complete');
    setCurrentSpeed(dlResult.downloadMbps);

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
        title="Speeda Test 360 — Free Internet Speed Test & Global ISP Analytics"
        description="Free internet speed test. Measure real download speed, upload speed, ping, and jitter worldwide. Compare speeds for Xfinity, AT&T, Verizon, BT, Etisalat, PTCL, StormFiber & Nayatel."
        keywords="speed test, internet speed test, free speed test, wifi speed test, global speed test, comcast speed test, att speed test, ptcl speed test, stormfiber speed test, Speeda Test 360"
        canonical="/"
      />

      <div className="home-container">
        {/* 1. ⚡ Internet Speed Test Hero Section */}
        <section className="hero-section text-center">
          <div className="page-header">
            <h1>Free Internet <span className="gradient-text">Speed Test</span></h1>
            <p>Check your real download speed, upload speed, ping & jitter in real-time</p>
            <div className="hero-trust-pills">
              <span>✓ Free</span>
              <span>✓ No Sign-up</span>
              <span>✓ Mobile Friendly</span>
            </div>
          </div>
        </section>

        {/* 2. Speedometer + [ START SPEED TEST ] */}
        <div className="glass-panel speed-arena">
          <Speedometer
            value={currentSpeed}
            max={200}
            unit="Mbps"
            label={getSpeedLabel()}
            isTesting={status !== 'idle' && status !== 'complete'}
            onThemeChange={(col) => setActiveThemeColor(col)}
          />

          <div className="test-control">
            <button
              onClick={runFullTest}
              disabled={status !== 'idle' && status !== 'complete'}
              className="btn-primary start-btn"
            >
              {status === 'idle' || status === 'complete' ? '▶ START SPEED TEST' : '⏳ Testing Speed...'}
            </button>
          </div>
        </div>

        {/* Network & ISP Info Bar */}
        <div className="glass-panel network-panel">
          {networkLoading ? (
            <div className="network-skeleton">⏳ Detecting your broadband provider & local IP...</div>
          ) : (
            <div className="network-grid">
              <div className="network-item">
                <span className="net-icon">{networkInfo?.ispLogo || '🌐'}</span>
                <div className="net-text-wrap">
                  <span className="net-label">ISP Network</span>
                  <span className="net-value" style={{ color: networkInfo?.ispColor || '#38bdf8' }} title={networkInfo?.ispRaw}>
                    {networkInfo?.isp || 'Broadband ISP'}
                  </span>
                </div>
              </div>

              <div className="network-item">
                <span className="net-icon">📍</span>
                <div className="net-text-wrap">
                  <span className="net-label">Location</span>
                  <span className="net-value" title={`${networkInfo?.city}, ${networkInfo?.country}`}>
                    {networkInfo?.city || 'Local City'}, {networkInfo?.country || 'Country'} {networkInfo?.countryFlag || ''}
                  </span>
                </div>
              </div>

              <div className="network-item">
                <span className="net-icon">💻</span>
                <div className="net-text-wrap">
                  <span className="net-label">Your Public IP</span>
                  <span className="net-value mono">{networkInfo?.ip || '127.0.0.1'}</span>
                </div>
              </div>

              <div className="network-item">
                <span className="net-icon">🛡️</span>
                <div className="net-text-wrap">
                  <span className="net-label">ASN Route</span>
                  <span className="net-value mono">{networkInfo?.asn || 'AS-LOCAL'}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. Download / Upload / Ping / Jitter Metrics Grid */}
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

        {/* Live Real-Time Throughput Graph */}
        <LiveSparkline 
          dataPoints={sparklineData} 
          maxVal={200} 
          color={activeThemeColor}
          label="Real-Time Network Throughput Graph" 
        />

        {/* Shareable Speed Result Card */}
        {currentResultObj && (
          <ShareResultCard result={currentResultObj} networkInfo={networkInfo} />
        )}

        {/* 4. Sponsor Space / AdSlot */}
        <AdSlot slotId="home-after-results-banner" type="banner" />

        {/* 5. "Is my internet good?" Interpretation */}
        {currentResultObj && (
          <SpeedInterpretation 
            download={currentResultObj.downloadMbps}
            upload={currentResultObj.uploadMbps}
            ping={currentResultObj.ping}
            jitter={currentResultObj.jitter}
          />
        )}

        {/* 6. Package Delivery Calculator */}
        {currentResultObj && (
          <ComparePackage 
            currentDownload={currentResultObj.downloadMbps} 
            currentIsp={networkInfo?.isp || ''} 
          />
        )}

        {/* 7. Speed History */}
        <SpeedHistory currentResult={currentResultObj} />

        {/* 8. Gaming / Streaming / Mobile Quick Tests Grid */}
        <div className="glass-panel section-card">
          <h3>⚡ Specialized Speed & Performance Tests</h3>
          <p className="section-sub">Select a dedicated testing tool for your specific online activity:</p>

          <div className="quick-tools-grid">
            <Link to="/gaming-speed-test" className="tool-box">
              <span className="tb-icon">🎮</span>
              <div>
                <h4>Gaming Speed & Ping Test</h4>
                <p>Test ultra-low ping latency for Valorant, PUBG & CS2</p>
              </div>
            </Link>

            <Link to="/streaming-speed-test" className="tool-box">
              <span className="tb-icon">📺</span>
              <div>
                <h4>4K Video Streaming Test</h4>
                <p>Verify YouTube 4K & Netflix Ultra HD buffering capacity</p>
              </div>
            </Link>

            <Link to="/mobile-speed-test" className="tool-box">
              <span className="tb-icon">📱</span>
              <div>
                <h4>Mobile 4G & 5G Speed Test</h4>
                <p>Test mobile data throughput for Jazz, Zong & 5G networks</p>
              </div>
            </Link>

            <Link to="/website-test" className="tool-box">
              <span className="tb-icon">🌐</span>
              <div>
                <h4>Website Speed Analyzer</h4>
                <p>Test website load times, page weight & response codes</p>
              </div>
            </Link>
          </div>
        </div>

        {/* 9. 🌍 Global ISP Rankings */}
        <div className="glass-panel section-card">
          <div className="sec-head-row">
            <h3>🌍 Global ISP Speed Rankings</h3>
            <Link to="/isp-rankings" className="view-all-link">View Full Rankings →</Link>
          </div>
          
          <div className="table-responsive">
            <table className="home-rank-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>ISP</th>
                  <th>Country</th>
                  <th>Download</th>
                  <th>Upload</th>
                  <th>Ping</th>
                </tr>
              </thead>
              <tbody>
                {GLOBAL_RANKINGS.map((item) => (
                  <tr key={item.rank}>
                    <td className="mono font-bold text-cyan">#{item.rank}</td>
                    <td className="font-bold text-white">{item.name}</td>
                    <td>{item.country}</td>
                    <td className="mono text-cyan font-bold">{item.avgDownload}</td>
                    <td className="mono text-green font-bold">{item.avgUpload}</td>
                    <td className="mono text-orange">{item.avgPing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 10. 🇵🇰 Pakistan ISP Rankings */}
        <div className="glass-panel section-card">
          <div className="sec-head-row">
            <h3>🇵🇰 Pakistan Broadband ISP Rankings</h3>
            <Link to="/isp-rankings" className="view-all-link">View Full Rankings →</Link>
          </div>

          <div className="table-responsive">
            <table className="home-rank-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Broadband ISP</th>
                  <th>Download</th>
                  <th>Upload</th>
                  <th>Ping</th>
                </tr>
              </thead>
              <tbody>
                {PAKISTAN_RANKINGS.map((item) => (
                  <tr key={item.rank}>
                    <td className="mono font-bold text-cyan">#{item.rank}</td>
                    <td className="font-bold text-white">{item.name}</td>
                    <td className="mono text-cyan font-bold">{item.avgDownload}</td>
                    <td className="mono text-green font-bold">{item.avgUpload}</td>
                    <td className="mono text-orange">{item.avgPing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 11. 🛠 Network Tools Directory */}
        <div className="glass-panel section-card">
          <h3>🛠️ Free Network & Connectivity Tools</h3>
          <div className="tools-dir-grid">
            <Link to="/ping-test" className="dir-item">🛰️ Live Ping Test</Link>
            <Link to="/ip-lookup" className="dir-item">🔍 Public IP & ISP Lookup</Link>
            <Link to="/how-speed-test-works" className="dir-item">🔬 Test Methodology & Transparency</Link>
            <Link to="/guide" className="dir-item">📖 Speed Optimization Guide</Link>
          </div>
        </div>

        {/* 12. 📚 Internet Guides & FAQs */}
        <div className="glass-panel seo-content-section">
          <h2>⚡ Global Broadband Speed & Network Analytics</h2>
          <p>
            Welcome to <strong>Speeda Test 360</strong>, the premier global real-time internet speed test application. Whether you are running a Comcast Xfinity speed check in New York, testing BT Broadband in London, checking Etisalat eLife in Dubai, Jio 5G in India, or testing PTCL/StormFiber/Nayatel in Pakistan, Speeda Test 360 delivers instant, unthrottled performance measurements.
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