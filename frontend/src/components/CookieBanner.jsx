import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CookieBanner.css';

export default function CookieBanner() {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('speeda360_cookie_consent');
    if (!consent) {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('speeda360_cookie_consent', 'true');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="cookie-banner-glass">
      <div className="cookie-content">
        <span className="cookie-icon">🍪</span>
        <p>
          We use cookies and Google AdSense to personalize content, ads, and analyze traffic. By using Speeda Test 360, you accept our{' '}
          <Link to="/privacy">Privacy Policy</Link> and <Link to="/cookies">Cookie Policy</Link>.
        </p>
      </div>
      <div className="cookie-actions">
        <button onClick={handleAccept} className="btn-primary btn-sm">
          Accept All Cookies
        </button>
      </div>
    </div>
  );
}
