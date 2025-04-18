// app.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const app = express();

dotenv.config();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());  // To parse JSON request bodies

// Add authentication and routes
app.use('/api/v1', authRoutes);
app.use('/api/v1', categoryRoutes);
app.use('/api/v1', serviceRoutes);

app.listen(port, () => {
  console.log('Server is running on port ${port}');
});