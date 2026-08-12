import React, { useState } from 'react';
import './ShareResultCard.css';

export default function ShareResultCard({ result, networkInfo }) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const { downloadMbps, uploadMbps, ping, jitter } = result;
  const ispName = networkInfo?.isp || result.isp || 'Broadband ISP';
  const locationStr = networkInfo?.city ? `${networkInfo.city}, ${networkInfo.country}` : 'Global Network';

  const shareText = `⚡ My Speeda Test 360 Result:\n⬇️ Download: ${downloadMbps} Mbps\n⬆️ Upload: ${uploadMbps} Mbps\n⏱️ Ping: ${ping} ms | Jitter: ${jitter} ms\n🌐 ISP: ${ispName} (${locationStr})\n\nTest your internet speed at: https://speedatest360.online`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareOnWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  // Generate PNG image card using HTML5 Canvas
  const downloadResultImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');

    // Canvas Background (360 Cyberpunk Dark Gradient)
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 630);
    bgGrad.addColorStop(0, '#0b0f19');
    bgGrad.addColorStop(0.5, '#0f172a');
    bgGrad.addColorStop(1, '#131b2e');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 630);

    // Glowing Orbs
    const cyanOrb = ctx.createRadialGradient(200, 100, 0, 200, 100, 400);
    cyanOrb.addColorStop(0, 'rgba(0, 242, 254, 0.25)');
    cyanOrb.addColorStop(1, 'rgba(11, 15, 25, 0)');
    ctx.fillStyle = cyanOrb;
    ctx.fillRect(0, 0, 1200, 630);

    const indigoOrb = ctx.createRadialGradient(1000, 500, 0, 1000, 500, 450);
    indigoOrb.addColorStop(0, 'rgba(99, 102, 241, 0.2)');
    indigoOrb.addColorStop(1, 'rgba(11, 15, 25, 0)');
    ctx.fillStyle = indigoOrb;
    ctx.fillRect(0, 0, 1200, 630);

    // Outer Border
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.4)';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 1160, 590);

    // Header Logo & Branding
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 42px Inter, sans-serif';
    ctx.fillText('⚡ Speeda Test', 60, 90);

    ctx.fillStyle = '#00f2fe';
    ctx.font = '900 42px Inter, sans-serif';
    ctx.fillText('360', 365, 90);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 20px Inter, sans-serif';
    ctx.fillText('https://speedatest360.online', 60, 125);

    // Main Card Frame
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.roundRect(60, 160, 1080, 410, 20);
    ctx.fill();
    ctx.stroke();

    // ISP & Network Info Row
    ctx.fillStyle = '#38bdf8';
    ctx.font = '800 24px Inter, sans-serif';
    ctx.fillText(`🌐 Network: ${ispName}`, 90, 220);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '600 20px Inter, sans-serif';
    ctx.fillText(`📍 ${locationStr}`, 700, 220);

    // Divider
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.moveTo(90, 255);
    ctx.lineTo(1050, 255);
    ctx.stroke();

    // Metrics Columns (Download, Upload, Ping, Jitter)
    // 1. Download
    ctx.fillStyle = '#94a3b8';
    ctx.font = '700 18px Inter, sans-serif';
    ctx.fillText('DOWNLOAD SPEED', 90, 310);

    ctx.fillStyle = '#00f2fe';
    ctx.font = '900 68px "JetBrains Mono", monospace';
    ctx.fillText(`${downloadMbps}`, 90, 390);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '700 22px Inter, sans-serif';
    ctx.fillText('Mbps', 90, 430);

    // 2. Upload
    ctx.fillStyle = '#94a3b8';
    ctx.font = '700 18px Inter, sans-serif';
    ctx.fillText('UPLOAD SPEED', 380, 310);

    ctx.fillStyle = '#34d399';
    ctx.font = '900 68px "JetBrains Mono", monospace';
    ctx.fillText(`${uploadMbps}`, 380, 390);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '700 22px Inter, sans-serif';
    ctx.fillText('Mbps', 380, 430);

    // 3. Ping
    ctx.fillStyle = '#94a3b8';
    ctx.font = '700 18px Inter, sans-serif';
    ctx.fillText('PING LATENCY', 670, 310);

    ctx.fillStyle = '#fb923c';
    ctx.font = '900 68px "JetBrains Mono", monospace';
    ctx.fillText(`${ping}`, 670, 390);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '700 22px Inter, sans-serif';
    ctx.fillText('ms', 670, 430);

    // 4. Jitter
    ctx.fillStyle = '#94a3b8';
    ctx.font = '700 18px Inter, sans-serif';
    ctx.fillText('JITTER', 910, 310);

    ctx.fillStyle = '#c084fc';
    ctx.font = '900 68px "JetBrains Mono", monospace';
    ctx.fillText(`${jitter}`, 910, 390);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '700 22px Inter, sans-serif';
    ctx.fillText('ms', 910, 430);

    // Footer Watermark
    ctx.fillStyle = '#64748b';
    ctx.font = '600 16px Inter, sans-serif';
    ctx.fillText('Verified 360° Real-Time Speed Test • Speeda Test 360', 90, 525);

    // Trigger PNG Download
    const link = document.createElement('a');
    link.download = `SpeedaTest360_${downloadMbps}Mbps.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="glass-panel share-card-panel">
      <div className="share-head">
        <div>
          <h3>🎉 Speed Test Completed!</h3>
          <p className="share-sub">Share your verified speed result card with friends or on social media</p>
        </div>
      </div>

      <div className="share-actions-row">
        <button onClick={downloadResultImage} className="btn-share btn-download-img">
          📸 Download Image
        </button>

        <button onClick={copyToClipboard} className="btn-share btn-copy-text">
          {copied ? '✅ Copied!' : '📋 Copy Link'}
        </button>

        <button onClick={shareOnWhatsApp} className="btn-share btn-whatsapp">
          💬 WhatsApp
        </button>

        <button onClick={shareOnTwitter} className="btn-share btn-twitter">
          🐦 Share on X
        </button>
      </div>
    </div>
  );
}
