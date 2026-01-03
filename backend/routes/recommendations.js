const express = require('express');
const pool = require('../config/database');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

// Get personalized recommendations
router.get('/', authenticate, async (req, res) => {
  try {
    const { budget, duration, season, activities, region } = req.query;

    // Get user's trip history and preferences
    const [userTrips] = await pool.execute(
      `SELECT t.*, GROUP_CONCAT(i.name) as interests
       FROM trips t
       LEFT JOIN trip_interests ti ON t.id = ti.trip_id
       LEFT JOIN interests i ON ti.interest_id = i.id
       WHERE t.user_id = ?
       GROUP BY t.id`,
      [req.user.id]
    );

    // Get user's saved activities to understand preferences
    const [savedActivities] = await pool.execute(
      `SELECT a.category, COUNT(*) as count
       FROM saved_activities sa
       JOIN activities a ON sa.activity_id = a.id
       WHERE sa.user_id = ?
       GROUP BY a.category`,
      [req.user.id]
    );

    // Build recommendation query
    let query = `
      SELECT 
        tr.*,
        CASE 
          WHEN ? IS NOT NULL AND tr.budget_range LIKE CONCAT('%', ?, '%') THEN 20
          ELSE 0
        END +
        CASE 
          WHEN ? IS NOT NULL AND tr.duration LIKE CONCAT('%', ?, '%') THEN 15
          ELSE 0
        END +
        CASE 
          WHEN ? IS NOT NULL AND tr.location LIKE CONCAT('%', ?, '%') THEN 10
          ELSE 0
        END as match_score
      FROM trip_recommendations tr
      WHERE 1=1
    `;
    const params = [budget, budget, duration, duration, region, region];

    // Add activity matching
    if (activities && activities.length > 0) {
      const activityList = Array.isArray(activities) ? activities : [activities];
      query += ' AND (';
      activityList.forEach((activity, index) => {
        if (index > 0) query += ' OR ';
        query += 'JSON_SEARCH(best_for, "one", ?) IS NOT NULL';
        params.push(activity);
      });
      query += ')';
    }

    query += ' ORDER BY match_score DESC, rating DESC LIMIT 20';

    const [recommendations] = await pool.execute(query, params);

    // If no recommendations, generate some based on user preferences
    if (recommendations.length === 0) {
      const generatedRecs = await generateRecommendations(req.user.id, {
        budget, duration, season, activities, region
      });
      return res.json({ recommendations: generatedRecs });
    }

    res.json({ recommendations });
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ message: 'Error fetching recommendations' });
  }
});

// Generate recommendations based on preferences
async function generateRecommendations(userId, preferences) {
  const recommendations = [];

  // Sample recommendations based on preferences
  const sampleRecs = [
    {
      title: 'Bali Paradise',
      description: 'Tropical beaches, temples, and vibrant culture',
      location: 'Bali, Indonesia',
      budget_range: '$800-$1200',
      duration: '7-10 days',
      best_for: JSON.stringify(['Beach', 'Culture', 'Wellness']),
      rating: 4.8
    },
    {
      title: 'Japanese Adventure',
      description: 'Cherry blossoms, ancient temples, and modern cities',
      location: 'Japan',
      budget_range: '$1500-$2000',
      duration: '10-14 days',
      best_for: JSON.stringify(['Culture', 'Food', 'Nature']),
      rating: 4.9
    },
    {
      title: 'Swiss Alps Retreat',
      description: 'Mountain adventures and scenic train rides',
      location: 'Switzerland',
      budget_range: '$2000-$3000',
      duration: '8-12 days',
      best_for: JSON.stringify(['Adventure', 'Nature', 'Luxury']),
      rating: 4.7
    },
    {
      title: 'Greek Island Hopping',
      description: 'Ancient ruins, blue domes, and crystal waters',
      location: 'Greece',
      budget_range: '$1200-$1800',
      duration: '10-14 days',
      best_for: JSON.stringify(['Beach', 'History', 'Food']),
      rating: 4.6
    },
    {
      title: 'Moroccan Desert',
      description: 'Desert camps, markets, and architecture',
      location: 'Morocco',
      budget_range: '$800-$1500',
      duration: '8-12 days',
      best_for: JSON.stringify(['Adventure', 'Culture', 'Photography']),
      rating: 4.5
    },
    {
      title: 'New Zealand Road Trip',
      description: 'Epic landscapes, adventure sports, and Maori culture',
      location: 'New Zealand',
      budget_range: '$2500-$3500',
      duration: '14-21 days',
      best_for: JSON.stringify(['Adventure', 'Nature', 'Road Trip']),
      rating: 4.9
    }
  ];

  // Filter and score based on preferences
  for (const rec of sampleRecs) {
    let matchScore = 0;

    // Budget matching
    if (preferences.budget) {
      if (preferences.budget === 'budget' && rec.budget_range.includes('$800')) matchScore += 20;
      if (preferences.budget === 'mid-range' && (rec.budget_range.includes('$1200') || rec.budget_range.includes('$1500'))) matchScore += 20;
      if (preferences.budget === 'luxury' && rec.budget_range.includes('$2000')) matchScore += 20;
    }

    // Duration matching
    if (preferences.duration) {
      if (preferences.duration === 'short' && rec.duration.includes('7')) matchScore += 15;
      if (preferences.duration === 'medium' && rec.duration.includes('10')) matchScore += 15;
      if (preferences.duration === 'long' && rec.duration.includes('14')) matchScore += 15;
    }

    // Activity matching
    if (preferences.activities && Array.isArray(preferences.activities)) {
      const bestFor = JSON.parse(rec.best_for);
      preferences.activities.forEach(activity => {
        if (bestFor.some(bf => bf.toLowerCase().includes(activity.toLowerCase()))) {
          matchScore += 10;
        }
      });
    }

    rec.match_score = matchScore;
    recommendations.push(rec);
  }

  // Sort by match score
  recommendations.sort((a, b) => b.match_score - a.match_score);

  return recommendations.slice(0, 6);
}

// Save recommendation
router.post('/:id/save', authenticate, async (req, res) => {
  try {
    // This would typically create a trip from the recommendation
    // For now, just return success
    res.json({ message: 'Recommendation saved' });
  } catch (error) {
    console.error('Save recommendation error:', error);
    res.status(500).json({ message: 'Error saving recommendation' });
  }
});

module.exports = router;

