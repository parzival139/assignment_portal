const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Admin = require('../models/Admin'); // Import the Admin model
const Assignment = require('../models/Assignment'); // Import the Assignment model
const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// User Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

// Upload Assignment
router.post('/assignments/upload', async (req, res) => {
    const { userId, task, admin } = req.body;

    // Validate input
    if (!userId || !task || !admin) {
        return res.status(400).json({ message: 'User ID, task, and admin are required.' });
    }

    try {
        const newAssignment = new Assignment({ userId, task, admin });
        await newAssignment.save();
        res.status(201).json({ message: 'Assignment uploaded successfully', assignment: newAssignment });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading assignment', error });
    }
});

// View All Admins
router.get('/admins', async (req, res) => {
    try {
        const admins = await Admin.find(); // Fetch all admins from the Admin model
        res.status(200).json(admins);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error fetching admins', error });
    }
});

module.exports = router;
