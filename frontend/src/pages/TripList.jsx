import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockTrips = [
        {
          id: 1,
          destination: "Tokyo, Japan",
          dates: "Nov 25 - Dec 2, 2024",
          status: "upcoming",
          budget: 3500,
          travelers: 2,
          type: "Adventure",
          image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400",
          description: "Exploring temples, food tours, and city adventures",
          color: "#FF6B6B",
          activities: ["Shibuya Crossing", "Mt. Fuji", "Tsukiji Market"]
        },
        {
          id: 2,
          destination: "Paris, France",
          dates: "Oct 15-22, 2024",
          status: "completed",
          budget: 2800,
          travelers: 1,
          type: "Romantic",
          image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400",
          description: "Romantic getaway with wine tasting",
          color: "#4ECDC4",
          activities: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise"]
        },
        {
          id: 3,
          destination: "Bali, Indonesia",
          dates: "Aug 5-15, 2024",
          status: "completed",
          budget: 2200,
          travelers: 4,
          type: "Beach",
          image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400",
          description: "Surfing, yoga retreat, and beach relaxation",
          color: "#45B7D1",
          activities: ["Ubud Monkey Forest", "Tanah Lot Temple", "Uluwatu Beach"]
        },
        {
          id: 4,
          destination: "New York, USA",
          dates: "Dec 20-28, 2024",
          status: "upcoming",
          budget: 4000,
          travelers: 3,
          type: "City",
          image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400",
          description: "Christmas shopping and Broadway shows",
          color: "#96E6A1",
          activities: ["Central Park", "Times Square", "Statue of Liberty"]
        },
        {
          id: 5,
          destination: "Sydney, Australia",
          dates: "Jan 10-20, 2025",
          status: "planned",
          budget: 4500,
          travelers: 2,
          type: "Adventure",
          image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400",
          description: "Beach hopping and coastal hikes",
          color: "#F0C987",
          activities: ["Sydney Opera House", "Bondi Beach", "Blue Mountains"]
        },
        {
          id: 6,
          destination: "Dubai, UAE",
          dates: "Feb 14-21, 2025",
          status: "planned",
          budget: 3800,
          travelers: 2,
          type: "Luxury",
          image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400",
          description: "Desert safari and luxury shopping",
          color: "#8B5CF6",
          activities: ["Burj Khalifa", "Desert Safari", "Dubai Mall"]
        }
      ];
      setTrips(mockTrips);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredTrips = trips.filter(trip => {
    if (filter === "all") return true;
    if (filter === "upcoming") return trip.status === "upcoming" || trip.status === "planned";
    if (filter === "completed") return trip.status === "completed";
    return trip.type.toLowerCase() === filter;
  }).filter(trip => 
    trip.destination.toLowerCase().includes(search.toLowerCase()) ||
    trip.type.toLowerCase().includes(search.toLowerCase()) ||
    trip.description.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === "date") return new Date(b.dates) - new Date(a.dates);
    if (sortBy === "budget") return b.budget - a.budget;
    return a.destination.localeCompare(b.destination);
  });

  const getStatusColor = (status) => {
    switch(status) {
      case "upcoming": return "#3B82F6";
      case "completed": return "#10B981";
      case "planned": return "#8B5CF6";
      default: return "#6B7280";
    }
  };

  const getTypeIcon = (type) => {
    switch(type.toLowerCase()) {
      case "adventure": return "🧗";
      case "romantic": return "💖";
      case "beach": return "🏖️";
      case "city": return "🏙️";
      case "luxury": return "💎";
      default: return "✈️";
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: "'Poppins', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
      animation: 'slideDown 0.6s ease',
    },
    title: {
      fontSize: '3rem',
      fontWeight: '700',
      background: 'linear-gradient(90deg, #FFF, #FFD166)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '10px',
      textShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    subtitle: {
      color: 'rgba(255,255,255,0.9)',
      fontSize: '1.2rem',
      maxWidth: '600px',
      margin: '0 auto',
    },
    controls: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '25px',
      marginBottom: '30px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px',
      alignItems: 'center',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      animation: 'fadeInUp 0.6s ease',
    },
    searchBox: {
      flex: 1,
      minWidth: '300px',
      position: 'relative',
    },
    searchInput: {
      width: '100%',
      padding: '15px 20px 15px 50px',
      fontSize: '16px',
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      background: 'white',
      transition: 'all 0.3s ease',
      outline: 'none',
      fontFamily: "'Poppins', sans-serif",
    },
    searchIcon: {
      position: 'absolute',
      left: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#667eea',
      fontSize: '20px',
    },
    filterButtons: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
    },
    filterButton: {
      padding: '10px 20px',
      border: '2px solid #e0e0e0',
      background: 'white',
      borderRadius: '50px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: '500',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    viewToggle: {
      display: 'flex',
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '2px solid #e0e0e0',
    },
    viewButton: {
      padding: '10px 20px',
      background: 'white',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '18px',
    },
    newTripButton: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      border: 'none',
      padding: '15px 30px',
      borderRadius: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
    },
    tripsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '25px',
      animation: 'fadeIn 0.8s ease',
    },
    tripsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    tripCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      position: 'relative',
      animation: 'scaleIn 0.5s ease',
    },
    tripImage: {
      height: '200px',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      transition: 'all 0.4s ease',
    },
    tripOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
    },
    tripContent: {
      padding: '25px',
    },
    tripHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '15px',
    },
    tripDestination: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#333',
      marginBottom: '5px',
    },
    tripDates: {
      color: '#666',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    tripStatus: {
      padding: '5px 15px',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: '600',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
    },
    tripMeta: {
      display: 'flex',
      gap: '20px',
      margin: '20px 0',
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#666',
    },
    tripDescription: {
      color: '#666',
      lineHeight: 1.6,
      marginBottom: '20px',
      fontSize: '0.95rem',
    },
    tripActions: {
      display: 'flex',
      gap: '10px',
      marginTop: '20px',
    },
    actionButton: {
      flex: 1,
      padding: '12px',
      border: 'none',
      borderRadius: '10px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      textDecoration: 'none',
      fontSize: '14px',
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
    },
    loader: {
      width: '60px',
      height: '60px',
      border: '4px solid rgba(255,255,255,0.3)',
      borderTopColor: '#667eea',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '20px',
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      color: 'white',
      animation: 'fadeIn 0.6s ease',
    },
    tripModal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease',
      padding: '20px',
    },
    modalContent: {
      background: 'white',
      borderRadius: '30px',
      maxWidth: '800px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'hidden',
      animation: 'scaleIn 0.4s ease',
    },
  };

  const handleTripClick = (trip) => {
    setSelectedTrip(trip);
  };

  const closeModal = () => {
    setSelectedTrip(null);
  };

  return (
    <div style={styles.container}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite',
      }} />

      <div style={styles.header}>
        <h1 style={styles.title}>My Adventures 🌍</h1>
        <p style={styles.subtitle}>All your trips in one place. Relive memories and plan new adventures!</p>
      </div>

      <div style={styles.controls}>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Search trips by destination, type, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              ...styles.searchInput,
              borderColor: search ? '#667eea' : '#e0e0e0',
            }}
          />
          <span style={styles.searchIcon}>🔍</span>
        </div>

        <div style={styles.filterButtons}>
          {["all", "upcoming", "completed", "adventure", "beach", "city"].map((filterType) => (
            <button
              key={filterType}
              style={{
                ...styles.filterButton,
                background: filter === filterType ? '#667eea' : 'white',
                color: filter === filterType ? 'white' : '#333',
                borderColor: filter === filterType ? '#667eea' : '#e0e0e0',
                transform: filter === filterType ? 'scale(1.05)' : 'scale(1)',
              }}
              onClick={() => setFilter(filterType)}
              onMouseEnter={(e) => filter !== filterType && (e.target.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => filter !== filterType && (e.target.style.transform = 'scale(1)')}
            >
              {filterType === "all" ? "🌐 All" : 
               filterType === "upcoming" ? "📅 Upcoming" :
               filterType === "completed" ? "✅ Completed" :
               filterType === "adventure" ? "🧗 Adventure" :
               filterType === "beach" ? "🏖️ Beach" : "🏙️ City"}
            </button>
          ))}
        </div>

        <div style={styles.viewToggle}>
          <button
            style={{
              ...styles.viewButton,
              background: viewMode === 'grid' ? '#667eea' : 'white',
              color: viewMode === 'grid' ? 'white' : '#333',
            }}
            onClick={() => setViewMode('grid')}
          >
            ⏹️
          </button>
          <button
            style={{
              ...styles.viewButton,
              background: viewMode === 'list' ? '#667eea' : 'white',
              color: viewMode === 'list' ? 'white' : '#333',
            }}
            onClick={() => setViewMode('list')}
          >
            📃
          </button>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: '10px 20px',
            border: '2px solid #e0e0e0',
            borderRadius: '12px',
            background: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          <option value="date">📅 Sort by Date</option>
          <option value="budget">💰 Sort by Budget</option>
          <option value="name">🔤 Sort by Name</option>
        </select>

        <Link to="/trips/new" style={{textDecoration: 'none'}}>
          <button
            style={styles.newTripButton}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.target.style.transform = 'none'}
          >
            ✈️ Plan New Trip
          </button>
        </Link>
      </div>

      {loading ? (
        <div style={styles.loadingContainer}>
          <div style={styles.loader} />
          <p style={{color: 'white', fontSize: '1.2rem'}}>Loading your adventures...</p>
        </div>
      ) : filteredTrips.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={{fontSize: '80px', marginBottom: '20px'}}>🌴</div>
          <h2 style={{fontSize: '2rem', marginBottom: '10px'}}>No trips found</h2>
          <p style={{fontSize: '1.1rem', marginBottom: '30px', opacity: 0.9}}>
            {search ? 'Try a different search term' : 'Start planning your first adventure!'}
          </p>
          <Link to="/trips/new">
            <button style={{
              ...styles.newTripButton,
              padding: '15px 40px',
              fontSize: '1.1rem',
            }}>
              ✈️ Create Your First Trip
            </button>
          </Link>
        </div>
      ) : (
        <div style={viewMode === 'grid' ? styles.tripsGrid : styles.tripsList}>
          {filteredTrips.map((trip, index) => (
            <div
              key={trip.id}
              style={{
                ...styles.tripCard,
                animationDelay: `${index * 0.1}s`,
              }}
              onClick={() => handleTripClick(trip)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.2)';
                const image = e.currentTarget.querySelector('.trip-image');
                const overlay = e.currentTarget.querySelector('.trip-overlay');
                if (image && overlay) {
                  image.style.transform = 'scale(1.1)';
                  overlay.style.opacity = '1';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
                const image = e.currentTarget.querySelector('.trip-image');
                const overlay = e.currentTarget.querySelector('.trip-overlay');
                if (image && overlay) {
                  image.style.transform = 'scale(1)';
                  overlay.style.opacity = '0';
                }
              }}
            >
              <div 
                className="trip-image"
                style={{
                  ...styles.tripImage,
                  backgroundImage: `url(${trip.image})`,
                }}
              >
                <div className="trip-overlay" style={styles.tripOverlay} />
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: getStatusColor(trip.status),
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  {trip.status === 'upcoming' ? '📅' : trip.status === 'completed' ? '✅' : '📝'} 
                  {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                </div>
              </div>
              
              <div style={styles.tripContent}>
                <div style={styles.tripHeader}>
                  <div>
                    <h3 style={styles.tripDestination}>{trip.destination}</h3>
                    <div style={styles.tripDates}>
                      <span>📅</span>
                      <span>{trip.dates}</span>
                    </div>
                  </div>
                  <div style={{
                    fontSize: '2rem',
                    opacity: 0.8,
                  }}>
                    {getTypeIcon(trip.type)}
                  </div>
                </div>

                <p style={styles.tripDescription}>{trip.description}</p>

                <div style={styles.tripMeta}>
                  <div style={styles.metaItem}>
                    <span>💰</span>
                    <span style={{fontWeight: '600', color: '#333'}}>${trip.budget}</span>
                  </div>
                  <div style={styles.metaItem}>
                    <span>👥</span>
                    <span style={{fontWeight: '600', color: '#333'}}>{trip.travelers}</span>
                  </div>
                  <div style={styles.metaItem}>
                    <span>🎯</span>
                    <span style={{fontWeight: '600', color: '#333'}}>{trip.type}</span>
                  </div>
                </div>

                <div style={styles.tripActions}>
                  <Link
                    to={`/itinerary/${trip.id}`}
                    style={{
                      ...styles.actionButton,
                      background: '#667eea',
                      color: 'white',
                      textDecoration: 'none',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Itinerary
                  </Link>
                  <Link
                    to={`/budget/${trip.id}`}
                    style={{
                      ...styles.actionButton,
                      background: 'rgba(102, 126, 234, 0.1)',
                      color: '#667eea',
                      textDecoration: 'none',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Budget
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTrip && (
        <div style={styles.tripModal} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={{
              height: '300px',
              backgroundImage: `url(${selectedTrip.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}>
              <button
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'white',
                  border: 'none',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  fontSize: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                }}
              >
                ✕
              </button>
            </div>
            <div style={{padding: '40px'}}>
              <h2 style={{fontSize: '2.5rem', marginBottom: '10px', color: '#333'}}>
                {selectedTrip.destination}
              </h2>
              <div style={{display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap'}}>
                <span style={{
                  background: getStatusColor(selectedTrip.status),
                  color: 'white',
                  padding: '8px 20px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                }}>
                  {selectedTrip.status.charAt(0).toUpperCase() + selectedTrip.status.slice(1)}
                </span>
                <span style={{
                  background: '#f3f4f6',
                  color: '#333',
                  padding: '8px 20px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                }}>
                  {selectedTrip.type}
                </span>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '30px',
                background: '#f8fafc',
                padding: '25px',
                borderRadius: '15px',
              }}>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '2rem', marginBottom: '10px'}}>📅</div>
                  <div style={{fontWeight: '600', color: '#333'}}>Dates</div>
                  <div style={{color: '#666'}}>{selectedTrip.dates}</div>
                </div>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '2rem', marginBottom: '10px'}}>💰</div>
                  <div style={{fontWeight: '600', color: '#333'}}>Budget</div>
                  <div style={{color: '#666'}}>${selectedTrip.budget}</div>
                </div>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '2rem', marginBottom: '10px'}}>👥</div>
                  <div style={{fontWeight: '600', color: '#333'}}>Travelers</div>
                  <div style={{color: '#666'}}>{selectedTrip.travelers} people</div>
                </div>
              </div>

              <h3 style={{fontSize: '1.3rem', marginBottom: '15px', color: '#333'}}>Activities</h3>
              <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px'}}>
                {selectedTrip.activities.map((activity, index) => (
                  <span key={index} style={{
                    background: '#667eea',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                  }}>
                    {activity}
                  </span>
                ))}
              </div>

              <h3 style={{fontSize: '1.3rem', marginBottom: '15px', color: '#333'}}>Description</h3>
              <p style={{color: '#666', lineHeight: 1.6, fontSize: '1.1rem'}}>
                {selectedTrip.description}
              </p>

              <div style={{display: 'flex', gap: '15px', marginTop: '40px'}}>
                <Link
                  to={`/itinerary/${selectedTrip.id}`}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    padding: '18px',
                    borderRadius: '15px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '1rem',
                  }}
                >
                  View Full Itinerary
                </Link>
                <button
                  onClick={closeModal}
                  style={{
                    padding: '18px 30px',
                    background: 'rgba(0,0,0,0.05)',
                    border: 'none',
                    borderRadius: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(180deg);
            }
          }
          
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            margin: 0;
            overflow-x: hidden;
          }
          
          button {
            font-family: 'Poppins', sans-serif;
          }
          
          a {
            text-decoration: none;
          }
        `}
      </style>
    </div>
  );
};

export default TripList;