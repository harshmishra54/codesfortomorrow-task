// controllers/categoryController.js
const db = require('../models/db');

// Create category
const createCategory = (req, res) => {
  const { name } = req.body;
  const query = 'INSERT INTO categories (name) VALUES (?)';

  db.query(query, [name], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, name });
  });
};

// Get all categories
const getCategories = (req, res) => {
  const query = 'SELECT * FROM categories';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

// Update category
const updateCategory = (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;
  const query = 'UPDATE categories SET name = ? WHERE id = ?';

  db.query(query, [name, categoryId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Category updated successfully' });
  });
};

// Delete category (only if no services exist)
const deleteCategory = (req, res) => {
  const { categoryId } = req.params;
  const checkQuery = 'SELECT * FROM services WHERE category_id = ?';

  db.query(checkQuery, [categoryId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length > 0) {
      return res.status(400).json({ message: 'Category cannot be deleted because it has services' });
    }

    const deleteQuery = 'DELETE FROM categories WHERE id = ?';
    db.query(deleteQuery, [categoryId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Category deleted successfully' });
    });
  });
};

module.exports = { createCategory, getCategories, updateCategory, deleteCategory };