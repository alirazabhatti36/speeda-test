import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';

import Home from './pages/Home';
import WebsiteTest from './pages/WebsiteTest';
import ISPPage from './pages/ISPPage';
import CityPage from './pages/CityPage';
import GamingSpeedTest from './pages/GamingSpeedTest';
import StreamingSpeedTest from './pages/StreamingSpeedTest';
import MobileSpeedTest from './pages/MobileSpeedTest';
import ISPRankings from './pages/ISPRankings';
import PingTest from './pages/PingTest';
import IPLookup from './pages/IPLookup';
import HowItWorks from './pages/HowItWorks';
import Guide from './pages/Guide';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import CookiePolicy from './pages/CookiePolicy';
import './App.css';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="app-wrapper">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/website-test" element={<WebsiteTest />} />
              
              {/* Pakistan ISP Dedicated Pages */}
              <Route path="/speed-test-pakistan" element={<ISPPage />} />
              <Route path="/ptcl-speed-test" element={<ISPPage />} />
              <Route path="/stormfiber-speed-test" element={<ISPPage />} />
              <Route path="/nayatel-speed-test" element={<ISPPage />} />
              <Route path="/transworld-speed-test" element={<ISPPage />} />
              <Route path="/jazz-speed-test" element={<ISPPage />} />
              <Route path="/zong-speed-test" element={<ISPPage />} />
              <Route path="/ufone-speed-test" element={<ISPPage />} />
              <Route path="/telenor-speed-test" element={<ISPPage />} />
              <Route path="/wateen-speed-test" element={<ISPPage />} />

              {/* Pakistan City Dedicated Pages */}
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

              {/* Legal & Company Pages */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<CookiePolicy />} />
            </Routes>
          </main>
          <Footer />
          <CookieBanner />
        </div>
      </Router>
    </HelmetProvider>
  );
}