const express = require("express");

const { createBooking, getBooking, getAllBookings, deleteBooking} = require("../controllers/bookingController")


const router = express.Router();

router.post('/', createBooking);
router.get('/', getAllBookings);

router.get('/:id', getBooking);
router.delete('/:id', deleteBooking);

module.exports = router;