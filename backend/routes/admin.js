const express = require('express');
const pool = require('../config/database');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(authorize('admin'));

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const [userStats] = await pool.execute(
      'SELECT COUNT(*) as total_users, COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as new_users FROM users'
    );

    const [tripStats] = await pool.execute(
      'SELECT COUNT(*) as total_trips, COUNT(CASE WHEN status = "completed" THEN 1 END) as completed_trips FROM trips'
    );

    const [activityStats] = await pool.execute(
      'SELECT COUNT(*) as total_activities, AVG(rating) as avg_rating FROM activities'
    );

    const [cityStats] = await pool.execute(
      'SELECT COUNT(*) as total_cities, AVG(popularity) as avg_popularity FROM cities'
    );

    res.json({
      users: userStats[0],
      trips: tripStats[0],
      activities: activityStats[0],
      cities: cityStats[0]
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;

    const [users] = await pool.execute(
      `SELECT id, name, email, role, created_at,
              (SELECT COUNT(*) FROM trips WHERE user_id = users.id) as trip_count
       FROM users
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [parseInt(limit), parseInt(offset)]
    );

    res.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Update user role
router.put('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    await pool.execute(
      'UPDATE users SET role = ? WHERE id = ?',
      [role, req.params.id]
    );

    res.json({ message: 'User role updated' });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ message: 'Error updating user role' });
  }
});

// Add city
router.post('/cities', async (req, res) => {
  try {
    const { name, country, countryCode, costIndex, popularity, description, latitude, longitude } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO cities (name, country, country_code, cost_index, popularity, description, latitude, longitude)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, country, countryCode, costIndex, popularity, description, latitude || null, longitude || null]
    );

    const [newCity] = await pool.execute('SELECT * FROM cities WHERE id = ?', [result.insertId]);

    res.status(201).json({
      message: 'City added',
      city: newCity[0]
    });
  } catch (error) {
    console.error('Add city error:', error);
    res.status(500).json({ message: 'Error adding city' });
  }
});

// Add activity
router.post('/activities', async (req, res) => {
  try {
    const {
      name, category, location, cityId, priceRange, priceAmount,
      rating, reviewCount, duration, description, highlights, tags
    } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO activities 
       (name, category, location, city_id, price_range, price_amount, rating, review_count, duration, description, highlights, tags)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name, category, location, cityId || null, priceRange || 'moderate',
        priceAmount || 0, rating || 0, reviewCount || 0, duration || null,
        description || null, JSON.stringify(highlights || []), JSON.stringify(tags || [])
      ]
    );

    const [newActivity] = await pool.execute('SELECT * FROM activities WHERE id = ?', [result.insertId]);

    res.status(201).json({
      message: 'Activity added',
      activity: newActivity[0]
    });
  } catch (error) {
    console.error('Add activity error:', error);
    res.status(500).json({ message: 'Error adding activity' });
  }
});

module.exports = router;

