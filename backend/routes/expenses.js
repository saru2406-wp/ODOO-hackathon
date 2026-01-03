const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

// Create expense split
router.post('/split', authenticate, [
  body('tripId').isInt().withMessage('Valid trip ID is required'),
  body('totalAmount').isFloat({ min: 0 }).withMessage('Valid amount is required'),
  body('splitType').isIn(['equal', 'percentage', 'custom']).withMessage('Valid split type is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { tripId, totalAmount, splitType, participants } = req.body;

    // Verify trip belongs to user
    const [trips] = await pool.execute(
      'SELECT id FROM trips WHERE id = ? AND user_id = ?',
      [tripId, req.user.id]
    );

    if (trips.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Create expense split
    const [result] = await pool.execute(
      'INSERT INTO expense_splits (trip_id, total_amount, split_type) VALUES (?, ?, ?)',
      [tripId, totalAmount, splitType]
    );

    const splitId = result.insertId;

    // Add participants
    if (participants && Array.isArray(participants)) {
      for (const participant of participants) {
        await pool.execute(
          'INSERT INTO expense_split_participants (expense_split_id, user_id, name, share, percentage) VALUES (?, ?, ?, ?, ?)',
          [
            splitId,
            participant.userId || null,
            participant.name,
            participant.share || 0,
            participant.percentage || 0
          ]
        );
      }
    }

    const [newSplit] = await pool.execute(
      `SELECT es.*, 
              JSON_ARRAYAGG(JSON_OBJECT('id', esp.id, 'name', esp.name, 'share', esp.share, 'percentage', esp.percentage)) as participants
       FROM expense_splits es
       LEFT JOIN expense_split_participants esp ON es.id = esp.expense_split_id
       WHERE es.id = ?
       GROUP BY es.id`,
      [splitId]
    );

    res.status(201).json({
      message: 'Expense split created',
      split: newSplit[0]
    });
  } catch (error) {
    console.error('Create expense split error:', error);
    res.status(500).json({ message: 'Error creating expense split' });
  }
});

// Get expense splits for a trip
router.get('/split/trip/:tripId', authenticate, async (req, res) => {
  try {
    // Verify trip belongs to user
    const [trips] = await pool.execute(
      'SELECT id FROM trips WHERE id = ? AND user_id = ?',
      [req.params.tripId, req.user.id]
    );

    if (trips.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const [splits] = await pool.execute(
      `SELECT es.*, 
              JSON_ARRAYAGG(JSON_OBJECT('id', esp.id, 'name', esp.name, 'share', esp.share, 'percentage', esp.percentage)) as participants
       FROM expense_splits es
       LEFT JOIN expense_split_participants esp ON es.id = esp.expense_split_id
       WHERE es.trip_id = ?
       GROUP BY es.id
       ORDER BY es.created_at DESC`,
      [req.params.tripId]
    );

    res.json({ splits });
  } catch (error) {
    console.error('Get expense splits error:', error);
    res.status(500).json({ message: 'Error fetching expense splits' });
  }
});

module.exports = router;

