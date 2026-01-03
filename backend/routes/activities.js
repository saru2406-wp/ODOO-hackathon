const express = require('express');
const pool = require('../config/database');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

// Get all activities with filters
router.get('/', authenticate, async (req, res) => {
  try {
    const { search, category, price, minRating, cityId } = req.query;
    
    let query = 'SELECT * FROM activities WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND (name LIKE ? OR description LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }

    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (price && price !== 'all') {
      query += ' AND price_range = ?';
      params.push(price);
    }

    if (minRating) {
      query += ' AND rating >= ?';
      params.push(minRating);
    }

    if (cityId) {
      query += ' AND city_id = ?';
      params.push(cityId);
    }

    query += ' ORDER BY rating DESC, review_count DESC';

    const [activities] = await pool.execute(query, params);

    res.json({ activities });
  } catch (error) {
    console.error('Get activities error:', error);
    res.status(500).json({ message: 'Error fetching activities' });
  }
});

// Get single activity
router.get('/:id', authenticate, async (req, res) => {
  try {
    const [activities] = await pool.execute('SELECT * FROM activities WHERE id = ?', [req.params.id]);

    if (activities.length === 0) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    const activity = activities[0];

    // Get city info if available
    if (activity.city_id) {
      const [cities] = await pool.execute('SELECT * FROM cities WHERE id = ?', [activity.city_id]);
      activity.city = cities[0] || null;
    }

    res.json({ activity });
  } catch (error) {
    console.error('Get activity error:', error);
    res.status(500).json({ message: 'Error fetching activity' });
  }
});

// Save activity for user
router.post('/:id/save', authenticate, async (req, res) => {
  try {
    // Check if already saved
    const [existing] = await pool.execute(
      'SELECT id FROM saved_activities WHERE user_id = ? AND activity_id = ?',
      [req.user.id, req.params.id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Activity already saved' });
    }

    await pool.execute(
      'INSERT INTO saved_activities (user_id, activity_id) VALUES (?, ?)',
      [req.user.id, req.params.id]
    );

    res.json({ message: 'Activity saved' });
  } catch (error) {
    console.error('Save activity error:', error);
    res.status(500).json({ message: 'Error saving activity' });
  }
});

// Unsave activity
router.delete('/:id/save', authenticate, async (req, res) => {
  try {
    await pool.execute(
      'DELETE FROM saved_activities WHERE user_id = ? AND activity_id = ?',
      [req.user.id, req.params.id]
    );

    res.json({ message: 'Activity unsaved' });
  } catch (error) {
    console.error('Unsave activity error:', error);
    res.status(500).json({ message: 'Error unsaving activity' });
  }
});

// Get saved activities for user
router.get('/saved/all', authenticate, async (req, res) => {
  try {
    const [activities] = await pool.execute(
      `SELECT a.*, sa.created_at as saved_at 
       FROM saved_activities sa
       JOIN activities a ON sa.activity_id = a.id
       WHERE sa.user_id = ?
       ORDER BY sa.created_at DESC`,
      [req.user.id]
    );

    res.json({ activities });
  } catch (error) {
    console.error('Get saved activities error:', error);
    res.status(500).json({ message: 'Error fetching saved activities' });
  }
});

module.exports = router;

