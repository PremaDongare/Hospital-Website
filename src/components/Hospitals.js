import React, { useState, useEffect } from 'react';
import { hospitalsData } from '../data/data';

const Hospitals = ({ hospitals, onViewHospital }) => {
  const [filteredHospitals, setFilteredHospitals] = useState(hospitals);
  const [filters, setFilters] = useState({
    type: '',
    location: ''
  });

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Extract unique locations for filters
    const locs = [...new Set(hospitalsData.map(h => h.location))];
    setLocations(locs);
  }, []);

  useEffect(() => {
    setFilteredHospitals(hospitals);
  }, [hospitals]);

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    let filtered = hospitals;

    // Apply filters
    if (newFilters.type) {
      filtered = filtered.filter(h => h.type === newFilters.type);
    }
    if (newFilters.location) {
      filtered = filtered.filter(h => h.location === newFilters.location);
    }

    setFilteredHospitals(filtered);
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      location: ''
    });
    setFilteredHospitals(hospitals);
  };

  return (
    <section className="section">
      <div className="section-header">
        <h2>Hospitals & Clinics</h2>
        <p>Discover healthcare facilities in your area</p>
      </div>

      <div className="filters-container">
        <div className="filter-group">
          <label htmlFor="hospitalTypeFilter">Type:</label>
          <select 
            id="hospitalTypeFilter"
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Government">Government</option>
            <option value="Private">Private</option>
            <option value="Clinic">Clinic</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="hospitalLocationFilter">Location:</label>
          <select 
            id="hospitalLocationFilter"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
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

      <div className="hospitals-grid">
        {filteredHospitals.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-hospital"></i>
            <h3>No hospitals found</h3>
            <p>Try adjusting your filters or search criteria</p>
          </div>
        ) : (
          filteredHospitals.map(hospital => (
            <div key={hospital.id} className="hospital-card" data-aos="fade-up">
              <div className="hospital-image">
                <img src={hospital.photo} alt={hospital.name} />
                <div className={`hospital-type type-${hospital.type.toLowerCase()}`}>
                  {hospital.type}
                </div>
              </div>
              <div className="hospital-info">
                <div className="hospital-name">{hospital.name}</div>
                <div className="hospital-location">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{hospital.location}</span>
                </div>
                <div className="hospital-rating">
                  <i className="fas fa-star"></i>
                  <span>{hospital.rating}</span>
                </div>
                <div className="hospital-departments">
                  {hospital.departments.map(dept => (
                    <span key={dept} className="department-tag">{dept}</span>
                  ))}
                </div>
                <div className="hospital-capacity">
                  <i className="fas fa-bed"></i>
                  <span>Capacity: {hospital.capacity} beds</span>
                </div>
                <button 
                  className="view-hospital"
                  onClick={() => onViewHospital(hospital)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Hospitals; 