import React, { useEffect } from 'react';
import './AdSlot.css';

export default function AdSlot({ slotId = '1234567890', format = 'auto', type = 'banner', label = 'Advertisement' }) {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.warn('AdSense load error:', e);
    }
  }, []);

  return (
    <div className={`ad-slot-container ad-${type}`}>
      <span className="ad-label">{label}</span>
      <div className="ad-box">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-1373118680696037"
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
        <div className="ad-placeholder-content">
          <span className="ad-icon">📢</span>
          <span className="ad-text">Speeda Test 360 Sponsor Space</span>
        </div>
      </div>
    </div>
  );
}
