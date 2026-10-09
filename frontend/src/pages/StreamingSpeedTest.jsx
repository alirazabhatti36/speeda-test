import React, { useState } from 'react';
import SEO from '../components/SEO';
import Speedometer from '../components/Speedometer';
import LiveSparkline from '../components/LiveSparkline';
import SpeedHistory from '../components/SpeedHistory';
import AdSlot from '../components/AdSlot';
import { getNetworkInfo, measureLatency, measureDownload, measureUpload } from '../utils/speedEngine';
import { startEngineSound, stopEngineSound, playCompletionSound } from '../utils/soundEffects';

export default function StreamingSpeedTest() {
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
      isp: networkData ? networkData.isp : 'Local ISP'
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
        title="Streaming Speed Test — YouTube 4K, Netflix & Video Call Readiness"
        description="Test your internet download speed for 4K Ultra HD video streaming, Netflix, YouTube 60fps, and Zoom meetings."
        keywords="streaming speed test, netflix speed test, 4k video speed test, youtube 4k test, video call speed check"
        canonical="/streaming-speed-test"
      />

      <div className="gaming-page-container">
        <AdSlot slotId="stream-top-banner" type="banner" />

        <div className="page-header">
          <h1>📺 Video Streaming <span className="gradient-text">Speed Test</span></h1>
          <p>Check if your internet connection can stream 4K Ultra HD, Netflix 1080p, and HD Zoom calls without buffering</p>
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
              {testing ? '⏳ Testing Video Streaming Speed...' : '📺 Start Streaming Test'}
            </button>
          </div>
        </div>

        <LiveSparkline 
          dataPoints={sparklineData} 
          maxVal={200} 
          color={activeThemeColor}
          label="Streaming Speed Graph" 
        />

        {results && (
          <div className="glass-panel gaming-scorecard">
            <div className="game-status-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', width: '100%' }}>
              <div className="game-item-card">
                <span className="g-title">📺 Netflix 4K UHD (25+ Mbps)</span>
                <span className="g-status mono text-green">{results.downloadMbps >= 25 ? '✅ Ready (Zero Buffering)' : '❌ Insufficient Speed'}</span>
              </div>

              <div className="game-item-card">
                <span className="g-title">▶️ YouTube 4K 60fps (20+ Mbps)</span>
                <span className="g-status mono text-cyan">{results.downloadMbps >= 20 ? '✅ 4K Ultra HD Smooth' : '❌ Drops to 1080p'}</span>
              </div>

              <div className="game-item-card">
                <span className="g-title">📹 Zoom & Google Meet HD (5+ Mbps)</span>
                <span className="g-status mono text-green">{results.downloadMbps >= 5 && results.uploadMbps >= 3 ? '✅ HD Video Calls Smooth' : '⚠️ Low Speed'}</span>
              </div>

              <div className="game-item-card">
                <span className="g-title">📡 Twitch 1080p 60fps Broadcast</span>
                <span className="g-status mono text-purple">{results.uploadMbps >= 8 ? '✅ 6000 Kbps Bitrate Capable' : '⚠️ Low Upload Speed'}</span>
              </div>
            </div>
          </div>
        )}

        <SpeedHistory currentResult={results} />

        {/* 4K Ultra HD Streaming & Bitrate Guide */}
        <div className="glass-panel stream-guide-card" style={{ marginTop: '2.5rem', padding: '2rem' }}>
          <h2>📺 4K Video Streaming Requirements: Netflix, YouTube & Live Broadcasting</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Streaming video at high resolutions requires constant, sustained download throughput without packet drops. If bandwidth drops below the video bitrate buffer threshold, media players downscale resolution or trigger buffering wheels.
          </p>

          <div className="stream-tips-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.4rem' }}>
            <div style={{ background: 'rgba(11, 15, 25, 0.5)', padding: '1.4rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <h3 style={{ color: 'var(--neon-green)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🎬 Netflix 4K Ultra HD (25 Mbps)</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Netflix recommends a steady 25 Mbps connection per stream for 4K UHD content with Dolby Vision and Dolby Atmos audio streams.
              </p>
            </div>

            <div style={{ background: 'rgba(11, 15, 25, 0.5)', padding: '1.4rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <h3 style={{ color: 'var(--primary-cyan)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>▶️ YouTube 4K 60fps (20 Mbps)</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                YouTube uses efficient VP9 and AV1 compression codecs. A stable 20 Mbps download stream prevents stutter and keeps video at crisp 2160p 60fps.
              </p>
            </div>

            <div style={{ background: 'rgba(11, 15, 25, 0.5)', padding: '1.4rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <h3 style={{ color: 'var(--neon-purple)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>📡 Twitch / YouTube Live Upload (8 Mbps)</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                For live creators broadcasting 1080p 60fps at a 6000–8000 Kbps video bitrate, a consistent upload speed of at least 15 Mbps ensures head-room against frame drops.
              </p>
            </div>
          </div>
        </div>

        <AdSlot slotId="stream-bottom-banner" type="banner" />
      </div>
    </>
  );
}
