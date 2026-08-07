import React, { useState } from 'react';
import './FAQSection.css';

const FAQS = [
  {
    q: 'How does Speeda Test 360 measure my internet speed?',
    a: 'Speeda Test 360 sends multi-stream encrypted HTTP requests directly between your browser and global high-speed edge CDN nodes (such as Cloudflare). It measures latency (ping), jitter, download throughput, and upload throughput using high-precision Web performance APIs.'
  },
  {
    q: 'What is a good Ping, Download, and Upload speed?',
    a: 'For smooth 4K video streaming and online gaming: Ping under 30ms is excellent, Download speed above 50 Mbps is ideal for families, and Upload speed above 15 Mbps ensures crisp video calls and fast file sharing.'
  },
  {
    q: 'Why does my speed test differ from my internet plan?',
    a: 'Speed test results can be impacted by Wi-Fi distance, router load, background app downloads, browser extensions, VPNs, or network congestion from your Internet Service Provider (ISP).'
  },
  {
    q: 'What is Jitter and why does it matter?',
    a: 'Jitter measures the stability of your network latency over time. Low jitter (under 5ms) ensures smooth video calls (Zoom/Teams) and lag-free online multiplayer gaming without rubber-banding.'
  },
  {
    q: 'Is Speeda Test 360 completely free?',
    a: 'Yes! Speeda Test 360 is 100% free with unlimited tests, zero registration, and complete privacy.'
  }
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="faq-container">
      <div className="faq-header">
        <h2>❓ Frequently Asked Questions</h2>
        <p>Everything you need to know about internet speed, ping, and network performance.</p>
      </div>

      <div className="faq-list">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className={`faq-card glass-panel ${isOpen ? 'active' : ''}`} onClick={() => toggle(idx)}>
              <div className="faq-question">
                <h3>{faq.q}</h3>
                <span className="faq-toggle-icon">{isOpen ? '➖' : '➕'}</span>
              </div>
              {isOpen && <div className="faq-answer">{faq.a}</div>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
