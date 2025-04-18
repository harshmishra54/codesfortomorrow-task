// controllers/authController.js
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');
const db = require('../models/db');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY || 'yoursecretkey';

// Login function to authenticate and generate JWT token
const login = (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@codesfortomorrow.com' && password === 'Admin123!@#') {
    const payload = { email };
    const token = jwt.encode(payload, secretKey);
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
};

module.exports = { login };