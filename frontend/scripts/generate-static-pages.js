import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.error('Dist directory not found! Run vite build first.');
  process.exit(1);
}

const templatePath = path.join(distDir, 'index.html');
const baseTemplate = fs.readFileSync(templatePath, 'utf8');

const PAGES = [
  {
    route: 'gaming-speed-test',
    title: 'Gaming Speed Test & Ping Latency Analyzer — Valorant, PUBG, CS2 | Speeda Test 360',
    description: 'Dedicated gaming speed test. Measure ultra-low ping latency, jitter, packet stability, and bufferbloat for online esports games.',
    keywords: 'gaming speed test, ping test gaming, valorant ping test, pubg ping test, cs2 speed test, packet loss test, bufferbloat test',
    heading: 'Gaming Speed & Ping Test',
    subheading: 'Ultra-fast latency, jitter & bufferbloat measurement for esports & online multiplayer games',
    content: `
      <div class="glass-panel speed-arena">
        <div class="speed-placeholder-value">0.0</div>
        <div class="speed-placeholder-unit">Mbps</div>
        <div class="speed-placeholder-label">READY FOR GAMING SPEED TEST</div>
        <div class="test-control">
          <button class="btn-primary start-btn">🎮 Start Gaming Speed Test</button>
        </div>
      </div>
      <div class="glass-panel gaming-guide-card" style="margin-top: 2rem; padding: 2rem;">
        <h2>Esports Gaming Latency & Bufferbloat Benchmarks</h2>
        <p>In competitive first-person shooters (Valorant, CS2, Rainbow Six Siege) and battle royales (PUBG, Apex Legends, Fortnite), high ping and jitter directly cause hit-registration delays and rubber-banding.</p>
      </div>
    `
  },
  {
    route: 'streaming-speed-test',
    title: 'Streaming Speed Test — YouTube 4K, Netflix & Video Call Readiness | Speeda Test 360',
    description: 'Test your internet download speed for 4K Ultra HD video streaming, Netflix, YouTube 60fps, and Zoom meetings.',
    keywords: 'streaming speed test, netflix speed test, 4k video speed test, youtube 4k test, video call speed check',
    heading: 'Video Streaming Speed Test',
    subheading: 'Check if your internet connection can stream 4K Ultra HD, Netflix 1080p, and HD Zoom calls without buffering',
    content: `
      <div class="glass-panel speed-arena">
        <div class="speed-placeholder-value">0.0</div>
        <div class="speed-placeholder-unit">Mbps</div>
        <div class="speed-placeholder-label">READY FOR STREAMING SPEED TEST</div>
        <div class="test-control">
          <button class="btn-primary start-btn">📺 Start Streaming Test</button>
        </div>
      </div>
      <div class="glass-panel stream-guide-card" style="margin-top: 2rem; padding: 2rem;">
        <h2>4K Video Streaming Bitrates & Buffer Prevention</h2>
        <p>Streaming video at high resolutions requires constant, sustained download throughput without packet drops. Netflix 4K UHD recommends 25 Mbps, YouTube 4K 60fps requires 20 Mbps, and Twitch 1080p broadcasting requires 10 Mbps upload.</p>
      </div>
    `
  },
  {
    route: 'mobile-speed-test',
    title: 'Mobile Internet Speed Test — 4G LTE & 5G Cellular Analytics | Speeda Test 360',
    description: 'Test mobile internet speed for 4G LTE and 5G cellular networks. Real-time cellular throughput, latency, and signal diagnostics.',
    keywords: 'mobile speed test, 4g speed test, 5g speed test, cellular speed check, mobile broadband test, jazz 4g speed, zong 4g speed',
    heading: 'Mobile Internet Speed Test',
    subheading: 'Test 4G LTE & 5G cellular data speeds for global mobile carriers and mobile Wi-Fi devices',
    content: `
      <div class="glass-panel speed-arena">
        <div class="speed-placeholder-value">0.0</div>
        <div class="speed-placeholder-unit">Mbps</div>
        <div class="speed-placeholder-label">READY FOR MOBILE SPEED TEST</div>
        <div class="test-control">
          <button class="btn-primary start-btn">📱 Start Mobile Speed Test</button>
        </div>
      </div>
      <div class="glass-panel mobile-guide-card" style="margin-top: 2rem; padding: 2rem;">
        <h2>Mobile Broadband: Understanding 4G LTE & 5G Performance Factors</h2>
        <p>Cellular internet speeds depend heavily on environmental conditions, cellular carrier spectrum bands, tower congestion, and distance from the mobile basestation.</p>
      </div>
    `
  },
  {
    route: 'website-test',
    title: 'Website Speed Tester — TTFB, HTTP Response & Performance Index | Speeda Test 360',
    description: 'Analyze any website\'s speed and performance. 100% real-time HTTP response codes, TTFB latency, DNS lookup, SSL handshake, and page weight.',
    keywords: 'website speed test, ttfb checker, test site speed, website response time, page load tester, core web vitals check',
    heading: 'Website Speed Tester',
    subheading: '100% Real-Time HTTP Response, TTFB Latency & Throughput Diagnostics',
    content: `
      <div class="glass-panel" style="padding: 2rem; text-align: center; margin: 1.5rem 0;">
        <input type="text" placeholder="Enter website URL (e.g. https://google.com)" style="width: 80%; max-width: 500px; padding: 0.9rem; border-radius: 9999px; border: 1px solid var(--glass-border); background: #0b0f19; color: #fff;" />
        <button class="btn-primary" style="margin-left: 1rem;">🚀 Test Website</button>
      </div>
      <div class="glass-panel web-guide-card" style="margin-top: 2rem; padding: 2rem;">
        <h2>Understanding Website Speed & Core Web Vitals</h2>
        <p>Website loading speed directly impacts bounce rates, conversion rates, and Google organic search rankings. A fast Time to First Byte (TTFB under 200ms) is essential for high search visibility.</p>
      </div>
    `
  },
  {
    route: 'ping-test',
    title: 'Live Network Ping Test & Global Latency Monitor | Speeda Test 360',
    description: 'Continuous live ping test to global gaming servers, Cloudflare Anycast, Google Public DNS, and AWS cloud regions.',
    keywords: 'ping test, online ping test, test ping latency, live ping monitor, gaming ping test, aws ping test',
    heading: 'Live Network Ping Test',
    subheading: 'Real-time HTTP round-trip latency to major edge networks, gaming servers & DNS resolvers',
    content: `
      <div class="glass-panel" style="padding: 2rem; text-align: center; margin: 1.5rem 0;">
        <p style="font-size: 1.1rem; color: #00f2fe; font-weight: 700;">🛰️ Measuring round-trip latency across global Anycast nodes...</p>
      </div>
      <div class="glass-panel ping-guide-card" style="margin-top: 2rem; padding: 2rem;">
        <h2>What is Ping & How Does Latency Impact Online Performance?</h2>
        <p>Ping measures the round-trip latency (in milliseconds) required for a data packet to travel from your device to a remote server and return. Lower ping numbers indicate a faster, more responsive connection.</p>
      </div>
    `
  },
  {
    route: 'ip-lookup',
    title: 'Public IP Address & Network ISP Lookup Tool | Speeda Test 360',
    description: 'Check your public IP address, broadband ISP provider, Autonomous System Number (ASN), city, and geolocation details.',
    keywords: 'my ip, ip lookup, whats my ip, isp lookup, ip geolocation, asn lookup',
    heading: 'Public IP & Network Lookup',
    subheading: 'Instant detection of your public IP address, broadband ISP, location & ASN routing details',
    content: `
      <div class="glass-panel" style="padding: 2rem; text-align: center; margin: 1.5rem 0;">
        <p style="font-size: 1.1rem; color: #00f2fe; font-weight: 700;">🌐 Detecting your public IP and routing gateway...</p>
      </div>
      <div class="glass-panel ip-guide-card" style="margin-top: 2rem; padding: 2rem;">
        <h2>Understanding Public IP Addresses & Network Geolocation</h2>
        <p>Your Public IP address is your digital fingerprint on the global Internet. It allows web servers, gaming servers, and streaming providers to route return data packets directly to your router.</p>
      </div>
    `
  },
  {
    route: 'isp-rankings',
    title: 'Global & Local ISP Speed Rankings 2026 — Fastest Broadband, Fiber & 4G/5G Networks | Speeda Test 360',
    description: 'Official broadband & ISP speed rankings. Compare AT&T Fiber, Verizon Fios, Comcast, Virgin Media, BT, Etisalat, Nayatel, StormFiber, PTCL, Transworld, Jazz, Zong, and JioFiber.',
    keywords: 'isp rankings, broadband speed rankings, fastest isp in pakistan, ptcl speed test, stormfiber speed test, nayatel speed test, transworld speed test, jazz 4g speed, zong 4g speed, ufone 4g speed, internet speed test karachi, lahore broadband speeds, islamabad fiber test, rawalpindi internet, faisalabad speed test, peshawar fiber, multan wifi test, att fiber speed test, verizon fios test, xfinity speed test, virgin media speed test, etisalat speed test dubai, du fiber uae, jiofiber speed test, airtel xstream test, starlink speed test, fastest internet in the world',
    heading: 'Global & Local Broadband & ISP Rankings',
    subheading: 'Real performance benchmarks, median throughput & latency metrics for top global and regional ISPs',
    content: `
      <div class="glass-panel" style="padding: 2rem; text-align: center; margin: 1.5rem 0;">
        <p style="font-size: 1.1rem; color: #00f2fe; font-weight: 700;">🏆 Aggregating real-time broadband benchmarks across 50+ providers & cities...</p>
      </div>
      <div class="glass-panel ranking-guide-card" style="margin-top: 2rem; padding: 2rem;">
        <h2>Broadband Speed Benchmarking & Technology Insights</h2>
        <p>Choosing an Internet Service Provider (ISP) is one of the most critical decisions for remote work, cloud engineering, and esports gaming. Pure FTTH symmetric fiber provides the highest throughput with sub-5ms local ping.</p>
      </div>
    `
  },
  {
    route: 'guide',
    title: 'Broadband Speed Optimization Guide & Network Tips | Speeda Test 360',
    description: 'Comprehensive guide on internet speeds, Wi-Fi troubleshooting, ping reduction, and broadband ISP optimization.',
    keywords: 'internet speed guide, how to fix slow wifi, reduce ping lag, 2.4ghz vs 5ghz wifi, broadband optimization tips',
    heading: 'Broadband & Speed Optimization Guide',
    subheading: 'Expert tips to boost your Wi-Fi performance, reduce gaming ping, and fix internet lag',
    content: `
      <div class="glass-panel guide-card" style="padding: 2rem;">
        <h2>1. Understanding Mbps vs MBps</h2>
        <p>1 Byte = 8 Bits. ISPs advertise connection speed in Mbps (Megabits), whereas file downloads display in MB/s (Megabytes). A 100 Mbps line delivers 12.5 MB/s actual download throughput.</p>
        <h2>2. 2.4 GHz vs 5 GHz Wi-Fi Bands</h2>
        <p>5 GHz delivers speeds above 1000 Mbps with cleaner spectrum, while 2.4 GHz travels further through walls.</p>
        <h2>3. How to Reduce Gaming Ping & Jitter</h2>
        <p>Use Ethernet cables, close background sync applications, and switch to ultra-fast DNS like Cloudflare (1.1.1.1) or Google DNS (8.8.8.8).</p>
      </div>
    `
  },
  {
    route: 'how-speed-test-works',
    title: 'How Speeda Test 360 Works — Methodology & Test Transparency | Speeda Test 360',
    description: 'Learn how Speeda Test 360 measures internet speed, ping latency, jitter, download throughput, and upload speeds in the browser.',
    keywords: 'how speed test works, speed test methodology, speed test accuracy, browser speed test accuracy, bufferbloat calculation',
    heading: 'How Speeda Test 360 Works',
    subheading: 'Complete technical transparency into our browser measurement algorithms and mathematical formulas',
    content: `
      <div class="glass-panel guide-card" style="padding: 2rem;">
        <h2>Pure Client-Side Measurement Architecture</h2>
        <p>Speeda Test 360 runs 100% inside your web browser using modern W3C Web APIs including performance.now(), ReadableStream, and parallel HTTP chunking.</p>
      </div>
    `
  },
  {
    route: 'about',
    title: 'About Speeda Test 360 — Real-Time Broadband Diagnostics | Speeda Test 360',
    description: 'Learn about Speeda Test 360, our mission for network transparency, our pure client-side testing engine, and our engineering team.',
    keywords: 'about speeda test 360, broadband diagnostics, speed test mission, network transparency, web performance engine',
    heading: 'About Speeda Test 360',
    subheading: 'Global Real-Time Broadband Diagnostics & Transparent Network Analytics',
    content: `
      <div class="glass-panel about-card" style="padding: 2rem;">
        <h2>Our Mission: Unthrottled Network Transparency</h2>
        <p>Speeda Test 360 provides internet users worldwide with transparent, unthrottled, and accurate network speed measurements directly inside the browser.</p>
        <h2>Engineering & Editorial Standards</h2>
        <p>Maintained by lead network software engineer Ali Raza Bhatti and our web performance diagnostic team.</p>
      </div>
    `
  },
  {
    route: 'contact',
    title: 'Contact Speeda Test 360 — Technical Support & Partnerships | Speeda Test 360',
    description: 'Get in touch with the Speeda Test 360 team. Send inquiries, bug reports, or partnership requests.',
    keywords: 'contact speeda test 360, support@speedatest360.online, speed test support',
    heading: 'Contact Speeda Test 360',
    subheading: 'Have questions, feedback, or business inquiries? We\'d love to hear from you!',
    content: `
      <div class="glass-panel" style="padding: 2rem;">
        <h2>📫 Get In Touch</h2>
        <p>Email our technical team directly at: <a href="mailto:support@speedatest360.online" style="color: #00f2fe; font-weight: 700;">support@speedatest360.online</a></p>
        <p>Availability: 24/7 Unlimited Free Diagnostic Tests.</p>
      </div>
    `
  },
  {
    route: 'privacy',
    title: 'Privacy Policy — Speeda Test 360',
    description: 'Speeda Test 360 Privacy Policy. Information on data collection, privacy protection, Google AdSense compliance, GDPR, and CCPA.',
    keywords: 'privacy policy, speeda test 360 privacy, google adsense privacy, gdpr privacy, ccpa privacy policy',
    heading: 'Privacy Policy',
    subheading: 'Our commitment to protecting your digital privacy and transparency',
    content: `
      <div class="glass-panel legal-card" style="padding: 2rem;">
        <h2>1. Information We Collect and Process</h2>
        <p>Speeda Test 360 executes internet connection tests client-side in your browser. We do NOT harvest or sell personally identifiable information.</p>
        <h2>2. Google AdSense & Third-Party Advertising</h2>
        <p>Google is a third-party vendor that uses cookies, including the DoubleClick DART cookie, to serve ads based on prior visits. Users may opt out at adssettings.google.com.</p>
      </div>
    `
  },
  {
    route: 'terms',
    title: 'Terms of Service — Speeda Test 360',
    description: 'Terms of Service for using the Speeda Test 360 free internet speed test diagnostic suite.',
    keywords: 'terms of service, speeda test 360 terms, speed test terms of use, legal terms',
    heading: 'Terms of Service',
    subheading: 'Terms governing the use of speedatest360.online free diagnostic tools',
    content: `
      <div class="glass-panel legal-card" style="padding: 2rem;">
        <h2>1. Nature & Scope of the Service</h2>
        <p>Speeda Test 360 provides a suite of free web-based broadband and network diagnostic tools for personal and informational use.</p>
        <h2>2. Acceptable Use Policy</h2>
        <p>You agree to use Speeda Test 360 responsibly and legally without deploying abusive stress-testing bots.</p>
      </div>
    `
  },
  {
    route: 'cookies',
    title: 'Cookie Policy — Speeda Test 360',
    description: 'Speeda Test 360 Cookie Policy. Information on browser cookies, localStorage, Google AdSense DART cookies, and analytics tracking.',
    keywords: 'cookie policy, speeda test 360 cookies, google adsense cookies, dart cookie, browser localstorage',
    heading: 'Cookie Policy',
    subheading: 'Information on how we use cookies, localStorage, and Google AdSense',
    content: `
      <div class="glass-panel legal-card" style="padding: 2rem;">
        <h2>What Are Cookies & Web Storage?</h2>
        <p>Cookies and HTML5 localStorage help remember preferences, enhance browsing speed, and deliver relevant advertisements via Google AdSense.</p>
      </div>
    `
  }
];

