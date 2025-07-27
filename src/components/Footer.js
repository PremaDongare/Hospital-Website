import React, { useState } from 'react';

const Footer = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    alert('Thank you for your message! We will get back to you soon.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
    setShowContactModal(false);
  };

  const handleInputChange = (field, value) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Hospital Finder</h3>
            <p>
              Hospital Finder is a comprehensive healthcare platform dedicated to connecting patients 
              with the best doctors and hospitals in their area. We believe in making healthcare 
              accessible, transparent, and convenient for everyone.
            </p>
            <div className="footer-stats">
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Doctors</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Hospitals</span>
              </div>
              <div className="stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Patients</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/doctors">Find Doctors</a></li>
              <li><a href="/hospitals">Hospitals</a></li>
              <li><a href="/appointments">Appointments</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Services</h3>
            <ul className="footer-links">
              <li>Doctor Search</li>
              <li>Hospital Directory</li>
              <li>Appointment Booking</li>
              <li>Health Information</li>
              <li>Emergency Contacts</li>
              <li>Telemedicine Support</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Support</h3>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>support@hospitalfinder.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>123 Healthcare Ave, Medical District</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-clock"></i>
                <span>24/7 Support Available</span>
              </div>
            </div>
            <button 
              className="btn-primary contact-btn"
              onClick={() => setShowContactModal(true)}
            >
              Contact Us
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-bottom-left">
              <p>&copy; 2024 Hospital Finder. All rights reserved.</p>
            </div>
            <div className="footer-bottom-right">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="modal-overlay active" onClick={() => setShowContactModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Contact Support</h3>
              <button className="close-btn" onClick={() => setShowContactModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label htmlFor="contactName">Name:</label>
                  <input 
                    type="text" 
                    id="contactName" 
                    required
                    value={contactForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactEmail">Email:</label>
                  <input 
                    type="email" 
                    id="contactEmail" 
                    required
                    value={contactForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactSubject">Subject:</label>
                  <select 
                    id="contactSubject" 
                    required
                    value={contactForm.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Appointment Issues">Appointment Issues</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Partnership">Partnership</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="contactMessage">Message:</label>
                  <textarea 
                    id="contactMessage" 
                    required
                    placeholder="Please describe your inquiry..."
                    value={contactForm.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                  />
                </div>
                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={() => setShowContactModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-confirm">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer; 