const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

// Get itinerary for a trip
router.get('/trip/:tripId', authenticate, async (req, res) => {
  try {
    // Verify trip belongs to user
    const [trips] = await pool.execute(
      'SELECT id FROM trips WHERE id = ? AND user_id = ?',
      [req.params.tripId, req.user.id]
    );

    if (trips.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Get itinerary days with activities
    const [days] = await pool.execute(
      `SELECT id, day_number, date, title 
       FROM itinerary_days 
       WHERE trip_id = ? 
       ORDER BY day_number ASC`,
      [req.params.tripId]
    );

    for (let day of days) {
      const [activities] = await pool.execute(
        `SELECT id, activity_id, time, title, type, location, notes, order_index
         FROM itinerary_activities 
         WHERE itinerary_day_id = ? 
         ORDER BY time ASC, order_index ASC`,
        [day.id]
      );
      day.activities = activities;
    }

    res.json({ days });
  } catch (error) {
    console.error('Get itinerary error:', error);
    res.status(500).json({ message: 'Error fetching itinerary' });
  }
});

// Create itinerary day
router.post('/days', authenticate, [
  body('tripId').isInt().withMessage('Valid trip ID is required'),
  body('dayNumber').isInt().withMessage('Valid day number is required'),
  body('date').isISO8601().withMessage('Valid date is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { tripId, dayNumber, date, title } = req.body;

    // Verify trip belongs to user
    const [trips] = await pool.execute(
      'SELECT id FROM trips WHERE id = ? AND user_id = ?',
      [tripId, req.user.id]
    );

    if (trips.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const [result] = await pool.execute(
      'INSERT INTO itinerary_days (trip_id, day_number, date, title) VALUES (?, ?, ?, ?)',
      [tripId, dayNumber, date, title || `Day ${dayNumber}`]
    );

    const [newDay] = await pool.execute('SELECT * FROM itinerary_days WHERE id = ?', [result.insertId]);

    res.status(201).json({
      message: 'Itinerary day created',
      day: newDay[0]
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Day already exists for this trip' });
    }
    console.error('Create day error:', error);
    res.status(500).json({ message: 'Error creating itinerary day' });
  }
});

// Add activity to itinerary day
router.post('/activities', authenticate, [
  body('itineraryDayId').isInt().withMessage('Valid day ID is required'),
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('type').trim().notEmpty().withMessage('Type is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { itineraryDayId, activityId, time, title, type, location, notes } = req.body;

    // Verify day belongs to user's trip
    const [days] = await pool.execute(
      `SELECT id FROM itinerary_days id
       JOIN trips t ON id.trip_id = t.id
       WHERE id.id = ? AND t.user_id = ?`,
      [itineraryDayId, req.user.id]
    );

    if (days.length === 0) {
      return res.status(404).json({ message: 'Itinerary day not found' });
    }

    const [result] = await pool.execute(
      `INSERT INTO itinerary_activities 
       (itinerary_day_id, activity_id, time, title, type, location, notes, order_index)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [itineraryDayId, activityId || null, time || null, title, type, location || null, notes || null, 0]
    );

    const [newActivity] = await pool.execute(
      'SELECT * FROM itinerary_activities WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      message: 'Activity added to itinerary',
      activity: newActivity[0]
    });
  } catch (error) {
    console.error('Add activity error:', error);
    res.status(500).json({ message: 'Error adding activity' });
  }
});

// Update activity
router.put('/activities/:id', authenticate, async (req, res) => {
  try {
    const { time, title, type, location, notes, orderIndex } = req.body;

    // Verify activity belongs to user's trip
    const [activities] = await pool.execute(
      `SELECT ia.id FROM itinerary_activities ia
       JOIN itinerary_days id ON ia.itinerary_day_id = id.id
       JOIN trips t ON id.trip_id = t.id
       WHERE ia.id = ? AND t.user_id = ?`,
      [req.params.id, req.user.id]
    );

    if (activities.length === 0) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    const updates = [];
    const values = [];

    if (time !== undefined) { updates.push('time = ?'); values.push(time); }
    if (title !== undefined) { updates.push('title = ?'); values.push(title); }
    if (type !== undefined) { updates.push('type = ?'); values.push(type); }
    if (location !== undefined) { updates.push('location = ?'); values.push(location); }
    if (notes !== undefined) { updates.push('notes = ?'); values.push(notes); }
    if (orderIndex !== undefined) { updates.push('order_index = ?'); values.push(orderIndex); }

    values.push(req.params.id);

    await pool.execute(
      `UPDATE itinerary_activities SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    const [updatedActivity] = await pool.execute(
      'SELECT * FROM itinerary_activities WHERE id = ?',
      [req.params.id]
    );

    res.json({
      message: 'Activity updated',
      activity: updatedActivity[0]
    });
  } catch (error) {
    console.error('Update activity error:', error);
    res.status(500).json({ message: 'Error updating activity' });
  }
});

// Delete activity
router.delete('/activities/:id', authenticate, async (req, res) => {
  try {
    // Verify activity belongs to user's trip
    const [activities] = await pool.execute(
      `SELECT ia.id FROM itinerary_activities ia
       JOIN itinerary_days id ON ia.itinerary_day_id = id.id
       JOIN trips t ON id.trip_id = t.id
       WHERE ia.id = ? AND t.user_id = ?`,
      [req.params.id, req.user.id]
    );

    if (activities.length === 0) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    await pool.execute('DELETE FROM itinerary_activities WHERE id = ?', [req.params.id]);

    res.json({ message: 'Activity deleted' });
  } catch (error) {
    console.error('Delete activity error:', error);
    res.status(500).json({ message: 'Error deleting activity' });
  }
});

// Delete itinerary day
router.delete('/days/:id', authenticate, async (req, res) => {
  try {
    // Verify day belongs to user's trip
    const [days] = await pool.execute(
      `SELECT id.id FROM itinerary_days id
       JOIN trips t ON id.trip_id = t.id
       WHERE id.id = ? AND t.user_id = ?`,
      [req.params.id, req.user.id]
    );

    if (days.length === 0) {
      return res.status(404).json({ message: 'Day not found' });
    }

    await pool.execute('DELETE FROM itinerary_days WHERE id = ?', [req.params.id]);

    res.json({ message: 'Itinerary day deleted' });
  } catch (error) {
    console.error('Delete day error:', error);
    res.status(500).json({ message: 'Error deleting itinerary day' });
  }
});

module.exports = router;

