import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';

// Eager load Home for instant LCP on the main landing page
import Home from './pages/Home';

// Lazy load secondary pages to keep initial JS bundle ultra-lightweight
const WebsiteTest = lazy(() => import('./pages/WebsiteTest'));
const ISPPage = lazy(() => import('./pages/ISPPage'));
const CityPage = lazy(() => import('./pages/CityPage'));
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
                <Route path="/" element={<Home />} />
                <Route path="/website-test" element={<WebsiteTest />} />
                <Route path="/website-test.html" element={<WebsiteTest />} />
                
                {/* Global & Regional ISP Landing Pages */}
                <Route path="/global-speed-test" element={<ISPPage />} />
                <Route path="/xfinity-speed-test" element={<ISPPage />} />
                <Route path="/att-speed-test" element={<ISPPage />} />
                <Route path="/verizon-speed-test" element={<ISPPage />} />
                <Route path="/bt-speed-test" element={<ISPPage />} />
                <Route path="/virgin-media-speed-test" element={<ISPPage />} />
                <Route path="/etisalat-speed-test" element={<ISPPage />} />
                <Route path="/du-speed-test" element={<ISPPage />} />
                <Route path="/jio-speed-test" element={<ISPPage />} />
                <Route path="/ptcl-speed-test" element={<ISPPage />} />
                <Route path="/isp/ptcl-speed-test.html" element={<ISPPage />} />
                <Route path="/stormfiber-speed-test" element={<ISPPage />} />
                <Route path="/nayatel-speed-test" element={<ISPPage />} />
                <Route path="/transworld-speed-test" element={<ISPPage />} />
                <Route path="/jazz-speed-test" element={<ISPPage />} />
                <Route path="/zong-speed-test" element={<ISPPage />} />
                <Route path="/ufone-speed-test" element={<ISPPage />} />
                <Route path="/telenor-speed-test" element={<ISPPage />} />
                <Route path="/wateen-speed-test" element={<ISPPage />} />
                <Route path="/us-speed-test" element={<ISPPage />} />
                <Route path="/country/us-speed-test.html" element={<ISPPage />} />

                {/* Global & Regional City Landing Pages */}
                <Route path="/internet-speed-test-new-york" element={<CityPage />} />
                <Route path="/internet-speed-test-london" element={<CityPage />} />
                <Route path="/internet-speed-test-dubai" element={<CityPage />} />
                <Route path="/internet-speed-test-toronto" element={<CityPage />} />
                <Route path="/internet-speed-test-lahore" element={<CityPage />} />
                <Route path="/internet-speed-test-karachi" element={<CityPage />} />
                <Route path="/internet-speed-test-islamabad" element={<CityPage />} />
                <Route path="/internet-speed-test-rawalpindi" element={<CityPage />} />
                <Route path="/internet-speed-test-faisalabad" element={<CityPage />} />

                {/* Use Cases & Network Tools */}
                <Route path="/gaming-speed-test" element={<GamingSpeedTest />} />
                <Route path="/streaming-speed-test" element={<StreamingSpeedTest />} />
                <Route path="/mobile-speed-test" element={<MobileSpeedTest />} />
                <Route path="/isp-rankings" element={<ISPRankings />} />
                <Route path="/ping-test" element={<PingTest />} />
                <Route path="/ip-lookup" element={<IPLookup />} />
                <Route path="/how-speed-test-works" element={<HowItWorks />} />
                <Route path="/guide" element={<Guide />} />

                {/* Legal & Company Pages (with .html aliases) */}
                <Route path="/about" element={<About />} />
                <Route path="/about.html" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/contact.html" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/privacy-policy.html" element={<Privacy />} />
                <Route path="/privacy.html" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/terms.html" element={<Terms />} />
                <Route path="/cookies" element={<CookiePolicy />} />
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