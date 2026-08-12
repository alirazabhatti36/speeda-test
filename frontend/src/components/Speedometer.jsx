import React, { useState, useEffect } from 'react';
import { setAudioEnabled, updateEngineRPM } from '../utils/soundEffects';
import './Speedometer.css';

const GAUGE_THEMES = {
  cyber: {
    id: 'cyber',
    label: '🩵 Cyber Neon',
    stops: ['#00f2fe', '#38bdf8', '#818cf8', '#c084fc'],
    needle: '#00f2fe',
    badgeBg: 'rgba(0, 242, 254, 0.14)',
    badgeBorder: 'rgba(0, 242, 254, 0.4)',
    textColor: '#00f2fe',
    textClass: 'theme-text-cyber'
  },
  volcanic: {
    id: 'volcanic',
    label: '🟧 Volcanic Amber',
    stops: ['#ffb545', '#f59e0b', '#fb923c', '#ef4444'],
    needle: '#ffb545',
    badgeBg: 'rgba(255, 181, 69, 0.14)',
    badgeBorder: 'rgba(255, 181, 69, 0.4)',
    textColor: '#ffb545',
    textClass: 'theme-text-volcanic'
  },
  purple: {
    id: 'purple',
    label: '🟣 Deep Purple',
    stops: ['#c084fc', '#a855f7', '#818cf8', '#34d399'],
    needle: '#c084fc',
    badgeBg: 'rgba(192, 132, 252, 0.14)',
    badgeBorder: 'rgba(192, 132, 252, 0.4)',
    textColor: '#c084fc',
    textClass: 'theme-text-purple'
  }
};

export default function Speedometer({ value = 0, max = 200, unit = 'Mbps', label = 'READY', isTesting = false, onThemeChange }) {
  const [soundOn, setSoundOn] = useState(() => {
    const saved = localStorage.getItem('speeda_sound_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [activeThemeKey, setActiveThemeKey] = useState(() => {
    return localStorage.getItem('speeda_gauge_theme') || 'cyber';
  });

  const currentTheme = GAUGE_THEMES[activeThemeKey] || GAUGE_THEMES.cyber;

  useEffect(() => {
    setAudioEnabled(soundOn);
    localStorage.setItem('speeda_sound_enabled', JSON.stringify(soundOn));
  }, [soundOn]);

  useEffect(() => {
    if (isTesting) {
      updateEngineRPM(value, max);
    }
  }, [value, max, isTesting]);

  const switchTheme = (key) => {
    setActiveThemeKey(key);
    localStorage.setItem('speeda_gauge_theme', key);
    if (onThemeChange) {
      onThemeChange(GAUGE_THEMES[key]?.textColor || '#00f2fe');
    }
  };

  const toggleSound = () => {
    setSoundOn((prev) => !prev);
  };

  const clampedValue = Math.min(Math.max(value, 0), max);
  const angle = (clampedValue / max) * 180 - 90;

  const radius = 110;
  const strokeWidth = 14;
  const circumference = Math.PI * radius;
  const progressOffset = circumference - (clampedValue / max) * circumference;

  return (
    <div className={`speedometer-container ${isTesting ? 'active-glow' : ''}`}>
      {/* Aligned Control Toolbar (Sound FX + Themes in 1 horizontal row) */}
      <div className="speedometer-toolbar">
        <button 
          onClick={toggleSound} 
          className={`control-pill sound-pill ${soundOn ? 'active' : ''}`}
          title={soundOn ? 'Mute Engine Sound' : 'Enable Engine Sound'}
        >
          {soundOn ? '🏎️ Engine Sound: ON' : '🔇 Muted'}
        </button>

        {Object.values(GAUGE_THEMES).map((t) => (
          <button
            key={t.id}
            onClick={() => switchTheme(t.id)}
            className={`control-pill theme-pill ${activeThemeKey === t.id ? 'active' : ''}`}
            style={activeThemeKey === t.id ? { borderColor: t.needle, color: t.textColor } : {}}
          >
            {t.label}
          </button>
        ))}
      </div>

      <svg className="speedometer-svg" viewBox="0 0 300 200">
        <defs>
          <linearGradient id="speedArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={currentTheme.stops[0]} />
            <stop offset="35%" stopColor={currentTheme.stops[1]} />
            <stop offset="70%" stopColor={currentTheme.stops[2]} />
            <stop offset="100%" stopColor={currentTheme.stops[3]} />
          </linearGradient>

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
          <polygon points="-3,0 0,-115 3,0" fill={currentTheme.needle} filter="url(#glowFilter)" />
          <circle cx="0" cy="0" r="10" fill="#0b0f19" stroke={currentTheme.needle} strokeWidth="4" />
          <circle cx="0" cy="0" r="4" fill="#ffffff" />
        </g>
      </svg>

      {/* Digital Speed Display */}
      <div className="speed-readout">
        <span className={`speed-value mono ${currentTheme.textClass}`}>
          {value.toFixed(1)}
        </span>
        <span className="speed-unit">{unit}</span>
      </div>
      
      <div 
        className="speed-status-badge"
        style={{
          background: currentTheme.badgeBg,
          borderColor: currentTheme.badgeBorder,
          color: currentTheme.textColor
        }}
      >
        {label}
      </div>
    </div>
  );
}
