const express = require('express');
const { loginUser, registerUser } = require('../controllers/authController');

const router = express.Router();

// Register a new user
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;