import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handlePointerDown = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <nav className="navbar" ref={navRef}>
      <div className="nav-container">
        <div className="nav-header">
          <Link to="/" className="nav-logo">
            ⚡ Speeda Test
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className={`bar ${menuOpen ? 'open' : ''}`} />
            <span className={`bar ${menuOpen ? 'open' : ''}`} />
            <span className={`bar ${menuOpen ? 'open' : ''}`} />
          </button>
        </div>

        <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Speed Test
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/website-test" 
              className={`nav-link ${location.pathname === '/website-test' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Website Test
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/about" 
              className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/contact" 
              className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;