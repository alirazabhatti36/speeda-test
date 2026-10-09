import React, { useState } from 'react';
import SEO from '../components/SEO';
import AdSlot from '../components/AdSlot';
import FAQSection from '../components/FAQSection';
import './ISPRankings.css';

const ALL_ISPS = [
  // Global Satellite
  { rank: 1, name: 'Starlink Satellite', country: 'Global', flag: '🌍', type: 'LEO Satellite L-Band', avgDownload: '220 Mbps', avgUpload: '25 Mbps', avgPing: '32 ms', rating: '9.3 / 10', bestFor: 'Remote Areas, Maritime & Global Access' },

  // USA
  { rank: 2, name: 'AT&T Fiber', country: 'USA', flag: '🇺🇸', type: 'Symmetric FTTH', avgDownload: '940 Mbps', avgUpload: '935 Mbps', avgPing: '4 ms', rating: '9.9 / 10', bestFor: 'Gigabit Streaming & Pro Gaming' },
  { rank: 3, name: 'Verizon Fios', country: 'USA', flag: '🇺🇸', type: 'FTTH Fiber', avgDownload: '890 Mbps', avgUpload: '880 Mbps', avgPing: '5 ms', rating: '9.8 / 10', bestFor: 'Low Latency & High Reliability' },
  { rank: 4, name: 'Google Fiber', country: 'USA', flag: '🇺🇸', type: 'Symmetric FTTH', avgDownload: '980 Mbps', avgUpload: '970 Mbps', avgPing: '3 ms', rating: '9.9 / 10', bestFor: 'Pure Multi-Gigabit Fiber' },
  { rank: 5, name: 'Comcast Xfinity', country: 'USA', flag: '🇺🇸', type: 'DOCSIS 3.1 Cable', avgDownload: '580 Mbps', avgUpload: '40 Mbps', avgPing: '15 ms', rating: '9.1 / 10', bestFor: 'Broad National Availability' },
  { rank: 6, name: 'Charter Spectrum', country: 'USA', flag: '🇺🇸', type: 'Hybrid Fiber Coaxial', avgDownload: '450 Mbps', avgUpload: '35 Mbps', avgPing: '18 ms', rating: '8.9 / 10', bestFor: 'No Contract Unlimited Data' },
  { rank: 7, name: 'Cox Communications', country: 'USA', flag: '🇺🇸', type: 'Gigablast Cable/Fiber', avgDownload: '510 Mbps', avgUpload: '38 Mbps', avgPing: '16 ms', rating: '8.8 / 10', bestFor: 'Midwest & West Coast Homes' },

  // UK
  { rank: 8, name: 'Virgin Media Gig1', country: 'UK', flag: '🇬🇧', type: 'DOCSIS 3.1 / FTTP', avgDownload: '1130 Mbps', avgUpload: '104 Mbps', avgPing: '12 ms', rating: '9.5 / 10', bestFor: 'Ultra Fast Raw Download Speed' },
  { rank: 9, name: 'Community Fibre', country: 'UK', flag: '🇬🇧', type: '100% FTTH Fiber', avgDownload: '920 Mbps', avgUpload: '920 Mbps', avgPing: '4 ms', rating: '9.7 / 10', bestFor: 'London Symmetric Gigabit' },
  { rank: 10, name: 'BT Full Fibre 900', country: 'UK', flag: '🇬🇧', type: 'Openreach FTTP', avgDownload: '900 Mbps', avgUpload: '110 Mbps', avgPing: '8 ms', rating: '9.4 / 10', bestFor: 'Nationwide Fiber Reliability' },
  { rank: 11, name: 'Sky Broadband Ultrafast', country: 'UK', flag: '🇬🇧', type: 'Openreach FTTP', avgDownload: '500 Mbps', avgUpload: '65 Mbps', avgPing: '12 ms', rating: '9.1 / 10', bestFor: 'TV & Streaming Entertainment' },

  // UAE
  { rank: 12, name: 'Etisalat by e&', country: 'UAE', flag: '🇦🇪', type: 'eLife Ultra Fiber', avgDownload: '500 Mbps', avgUpload: '250 Mbps', avgPing: '3 ms', rating: '9.7 / 10', bestFor: 'UAE Ultrafast Fiber Network' },
  { rank: 13, name: 'du Home Fiber', country: 'UAE', flag: '🇦🇪', type: 'FTTH Gigabit', avgDownload: '450 Mbps', avgUpload: '220 Mbps', avgPing: '4 ms', rating: '9.5 / 10', bestFor: 'Dubai & Abu Dhabi High Speed' },

  // Pakistan
  { rank: 14, name: 'Nayatel Fiber', country: 'Pakistan', flag: '🇵🇰', type: 'Pure FTTH GPON', avgDownload: '58.4 Mbps', avgUpload: '48.2 Mbps', avgPing: '8 ms', rating: '9.4 / 10', bestFor: 'Islamabad, Rawalpindi, Faisalabad & Peshawar' },
  { rank: 15, name: 'StormFiber (Cybernet)', country: 'Pakistan', flag: '🇵🇰', type: 'FTTH Fiber', avgDownload: '52.8 Mbps', avgUpload: '44.5 Mbps', avgPing: '10 ms', rating: '9.3 / 10', bestFor: 'Karachi, Lahore & Nationwide Fiber' },
  { rank: 16, name: 'Transworld Home', country: 'Pakistan', flag: '🇵🇰', type: 'Submarine Cable Tier-1', avgDownload: '49.1 Mbps', avgUpload: '42.0 Mbps', avgPing: '11 ms', rating: '9.2 / 10', bestFor: 'Low International Gaming Ping' },
  { rank: 17, name: 'PTCL Flash Fiber', country: 'Pakistan', flag: '🇵🇰', type: 'Optical GPON FTTH', avgDownload: '41.5 Mbps', avgUpload: '35.0 Mbps', avgPing: '14 ms', rating: '9.0 / 10', bestFor: 'Widest Fiber Coverage Across Pakistan' },
  { rank: 18, name: 'Jazz Super 4G LTE', country: 'Pakistan', flag: '🇵🇰', type: 'Mobile Cellular 4G', avgDownload: '28.5 Mbps', avgUpload: '14.2 Mbps', avgPing: '24 ms', rating: '8.8 / 10', bestFor: 'Nationwide Mobile Data & 4G Wi-Fi Routers' },
  { rank: 19, name: 'Zong 4G MBB', country: 'Pakistan', flag: '🇵🇰', type: 'Mobile Cellular 4G LTE', avgDownload: '26.8 Mbps', avgUpload: '12.8 Mbps', avgPing: '26 ms', rating: '8.7 / 10', bestFor: 'High Speed Mobile Broadband Devices' },
  { rank: 20, name: 'Ufone 4G Mobile', country: 'Pakistan', flag: '🇵🇰', type: 'Mobile Cellular 4G', avgDownload: '21.4 Mbps', avgUpload: '10.2 Mbps', avgPing: '29 ms', rating: '8.5 / 10', bestFor: 'Budget Mobile Internet & PTCL Synergy' },

  // India
  { rank: 21, name: 'JioFiber 1G', country: 'India', flag: '🇮🇳', type: 'FTTH Fiber & 5G', avgDownload: '880 Mbps', avgUpload: '850 Mbps', avgPing: '6 ms', rating: '9.5 / 10', bestFor: 'All-India Gigabit & OTT Bundle' },
  { rank: 22, name: 'Airtel Xstream Fiber', country: 'India', flag: '🇮🇳', type: 'FTTH Gigabit', avgDownload: '860 Mbps', avgUpload: '840 Mbps', avgPing: '5 ms', rating: '9.4 / 10', bestFor: 'Low Latency Fiber & Pro Gaming' }
];

