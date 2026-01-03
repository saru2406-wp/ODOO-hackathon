const express = require('express');
const pool = require('../config/database');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

// Get hotels for a city
router.get('/hotels', authenticate, async (req, res) => {
  try {
    const { cityId, cityName, minPrice, maxPrice, minRating } = req.query;
    
    let query = 'SELECT * FROM hotels WHERE 1=1';
    const params = [];

    if (cityId) {
      query += ' AND city_id = ?';
      params.push(cityId);
    }

    if (cityName) {
      query += ' AND city_id IN (SELECT id FROM cities WHERE name LIKE ?)';
      params.push(`%${cityName}%`);
    }

    if (minPrice) {
      query += ' AND price_per_night >= ?';
      params.push(minPrice);
    }

    if (maxPrice) {
      query += ' AND price_per_night <= ?';
      params.push(maxPrice);
    }

    if (minRating) {
      query += ' AND rating >= ?';
      params.push(minRating);
    }

    query += ' ORDER BY rating DESC, price_per_night ASC';

    const [hotels] = await pool.execute(query, params);

    res.json({ hotels });
  } catch (error) {
    console.error('Get hotels error:', error);
    res.status(500).json({ message: 'Error fetching hotels' });
  }
});

// Get flights
router.get('/flights', authenticate, async (req, res) => {
  try {
    const { origin, destination, date, maxPrice } = req.query;
    
    let query = `
      SELECT f.*, 
             oc.name as origin_city, 
             dc.name as destination_city
      FROM flights f
      LEFT JOIN cities oc ON f.origin_city_id = oc.id
      LEFT JOIN cities dc ON f.destination_city_id = dc.id
      WHERE 1=1
    `;
    const params = [];

    if (origin) {
      query += ' AND (oc.name LIKE ? OR f.origin_city_id = ?)';
      params.push(`%${origin}%`, origin);
    }

    if (destination) {
      query += ' AND (dc.name LIKE ? OR f.destination_city_id = ?)';
      params.push(`%${destination}%`, destination);
    }

    if (date) {
      query += ' AND DATE(f.departure_time) = ?';
      params.push(date);
    }

    if (maxPrice) {
      query += ' AND f.price <= ?';
      params.push(maxPrice);
    }

    query += ' ORDER BY f.price ASC, f.departure_time ASC';

    const [flights] = await pool.execute(query, params);

    res.json({ flights });
  } catch (error) {
    console.error('Get flights error:', error);
    res.status(500).json({ message: 'Error fetching flights' });
  }
});

// Get single hotel
router.get('/hotels/:id', authenticate, async (req, res) => {
  try {
    const [hotels] = await pool.execute(
      `SELECT h.*, c.name as city_name, c.country
       FROM hotels h
       LEFT JOIN cities c ON h.city_id = c.id
       WHERE h.id = ?`,
      [req.params.id]
    );

    if (hotels.length === 0) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    res.json({ hotel: hotels[0] });
  } catch (error) {
    console.error('Get hotel error:', error);
    res.status(500).json({ message: 'Error fetching hotel' });
  }
});

// Get single flight
router.get('/flights/:id', authenticate, async (req, res) => {
  try {
    const [flights] = await pool.execute(
      `SELECT f.*, 
              oc.name as origin_city, oc.country as origin_country,
              dc.name as destination_city, dc.country as destination_country
       FROM flights f
       LEFT JOIN cities oc ON f.origin_city_id = oc.id
       LEFT JOIN cities dc ON f.destination_city_id = dc.id
       WHERE f.id = ?`,
      [req.params.id]
    );

    if (flights.length === 0) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.json({ flight: flights[0] });
  } catch (error) {
    console.error('Get flight error:', error);
    res.status(500).json({ message: 'Error fetching flight' });
  }
});

module.exports = router;

