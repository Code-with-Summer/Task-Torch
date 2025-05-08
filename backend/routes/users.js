// routes/users.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

// Get all users (for assigning tasks)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const users = await User.find({}, 'name email'); // Only select needed fields
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});

module.exports = router;
