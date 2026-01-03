import React, { useState } from 'react';

const HotelBooking = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1
  });

  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: 'Grand Luxury Hotel',
      location: 'Bali, Indonesia',
      rating: 4.8,
      price: 299,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      amenities: ['🏊 Pool', '🍽️ Restaurant', '🅿️ Parking', '🏋️ Gym']
    },
    {
      id: 2,
      name: 'Beachfront Resort',
      location: 'Phuket, Thailand',
      rating: 4.5,
      price: 189,
      image: 'https://images.unsplash.com/photo-1516496636080-14fb876e029d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      amenities: ['🏖️ Beach', '🍹 Bar', '🧘 Spa', '🚗 Shuttle']
    },
    {
      id: 3,
      name: 'City Center Hotel',
      location: 'Tokyo, Japan',
      rating: 4.7,
      price: 249,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      amenities: ['🏢 City View', '🛍️ Shopping', '💼 Business', '🍱 Restaurant']
    }
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching hotels with:', searchParams);
  };

  const bookHotel = (hotelId) => {
    alert(`Booking hotel ${hotelId}`);
    // Implement booking logic
  };

  return (
    <div className="hotel-booking">
      <nav className="navbar">
        <div className="nav-brand">
          <h1>Travel Planner</h1>
        </div>
        <div className="nav-links">
          <a href="/dashboard" className="nav-link">← Back to Dashboard</a>
        </div>
      </nav>

      <div className="container">
        <div className="hotel-header">
          <h1>🏨 Book Hotels</h1>
          <p>Find the perfect stay for your journey</p>
        </div>

        {/* Search Form */}
        <div className="search-card card">
          <form onSubmit={handleSearch} className="search-form">
            <div className="form-row">
              <div className="form-group">
                <label>Destination</label>
                <input
                  type="text"
                  placeholder="Where do you want to stay?"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Check-in</label>
                <input
                  type="date"
                  value={searchParams.checkIn}
                  onChange={(e) => setSearchParams({...searchParams, checkIn: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Check-out</label>
                <input
                  type="date"
                  value={searchParams.checkOut}
                  onChange={(e) => setSearchParams({...searchParams, checkOut: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Guests</label>
                <select
                  value={searchParams.guests}
                  onChange={(e) => setSearchParams({...searchParams, guests: parseInt(e.target.value)})}
                >
                  {[1,2,3,4,5,6].map(num => (
                    <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Rooms</label>
                <select
                  value={searchParams.rooms}
                  onChange={(e) => setSearchParams({...searchParams, rooms: parseInt(e.target.value)})}
                >
                  {[1,2,3,4].map(num => (
                    <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <button type="submit" className="search-btn">
                  🔍 Search Hotels
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Hotels Grid */}
        <div className="hotels-grid">
          {hotels.map(hotel => (
            <div key={hotel.id} className="hotel-card card">
              <div className="hotel-image">
                <img src={hotel.image} alt={hotel.name} />
                <div className="hotel-rating">
                  ⭐ {hotel.rating} <span className="rating-text">Excellent</span>
                </div>
              </div>
              <div className="hotel-info">
                <div className="hotel-header">
                  <h3>{hotel.name}</h3>
                  <div className="hotel-price">
                    <span className="price">${hotel.price}</span>
                    <span className="per-night">/night</span>
                  </div>
                </div>
                <p className="hotel-location">📍 {hotel.location}</p>
                
                <div className="hotel-amenities">
                  {hotel.amenities.map((amenity, index) => (
                    <span key={index} className="amenity">{amenity}</span>
                  ))}
                </div>
                
                <div className="hotel-actions">
                  <button className="view-btn">👁️ View Details</button>
                  <button 
                    className="book-btn"
                    onClick={() => bookHotel(hotel.id)}
                  >
                    📅 Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="filters-section">
          <h3>Filter by:</h3>
          <div className="filter-tags">
            <span className="filter-tag active">⭐ 4+ Stars</span>
            <span className="filter-tag">🏊 Pool</span>
            <span className="filter-tag">🍽️ Free Breakfast</span>
            <span className="filter-tag">🧘 Spa</span>
            <span className="filter-tag">🏢 City Center</span>
            <span className="filter-tag">🏖️ Beachfront</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hotel-booking {
          min-height: 100vh;
          background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
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

        .hotel-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .hotel-header h1 {
          font-size: 3rem;
          color: #333;
          margin-bottom: 10px;
        }

        .hotel-header p {
          color: #666;
          font-size: 1.2rem;
        }

        .search-card {
          margin-bottom: 40px;
        }

        .search-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
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
          transition: border-color 0.3s;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #667eea;
        }

        .search-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 23px;
        }

        .search-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .hotels-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }

        .hotel-card {
          transition: transform 0.3s ease;
        }

        .hotel-card:hover {
          transform: translateY(-5px);
        }

        .hotel-image {
          position: relative;
          height: 200px;
          overflow: hidden;
          border-radius: 10px 10px 0 0;
        }

        .hotel-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hotel-rating {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255, 255, 255, 0.95);
          padding: 8px 15px;
          border-radius: 20px;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .rating-text {
          font-size: 0.8rem;
          color: #666;
        }

        .hotel-info {
          padding: 20px;
        }

        .hotel-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
        }

        .hotel-header h3 {
          margin: 0;
          color: #333;
          font-size: 1.3rem;
        }

        .hotel-price {
          text-align: right;
        }

        .hotel-price .price {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
        }

        .hotel-price .per-night {
          font-size: 0.9rem;
          color: #666;
          display: block;
        }

        .hotel-location {
          color: #666;
          margin-bottom: 15px;
        }

        .hotel-amenities {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }

        .amenity {
          background: #f0f7ff;
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 0.9rem;
          color: #333;
        }

        .hotel-actions {
          display: flex;
          gap: 10px;
        }

        .view-btn, .book-btn {
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

        .view-btn {
          background: #f8f9fa;
          border: 2px solid #e0e0e0;
          color: #333;
        }

        .book-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
        }

        .view-btn:hover {
          background: #e9ecef;
        }

        .book-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .filters-section {
          padding: 20px;
          background: white;
          border-radius: 10px;
        }

        .filters-section h3 {
          margin-bottom: 15px;
          color: #333;
        }

        .filter-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .filter-tag {
          background: #f8f9fa;
          padding: 10px 20px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s;
          border: 2px solid transparent;
        }

        .filter-tag:hover,
        .filter-tag.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        @media (max-width: 768px) {
          .container {
            padding: 15px;
          }
          
          .hotels-grid {
            grid-template-columns: 1fr;
          }
          
          .hotel-header h1 {
            font-size: 2rem;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .hotel-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default HotelBooking;