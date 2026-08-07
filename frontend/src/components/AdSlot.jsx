import React, { useEffect } from 'react';
import './AdSlot.css';

export default function AdSlot({ slotId = '1234567890', format = 'auto', type = 'banner', label = 'Advertisement' }) {
  useEffect(() => {
    try {
      // Execute AdSense script if adsbygoogle is defined
      if (window.adsbygoogle && process.env.NODE_ENV === 'production') {
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
        {/* Placeholder rendered for smooth layout & AdSense readiness review */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-0000000000000000" // Replace with client AdSense ID
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
