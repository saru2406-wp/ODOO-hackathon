import React, { useState } from 'react';

const TripRecommendations = () => {
  const [preferences, setPreferences] = useState({
    budget: 'mid-range',
    duration: '1-2 weeks',
    season: 'any',
    activities: ['beach', 'adventure'],
    region: 'asia'
  });

  const recommendations = [
    {
      id: 1,
      title: 'Bali Paradise',
      description: 'Tropical beaches, temples, and vibrant culture',
      location: 'Bali, Indonesia',
      budget: '$800-$1200',
      duration: '7-10 days',
      bestFor: ['Beach', 'Culture', 'Wellness'],
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.8
    },
    {
      id: 2,
      title: 'Japanese Adventure',
      description: 'Cherry blossoms, ancient temples, and modern cities',
      location: 'Japan',
      budget: '$1500-$2000',
      duration: '10-14 days',
      bestFor: ['Culture', 'Food', 'Nature'],
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.9
    },
    {
      id: 3,
      title: 'Swiss Alps Retreat',
      description: 'Mountain adventures and scenic train rides',
      location: 'Switzerland',
      budget: '$2000-$3000',
      duration: '8-12 days',
      bestFor: ['Adventure', 'Nature', 'Luxury'],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.7
    },
    {
      id: 4,
      title: 'Greek Island Hopping',
      description: 'Ancient ruins, blue domes, and crystal waters',
      location: 'Greece',
      budget: '$1200-$1800',
      duration: '10-14 days',
      bestFor: ['Beach', 'History', 'Food'],
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.6
    },
    {
      id: 5,
      title: 'Moroccan Desert',
      description: 'Desert camps, markets, and architecture',
      location: 'Morocco',
      budget: '$800-$1500',
      duration: '8-12 days',
      bestFor: ['Adventure', 'Culture', 'Photography'],
      image: 'https://images.unsplash.com/photo-1516470930795-6ba256c9dab5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.5
    },
    {
      id: 6,
      title: 'New Zealand Road Trip',
      description: 'Epic landscapes, adventure sports, and Maori culture',
      location: 'New Zealand',
      budget: '$2500-$3500',
      duration: '14-21 days',
      bestFor: ['Adventure', 'Nature', 'Road Trip'],
      image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.9
    }
  ];

  const [filteredRecs, setFilteredRecs] = useState(recommendations);

  const handleFilterChange = (key, value) => {
    const newPrefs = { ...preferences, [key]: value };
    setPreferences(newPrefs);
    
    // Filter recommendations based on preferences
    const filtered = recommendations.filter(rec => {
      // Budget filter
      if (newPrefs.budget === 'budget' && !rec.budget.includes('$800')) return false;
      if (newPrefs.budget === 'mid-range' && !rec.budget.includes('$1200') && !rec.budget.includes('$1500')) return false;
      if (newPrefs.budget === 'luxury' && !rec.budget.includes('$2000')) return false;
      
      // Duration filter
      if (newPrefs.duration === 'short' && !rec.duration.includes('7')) return false;
      if (newPrefs.duration === 'medium' && !rec.duration.includes('10')) return false;
      if (newPrefs.duration === 'long' && !rec.duration.includes('14')) return false;
      
      return true;
    });
    
    setFilteredRecs(filtered);
  };

  const saveRecommendation = (recId) => {
    alert(`Saved recommendation ${recId} to your trips!`);
    // Implement save functionality
  };

  const planTrip = (recId) => {
    alert(`Planning trip for recommendation ${recId}`);
    // Redirect to trip planner
  };

  return (
    <div className="trip-recommendations">
      <nav className="navbar">
        <div className="nav-brand">
          <h1>Travel Planner</h1>
        </div>
        <div className="nav-links">
          <a href="/dashboard" className="nav-link">← Back to Dashboard</a>
        </div>
      </nav>

      <div className="container">
        <div className="recommendations-header">
          <h1>🌟 Personalized Recommendations</h1>
          <p>Discover your perfect trip based on your preferences</p>
        </div>

        {/* Preferences Filter */}
        <div className="preferences-card card">
          <h3>Set Your Preferences</h3>
          <div className="preferences-grid">
            <div className="preference-group">
              <label>Budget</label>
              <div className="preference-options">
                {['budget', 'mid-range', 'luxury'].map(option => (
                  <button
                    key={option}
                    className={`preference-btn ${preferences.budget === option ? 'active' : ''}`}
                    onClick={() => handleFilterChange('budget', option)}
                  >
                    {option === 'budget' ? '💰 Budget' : 
                     option === 'mid-range' ? '💎 Mid-Range' : 
                     '👑 Luxury'}
                  </button>
                ))}
              </div>
            </div>

            <div className="preference-group">
              <label>Trip Duration</label>
              <div className="preference-options">
                {['short', 'medium', 'long'].map(option => (
                  <button
                    key={option}
                    className={`preference-btn ${preferences.duration === option ? 'active' : ''}`}
                    onClick={() => handleFilterChange('duration', option)}
                  >
                    {option === 'short' ? '⏱️ Short (3-7 days)' : 
                     option === 'medium' ? '📅 Medium (1-2 weeks)' : 
                     '🗓️ Long (2+ weeks)'}
                  </button>
                ))}
              </div>
            </div>

            <div className="preference-group">
              <label>Travel Season</label>
              <div className="preference-options">
                {['spring', 'summer', 'fall', 'winter', 'any'].map(option => (
                  <button
                    key={option}
                    className={`preference-btn ${preferences.season === option ? 'active' : ''}`}
                    onClick={() => handleFilterChange('season', option)}
                  >
                    {option === 'spring' ? '🌸 Spring' : 
                     option === 'summer' ? '☀️ Summer' : 
                     option === 'fall' ? '🍂 Fall' : 
                     option === 'winter' ? '❄️ Winter' : 
                     '🌎 Any Season'}
                  </button>
                ))}
              </div>
            </div>

            <div className="preference-group">
              <label>Preferred Activities</label>
              <div className="activity-tags">
                {['beach', 'adventure', 'culture', 'food', 'nature', 'luxury'].map(activity => (
                  <span
                    key={activity}
                    className={`activity-tag ${preferences.activities.includes(activity) ? 'active' : ''}`}
                    onClick={() => {
                      const newActivities = preferences.activities.includes(activity)
                        ? preferences.activities.filter(a => a !== activity)
                        : [...preferences.activities, activity];
                      setPreferences({...preferences, activities: newActivities});
                    }}
                  >
                    {activity === 'beach' ? '🏖️ Beach' : 
                     activity === 'adventure' ? '🧗 Adventure' : 
                     activity === 'culture' ? '🏛️ Culture' : 
                     activity === 'food' ? '🍜 Food' : 
                     activity === 'nature' ? '🌿 Nature' : 
                     '💎 Luxury'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="recommendations-grid">
          {filteredRecs.map(rec => (
            <div key={rec.id} className="recommendation-card card">
              <div className="rec-image">
                <img src={rec.image} alt={rec.title} />
                <div className="rec-rating">
                  ⭐ {rec.rating}
                </div>
                <div className="rec-budget">{rec.budget}</div>
              </div>
              
              <div className="rec-content">
                <h3>{rec.title}</h3>
                <p className="rec-location">📍 {rec.location}</p>
                <p className="rec-description">{rec.description}</p>
                
                <div className="rec-details">
                  <div className="detail-item">
                    <span className="detail-icon">⏱️</span>
                    <span className="detail-text">{rec.duration}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">💼</span>
                    <span className="detail-text">{rec.budget}</span>
                  </div>
                </div>
                
                <div className="rec-tags">
                  {rec.bestFor.map((tag, index) => (
                    <span key={index} className="rec-tag">{tag}</span>
                  ))}
                </div>
                
                <div className="rec-actions">
                  <button 
                    className="save-btn"
                    onClick={() => saveRecommendation(rec.id)}
                  >
                    💾 Save
                  </button>
                  <button 
                    className="plan-btn"
                    onClick={() => planTrip(rec.id)}
                  >
                    📅 Plan Trip
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredRecs.length === 0 && (
          <div className="no-results card">
            <h3>No recommendations match your preferences</h3>
            <p>Try adjusting your filters to see more options</p>
            <button 
              className="reset-btn"
              onClick={() => {
                setPreferences({
                  budget: 'mid-range',
                  duration: '1-2 weeks',
                  season: 'any',
                  activities: ['beach', 'adventure'],
                  region: 'asia'
                });
                setFilteredRecs(recommendations);
              }}
            >
              🔄 Reset Filters
            </button>
          </div>
        )}

        {/* AI Recommendations */}
        <div className="ai-section card">
          <h3>🤖 AI-Powered Suggestions</h3>
          <p>Our AI can create a custom itinerary based on your preferences</p>
          <div className="ai-options">
            <button className="ai-btn">
              🎯 Generate Personalized Itinerary
            </button>
            <button className="ai-btn">
              💰 Find Best Deals
            </button>
            <button className="ai-btn">
              🤝 Match with Travel Buddies
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .trip-recommendations {
          min-height: 100vh;
          background: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);
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
          max-width: 1400px;
          margin: 0 auto;
          padding: 30px;
        }

        .recommendations-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .recommendations-header h1 {
          font-size: 3rem;
          color: #333;
          margin-bottom: 10px;
        }

        .recommendations-header p {
          color: #666;
          font-size: 1.2rem;
        }

        .preferences-card {
          margin-bottom: 40px;
        }

        .preferences-card h3 {
          margin-bottom: 25px;
          color: #333;
        }

        .preferences-grid {
          display: grid;
          gap: 30px;
        }

        .preference-group {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .preference-group label {
          font-weight: 600;
          color: #333;
          font-size: 1.1rem;
        }

        .preference-options {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .preference-btn {
          padding: 12px 20px;
          background: #f8f9fa;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .preference-btn.active,
        .preference-btn:hover {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .activity-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .activity-tag {
          padding: 10px 20px;
          background: #f8f9fa;
          border: 2px solid #e0e0e0;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .activity-tag.active,
        .activity-tag:hover {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .recommendations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }

        .recommendation-card {
          transition: transform 0.3s ease;
          overflow: hidden;
        }

        .recommendation-card:hover {
          transform: translateY(-5px);
        }

        .rec-image {
          position: relative;
          height: 200px;
          overflow: hidden;
          border-radius: 10px 10px 0 0;
        }

        .rec-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .rec-rating {
          position: absolute;
          top: 15px;
          left: 15px;
          background: rgba(255, 255, 255, 0.95);
          padding: 8px 15px;
          border-radius: 20px;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .rec-budget {
          position: absolute;
          bottom: 15px;
          right: 15px;
          background: rgba(102, 126, 234, 0.95);
          color: white;
          padding: 8px 15px;
          border-radius: 20px;
          font-weight: bold;
        }

        .rec-content {
          padding: 20px;
        }

        .rec-content h3 {
          margin: 0 0 10px 0;
          color: #333;
          font-size: 1.4rem;
        }

        .rec-location {
          color: #666;
          margin-bottom: 10px;
          font-size: 0.95rem;
        }

        .rec-description {
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .rec-details {
          display: flex;
          gap: 20px;
          margin-bottom: 15px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .detail-icon {
          font-size: 1.2rem;
        }

        .detail-text {
          color: #333;
          font-weight: 500;
        }

        .rec-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .rec-tag {
          background: #eef2ff;
          color: #667eea;
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .rec-actions {
          display: flex;
          gap: 10px;
        }

        .save-btn, .plan-btn {
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

        .save-btn {
          background: #f8f9fa;
          border: 2px solid #e0e0e0;
          color: #333;
        }

        .plan-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
        }

        .save-btn:hover {
          background: #e9ecef;
        }

        .plan-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .no-results {
          text-align: center;
          padding: 40px;
          margin-bottom: 40px;
        }

        .no-results h3 {
          margin-bottom: 10px;
          color: #333;
        }

        .no-results p {
          color: #666;
          margin-bottom: 20px;
        }

        .reset-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .reset-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .ai-section {
          text-align: center;
          padding: 40px;
        }

        .ai-section h3 {
          margin-bottom: 10px;
          color: #333;
        }

        .ai-section p {
          color: #666;
          margin-bottom: 30px;
        }

        .ai-options {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          justify-content: center;
        }

        .ai-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 15px 25px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ai-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        @media (max-width: 768px) {
          .container {
            padding: 15px;
          }
          
          .recommendations-grid {
            grid-template-columns: 1fr;
          }
          
          .recommendations-header h1 {
            font-size: 2rem;
          }
          
          .preference-options {
            flex-direction: column;
          }
          
          .rec-actions {
            flex-direction: column;
          }
          
          .ai-options {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default TripRecommendations;