// routes/serviceRoutes.js
const express = require('express');
const {
  createService,
  getServices,
  updateService,
  deleteService,
  addPriceOptions
} = require('../controllers/serviceController');
const router = express.Router();

// Create service route
router.post('/category/:categoryId/service', createService);

// Get all services in a category route
router.get('/category/:categoryId/services', getServices);

// Update service route
router.put('/category/:categoryId/service/:serviceId', updateService);

// Delete service route
router.delete('/category/:categoryId/service/:serviceId', deleteService);

// Add price options to a service
router.post('/category/:categoryId/service/:serviceId/price', addPriceOptions);

module.exports = router;