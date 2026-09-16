import React, { useEffect, useRef } from 'react';
import './AdSlot.css';

export default function AdSlot({ slotId = '1234567890', format = 'auto', type = 'banner', label = 'Advertisement' }) {
  const adRef = useRef(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (pushedRef.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushedRef.current = true;
    } catch (e) {
      // Deferred load safe fallback
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
