import React, { useState } from 'react';
import SEO from '../components/SEO';
import AdSlot from '../components/AdSlot';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us"
        description="Get in touch with the Speeda Test 360 team. Send inquiries, bug reports, or partnership requests."
        canonical="/contact"
      />

      <div className="contact-container">
        <AdSlot slotId="contact-top-banner" type="banner" />

        <div className="page-header">
          <h1>📞 Contact <span className="gradient-text">Speeda Test 360</span></h1>
          <p>Have questions, feedback, or business inquiries? We'd love to hear from you!</p>
        </div>

        <div className="contact-grid">
          {/* Contact Info Card */}
          <div className="glass-panel info-side">
            <h2>📫 Get In Touch</h2>
            <p>Our technical team is available to assist with network diagnostic questions or platform feedback.</p>

            <div className="info-list">
              <div className="info-item">
                <span className="info-icon">📧</span>
                <div>
                  <strong>Email Us</strong>
                  <p>support@speedatest360.com</p>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">⚡</span>
                <div>
                  <strong>Platform</strong>
                  <p>Speeda Test 360 Web Engine</p>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">🌐</span>
                <div>
                  <strong>Availability</strong>
                  <p>24/7 Unlimited Free Diagnostic Tests</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="glass-panel form-side">
            {submitted ? (
              <div className="success-message">
                <span className="success-icon">✅</span>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting Speeda Test 360. Our team will review your message shortly.</p>
                <button onClick={() => setSubmitted(false)} className="btn-secondary">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Ali Raza"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="ali@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Feedback / ISP Query"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows="4"
                    required
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary">
                  📨 Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}