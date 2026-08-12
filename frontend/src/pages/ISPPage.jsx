import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Speedometer from '../components/Speedometer';
import SpeedHistory from '../components/SpeedHistory';
import SpeedInterpretation from '../components/SpeedInterpretation';
import ComparePackage from '../components/ComparePackage';
import AdSlot from '../components/AdSlot';
import { getNetworkInfo, measureLatency, measureDownload, measureUpload } from '../utils/speedEngine';
import './ISPPage.css';

const ISP_DETAILS = {
  'ptcl-speed-test': {
    name: 'PTCL (Pakistan Telecommunication Company Limited)',
    title: 'PTCL Speed Test — Official Broadband & Flash Fiber Test',
    logo: '🔵',
    metaDesc: 'Test your PTCL Broadband, VDSL & Flash Fiber download speed, upload speed, ping, and jitter accurately online with Speeda Test 360.',
    keywords: 'ptcl speed test, ptcl flash fiber speed test, ptcl vdsl speed test, ptcl broadband test, ptcl internet speed',
    packages: ['10 Mbps Broadband', '20 Mbps Flash Fiber', '30 Mbps Flash Fiber', '50 Mbps Flash Fiber', '100 Mbps Ultra Fiber'],
    troubleshoot: [
      'For VDSL/ADSL connections: Inspect your physical line splitter and telephone wire noise filters.',
      'For Flash Fiber GPON ONUs: Check the PON LED light. A blinking red LOS light indicates fiber optic attenuation or cable cut.',
      'Change DNS resolver on your PTCL router to Google DNS (8.8.8.8) or Cloudflare (1.1.1.1) to resolve slow domain loading.'
    ],
    faqs: [
      { q: 'How to check PTCL internet speed online?', a: 'Click the "Start Speed Test" button above. Speeda Test 360 measures real-time download speed, upload speed, and ping directly to Pakistani edge servers.' },
      { q: 'Why is PTCL Flash Fiber faster than VDSL?', a: 'Flash Fiber uses Fiber-to-the-Home (FTTH) technology with light impulses, whereas VDSL relies on copper wires susceptible to distance degradation.' }
    ]
  },
  'stormfiber-speed-test': {
    name: 'StormFiber (Cybernet FTTH)',
    title: 'StormFiber Speed Test — Ultra-Fast Fiber Broadband Diagnostics',
    logo: '⚡',
    metaDesc: 'Test StormFiber FTTH internet speeds, download, upload, ping, and jitter. Accurate speed test for StormFiber 20Mbps, 50Mbps & 100Mbps plans.',
    keywords: 'stormfiber speed test, stormfiber speed check, storm fiber test, cybernet speed test, ftth pakistan speed test',
    packages: ['20 Mbps Cyclone', '30 Mbps Typhoon', '40 Mbps Hurricane', '50 Mbps Tornado', '100 Mbps Tsunami'],
    troubleshoot: [
      'Connect your laptop via Gigabit Ethernet cable to WAN Port 1 on the StormFiber router for 100% full speed validation.',
      'Dual-band routers emit 2.4 GHz and 5 GHz SSIDs. Always connect to the 5 GHz Wi-Fi band when testing speeds above 30 Mbps.',
      'Reboot the StormFiber dual-band ONU router every 14 days to clear internal buffer cache.'
    ],
    faqs: [
      { q: 'What is typical ping on StormFiber for gaming?', a: 'StormFiber typically delivers 5ms to 15ms local ping in Karachi, Lahore, Islamabad, and Faisalabad.' }
    ]
  },
  'nayatel-speed-test': {
    name: 'Nayatel',
    title: 'Nayatel Speed Test — FTTH Fiber Internet & Ping Checker',
    logo: '🟢',
    metaDesc: 'Official Nayatel Fiber internet speed test. Test download, upload, ping latency, and jitter for Nayatel Home & Corporate fiber connections.',
    keywords: 'nayatel speed test, nayatel speed check, nayatel fiber speed, nayatel islamabad speed test, nayatel rawalpindi speed test',
    packages: ['15 Mbps Home', '25 Mbps Premium', '50 Mbps Ultra', '70 Mbps Extreme', '100 Mbps Giga'],
    troubleshoot: [
      'Ensure the optical patch cord fiber cable is not tightly bent or pinched behind your ONT box.',
      'Use Nayatel Optimus gaming route optimization features if experiencing high ping on gaming servers.'
    ],
    faqs: [
      { q: 'Is Nayatel upload speed symmetric?', a: 'Yes! Nayatel offers high symmetric upload speeds matching download speeds on fiber connections.' }
    ]
  },
  'transworld-speed-test': {
    name: 'Transworld Home',
    title: 'Transworld Speed Test — International Fiber Backbone Diagnostics',
    logo: '🌍',
    metaDesc: 'Test Transworld Home fiber internet speed. Measure low latency ping, jitter, download, and upload speeds across Transworld undersea cables.',
    keywords: 'transworld speed test, transworld home speed check, transworld fiber speed, TW1 speed test',
    packages: ['20 Mbps Fiber', '30 Mbps Fiber', '50 Mbps Fiber', '100 Mbps Fiber'],
    troubleshoot: [
      'Check if your device supports Wi-Fi 5 (802.11ac) or Wi-Fi 6 (802.11ax) for high throughput.'
    ],
    faqs: [
      { q: 'Why is Transworld ping lower for gaming?', a: 'Transworld owns private submarine optic cables (TW1 & SEA-ME-WE 5) directly connecting Pakistan to UAE and Europe.' }
    ]
  },
  'jazz-speed-test': {
    name: 'Jazz 4G / Super 4G',
    title: 'Jazz 4G Speed Test — Mobile Broadband & Wi-Fi Device Diagnostics',
    logo: '📶',
    metaDesc: 'Test Jazz 4G LTE mobile data speed and Jazz Digit/Wingle device download, upload, and ping speeds live.',
    keywords: 'jazz speed test, jazz 4g speed test, jazz internet speed check, jazz wingle speed test',
    packages: ['4G Mobile Data', 'Jazz Super 4G Wingle', 'Jazz Digit 4G Device'],
    troubleshoot: [
      'Place your 4G device near a window to increase RSRP signal strength.'
    ],
    faqs: [
      { q: 'How to increase Jazz 4G speed?', a: 'Set APN to "jazzconnect.mr" and lock network mode to "LTE Only".' }
    ]
  },
  'zong-speed-test': {
    name: 'Zong 4G LTE',
    title: 'Zong 4G Speed Test — Mobile Broadband & MBB Router Diagnostics',
    logo: '🟢',
    metaDesc: 'Test Zong 4G LTE mobile data speed and Zong MBB Router download, upload, ping, and jitter across Pakistan.',
    keywords: 'zong speed test, zong 4g speed test, zong mbb speed check, zong 4g router test',
    packages: ['Zong 4G Mobile Data', 'Zong MBB Device (Huawei/ZTE)', 'Zong 5G Ready'],
    troubleshoot: [
      'Check signal bars on your Zong MBB router screen. 4-5 bars ensure maximum 4G carrier aggregation.'
    ],
    faqs: [
      { q: 'What is average Zong 4G download speed?', a: 'Zong 4G average download speed ranges between 15 Mbps to 45 Mbps depending on tower load.' }
    ]
  },
  'speed-test-pakistan': {
    name: 'Pakistan All ISPs & Mobile Networks',
    title: 'Pakistan Speed Test — PTCL, StormFiber, Nayatel, Jazz, Zong Analytics',
    logo: '🇵🇰',
    metaDesc: 'National Pakistan Internet Speed Test. Compare speeds across PTCL, StormFiber, Nayatel, Transworld, Jazz, Zong, Telenor, and Ufone.',
    keywords: 'pakistan speed test, internet speed test pakistan, isp ranking pakistan, fastest internet in pakistan',
    packages: ['Broadband Fiber (10-100 Mbps)', '4G Mobile LTE (10-50 Mbps)', '5G Cellular Networks'],
    troubleshoot: ['Run speed tests during off-peak hours (morning) vs peak hours (8 PM - 11 PM) to evaluate ISP throttling.'],
    faqs: [{ q: 'Which is the fastest internet provider in Pakistan?', a: 'Based on 2026 user speed test data, Nayatel and StormFiber lead FTTH fiber speeds, while Zong and Jazz lead 4G mobile speeds.' }]
  }
};

