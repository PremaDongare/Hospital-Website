import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ searchQuery, onSearch, onSectionChange }) => {
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value);
    
    if (value.length >= 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = () => {
    if (searchInput.trim()) {
      onSectionChange('doctors');
      navigate('/doctors');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion);
    onSearch(suggestion);
    onSectionChange('doctors');
    navigate('/doctors');
    setShowSuggestions(false);
  };

  const getSearchSuggestions = () => {
    if (!searchInput || searchInput.length < 2) return [];

    const lowerQuery = searchInput.toLowerCase();
    const suggestions = [];

    // Add some sample suggestions
    if (lowerQuery.includes('cardio') || lowerQuery.includes('heart')) {
      suggestions.push('Cardiology');
    }
    if (lowerQuery.includes('skin') || lowerQuery.includes('derma')) {
      suggestions.push('Dermatology');
    }
    if (lowerQuery.includes('child') || lowerQuery.includes('pediatric')) {
      suggestions.push('Pediatrics');
    }
    if (lowerQuery.includes('bone') || lowerQuery.includes('ortho')) {
      suggestions.push('Orthopedics');
    }
    if (lowerQuery.includes('brain') || lowerQuery.includes('neuro')) {
      suggestions.push('Neurology');
    }
    if (lowerQuery.includes('cancer') || lowerQuery.includes('onco')) {
      suggestions.push('Oncology');
    }
    if (lowerQuery.includes('mental') || lowerQuery.includes('psych')) {
      suggestions.push('Psychiatry');
    }
    if (lowerQuery.includes('diabetes') || lowerQuery.includes('endo')) {
      suggestions.push('Endocrinology');
    }

    // Add location suggestions
    if (lowerQuery.includes('new york') || lowerQuery.includes('ny')) {
      suggestions.push('New York, NY');
    }
    if (lowerQuery.includes('los angeles') || lowerQuery.includes('la')) {
      suggestions.push('Los Angeles, CA');
    }
    if (lowerQuery.includes('chicago')) {
      suggestions.push('Chicago, IL');
    }

    return suggestions.slice(0, 8);
  };

  const suggestions = getSearchSuggestions();

  return (
    <section className="section">
      <div className="hero-section">
        <div className="hero-content" data-aos="fade-up">
          <h1>Find the Best Doctors & Hospitals</h1>
          <p>Connect with healthcare professionals and medical facilities in your area</p>
          
          <div className="search-container">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input 
                type="text" 
                placeholder="Search doctors, hospitals, specializations, or cities..."
                value={searchInput}
                onChange={handleSearchChange}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
              />
              <button className="search-btn" onClick={handleSearchSubmit}>
                <i className="fas fa-search"></i>
              </button>
            </div>
            
            {showSuggestions && suggestions.length > 0 && (
              <div className="search-suggestions show">
                {suggestions.map((suggestion, index) => (
                  <div 
                    key={index}
                    className="search-suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <i className="fas fa-search"></i>
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="hero-image" data-aos="fade-left">
          <img 
            src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Healthcare"
          />
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-card" data-aos="zoom-in" data-aos-delay="100">
          <i className="fas fa-user-md"></i>
          <h3>500+</h3>
          <p>Doctors</p>
        </div>
        <div className="stat-card" data-aos="zoom-in" data-aos-delay="200">
          <i className="fas fa-hospital"></i>
          <h3>50+</h3>
          <p>Hospitals</p>
        </div>
        <div className="stat-card" data-aos="zoom-in" data-aos-delay="300">
          <i className="fas fa-users"></i>
          <h3>10K+</h3>
          <p>Patients</p>
        </div>
        <div className="stat-card" data-aos="zoom-in" data-aos-delay="400">
          <i className="fas fa-star"></i>
          <h3>4.8</h3>
          <p>Rating</p>
        </div>
      </div>
    </section>
  );
};

export default Home; 