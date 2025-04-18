const db = require('../models/db');

// Create a service
const createService = (req, res) => {
  const { name, type, categoryId, priceOptions } = req.body;

  const serviceQuery = 'INSERT INTO services (name, type, category_id) VALUES (?, ?, ?)';

  db.query(serviceQuery, [name, type, categoryId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    const serviceId = result.insertId;

    if (priceOptions && priceOptions.length > 0) {
      const priceQuery = 'INSERT INTO service_price_options (service_id, duration, price, type) VALUES ?';
      const values = priceOptions.map(opt => [serviceId, opt.duration, opt.price, opt.type]);

      db.query(priceQuery, [values], (err) => {
        if (err) return res.status(500).json({ error: err.message });

        return res.status(201).json({ message: 'Service and price options created successfully', id: serviceId });
      });
    } else {
      return res.status(201).json({ message: 'Service created successfully', id: serviceId });
    }
  });
};

// Get all services for a category
const getServices = (req, res) => {
  const { categoryId } = req.params;

  const query = `
    SELECT s.*, spo.id AS price_id, spo.duration, spo.price, spo.type AS price_type 
    FROM services s 
    LEFT JOIN service_price_options spo ON s.id = spo.service_id 
    WHERE s.category_id = ?`;

  db.query(query, [categoryId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    // Group price options by service
    const services = {};
    results.forEach(row => {
      if (!services[row.id]) {
        services[row.id] = {
          id: row.id,
          name: row.name,
          type: row.type,
          category_id: row.category_id,
          priceOptions: []
        };
      }

      if (row.price_id) {
        services[row.id].priceOptions.push({
          id: row.price_id,
          duration: row.duration,
          price: row.price,
          type: row.price_type
        });
      }
    });

    res.status(200).json(Object.values(services));
  });
};

// Update a service and its price options
const updateService = (req, res) => {
  const { categoryId, serviceId } = req.params;
  const { name, type, priceOptions } = req.body;

  const updateServiceQuery = 'UPDATE services SET name = ?, type = ? WHERE id = ? AND category_id = ?';

  db.query(updateServiceQuery, [name, type, serviceId, categoryId], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    if (priceOptions && priceOptions.length > 0) {
      const deleteOld = 'DELETE FROM service_price_options WHERE service_id = ?';

      db.query(deleteOld, [serviceId], (err) => {
        if (err) return res.status(500).json({ error: err.message });

        const insertNew = 'INSERT INTO service_price_options (service_id, duration, price, type) VALUES ?';
        const values = priceOptions.map(opt => [serviceId, opt.duration, opt.price, opt.type]);

        db.query(insertNew, [values], (err) => {
          if (err) return res.status(500).json({ error: err.message });

          return res.status(200).json({ message: 'Service and price options updated successfully' });
        });
      });
    } else {
      return res.status(200).json({ message: 'Service updated (no price options provided)' });
    }
  });
};

// Delete a service and its price options
const deleteService = (req, res) => {
  const { categoryId, serviceId } = req.params;

  const deletePrices = 'DELETE FROM service_price_options WHERE service_id = ?';
  const deleteServiceQuery = 'DELETE FROM services WHERE id = ? AND category_id = ?';

  db.query(deletePrices, [serviceId], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    db.query(deleteServiceQuery, [serviceId, categoryId], (err) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(200).json({ message: 'Service and related price options deleted successfully' });
    });
  });
};

// Add price options to a service (without deleting old)
const addPriceOptions = (req, res) => {
  const { serviceId } = req.params;
  const { duration, price, type } = req.body;

  const query = 'INSERT INTO service_price_options (service_id, duration, price, type) VALUES (?, ?, ?, ?)';

  db.query(query, [serviceId, duration, price, type], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({ message: 'Price option added successfully' });
  });
};

module.exports = {
  createService,
  getServices,
  updateService,
  deleteService,
  addPriceOptions
};