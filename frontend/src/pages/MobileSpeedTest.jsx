import React, { useState } from 'react';
import SEO from '../components/SEO';
import Speedometer from '../components/Speedometer';
import LiveSparkline from '../components/LiveSparkline';
import SpeedHistory from '../components/SpeedHistory';
import AdSlot from '../components/AdSlot';
import { getNetworkInfo, measureLatency, measureDownload, measureUpload } from '../utils/speedEngine';
import { startEngineSound, stopEngineSound, playCompletionSound } from '../utils/soundEffects';

export default function MobileSpeedTest() {
  const [testing, setTesting] = useState(false);
  const [testPhase, setTestPhase] = useState('IDLE');
  const [speedVal, setSpeedVal] = useState(0);
  const [results, setResults] = useState(null);
  const [sparklineData, setSparklineData] = useState([]);
  const [activeThemeColor, setActiveThemeColor] = useState('#00f2fe');

  const startTest = async () => {
    startEngineSound();
    setTesting(true);
    setResults(null);
    setSparklineData([0]);
    setTestPhase('FETCHING_IP');

    const networkData = await getNetworkInfo();
    setTestPhase('MEASURING_PING');
    const latencyData = await measureLatency();

    setTestPhase('MEASURING_DOWNLOAD');
    const downloadData = await measureDownload((currentMbps) => {
      setSpeedVal(currentMbps);
      setSparklineData((prev) => [...prev.slice(-35), currentMbps]);
    });

    setTestPhase('MEASURING_UPLOAD');
    const uploadData = await measureUpload((currentMbps) => {
      setSpeedVal(currentMbps);
      setSparklineData((prev) => [...prev.slice(-35), currentMbps]);
    });

    const finalResult = {
      timestamp: new Date().toISOString(),
      downloadMbps: downloadData.downloadMbps,
      uploadMbps: uploadData.uploadMbps,
      ping: latencyData.ping,
      jitter: latencyData.jitter,
      isp: networkData ? networkData.isp : 'Mobile Network'
    };

    stopEngineSound();
    playCompletionSound();
    setResults(finalResult);
    setTesting(false);
    setTestPhase('COMPLETED');
    setSpeedVal(downloadData.downloadMbps);
  };

  return (
    <>
      <SEO 
        title="Mobile Internet Speed Test — 4G LTE & 5G Cellular Analytics"
        description="Test mobile internet speed for Jazz 4G, Zong 4G, Telenor 4G, Ufone 4G & 5G cellular networks."
        keywords="mobile speed test, 4g speed test, 5g speed test, cellular speed check, mobile broadband test"
        canonical="/mobile-speed-test"
      />

      <div className="gaming-page-container">
        <AdSlot slotId="mobile-top-banner" type="banner" />

        <div className="page-header">
          <h1>📱 Mobile Internet <span className="gradient-text">Speed Test</span></h1>
          <p>Test 4G LTE & 5G cellular data speeds for Jazz, Zong, Telenor, Ufone & global mobile carriers</p>
        </div>

        <div className="glass-panel speed-arena">
          <Speedometer
            value={speedVal}
            max={200}
            unit="Mbps"
            label={testPhase === 'IDLE' ? 'READY' : testPhase === 'COMPLETED' ? 'TEST COMPLETED' : testPhase.replace('_', ' ')}
            isTesting={testing}
            onThemeChange={(col) => setActiveThemeColor(col)}
          />

          <div className="test-control">
            <button onClick={startTest} disabled={testing} className="btn-primary start-btn">
              {testing ? '⏳ Testing Mobile Network...' : '📱 Start Mobile Speed Test'}
            </button>
          </div>
        </div>

        <LiveSparkline 
          dataPoints={sparklineData} 
          maxVal={200} 
          color={activeThemeColor}
          label="Mobile Cellular Throughput Graph" 
        />

        <SpeedHistory currentResult={results} />

        {/* 4G LTE vs 5G Cellular Speed Guide */}
        <div className="glass-panel mobile-guide-card" style={{ marginTop: '2.5rem', padding: '2rem' }}>
          <h2>📱 Mobile Broadband: Understanding 4G LTE & 5G Performance Factors</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Cellular internet speeds depend heavily on environmental conditions, cellular carrier spectrum bands, tower congestion, and distance from the mobile basestation.
          </p>

          <div className="mobile-tips-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.4rem' }}>
            <div style={{ background: 'rgba(11, 15, 25, 0.5)', padding: '1.4rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <h3 style={{ color: 'var(--primary-cyan)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>📶 4G LTE vs. 5G NR</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                4G LTE typically delivers 15 to 60 Mbps with 25–45ms latency. 5G Sub-6GHz networks increase throughput to 150–500 Mbps, while mmWave 5G can exceed 1000 Mbps line-of-sight.
              </p>
            </div>

            <div style={{ background: 'rgba(11, 15, 25, 0.5)', padding: '1.4rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <h3 style={{ color: 'var(--neon-green)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🏢 Indoor Obstacles & Signal Penetration</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Concrete walls, metallic insulation, and double-glazed windows attenuate cellular radio frequencies. Positioning 4G/5G mobile routers near exterior windows boosts speed.
              </p>
            </div>

            <div style={{ background: 'rgba(11, 15, 25, 0.5)', padding: '1.4rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <h3 style={{ color: 'var(--sunset-orange)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>👥 Tower Load & Cell Congestion</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Unlike fiber optics, cellular towers share total radio frequency bandwidth among all actively connected smartphones in that geographical cell sector.
              </p>
            </div>
          </div>
        </div>

        <AdSlot slotId="mobile-bottom-banner" type="banner" />
      </div>
    </>
  );
}