export default function ISPPage() {
  const { ispSlug } = useParams();
  const currentSlug = ispSlug || 'ptcl-speed-test';
  const ispInfo = ISP_DETAILS[currentSlug] || ISP_DETAILS['speed-test-pakistan'];

  const [testing, setTesting] = useState(false);
  const [testPhase, setTestPhase] = useState('IDLE');
  const [speedVal, setSpeedVal] = useState(0);
  const [netInfo, setNetInfo] = useState(null);
  const [results, setResults] = useState(null);

  const startTest = async () => {
    setTesting(true);
    setResults(null);
    setTestPhase('FETCHING_IP');

    const networkData = await getNetworkInfo();
    setNetInfo(networkData);

    setTestPhase('MEASURING_PING');
    const latencyData = await measureLatency();

    setTestPhase('MEASURING_DOWNLOAD');
    const downloadData = await measureDownload((currentMbps) => {
      setSpeedVal(currentMbps);
    });

    setTestPhase('MEASURING_UPLOAD');
    const uploadData = await measureUpload((currentMbps) => {
      setSpeedVal(currentMbps);
    });

    const finalResult = {
      timestamp: new Date().toISOString(),
      downloadMbps: downloadData.downloadMbps,
      uploadMbps: uploadData.uploadMbps,
      ping: latencyData.ping,
      jitter: latencyData.jitter,
      isp: networkData ? networkData.isp : ispInfo.name
    };

    setResults(finalResult);
    setTesting(false);
    setTestPhase('COMPLETED');
    setSpeedVal(downloadData.downloadMbps);
  };

  return (
    <>
      <SEO 
        title={ispInfo.title}
        description={ispInfo.metaDesc}
        keywords={ispInfo.keywords}
        canonical={`/${currentSlug}`}
      />

      <div className="isp-page-container">
        <AdSlot slotId="isp-top-banner" type="banner" />

        <div className="page-header">
          <h1>{ispInfo.logo} {ispInfo.name} <span className="gradient-text">Speed Test</span></h1>
          <p>Real-time download, upload, ping & jitter test optimized for {ispInfo.name}</p>
        </div>

        {/* Speedometer Test Tool */}
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
              {testing ? '⏳ Testing Connection...' : '▶ Start Speed Test'}
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
            <ComparePackage currentDownload={results.downloadMbps} currentIsp={ispInfo.name} />
          </>
        )}

        <SpeedHistory currentResult={results} />

        {/* ISP Information & Troubleshooting Section */}
        <div className="glass-panel isp-content-card">
          <h2>ℹ️ About {ispInfo.name} Network & Speed Tiers</h2>
          <p>
            {ispInfo.name} provides broadband and mobile data connectivity across Pakistan. Testing your connection regularly ensures you receive full advertised speeds from your service provider.
          </p>

          <h3>📦 Common {ispInfo.name} Packages:</h3>
          <ul className="pkg-tags-list">
            {ispInfo.packages.map((pkg, idx) => (
              <li key={idx} className="pkg-tag">{pkg}</li>
            ))}
          </ul>

          <h3>🛠️ Troubleshooting Slow {ispInfo.name} Speed:</h3>
          <ol className="trouble-list">
            {ispInfo.troubleshoot.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ol>

          <h3>❓ Frequently Asked Questions</h3>
          <div className="faq-list">
            {ispInfo.faqs.map((faq, idx) => (
              <div key={idx} className="faq-item">
                <h4>{faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <AdSlot slotId="isp-bottom-banner" type="banner" />
      </div>
    </>
  );
}
