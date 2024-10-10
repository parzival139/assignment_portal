const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true
    },
    admin: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'], // Add status options
        default: 'pending' // Default to 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
