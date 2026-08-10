import React from 'react';
import SEO from '../components/SEO';
import AdSlot from '../components/AdSlot';
import './Guide.css';

export default function Guide() {
  return (
    <>
      <SEO 
        title="Internet Speed Guide & Network Optimization Tips"
        description="Comprehensive guide on internet speeds, Wi-Fi troubleshooting, ping reduction, and broadband ISP optimization."
        keywords="internet speed guide, how to fix slow wifi, reduce ping lag, 2.4ghz vs 5ghz wifi, broadband optimization tips"
        canonical="/guide"
      />

      <div className="guide-container">
        <AdSlot slotId="guide-top-banner" type="banner" />

        <div className="page-header">
          <h1>📖 Broadband & Speed Optimization <span className="gradient-text">Guide</span></h1>
          <p>Expert tips to boost your Wi-Fi performance, reduce gaming ping, and fix internet lag.</p>
        </div>

        <div className="glass-panel guide-card">
          <article className="guide-article">
            <h2>1. Understanding Mbps vs MBps</h2>
            <p>
              One of the most common points of confusion for internet users is the difference between <strong>Mbps</strong> (Megabits per second) and <strong>MB/s</strong> (Megabytes per second).
            </p>
            <ul>
              <li><strong>1 Byte = 8 Bits.</strong></li>
              <li>ISPs advertise connection speed in <strong>Mbps</strong> (Megabits).</li>
              <li>File downloads (Steam, web browsers, torrents) display speeds in <strong>MB/s</strong> (Megabytes).</li>
              <li><i>Example:</i> If you have a <strong>100 Mbps</strong> broadband connection, your maximum real-world file download speed is <strong>12.5 MB/s</strong> (100 divided by 8).</li>
            </ul>
          </article>

          <article className="guide-article">
            <h2>2. 2.4 GHz vs 5 GHz Wi-Fi Bands</h2>
            <p>
              Modern Wi-Fi routers transmit on two distinct frequency bands. Choosing the right band can significantly improve your Speeda Test 360 results:
            </p>
            <div className="table-responsive">
              <table className="guide-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>2.4 GHz Band</th>
                    <th>5 GHz Band</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Max Speed</strong></td>
                    <td>Slower (up to 450 Mbps)</td>
                    <td>Faster (up to 1300+ Mbps)</td>
                  </tr>
                  <tr>
                    <td><strong>Signal Range</strong></td>
                    <td>Longer Range (Passes through walls)</td>
                    <td>Shorter Range (Obstacles reduce signal)</td>
                  </tr>
                  <tr>
                    <td><strong>Interference</strong></td>
                    <td>High (Microwaves, Bluetooth)</td>
                    <td>Low (Cleaner wireless spectrum)</td>
                  </tr>
                  <tr>
                    <td><strong>Best For</strong></td>
                    <td>Browsing from distant rooms</td>
                    <td>4K Streaming & Online Gaming</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          <article className="guide-article">
            <h2>3. How to Reduce Gaming Ping & Jitter</h2>
            <p>
              High ping and jitter cause input delay and rubber-banding in competitive multiplayer games (Valorant, CS:GO, PUBG, Fortnite, Call of Duty). Follow these steps to lower your ping:
            </p>
            <ol>
              <li><strong>Use an Ethernet (LAN) Cable:</strong> Wi-Fi signals suffer from packet loss and interference. A wired Cat6 cable delivers consistent 1ms router latency.</li>
              <li><strong>Close Background Bandwidth Hogs:</strong> Turn off cloud sync (OneDrive, Google Drive), torrent clients, and background Windows updates during gaming.</li>
              <li><strong>Change DNS Servers:</strong> Switch to ultra-fast DNS resolvers like Cloudflare DNS (<code>1.1.1.1</code>) or Google Public DNS (<code>8.8.8.8</code>).</li>
              <li><strong>Select Nearest Game Servers:</strong> Always select server regions closest to your geographical location (e.g. Middle East / Singapore / Europe).</li>
            </ol>
          </article>

          <article className="guide-article">
            <h2>4. Troubleshooting Slow Internet Speeds</h2>
            <p>
              If your Speeda Test 360 result is significantly lower than your subscribed plan:
            </p>
            <ul>
              <li><strong>Restart Router (30-Second Power Cycle):</strong> Unplug your router power cord for 30 seconds to flush router RAM and reset stale ISP sessions.</li>
              <li><strong>Check Connected Devices:</strong> Log into your router admin panel (e.g. <code>192.168.1.1</code>) and ensure unauthorized users aren't piggybacking on your Wi-Fi.</li>
              <li><strong>Contact Your ISP:</strong> If speed remains low across wired connections, contact your broadband provider (PTCL, StormFiber, Nayatel, etc.) to check fiber line attenuation.</li>
            </ul>
          </article>
        </div>

        <AdSlot slotId="guide-bottom-banner" type="banner" />
      </div>
    </>
  );
}
