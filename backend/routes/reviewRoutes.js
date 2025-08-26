const express = require("express");

const {createReview, deleteReview} = require("../controllers/reviewController")




const router = express.Router();


// Create a new review
router.post('/:tourId', verifyUser, createReview);

// Delete a review by ID
router.delete('/:id', verifyUser, deleteReview);

export default router;