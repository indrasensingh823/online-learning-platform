const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// 🔐 Secret key (Store this in .env file for production use)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

// ✅ Register Route
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, passwordHash });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('❌ Registration Error:', err.message);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});

// ✅ Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, username: user.username });
  } catch (err) {
    console.error('❌ Login Error:', err.message);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

module.exports = router;