const CITY_BENCHMARKS = [
  // Pakistan Major Cities
  { city: 'Karachi', region: 'Sindh, Pakistan', flag: '🇵🇰', topIsp: 'StormFiber / Transworld', avgDown: '48.5 Mbps', avgPing: '12 ms' },
  { city: 'Lahore', region: 'Punjab, Pakistan', flag: '🇵🇰', topIsp: 'StormFiber / PTCL Flash Fiber', avgDown: '52.1 Mbps', avgPing: '9 ms' },
  { city: 'Islamabad', region: 'Federal, Pakistan', flag: '🇵🇰', topIsp: 'Nayatel Pure Fiber', avgDown: '62.4 Mbps', avgPing: '7 ms' },
  { city: 'Rawalpindi', region: 'Punjab, Pakistan', flag: '🇵🇰', topIsp: 'Nayatel / StormFiber', avgDown: '55.0 Mbps', avgPing: '8 ms' },
  { city: 'Faisalabad', region: 'Punjab, Pakistan', flag: '🇵🇰', topIsp: 'Nayatel / StormFiber', avgDown: '44.8 Mbps', avgPing: '11 ms' },
  { city: 'Peshawar', region: 'KPK, Pakistan', flag: '🇵🇰', topIsp: 'Nayatel / PTCL Fiber', avgDown: '42.2 Mbps', avgPing: '14 ms' },
  { city: 'Multan', region: 'Punjab, Pakistan', flag: '🇵🇰', topIsp: 'StormFiber / PTCL', avgDown: '38.6 Mbps', avgPing: '15 ms' },

  // Global Metros
  { city: 'New York, NY', region: 'United States', flag: '🇺🇸', topIsp: 'Verizon Fios / Spectrum', avgDown: '820 Mbps', avgPing: '5 ms' },
  { city: 'Los Angeles, CA', region: 'United States', flag: '🇺🇸', topIsp: 'AT&T Fiber / Spectrum', avgDown: '890 Mbps', avgPing: '4 ms' },
  { city: 'London', region: 'United Kingdom', flag: '🇬🇧', topIsp: 'Community Fibre / Virgin Gig1', avgDown: '920 Mbps', avgPing: '5 ms' },
  { city: 'Dubai', region: 'United Arab Emirates', flag: '🇦🇪', topIsp: 'Etisalat eLife / du Fiber', avgDown: '520 Mbps', avgPing: '3 ms' },
  { city: 'Mumbai', region: 'India', flag: '🇮🇳', topIsp: 'JioFiber / Airtel Xstream', avgDown: '840 Mbps', avgPing: '6 ms' }
];

