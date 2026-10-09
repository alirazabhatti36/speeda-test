import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';

// Eager load Home for instant LCP on the main landing page
import Home from './pages/Home';

// Lazy load secondary high-value pages
const WebsiteTest = lazy(() => import('./pages/WebsiteTest'));
const GamingSpeedTest = lazy(() => import('./pages/GamingSpeedTest'));
const StreamingSpeedTest = lazy(() => import('./pages/StreamingSpeedTest'));
const MobileSpeedTest = lazy(() => import('./pages/MobileSpeedTest'));
const ISPRankings = lazy(() => import('./pages/ISPRankings'));
const PingTest = lazy(() => import('./pages/PingTest'));
const IPLookup = lazy(() => import('./pages/IPLookup'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Guide = lazy(() => import('./pages/Guide'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));

import './App.css';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="app-wrapper">
          <Navbar />
          <main className="main-content">
            <Suspense fallback={
              <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00f2fe', fontSize: '1rem', fontWeight: 600 }}>
                <span>Loading Speeda...</span>
              </div>
            }>
              <Routes>
                {/* 1. Core Speed Test & Dedicated Performance Tools */}
                <Route path="/" element={<Home />} />
                <Route path="/gaming-speed-test" element={<GamingSpeedTest />} />
                <Route path="/streaming-speed-test" element={<StreamingSpeedTest />} />
                <Route path="/mobile-speed-test" element={<MobileSpeedTest />} />
                <Route path="/website-test" element={<WebsiteTest />} />
                <Route path="/ping-test" element={<PingTest />} />
                <Route path="/ip-lookup" element={<IPLookup />} />
                <Route path="/isp-rankings" element={<ISPRankings />} />

                {/* 2. Educational & Transparent Documentation */}
                <Route path="/how-speed-test-works" element={<HowItWorks />} />
                <Route path="/guide" element={<Guide />} />

                {/* 3. Company, Trust & Legal Compliance */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cookies" element={<CookiePolicy />} />

                {/* Legacy Doorway & Aliases Redirects (Ensures zero 404s and no duplicate content) */}
                <Route path="/website-test.html" element={<Navigate to="/website-test" replace />} />
                <Route path="/about.html" element={<Navigate to="/about" replace />} />
                <Route path="/contact.html" element={<Navigate to="/contact" replace />} />
                <Route path="/privacy-policy.html" element={<Navigate to="/privacy" replace />} />
                <Route path="/privacy.html" element={<Navigate to="/privacy" replace />} />
                <Route path="/terms.html" element={<Navigate to="/terms" replace />} />

                {/* Redirect previous thin programmatic ISP pages to master ISP Rankings */}
                <Route path="/global-speed-test" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/xfinity-speed-test" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/att-speed-test" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/verizon-speed-test" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/bt-speed-test" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/virgin-media-speed-test" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/etisalat-speed-test" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/du-speed-test" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/jio-speed-test" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/ptcl-speed-test" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/isp/ptcl-speed-test.html" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/stormfiber-speed-test" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/nayatel-speed-test" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/transworld-speed-test" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/jazz-speed-test" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/zong-speed-test" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/ufone-speed-test" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/telenor-speed-test" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/wateen-speed-test" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/us-speed-test" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/country/us-speed-test.html" element={<Navigate to="/isp-rankings" replace />} />

                {/* Redirect previous thin city doorway pages to master ISP Rankings */}
                <Route path="/internet-speed-test-new-york" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/internet-speed-test-london" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/internet-speed-test-dubai" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/internet-speed-test-toronto" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/internet-speed-test-lahore" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/internet-speed-test-karachi" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/internet-speed-test-islamabad" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/internet-speed-test-rawalpindi" element={<Navigate to="/isp-rankings" replace />} />
                <Route path="/internet-speed-test-faisalabad" element={<Navigate to="/isp-rankings" replace />} />

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <CookieBanner />
        </div>
      </Router>
    </HelmetProvider>
  );
}