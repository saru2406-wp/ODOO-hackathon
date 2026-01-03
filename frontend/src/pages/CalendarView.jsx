import React, { useState } from 'react';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Sample trips data
  const trips = [
    { id: 1, title: 'Bali Trip ✈️', date: '2024-01-15', type: 'flight', color: '#667eea' },
    { id: 2, title: 'Hotel Check-in 🏨', date: '2024-01-15', type: 'hotel', color: '#4CAF50' },
    { id: 3, title: 'Tokyo Flight 🛫', date: '2024-01-20', type: 'flight', color: '#667eea' },
    { id: 4, title: 'Museum Tour 🏛️', date: '2024-01-21', type: 'activity', color: '#FF9800' },
    { id: 5, title: 'Beach Day 🏖️', date: '2024-01-22', type: 'activity', color: '#FF9800' },
    { id: 6, title: 'Return Flight 🛬', date: '2024-01-25', type: 'flight', color: '#667eea' },
    { id: 7, title: 'Europe Trip ✈️', date: '2024-02-10', type: 'flight', color: '#667eea' },
    { id: 8, title: 'Swiss Hotel 🏔️', date: '2024-02-11', type: 'hotel', color: '#4CAF50' },
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return trips.filter(trip => trip.date === dateStr);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const daysArray = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateStr = date.toISOString().split('T')[0];
      const isToday = dateStr === new Date().toISOString().split('T')[0];
      const isSelected = dateStr === selectedDate.toISOString().split('T')[0];
      const dayEvents = getEventsForDate(date);
      
      daysArray.push(
        <div 
          key={day} 
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className="day-number">{day}</div>
          <div className="day-events">
            {dayEvents.slice(0, 3).map(event => (
              <div 
                key={event.id} 
                className="event-dot" 
                style={{ backgroundColor: event.color }}
                title={event.title}
              ></div>
            ))}
            {dayEvents.length > 3 && (
              <div className="more-events">+{dayEvents.length - 3}</div>
            )}
          </div>
        </div>
      );
    }

    return daysArray;
  };

  const selectedDateEvents = getEventsForDate(selectedDate);

  return (
    <div className="calendar-view">
      <nav className="navbar">
        <div className="nav-brand">
          <h1>Travel Planner</h1>
        </div>
        <div className="nav-links">
          <a href="/dashboard" className="nav-link">← Back to Dashboard</a>
        </div>
      </nav>

      <div className="container">
        <div className="calendar-header">
          <h1>📅 Travel Calendar</h1>
          <p>View and manage all your travel plans in one place</p>
        </div>

        <div className="calendar-container">
          <div className="calendar-main card">
            <div className="calendar-controls">
              <button className="nav-btn" onClick={prevMonth}>◀</button>
              <h2>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
              <button className="nav-btn" onClick={nextMonth}>▶</button>
            </div>

            <div className="calendar-grid">
              {/* Day headers */}
              {days.map(day => (
                <div key={day} className="calendar-header-day">{day}</div>
              ))}
              
              {/* Calendar days */}
              {renderCalendar()}
            </div>
          </div>

          <div className="calendar-sidebar">
            {/* Selected Date Info */}
            <div className="selected-date card">
              <h3>🗓️ {selectedDate.toDateString()}</h3>
              <div className="selected-events">
                {selectedDateEvents.length > 0 ? (
                  selectedDateEvents.map(event => (
                    <div key={event.id} className="event-item" style={{ borderLeftColor: event.color }}>
                      <div className="event-icon">
                        {event.type === 'flight' ? '✈️' : 
                         event.type === 'hotel' ? '🏨' : 
                         event.type === 'activity' ? '🎭' : '📍'}
                      </div>
                      <div className="event-details">
                        <h4>{event.title}</h4>
                        <p className="event-time">All day</p>
                      </div>
                      <button className="event-action">⋯</button>
                    </div>
                  ))
                ) : (
                  <p className="no-events">No travel plans for this day</p>
                )}
              </div>
              <button className="add-event-btn">➕ Add Event</button>
            </div>

            {/* Upcoming Trips */}
            <div className="upcoming-trips card">
              <h3>⏭️ Upcoming Trips</h3>
              <div className="trips-list">
                {trips
                  .filter(trip => new Date(trip.date) > new Date())
                  .slice(0, 5)
                  .map(trip => (
                    <div key={trip.id} className="trip-item">
                      <div className="trip-date">
                        <span className="date-day">{new Date(trip.date).getDate()}</span>
                        <span className="date-month">{months[new Date(trip.date).getMonth()].substring(0, 3)}</span>
                      </div>
                      <div className="trip-info">
                        <h4>{trip.title}</h4>
                        <p>{new Date(trip.date).toDateString()}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="calendar-stats card">
              <h3>📊 Travel Stats</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-icon">✈️</div>
                  <div>
                    <h4>5</h4>
                    <p>Flights</p>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">🏨</div>
                  <div>
                    <h4>3</h4>
                    <p>Hotels</p>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">🎭</div>
                  <div>
                    <h4>12</h4>
                    <p>Activities</p>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">📅</div>
                  <div>
                    <h4>8</h4>
                    <p>Total Plans</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Event Modal (simplified) */}
        <div className="add-event-section card">
          <h3>➕ Add New Travel Plan</h3>
          <div className="quick-add-options">
            <button className="quick-add-btn">
              <span>✈️</span>
              Flight
            </button>
            <button className="quick-add-btn">
              <span>🏨</span>
              Hotel
            </button>
            <button className="quick-add-btn">
              <span>🎭</span>
              Activity
            </button>
            <button className="quick-add-btn">
              <span>🚗</span>
              Transport
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .calendar-view {
          min-height: 100vh;
          background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
          width: 100vw;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          box-sizing: border-box;
        }

        .navbar {
          background: white;
          padding: 20px 5vw;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100vw;
          box-sizing: border-box;
        }

        .nav-brand h1 {
          color: #333;
          font-size: clamp(1.2rem, 2vw, 1.5rem);
          margin: 0;
        }

        .nav-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
          font-size: clamp(0.9rem, 1.5vw, 1rem);
          white-space: nowrap;
        }

        .container {
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          padding: 30px 5vw;
          box-sizing: border-box;
        }

        .calendar-header {
          text-align: center;
          margin-bottom: 40px;
          width: 100%;
        }

        .calendar-header h1 {
          font-size: clamp(2rem, 4vw, 3rem);
          color: #333;
          margin-bottom: 10px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .calendar-header p {
          color: #666;
          font-size: clamp(1rem, 1.5vw, 1.2rem);
          max-width: 600px;
          margin: 0 auto;
        }

        .calendar-container {
          display: grid;
          grid-template-columns: minmax(500px, 2fr) minmax(300px, 1fr);
          gap: 30px;
          margin-bottom: 40px;
          width: 100%;
        }

        .calendar-main {
          padding: 30px;
          width: 100%;
          box-sizing: border-box;
        }

        .calendar-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          width: 100%;
          flex-wrap: wrap;
          gap: 15px;
        }

        .calendar-controls h2 {
          color: #333;
          font-size: clamp(1.5rem, 2.5vw, 1.8rem);
          margin: 0;
          text-align: center;
          flex: 1;
          min-width: 200px;
        }

        .nav-btn {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          width: clamp(35px, 4vw, 40px);
          height: clamp(35px, 4vw, 40px);
          border-radius: 50%;
          font-size: clamp(1rem, 1.5vw, 1.2rem);
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .nav-btn:hover {
          background: linear-gradient(135deg, #5a67d8, #6a4d8c);
          transform: scale(1.1);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 10px;
          width: 100%;
        }

        .calendar-header-day {
          text-align: center;
          padding: clamp(10px, 1.5vw, 15px) 0;
          font-weight: bold;
          color: #666;
          border-bottom: 2px solid #eee;
          font-size: clamp(0.9rem, 1.2vw, 1rem);
        }

        .calendar-day {
          aspect-ratio: 1;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          padding: clamp(5px, 1vw, 10px);
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          box-sizing: border-box;
          position: relative;
        }

        .calendar-day:hover {
          background: #f8f9fa;
          border-color: #667eea;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .calendar-day.today {
          background: #e3f2fd;
          border-color: #2196F3;
        }

        .calendar-day.selected {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border-color: #667eea;
        }

        .calendar-day.empty {
          border: none;
          cursor: default;
          background: transparent;
        }

        .calendar-day.empty:hover {
          background: transparent;
          border: none;
          transform: none;
          box-shadow: none;
        }

        .day-number {
          font-size: clamp(1rem, 1.5vw, 1.2rem);
          font-weight: bold;
          position: absolute;
          top: 5px;
          left: 10px;
        }

        .day-events {
          display: flex;
          flex-wrap: wrap;
          gap: 3px;
          justify-content: center;
          align-items: center;
          margin-top: 25px;
          width: 100%;
        }

        .event-dot {
          width: clamp(6px, 0.8vw, 8px);
          height: clamp(6px, 0.8vw, 8px);
          border-radius: 50%;
          cursor: pointer;
          flex-shrink: 0;
        }

        .more-events {
          font-size: clamp(0.6rem, 0.8vw, 0.7rem);
          color: #666;
          background: rgba(255, 255, 255, 0.9);
          padding: 2px 5px;
          border-radius: 10px;
        }

        .calendar-sidebar {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
        }

        .selected-date {
          padding: clamp(20px, 2vw, 25px);
          width: 100%;
          box-sizing: border-box;
        }

        .selected-date h3 {
          margin-bottom: 20px;
          color: #333;
          font-size: clamp(1.2rem, 1.5vw, 1.5rem);
        }

        .selected-events {
          min-height: 150px;
          margin-bottom: 20px;
          width: 100%;
        }

        .event-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
          margin-bottom: 10px;
          border-left: 4px solid;
          width: 100%;
          box-sizing: border-box;
        }

        .event-icon {
          font-size: clamp(1.2rem, 1.5vw, 1.5rem);
          flex-shrink: 0;
        }

        .event-details {
          flex: 1;
          min-width: 0;
        }

        .event-details h4 {
          margin: 0 0 5px 0;
          color: #333;
          font-size: clamp(0.9rem, 1.2vw, 1rem);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .event-time {
          color: #666;
          font-size: clamp(0.8rem, 1vw, 0.85rem);
          margin: 0;
        }

        .event-action {
          background: none;
          border: none;
          font-size: clamp(1.2rem, 1.5vw, 1.5rem);
          cursor: pointer;
          color: #666;
          padding: 5px;
          flex-shrink: 0;
        }

        .no-events {
          text-align: center;
          color: #666;
          padding: 20px;
          font-size: clamp(0.9rem, 1.2vw, 1rem);
        }

        .add-event-btn {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-size: clamp(0.9rem, 1.2vw, 1rem);
          box-sizing: border-box;
        }

        .add-event-btn:hover {
          background: linear-gradient(135deg, #5a67d8, #6a4d8c);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }

        .upcoming-trips {
          padding: clamp(20px, 2vw, 25px);
          width: 100%;
          box-sizing: border-box;
        }

        .upcoming-trips h3 {
          margin-bottom: 20px;
          color: #333;
          font-size: clamp(1.2rem, 1.5vw, 1.5rem);
        }

        .trips-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
          width: 100%;
        }

        .trip-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
          width: 100%;
          box-sizing: border-box;
        }

        .trip-date {
          background: white;
          padding: 10px;
          border-radius: 8px;
          text-align: center;
          min-width: 60px;
          flex-shrink: 0;
        }

        .date-day {
          display: block;
          font-size: clamp(1.2rem, 1.5vw, 1.5rem);
          font-weight: bold;
          color: #333;
        }

        .date-month {
          display: block;
          font-size: clamp(0.8rem, 1vw, 0.9rem);
          color: #666;
        }

        .trip-info {
          flex: 1;
          min-width: 0;
        }

        .trip-info h4 {
          margin: 0 0 5px 0;
          color: #333;
          font-size: clamp(0.9rem, 1.2vw, 1rem);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .trip-info p {
          color: #666;
          font-size: clamp(0.8rem, 1vw, 0.85rem);
          margin: 0;
        }

        .calendar-stats {
          padding: clamp(20px, 2vw, 25px);
          width: 100%;
          box-sizing: border-box;
        }

        .calendar-stats h3 {
          margin-bottom: 20px;
          color: #333;
          font-size: clamp(1.2rem, 1.5vw, 1.5rem);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 20px;
          width: 100%;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
          width: 100%;
          box-sizing: border-box;
        }

        .stat-icon {
          font-size: clamp(1.5rem, 2vw, 1.8rem);
          flex-shrink: 0;
        }

        .stat-item h4 {
          margin: 0;
          color: #333;
          font-size: clamp(1.2rem, 1.5vw, 1.5rem);
        }

        .stat-item p {
          color: #666;
          font-size: clamp(0.8rem, 1vw, 0.9rem);
          margin: 0;
        }

        .add-event-section {
          padding: 30px;
          text-align: center;
          width: 100%;
          box-sizing: border-box;
        }

        .add-event-section h3 {
          margin-bottom: 25px;
          color: #333;
          font-size: clamp(1.5rem, 2vw, 1.8rem);
        }

        .quick-add-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
        }

        .quick-add-btn {
          padding: clamp(15px, 2vw, 20px) clamp(20px, 2.5vw, 30px);
          background: white;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          box-sizing: border-box;
          width: 100%;
        }

        .quick-add-btn span {
          font-size: clamp(1.5rem, 2.5vw, 2rem);
        }

        .quick-add-btn:hover {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border-color: #667eea;
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

        /* Responsive Styles */
        @media (max-width: 1200px) {
          .container {
            padding-left: 4vw;
            padding-right: 4vw;
          }
          
          .calendar-container {
            grid-template-columns: minmax(400px, 1.5fr) minmax(250px, 1fr);
            gap: 25px;
          }
        }

        @media (max-width: 1024px) {
          .calendar-container {
            grid-template-columns: 1fr;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
          }
          
          .calendar-sidebar {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
          }
          
          .selected-date {
            order: 1;
          }
          
          .upcoming-trips {
            order: 2;
          }
          
          .calendar-stats {
            order: 3;
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 20px 3vw;
          }
          
          .navbar {
            padding: 15px 3vw;
            flex-direction: column;
            gap: 15px;
          }
          
          .calendar-grid {
            gap: 5px;
          }
          
          .calendar-day {
            padding: 5px;
          }
          
          .calendar-header h1 {
            font-size: 1.8rem;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .quick-add-options {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .calendar-container {
            gap: 20px;
          }
          
          .calendar-grid {
            grid-template-columns: repeat(7, minmax(35px, 1fr));
          }
          
          .calendar-day {
            min-height: 50px;
          }
          
          .day-number {
            font-size: 0.9rem;
            top: 3px;
            left: 5px;
          }
          
          .day-events {
            margin-top: 20px;
          }
          
          .event-dot {
            width: 5px;
            height: 5px;
          }
          
          .quick-add-options {
            grid-template-columns: 1fr;
          }
          
          .calendar-sidebar {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 15px;
          }
          
          .navbar {
            padding: 12px 15px;
          }
          
          .calendar-header {
            margin-bottom: 25px;
          }
          
          .calendar-header h1 {
            font-size: 1.6rem;
          }
          
          .calendar-header p {
            font-size: 0.9rem;
          }
          
          .calendar-controls {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }
          
          .calendar-controls h2 {
            order: -1;
            width: 100%;
          }
          
          .calendar-main,
          .selected-date,
          .upcoming-trips,
          .calendar-stats,
          .add-event-section {
            padding: 20px;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .event-item,
          .trip-item,
          .stat-item {
            padding: 12px;
          }
          
          .trip-date {
            min-width: 50px;
            padding: 8px;
          }
          
          .date-day {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 360px) {
          .container {
            padding: 10px;
          }
          
          .calendar-header h1 {
            font-size: 1.4rem;
          }
          
          .calendar-grid {
            gap: 3px;
          }
          
          .calendar-day {
            min-height: 45px;
            border-radius: 5px;
          }
          
          .calendar-main,
          .selected-date,
          .upcoming-trips,
          .calendar-stats,
          .add-event-section {
            padding: 15px;
          }
          
          .event-item,
          .trip-item,
          .stat-item {
            padding: 10px;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default CalendarView;