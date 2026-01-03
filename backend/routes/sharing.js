const express = require('express');
const crypto = require('crypto');
const pool = require('../config/database');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

// Share a trip (make it public)
router.post('/trip/:tripId', authenticate, async (req, res) => {
  try {
    const { isPublic } = req.body;

    // Verify trip belongs to user
    const [trips] = await pool.execute(
      'SELECT id FROM trips WHERE id = ? AND user_id = ?',
      [req.params.tripId, req.user.id]
    );

    if (trips.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Generate unique share code
    const shareCode = crypto.randomBytes(8).toString('hex');

    // Check if already shared
    const [existing] = await pool.execute(
      'SELECT id FROM shared_trips WHERE trip_id = ?',
      [req.params.tripId]
    );

    if (existing.length > 0) {
      // Update existing share
      await pool.execute(
        'UPDATE shared_trips SET is_public = ?, share_code = ? WHERE trip_id = ?',
        [isPublic || false, shareCode, req.params.tripId]
      );
    } else {
      // Create new share
      await pool.execute(
        'INSERT INTO shared_trips (trip_id, user_id, is_public, share_code) VALUES (?, ?, ?, ?)',
        [req.params.tripId, req.user.id, isPublic || false, shareCode]
      );
    }

    res.json({
      message: 'Trip shared successfully',
      shareCode,
      isPublic: isPublic || false
    });
  } catch (error) {
    console.error('Share trip error:', error);
    res.status(500).json({ message: 'Error sharing trip' });
  }
});

// Get public trips
router.get('/public', async (req, res) => {
  try {
    const { limit = 20, offset = 0 } = req.query;

    const [trips] = await pool.execute(
      `SELECT t.*, u.name as author_name, st.views, st.likes, st.share_code
       FROM shared_trips st
       JOIN trips t ON st.trip_id = t.id
       JOIN users u ON t.user_id = u.id
       WHERE st.is_public = TRUE
       ORDER BY st.views DESC, st.likes DESC
       LIMIT ? OFFSET ?`,
      [parseInt(limit), parseInt(offset)]
    );

    res.json({ trips });
  } catch (error) {
    console.error('Get public trips error:', error);
    res.status(500).json({ message: 'Error fetching public trips' });
  }
});

// Get trip by share code
router.get('/code/:shareCode', async (req, res) => {
  try {
    const [sharedTrips] = await pool.execute(
      `SELECT t.*, u.name as author_name, st.views, st.likes
       FROM shared_trips st
       JOIN trips t ON st.trip_id = t.id
       JOIN users u ON t.user_id = u.id
       WHERE st.share_code = ?`,
      [req.params.shareCode]
    );

    if (sharedTrips.length === 0) {
      return res.status(404).json({ message: 'Shared trip not found' });
    }

    // Increment views
    await pool.execute(
      'UPDATE shared_trips SET views = views + 1 WHERE share_code = ?',
      [req.params.shareCode]
    );

    res.json({ trip: sharedTrips[0] });
  } catch (error) {
    console.error('Get trip by code error:', error);
    res.status(500).json({ message: 'Error fetching shared trip' });
  }
});

// Like a shared trip
router.post('/like/:shareCode', authenticate, async (req, res) => {
  try {
    await pool.execute(
      'UPDATE shared_trips SET likes = likes + 1 WHERE share_code = ?',
      [req.params.shareCode]
    );

    res.json({ message: 'Trip liked' });
  } catch (error) {
    console.error('Like trip error:', error);
    res.status(500).json({ message: 'Error liking trip' });
  }
});

// Unshare a trip
router.delete('/trip/:tripId', authenticate, async (req, res) => {
  try {
    // Verify trip belongs to user
    const [trips] = await pool.execute(
      'SELECT id FROM trips WHERE id = ? AND user_id = ?',
      [req.params.tripId, req.user.id]
    );

    if (trips.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    await pool.execute('DELETE FROM shared_trips WHERE trip_id = ?', [req.params.tripId]);

    res.json({ message: 'Trip unshared' });
  } catch (error) {
    console.error('Unshare trip error:', error);
    res.status(500).json({ message: 'Error unsharing trip' });
  }
});

module.exports = router;

