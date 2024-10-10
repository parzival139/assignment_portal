const express = require('express');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin'); // Admin model (create this next)
const Assignment = require('../models/Assignment'); // Assignment model (use the same)

const router = express.Router();

// Middleware for authorization (Placeholder)
const authMiddleware = (req, res, next) => {
    // Logic to verify admin token/session goes here
    // For example, check if a token is present in the headers and validate it
    // If not authorized, return an error response:
    // return res.status(403).json({ message: 'Unauthorized' });
    next(); // Call next() if authorized
};

// Admin Registration
router.post('/register', async (req, res) => {
    const { adminName, password } = req.body;

    // Validate input
    if (!adminName || !password) {
        return res.status(400).json({ message: 'Admin name and password are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ adminName, password: hashedPassword });
        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully.' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error registering admin.' });
    }
});

// Admin Login
router.post('/login', async (req, res) => {
    const { adminName, password } = req.body;

    // Validate input
    if (!adminName || !password) {
        return res.status(400).json({ message: 'Admin name and password are required.' });
    }

    try {
        const admin = await Admin.findOne({ adminName });
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        res.status(200).json({ message: 'Login successful.' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error logging in admin.' });
    }
});

// View Assignments
router.get('/assignments', authMiddleware, async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.status(200).json(assignments);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error fetching assignments.' });
    }
});

// Accept or Reject Assignment
router.put('/assignments/:id', authMiddleware, async (req, res) => {
    const { status } = req.body; // Expecting { status: 'accepted' or 'rejected' }

    // Validate input
    if (!status || (status !== 'accepted' && status !== 'rejected')) {
        return res.status(400).json({ message: 'Status must be "accepted" or "rejected".' });
    }

    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found.' });
        }

        // Update the status of the assignment
        assignment.status = status; // Ensure status field exists in the Assignment model
        await assignment.save();

        res.status(200).json({ message: 'Assignment updated successfully.', assignment });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error updating assignment.', error });
    }
});

module.exports = router;
