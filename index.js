require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

// Check if MONGO_URI is defined
if (!MONGO_URI) {
    console.error('Error: MONGO_URI is not defined in the .env file');
    process.exit(1); // Exit the process with failure
}

// Middleware
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Assignment Portal API'); // You can customize this message
});

// Database connection
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
