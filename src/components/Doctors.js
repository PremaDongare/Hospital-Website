import React, { useState, useEffect } from 'react';
import { doctorsData } from '../data/data';

const Doctors = ({ doctors, onBookAppointment, onSearch, onCheckAvailability }) => {
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [filters, setFilters] = useState({
    specialization: '',
    hospital: '',
    experience: '',
    rating: ''
  });

  const [specializations, setSpecializations] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    // Extract unique specializations and hospitals for filters
    const specs = [...new Set(doctorsData.map(d => d.specialization))];
    const hosps = [...new Set(doctorsData.map(d => d.hospital))];
    setSpecializations(specs);
    setHospitals(hosps);
  }, []);

  useEffect(() => {
    setFilteredDoctors(doctors);
  }, [doctors]);

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    let filtered = doctors;

    // Apply filters
    if (newFilters.specialization) {
      filtered = filtered.filter(d => d.specialization === newFilters.specialization);
    }
    if (newFilters.hospital) {
      filtered = filtered.filter(d => d.hospital === newFilters.hospital);
    }
    if (newFilters.experience) {
      const [min, max] = newFilters.experience.split('-').map(Number);
      filtered = filtered.filter(d => {
        if (max && d.experience >= min && d.experience <= max) return true;
        if (!max && d.experience >= min) return true;
        return false;
      });
    }
    if (newFilters.rating) {
      const [min, max] = newFilters.rating.split('-').map(Number);
      filtered = filtered.filter(d => {
        if (max && d.rating >= min && d.rating <= max) return true;
        if (!max && d.rating >= min) return true;
        return false;
      });
    }

    setFilteredDoctors(filtered);
  };

  const clearFilters = () => {
    setFilters({
      specialization: '',
      hospital: '',
      experience: '',
      rating: ''
    });
    setFilteredDoctors(doctors);
  };

  return (
    <section className="section">
      <div className="section-header">
        <h2>Find Doctors</h2>
        <p>Browse through our network of qualified healthcare professionals</p>
      </div>

      <div className="filters-container">
        <div className="filter-group">
          <label htmlFor="specializationFilter">Specialization:</label>
          <select 
            id="specializationFilter"
            value={filters.specialization}
            onChange={(e) => handleFilterChange('specialization', e.target.value)}
          >
            <option value="">All Specializations</option>
            {specializations.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="hospitalFilter">Hospital:</label>
          <select 
            id="hospitalFilter"
            value={filters.hospital}
            onChange={(e) => handleFilterChange('hospital', e.target.value)}
          >
            <option value="">All Hospitals</option>
            {hospitals.map(hospital => (
              <option key={hospital} value={hospital}>{hospital}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="experienceFilter">Experience:</label>
          <select 
            id="experienceFilter"
            value={filters.experience}
            onChange={(e) => handleFilterChange('experience', e.target.value)}
          >
            <option value="">All Experience</option>
            <option value="0-5">0-5 years</option>
            <option value="5-10">5-10 years</option>
            <option value="10-15">10-15 years</option>
            <option value="15+">15+ years</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="ratingFilter">Rating:</label>
          <select 
            id="ratingFilter"
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
          >
            <option value="">All Ratings</option>
            <option value="4-5">4+ Stars</option>
            <option value="3-4">3+ Stars</option>
            <option value="2-3">2+ Stars</option>
          </select>
        </div>
        
        <div className="filter-group">
          <button 
            className="btn-secondary" 
            onClick={clearFilters}
            style={{ marginTop: '1.5rem' }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="doctors-grid">
        {filteredDoctors.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-user-md"></i>
            <h3>No doctors found</h3>
            <p>Try adjusting your filters or search criteria</p>
          </div>
        ) : (
          filteredDoctors.map(doctor => (
            <div key={doctor.id} className="doctor-card" data-aos="fade-up">
              <div className="doctor-image">
                <img src={doctor.photo} alt={doctor.name} />
              </div>
              <div className="doctor-info">
                <div className="doctor-header">
                  <div className="doctor-name">{doctor.name}</div>
                  <div className="doctor-rating">
                    <i className="fas fa-star"></i>
                    <span>{doctor.rating}</span>
                  </div>
                </div>
                <div className="doctor-specialization">{doctor.specialization}</div>
                <div className="doctor-details">
                  <div className="doctor-detail">
                    <i className="fas fa-graduation-cap"></i>
                    <span>{doctor.education}</span>
                  </div>
                  <div className="doctor-detail">
                    <i className="fas fa-hospital"></i>
                    <span>{doctor.hospital}</span>
                  </div>
                  <div className="doctor-detail">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{doctor.city}, {doctor.state}</span>
                  </div>
                  <div className="doctor-detail">
                    <i className="fas fa-clock"></i>
                    <span>{doctor.experience} years experience</span>
                  </div>
                  <div className="doctor-detail">
                    <i className="fas fa-dollar-sign"></i>
                    <span>${doctor.consultationFee} consultation fee</span>
                  </div>
                </div>
                <div className="doctor-status">
                  <span className={`status-badge status-${doctor.status.toLowerCase()}`}>
                    {doctor.status}
                  </span>
                </div>
                <div className="doctor-actions">
                  <button 
                    className="btn-secondary check-availability"
                    onClick={() => onCheckAvailability(doctor)}
                  >
                    <i className="fas fa-calendar-check"></i>
                    Check Availability
                  </button>
                  <button 
                    className="book-appointment"
                    onClick={() => onBookAppointment(doctor)}
                    disabled={doctor.status === 'Booked'}
                  >
                    {doctor.status === 'Booked' ? 'Fully Booked' : 'Book Appointment'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Doctors; 