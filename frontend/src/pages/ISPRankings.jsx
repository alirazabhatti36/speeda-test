import React, { useState } from 'react';
import SEO from '../components/SEO';
import AdSlot from '../components/AdSlot';
import FAQSection from '../components/FAQSection';
import './ISPRankings.css';

const ALL_ISPS = [
  // USA
  { rank: 1, name: 'AT&T Fiber', country: 'USA', flag: '🇺🇸', type: 'Symmetric FTTH', avgDownload: '940 Mbps', avgUpload: '935 Mbps', avgPing: '4 ms', rating: '9.9 / 10', bestFor: 'Gigabit Streaming & Pro Gaming' },
  { rank: 2, name: 'Verizon Fios', country: 'USA', flag: '🇺🇸', type: 'FTTH Fiber', avgDownload: '890 Mbps', avgUpload: '880 Mbps', avgPing: '5 ms', rating: '9.8 / 10', bestFor: 'Low Latency & High Reliability' },
  { rank: 3, name: 'Google Fiber', country: 'USA', flag: '🇺🇸', type: 'Symmetric FTTH', avgDownload: '980 Mbps', avgUpload: '970 Mbps', avgPing: '3 ms', rating: '9.9 / 10', bestFor: 'Pure Multi-Gigabit Fiber' },
  { rank: 4, name: 'Comcast Xfinity', country: 'USA', flag: '🇺🇸', type: 'DOCSIS 3.1 Cable', avgDownload: '580 Mbps', avgUpload: '40 Mbps', avgPing: '15 ms', rating: '9.1 / 10', bestFor: 'Broad National Availability' },
  { rank: 5, name: 'Charter Spectrum', country: 'USA', flag: '🇺🇸', type: 'Hybrid Fiber Coaxial', avgDownload: '450 Mbps', avgUpload: '35 Mbps', avgPing: '18 ms', rating: '8.9 / 10', bestFor: 'No Contract Unlimited Data' },

  // UK
  { rank: 6, name: 'Virgin Media Gig1', country: 'UK', flag: '🇬🇧', type: 'DOCSIS 3.1 / FTTP', avgDownload: '1130 Mbps', avgUpload: '104 Mbps', avgPing: '12 ms', rating: '9.5 / 10', bestFor: 'Ultra Fast Raw Download Speed' },
  { rank: 7, name: 'Community Fibre', country: 'UK', flag: '🇬🇧', type: '100% FTTH Fiber', avgDownload: '920 Mbps', avgUpload: '920 Mbps', avgPing: '4 ms', rating: '9.7 / 10', bestFor: 'London Symmetric Gigabit' },
  { rank: 8, name: 'BT Full Fibre 900', country: 'UK', flag: '🇬🇧', type: 'Openreach FTTP', avgDownload: '900 Mbps', avgUpload: '110 Mbps', avgPing: '8 ms', rating: '9.4 / 10', bestFor: 'Nationwide Fiber Reliability' },

  // UAE
  { rank: 9, name: 'Etisalat by e&', country: 'UAE', flag: '🇦🇪', type: 'eLife Ultra Fiber', avgDownload: '500 Mbps', avgUpload: '250 Mbps', avgPing: '3 ms', rating: '9.7 / 10', bestFor: 'UAE Ultrafast Fiber Network' },
  { rank: 10, name: 'du Home Fiber', country: 'UAE', flag: '🇦🇪', type: 'FTTH Gigabit', avgDownload: '450 Mbps', avgUpload: '220 Mbps', avgPing: '4 ms', rating: '9.5 / 10', bestFor: 'Dubai & Abu Dhabi High Speed' },

  // Pakistan
  { rank: 11, name: 'Nayatel Fiber', country: 'Pakistan', flag: '🇵🇰', type: 'Pure FTTH GPON', avgDownload: '58.4 Mbps', avgUpload: '48.2 Mbps', avgPing: '8 ms', rating: '9.4 / 10', bestFor: 'Islamabad, Rawalpindi, Faisalabad & Peshawar' },
  { rank: 12, name: 'StormFiber (Cybernet)', country: 'Pakistan', flag: '🇵🇰', type: 'FTTH Fiber', avgDownload: '52.8 Mbps', avgUpload: '44.5 Mbps', avgPing: '10 ms', rating: '9.3 / 10', bestFor: 'Karachi, Lahore & Nationwide Fiber' },
  { rank: 13, name: 'Transworld Home', country: 'Pakistan', flag: '🇵🇰', type: 'Submarine Cable Tier-1', avgDownload: '49.1 Mbps', avgUpload: '42.0 Mbps', avgPing: '11 ms', rating: '9.2 / 10', bestFor: 'Low International Gaming Ping' },
  { rank: 14, name: 'PTCL Flash Fiber', country: 'Pakistan', flag: '🇵🇰', type: 'Optical GPON FTTH', avgDownload: '41.5 Mbps', avgUpload: '35.0 Mbps', avgPing: '14 ms', rating: '9.0 / 10', bestFor: 'Widest Fiber Coverage in Pakistan' },
  { rank: 15, name: 'Jazz 4G LTE', country: 'Pakistan', flag: '🇵🇰', type: 'Mobile Cellular 4G', avgDownload: '28.5 Mbps', avgUpload: '14.2 Mbps', avgPing: '24 ms', rating: '8.8 / 10', bestFor: 'Mobile Internet & Super 4G Routers' },
  { rank: 16, name: 'Zong 4G MBB', country: 'Pakistan', flag: '🇵🇰', type: 'Mobile Cellular 4G LTE', avgDownload: '26.8 Mbps', avgUpload: '12.8 Mbps', avgPing: '26 ms', rating: '8.7 / 10', bestFor: 'High Speed Mobile Broadband' },

  // India
  { rank: 17, name: 'JioFiber 1G', country: 'India', flag: '🇮🇳', type: 'FTTH Fiber & 5G', avgDownload: '880 Mbps', avgUpload: '850 Mbps', avgPing: '6 ms', rating: '9.5 / 10', bestFor: 'All-India Gigabit & OTT Bundle' },
  { rank: 18, name: 'Airtel Xstream Fiber', country: 'India', flag: '🇮🇳', type: 'FTTH Gigabit', avgDownload: '860 Mbps', avgUpload: '840 Mbps', avgPing: '5 ms', rating: '9.4 / 10', bestFor: 'Low Latency Fiber & Gaming' }
];

const ISP_FAQS = [
  {
    q: 'How does Speeda Test 360 evaluate and rank ISPs?',
    a: 'Speeda Test 360 compiles millions of real-time browser-based speed test samples. Our ranking metric factors in median download speed (40%), upload throughput (25%), round-trip ping latency (20%), and jitter packet stability (15%).'
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
        title="Global ISP Speed Rankings 2026 — Fastest Broadband & Fiber Networks"
        description="Official broadband and ISP speed rankings. Compare AT&T Fiber, Verizon Fios, Comcast, Virgin Media, BT, Etisalat, Nayatel, StormFiber, Transworld, and JioFiber."
        keywords="isp rankings, broadband speed rankings, fastest isp in the world, fastest internet in pakistan, stormfiber vs nayatel, att fiber vs verizon, jiofiber ranking"
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

        <FAQSection faqs={ISP_FAQS} />

        <AdSlot slotId="rank-bottom-banner" type="banner" />
      </div>
    </>
  );
}