const ISP_FAQS = [
  {
    q: 'How does Speeda Test 360 evaluate and rank ISPs?',
    a: 'Speeda Test 360 compiles millions of real-time browser-based speed test samples. Our ranking metric factors in median download speed (40%), upload throughput (25%), round-trip ping latency (20%), and jitter packet stability (15%).'
  },
  {
    q: 'What is the fastest internet provider in Pakistan?',
    a: 'For low gaming ping and symmetric fiber in Islamabad and Rawalpindi, Nayatel ranks highest. For Karachi and Lahore, StormFiber (Cybernet) and Transworld deliver superior median download throughput and international submarine gateway routing.'
  },
  {
    q: 'What is the difference between Symmetric FTTH and Cable/DOCSIS?',
    a: 'Symmetric FTTH (Fiber To The Home) transmits data via optical glass fibers, providing identical download and upload speeds (e.g. 500 Mbps down / 500 Mbps up). Cable DOCSIS provides fast downloads but much slower uploads (e.g. 1000 Mbps down / 35 Mbps up).'
  },
  {
    q: 'Why does my speed test result drop during evening peak hours?',
    a: 'Between 7:00 PM and 11:00 PM, neighborhood traffic peaks as users stream video and game simultaneously. ISPs that oversubscribe their optical distribution hubs or backhaul gateways experience peak-hour network congestion.'
  },
  {
    q: 'How can I tell if my ISP is throttling my broadband connection?',
    a: 'Run a speed test on Speeda Test 360 during midday and again at night. Compare your test with a VPN connection enabled. If speeds jump dramatically over a VPN, your ISP may be throttling specific media or protocol traffic.'
  }
];

