import React from 'react';
import './Speedometer.css';

export default function Speedometer({ value = 0, max = 200, unit = 'Mbps', label = 'READY', isTesting = false }) {
  const clampedValue = Math.min(Math.max(value, 0), max);
  const angle = (clampedValue / max) * 180 - 90;

  const radius = 110;
  const strokeWidth = 14;
  const circumference = Math.PI * radius;
  const progressOffset = circumference - (clampedValue / max) * circumference;

  return (
    <div className={`speedometer-container ${isTesting ? 'active-glow' : ''}`}>
      <svg className="speedometer-svg" viewBox="0 0 300 200">
        <defs>
          <linearGradient id="speedArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="45%" stopColor="#818cf8" />
            <stop offset="75%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>

          <radialGradient id="needleGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>

          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Track Arc */}
        <path
          d="M 40 160 A 110 110 0 0 1 260 160"
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Dynamic Progress Arc */}
        <path
          d="M 40 160 A 110 110 0 0 1 260 160"
          fill="none"
          stroke="url(#speedArcGrad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          filter="url(#glowFilter)"
          style={{ transition: 'stroke-dashoffset 0.25s ease-out' }}
        />

        {/* Scale Ticks */}
        {[0, 25, 50, 75, 100, 150, 200].map((tickVal) => {
          const tickAngle = ((tickVal / max) * 180 - 180) * (Math.PI / 180);
          const x1 = 150 + 90 * Math.cos(tickAngle);
          const y1 = 160 + 90 * Math.sin(tickAngle);
          const x2 = 150 + 100 * Math.cos(tickAngle);
          const y2 = 160 + 100 * Math.sin(tickAngle);
          const tx = 150 + 74 * Math.cos(tickAngle);
          const ty = 160 + 74 * Math.sin(tickAngle);

          return (
            <g key={tickVal}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
              <text
                x={tx}
                y={ty}
                fill="rgba(255,255,255,0.5)"
                fontSize="10"
                fontFamily="Inter, sans-serif"
                textAnchor="middle"
                dominantBaseline="central"
              >
                {tickVal}
              </text>
            </g>
          );
        })}

        {/* Center Needle */}
        <g transform={`translate(150, 160) rotate(${angle})`} style={{ transition: 'transform 0.25s cubic-bezier(0.2, 0, 0, 1)' }}>
          <polygon points="-3,0 0,-115 3,0" fill="#38bdf8" filter="url(#glowFilter)" />
          <circle cx="0" cy="0" r="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="4" />
          <circle cx="0" cy="0" r="4" fill="#34d399" />
        </g>
      </svg>

      {/* Digital Speed Display */}
      <div className="speed-readout">
        <span className="speed-value mono">{value.toFixed(1)}</span>
        <span className="speed-unit">{unit}</span>
      </div>
      <div className="speed-status-badge">{label}</div>
    </div>
  );
}
