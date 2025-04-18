// routes/categoryRoutes.js
const express = require('express');
const { createCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/categoryController');
const router = express.Router();

// Create, Get, Update, Delete Category routes
router.post('/category', createCategory);
router.get('/categories', getCategories);
router.put('/category/:categoryId', updateCategory);
router.delete('/category/:categoryId', deleteCategory);

module.exports = router;