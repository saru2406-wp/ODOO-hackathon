const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

// Get budget for a trip
router.get('/trip/:tripId', authenticate, async (req, res) => {
  try {
    // Verify trip belongs to user
    const [trips] = await pool.execute(
      'SELECT id, budget FROM trips WHERE id = ? AND user_id = ?',
      [req.params.tripId, req.user.id]
    );

    if (trips.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const trip = trips[0];

    // Get budget categories
    const [categories] = await pool.execute(
      'SELECT * FROM budget_categories WHERE trip_id = ? ORDER BY created_at ASC',
      [req.params.tripId]
    );

    // Calculate totals
    let totalAllocated = 0;
    let totalSpent = 0;

    for (let category of categories) {
      totalAllocated += parseFloat(category.allocated || 0);
      totalSpent += parseFloat(category.spent || 0);
    }

    res.json({
      tripBudget: trip.budget,
      categories,
      totalAllocated,
      totalSpent,
      remaining: trip.budget - totalSpent
    });
  } catch (error) {
    console.error('Get budget error:', error);
    res.status(500).json({ message: 'Error fetching budget' });
  }
});

// Create budget category
router.post('/categories', authenticate, [
  body('tripId').isInt().withMessage('Valid trip ID is required'),
  body('name').trim().notEmpty().withMessage('Category name is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { tripId, name, allocated, color, icon } = req.body;

    // Verify trip belongs to user
    const [trips] = await pool.execute(
      'SELECT id FROM trips WHERE id = ? AND user_id = ?',
      [tripId, req.user.id]
    );

    if (trips.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const [result] = await pool.execute(
      'INSERT INTO budget_categories (trip_id, name, allocated, color, icon) VALUES (?, ?, ?, ?, ?)',
      [tripId, name, allocated || 0, color || null, icon || null]
    );

    const [newCategory] = await pool.execute(
      'SELECT * FROM budget_categories WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      message: 'Budget category created',
      category: newCategory[0]
    });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ message: 'Error creating budget category' });
  }
});

// Update budget category
router.put('/categories/:id', authenticate, async (req, res) => {
  try {
    const { name, allocated, spent, color, icon } = req.body;

    // Verify category belongs to user's trip
    const [categories] = await pool.execute(
      `SELECT bc.id FROM budget_categories bc
       JOIN trips t ON bc.trip_id = t.id
       WHERE bc.id = ? AND t.user_id = ?`,
      [req.params.id, req.user.id]
    );

    if (categories.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const updates = [];
    const values = [];

    if (name !== undefined) { updates.push('name = ?'); values.push(name); }
    if (allocated !== undefined) { updates.push('allocated = ?'); values.push(allocated); }
    if (spent !== undefined) { updates.push('spent = ?'); values.push(spent); }
    if (color !== undefined) { updates.push('color = ?'); values.push(color); }
    if (icon !== undefined) { updates.push('icon = ?'); values.push(icon); }

    values.push(req.params.id);

    await pool.execute(
      `UPDATE budget_categories SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    const [updatedCategory] = await pool.execute(
      'SELECT * FROM budget_categories WHERE id = ?',
      [req.params.id]
    );

    res.json({
      message: 'Category updated',
      category: updatedCategory[0]
    });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ message: 'Error updating category' });
  }
});

// Add transaction
router.post('/transactions', authenticate, [
  body('budgetCategoryId').isInt().withMessage('Valid category ID is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('amount').isFloat({ min: 0 }).withMessage('Valid amount is required'),
  body('transactionDate').isISO8601().withMessage('Valid date is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { budgetCategoryId, description, amount, transactionDate, type } = req.body;

    // Verify category belongs to user's trip
    const [categories] = await pool.execute(
      `SELECT bc.id, bc.spent FROM budget_categories bc
       JOIN trips t ON bc.trip_id = t.id
       WHERE bc.id = ? AND t.user_id = ?`,
      [budgetCategoryId, req.user.id]
    );

    if (categories.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const category = categories[0];
    const transactionType = type || 'expense';
    const amountValue = transactionType === 'expense' ? amount : -amount;

    // Create transaction
    const [result] = await pool.execute(
      `INSERT INTO budget_transactions 
       (budget_category_id, description, amount, transaction_date, type)
       VALUES (?, ?, ?, ?, ?)`,
      [budgetCategoryId, description, amount, transactionDate, transactionType]
    );

    // Update category spent amount
    const newSpent = parseFloat(category.spent || 0) + parseFloat(amountValue);
    await pool.execute(
      'UPDATE budget_categories SET spent = ? WHERE id = ?',
      [newSpent, budgetCategoryId]
    );

    const [newTransaction] = await pool.execute(
      'SELECT * FROM budget_transactions WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      message: 'Transaction added',
      transaction: newTransaction[0]
    });
  } catch (error) {
    console.error('Add transaction error:', error);
    res.status(500).json({ message: 'Error adding transaction' });
  }
});

// Get transactions for a category
router.get('/transactions/category/:categoryId', authenticate, async (req, res) => {
  try {
    // Verify category belongs to user's trip
    const [categories] = await pool.execute(
      `SELECT bc.id FROM budget_categories bc
       JOIN trips t ON bc.trip_id = t.id
       WHERE bc.id = ? AND t.user_id = ?`,
      [req.params.categoryId, req.user.id]
    );

    if (categories.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const [transactions] = await pool.execute(
      'SELECT * FROM budget_transactions WHERE budget_category_id = ? ORDER BY transaction_date DESC, created_at DESC',
      [req.params.categoryId]
    );

    res.json({ transactions });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ message: 'Error fetching transactions' });
  }
});

// Delete transaction
router.delete('/transactions/:id', authenticate, async (req, res) => {
  try {
    // Get transaction and verify it belongs to user
    const [transactions] = await pool.execute(
      `SELECT bt.id, bt.amount, bt.type, bt.budget_category_id, bc.spent
       FROM budget_transactions bt
       JOIN budget_categories bc ON bt.budget_category_id = bc.id
       JOIN trips t ON bc.trip_id = t.id
       WHERE bt.id = ? AND t.user_id = ?`,
      [req.params.id, req.user.id]
    );

    if (transactions.length === 0) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    const transaction = transactions[0];
    const amountValue = transaction.type === 'expense' ? -transaction.amount : transaction.amount;
    const newSpent = parseFloat(transaction.spent) + parseFloat(amountValue);

    // Update category spent
    await pool.execute(
      'UPDATE budget_categories SET spent = ? WHERE id = ?',
      [newSpent, transaction.budget_category_id]
    );

    // Delete transaction
    await pool.execute('DELETE FROM budget_transactions WHERE id = ?', [req.params.id]);

    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(500).json({ message: 'Error deleting transaction' });
  }
});

module.exports = router;

