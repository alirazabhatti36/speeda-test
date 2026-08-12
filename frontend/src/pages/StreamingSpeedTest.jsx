import React, { useState } from 'react';
import SEO from '../components/SEO';
import Speedometer from '../components/Speedometer';
import SpeedHistory from '../components/SpeedHistory';
import AdSlot from '../components/AdSlot';
import { getNetworkInfo, measureLatency, measureDownload, measureUpload } from '../utils/speedEngine';

export default function StreamingSpeedTest() {
  const [testing, setTesting] = useState(false);
  const [testPhase, setTestPhase] = useState('IDLE');
  const [speedVal, setSpeedVal] = useState(0);
  const [results, setResults] = useState(null);

  const startTest = async () => {
    setTesting(true);
    setResults(null);
    setTestPhase('FETCHING_IP');

    const networkData = await getNetworkInfo();
    setTestPhase('MEASURING_PING');
    const latencyData = await measureLatency();

    setTestPhase('MEASURING_DOWNLOAD');
    const downloadData = await measureDownload((currentMbps) => setSpeedVal(currentMbps));

    setTestPhase('MEASURING_UPLOAD');
    const uploadData = await measureUpload((currentMbps) => setSpeedVal(currentMbps));

    const finalResult = {
      timestamp: new Date().toISOString(),
      downloadMbps: downloadData.downloadMbps,
      uploadMbps: uploadData.uploadMbps,
      ping: latencyData.ping,
      jitter: latencyData.jitter,
      isp: networkData ? networkData.isp : 'Local ISP'
    };

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
          />

          <div className="test-control">
            <button onClick={startTest} disabled={testing} className="btn-primary start-btn">
              {testing ? '⏳ Testing Video Streaming Speed...' : '📺 Start Streaming Test'}
            </button>
          </div>
        </div>

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

        <AdSlot slotId="stream-bottom-banner" type="banner" />
      </div>
    </>
  );
}
