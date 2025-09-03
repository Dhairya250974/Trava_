const { timeStamp } = require("console");

const Booking = require("../models/Booking")

const createBooking = async(req, res) => {
    try{
        const { userId, fullName, tourName, totalPrice, phone, date, maxGroupSize} = req.body;

        /* validating all the fields present or not */
        if(!userId || !fullName || !tourName || !totalPrice || !phone || !date || !maxGroupSize){
            return res.status(400).json({
                success: false,
                message: "All bookong details are required"
            })
        }


        //creating new booking from the given data if pass the validation
        const newBooking = new Booking({
            userId,
            fullName,
            phone,
            date,
            totalPrice,
            tourName,
            maxGroupSize,
        })
        await newBooking.save();

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            newBooking,
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }  
}

const getBooking = async(req, res) => {
    try{
        const bookingId = req.params.id;
        const booking = await Booking.find({ userId: bookingId }).sort({ timeStamp: 1});

        if(!booking){
            return res.status(404).json({
                success: false, 
                message: "Booking Not Found"
            })
        }
        
        res.status(200).json({
            success: true,
            data: booking
        });
    } 
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


const getAllBookings = async (req, res) => {
    try{
        const bookings = await Booking.find().sort({
            updatedAt: -1
        })
        res.status(200).json({
            success: true,
            data: bookings,
            count: bookings.length
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

//delete a booking by ID

const deleteBooking = async (req, res) => {
    try{
        const bookingId = req.params.id;
        const deleteBooking = await Booking.findByIdAndDelete(bookingId);

        if(!deleteBooking){
            return res.status(404).json({
                success: false,
                message: "Booking Not Found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Booking Deleted Successfully"
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error" 
        });
    }
}

module.exports = { createBooking, getBooking, getAllBookings, deleteBooking };