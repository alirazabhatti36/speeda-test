import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import AdSlot from '../components/AdSlot';
import { getNetworkInfo } from '../utils/speedEngine';
import './IPLookup.css';

export default function IPLookup() {
  const [netData, setNetData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getNetworkInfo();
      setNetData(data);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <SEO 
        title="Public IP & Network ISP Lookup Tool — Check My IP"
        description="Check your public IP address, broadband ISP provider, ASN number, location, city, and geolocation details."
        keywords="my ip, ip lookup, whats my ip, isp lookup, ip geolocation"
        canonical="/ip-lookup"
      />

      <div className="ip-page-container">
        <AdSlot slotId="ip-top-banner" type="banner" />

        <div className="page-header">
          <h1>🌐 Public IP & <span className="gradient-text">Network Lookup</span></h1>
          <p>Instant detection of your public IP address, broadband ISP, location & ASN details</p>
        </div>

        <div className="glass-panel ip-card">
          {loading ? (
            <p className="loading-txt">⏳ Detecting IP Network details...</p>
          ) : netData ? (
            <div className="ip-info-grid">
              <div className="ip-item">
                <span className="ip-lbl">Your Public IP Address</span>
                <span className="ip-big mono text-cyan">{netData.ip}</span>
              </div>

              <div className="ip-item">
                <span className="ip-lbl">Internet Service Provider (ISP)</span>
                <span className="ip-val">{netData.ispLogo} {netData.isp} ({netData.ispRaw || netData.organization})</span>
              </div>

              <div className="ip-item">
                <span className="ip-lbl">Autonomous System Number</span>
                <span className="ip-val mono text-green">{netData.asn}</span>
              </div>

              <div className="ip-item">
                <span className="ip-lbl">City & Location</span>
                <span className="ip-val">{netData.city}, {netData.region}, {netData.country} {netData.countryFlag}</span>
              </div>
            </div>
          ) : null}
        </div>

        <AdSlot slotId="ip-bottom-banner" type="banner" />
      </div>
    </>
  );
}
