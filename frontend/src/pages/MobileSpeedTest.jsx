import React, { useState } from 'react';
import SEO from '../components/SEO';
import Speedometer from '../components/Speedometer';
import SpeedHistory from '../components/SpeedHistory';
import AdSlot from '../components/AdSlot';
import { getNetworkInfo, measureLatency, measureDownload, measureUpload } from '../utils/speedEngine';

export default function MobileSpeedTest() {
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
      isp: networkData ? networkData.isp : 'Mobile Network'
    };

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
          />

          <div className="test-control">
            <button onClick={startTest} disabled={testing} className="btn-primary start-btn">
              {testing ? '⏳ Testing Mobile Network...' : '📱 Start Mobile Speed Test'}
            </button>
          </div>
        </div>

        <SpeedHistory currentResult={results} />

        <AdSlot slotId="mobile-bottom-banner" type="banner" />
      </div>
    </>
  );
}
