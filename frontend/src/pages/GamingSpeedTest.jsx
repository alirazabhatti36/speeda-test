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
              {testing ? '⏳ Analyzing Gaming Latency...' : '🎮 Start Gaming Speed Test'}
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

        <AdSlot slotId="gaming-bottom-banner" type="banner" />
      </div>
    </>
  );
}