const ALIASES = [
  { file: 'website-test.html', target: '/website-test' },
  { file: 'about.html', target: '/about' },
  { file: 'contact.html', target: '/contact' },
  { file: 'privacy.html', target: '/privacy' },
  { file: 'privacy-policy.html', target: '/privacy' },
  { file: 'terms.html', target: '/terms' }
];

console.log('Generating pre-rendered static HTML pages for all routes...');

for (const page of PAGES) {
  const pageDir = path.join(distDir, page.route);
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }

  let html = baseTemplate;

  // 1. Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${page.title}</title>`);
  html = html.replace(/<meta name="title" content=".*?" \/>/i, `<meta name="title" content="${page.title}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${page.title}" />`);
  html = html.replace(/<meta property="twitter:title" content=".*?" \/>/i, `<meta property="twitter:title" content="${page.title}" />`);

  // 2. Replace Description
  html = html.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${page.description}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${page.description}" />`);
  html = html.replace(/<meta property="twitter:description" content=".*?" \/>/i, `<meta property="twitter:description" content="${page.description}" />`);

  // 3. Replace Keywords
  html = html.replace(/<meta name="keywords" content=".*?" \/>/i, `<meta name="keywords" content="${page.keywords}" />`);

  // 4. Update Canonical & OG URL
  const canonicalUrl = `https://speedatest360.online/${page.route}`;
  html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  
  // 5. Inject JSON-LD Schema (E-E-A-T)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Speeda Test 360",
        "url": "https://speedatest360.online",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "All",
        "description": page.description,
        "keywords": page.keywords,
        "areaServed": [
          { "@type": "Country", "name": "Worldwide" },
          { "@type": "Country", "name": "Pakistan" },
          { "@type": "Country", "name": "United States" },
          { "@type": "Country", "name": "United Kingdom" },
          { "@type": "Country", "name": "United Arab Emirates" },
          { "@type": "Country", "name": "India" }
        ],
        "browserRequirements": "Requires JavaScript & HTML5",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      },
      {
        "@type": "Organization",
        "name": "Speeda Test 360",
        "url": "https://speedatest360.online",
        "logo": "https://speedatest360.online/favicon.svg",
        "founder": {
          "@type": "Person",
          "name": "Ali Raza Bhatti",
          "jobTitle": "Lead Network Software Engineer"
        }
      },
      {
        "@type": "WebPage",
        "name": page.title,
        "url": canonicalUrl,
        "description": page.description
      }
    ]
  };
  html = html.replace('</head>', `  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n</head>`);

  // 5. Inject Pre-rendered App Shell Content
  const prerenderedBody = `
    <div class="app-wrapper">
      <main class="main-content">
        <div class="page-container ${page.route}-page">
          <div class="page-header">
            <h1>${page.heading}</h1>
            <p>${page.subheading}</p>
          </div>
          ${page.content}
        </div>
      </main>
    </div>
  `;

  html = html.replace(/<div id="root">[\s\S]*?<\/div>\s*<\/body>/i, `<div id="root">${prerenderedBody}</div>\n  </body>`);

  fs.writeFileSync(path.join(pageDir, 'index.html'), html, 'utf8');
  console.log(`✓ Created: /${page.route}/index.html`);
}

// Generate redirect aliases
for (const alias of ALIASES) {
  const aliasHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=${alias.target}">
  <link rel="canonical" href="https://speedatest360.online${alias.target}">
  <title>Redirecting to Speeda Test 360...</title>
</head>
<body>
  <p>Redirecting to <a href="${alias.target}">${alias.target}</a>...</p>
</body>
</html>`;
  fs.writeFileSync(path.join(distDir, alias.file), aliasHtml, 'utf8');
  console.log(`✓ Created alias redirect: ${alias.file} -> ${alias.target}`);
}

console.log('Successfully generated all pre-rendered pages & aliases!');
