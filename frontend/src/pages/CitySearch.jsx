// src/pages/CitySearch.jsx
import React, { useState, useEffect } from 'react';
import './CitySearch.css';

const CitySearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [cities, setCities] = useState([
    {
      id: 1,
      name: 'Paris',
      country: 'France',
      countryCode: 'FR',
      costIndex: 4,
      popularity: 95,
      description: 'City of Light, known for art, fashion, and culture',
      added: false
    },
    {
      id: 2,
      name: 'Tokyo',
      country: 'Japan',
      countryCode: 'JP',
      costIndex: 5,
      popularity: 92,
      description: 'Vibrant metropolis blending tradition and technology',
      added: true
    },
    {
      id: 3,
      name: 'New York',
      country: 'USA',
      countryCode: 'US',
      costIndex: 5,
      popularity: 98,
      description: 'The city that never sleeps, cultural melting pot',
      added: false
    },
    {
      id: 4,
      name: 'Bali',
      country: 'Indonesia',
      countryCode: 'ID',
      costIndex: 2,
      popularity: 88,
      description: 'Tropical paradise with beautiful beaches and temples',
      added: false
    },
    {
      id: 5,
      name: 'Rome',
      country: 'Italy',
      countryCode: 'IT',
      costIndex: 3,
      popularity: 90,
      description: 'Eternal city with ancient history and delicious cuisine',
      added: false
    },
    {
      id: 6,
      name: 'Sydney',
      country: 'Australia',
      countryCode: 'AU',
      costIndex: 4,
      popularity: 85,
      description: 'Coastal city famous for its harbor and iconic Opera House',
      added: false
    },
    {
      id: 7,
      name: 'Cape Town',
      country: 'South Africa',
      countryCode: 'ZA',
      costIndex: 2,
      popularity: 82,
      description: 'Stunning coastal city with Table Mountain backdrop',
      added: false
    },
    {
      id: 8,
      name: 'Bangkok',
      country: 'Thailand',
      countryCode: 'TH',
      costIndex: 2,
      popularity: 87,
      description: 'Vibrant city with street food, temples, and night markets',
      added: false
    },
  ]);

  const [filteredCities, setFilteredCities] = useState(cities);
  const [countries, setCountries] = useState([]);

  // Extract unique countries
  useEffect(() => {
    const uniqueCountries = Array.from(new Set(cities.map(city => city.country)));
    setCountries(uniqueCountries);
  }, [cities]);

  // Filter cities based on search and country
  useEffect(() => {
    let result = cities;
    
    if (searchQuery) {
      result = result.filter(city => 
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCountry !== 'all') {
      result = result.filter(city => city.country === selectedCountry);
    }
    
    setFilteredCities(result);
  }, [searchQuery, selectedCountry, cities]);

  const handleAddToTrip = (cityId) => {
    setCities(prevCities => 
      prevCities.map(city => 
        city.id === cityId ? { ...city, added: !city.added } : city
      )
    );
  };

  const getCostIndicator = (costIndex) => {
    const indicators = [];
    for (let i = 1; i <= 5; i++) {
      indicators.push(
        <div 
          key={i} 
          className={`cost-indicator ${i <= costIndex ? 'filled' : ''}`}
          style={{ backgroundColor: i <= costIndex ? '#7400b8ff' : '#d5c6e0ff' }}
        />
      );
    }
    return indicators;
  };

  const getPopularityColor = (popularity) => {
    if (popularity >= 90) return '#72efddff'; // turquoise
    if (popularity >= 80) return '#4ea8deff'; // fresh-sky
    if (popularity >= 70) return '#967aa1ff'; // dusty-mauve
    return '#aaa1c8ff'; // lilac-ash
  };

  return (
    <div className="city-search-container">
      <div className="city-search-header">
        <h1 className="title">Discover Cities for Your Trip</h1>
        <p className="subtitle">Search and add cities to build your perfect itinerary</p>
      </div>
      
      <div className="search-controls">
        <div className="search-bar-container">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            className="search-input"
            placeholder="Search cities by name, country, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="clear-search" 
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
        
        <div className="filter-container">
          <label htmlFor="country-filter" className="filter-label">
            <i className="fas fa-globe-americas"></i> Filter by Country:
          </label>
          <select
            id="country-filter"
            className="country-filter"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="all">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="results-info">
        <div className="results-count">
          <span className="count-number">{filteredCities.length}</span>
          <span className="count-text">cities found</span>
        </div>
        <div className="added-count">
          <i className="fas fa-map-marker-alt"></i>
          <span>{cities.filter(city => city.added).length} added to trip</span>
        </div>
      </div>
      
      {filteredCities.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">
            <i className="fas fa-map-marked-alt"></i>
          </div>
          <h3>No cities found</h3>
          <p>Try adjusting your search or filter to find more cities</p>
        </div>
      ) : (
        <div className="city-grid">
          {filteredCities.map(city => (
            <div 
              key={city.id} 
              className={`city-card ${city.added ? 'added' : ''}`}
            >
              <div className="city-card-header">
                <div className="city-name-container">
                  <h3 className="city-name">{city.name}</h3>
                  <div className="country-flag">
                    <span className="country-code">{city.countryCode}</span>
                    <span className="country-name">{city.country}</span>
                  </div>
                </div>
                <button 
                  className={`add-button ${city.added ? 'added' : ''}`}
                  onClick={() => handleAddToTrip(city.id)}
                  aria-label={city.added ? 'Remove from trip' : 'Add to trip'}
                >
                  {city.added ? (
                    <>
                      <i className="fas fa-check"></i>
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-plus"></i>
                      <span>Add to Trip</span>
                    </>
                  )}
                </button>
              </div>
              
              <p className="city-description">{city.description}</p>
              
              <div className="city-stats">
                <div className="stat">
                  <div className="stat-label">
                    <i className="fas fa-money-bill-wave"></i>
                    <span>Cost Index</span>
                  </div>
                  <div className="cost-indicators">
                    {getCostIndicator(city.costIndex)}
                  </div>
                  <div className="stat-value">
                    {city.costIndex === 1 && 'Very Low'}
                    {city.costIndex === 2 && 'Low'}
                    {city.costIndex === 3 && 'Moderate'}
                    {city.costIndex === 4 && 'High'}
                    {city.costIndex === 5 && 'Very High'}
                  </div>
                </div>
                
                <div className="stat">
                  <div className="stat-label">
                    <i className="fas fa-fire"></i>
                    <span>Popularity</span>
                  </div>
                  <div className="popularity-bar-container">
                    <div 
                      className="popularity-bar" 
                      style={{
                        width: `${city.popularity}%`,
                        backgroundColor: getPopularityColor(city.popularity)
                      }}
                    ></div>
                  </div>
                  <div className="stat-value">{city.popularity}%</div>
                </div>
              </div>
              
              <div className="city-tags">
                <span className="tag">
                  <i className="fas fa-utensils"></i> Local Cuisine
                </span>
                <span className="tag">
                  <i className="fas fa-landmark"></i> Cultural Sites
                </span>
                {city.costIndex <= 2 && (
                  <span className="tag budget-tag">
                    <i className="fas fa-wallet"></i> Budget Friendly
                  </span>
                )}
                {city.popularity >= 90 && (
                  <span className="tag popular-tag">
                    <i className="fas fa-star"></i> Top Destination
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="trip-summary">
        <h3>
          <i className="fas fa-suitcase-rolling"></i> Your Trip Summary
        </h3>
        <div className="summary-cities">
          {cities
            .filter(city => city.added)
            .map(city => (
              <div key={city.id} className="summary-city">
                <span className="summary-city-name">{city.name}</span>
                <span className="summary-city-country">{city.country}</span>
                <button 
                  className="summary-remove"
                  onClick={() => handleAddToTrip(city.id)}
                  aria-label={`Remove ${city.name} from trip`}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))
          }
          {cities.filter(city => city.added).length === 0 && (
            <p className="empty-summary">No cities added to your trip yet. Start adding cities above!</p>
          )}
        </div>
        {cities.filter(city => city.added).length > 0 && (
          <button className="view-itinerary-btn">
            <i className="fas fa-map-signs"></i> View Full Itinerary
          </button>
        )}
      </div>
    </div>
  );
};

export default CitySearch;