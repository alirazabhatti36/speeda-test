import { useState } from 'react';
import SEO from '../components/SEO';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Email send karne ka logic (abhi simulate karte hain)
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <SEO 
        title="Contact Us"
        description="Get in touch with Speeda Test. Have questions about our speed test tool? Reach out to our team for support."
        canonical="/contact"
      />
      
      <div className="page-container">
        <div className="contact-section">
          <h1>📧 Contact Us</h1>
          <p className="tagline">Have questions? We'd love to hear from you!</p>

          <div className="contact-grid">
            <div className="contact-info">
              <div className="info-card">
                <span>📧</span>
                <h4>Email</h4>
                <p>support@speedatest.com</p>
              </div>
              <div className="info-card">
                <span>🐦</span>
                <h4>Twitter</h4>
                <p>@speedatest</p>
              </div>
              <div className="info-card">
                <span>💬</span>
                <h4>Response Time</h4>
                <p>Usually within 24 hours</p>
              </div>
            </div>

            <div className="contact-form-container">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="submit-btn">
                  ✉️ Send Message
                </button>

                {submitted && (
                  <div className="success-msg">
                    ✅ Thank you! We'll get back to you soon.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;