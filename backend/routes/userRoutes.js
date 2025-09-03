const express = require("express");

const{ getAllUsers, getSingleUser, updateUser, deleteUser } = require("../controllers/userController")

const{verifyAdmin, verifyToken, verifyUser} = require("../middleware/authMiddleware")




const router = express.Router();

// Get all users
router.get('/users', verifyToken, verifyAdmin, getAllUsers);

// Get a single user by ID
router.get('/users/:id', verifyToken, verifyUser, getSingleUser);

// Update a user by ID
router.put('/users/:id', verifyToken, verifyUser, updateUser);

// Delete a user by ID
router.delete('/users/:id', verifyToken, verifyUser, deleteUser);

module.exports = router;