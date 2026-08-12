import React from 'react';
import './LiveSparkline.css';

export default function LiveSparkline({ dataPoints = [], maxVal = 200, color = '#00f2fe', label = 'Live Speed Graph' }) {
  if (!dataPoints || dataPoints.length < 2) {
    return (
      <div className="sparkline-container empty">
        <span className="sparkline-placeholder">📈 Live speed graph will plot here during test...</span>
      </div>
    );
  }

  const width = 600;
  const height = 110;
  const padding = 10;

  const effectiveMax = Math.max(...dataPoints, maxVal * 0.5, 10);
  const stepX = (width - padding * 2) / (dataPoints.length - 1);

  // Generate SVG path coordinates
  const points = dataPoints.map((val, idx) => {
    const x = padding + idx * stepX;
    const y = height - padding - (val / effectiveMax) * (height - padding * 2);
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;
  const areaD = `M ${padding},${height - padding} L ${points.join(' L ')} L ${width - padding},${height - padding} Z`;

  const currentVal = dataPoints[dataPoints.length - 1] || 0;
  const peakVal = Math.max(...dataPoints);

  return (
    <div className="sparkline-container">
      <div className="sparkline-header">
        <span className="sparkline-title">📈 {label}</span>
        <div className="sparkline-stats">
          <span>Current: <strong style={{ color }}>{currentVal.toFixed(1)} Mbps</strong></span>
          <span>Peak: <strong>{peakVal.toFixed(1)} Mbps</strong></span>
        </div>
      </div>

      <svg className="sparkline-svg" viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id="sparkAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
          <filter id="sparkGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Grid Lines */}
        <line x1={padding} y1={height * 0.25} x2={width - padding} y2={height * 0.25} stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
        <line x1={padding} y1={height * 0.5} x2={width - padding} y2={height * 0.5} stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
        <line x1={padding} y1={height * 0.75} x2={width - padding} y2={height * 0.75} stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

        {/* Gradient Area Fill */}
        <path d={areaD} fill="url(#sparkAreaGrad)" />

        {/* Glowing Line */}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#sparkGlow)"
        />

        {/* Current Active Dot */}
        {dataPoints.length > 0 && (
          <circle
            cx={padding + (dataPoints.length - 1) * stepX}
            cy={height - padding - (currentVal / effectiveMax) * (height - padding * 2)}
            r="6"
            fill="#ffffff"
            stroke={color}
            strokeWidth="3"
            filter="url(#sparkGlow)"
          />
        )}
      </svg>
    </div>
  );
}
