import React, { useState } from 'react';
import SEO from '../components/SEO';
import Speedometer from '../components/Speedometer';
import LiveSparkline from '../components/LiveSparkline';
import SpeedHistory from '../components/SpeedHistory';
import AdSlot from '../components/AdSlot';
import { getNetworkInfo, measureLatency, measureDownload, measureUpload } from '../utils/speedEngine';
import { startEngineSound, stopEngineSound, playCompletionSound } from '../utils/soundEffects';
import './GamingSpeedTest.css';

export default function GamingSpeedTest() {
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

    // Calculate Gaming Health Score (0 - 100)
    let gamingScore = 100;
    if (latencyData.ping > 80) gamingScore -= 40;
    else if (latencyData.ping > 40) gamingScore -= 20;
    else if (latencyData.ping > 25) gamingScore -= 10;

    if (latencyData.jitter > 10) gamingScore -= 20;
    else if (latencyData.jitter > 5) gamingScore -= 10;

    const finalResult = {
      timestamp: new Date().toISOString(),
      downloadMbps: downloadData.downloadMbps,
      uploadMbps: uploadData.uploadMbps,
      ping: latencyData.ping,
      jitter: latencyData.jitter,
      isp: networkData ? networkData.isp : 'Local ISP',
      gamingScore: Math.max(gamingScore, 30)
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
        title="Gaming Speed Test & Ping Latency Analyzer — Valorant, PUBG, CS2"
        description="Dedicated gaming speed test. Measure ultra-low ping latency, jitter, packet stability, and bufferbloat for online gaming."
        keywords="gaming speed test, ping test gaming, valorant ping test, pubg ping test, cs2 speed test, packet loss test"
        canonical="/gaming-speed-test"
      />

      <div className="gaming-page-container">
        <AdSlot slotId="gaming-top-banner" type="banner" />

        <div className="page-header">
          <h1>🎮 Gaming Speed & <span className="gradient-text">Ping Test</span></h1>
          <p>Ultra-fast latency, jitter & bufferbloat measurement for esports & online multiplayer games</p>
        </div>

        {/* Speedometer Tool */}
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
              {testing ? '⏳ Analyzing Gaming Latency...' : '🎮 Start Gaming Test'}
            </button>
          </div>
        </div>

        {/* Live Real-Time Throughput Graph */}
        <LiveSparkline 
          dataPoints={sparklineData} 
          maxVal={200} 
          color={activeThemeColor}
          label="Gaming Network Latency & Speed Graph" 
        />

        {/* Gaming Scorecard */}
        {results && (
          <div className="glass-panel gaming-scorecard">
            <div className="score-badge-box">
              <span className="score-num mono">{results.gamingScore}</span>
              <span className="score-max">/ 100</span>
              <span className="score-lbl">Gaming Index</span>
            </div>

            <div className="game-status-grid">
              <div className="game-item-card">
                <span className="g-title">🎮 Valorant (Bahrain/Dubai)</span>
                <span className="g-status mono text-cyan">{results.ping < 30 ? 'Sub-30ms (Pro Competitive)' : 'Playable'}</span>
              </div>

              <div className="game-item-card">
                <span className="g-title">🎮 PUBG PC & Mobile</span>
                <span className="g-status mono text-green">{results.ping < 40 ? 'Smooth (No Lag)' : 'Moderate Ping'}</span>
              </div>

              <div className="game-item-card">
                <span className="g-title">🎮 Counter-Strike 2 (CS2)</span>
                <span className="g-status mono text-cyan">{results.ping < 25 ? 'Ultra Low Ping' : 'Normal Latency'}</span>
              </div>

              <div className="game-item-card">
                <span className="g-title">🎮 Fortnite & Apex Legends</span>
                <span className="g-status mono text-purple">{results.jitter < 5 ? 'Stable Connection' : 'High Jitter Warning'}</span>
              </div>
            </div>
          </div>
        )}

        <SpeedHistory currentResult={results} />

        {/* Esports Ping Optimization & Bufferbloat Guide */}
        <div className="glass-panel gaming-guide-card" style={{ marginTop: '2.5rem', padding: '2rem' }}>
          <h2>🎮 Pro Esports Gaming: How to Eliminate Ping Spikes & Packet Loss</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            In competitive first-person shooters (Valorant, CS2, Rainbow Six Siege) and battle royales (PUBG, Apex Legends, Fortnite), high ping and jitter directly cause hit-registration delays and rubber-banding.
          </p>

          <div className="game-tips-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.4rem' }}>
            <div style={{ background: 'rgba(11, 15, 25, 0.5)', padding: '1.4rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <h3 style={{ color: 'var(--primary-cyan)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🔌 Switch from Wi-Fi to Ethernet</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Wi-Fi is vulnerable to radio interference, wall attenuation, and packet collisions. A Cat6 Ethernet cable delivers a rock-solid, jitter-free connection with consistent sub-1ms router latency.
              </p>
            </div>

            <div style={{ background: 'rgba(11, 15, 25, 0.5)', padding: '1.4rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <h3 style={{ color: 'var(--neon-green)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>📉 Fix Bufferbloat with Smart Queuing</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Bufferbloat occurs when background downloads saturate your router queue, causing ping spikes from 20ms to 200ms. Enable SQM (Smart Queue Management) or Cake QoS in your router settings.
              </p>
            </div>

            <div style={{ background: 'rgba(11, 15, 25, 0.5)', padding: '1.4rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <h3 style={{ color: 'var(--sunset-orange)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🎯 Choose Regional Matchmaking Servers</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Connect to game servers geographically closest to your physical location (e.g. Middle East Bahrain/Dubai, Singapore, or Frankfurt) to minimize light-in-fiber transit distance.
              </p>
            </div>
          </div>
        </div>

        <AdSlot slotId="gaming-bottom-banner" type="banner" />
      </div>
    </>
  );
}