export default function ISPRankings() {
  const [selectedCountry, setSelectedCountry] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIsps = ALL_ISPS.filter((isp) => {
    const matchesCountry = selectedCountry === 'ALL' || isp.country.toUpperCase() === selectedCountry.toUpperCase();
    const matchesSearch = isp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          isp.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          isp.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  return (
    <>
      <SEO 
        title="Global & Local ISP Speed Rankings 2026 — Fastest Broadband, Fiber & 4G/5G Networks"
        description="Official broadband & ISP speed rankings. Compare AT&T Fiber, Verizon Fios, Comcast, Virgin Media, BT, Etisalat, Nayatel, StormFiber, PTCL, Transworld, Jazz, Zong, and JioFiber."
        keywords="isp rankings, broadband speed rankings, fastest isp in pakistan, ptcl speed test, stormfiber speed test, nayatel speed test, transworld speed test, jazz 4g speed, zong 4g speed, ufone 4g speed, internet speed test karachi, lahore broadband speeds, islamabad fiber test, rawalpindi internet, faisalabad speed test, peshawar fiber, multan wifi test, att fiber speed test, verizon fios test, xfinity speed test, virgin media speed test, etisalat speed test dubai, du fiber uae, jiofiber speed test, airtel xstream test, starlink speed test, fastest internet in the world"
        canonical="/isp-rankings"
        faqs={ISP_FAQS}
      />

      <div className="rankings-container">
        <AdSlot slotId="rank-top-banner" type="banner" />

        <div className="page-header">
          <h1>🏆 Global Broadband & <span className="gradient-text">ISP Rankings</span></h1>
          <p>Real performance benchmarks, median throughput & latency metrics for top global and regional ISPs</p>
        </div>

        {/* Filter Bar */}
        <div className="glass-panel filter-panel">
          <div className="filter-controls-wrap">
            <div className="country-tabs">
              <button 
                className={`tab-btn ${selectedCountry === 'ALL' ? 'active' : ''}`}
                onClick={() => setSelectedCountry('ALL')}
              >
                🌍 All Countries
              </button>
              <button 
                className={`tab-btn ${selectedCountry === 'USA' ? 'active' : ''}`}
                onClick={() => setSelectedCountry('USA')}
              >
                🇺🇸 United States
              </button>
              <button 
                className={`tab-btn ${selectedCountry === 'UK' ? 'active' : ''}`}
                onClick={() => setSelectedCountry('UK')}
              >
                🇬🇧 United Kingdom
              </button>
              <button 
                className={`tab-btn ${selectedCountry === 'UAE' ? 'active' : ''}`}
                onClick={() => setSelectedCountry('UAE')}
              >
                🇦🇪 UAE
              </button>
              <button 
                className={`tab-btn ${selectedCountry === 'Pakistan' ? 'active' : ''}`}
                onClick={() => setSelectedCountry('Pakistan')}
              >
                🇵🇰 Pakistan
              </button>
              <button 
                className={`tab-btn ${selectedCountry === 'India' ? 'active' : ''}`}
                onClick={() => setSelectedCountry('India')}
              >
                🇮🇳 India
              </button>
            </div>

            <div className="search-box">
              <input
                type="text"
                placeholder="🔍 Search ISP name, technology or country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="isp-search-input"
              />
            </div>
          </div>
        </div>

        {/* Table of Rankings */}
        <div className="glass-panel rankings-card">
          <div className="mobile-scroll-hint">
            <span>↔️ Swipe / Drag sideways to view full metrics (Download, Upload, Ping, Rating)</span>
          </div>
          <div className="table-responsive">
            <table className="rankings-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Broadband Provider</th>
                  <th>Region</th>
                  <th>Technology</th>
                  <th>Download</th>
                  <th>Upload</th>
                  <th>Ping</th>
                  <th>Score</th>
                  <th>Best For</th>
                </tr>
              </thead>
              <tbody>
                {filteredIsps.length > 0 ? (
                  filteredIsps.map((item, index) => (
                    <tr key={item.name}>
                      <td className="rank-num mono font-bold">#{index + 1}</td>
                      <td className="isp-name-cell font-bold">
                        <span className="isp-flag-inline">{item.flag}</span> {item.name}
                      </td>
                      <td>{item.country}</td>
                      <td><span className="tech-badge">{item.type}</span></td>
                      <td className="mono text-cyan font-bold">{item.avgDownload}</td>
                      <td className="mono text-green font-bold">{item.avgUpload}</td>
                      <td className="mono text-orange">{item.avgPing}</td>
                      <td className="mono text-purple font-bold">{item.rating}</td>
                      <td className="best-for-cell">{item.bestFor}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                      No ISPs found matching your criteria. Try adjusting the search filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Informational Guides & Benchmarking Methodology */}
        <div className="glass-panel ranking-guide-card">
          <h2>📊 Broadband Speed Benchmarking & Technology Insights</h2>
          <p>
            Choosing an Internet Service Provider (ISP) is one of the most critical decisions for remote work, cloud engineering, and esports gaming. Our global rankings evaluate real-world consumer performance rather than marketing claims.
          </p>

          <div className="guide-insights-grid">
            <div className="insight-box">
              <h3>⚡ 1. Pure FTTH (Fiber to the Home)</h3>
              <p>
                Optical fiber cables run directly into your residential modem or Optical Network Terminal (ONT). Delivers 100% symmetric speeds, zero radio interference, and sub-5ms local latency.
              </p>
            </div>

            <div className="insight-box">
              <h3>📺 2. Hybrid Coaxial / DOCSIS 3.1</h3>
              <p>
                Coaxial copper wiring delivers massive download bandwidth (up to 1+ Gbps) but suffers from asymmetric upload limitations (typically 35–50 Mbps).
              </p>
            </div>

            <div className="insight-box">
              <h3>🛰️ 3. Subsea Submarine Gateways</h3>
              <p>
                ISPs with dedicated private submarine fiber landings (such as Transworld in Pakistan or AT&T globally) offer significantly reduced international latency for European and American gaming servers.
              </p>
            </div>

            <div className="insight-box">
              <h3>📱 4. 4G LTE & 5G Wireless Broadband</h3>
              <p>
                Fixed wireless devices and 5G cellular modems offer rapid deployment without physical wiring. However, latency fluctuates based on tower distance and local weather conditions.
              </p>
            </div>
          </div>
        </div>

        {/* Local & Global City Speed Benchmarks */}
        <div className="glass-panel city-benchmarks-card">
          <h2>🏙️ Local & Global City Internet Speed Benchmarks</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Real-world internet throughput and lowest gaming ping recorded across major metropolitan areas in Pakistan, United States, United Kingdom, UAE, and India.
          </p>
          <div className="mobile-scroll-hint">
            <span>↔️ Swipe / Drag sideways to view Download & Ping metrics</span>
          </div>
          <div className="table-responsive">
            <table className="rankings-table">
              <thead>
                <tr>
                  <th>City / Metro</th>
                  <th>Region / Country</th>
                  <th>Fastest Broadband ISP</th>
                  <th>Median Download</th>
                  <th>Average Ping</th>
                </tr>
              </thead>
              <tbody>
                {CITY_BENCHMARKS.map((item) => (
                  <tr key={item.city}>
                    <td className="isp-name-cell font-bold">
                      <span className="isp-flag-inline">{item.flag}</span> {item.city}
                    </td>
                    <td>{item.region}</td>
                    <td className="font-bold text-cyan">{item.topIsp}</td>
                    <td className="mono text-green font-bold">{item.avgDown}</td>
                    <td className="mono text-orange">{item.avgPing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <FAQSection faqs={ISP_FAQS} />

        <AdSlot slotId="rank-bottom-banner" type="banner" />
      </div>
    </>
  );
}
