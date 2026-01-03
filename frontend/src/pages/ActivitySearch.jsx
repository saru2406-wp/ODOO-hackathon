import React, { useState, useEffect } from "react";

const ActivitySearch = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedRating, setSelectedRating] = useState(0);
  const [savedActivities, setSavedActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", name: "All Activities", icon: "🌍", color: "#667eea" },
    { id: "sightseeing", name: "Sightseeing", icon: "🏛️", color: "#3B82F6" },
    { id: "adventure", name: "Adventure", icon: "🧗", color: "#10B981" },
    { id: "food", name: "Food & Dining", icon: "🍽️", color: "#EF4444" },
    { id: "shopping", name: "Shopping", icon: "🛍️", color: "#8B5CF6" },
    { id: "culture", name: "Culture", icon: "🎭", color: "#F59E0B" },
    { id: "nature", name: "Nature", icon: "🏞️", color: "#22C55E" },
  ];

  const priceRanges = [
    { id: "all", label: "All Prices" },
    { id: "free", label: "Free" },
    { id: "budget", label: "$ Budget" },
    { id: "moderate", label: "$$ Moderate" },
    { id: "luxury", label: "$$$ Luxury" },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockActivities = [
        {
          id: 1,
          name: "Shibuya Crossing",
          category: "sightseeing",
          location: "Shibuya, Tokyo",
          price: "free",
          priceAmount: 0,
          rating: 4.7,
          reviewCount: 2450,
          duration: "1-2 hours",
          description: "Experience the world's busiest pedestrian crossing and witness the iconic scramble.",
          image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400",
          highlights: ["Iconic landmark", "Great for photos", "Free to experience"],
          tags: ["landmark", "free", "photography"]
        },
        {
          id: 2,
          name: "Senso-ji Temple",
          category: "culture",
          location: "Asakusa, Tokyo",
          price: "free",
          priceAmount: 0,
          rating: 4.8,
          reviewCount: 3200,
          duration: "2-3 hours",
          description: "Tokyo's oldest temple with stunning architecture and traditional shopping streets.",
          image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=400",
          highlights: ["Ancient temple", "Traditional market", "Cultural experience"],
          tags: ["temple", "history", "shopping"]
        },
        {
          id: 3,
          name: "Tsukiji Fish Market",
          category: "food",
          location: "Chuo City, Tokyo",
          price: "budget",
          priceAmount: 10,
          rating: 4.6,
          reviewCount: 4100,
          duration: "3-4 hours",
          description: "World's largest fish market with incredible fresh sushi and seafood experiences.",
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
          highlights: ["Fresh seafood", "Sushi breakfast", "Market tour"],
          tags: ["food", "market", "sushi"]
        },
        {
          id: 4,
          name: "Tokyo Tower Observatory",
          category: "sightseeing",
          location: "Minato City, Tokyo",
          price: "moderate",
          priceAmount: 25,
          rating: 4.5,
          reviewCount: 1800,
          duration: "2 hours",
          description: "Panoramic views of Tokyo from the iconic Eiffel-inspired tower.",
          image: "https://images.unsplash.com/photo-1523913507744-7aa56ef4035c?w=400",
          highlights: ["360° views", "Iconic landmark", "Great for sunset"],
          tags: ["viewpoint", "landmark", "photography"]
        },
        {
          id: 5,
          name: "Robot Restaurant Show",
          category: "culture",
          location: "Shinjuku, Tokyo",
          price: "luxury",
          priceAmount: 75,
          rating: 4.3,
          reviewCount: 890,
          duration: "1.5 hours",
          description: "Mind-blowing futuristic robot show with lasers, dancers, and special effects.",
          image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400",
          highlights: ["Unique experience", "High-tech show", "Entertainment"],
          tags: ["show", "unique", "entertainment"]
        },
        {
          id: 6,
          name: "Mount Fuji Day Trip",
          category: "nature",
          location: "Mount Fuji",
          price: "moderate",
          priceAmount: 60,
          rating: 4.9,
          reviewCount: 1500,
          duration: "10-12 hours",
          description: "Guided tour to Japan's most iconic mountain with stunning views.",
          image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=400",
          highlights: ["Iconic mountain", "Scenic views", "Photography"],
          tags: ["mountain", "nature", "tour"]
        },
        {
          id: 7,
          name: "Harajuku Fashion Street",
          category: "shopping",
          location: "Harajuku, Tokyo",
          price: "budget",
          priceAmount: 15,
          rating: 4.4,
          reviewCount: 2100,
          duration: "2-3 hours",
          description: "Explore Tokyo's quirky fashion district with unique shops and street style.",
          image: "https://images.unsplash.com/photo-1525874684015-58379d421aee?w=400",
          highlights: ["Fashion shopping", "Street food", "People watching"],
          tags: ["shopping", "fashion", "street"]
        },
        {
          id: 8,
          name: "Traditional Tea Ceremony",
          category: "culture",
          location: "Various Locations",
          price: "moderate",
          priceAmount: 35,
          rating: 4.7,
          reviewCount: 950,
          duration: "1 hour",
          description: "Authentic Japanese tea ceremony experience with a tea master.",
          image: "https://images.unsplash.com/photo-1567945716310-4745a0b0b8d1?w=400",
          highlights: ["Cultural immersion", "Traditional ceremony", "Interactive"],
          tags: ["culture", "traditional", "tea"]
        },
      ];
      setActivities(mockActivities);
      setFilteredActivities(mockActivities);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = activities;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(activity =>
        activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(activity => activity.category === selectedCategory);
    }

    // Filter by price
    if (selectedPrice !== "all") {
      filtered = filtered.filter(activity => activity.price === selectedPrice);
    }

    // Filter by rating
    if (selectedRating > 0) {
      filtered = filtered.filter(activity => activity.rating >= selectedRating);
    }

    setFilteredActivities(filtered);
  }, [searchTerm, selectedCategory, selectedPrice, selectedRating, activities]);

  const handleSaveActivity = (activityId) => {
    if (savedActivities.includes(activityId)) {
      setSavedActivities(savedActivities.filter(id => id !== activityId));
    } else {
      setSavedActivities([...savedActivities, activityId]);
    }
  };

  const getPriceLabel = (price) => {
    switch(price) {
      case "free": return "Free";
      case "budget": return "$";
      case "moderate": return "$$";
      case "luxury": return "$$$";
      default: return "N/A";
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
    searchContainer: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '25px',
      padding: '30px',
      marginBottom: '30px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      animation: 'fadeInUp 0.6s ease',
    },
    searchBox: {
      position: 'relative',
      marginBottom: '30px',
    },
    searchInput: {
      width: '100%',
      padding: '20px 25px 20px 60px',
      fontSize: '18px',
      border: '2px solid #e0e0e0',
      borderRadius: '15px',
      background: 'white',
      transition: 'all 0.3s ease',
      outline: 'none',
      fontFamily: "'Poppins', sans-serif",
    },
    searchIcon: {
      position: 'absolute',
      left: '25px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#667eea',
      fontSize: '24px',
    },
    filtersContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px',
      marginBottom: '20px',
    },
    filterGroup: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
    },
    filterLabel: {
      fontWeight: '600',
      color: '#333',
      fontSize: '14px',
    },
    categoryButtons: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
      marginTop: '10px',
    },
    categoryButton: {
      padding: '12px 20px',
      border: '2px solid #e0e0e0',
      background: 'white',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontWeight: '500',
      fontSize: '14px',
    },
    priceButtons: {
      display: 'flex',
      gap: '10px',
      marginTop: '10px',
    },
    priceButton: {
      padding: '10px 20px',
      border: '2px solid #e0e0e0',
      background: 'white',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: '500',
      fontSize: '14px',
    },
    ratingButtons: {
      display: 'flex',
      gap: '5px',
      marginTop: '10px',
    },
    ratingButton: {
      padding: '10px',
      border: '2px solid #e0e0e0',
      background: 'white',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '18px',
    },
    resultsCount: {
      textAlign: 'center',
      color: '#666',
      margin: '20px 0',
      fontSize: '1.1rem',
    },
    activitiesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '25px',
      animation: 'fadeIn 0.8s ease',
    },
    activityCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '25px',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      position: 'relative',
      animation: 'scaleIn 0.5s ease',
    },
    activityImage: {
      height: '200px',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      transition: 'all 0.4s ease',
    },
    activityOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
    },
    activityBadges: {
      position: 'absolute',
      top: '15px',
      left: '15px',
      right: '15px',
      display: 'flex',
      justifyContent: 'space-between',
      zIndex: 2,
    },
    activityPrice: {
      background: 'white',
      color: '#333',
      padding: '8px 16px',
      borderRadius: '20px',
      fontWeight: '700',
      fontSize: '0.9rem',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    },
    saveButton: {
      background: 'white',
      border: 'none',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      transition: 'all 0.3s ease',
    },
    activityContent: {
      padding: '25px',
    },
    activityHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '15px',
    },
    activityName: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#333',
      marginBottom: '5px',
    },
    activityLocation: {
      color: '#666',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    activityRating: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      background: 'rgba(245, 158, 11, 0.1)',
      padding: '5px 12px',
      borderRadius: '20px',
      color: '#F59E0B',
      fontWeight: '600',
      fontSize: '0.9rem',
    },
    activityDescription: {
      color: '#666',
      lineHeight: 1.6,
      marginBottom: '20px',
      fontSize: '0.95rem',
    },
    activityMeta: {
      display: 'flex',
      gap: '15px',
      marginBottom: '20px',
      color: '#666',
      fontSize: '0.9rem',
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    tagsContainer: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      marginBottom: '20px',
    },
    tag: {
      background: 'rgba(102, 126, 234, 0.1)',
      color: '#667eea',
      padding: '5px 12px',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: '500',
    },
    activityActions: {
      display: 'flex',
      gap: '10px',
    },
    actionButton: {
      flex: 1,
      padding: '12px',
      border: 'none',
      borderRadius: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '14px',
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      color: 'white',
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
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
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

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite',
      }} />

      <div style={styles.header}>
        <h1 style={styles.title}>Discover Activities 🗺️</h1>
        <p style={styles.subtitle}>Find amazing experiences for your next adventure</p>
      </div>

      {/* Search & Filters */}
      <div style={styles.searchContainer}>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Search activities, landmarks, or experiences..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              ...styles.searchInput,
              borderColor: searchTerm ? '#667eea' : '#e0e0e0',
            }}
          />
          <span style={styles.searchIcon}>🔍</span>
        </div>

        <div style={styles.filtersContainer}>
          <div style={styles.filterGroup}>
            <div style={styles.filterLabel}>Categories:</div>
            <div style={styles.categoryButtons}>
              {categories.map(category => (
                <button
                  key={category.id}
                  style={{
                    ...styles.categoryButton,
                    background: selectedCategory === category.id ? category.color : 'white',
                    color: selectedCategory === category.id ? 'white' : '#333',
                    borderColor: selectedCategory === category.id ? category.color : '#e0e0e0',
                  }}
                  onClick={() => setSelectedCategory(category.id)}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== category.id) {
                      e.target.style.transform = 'translateY(-3px)';
                      e.target.style.borderColor = category.color;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== category.id) {
                      e.target.style.transform = 'none';
                      e.target.style.borderColor = '#e0e0e0';
                    }
                  }}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.filterGroup}>
            <div style={styles.filterLabel}>Price:</div>
            <div style={styles.priceButtons}>
              {priceRanges.map(range => (
                <button
                  key={range.id}
                  style={{
                    ...styles.priceButton,
                    background: selectedPrice === range.id ? '#667eea' : 'white',
                    color: selectedPrice === range.id ? 'white' : '#333',
                    borderColor: selectedPrice === range.id ? '#667eea' : '#e0e0e0',
                  }}
                  onClick={() => setSelectedPrice(range.id)}
                  onMouseEnter={(e) => {
                    if (selectedPrice !== range.id) {
                      e.target.style.transform = 'translateY(-3px)';
                      e.target.style.borderColor = '#667eea';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedPrice !== range.id) {
                      e.target.style.transform = 'none';
                      e.target.style.borderColor = '#e0e0e0';
                    }
                  }}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.filterGroup}>
            <div style={styles.filterLabel}>Rating:</div>
            <div style={styles.ratingButtons}>
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  style={{
                    ...styles.ratingButton,
                    background: selectedRating >= rating ? '#F59E0B' : 'white',
                    color: selectedRating >= rating ? 'white' : '#333',
                    borderColor: selectedRating >= rating ? '#F59E0B' : '#e0e0e0',
                  }}
                  onClick={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
                  onMouseEnter={(e) => {
                    if (selectedRating !== rating) {
                      e.target.style.transform = 'scale(1.2)';
                      e.target.style.borderColor = '#F59E0B';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedRating !== rating) {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.borderColor = '#e0e0e0';
                    }
                  }}
                >
                  {rating}★
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSelectedPrice("all");
              setSelectedRating(0);
            }}
            style={{
              padding: '12px 25px',
              background: 'rgba(0,0,0,0.05)',
              border: '2px solid #e0e0e0',
              borderRadius: '12px',
              fontWeight: '500',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.borderColor = '#667eea';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'none';
              e.target.style.borderColor = '#e0e0e0';
            }}
          >
            Clear All Filters
          </button>
        </div>
      </div>

      <div style={styles.resultsCount}>
        Found {filteredActivities.length} activities
        {searchTerm && ` for "${searchTerm}"`}
      </div>

      {loading ? (
        <div style={styles.loadingContainer}>
          <div style={styles.loader} />
          <p style={{fontSize: '1.2rem'}}>Loading amazing activities...</p>
        </div>
      ) : (
        <div style={styles.activitiesGrid}>
          {filteredActivities.map((activity, index) => {
            const category = categories.find(c => c.id === activity.category);
            
            return (
              <div
                key={activity.id}
                style={{
                  ...styles.activityCard,
                  animationDelay: `${index * 0.1}s`,
                }}
                onClick={() => setSelectedActivity(activity)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.2)';
                  const image = e.currentTarget.querySelector('.activity-image');
                  const overlay = e.currentTarget.querySelector('.activity-overlay');
                  if (image && overlay) {
                    image.style.transform = 'scale(1.1)';
                    overlay.style.opacity = '1';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
                  const image = e.currentTarget.querySelector('.activity-image');
                  const overlay = e.currentTarget.querySelector('.activity-overlay');
                  if (image && overlay) {
                    image.style.transform = 'scale(1)';
                    overlay.style.opacity = '0';
                  }
                }}
              >
                <div 
                  className="activity-image"
                  style={{
                    ...styles.activityImage,
                    backgroundImage: `url(${activity.image})`,
                  }}
                >
                  <div className="activity-overlay" style={styles.activityOverlay} />
                  
                  <div style={styles.activityBadges}>
                    <div style={styles.activityPrice}>
                      {getPriceLabel(activity.price)}
                      {activity.price !== 'free' && <span> • ${activity.priceAmount}</span>}
                    </div>
                    <button
                      style={{
                        ...styles.saveButton,
                        background: savedActivities.includes(activity.id) ? '#EF4444' : 'white',
                        color: savedActivities.includes(activity.id) ? 'white' : '#333',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveActivity(activity.id);
                      }}
                      onMouseEnter={(e) => {
                        if (!savedActivities.includes(activity.id)) {
                          e.currentTarget.style.background = '#EF4444';
                          e.currentTarget.style.color = 'white';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!savedActivities.includes(activity.id)) {
                          e.currentTarget.style.background = 'white';
                          e.currentTarget.style.color = '#333';
                        }
                      }}
                    >
                      {savedActivities.includes(activity.id) ? '❤️' : '🤍'}
                    </button>
                  </div>
                </div>
                
                <div style={styles.activityContent}>
                  <div style={styles.activityHeader}>
                    <div>
                      <h3 style={styles.activityName}>{activity.name}</h3>
                      <div style={styles.activityLocation}>
                        📍 {activity.location}
                      </div>
                    </div>
                    <div style={styles.activityRating}>
                      ⭐ {activity.rating} ({activity.reviewCount})
                    </div>
                  </div>

                  <p style={styles.activityDescription}>{activity.description}</p>

                  <div style={styles.activityMeta}>
                    <div style={styles.metaItem}>
                      <span>⏱️</span>
                      <span>{activity.duration}</span>
                    </div>
                    <div style={styles.metaItem}>
                      <span style={{color: category?.color, fontSize: '1.2rem'}}>
                        {category?.icon}
                      </span>
                      <span>{category?.name}</span>
                    </div>
                  </div>

                  <div style={styles.tagsContainer}>
                    {activity.tags.map((tag, idx) => (
                      <span key={idx} style={styles.tag}>
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div style={styles.activityActions}>
                    <button
                      style={{
                        ...styles.actionButton,
                        background: 'rgba(102, 126, 234, 0.1)',
                        color: '#667eea',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to itinerary logic
                        alert(`Added "${activity.name}" to your itinerary!`);
                      }}
                    >
                      Add to Itinerary
                    </button>
                    <button
                      style={{
                        ...styles.actionButton,
                        background: '#667eea',
                        color: 'white',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedActivity(activity);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <div style={styles.modalOverlay} onClick={() => setSelectedActivity(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={{
              height: '300px',
              backgroundImage: `url(${selectedActivity.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}>
              <button
                onClick={() => setSelectedActivity(null)}
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
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px'}}>
                <div>
                  <h2 style={{fontSize: '2.5rem', marginBottom: '10px', color: '#333'}}>
                    {selectedActivity.name}
                  </h2>
                  <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px'}}>
                    <div style={{
                      background: '#F59E0B',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}>
                      ⭐ {selectedActivity.rating} ({selectedActivity.reviewCount} reviews)
                    </div>
                    <div style={{
                      background: '#10B981',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontWeight: '600',
                    }}>
                      {getPriceLabel(selectedActivity.price)}
                      {selectedActivity.price !== 'free' && ` • $${selectedActivity.priceAmount}`}
                    </div>
                  </div>
                </div>
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
                  <div style={{fontSize: '2rem', marginBottom: '10px'}}>📍</div>
                  <div style={{fontWeight: '600', color: '#333'}}>Location</div>
                  <div style={{color: '#666'}}>{selectedActivity.location}</div>
                </div>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '2rem', marginBottom: '10px'}}>⏱️</div>
                  <div style={{fontWeight: '600', color: '#333'}}>Duration</div>
                  <div style={{color: '#666'}}>{selectedActivity.duration}</div>
                </div>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '2rem', marginBottom: '10px'}}>🏛️</div>
                  <div style={{fontWeight: '600', color: '#333'}}>Category</div>
                  <div style={{color: '#666'}}>
                    {categories.find(c => c.id === selectedActivity.category)?.name}
                  </div>
                </div>
              </div>

              <h3 style={{fontSize: '1.5rem', marginBottom: '15px', color: '#333'}}>Description</h3>
              <p style={{color: '#666', lineHeight: 1.6, fontSize: '1.1rem', marginBottom: '30px'}}>
                {selectedActivity.description}
              </p>

              <h3 style={{fontSize: '1.5rem', marginBottom: '15px', color: '#333'}}>Highlights</h3>
              <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px'}}>
                {selectedActivity.highlights.map((highlight, index) => (
                  <div key={index} style={{
                    background: '#667eea',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    ✨ {highlight}
                  </div>
                ))}
              </div>

              <div style={{display: 'flex', gap: '15px', marginTop: '40px'}}>
                <button
                  onClick={() => {
                    handleSaveActivity(selectedActivity.id);
                    alert(`Added "${selectedActivity.name}" to your saved activities!`);
                  }}
                  style={{
                    flex: 1,
                    padding: '18px',
                    background: savedActivities.includes(selectedActivity.id) ? '#EF4444' : 'rgba(239, 68, 68, 0.1)',
                    border: 'none',
                    borderRadius: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    color: savedActivities.includes(selectedActivity.id) ? 'white' : '#EF4444',
                  }}
                >
                  {savedActivities.includes(selectedActivity.id) ? '❤️ Saved' : '🤍 Save Activity'}
                </button>
                <button
                  onClick={() => {
                    alert(`Added "${selectedActivity.name}" to your itinerary!`);
                    setSelectedActivity(null);
                  }}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    padding: '18px',
                    borderRadius: '15px',
                    border: 'none',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  Add to Itinerary
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
            cursor: pointer;
          }
          
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.1);
            border-radius: 10px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #667eea;
            border-radius: 10px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #764ba2;
          }
        `}
      </style>
    </div>
  );
};

export default ActivitySearch;