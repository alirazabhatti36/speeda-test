import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import Speedometer from '../components/Speedometer';
import SpeedHistory from '../components/SpeedHistory';
import SpeedInterpretation from '../components/SpeedInterpretation';
import ComparePackage from '../components/ComparePackage';
import AdSlot from '../components/AdSlot';
import { getNetworkInfo, measureLatency, measureDownload, measureUpload } from '../utils/speedEngine';
import './CityPage.css';

const CITY_DETAILS = {
  'internet-speed-test-lahore': {
    cityName: 'Lahore',
    title: 'Internet Speed Test Lahore — Test PTCL, StormFiber, Nayatel in Lahore',
    metaDesc: 'Test internet speeds in Lahore, Punjab. Measure download speed, upload speed, and ping for PTCL Flash Fiber, StormFiber, Nayatel & Transworld in Lahore.',
    medianSpeed: '48.5 Mbps',
    topIsps: ['StormFiber (FTTH)', 'Nayatel Lahore', 'PTCL Flash Fiber', 'Transworld Home', 'Cybernet'],
    infraInfo: 'Lahore features extensive fiber-optic infrastructure across Gulberg, DHA, Model Town, Johar Town, and Bahria Town.'
  },
  'internet-speed-test-karachi': {
    cityName: 'Karachi',
    title: 'Internet Speed Test Karachi — Fiber & Broadband Speed Check',
    metaDesc: 'Test internet speed in Karachi, Sindh. Real-time speed test for StormFiber, Cybernet, PTCL, Transworld, Jazz & Zong 4G in Karachi.',
    medianSpeed: '52.1 Mbps',
    topIsps: ['Cybernet / StormFiber', 'Transworld (TW1 Hub)', 'PTCL Flash Fiber', 'Connect Communications', 'StormFiber Clifton/DHA'],
    infraInfo: 'Karachi is Pakistan’s primary submarine cable landing hub (TW1, SEA-ME-WE cables), offering low international latency.'
  },
  'internet-speed-test-islamabad': {
    cityName: 'Islamabad',
    title: 'Internet Speed Test Islamabad — Nayatel, PTCL & Fiber Speed Check',
    metaDesc: 'Test internet speed in Islamabad capital territory. Accurate speed test for Nayatel, PTCL Flash Fiber, StormFiber & Special Communication Organization.',
    medianSpeed: '58.4 Mbps',
    topIsps: ['Nayatel (HQ City)', 'PTCL Flash Fiber', 'StormFiber Islamabad', 'Transworld', 'Comsats Internet'],
    infraInfo: 'Islamabad boasts one of the highest FTTH fiber penetration rates in Pakistan led by Nayatel and PTCL Flash Fiber.'
  },
  'internet-speed-test-rawalpindi': {
    cityName: 'Rawalpindi',
    title: 'Internet Speed Test Rawalpindi — Broadband & 4G Network Check',
    metaDesc: 'Test broadband internet speed in Rawalpindi. Measure download speed, upload speed, and ping for Nayatel, PTCL & StormFiber in Rawalpindi.',
    medianSpeed: '44.2 Mbps',
    topIsps: ['Nayatel Rawalpindi', 'PTCL Broadband / Fiber', 'StormFiber Rawalpindi', 'Jazz 4G', 'Zong MBB'],
    infraInfo: 'Rawalpindi enjoys high-speed fiber connectivity in Bahria Town, Saddar, Satellite Town, and DHA Phase 1-4.'
  },
  'internet-speed-test-faisalabad': {
    cityName: 'Faisalabad',
    title: 'Internet Speed Test Faisalabad — Broadband Speed Test',
    metaDesc: 'Test internet speed in Faisalabad, Punjab. Real-time download, upload, and ping test for StormFiber, PTCL, Jazz & Zong in Faisalabad.',
    medianSpeed: '41.8 Mbps',
    topIsps: ['StormFiber Faisalabad', 'PTCL Flash Fiber', 'Nayatel Faisalabad', 'Cybernet', 'Jazz 4G LTE'],
    infraInfo: 'Faisalabad’s industrial hub is served by expanding FTTH fiber networks across Canal Road, People’s Colony, and Madina Town.'
  }
};

export default function CityPage() {
  const { citySlug } = useParams();
  const currentSlug = citySlug || 'internet-speed-test-lahore';
  const cityInfo = CITY_DETAILS[currentSlug] || CITY_DETAILS['internet-speed-test-lahore'];

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
        title={cityInfo.title}
        description={cityInfo.metaDesc}
        keywords={`internet speed test ${cityInfo.cityName}, ${cityInfo.cityName} speed test, ptcl ${cityInfo.cityName}, stormfiber ${cityInfo.cityName}`}
        canonical={`/${currentSlug}`}
      />

      <div className="city-page-container">
        <AdSlot slotId="city-top-banner" type="banner" />

        <div className="page-header">
          <h1>📍 Internet Speed Test <span className="gradient-text">{cityInfo.cityName}</span></h1>
          <p>Local speed test & ISP benchmarks for internet users in {cityInfo.cityName}, Pakistan</p>
        </div>

        {/* Speedometer Tool */}
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
              {testing ? '⏳ Testing Connection...' : `▶ Start Speed Test in ${cityInfo.cityName}`}
            </button>
          </div>
        </div>

        {/* Results Interpretation & History */}
        {results && (
          <>
            <SpeedInterpretation 
              download={results.downloadMbps}
              upload={results.uploadMbps}
              ping={results.ping}
              jitter={results.jitter}
            />
            <ComparePackage currentDownload={results.downloadMbps} />
          </>
        )}

        <SpeedHistory currentResult={results} />

        {/* City Infrastructure & ISP Benchmarks */}
        <div className="glass-panel city-content-card">
          <h2>📊 {cityInfo.cityName} Internet Speeds & Infrastructure</h2>
          <p>{cityInfo.infraInfo}</p>

          <div className="city-stats-box">
            <div className="stat-pill">
              <span className="sp-lbl">City Median Download Speed</span>
              <span className="sp-val mono">{cityInfo.medianSpeed}</span>
            </div>
            <div className="stat-pill">
              <span className="sp-lbl">Average Local Ping</span>
              <span className="sp-val mono">12 ms</span>
            </div>
          </div>

          <h3>🏆 Leading Broadband ISPs in {cityInfo.cityName}:</h3>
          <ul className="city-isp-list">
            {cityInfo.topIsps.map((isp, idx) => (
              <li key={idx}>⚡ {isp}</li>
            ))}
          </ul>
        </div>

        <AdSlot slotId="city-bottom-banner" type="banner" />
      </div>
    </>
  );
}
