import React from 'react';
import SEO from '../components/SEO';
import AdSlot from '../components/AdSlot';
import './ISPRankings.css';

const RANKINGS = [
  { rank: 1, name: 'Nayatel', type: 'FTTH Fiber', avgDownload: '58.4 Mbps', avgUpload: '48.2 Mbps', avgPing: '8 ms', rating: '9.8 / 10' },
  { rank: 2, name: 'StormFiber (Cybernet)', type: 'FTTH Fiber', avgDownload: '52.8 Mbps', avgUpload: '44.5 Mbps', avgPing: '10 ms', rating: '9.6 / 10' },
  { rank: 3, name: 'Transworld Home', type: 'Subsea FTTH', avgDownload: '49.1 Mbps', avgUpload: '42.0 Mbps', avgPing: '11 ms', rating: '9.4 / 10' },
  { rank: 4, name: 'PTCL Flash Fiber', type: 'GPON Fiber', avgDownload: '41.5 Mbps', avgUpload: '35.0 Mbps', avgPing: '14 ms', rating: '8.9 / 10' },
  { rank: 5, name: 'Zong 4G LTE', type: 'Mobile 4G', avgDownload: '32.4 Mbps', avgUpload: '14.2 Mbps', avgPing: '28 ms', rating: '8.5 / 10' },
  { rank: 6, name: 'Jazz 4G / Wingle', type: 'Mobile 4G', avgDownload: '28.9 Mbps', avgUpload: '11.8 Mbps', avgPing: '32 ms', rating: '8.3 / 10' },
  { rank: 7, name: 'PTCL VDSL Broadband', type: 'Copper VDSL', avgDownload: '18.2 Mbps', avgUpload: '4.5 Mbps', avgPing: '24 ms', rating: '7.2 / 10' },
  { rank: 8, name: 'Telenor 4G', type: 'Mobile 4G', avgDownload: '16.5 Mbps', avgUpload: '8.0 Mbps', avgPing: '38 ms', rating: '7.0 / 10' }
];

export default function ISPRankings() {
  return (
    <>
      <SEO 
        title="Pakistan Internet Speed Rankings 2026 — Fastest ISPs Compared"
        description="Official 2026 broadband & mobile speed rankings in Pakistan. Compare Nayatel, StormFiber, PTCL, Transworld, Jazz, and Zong speeds."
        keywords="pakistan isp rankings, fastest internet in pakistan, best isp pakistan, stormfiber vs nayatel vs ptcl, speedtest rankings pakistan"
        canonical="/isp-rankings"
      />

      <div className="rankings-container">
        <AdSlot slotId="rank-top-banner" type="banner" />

        <div className="page-header">
          <h1>🏆 Pakistan Broadband & <span className="gradient-text">ISP Rankings</span></h1>
          <p>Real user-aggregated benchmark rankings for broadband fiber & mobile 4G providers in Pakistan</p>
        </div>

        <div className="glass-panel rankings-card">
          <div className="table-responsive">
            <table className="rankings-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Broadband ISP</th>
                  <th>Network Tech</th>
                  <th>Median Download</th>
                  <th>Median Upload</th>
                  <th>Avg Ping</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {RANKINGS.map((item) => (
                  <tr key={item.rank}>
                    <td className="rank-num mono font-bold">#{item.rank}</td>
                    <td className="isp-name-cell font-bold">{item.name}</td>
                    <td><span className="tech-badge">{item.type}</span></td>
                    <td className="mono text-cyan font-bold">{item.avgDownload}</td>
                    <td className="mono text-green font-bold">{item.avgUpload}</td>
                    <td className="mono text-orange">{item.avgPing}</td>
                    <td className="mono text-purple font-bold">{item.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <AdSlot slotId="rank-bottom-banner" type="banner" />
      </div>
    </>
  );
}
