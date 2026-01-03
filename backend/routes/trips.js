const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

// Get all trips for authenticated user
router.get('/', authenticate, async (req, res) => {
  try {
    const [trips] = await pool.execute(
      `SELECT t.*, 
              COUNT(DISTINCT it.id) as itinerary_days_count,
              COUNT(DISTINCT b.id) as budget_categories_count,
              COALESCE(SUM(b.allocated), 0) as total_budget
       FROM trips t
       LEFT JOIN itinerary_days it ON t.id = it.trip_id
       LEFT JOIN budget_categories b ON t.id = b.trip_id
       WHERE t.user_id = ?
       GROUP BY t.id
       ORDER BY t.start_date DESC`,
      [req.user.id]
    );

    // Get interests for each trip
    for (let trip of trips) {
      const [interests] = await pool.execute(
        'SELECT interest_id, name FROM trip_interests ti JOIN interests i ON ti.interest_id = i.id WHERE trip_id = ?',
        [trip.id]
      );
      trip.interests = interests;
    }

    res.json({ trips });
  } catch (error) {
    console.error('Get trips error:', error);
    res.status(500).json({ message: 'Error fetching trips' });
  }
});

// Get single trip by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const [trips] = await pool.execute(
      'SELECT * FROM trips WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (trips.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const trip = trips[0];

    // Get interests
    const [interests] = await pool.execute(
      'SELECT interest_id, name FROM trip_interests ti JOIN interests i ON ti.interest_id = i.id WHERE trip_id = ?',
      [trip.id]
    );
    trip.interests = interests;

    // Get itinerary days count
    const [daysCount] = await pool.execute(
      'SELECT COUNT(*) as count FROM itinerary_days WHERE trip_id = ?',
      [trip.id]
    );
    trip.days_count = daysCount[0].count;

    res.json({ trip });
  } catch (error) {
    console.error('Get trip error:', error);
    res.status(500).json({ message: 'Error fetching trip' });
  }
});

// Create new trip
router.post('/', authenticate, [
  body('destination').trim().notEmpty().withMessage('Destination is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      destination,
      tripType,
      startDate,
      endDate,
      travelers,
      budget,
      description,
      interests,
      accommodation,
      transportation
    } = req.body;

    // Insert trip
    const [result] = await pool.execute(
      `INSERT INTO trips (user_id, destination, trip_type, start_date, end_date, travelers, budget, description, accommodation, transportation, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        destination,
        tripType || 'leisure',
        startDate,
        endDate,
        travelers || 1,
        budget || 0,
        description || '',
        accommodation || '',
        transportation || '',
        'planned'
      ]
    );

    const tripId = result.insertId;

    // Add interests if provided
    if (interests && Array.isArray(interests) && interests.length > 0) {
      for (const interestId of interests) {
        await pool.execute(
          'INSERT INTO trip_interests (trip_id, interest_id) VALUES (?, ?)',
          [tripId, interestId]
        );
      }
    }

    // Get created trip
    const [trips] = await pool.execute('SELECT * FROM trips WHERE id = ?', [tripId]);
    
    res.status(201).json({
      message: 'Trip created successfully',
      trip: trips[0]
    });
  } catch (error) {
    console.error('Create trip error:', error);
    res.status(500).json({ message: 'Error creating trip' });
  }
});

// Update trip
router.put('/:id', authenticate, async (req, res) => {
  try {
    const {
      destination,
      tripType,
      startDate,
      endDate,
      travelers,
      budget,
      description,
      accommodation,
      transportation,
      status
    } = req.body;

    // Check if trip exists and belongs to user
    const [trips] = await pool.execute(
      'SELECT id FROM trips WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (trips.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Build update query dynamically
    const updates = [];
    const values = [];

    if (destination !== undefined) { updates.push('destination = ?'); values.push(destination); }
    if (tripType !== undefined) { updates.push('trip_type = ?'); values.push(tripType); }
    if (startDate !== undefined) { updates.push('start_date = ?'); values.push(startDate); }
    if (endDate !== undefined) { updates.push('end_date = ?'); values.push(endDate); }
    if (travelers !== undefined) { updates.push('travelers = ?'); values.push(travelers); }
    if (budget !== undefined) { updates.push('budget = ?'); values.push(budget); }
    if (description !== undefined) { updates.push('description = ?'); values.push(description); }
    if (accommodation !== undefined) { updates.push('accommodation = ?'); values.push(accommodation); }
    if (transportation !== undefined) { updates.push('transportation = ?'); values.push(transportation); }
    if (status !== undefined) { updates.push('status = ?'); values.push(status); }

    updates.push('updated_at = NOW()');
    values.push(req.params.id);

    await pool.execute(
      `UPDATE trips SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    // Update interests if provided
    if (req.body.interests && Array.isArray(req.body.interests)) {
      await pool.execute('DELETE FROM trip_interests WHERE trip_id = ?', [req.params.id]);
      for (const interestId of req.body.interests) {
        await pool.execute(
          'INSERT INTO trip_interests (trip_id, interest_id) VALUES (?, ?)',
          [req.params.id, interestId]
        );
      }
    }

    const [updatedTrips] = await pool.execute('SELECT * FROM trips WHERE id = ?', [req.params.id]);

    res.json({
      message: 'Trip updated successfully',
      trip: updatedTrips[0]
    });
  } catch (error) {
    console.error('Update trip error:', error);
    res.status(500).json({ message: 'Error updating trip' });
  }
});

// Delete trip
router.delete('/:id', authenticate, async (req, res) => {
  try {
    // Check if trip exists and belongs to user
    const [trips] = await pool.execute(
      'SELECT id FROM trips WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (trips.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Delete related data (cascade should handle this, but being explicit)
    await pool.execute('DELETE FROM trip_interests WHERE trip_id = ?', [req.params.id]);
    await pool.execute('DELETE FROM itinerary_activities WHERE itinerary_day_id IN (SELECT id FROM itinerary_days WHERE trip_id = ?)', [req.params.id]);
    await pool.execute('DELETE FROM itinerary_days WHERE trip_id = ?', [req.params.id]);
    await pool.execute('DELETE FROM budget_transactions WHERE budget_category_id IN (SELECT id FROM budget_categories WHERE trip_id = ?)', [req.params.id]);
    await pool.execute('DELETE FROM budget_categories WHERE trip_id = ?', [req.params.id]);
    await pool.execute('DELETE FROM expense_splits WHERE trip_id = ?', [req.params.id]);
    await pool.execute('DELETE FROM trips WHERE id = ?', [req.params.id]);

    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error('Delete trip error:', error);
    res.status(500).json({ message: 'Error deleting trip' });
  }
});

module.exports = router;

