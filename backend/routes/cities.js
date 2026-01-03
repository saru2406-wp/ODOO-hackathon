const express = require('express');
const pool = require('../config/database');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

// Get all cities with optional filters
router.get('/', authenticate, async (req, res) => {
  try {
    const { search, country, minCost, maxCost, minPopularity } = req.query;
    
    let query = 'SELECT * FROM cities WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND (name LIKE ? OR country LIKE ? OR description LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (country && country !== 'all') {
      query += ' AND country = ?';
      params.push(country);
    }

    if (minCost) {
      query += ' AND cost_index >= ?';
      params.push(minCost);
    }

    if (maxCost) {
      query += ' AND cost_index <= ?';
      params.push(maxCost);
    }

    if (minPopularity) {
      query += ' AND popularity >= ?';
      params.push(minPopularity);
    }

    query += ' ORDER BY popularity DESC, name ASC';

    const [cities] = await pool.execute(query, params);

    // Get unique countries
    const [countries] = await pool.execute(
      'SELECT DISTINCT country FROM cities ORDER BY country ASC'
    );

    res.json({
      cities,
      countries: countries.map(c => c.country)
    });
  } catch (error) {
    console.error('Get cities error:', error);
    res.status(500).json({ message: 'Error fetching cities' });
  }
});

// Get single city
router.get('/:id', authenticate, async (req, res) => {
  try {
    const [cities] = await pool.execute('SELECT * FROM cities WHERE id = ?', [req.params.id]);

    if (cities.length === 0) {
      return res.status(404).json({ message: 'City not found' });
    }

    // Get activities in this city
    const [activities] = await pool.execute(
      'SELECT * FROM activities WHERE city_id = ? ORDER BY rating DESC LIMIT 10',
      [req.params.id]
    );

    res.json({
      city: cities[0],
      activities
    });
  } catch (error) {
    console.error('Get city error:', error);
    res.status(500).json({ message: 'Error fetching city' });
  }
});

module.exports = router;

