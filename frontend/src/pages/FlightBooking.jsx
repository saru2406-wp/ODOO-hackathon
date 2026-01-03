import React, { useState } from 'react';

const FlightBooking = () => {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: 1,
    class: 'economy'
  });

  const [flights, setFlights] = useState([
    {
      id: 1,
      airline: 'Air Travel',
      flightNo: 'AT202',
      from: 'NYC',
      to: 'LON',
      departure: '08:00',
      arrival: '20:00',
      duration: '8h',
      price: 599,
      stops: 0,
      amenities: ['🍽️ Meal', '🎬 Entertainment', '💺 Extra Legroom']
    },
    {
      id: 2,
      airline: 'Global Airlines',
      flightNo: 'GA456',
      from: 'LAX',
      to: 'TOK',
      departure: '14:30',
      arrival: '18:30',
      duration: '12h',
      price: 899,
      stops: 1,
      amenities: ['🍽️ Meal', '🎬 Entertainment', '💤 Sleep Kit']
    },
    {
      id: 3,
      airline: 'Sky Express',
      flightNo: 'SE789',
      from: 'SFO',
      to: 'PAR',
      departure: '22:00',
      arrival: '16:00',
      duration: '11h',
      price: 749,
      stops: 0,
      amenities: ['🍽️ Meal', '🔌 Power Port', '📶 WiFi']
    }
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching flights with:', searchParams);
  };

  const bookFlight = (flightId) => {
    alert(`Booking flight ${flightId}`);
  };

  return (
    <div className="flight-booking">
      <nav className="navbar">
        <div className="nav-brand">
          <h1>Travel Planner</h1>
        </div>
        <div className="nav-links">
          <a href="/dashboard" className="nav-link">← Back to Dashboard</a>
        </div>
      </nav>

      <div className="container">
        <div className="flight-header">
          <h1>✈️ Book Flights</h1>
          <p>Find the best flights for your trip</p>
        </div>

        {/* Search Form */}
        <div className="search-card card">
          <form onSubmit={handleSearch} className="search-form">
            <div className="flight-type">
              <button type="button" className="type-btn active">Round Trip</button>
              <button type="button" className="type-btn">One Way</button>
              <button type="button" className="type-btn">Multi-City</button>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label>From</label>
                <input
                  type="text"
                  placeholder="City or airport"
                  value={searchParams.from}
                  onChange={(e) => setSearchParams({...searchParams, from: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>To</label>
                <input
                  type="text"
                  placeholder="City or airport"
                  value={searchParams.to}
                  onChange={(e) => setSearchParams({...searchParams, to: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Departure</label>
                <input
                  type="date"
                  value={searchParams.departure}
                  onChange={(e) => setSearchParams({...searchParams, departure: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Return</label>
                <input
                  type="date"
                  value={searchParams.return}
                  onChange={(e) => setSearchParams({...searchParams, return: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Passengers</label>
                <select
                  value={searchParams.passengers}
                  onChange={(e) => setSearchParams({...searchParams, passengers: parseInt(e.target.value)})}
                >
                  {[1,2,3,4,5,6].map(num => (
                    <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Class</label>
                <select
                  value={searchParams.class}
                  onChange={(e) => setSearchParams({...searchParams, class: e.target.value})}
                >
                  <option value="economy">Economy</option>
                  <option value="premium">Premium Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First Class</option>
                </select>
              </div>
            </div>
            
            <button type="submit" className="search-btn">
              🔍 Search Flights
            </button>
          </form>
        </div>

        {/* Flights List */}
        <div className="flights-list">
          {flights.map(flight => (
            <div key={flight.id} className="flight-card card">
              <div className="flight-header">
                <div className="airline-info">
                  <div className="airline-logo">✈️</div>
                  <div>
                    <h3>{flight.airline}</h3>
                    <p className="flight-no">{flight.flightNo}</p>
                  </div>
                </div>
                <div className="flight-price">
                  <span className="price">${flight.price}</span>
                  <span className="per-person">/person</span>
                </div>
              </div>
              
              <div className="flight-details">
                <div className="route">
                  <div className="departure">
                    <span className="time">{flight.departure}</span>
                    <span className="city">{flight.from}</span>
                  </div>
                  <div className="duration">
                    <div className="line"></div>
                    <span className="duration-text">{flight.duration}</span>
                    {flight.stops === 0 ? (
                      <span className="stops">Non-stop</span>
                    ) : (
                      <span className="stops">{flight.stops} stop{flight.stops > 1 ? 's' : ''}</span>
                    )}
                  </div>
                  <div className="arrival">
                    <span className="time">{flight.arrival}</span>
                    <span className="city">{flight.to}</span>
                  </div>
                </div>
                
                <div className="flight-amenities">
                  {flight.amenities.map((amenity, index) => (
                    <span key={index} className="amenity">{amenity}</span>
                  ))}
                </div>
                
                <div className="flight-actions">
                  <button className="details-btn">📋 Details</button>
                  <button 
                    className="book-btn"
                    onClick={() => bookFlight(flight.id)}
                  >
                    🎫 Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="filters-section">
          <h3>Filter by:</h3>
          <div className="filter-options">
            <label className="filter-option">
              <input type="checkbox" defaultChecked /> Non-stop flights
            </label>
            <label className="filter-option">
              <input type="checkbox" /> Morning flights
            </label>
            <label className="filter-option">
              <input type="checkbox" /> Evening flights
            </label>
            <label className="filter-option">
              <input type="checkbox" /> Baggage included
            </label>
          </div>
          
          <div className="price-range">
            <h4>Price Range</h4>
            <input type="range" min="100" max="2000" step="50" className="range-slider" />
            <div className="price-labels">
              <span>$100</span>
              <span>$2000</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .flight-booking {
          min-height: 100vh;
          background: linear-gradient(135deg, #e0f7fa 0%, #fce4ec 100%);
        }

        .navbar {
          background: white;
          padding: 20px 40px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-brand h1 {
          color: #333;
          font-size: 1.5rem;
        }

        .nav-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 30px;
        }

        .flight-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .flight-header h1 {
          font-size: 3rem;
          color: #333;
          margin-bottom: 10px;
        }

        .flight-header p {
          color: #666;
          font-size: 1.2rem;
        }

        .search-card {
          margin-bottom: 40px;
        }

        .flight-type {
          display: flex;
          gap: 10px;
          margin-bottom: 25px;
        }

        .type-btn {
          padding: 12px 25px;
          background: #f8f9fa;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
        }

        .type-btn.active,
        .type-btn:hover {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 25px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-weight: 600;
          color: #333;
        }

        .form-group input,
        .form-group select {
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #667eea;
        }

        .search-btn {
          width: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 15px;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .search-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .flights-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 40px;
        }

        .flight-card {
          transition: transform 0.3s ease;
        }

        .flight-card:hover {
          transform: translateY(-3px);
        }

        .flight-card .flight-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          text-align: left;
        }

        .airline-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .airline-logo {
          font-size: 2rem;
        }

        .airline-info h3 {
          margin: 0;
          color: #333;
        }

        .flight-no {
          color: #666;
          font-size: 0.9rem;
        }

        .flight-price {
          text-align: right;
        }

        .flight-price .price {
          font-size: 1.8rem;
          font-weight: bold;
          color: #333;
        }

        .flight-price .per-person {
          font-size: 0.9rem;
          color: #666;
          display: block;
        }

        .flight-details {
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
        }

        .route {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .departure, .arrival {
          text-align: center;
          flex: 1;
        }

        .departure .time,
        .arrival .time {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
          display: block;
        }

        .departure .city,
        .arrival .city {
          color: #666;
          font-size: 1rem;
        }

        .duration {
          flex: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .line {
          width: 100%;
          height: 2px;
          background: #667eea;
          margin: 10px 0;
          position: relative;
        }

        .line:before {
          content: '✈️';
          position: absolute;
          top: -10px;
          right: 0;
          font-size: 1.2rem;
        }

        .duration-text {
          font-weight: bold;
          color: #333;
        }

        .stops {
          font-size: 0.9rem;
          color: #666;
        }

        .flight-amenities {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }

        .amenity {
          background: white;
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 0.9rem;
          color: #333;
          border: 1px solid #e0e0e0;
        }

        .flight-actions {
          display: flex;
          gap: 10px;
        }

        .details-btn, .book-btn {
          flex: 1;
          padding: 12px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .details-btn {
          background: #f8f9fa;
          border: 2px solid #e0e0e0;
          color: #333;
        }

        .book-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
        }

        .details-btn:hover {
          background: #e9ecef;
        }

        .book-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .filters-section {
          padding: 25px;
          background: white;
          border-radius: 10px;
        }

        .filters-section h3 {
          margin-bottom: 20px;
          color: #333;
        }

        .filter-options {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 30px;
        }

        .filter-option {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .price-range {
          margin-top: 20px;
        }

        .price-range h4 {
          margin-bottom: 15px;
          color: #333;
        }

        .range-slider {
          width: 100%;
          margin-bottom: 10px;
        }

        .price-labels {
          display: flex;
          justify-content: space-between;
          color: #666;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .container {
            padding: 15px;
          }
          
          .flight-header h1 {
            font-size: 2rem;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .flight-type {
            flex-direction: column;
          }
          
          .route {
            flex-direction: column;
            gap: 20px;
          }
          
          .flight-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default FlightBooking;