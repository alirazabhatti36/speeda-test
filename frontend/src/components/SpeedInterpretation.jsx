import React from 'react';
import './SpeedInterpretation.css';

export default function SpeedInterpretation({ download = 0, upload = 0, ping = 0, jitter = 0 }) {
  if (download <= 0) return null;

  // Determine streaming suitability
  const can4K = download >= 25;
  const canHD = download >= 10;
  const canZoom = download >= 5 && upload >= 3;

  // Determine gaming ratings
  const valPingRating = ping < 25 ? 'Excellent (Competitive)' : ping < 55 ? 'Good' : 'Moderate';
  const pubgPingRating = ping < 35 ? 'Excellent' : ping < 70 ? 'Playable' : 'High Lag';
  const cs2PingRating = ping < 20 ? 'Sub-20ms Ultra Low' : ping < 50 ? 'Good' : 'High Ping';

  // Overall Connection Health Grade
  let grade = 'A+';
  let badgeColor = '#34d399'; // Green
  let summaryText = 'Your connection is fast enough for 4K Ultra HD streaming, competitive online gaming, and multiple concurrent HD video calls.';

  if (download < 15 || ping > 60) {
    grade = 'C';
    badgeColor = '#fb923c'; // Orange
    summaryText = 'Your connection is suitable for standard HD video streaming and web browsing, but may experience lag in competitive gaming.';
  } else if (download < 35 || ping > 35) {
    grade = 'B';
    badgeColor = '#38bdf8'; // Cyan
    summaryText = 'Solid broadband connection! Great for Full HD 1080p video calls, fast downloads, and casual online gaming.';
  }

  return (
    <div className="speed-interp-container glass-panel">
      <div className="interp-head">
        <div className="grade-box" style={{ borderColor: badgeColor, color: badgeColor }}>
          {grade}
        </div>
        <div>
          <h3>💡 What Your Results Mean</h3>
          <p className="interp-summary">{summaryText}</p>
        </div>
      </div>

      <div className="interp-grid">
        {/* Streaming & Use Cases */}
        <div className="interp-card">
          <h4>📺 Streaming & Video Calls</h4>
          <ul className="check-list">
            <li className={can4K ? 'pass' : 'fail'}>
              {can4K ? '✅' : '❌'} 4K Ultra HD Streaming (YouTube / Netflix 25+ Mbps)
            </li>
            <li className={canHD ? 'pass' : 'fail'}>
              {canHD ? '✅' : '❌'} Full HD 1080p Multi-Stream (10+ Mbps)
            </li>
            <li className={canZoom ? 'pass' : 'fail'}>
              {canZoom ? '✅' : '❌'} Zoom & Google Meet HD Video Calls (5 Mbps DL / 3 Mbps UL)
            </li>
          </ul>
        </div>

        {/* Gaming Performance Breakdown */}
        <div className="interp-card">
          <h4>🎮 Gaming Performance</h4>
          <div className="game-ratings">
            <div className="game-row">
              <span>🎮 Valorant:</span>
              <span className="mono font-bold text-cyan">{valPingRating}</span>
            </div>
            <div className="game-row">
              <span>🎮 PUBG Mobile / PC:</span>
              <span className="mono font-bold text-green">{pubgPingRating}</span>
            </div>
            <div className="game-row">
              <span>🎮 CS2 / Counter-Strike:</span>
              <span className="mono font-bold text-cyan">{cs2PingRating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
