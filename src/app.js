const express = require('express');
const multiClusterRoutes = require('./routes/multiClusterRoutes');
require('dotenv').config();

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Use multi-cluster routes
app.use('/api/multi-cluster', multiClusterRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});