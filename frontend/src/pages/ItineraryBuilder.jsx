import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ItineraryBuilder = () => {
  const [days, setDays] = useState([
    {
      id: 1,
      date: "2024-11-25",
      title: "Arrival Day",
      activities: [
        { id: 1, time: "08:00", title: "Flight Arrival", type: "flight", location: "Narita Airport", notes: "Flight NH123 from San Francisco" },
        { id: 2, time: "10:30", title: "Hotel Check-in", type: "hotel", location: "Shinjuku Granbell Hotel", notes: "Drop luggage and freshen up" },
        { id: 3, time: "12:00", title: "Lunch", type: "food", location: "Local Ramen Shop", notes: "Try authentic Tokyo ramen" },
        { id: 4, time: "14:00", title: "Shibuya Crossing", type: "sightseeing", location: "Shibuya Station", notes: "Experience the famous scramble crossing" },
        { id: 5, time: "19:00", title: "Welcome Dinner", type: "food", location: "Sushi Restaurant", notes: "Traditional sushi experience" },
      ]
    },
    {
      id: 2,
      date: "2024-11-26",
      title: "Cultural Day",
      activities: [
        { id: 6, time: "09:00", title: "Asakusa Temple", type: "sightseeing", location: "Asakusa", notes: "Visit Senso-ji Temple" },
        { id: 7, time: "12:30", title: "Lunch", type: "food", location: "Tempura Restaurant", notes: "Authentic tempura meal" },
        { id: 8, time: "14:30", title: "Akihabara", type: "shopping", location: "Akihabara District", notes: "Explore electronics and anime shops" },
        { id: 9, time: "17:00", title: "Tokyo Tower", type: "sightseeing", location: "Minato City", notes: "Sunset views from observation deck" },
      ]
    },
    {
      id: 3,
      date: "2024-11-27",
      title: "Nature Day",
      activities: [
        { id: 10, time: "07:00", title: "Day Trip to Mt. Fuji", type: "transport", location: "Mt. Fuji", notes: "Bus tour to Fifth Station" },
        { id: 11, time: "12:00", title: "Lunch with View", type: "food", location: "Fujiyoshida", notes: "Traditional Japanese lunch" },
        { id: 12, time: "15:00", title: "Onsen Experience", type: "activity", location: "Hot Spring Resort", notes: "Relax in natural hot springs" },
      ]
    }
  ]);

  const [newActivity, setNewActivity] = useState({
    dayId: 1,
    time: "",
    title: "",
    type: "sightseeing",
    location: "",
    notes: ""
  });
  const [dragging, setDragging] = useState(null);
  const [expandedDay, setExpandedDay] = useState(1);
  const [tripStats, setTripStats] = useState({
    totalActivities: 12,
    totalDays: 3,
    activitiesByType: { sightseeing: 4, food: 4, transport: 2, shopping: 1, hotel: 1 }
  });

  useEffect(() => {
    // Calculate stats
    const totalActivities = days.reduce((sum, day) => sum + day.activities.length, 0);
    const activitiesByType = {};
    days.forEach(day => {
      day.activities.forEach(activity => {
        activitiesByType[activity.type] = (activitiesByType[activity.type] || 0) + 1;
      });
    });
    setTripStats({
      totalActivities,
      totalDays: days.length,
      activitiesByType
    });
  }, [days]);

  const handleAddActivity = () => {
    if (!newActivity.time || !newActivity.title) {
      alert("Please fill in time and title");
      return;
    }

    const newActivityObj = {
      id: Date.now(),
      ...newActivity
    };

    setDays(prevDays => 
      prevDays.map(day => 
        day.id === newActivity.dayId 
          ? { ...day, activities: [...day.activities, newActivityObj].sort((a, b) => a.time.localeCompare(b.time)) }
          : day
      )
    );

    setNewActivity({
      dayId: 1,
      time: "",
      title: "",
      type: "sightseeing",
      location: "",
      notes: ""
    });
  };

  const handleDeleteActivity = (dayId, activityId) => {
    setDays(prevDays => 
      prevDays.map(day => 
        day.id === dayId 
          ? { ...day, activities: day.activities.filter(act => act.id !== activityId) }
          : day
      )
    );
  };

  const handleDragStart = (activity, dayId) => {
    setDragging({ activity, sourceDayId: dayId });
  };

  const handleDragOver = (e, targetDayId) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetDayId) => {
    e.preventDefault();
    if (dragging) {
      const { activity, sourceDayId } = dragging;
      
      // Remove from source day
      const updatedDays = days.map(day => {
        if (day.id === sourceDayId) {
          return {
            ...day,
            activities: day.activities.filter(act => act.id !== activity.id)
          };
        }
        return day;
      });

      // Add to target day
      const finalDays = updatedDays.map(day => {
        if (day.id === targetDayId) {
          return {
            ...day,
            activities: [...day.activities, { ...activity }].sort((a, b) => a.time.localeCompare(b.time))
          };
        }
        return day;
      });

      setDays(finalDays);
      setDragging(null);
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      sightseeing: "#3B82F6",
      food: "#10B981",
      transport: "#F59E0B",
      shopping: "#8B5CF6",
      hotel: "#EF4444",
      activity: "#EC4899",
      flight: "#6366F1"
    };
    return colors[type] || "#6B7280";
  };

  const getTypeIcon = (type) => {
    const icons = {
      sightseeing: "🏛️",
      food: "🍽️",
      transport: "🚗",
      shopping: "🛍️",
      hotel: "🏨",
      activity: "🎯",
      flight: "✈️"
    };
    return icons[type] || "📍";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: "'Poppins', sans-serif",
      position: 'relative',
      overflow: 'hidden',
      width: '100vw',
      margin: 0,
      boxSizing: 'border-box',
      paddingLeft: '5vw',
      paddingRight: '5vw',
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
      animation: 'slideDown 0.6s ease',
      width: '100%',
      maxWidth: '1200px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    title: {
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
      fontWeight: '700',
      background: 'linear-gradient(90deg, #FFF, #FFD166)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '10px',
      textShadow: '0 2px 10px rgba(0,0,0,0.1)',
      width: '100%',
    },
    subtitle: {
      color: 'rgba(255,255,255,0.9)',
      fontSize: 'clamp(1rem, 2vw, 1.2rem)',
      maxWidth: '800px',
      margin: '0 auto',
      lineHeight: 1.6,
    },
    mainContent: {
      display: 'grid',
      gridTemplateColumns: 'minmax(300px, 350px) 1fr',
      gap: '30px',
      maxWidth: '1400px',
      width: '100%',
      margin: '0 auto',
      animation: 'fadeIn 0.8s ease',
    },
    sidebar: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '25px',
      padding: '30px',
      height: 'fit-content',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      width: '100%',
      boxSizing: 'border-box',
    },
    statsCard: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '20px',
      padding: '25px',
      color: 'white',
      marginBottom: '30px',
      textAlign: 'center',
      width: '100%',
      boxSizing: 'border-box',
    },
    addActivityForm: {
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '20px',
      padding: '25px',
      marginBottom: '30px',
      width: '100%',
      boxSizing: 'border-box',
    },
    formGroup: {
      marginBottom: '20px',
      width: '100%',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '500',
      color: '#333',
      fontSize: '14px',
      width: '100%',
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      fontSize: '14px',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      background: 'white',
      transition: 'all 0.3s ease',
      outline: 'none',
      fontFamily: "'Poppins', sans-serif",
      boxSizing: 'border-box',
    },
    select: {
      width: '100%',
      padding: '12px 15px',
      fontSize: '14px',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      background: 'white',
      cursor: 'pointer',
      fontFamily: "'Poppins', sans-serif",
      boxSizing: 'border-box',
    },
    addButton: {
      width: '100%',
      padding: '15px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      boxSizing: 'border-box',
    },
    daysContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '25px',
      width: '100%',
    },
    dayCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '25px',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      transition: 'all 0.4s ease',
      width: '100%',
      boxSizing: 'border-box',
    },
    dayHeader: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      padding: '25px',
      color: 'white',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      boxSizing: 'border-box',
    },
    dayTitle: {
      fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
      fontWeight: '700',
      margin: 0,
      flex: 1,
      minWidth: 0,
    },
    dayDate: {
      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
      opacity: 0.9,
      marginTop: '5px',
    },
    activitiesList: {
      padding: '25px',
      maxHeight: '500px',
      overflowY: 'auto',
      transition: 'all 0.3s ease',
      width: '100%',
      boxSizing: 'border-box',
    },
    activityItem: {
      background: 'white',
      borderRadius: '15px',
      padding: '20px',
      marginBottom: '15px',
      borderLeft: '5px solid #667eea',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease',
      cursor: 'grab',
      position: 'relative',
      width: '100%',
      boxSizing: 'border-box',
    },
    activityHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '10px',
      width: '100%',
      flexWrap: 'wrap',
      gap: '10px',
    },
    activityTime: {
      fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
      fontWeight: '700',
      color: '#333',
      background: 'rgba(102, 126, 234, 0.1)',
      padding: '5px 15px',
      borderRadius: '20px',
      display: 'inline-block',
      whiteSpace: 'nowrap',
    },
    activityTitle: {
      fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
      fontWeight: '600',
      color: '#333',
      marginBottom: '5px',
      flex: 1,
      minWidth: '200px',
    },
    activityMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '10px',
      flexWrap: 'wrap',
    },
    activityType: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      padding: '5px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '500',
      whiteSpace: 'nowrap',
    },
    activityLocation: {
      color: '#666',
      fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      flexWrap: 'wrap',
    },
    activityNotes: {
      color: '#666',
      fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
      lineHeight: 1.5,
      marginTop: '10px',
    },
    deleteButton: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: 'rgba(239, 68, 68, 0.1)',
      border: 'none',
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      color: '#EF4444',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      zIndex: 2,
    },
    dropZone: {
      border: '2px dashed #667eea',
      borderRadius: '15px',
      padding: '30px',
      textAlign: 'center',
      color: '#667eea',
      margin: '20px 0',
      background: 'rgba(102, 126, 234, 0.05)',
      transition: 'all 0.3s ease',
      width: '100%',
      boxSizing: 'border-box',
    },
    exportButtons: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      marginTop: '30px',
      width: '100%',
    },
    exportButton: {
      padding: '15px',
      background: 'white',
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      fontSize: '14px',
      width: '100%',
      boxSizing: 'border-box',
    },
    timelineConnector: {
      position: 'relative',
      paddingLeft: '40px',
      width: '100%',
    },
    timelineDot: {
      position: 'absolute',
      left: '0',
      top: '20px',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      background: '#667eea',
      border: '3px solid white',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.3)',
      zIndex: 1,
    },
    timelineLine: {
      position: 'absolute',
      left: '10px',
      top: '40px',
      bottom: '0',
      width: '2px',
      background: '#e0e0e0',
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      marginBottom: '20px',
      width: '100%',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      marginBottom: '20px',
      width: '100%',
    },
    animationElements: {
      position: 'absolute',
      pointerEvents: 'none',
      width: '300px',
      height: '300px',
      background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
      borderRadius: '50%',
      animation: 'float 6s ease-in-out infinite',
      top: '20%',
      left: '5%',
    },
    addDayButton: {
      background: 'rgba(255, 255, 255, 0.8)',
      border: '2px dashed #667eea',
      padding: '25px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      borderRadius: '25px',
      width: '100%',
      boxSizing: 'border-box',
    },
  };

  const toggleDay = (dayId) => {
    setExpandedDay(expandedDay === dayId ? null : dayId);
  };

  const handleExport = (format) => {
    alert(`Exporting itinerary as ${format.toUpperCase()}`);
  };

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.animationElements} />
      
      <div style={styles.header}>
        <h1 style={styles.title}>Itinerary Builder 🗺️</h1>
        <p style={styles.subtitle}>Plan your perfect trip day by day. Drag and drop activities to rearrange!</p>
      </div>

      <div style={styles.mainContent}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.statsCard}>
            <h3 style={{margin: '0 0 15px', fontSize: '1.5rem'}}>Trip Overview</h3>
            <div style={styles.statsGrid}>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: '700'}}>{tripStats.totalActivities}</div>
                <div style={{fontSize: '0.9rem', opacity: 0.9}}>Activities</div>
              </div>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: '700'}}>{tripStats.totalDays}</div>
                <div style={{fontSize: '0.9rem', opacity: 0.9}}>Days</div>
              </div>
            </div>
            <div style={{marginTop: '20px', width: '100%'}}>
              <h4 style={{margin: '0 0 10px', fontSize: '1rem'}}>Activities by Type</h4>
              {Object.entries(tripStats.activitiesByType).map(([type, count]) => (
                <div key={type} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                  width: '100%',
                }}>
                  <span style={{display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0}}>
                    <span style={{fontSize: '1.2rem'}}>{getTypeIcon(type)}</span>
                    <span style={{
                      fontSize: '0.9rem', 
                      textTransform: 'capitalize',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '120px'
                    }}>{type}</span>
                  </span>
                  <span style={{fontWeight: '600', flexShrink: 0}}>{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.addActivityForm}>
            <h3 style={{margin: '0 0 20px', color: '#333', fontSize: '1.3rem'}}>Add New Activity</h3>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Day</label>
              <select
                value={newActivity.dayId}
                onChange={(e) => setNewActivity({...newActivity, dayId: parseInt(e.target.value)})}
                style={styles.select}
              >
                {days.map(day => (
                  <option key={day.id} value={day.id}>
                    Day {day.id}: {day.title}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Time</label>
                <input
                  type="time"
                  value={newActivity.time}
                  onChange={(e) => setNewActivity({...newActivity, time: e.target.value})}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Type</label>
                <select
                  value={newActivity.type}
                  onChange={(e) => setNewActivity({...newActivity, type: e.target.value})}
                  style={styles.select}
                >
                  <option value="sightseeing">🏛️ Sightseeing</option>
                  <option value="food">🍽️ Food</option>
                  <option value="transport">🚗 Transport</option>
                  <option value="shopping">🛍️ Shopping</option>
                  <option value="hotel">🏨 Hotel</option>
                  <option value="activity">🎯 Activity</option>
                  <option value="flight">✈️ Flight</option>
                </select>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Title</label>
              <input
                type="text"
                value={newActivity.title}
                onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                placeholder="Activity title"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Location</label>
              <input
                type="text"
                value={newActivity.location}
                onChange={(e) => setNewActivity({...newActivity, location: e.target.value})}
                placeholder="Address or landmark"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Notes</label>
              <textarea
                value={newActivity.notes}
                onChange={(e) => setNewActivity({...newActivity, notes: e.target.value})}
                placeholder="Additional details..."
                style={{...styles.input, minHeight: '80px', resize: 'vertical'}}
              />
            </div>

            <button
              onClick={handleAddActivity}
              style={styles.addButton}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px) scale(1.02)'}
              onMouseLeave={(e) => e.target.style.transform = 'none'}
            >
              ✨ Add Activity
            </button>
          </div>

          <div style={styles.exportButtons}>
            <button
              onClick={() => handleExport('pdf')}
              style={styles.exportButton}
              onMouseEnter={(e) => e.target.style.borderColor = '#667eea'}
              onMouseLeave={(e) => e.target.style.borderColor = '#e0e0e0'}
            >
              📄 PDF
            </button>
            <button
              onClick={() => handleExport('print')}
              style={styles.exportButton}
              onMouseEnter={(e) => e.target.style.borderColor = '#667eea'}
              onMouseLeave={(e) => e.target.style.borderColor = '#e0e0e0'}
            >
              🖨️ Print
            </button>
          </div>
        </div>

        {/* Days Container */}
        <div style={styles.daysContainer}>
          {days.map((day, dayIndex) => (
            <div key={day.id} style={styles.dayCard}>
              <div 
                style={styles.dayHeader}
                onClick={() => toggleDay(day.id)}
              >
                <div style={{flex: 1, minWidth: 0}}>
                  <h3 style={styles.dayTitle}>
                    Day {day.id}: {day.title}
                  </h3>
                  <div style={styles.dayDate}>{formatDate(day.date)}</div>
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  transform: expandedDay === day.id ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s ease',
                  flexShrink: 0,
                }}>
                  ▼
                </div>
              </div>

              <div 
                style={{
                  ...styles.activitiesList,
                  maxHeight: expandedDay === day.id ? '500px' : '0',
                  padding: expandedDay === day.id ? '25px' : '0 25px',
                }}
                onDragOver={(e) => handleDragOver(e, day.id)}
                onDrop={(e) => handleDrop(e, day.id)}
              >
                {expandedDay === day.id && (
                  <>
                    {/* Drop Zone for dragging activities */}
                    <div 
                      style={styles.dropZone}
                      onDragOver={(e) => handleDragOver(e, day.id)}
                      onDrop={(e) => handleDrop(e, day.id)}
                    >
                      Drop activities here to move to Day {day.id}
                    </div>

                    {/* Activities Timeline */}
                    <div style={styles.timelineConnector}>
                      {day.activities.map((activity, index) => (
                        <div key={activity.id} style={{position: 'relative', width: '100%'}}>
                          {index < day.activities.length - 1 && (
                            <div style={styles.timelineLine} />
                          )}
                          <div style={styles.timelineDot} />
                          
                          <div
                            draggable
                            onDragStart={() => handleDragStart(activity, day.id)}
                            style={{
                              ...styles.activityItem,
                              borderLeftColor: getTypeColor(activity.type),
                              marginLeft: '20px',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateX(10px)';
                              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateX(0)';
                              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                            }}
                          >
                            <div style={styles.activityHeader}>
                              <div style={{flex: 1, minWidth: '200px'}}>
                                <div style={styles.activityTime}>{activity.time}</div>
                                <h4 style={styles.activityTitle}>{activity.title}</h4>
                              </div>
                              <div style={{
                                ...styles.activityType,
                                background: `${getTypeColor(activity.type)}20`,
                                color: getTypeColor(activity.type),
                                flexShrink: 0,
                              }}>
                                {getTypeIcon(activity.type)} {activity.type}
                              </div>
                            </div>

                            {activity.location && (
                              <div style={styles.activityLocation}>
                                📍 {activity.location}
                              </div>
                            )}

                            {activity.notes && (
                              <div style={styles.activityNotes}>
                                📝 {activity.notes}
                              </div>
                            )}

                            <button
                              onClick={() => handleDeleteActivity(day.id, activity.id)}
                              style={styles.deleteButton}
                              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {day.activities.length === 0 && (
                      <div style={{
                        textAlign: 'center',
                        padding: '40px 20px',
                        color: '#666',
                        fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
                        width: '100%',
                      }}>
                        ✨ No activities planned for this day. Add some above!
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}

          {/* Add New Day Button */}
          <button
            onClick={() => {
              const newDay = {
                id: days.length + 1,
                date: new Date(Date.now() + days.length * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                title: `Day ${days.length + 1}`,
                activities: []
              };
              setDays([...days, newDay]);
              setExpandedDay(newDay.id);
            }}
            style={styles.addDayButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '15px'}}>➕</div>
            <h3 style={{margin: '0', color: '#667eea', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)'}}>Add New Day</h3>
            <p style={{margin: '10px 0 0', color: '#666', fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'}}>Extend your trip itinerary</p>
          </button>
        </div>
      </div>

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
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
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
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            margin: 0;
            overflow-x: hidden;
            width: 100vw;
          }
          
          button {
            font-family: 'Poppins', sans-serif;
            cursor: pointer;
          }
          
          textarea {
            font-family: 'Poppins', sans-serif;
          }
          
          .dragging {
            opacity: 0.5;
            transform: scale(0.95);
          }
          
          .drop-zone-active {
            background: rgba(102, 126, 234, 0.1);
            border-color: #667eea;
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
          
          /* Responsive Styles */
          @media (max-width: 1200px) {
            .mainContent {
              gridTemplateColumns: minmax(280px, 320px) 1fr;
              gap: 25px;
            }
            
            .container {
              paddingLeft: 4vw;
              paddingRight: 4vw;
            }
          }
          
          @media (max-width: 1024px) {
            .mainContent {
              gridTemplateColumns: 1fr;
              maxWidth: 800px;
            }
            
            .sidebar {
              order: 2;
            }
            
            .daysContainer {
              order: 1;
            }
            
            .container {
              paddingLeft: 3vw;
              paddingRight: 3vw;
            }
          }
          
          @media (max-width: 768px) {
            .container {
              padding: 15px;
            }
            
            .dayHeader,
            .activitiesList {
              padding: 20px;
            }
            
            .activityItem {
              padding: 15px;
            }
            
            .formRow {
              gridTemplateColumns: 1fr;
            }
            
            .statsGrid {
              gridTemplateColumns: 1fr;
            }
            
            .exportButtons {
              gridTemplateColumns: 1fr;
            }
            
            .timelineConnector {
              paddingLeft: 30px;
            }
            
            .timelineDot {
              width: 16px;
              height: 16px;
            }
          }
          
          @media (max-width: 480px) {
            .container {
              padding: 10px;
            }
            
            .header {
              marginBottom: 30px;
            }
            
            .title {
              font-size: 1.8rem;
            }
            
            .subtitle {
              font-size: 0.9rem;
            }
            
            .dayHeader {
              flexDirection: column;
              alignItems: flex-start;
              gap: 10px;
            }
            
            .activityHeader {
              flexDirection: column;
              gap: 10px;
            }
            
            .activityTitle {
              minWidth: 100%;
            }
            
            .addDayButton {
              padding: 20px;
            }
            
            .sidebar {
              padding: 20px;
            }
            
            .statsCard,
            .addActivityForm {
              padding: 20px;
            }
          }
          
          @media (max-width: 360px) {
            .container {
              padding: 8px;
            }
            
            .title {
              font-size: 1.6rem;
            }
            
            .dayHeader,
            .activitiesList {
              padding: 15px;
            }
            
            .sidebar {
              padding: 15px;
            }
            
            .statsCard,
            .addActivityForm {
              padding: 15px;
            }
            
            .activityItem {
              padding: 12px;
            }
            
            .deleteButton {
              top: 10px;
              right: 10px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ItineraryBuilder;