import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import Speedometer from '../components/Speedometer';
import LiveSparkline from '../components/LiveSparkline';
import SpeedHistory from '../components/SpeedHistory';
import SpeedInterpretation from '../components/SpeedInterpretation';
import ComparePackage from '../components/ComparePackage';
import AdSlot from '../components/AdSlot';
import { getNetworkInfo, measureLatency, measureDownload, measureUpload } from '../utils/speedEngine';
import { startEngineSound, stopEngineSound, playCompletionSound } from '../utils/soundEffects';
import './CityPage.css';

const GLOBAL_CITY_DETAILS = {
  'internet-speed-test-new-york': {
    cityName: 'New York (USA)',
    title: 'Internet Speed Test New York — NYC Broadband Speed Check',
    metaDesc: 'Test internet speed in New York City. Measure download, upload, and ping for Verizon Fios, Spectrum, and AT&T Fiber in NYC.',
    medianSpeed: '185.4 Mbps',
    topIsps: ['Verizon Fios (Gigabit)', 'Spectrum Internet', 'Astound Broadband', 'AT&T Fiber'],
    infraInfo: 'New York City features high-density optical fiber infrastructure across Manhattan, Brooklyn, Queens, and the metro tri-state region.'
  },
  'internet-speed-test-london': {
    cityName: 'London (UK)',
    title: 'Internet Speed Test London — UK Broadband & Fibre Test',
    metaDesc: 'Test internet speed in London, UK. Measure download speed, upload speed, and ping for Virgin Media, BT, Community Fibre & Hyperoptic.',
    medianSpeed: '142.1 Mbps',
    topIsps: ['Community Fibre (FTTH)', 'Virgin Media Gig1', 'Hyperoptic', 'BT Full Fibre 900'],
    infraInfo: 'Greater London is served by full-fibre Openreach and alt-net FTTH operators delivering symmetric gigabit broadband.'
  },
  'internet-speed-test-dubai': {
    cityName: 'Dubai (UAE)',
    title: 'Internet Speed Test Dubai — Etisalat & du Fiber Speed Check',
    metaDesc: 'Test internet speed in Dubai, UAE. Measure download speed, upload speed, and ping for Etisalat eLife and du Home Fiber.',
    medianSpeed: '210.5 Mbps',
    topIsps: ['Etisalat by e& (eLife 1G)', 'du Home Fiber', 'Virgin Mobile UAE 5G'],
    infraInfo: 'Dubai ranks among the highest median broadband speed cities globally with 100% FTTH fiber coverage across the emirate.'
  },
  'internet-speed-test-toronto': {
    cityName: 'Toronto (Canada)',
    title: 'Internet Speed Test Toronto — Rogers & Bell Fibe Speed Check',
    metaDesc: 'Test internet speed in Toronto, Ontario. Measure download speed, upload speed, and ping for Bell Fibe Gigabit and Rogers Ignite.',
    medianSpeed: '165.2 Mbps',
    topIsps: ['Bell Fibe (Symmetric FTTH)', 'Rogers Ignite 1.5G', 'TekSavvy Broadband'],
    infraInfo: 'Toronto features pure FTTH fiber networks across the GTA delivering multi-gigabit speeds.'
  },
  'internet-speed-test-lahore': {
    cityName: 'Lahore (Pakistan)',
    title: 'Internet Speed Test Lahore — Test PTCL, StormFiber, Nayatel in Lahore',
    metaDesc: 'Test internet speeds in Lahore, Punjab. Measure download speed, upload speed, and ping for PTCL Flash Fiber, StormFiber, Nayatel & Transworld in Lahore.',
    medianSpeed: '48.5 Mbps',
    topIsps: ['StormFiber (FTTH)', 'Nayatel Lahore', 'PTCL Flash Fiber', 'Transworld Home'],
    infraInfo: 'Lahore features extensive fiber-optic infrastructure across Gulberg, DHA, Model Town, Johar Town, and Bahria Town.'
  },
  'internet-speed-test-karachi': {
    cityName: 'Karachi (Pakistan)',
    title: 'Internet Speed Test Karachi — Fiber & Broadband Speed Check',
    metaDesc: 'Test internet speed in Karachi, Sindh. Real-time speed test for StormFiber, Cybernet, PTCL, Transworld, Jazz & Zong 4G in Karachi.',
    medianSpeed: '52.1 Mbps',
    topIsps: ['Cybernet / StormFiber', 'Transworld (TW1 Hub)', 'PTCL Flash Fiber', 'Connect Communications'],
    infraInfo: 'Karachi is Pakistan’s primary submarine cable landing hub (TW1, SEA-ME-WE cables), offering low international latency.'
  },
  'internet-speed-test-islamabad': {
    cityName: 'Islamabad (Pakistan)',
    title: 'Internet Speed Test Islamabad — Nayatel, PTCL & Fiber Speed Check',
    metaDesc: 'Test internet speed in Islamabad capital territory. Accurate speed test for Nayatel, PTCL Flash Fiber, StormFiber.',
    medianSpeed: '58.4 Mbps',
    topIsps: ['Nayatel (HQ City)', 'PTCL Flash Fiber', 'StormFiber Islamabad', 'Transworld'],
    infraInfo: 'Islamabad boasts one of the highest FTTH fiber penetration rates in Pakistan led by Nayatel and PTCL Flash Fiber.'
  }
};

export default function CityPage() {
  const { citySlug } = useParams();
  const currentSlug = citySlug || 'internet-speed-test-new-york';
  const cityInfo = GLOBAL_CITY_DETAILS[currentSlug] || GLOBAL_CITY_DETAILS['internet-speed-test-new-york'];

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
        title={cityInfo.title}
        description={cityInfo.metaDesc}
        keywords={`internet speed test ${cityInfo.cityName}, ${cityInfo.cityName} speed test, broadband ${cityInfo.cityName}`}
        canonical={`/${currentSlug}`}
      />

      <div className="city-page-container">
        <AdSlot slotId="city-top-banner" type="banner" />

        <div className="page-header">
          <h1>📍 Internet Speed Test <span className="gradient-text">{cityInfo.cityName}</span></h1>
          <p>Local speed test & ISP benchmarks for internet users in {cityInfo.cityName}</p>
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
              {testing ? '⏳ Testing Connection...' : `▶ Start Speed Test in ${cityInfo.cityName}`}
            </button>
          </div>
        </div>

        {/* Live Real-Time Throughput Graph */}
        <LiveSparkline 
          dataPoints={sparklineData} 
          maxVal={200} 
          color={activeThemeColor}
          label={`${cityInfo.cityName} Speed Graph`} 
        />

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
              <span className="sp-val mono">8 ms</span>
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
