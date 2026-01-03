import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeTrips: 0,
    totalBookings: 0,
    revenue: 0
  });

  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Mock data - replace with API calls
    setStats({
      totalUsers: 156,
      activeTrips: 42,
      totalBookings: 89,
      revenue: 12500
    });

    setUsers([
      { id: 1, name: 'John Doe', email: 'john@example.com', trips: 3, status: 'active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', trips: 5, status: 'active' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', trips: 1, status: 'inactive' },
    ]);

    setBookings([
      { id: 1, user: 'John Doe', type: 'Hotel', amount: 200, status: 'confirmed' },
      { id: 2, user: 'Jane Smith', type: 'Flight', amount: 450, status: 'pending' },
      { id: 3, user: 'Bob Johnson', type: 'Hotel', amount: 180, status: 'confirmed' },
    ]);
  }, []);

  return (
    <div className="admin-dashboard">
      <nav className="navbar">
        <div className="nav-brand">
          <h1>Travel Planner Admin</h1>
        </div>
        <div className="nav-links">
          <a href="/dashboard" className="nav-link">← Back to Dashboard</a>
        </div>
      </nav>

      <div className="container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Manage your travel platform</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>{stats.totalUsers}</h3>
              <p>Total Users</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✈️</div>
            <div className="stat-info">
              <h3>{stats.activeTrips}</h3>
              <p>Active Trips</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>{stats.totalBookings}</h3>
              <p>Total Bookings</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>${stats.revenue.toLocaleString()}</h3>
              <p>Total Revenue</p>
            </div>
          </div>
        </div>

        <div className="admin-content">
          {/* Users Table */}
          <div className="admin-section">
            <h2>Users Management</h2>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Trips</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.trips}</td>
                      <td>
                        <span className={`status-badge ${user.status}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <button className="action-btn edit">Edit</button>
                        <button className="action-btn delete">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="admin-section">
            <h2>Recent Bookings</h2>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>User</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => (
                    <tr key={booking.id}>
                      <td>#{booking.id}</td>
                      <td>{booking.user}</td>
                      <td>{booking.type}</td>
                      <td>${booking.amount}</td>
                      <td>
                        <span className={`status-badge ${booking.status}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        <button className="action-btn view">View</button>
                        <button className="action-btn update">Update</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="admin-section">
            <h2>Quick Actions</h2>
            <div className="quick-actions">
              <button className="action-btn primary">📊 Generate Report</button>
              <button className="action-btn primary">📧 Send Newsletter</button>
              <button className="action-btn primary">⚙️ System Settings</button>
              <button className="action-btn primary">📈 View Analytics</button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-dashboard {
          min-height: 100vh;
          background: #f5f7fa;
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

        .admin-header {
          margin-bottom: 40px;
        }

        .admin-header h1 {
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 10px;
        }

        .admin-header p {
          color: #666;
          font-size: 1.1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          border-radius: 15px;
          padding: 25px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
        }

        .stat-icon {
          font-size: 2.5rem;
          background: #667eea;
          color: white;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-info h3 {
          font-size: 2rem;
          color: #333;
          margin-bottom: 5px;
        }

        .stat-info p {
          color: #666;
          font-size: 0.95rem;
        }

        .admin-content {
          display: grid;
          gap: 40px;
        }

        .admin-section {
          background: white;
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
        }

        .admin-section h2 {
          margin-bottom: 25px;
          color: #333;
          font-size: 1.5rem;
        }

        .table-container {
          overflow-x: auto;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }

        .admin-table th {
          background: #f8f9fa;
          padding: 15px;
          text-align: left;
          color: #666;
          font-weight: 600;
          border-bottom: 2px solid #e0e0e0;
        }

        .admin-table td {
          padding: 15px;
          border-bottom: 1px solid #eee;
          color: #333;
        }

        .admin-table tr:hover {
          background: #f8f9fa;
        }

        .status-badge {
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .status-badge.active,
        .status-badge.confirmed {
          background: #d4edda;
          color: #155724;
        }

        .status-badge.inactive,
        .status-badge.pending {
          background: #fff3cd;
          color: #856404;
        }

        .action-btn {
          padding: 8px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
          margin-right: 10px;
        }

        .action-btn.edit {
          background: #007bff;
          color: white;
        }

        .action-btn.delete {
          background: #dc3545;
          color: white;
        }

        .action-btn.view {
          background: #28a745;
          color: white;
        }

        .action-btn.update {
          background: #ffc107;
          color: #333;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 12px 25px;
          margin-right: 15px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .action-btn:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }

        .quick-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
        }

        @media (max-width: 768px) {
          .container {
            padding: 15px;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .quick-actions {
            flex-direction: column;
          }
          
          .action-btn {
            width: 100%;
            margin-bottom: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;