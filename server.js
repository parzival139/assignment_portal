const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load Environment Variables
dotenv.config();

// Initialize Express App
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to Parse JSON
app.use(express.json());

// CORS Middleware
const cors = require('cors');
app.use(cors());

// Import Routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Use Routes
app.use('/api/users', userRoutes);  // User-related routes
app.use('/api/admins', adminRoutes); // Admin-related routes

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Assignment Submission Portal API');
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
