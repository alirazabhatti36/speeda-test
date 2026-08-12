import React, { useState } from 'react';
import './ComparePackage.css';

const PAK_ISPS = [
  { name: 'StormFiber', tiers: [20, 30, 40, 50, 100, 200] },
  { name: 'Nayatel', tiers: [15, 25, 50, 70, 100] },
  { name: 'PTCL Fiber Flash Fiber', tiers: [10, 20, 30, 50, 100] },
  { name: 'PTCL VDSL / Broadband', tiers: [6, 8, 15, 25] },
  { name: 'Transworld Home', tiers: [20, 30, 50, 100] },
  { name: 'Cybernet Broadband', tiers: [20, 50, 100] },
  { name: 'Jazz 4G / Device', tiers: [15, 25, 40] },
  { name: 'Zong 4G / MBB', tiers: [20, 35, 50] },
  { name: 'Telenor 4G', tiers: [10, 20, 30] },
  { name: 'Ufone 4G', tiers: [10, 20, 30] }
];

export default function ComparePackage({ currentDownload = 0, currentIsp = '' }) {
  const [selectedIsp, setSelectedIsp] = useState(PAK_ISPS[0].name);
  const [selectedTier, setSelectedTier] = useState(50);
  const [compared, setCompared] = useState(false);

  const activeIspObj = PAK_ISPS.find(i => i.name === selectedIsp) || PAK_ISPS[0];

  const handleCompare = (e) => {
    e.preventDefault();
    setCompared(true);
  };

  const actualSpeed = currentDownload > 0 ? currentDownload : 48.2;
  const pct = Math.min(Math.round((actualSpeed / selectedTier) * 100), 105);

  let statusText = '⚡ Excellent! You are receiving optimal speeds for your package.';
  let badgeColor = '#34d399';

  if (pct < 60) {
    statusText = '⚠️ Below Advertised Speed: Your speed is lower than your package tier. Check router cabling or contact ISP support.';
    badgeColor = '#f87171';
  } else if (pct < 85) {
    statusText = '🟡 Acceptable Speed: Speeds vary slightly due to Wi-Fi overhead or peak network traffic.';
    badgeColor = '#fb923c';
  }

  return (
    <div className="compare-package-container glass-panel">
      <h3>🔍 Compare Speed With Your Subscribed Package</h3>
      <p className="compare-desc">
        Select your ISP and subscribed package speed to see if you are getting 100% of your advertised internet speed.
      </p>

      <form onSubmit={handleCompare} className="compare-form">
        <div className="form-group">
          <label>Select Broadband ISP:</label>
          <select 
            value={selectedIsp} 
            onChange={(e) => {
              setSelectedIsp(e.target.value);
              const newObj = PAK_ISPS.find(i => i.name === e.target.value);
              if (newObj) setSelectedTier(newObj.tiers[0]);
            }}
            className="compare-select"
          >
            {PAK_ISPS.map(isp => (
              <option key={isp.name} value={isp.name}>{isp.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Select Subscribed Package (Mbps):</label>
          <select 
            value={selectedTier} 
            onChange={(e) => setSelectedTier(Number(e.target.value))}
            className="compare-select"
          >
            {activeIspObj.tiers.map(t => (
              <option key={t} value={t}>{t} Mbps Package</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-primary compare-btn">
          ⚡ Calculate Package Delivery Ratio
        </button>
      </form>

      {compared && (
        <div className="compare-result-box">
          <div className="pct-circle" style={{ borderColor: badgeColor, color: badgeColor }}>
            {pct}%
          </div>
          <div>
            <h4 className="mono">{actualSpeed} Mbps Measured / {selectedTier} Mbps Package</h4>
            <p className="compare-status-msg" style={{ color: badgeColor }}>{statusText}</p>
          </div>
        </div>
      )}
    </div>
  );
}
