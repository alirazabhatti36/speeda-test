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
import './ISPPage.css';

const GLOBAL_ISP_DETAILS = {
  // Global & US
  'xfinity-speed-test': {
    name: 'Xfinity (Comcast)',
    title: 'Xfinity Speed Test — Official Comcast Internet Speed Check',
    logo: '🇺🇸',
    metaDesc: 'Test your Comcast Xfinity internet download speed, upload speed, ping, and latency in real-time.',
    keywords: 'xfinity speed test, comcast speed test, xfinity internet test, comcast speed check',
    packages: ['Connect 75 Mbps', 'Fast 300 Mbps', 'Superfast 800 Mbps', 'Gigabit 1000 Mbps', 'Gigabit Extra 1200 Mbps'],
    troubleshoot: [
      'Restart your Xfinity xFi Gateway router using the Xfinity App.',
      'Check coaxial cable tightness on the back of your modem.'
    ],
    faqs: [{ q: 'What is typical Xfinity download speed?', a: 'Xfinity plans range from 75 Mbps up to 1200 Mbps depending on your residential tier.' }]
  },
  'att-speed-test': {
    name: 'AT&T Fiber',
    title: 'AT&T Fiber Speed Test — Ultra-Fast Gigabit Internet Test',
    logo: '🇺🇸',
    metaDesc: 'Test AT&T Fiber symmetric download and upload speeds. Measure ping latency for AT&T Internet 300, 500, and 1000.',
    keywords: 'att speed test, at&t fiber speed test, att internet speed check',
    packages: ['AT&T Fiber 300', 'AT&T Fiber 500', 'AT&T Fiber 1000', 'AT&T Fiber 2000', 'AT&T Fiber 5000'],
    troubleshoot: ['Connect via Ethernet to the AT&T BGW320 Gateway for full 1Gbps test validation.'],
    faqs: [{ q: 'Is AT&T Fiber symmetric?', a: 'Yes! AT&T Fiber provides equal 100% symmetric download and upload speeds.' }]
  },
  'verizon-speed-test': {
    name: 'Verizon Fios & 5G',
    title: 'Verizon Fios Speed Test — Fiber & 5G Home Internet Diagnostics',
    logo: '🇺🇸',
    metaDesc: 'Test Verizon Fios Gigabit & 5G Home Internet speed, ping, and jitter live.',
    keywords: 'verizon speed test, verizon fios speed test, verizon 5g home speed test',
    packages: ['Fios 300 Mbps', 'Fios 500 Mbps', 'Fios Gigabit Connection', 'Verizon 5G Home'],
    troubleshoot: ['Check for wall obstructions if using Verizon 5G Home Receiver.'],
    faqs: [{ q: 'What is average Verizon Fios ping?', a: 'Verizon Fios averages sub-10ms ping latency on fiber.' }]
  },

  // UK & Europe
  'bt-speed-test': {
    name: 'BT Broadband',
    title: 'BT Broadband Speed Test — UK Full Fibre Speed Check',
    logo: '🇬🇧',
    metaDesc: 'Test BT Broadband & Full Fibre 100/500/900 download and upload speeds across the UK.',
    keywords: 'bt speed test, bt broadband speed test, bt full fibre speed test',
    packages: ['Fibre Essentials 36 Mbps', 'Fibre 1 50 Mbps', 'Full Fibre 100', 'Full Fibre 500', 'Full Fibre 900'],
    troubleshoot: ['Restart your BT Smart Hub 2 and verify Openreach ONT lights.'],
    faqs: [{ q: 'How to test BT Full Fibre speed?', a: 'Use Speeda Test 360 to measure unthrottled BT Broadband throughput.' }]
  },
  'virgin-media-speed-test': {
    name: 'Virgin Media',
    title: 'Virgin Media Speed Test — M125 to Gig1 Broadband Diagnostics',
    logo: '🇬🇧',
    metaDesc: 'Test Virgin Media Fibre Broadband speed live. Accurate download and upload test for M125, M250, M500, and Gig1.',
    keywords: 'virgin media speed test, virgin speed check, virgin gig1 test',
    packages: ['M125 Fibre', 'M250 Fibre', 'M500 Fibre', 'Gig1 Fibre Broadband'],
    troubleshoot: ['Check Virgin Media Hub 3/4/5 cable connections.'],
    faqs: [{ q: 'Why is Virgin Media fast for downloading?', a: 'Virgin Media uses DOCSIS 3.1 DOCSIS hybrid technology delivering up to 1130 Mbps.' }]
  },

  // UAE & Middle East
  'etisalat-speed-test': {
    name: 'Etisalat by e&',
    title: 'Etisalat Speed Test — eLife Fiber Speed Check UAE',
    logo: '🇦🇪',
    metaDesc: 'Test Etisalat eLife Fiber internet download and upload speed in Dubai, Abu Dhabi, and across UAE.',
    keywords: 'etisalat speed test, elife speed test, etisalat uae speed check',
    packages: ['eLife Starter 250 Mbps', 'eLife Unlimited 500 Mbps', 'eLife Ultra 1G'],
    troubleshoot: ['Ensure your Wi-Fi router is connected to the Etisalat Optical Network Terminal (ONT).'],
    faqs: [{ q: 'What is average Etisalat ping in UAE?', a: 'Etisalat eLife averages 2ms to 8ms ping locally in Dubai & Abu Dhabi.' }]
  },
  'du-speed-test': {
    name: 'du Home',
    title: 'du Home Speed Test — UAE High-Speed Fiber Diagnostics',
    logo: '🇦🇪',
    metaDesc: 'Test du Home Fiber & 5G Home Wireless internet speed live in UAE.',
    keywords: 'du speed test, du home speed check, du uae speed test',
    packages: ['du Home Starter 250 Mbps', 'du Home Advanced 500 Mbps', 'du 5G Home Wireless'],
    troubleshoot: ['Place your du 5G router near a window facing the cellular tower.'],
    faqs: [{ q: 'Is du 5G good for gaming?', a: 'du 5G delivers ultra-low ping for online gaming in UAE.' }]
  },

  // India
  'jio-speed-test': {
    name: 'JioFiber & Jio 5G',
    title: 'JioFiber Speed Test — Jio 5G & Fiber Broadband Diagnostics',
    logo: '🇮🇳',
    metaDesc: 'Test JioFiber broadband download, upload, ping, and jitter. Accurate speed test for Jio 30Mbps, 100Mbps, 300Mbps & 1Gbps plans.',
    keywords: 'jio speed test, jiofiber speed test, jio 5g speed test',
    packages: ['JioFiber 30 Mbps', 'JioFiber 100 Mbps', 'JioFiber 300 Mbps', 'JioFiber 1 Gbps'],
    troubleshoot: ['Connect to JioFiber 5GHz Wi-Fi SSID for full speed throughput.'],
    faqs: [{ q: 'Is Jio 5G speed test accurate?', a: 'Yes! Speeda Test 360 measures true unthrottled Jio 5G data speeds.' }]
  },

  // Pakistan
  'ptcl-speed-test': {
    name: 'PTCL Broadband',
    title: 'PTCL Speed Test — Official Broadband & Flash Fiber Test',
    logo: '🇵🇰',
    metaDesc: 'Test your PTCL Broadband, VDSL & Flash Fiber download speed, upload speed, ping, and jitter online.',
    keywords: 'ptcl speed test, ptcl flash fiber speed test, ptcl vdsl speed test',
    packages: ['10 Mbps Broadband', '20 Mbps Flash Fiber', '50 Mbps Flash Fiber', '100 Mbps Ultra Fiber'],
    troubleshoot: ['For Flash Fiber GPON ONUs: Check the PON LED light for fiber signal integrity.'],
    faqs: [{ q: 'How to check PTCL internet speed online?', a: 'Click the "Start Speed Test" button above for instant measurement.' }]
  },
  'stormfiber-speed-test': {
    name: 'StormFiber',
    title: 'StormFiber Speed Test — Ultra-Fast Fiber Broadband Diagnostics',
    logo: '🇵🇰',
    metaDesc: 'Test StormFiber FTTH internet speeds, download, upload, ping, and jitter live.',
    keywords: 'stormfiber speed test, stormfiber speed check, storm fiber test',
    packages: ['20 Mbps Cyclone', '50 Mbps Tornado', '100 Mbps Tsunami'],
    troubleshoot: ['Connect via Gigabit Ethernet cable for full speed validation.'],
    faqs: [{ q: 'What is typical ping on StormFiber for gaming?', a: 'StormFiber typically delivers 5ms to 15ms local ping.' }]
  },
  'nayatel-speed-test': {
    name: 'Nayatel',
    title: 'Nayatel Speed Test — FTTH Fiber Internet & Ping Checker',
    logo: '🇵🇰',
    metaDesc: 'Official Nayatel Fiber internet speed test. Test download, upload, ping latency, and jitter.',
    keywords: 'nayatel speed test, nayatel speed check, nayatel fiber speed',
    packages: ['15 Mbps Home', '25 Mbps Premium', '50 Mbps Ultra', '100 Mbps Giga'],
    troubleshoot: ['Ensure the optical patch cord fiber cable is not tightly bent.'],
    faqs: [{ q: 'Is Nayatel upload speed symmetric?', a: 'Yes! Nayatel offers high symmetric upload speeds matching download speeds.' }]
  },
  'transworld-speed-test': {
    name: 'Transworld Home',
    title: 'Transworld Home Speed Test — Fiber Broadband Diagnostics',
    logo: '🇵🇰',
    metaDesc: 'Test Transworld Home FTTH fiber download and upload speeds across Pakistan.',
    keywords: 'transworld speed test, transworld home speed check',
    packages: ['20 Mbps Fiber', '50 Mbps Fiber', '100 Mbps Fiber'],
    troubleshoot: ['Restart your Transworld GPON router if latency feels elevated.'],
    faqs: [{ q: 'Why is Transworld fast for gaming?', a: 'Transworld owns private international submarine cables delivering low latency.' }]
  },
  'jazz-speed-test': {
    name: 'Jazz 4G',
    title: 'Jazz 4G Speed Test — Pakistan Mobile Internet Test',
    logo: '🇵🇰',
    metaDesc: 'Test Jazz 4G LTE mobile data speed, download, upload, ping, and jitter live.',
    keywords: 'jazz speed test, jazz 4g speed test, jazz internet speed check',
    packages: ['Jazz 4G Mobile', 'Jazz Super 4G Router'],
    troubleshoot: ['Ensure your mobile phone is connected to LTE / 4G band.'],
    faqs: [{ q: 'What is average Jazz 4G speed?', a: 'Jazz 4G averages 15 to 45 Mbps depending on signal strength.' }]
  },
  'zong-speed-test': {
    name: 'Zong 4G',
    title: 'Zong 4G Speed Test — Pakistan Broadband & Mobile Data Test',
    logo: '🇵🇰',
    metaDesc: 'Test Zong 4G LTE & MBB Device download and upload internet speed live.',
    keywords: 'zong speed test, zong 4g speed test, zong mbb speed check',
    packages: ['Zong 4G Mobile Data', 'Zong MBB Wi-Fi Device', 'Zong 4G Bolt+'],
    troubleshoot: ['Place your Zong MBB device near an open window.'],
    faqs: [{ q: 'Is Zong 4G good for gaming?', a: 'Zong 4G provides low latency for mobile online gaming.' }]
  },
  'global-speed-test': {
    name: 'Global Internet',
    title: 'Global Internet Speed Test — Test Any ISP Worldwide',
    logo: '🌍',
    metaDesc: 'Global Internet Speed Test for US, UK, UAE, India, Europe, Canada, Australia & Worldwide ISPs.',
    keywords: 'global speed test, worldwide speed test, international internet speed test',
    packages: ['Fiber Optic (100 - 1000 Mbps)', '5G Cellular Data', 'Satellite Starlink Internet'],
    troubleshoot: ['Run speed test across different times of day to check global routing throughput.'],
    faqs: [{ q: 'Can Speeda Test 360 test any ISP in the world?', a: 'Yes! Speeda Test 360 automatically connects to the nearest global edge CDN server worldwide.' }]
  }
};

