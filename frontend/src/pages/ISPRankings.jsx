import React from 'react';
import SEO from '../components/SEO';
import AdSlot from '../components/AdSlot';
import './ISPRankings.css';

const GLOBAL_RANKINGS = [
  { rank: 1, name: 'AT&T Fiber', country: '🇺🇸 USA', type: 'Symmetric FTTH', avgDownload: '940 Mbps', avgUpload: '935 Mbps', avgPing: '4 ms', rating: '9.9 / 10' },
  { rank: 2, name: 'Verizon Fios', country: '🇺🇸 USA', type: 'FTTH Fiber', avgDownload: '890 Mbps', avgUpload: '880 Mbps', avgPing: '5 ms', rating: '9.8 / 10' },
  { rank: 3, name: 'Etisalat eLife', country: '🇦🇪 UAE', type: 'FTTH Fiber', avgDownload: '500 Mbps', avgUpload: '250 Mbps', avgPing: '3 ms', rating: '9.7 / 10' },
  { rank: 4, name: 'Virgin Media Gig1', country: '🇬🇧 UK', type: 'DOCSIS 3.1', avgDownload: '1130 Mbps', avgUpload: '104 Mbps', avgPing: '12 ms', rating: '9.5 / 10' },
  { rank: 5, name: 'Community Fibre', country: '🇬🇧 UK', type: '100% FTTH', avgDownload: '920 Mbps', avgUpload: '920 Mbps', avgPing: '4 ms', rating: '9.6 / 10' },
  { rank: 6, name: 'JioFiber 1G', country: '🇮🇳 India', type: 'FTTH Fiber', avgDownload: '880 Mbps', avgUpload: '850 Mbps', avgPing: '6 ms', rating: '9.4 / 10' },
  { rank: 7, name: 'Nayatel Fiber', country: '🇵🇰 Pakistan', type: 'FTTH Fiber', avgDownload: '58.4 Mbps', avgUpload: '48.2 Mbps', avgPing: '8 ms', rating: '9.2 / 10' },
  { rank: 8, name: 'StormFiber', country: '🇵🇰 Pakistan', type: 'FTTH Fiber', avgDownload: '52.8 Mbps', avgUpload: '44.5 Mbps', avgPing: '10 ms', rating: '9.1 / 10' }
];

export default function ISPRankings() {
  return (
    <>
      <SEO 
        title="Global Internet Speed Rankings — Fastest Worldwide Broadband ISPs"
        description="Official global broadband speed rankings. Compare Comcast Xfinity, AT&T Fiber, Verizon Fios, Virgin Media, Etisalat, JioFiber, Nayatel & StormFiber."
        keywords="global isp rankings, worldwide internet speed rankings, fastest isp in the world, att fiber vs verizon fios vs virgin media"
        canonical="/isp-rankings"
      />

      <div className="rankings-container">
        <AdSlot slotId="rank-top-banner" type="banner" />

        <div className="page-header">
          <h1>🏆 Global Broadband & <span className="gradient-text">ISP Rankings</span></h1>
          <p>Real user-aggregated speed benchmarks for top broadband & fiber optic ISPs worldwide</p>
        </div>

        <div className="glass-panel rankings-card">
          <div className="table-responsive">
            <table className="rankings-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Broadband Provider</th>
                  <th>Country</th>
                  <th>Network Tech</th>
                  <th>Median Download</th>
                  <th>Median Upload</th>
                  <th>Avg Ping</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {GLOBAL_RANKINGS.map((item) => (
                  <tr key={item.rank}>
                    <td className="rank-num mono font-bold">#{item.rank}</td>
                    <td className="isp-name-cell font-bold">{item.name}</td>
                    <td>{item.country}</td>
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
