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

        {/* IP Address & Network Routing Knowledge */}
        <div className="glass-panel ip-guide-card" style={{ marginTop: '2.5rem', padding: '2rem' }}>
          <h2>🌐 Understanding Public IP Addresses & Network Geolocation</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Your Public IP address is your digital fingerprint on the global Internet. It allows web servers, gaming servers, and streaming providers to route return data packets directly to your router.
          </p>

          <div className="ip-tips-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.4rem' }}>
            <div style={{ background: 'rgba(11, 15, 25, 0.5)', padding: '1.4rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <h3 style={{ color: 'var(--primary-cyan)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🔢 Public vs. Private IP Addresses</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Private IPs (e.g. <code>192.168.1.1</code> or <code>10.0.0.1</code>) are assigned to devices inside your home Wi-Fi network. Your public IP is assigned by your ISP and is visible across the global internet.
              </p>
            </div>

            <div style={{ background: 'rgba(11, 15, 25, 0.5)', padding: '1.4rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <h3 style={{ color: 'var(--neon-green)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🛡️ Autonomous System Numbers (ASN)</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                An ASN is a globally unique identifier for large networks operated by ISPs, telecom backbones, and cloud providers (e.g. Cloudflare, PTCL, AT&T) participating in Border Gateway Protocol (BGP) routing.
              </p>
            </div>

            <div style={{ background: 'rgba(11, 15, 25, 0.5)', padding: '1.4rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <h3 style={{ color: 'var(--sunset-orange)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>📍 IP Geolocation Accuracy</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                IP geolocation indicates the geographical location of your Internet Service Provider's optical routing gateway, which is typically in your city or regional metropolitan hub.
              </p>
            </div>
          </div>
        </div>

        <AdSlot slotId="ip-bottom-banner" type="banner" />
      </div>
    </>
  );
}
