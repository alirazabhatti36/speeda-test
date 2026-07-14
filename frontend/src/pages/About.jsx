import SEO from '../components/SEO';
import './About.css';

function About() {
  return (
    <>
      <SEO 
        title="About Us"
        description="Learn about Speeda Test - the most accurate internet speed test tool. AI-powered, fast, and completely free."
        canonical="/about"
      />
      
      <div className="page-container">
        <div className="about-section">
          <h1>About Speeda Test</h1>
          <div className="about-content">
            <div className="about-card">
              <h2>⚡ Our Mission</h2>
              <p>
                We believe in providing <strong>real, accurate internet speed measurements</strong> 
                without the fluff. Market tools often show inflated numbers. We show the truth.
              </p>
            </div>
            
            <div className="about-card">
              <h2>🧠 AI-Powered Testing</h2>
              <p>
                Our <strong>smart termination algorithm</strong> detects when your speed stabilizes 
                and stops the test early. This means faster results with <strong>1.8-4.4x less data usage</strong> 
                compared to traditional tools.
              </p>
            </div>
            
            <div className="about-card">
              <h2>🔒 Privacy First</h2>
              <p>
                We don't store your data. Your speed test results are <strong>never saved</strong> 
                on our servers. What happens in your browser stays in your browser.
              </p>
            </div>
            
            <div className="about-card">
              <h2>🌐 Website Testing</h2>
              <p>
                Test any website's performance with our <strong>detailed analysis tool</strong>. 
                Get insights on load time, page size, server response, and more.
              </p>
            </div>
            
            <div className="about-card highlight">
              <h2>💡 Why Speeda Test?</h2>
              <ul>
                <li>✅ <strong>Accurate</strong> — Real download/upload measurement</li>
                <li>✅ <strong>Fast</strong> — AI-powered early termination</li>
                <li>✅ <strong>Free</strong> — No registration, no limits</li>
                <li>✅ <strong>Private</strong> — No data stored</li>
                <li>✅ <strong>Modern</strong> — Beautiful, responsive design</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;