export default function ISPPage() {
  const { ispSlug } = useParams();
  const currentSlug = ispSlug || 'global-speed-test';
  const ispInfo = GLOBAL_ISP_DETAILS[currentSlug] || GLOBAL_ISP_DETAILS['global-speed-test'];

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
      isp: networkData ? networkData.isp : ispInfo.name
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
            onThemeChange={(col) => setActiveThemeColor(col)}
          />

          <div className="test-control">
            <button onClick={startTest} disabled={testing} className="btn-primary start-btn">
              {testing ? '⏳ Testing Connection...' : `▶ Start ${ispInfo.name} Speed Test`}
            </button>
          </div>
        </div>

        {/* Live Real-Time Throughput Graph */}
        <LiveSparkline 
          dataPoints={sparklineData} 
          maxVal={200} 
          color={activeThemeColor}
          label={`${ispInfo.name} Speed Graph`} 
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
            <ComparePackage currentDownload={results.downloadMbps} currentIsp={ispInfo.name} />
          </>
        )}

        <SpeedHistory currentResult={results} />

        {/* ISP Information & Troubleshooting Section */}
        <div className="glass-panel isp-content-card">
          <h2>ℹ️ About {ispInfo.name} Network & Speed Tiers</h2>
          <p>
            {ispInfo.name} provides high-speed broadband and mobile data connectivity. Testing your connection regularly ensures you receive full advertised speeds from your service provider.
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
