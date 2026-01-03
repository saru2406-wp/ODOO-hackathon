import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ExpenseSplitter from '../components/ExpenseSplitter';
import { tripsAPI, budgetAPI, recommendationsAPI, itineraryAPI } from '../services/api';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBudget: 0,
    totalSpent: 0,
    totalRemaining: 0,
    totalActivities: 0,
    totalDays: 0
  });
  const [recommendations, setRecommendations] = useState([]);
  const [quickItinerary, setQuickItinerary] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
    fetchDashboardData();
    
    // Listen for trip creation events
    const handleTripCreated = () => {
      fetchDashboardData();
    };
    
    window.addEventListener('tripCreated', handleTripCreated);
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('tripCreated', handleTripCreated);
    };
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch trips
      const tripsData = await tripsAPI.getAll();
      const tripsList = tripsData.trips || [];
      setTrips(tripsList);

      // Calculate statistics
      calculateStats(tripsList);

      // Fetch recommendations
      try {
        const recsData = await recommendationsAPI.getAll();
        setRecommendations(recsData.recommendations?.slice(0, 3) || []);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
      }

      // Fetch quick itinerary from most recent trip
      if (tripsList.length > 0) {
        const mostRecentTrip = tripsList[0];
        try {
          const itineraryData = await itineraryAPI.getByTrip(mostRecentTrip.id);
          if (itineraryData.days && itineraryData.days.length > 0) {
            const firstDay = itineraryData.days[0];
            setQuickItinerary(firstDay.activities?.slice(0, 3) || []);
          }
        } catch (err) {
          console.error('Error fetching itinerary:', err);
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      if (error.message.includes('token') || error.message.includes('Unauthorized')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = async (tripsList) => {
    let totalBudget = 0;
    let totalSpent = 0;
    let totalActivities = 0;
    let totalDays = 0;

    // Calculate from all trips
    for (const trip of tripsList) {
      totalBudget += parseFloat(trip.budget || 0);
      
      // Fetch budget data for each trip
      try {
        const budgetData = await budgetAPI.getByTrip(trip.id);
        totalSpent += parseFloat(budgetData.totalSpent || 0);
      } catch (err) {
        // Trip might not have budget yet
      }

      // Count itinerary days
      try {
        const itineraryData = await itineraryAPI.getByTrip(trip.id);
        if (itineraryData.days) {
          totalDays += itineraryData.days.length;
          itineraryData.days.forEach(day => {
            totalActivities += day.activities?.length || 0;
          });
        }
      } catch (err) {
        // Trip might not have itinerary yet
      }
    }

    setStats({
      totalBudget,
      totalSpent,
      totalRemaining: totalBudget - totalSpent,
      totalActivities,
      totalDays
    });
  };

  const upcomingTrips = trips.filter(trip => {
    const startDate = new Date(trip.start_date || trip.startDate);
    return startDate > new Date();
  });
  
  const pastTrips = trips.filter(trip => {
    const endDate = new Date(trip.end_date || trip.endDate);
    return endDate < new Date();
  });

  return (
    <div className="dashboard">
      {/* NAVBAR - FULL WIDTH */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="nav-brand">
            <h1>✈️ Travel Planner</h1>
          </div>
          <div className="nav-links">
            <Link to="/dashboard" className="nav-link active">🏠 Dashboard</Link>
            <Link to="/trips" className="nav-link">🎒 My Trips</Link>
            <Link to="/itinerary" className="nav-link">📅 Itinerary</Link>
            <Link to="/calendar" className="nav-link">🗓️ Calendar</Link>
            <Link to="/budget" className="nav-link">💰 Budget</Link>
            <Link to="/profile" className="nav-link">👤 Profile</Link>
            <Link to="/publicationary" className="nav-link">📖 Publicationary</Link>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT - FULL WIDTH WITH PROPER SPACING */}
      <div className="main-container">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name || 'Sarah'}! 🌴</h1>
          <p>Your next adventure awaits ✨</p>
        </div>

        <div className="dashboard-grid">
          {/* Travel Stats */}
          <div className="card stats-card">
            <h3>📊 Travel Stats</h3>
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-content">
                  <span className="stat-number">{trips.length}</span>
                  <span className="stat-label">Total Trips</span>
                </div>
              </div>
              <div className="stat-box">
                <div className="stat-content">
                  <span className="stat-number">{upcomingTrips.length}</span>
                  <span className="stat-label">Upcoming</span>
                </div>
              </div>
              <div className="stat-box">
                <div className="stat-content">
                  <span className="stat-number">{pastTrips.length}</span>
                  <span className="stat-label">Completed</span>
                </div>
              </div>
              <div className="stat-box">
                <div className="stat-content">
                  <span className="stat-number">{stats.totalActivities}</span>
                  <span className="stat-label">Activities</span>
                </div>
              </div>
              <div className="stat-box">
                <div className="stat-content">
                  <span className="stat-number">{stats.totalDays}</span>
                  <span className="stat-label">Itinerary Days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card actions-card">
            <h3>🚀 Quick Actions</h3>
            <div className="actions-grid">
              <Link to="/trips/new" className="action-btn">
                <span className="action-icon">➕</span>
                <span className="action-text">Plan New Trip</span>
              </Link>
              <Link to="/budget" className="action-btn">
                <span className="action-icon">💰</span>
                <span className="action-text">Manage Budget</span>
              </Link>
              <Link to="/itinerary" className="action-btn">
                <span className="action-icon">📅</span>
                <span className="action-text">Build Itinerary</span>
              </Link>
              <Link to="/activities" className="action-btn">
                <span className="action-icon">🎯</span>
                <span className="action-text">Find Activities</span>
              </Link>
            </div>
          </div>

          {/* Upcoming Trips */}
          <div className="card trips-card">
            <div className="card-header">
              <h3>⏭️ Upcoming Trips</h3>
              <Link to="/trips" className="view-all">View All →</Link>
            </div>
            <div className="trips-content">
              {upcomingTrips.length > 0 ? (
                <div className="trips-list">
                  {upcomingTrips.slice(0, 3).map(trip => (
                    <div key={trip.id} className="trip-item">
                      <div className="trip-icon">✈️</div>
                      <div className="trip-info">
                        <h4>{trip.destination}</h4>
                        <p className="trip-dates">
                          📅 {new Date(trip.start_date || trip.startDate).toLocaleDateString()} - 
                          {new Date(trip.end_date || trip.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Link to={`/trips/${trip.id}`} className="trip-link">👉</Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-trips">
                  <p>🎒 No upcoming trips.</p>
                  <Link to="/trips/new" className="plan-link">Plan one!</Link>
                </div>
              )}
            </div>
          </div>

          {/* Budget Overview */}
          <div className="card budget-card">
            <div className="card-header">
              <h3>💰 Budget Overview</h3>
            </div>
            <div className="budget-content">
              <div className="budget-summary">
                <div className="budget-item">
                  <span className="budget-icon">💳</span>
                  <div className="budget-details">
                    <span className="budget-label">Total Budget</span>
                    <span className="budget-amount">${stats.totalBudget.toLocaleString()}</span>
                  </div>
                </div>
                <div className="budget-item">
                  <span className="budget-icon">💸</span>
                  <div className="budget-details">
                    <span className="budget-label">Spent</span>
                    <span className="budget-amount spent">${stats.totalSpent.toLocaleString()}</span>
                  </div>
                </div>
                <div className="budget-item">
                  <span className="budget-icon">💎</span>
                  <div className="budget-details">
                    <span className="budget-label">Remaining</span>
                    <span className="budget-amount remaining">${stats.totalRemaining.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <ExpenseSplitter />
            </div>
          </div>
        </div>

        {/* Bottom Section Grid */}
        <div className="dashboard-bottom-grid">
          {/* Recommendations */}
          <div className="card recommendations-card">
            <div className="card-header">
              <h3>🌟 Recommendations</h3>
              <Link to="/recommendations" className="view-all">More →</Link>
            </div>
            <div className="recommendations-list">
              {recommendations.length > 0 ? (
                recommendations.map((rec, index) => (
                  <div key={rec.id || index} className="recommendation-item">
                    <span className="rec-icon">🌟</span>
                    <div className="rec-details">
                      <h4>{rec.title || 'Trip Recommendation'}</h4>
                      <p>📍 {rec.location || 'Amazing destination'}</p>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="recommendation-item">
                    <span className="rec-icon">🏨</span>
                    <div className="rec-details">
                      <h4>Hotel Deals</h4>
                      <p>🏝️ Up to 40% off in Bali</p>
                    </div>
                  </div>
                  <div className="recommendation-item">
                    <span className="rec-icon">✈️</span>
                    <div className="rec-details">
                      <h4>Flight Discounts</h4>
                      <p>🇪🇺 Cheap flights to Europe</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Quick Itinerary */}
          <div className="card itinerary-card">
            <div className="card-header">
              <h3>📅 Quick Itinerary</h3>
            </div>
            <div className="itinerary-preview">
              <div className="timeline">
                {quickItinerary.length > 0 ? (
                  quickItinerary.map((activity, index) => (
                    <div key={activity.id || index} className="timeline-item">
                      <span className="time">{activity.time || 'TBD'}</span>
                      <span className="activity-icon">
                        {activity.type === 'food' ? '🍽️' :
                         activity.type === 'sightseeing' ? '🏛️' :
                         activity.type === 'shopping' ? '🛍️' :
                         activity.type === 'transport' ? '🚗' :
                         activity.type === 'hotel' ? '🏨' : '📍'}
                      </span>
                      <span className="activity">{activity.title || 'Activity'}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="timeline-item">
                      <span className="time">9:00 AM</span>
                      <span className="activity-icon">☕</span>
                      <span className="activity">Breakfast at Cafe</span>
                    </div>
                    <div className="timeline-item">
                      <span className="time">11:00 AM</span>
                      <span className="activity-icon">🏛️</span>
                      <span className="activity">Museum Visit</span>
                    </div>
                    <div className="timeline-item">
                      <span className="time">2:00 PM</span>
                      <span className="activity-icon">🛍️</span>
                      <span className="activity">Lunch & Shopping</span>
                    </div>
                  </>
                )}
              </div>
              <Link to="/itinerary" className="btn btn-outline">📝 Build Full Itinerary</Link>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="booking-section">
          <h2>🎫 Book Your Trip</h2>
          <div className="booking-cards">
            <Link to="/hotels" className="booking-card hotel-booking">
              <span className="booking-icon">🏨</span>
              <h3>Book Hotels</h3>
              <p>Find perfect stays worldwide 🌎</p>
            </Link>
            <Link to="/flights" className="booking-card flight-booking">
              <span className="booking-icon">✈️</span>
              <h3>Book Flights</h3>
              <p>Best flight deals available 💰</p>
            </Link>
            <Link to="/cities" className="booking-card city-booking">
              <span className="booking-icon">🏙️</span>
              <h3>Explore Cities</h3>
              <p>Discover amazing destinations ✨</p>
            </Link>
          </div>
        </div>

          {/* Recent Activity */}
        <div className="activity-section card">
          <div className="card-header">
            <h3>📝 Recent Activity</h3>
          </div>
          <div className="activity-list">
            {trips.length > 0 && (
              <div className="activity-item">
                <span className="activity-icon">✈️</span>
                <div className="activity-details">
                  <p>You have {trips.length} trip{trips.length !== 1 ? 's' : ''} planned</p>
                  <span className="activity-time">Active</span>
                </div>
              </div>
            )}
            {upcomingTrips.length > 0 && (
              <div className="activity-item">
                <span className="activity-icon">📅</span>
                <div className="activity-details">
                  <p>{upcomingTrips.length} upcoming trip{upcomingTrips.length !== 1 ? 's' : ''} scheduled</p>
                  <span className="activity-time">Upcoming</span>
                </div>
              </div>
            )}
            {pastTrips.length > 0 && (
              <div className="activity-item">
                <span className="activity-icon">✅</span>
                <div className="activity-details">
                  <p>{pastTrips.length} completed trip{pastTrips.length !== 1 ? 's' : ''}</p>
                  <span className="activity-time">Completed</span>
                </div>
              </div>
            )}
            {trips.length === 0 && (
              <div className="activity-item">
                <span className="activity-icon">🎒</span>
                <div className="activity-details">
                  <p>No trips yet. Start planning your first adventure!</p>
                  <Link to="/trips/new" className="plan-link">Plan a trip →</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* FULL WIDTH DASHBOARD */
        .dashboard {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          width: 100vw;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        /* NAVBAR - FULL WIDTH */
        .navbar {
          background: white;
          width: 100vw;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
          margin: 0;
          padding: 0;
        }

        .navbar-container {
          max-width: 100%;
          margin: 0 auto;
          padding: 20px 5%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
        }

        .nav-brand h1 {
          font-size: 1.8rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          font-weight: 700;
        }

        .nav-links {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .nav-link {
          text-decoration: none;
          color: #666;
          font-weight: 500;
          padding: 10px 16px;
          border-radius: 10px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
        }

        .nav-link:hover {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          transform: translateY(-2px);
        }

        .nav-link.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }

        /* MAIN CONTAINER - FULL WIDTH WITH PROPER SPACING */
        .main-container {
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          padding: 40px 5%;
          box-sizing: border-box;
        }

        .dashboard-header {
          margin-bottom: 40px;
          text-align: center;
          color: white;
          width: 100%;
        }

        .dashboard-header h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .dashboard-header p {
          font-size: 1.2rem;
          opacity: 0.9;
          margin: 0;
        }

        /* MAIN GRID - FULL WIDTH WITH EQUAL SPACING */
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
          width: 100%;
        }

        .card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
          width: 100%;
          box-sizing: border-box;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 50px rgba(0, 0, 0, 0.15);
        }

        .card h3 {
          margin: 0 0 24px 0;
          color: #333;
          font-size: 1.3rem;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          width: 100%;
        }

        .view-all {
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
        }

        /* TRAVEL STATS - FULL WIDTH */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 16px;
          width: 100%;
        }

        .stat-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px 12px;
          background: #f8f9fa;
          border-radius: 12px;
          justify-content: center;
          width: 100%;
        }

        .stat-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          width: 100%;
        }

        .stat-number {
          font-size: 2.2rem;
          font-weight: bold;
          color: #333;
          line-height: 1;
        }

        .stat-label {
          color: #666;
          font-size: 0.9rem;
          font-weight: 500;
        }

        /* QUICK ACTIONS - FULL WIDTH */
        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 16px;
          width: 100%;
        }

        .action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px 12px;
          background: #f8f9fa;
          border-radius: 12px;
          text-decoration: none;
          color: #333;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          width: 100%;
          box-sizing: border-box;
        }

        .action-btn:hover {
          background: white;
          border-color: #667eea;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.1);
        }

        .action-icon {
          font-size: 2rem;
          margin-bottom: 12px;
        }

        .action-text {
          font-weight: 500;
          font-size: 0.95rem;
          text-align: center;
          line-height: 1.3;
        }

        /* UPCOMING TRIPS */
        .trips-content {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .trips-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 100%;
        }

        .trip-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 14px;
          background: #f8f9fa;
          border-radius: 10px;
          width: 100%;
          box-sizing: border-box;
        }

        .trip-icon {
          font-size: 1.4rem;
          flex-shrink: 0;
        }

        .trip-info {
          flex: 1;
          min-width: 0;
        }

        .trip-info h4 {
          margin: 0 0 6px 0;
          color: #333;
          font-size: 1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .trip-dates {
          color: #666;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }

        .trip-link {
          color: #667eea;
          text-decoration: none;
          font-size: 1.2rem;
          font-weight: bold;
          flex-shrink: 0;
        }

        .no-trips {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #666;
          padding: 20px;
          text-align: center;
          width: 100%;
        }

        .plan-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          margin-top: 10px;
        }

        /* BUDGET OVERVIEW */
        .budget-content {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .budget-summary {
          margin-bottom: 20px;
          width: 100%;
        }

        .budget-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px;
          margin-bottom: 10px;
          background: #f8f9fa;
          border-radius: 10px;
          width: 100%;
          box-sizing: border-box;
        }

        .budget-icon {
          font-size: 1.4rem;
          min-width: 30px;
          flex-shrink: 0;
        }

        .budget-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .budget-label {
          color: #666;
          font-size: 0.9rem;
        }

        .budget-amount {
          font-weight: bold;
          font-size: 1.2rem;
          color: #333;
        }

        .budget-amount.spent {
          color: #ff6b6b;
        }

        .budget-amount.remaining {
          color: #4CAF50;
        }

        /* BOTTOM GRID - FULL WIDTH */
        .dashboard-bottom-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
          width: 100%;
        }

        /* RECOMMENDATIONS */
        .recommendations-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 100%;
        }

        .recommendation-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px;
          background: #f8f9fa;
          border-radius: 10px;
          width: 100%;
          box-sizing: border-box;
        }

        .rec-icon {
          font-size: 1.4rem;
          min-width: 30px;
          flex-shrink: 0;
        }

        .rec-details {
          flex: 1;
          min-width: 0;
        }

        .rec-details h4 {
          margin: 0 0 6px 0;
          color: #333;
          font-size: 1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .rec-details p {
          color: #666;
          font-size: 0.85rem;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* ITINERARY */
        .itinerary-preview {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
        }

        .timeline {
          flex: 1;
          margin-bottom: 20px;
          width: 100%;
        }

        .timeline-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
          width: 100%;
        }

        .timeline-item:last-child {
          border-bottom: none;
        }

        .time {
          font-weight: bold;
          color: #667eea;
          min-width: 70px;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .activity-icon {
          font-size: 1.2rem;
          min-width: 24px;
          flex-shrink: 0;
        }

        .activity {
          color: #333;
          font-size: 0.95rem;
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .btn {
          padding: 12px 24px;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          width: 100%;
          box-sizing: border-box;
          text-align: center;
        }

        .btn-outline {
          background: transparent;
          border: 2px solid #667eea;
          color: #667eea;
        }

        .btn-outline:hover {
          background: #667eea;
          color: white;
        }

        /* BOOKING SECTION - FULL WIDTH */
        .booking-section {
          margin-bottom: 40px;
          width: 100%;
        }

        .booking-section h2 {
          color: white;
          text-align: center;
          margin-bottom: 30px;
          font-size: 2rem;
          width: 100%;
        }

        .booking-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          width: 100%;
        }

        .booking-card {
          background: white;
          border-radius: 16px;
          padding: 32px 24px;
          text-align: center;
          text-decoration: none;
          transition: all 0.3s ease;
          width: 100%;
          box-sizing: border-box;
        }

        .booking-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
        }

        .booking-icon {
          font-size: 2.8rem;
          display: block;
          margin-bottom: 20px;
        }

        .booking-card h3 {
          margin: 0 0 12px 0;
          color: #333;
          font-size: 1.2rem;
        }

        .booking-card p {
          color: #666;
          font-size: 0.9rem;
          margin: 0;
        }

        .hotel-booking {
          border-top: 4px solid #4CAF50;
        }

        .flight-booking {
          border-top: 4px solid #2196F3;
        }

        .city-booking {
          border-top: 4px solid #FF9800;
        }

        /* ACTIVITY SECTION */
        .activity-section {
          margin-top: 0;
          width: 100%;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 100%;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px;
          background: #f8f9fa;
          border-radius: 10px;
          width: 100%;
          box-sizing: border-box;
        }

        .activity-icon {
          font-size: 1.4rem;
          min-width: 30px;
          flex-shrink: 0;
        }

        .activity-details {
          flex: 1;
          min-width: 0;
        }

        .activity-details p {
          margin: 0 0 6px 0;
          color: #333;
          font-size: 0.95rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .activity-time {
          color: #666;
          font-size: 0.85rem;
        }

        .plan-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          margin-top: 4px;
          display: inline-block;
        }

        .plan-link:hover {
          text-decoration: underline;
        }

        /* RESPONSIVE DESIGN - FULL WIDTH ADJUSTMENTS */
        @media (max-width: 1200px) {
          .navbar-container {
            padding: 20px 4%;
          }
          
          .main-container {
            padding: 40px 4%;
          }
        }

        @media (max-width: 1024px) {
          .dashboard-grid,
          .dashboard-bottom-grid {
            grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          }
          
          .booking-cards {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          }
        }

        @media (max-width: 900px) {
          .dashboard-grid,
          .dashboard-bottom-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        @media (max-width: 768px) {
          .navbar-container {
            flex-direction: column;
            gap: 16px;
            padding: 16px 4%;
          }

          .nav-links {
            flex-wrap: wrap;
            justify-content: center;
            gap: 12px;
            width: 100%;
          }

          .nav-link {
            padding: 8px 12px;
            font-size: 0.9rem;
            flex: 1;
            min-width: 120px;
            justify-content: center;
          }

          .main-container {
            padding: 30px 4%;
          }

          .dashboard-header h1 {
            font-size: 2rem;
          }

          .dashboard-header p {
            font-size: 1.1rem;
          }

          .card {
            padding: 20px;
          }

          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
            gap: 12px;
          }

          .stat-box {
            padding: 16px 10px;
          }

          .stat-number {
            font-size: 1.8rem;
          }

          .actions-grid {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 12px;
          }

          .action-btn {
            padding: 20px 16px;
          }

          .booking-cards {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .booking-card {
            padding: 24px 20px;
          }

          .booking-icon {
            font-size: 2.2rem;
            margin-bottom: 16px;
          }
        }

        @media (max-width: 480px) {
          .main-container {
            padding: 24px 3%;
          }

          .navbar-container {
            padding: 12px 3%;
          }

          .dashboard-header h1 {
            font-size: 1.8rem;
          }

          .dashboard-header p {
            font-size: 1rem;
          }

          .card h3 {
            font-size: 1.2rem;
          }

          .stat-number {
            font-size: 1.6rem;
          }

          .stat-label {
            font-size: 0.85rem;
          }

          .nav-links {
            gap: 8px;
          }

          .nav-link {
            min-width: 100px;
            font-size: 0.85rem;
            padding: 6px 10px;
          }

          .dashboard-grid,
          .dashboard-bottom-grid {
            gap: 20px;
          }

          .card {
            padding: 16px;
          }

          .trip-item,
          .recommendation-item,
          .budget-item,
          .activity-item,
          .timeline-item {
            padding: 12px;
            gap: 12px;
          }

          .booking-card {
            padding: 20px 16px;
          }

          .booking-icon {
            font-size: 2rem;
            margin-bottom: 12px;
          }
        }

        @media (max-width: 360px) {
          .main-container {
            padding: 20px 2%;
          }

          .navbar-container {
            padding: 10px 2%;
          }

          .dashboard-header h1 {
            font-size: 1.6rem;
          }

          .nav-link {
            min-width: 90px;
            font-size: 0.8rem;
            padding: 5px 8px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .actions-grid {
            grid-template-columns: 1fr;
          }

          .stat-box,
          .action-btn {
            padding: 15px 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;