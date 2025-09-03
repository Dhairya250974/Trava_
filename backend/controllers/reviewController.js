const Review = require("../models/Review")
const Tour = require("../models/Tour")



/* ***************** creating new review ******************* */

const createReview = async (req, res) => {
    try{
        const { username, rating, reviewText } = req.body;
        const tourId = req.params.tourId;

        if(!rating || !tourId){
            return res.status(400).json({
                success: false,
                message: "Tour Id and ratings are required"
            })
        }

        //Find the corresponding tour
        const tour = await Tour.findById(tourId);
        if (!tour) {
            return res.status(404).json({ 
                success: false,
                message: 'Tour not found' 
            });
        }

        //agar tour mil gaya hai then we will make a new review on it
        const newReview = new Review({
            username,
            rating,
            reviewText,
            tourId
        })
        await newReview.save();

        res.status(200).json({
            success: true,
            message: "Review created Successfully",
            newReview,
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

/* ***************** Deleting review ******************* */

const deleteReview = async (req, res) => {
    try{
        const reviewId = req.params.id;

        if(!reviewId){
            return res.status(400).json({
                success: false,
                message: "Review Id is Required"
            })
        }


        const deleteReview = await Review.findByIdAndDelete(reviewId);
        if(!deleteReview){
            return res.status(404).json({
                success: false,
                message: "Review Not Found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Review Successfully Deleted",
            deleteReview
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


module.exports = { createReview, deleteReview };

