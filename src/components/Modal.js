import React, { useState, useEffect } from 'react';

const Modal = ({ show, content, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    type: '',
    notes: '',
    reason: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (show) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        type: '',
        notes: '',
        reason: ''
      });
      setLoginData({ email: '', password: '' });
      setErrors({});
      setIsSubmitting(false);
    }
  }, [show, content]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleLoginChange = (field, value) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (content.type === 'booking') {
      if (!formData.name?.trim()) newErrors.name = 'Name is required';
      if (!formData.email?.trim()) newErrors.email = 'Email is required';
      if (!formData.phone?.trim()) newErrors.phone = 'Phone is required';
      if (!formData.date?.trim()) newErrors.date = 'Date is required';
      if (!formData.time?.trim()) newErrors.time = 'Time is required';
      if (!formData.reason?.trim()) newErrors.reason = 'Reason is required';
      
      // Validate email format
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      
      // Validate phone format
      if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number';
      }
      
      // Validate date (not in the past)
      if (formData.date) {
        const selectedDate = new Date(formData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          newErrors.date = 'Please select a future date';
        }
      }
    } else if (content.type === 'login') {
      if (!loginData.email?.trim()) newErrors.email = 'Email is required';
      if (!loginData.password?.trim()) newErrors.password = 'Password is required';
    } else if (content.type === 'availability') {
      if (!formData.date?.trim()) newErrors.date = 'Date is required';
      if (!formData.time?.trim()) newErrors.time = 'Time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        if (content.type === 'booking') {
          await onSubmit({
            doctor: content.data,
            ...formData
          });
        } else if (content.type === 'login') {
          await onSubmit(loginData);
        } else if (content.type === 'availability') {
          await onSubmit(formData);
        }
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const renderModalContent = () => {
    switch (content.type) {
      case 'booking':
        return (
          <form onSubmit={handleSubmit}>
            <div className="booking-summary">
              <h4>Booking Summary</h4>
              <div className="doctor-info">
                <img src={content.data.photo} alt={content.data.name} />
                <div>
                  <h5>{content.data.name}</h5>
                  <p>{content.data.specialization}</p>
                  <p>{content.data.hospital}</p>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="name">Full Name: <span className="required">*</span></label>
              <input 
                type="text" 
                id="name" 
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'error' : ''}
                placeholder="Enter your full name"
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email: <span className="required">*</span></label>
              <input 
                type="email" 
                id="email" 
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'error' : ''}
                placeholder="Enter your email address"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone: <span className="required">*</span></label>
              <input 
                type="tel" 
                id="phone" 
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={errors.phone ? 'error' : ''}
                placeholder="Enter your phone number"
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Preferred Date: <span className="required">*</span></label>
                <input 
                  type="date" 
                  id="date" 
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className={errors.date ? 'error' : ''}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.date && <span className="error-text">{errors.date}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="time">Preferred Time: <span className="required">*</span></label>
                <select 
                  id="time" 
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className={errors.time ? 'error' : ''}
                >
                  <option value="">Select time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
                {errors.time && <span className="error-text">{errors.time}</span>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="reason">Reason for Visit: <span className="required">*</span></label>
              <textarea 
                id="reason" 
                value={formData.reason}
                onChange={(e) => handleInputChange('reason', e.target.value)}
                className={errors.reason ? 'error' : ''}
                placeholder="Please describe your symptoms or reason for visit..."
                rows="3"
              />
              {errors.reason && <span className="error-text">{errors.reason}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="notes">Additional Notes (Optional):</label>
              <textarea 
                id="notes" 
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any additional information..."
                rows="2"
              />
            </div>
            
            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </button>
              <button type="submit" className="btn-confirm" disabled={isSubmitting}>
                {isSubmitting ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        );

      case 'availability':
        return (
          <form onSubmit={handleSubmit}>
            <div className="availability-check">
              <h4>Check Doctor Availability</h4>
              <div className="doctor-info">
                <img src={content.data.photo} alt={content.data.name} />
                <div>
                  <h5>{content.data.name}</h5>
                  <p>{content.data.specialization}</p>
                  <p>{content.data.hospital}</p>
                </div>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date: <span className="required">*</span></label>
                <input 
                  type="date" 
                  id="date" 
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className={errors.date ? 'error' : ''}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.date && <span className="error-text">{errors.date}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="time">Time: <span className="required">*</span></label>
                <select 
                  id="time" 
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className={errors.time ? 'error' : ''}
                >
                  <option value="">Select time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
                {errors.time && <span className="error-text">{errors.time}</span>}
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </button>
              <button type="submit" className="btn-confirm" disabled={isSubmitting}>
                {isSubmitting ? 'Checking...' : 'Check Availability'}
              </button>
            </div>
          </form>
        );

      case 'confirmation':
        return (
          <div className="confirmation-modal">
            <div className="confirmation-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h4>{content.title}</h4>
            <p>{content.message}</p>
            <div className="confirmation-details">
              {content.details && Object.entries(content.details).map(([key, value]) => (
                <div key={key} className="detail-row">
                  <span className="detail-label">{key}:</span>
                  <span className="detail-value">{value}</span>
                </div>
              ))}
            </div>
            <div className="form-actions">
              <button type="button" className="btn-confirm" onClick={onClose}>
                {content.confirmText || 'OK'}
              </button>
            </div>
          </div>
        );

      case 'hospital':
        return (
          <div className="hospital-details">
            <div className="hospital-header">
              <img src={content.data.photo} alt={content.data.name} className="hospital-logo" />
              <div className="hospital-info">
                <h3>{content.data.name}</h3>
                <p className="hospital-type">{content.data.type}</p>
                <div className="hospital-rating">
                  <span className="stars">{'★'.repeat(content.data.rating)}{'☆'.repeat(5 - content.data.rating)}</span>
                  <span className="rating-text">({content.data.rating}/5)</span>
                </div>
              </div>
            </div>
            <div className="hospital-details-content">
              <div className="detail-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{content.data.location}</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-building"></i>
                <span>{content.data.departments.join(', ')}</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-users"></i>
                <span>Capacity: {content.data.capacity} beds</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-phone"></i>
                <span>{content.data.phone}</span>
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Close
              </button>
              <button type="button" className="btn-confirm" onClick={() => onSubmit(content.data)}>
                Contact Hospital
              </button>
            </div>
          </div>
        );

      case 'login':
        return (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email: <span className="required">*</span></label>
              <input 
                type="email" 
                id="email" 
                value={loginData.email}
                onChange={(e) => handleLoginChange('email', e.target.value)}
                className={errors.email ? 'error' : ''}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password: <span className="required">*</span></label>
              <input 
                type="password" 
                id="password" 
                value={loginData.password}
                onChange={(e) => handleLoginChange('password', e.target.value)}
                className={errors.password ? 'error' : ''}
                placeholder="Enter your password"
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>
            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </button>
              <button type="submit" className="btn-confirm" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        );

      default:
        return <div>Modal content not found</div>;
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{content.title}</h3>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          {renderModalContent()}
        </div>
      </div>
    </div>
  );
};

export default Modal; 