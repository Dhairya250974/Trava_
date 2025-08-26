const express = require("express");
const { getAllTours, getTourBySearch, getFeaturedTour, getTourCount, getSingleTour, createTour, updateTour, deleteTour} = require("../controllers/tourController");

const {verifyAdmin, verifyToken} = require("../middleware/authMiddleware")



const router = express.Router();

router.get('/', getAllTours);
router.get('/search', getTourBySearch);
router.get('/featured', getFeaturedTour);
router.get('/count', getTourCount);
router.get('/:id', getSingleTour);
router.post('/', verifyToken, verifyAdmin, createTour);
router.put('/:id', verifyToken, verifyAdmin, updateTour);
router.delete('/:id', verifyToken, verifyAdmin, deleteTour);

export default router;