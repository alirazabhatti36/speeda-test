import React, { useState, useEffect } from 'react';
import './SpeedHistory.css';

export default function SpeedHistory({ currentResult }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('speeda_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse history:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (currentResult && currentResult.downloadMbps) {
      const newItem = {
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        isp: currentResult.isp || 'Local ISP',
        download: currentResult.downloadMbps,
        upload: currentResult.uploadMbps,
        ping: currentResult.ping,
        jitter: currentResult.jitter
      };

      setHistory(prev => {
        // Prevent duplicate entries within 5 seconds
        if (prev.length > 0 && (Date.now() - prev[0].id) < 5000) {
          return prev;
        }
        const updated = [newItem, ...prev].slice(0, 15);
        localStorage.setItem('speeda_history', JSON.stringify(updated));
        return updated;
      });
    }
  }, [currentResult]);

  const clearHistory = () => {
    localStorage.removeItem('speeda_history');
    setHistory([]);
  };

  if (history.length === 0) return null;

  const maxDl = Math.max(...history.map(item => item.download), 10);

  return (
    <div className="speed-history-container glass-panel">
      <div className="history-header">
        <div>
          <h3>📊 Your Speed Test History</h3>
          <span className="history-sub">Saved locally in your browser</span>
        </div>
        <button onClick={clearHistory} className="btn-secondary btn-sm">
          🗑️ Clear History
        </button>
      </div>

      {/* Visual Bar Chart */}
      <div className="history-chart">
        {history.slice(0, 8).reverse().map((item) => {
          const heightPct = Math.max((item.download / maxDl) * 100, 12);
          return (
            <div key={item.id} className="chart-bar-col">
              <span className="chart-val mono">{item.download}</span>
              <div className="chart-bar-wrap">
                <div className="chart-bar" style={{ height: `${heightPct}%` }}></div>
              </div>
              <span className="chart-label">{item.date.split(',')[0]}</span>
            </div>
          );
        })}
      </div>

      {/* History Table */}
      <div className="history-table-wrap">
        <table className="history-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>ISP</th>
              <th>Download</th>
              <th>Upload</th>
              <th>Ping</th>
              <th>Jitter</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td><span className="isp-tag">{item.isp}</span></td>
                <td className="mono font-bold text-cyan">{item.download} Mbps</td>
                <td className="mono font-bold text-green">{item.upload} Mbps</td>
                <td className="mono text-orange">{item.ping} ms</td>
                <td className="mono text-purple">{item.jitter} ms</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
