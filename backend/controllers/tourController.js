const Tour = require("../models/Tour")

const getAllTours = async (req, res) => {
    const page = parseInt(req.query.page);

    try{
        const tours = await Tour.find().sort({createdAt: -1}).populate("review").skip(page*12).limit(12);

        res.status(200).json({
            success: true,
            data: tours,
            count: tours.length,
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


const getSingleTour = async (req, res) => {
    try{
        const tourId = req.params.id;
        const tour = await Tour.findById(tourId).populate("review")

        if(!tour){
            return res.status(400).json({
                success: false,
                message: "Tour not Found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Data received Successfully",
            data: tour,
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


const createTour = async (req, res) => {
    try{
        const {title, city, address, distance, desc, photo, price, maxGroupSize} = req.body;

        const newTour = new Tour({
            title,
            city,
            address,
            distance,
            desc,
            photo,
            price,
            maxGroupSize
        })

        await newTour.save();
        res.status(201).json({
            success: true,
            message: "Tour Created Successfully",
            data: newTour
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

const updateTour = async (req, res) => {
    try{
        const tourId = req.params.id;
        const {title, city, address, distance, desc, photo, price, maxGroupSize} = req.body;

        const newTour = await Tour.findByIdAndUpdate(
            tourId,
            {title, city, address, distance, desc, photo, price, maxGroupSize},
            {new: true}
        )

        if(!newTour){
            return res.status(404).json({
                success: false,
                message: "Tour Not Found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Tour Updated Successfully",
            newTour
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


const deleteTour = async (req, res) => {
    try{
        const tourId = req.params.id;
        const deleteTour = await Tour.findByIdAndDelete(tourId);

        if(!deleteTour){
            return res.status(404).json({
                success: false,
                message: "Tour Not Found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Tour Deleted Successfully"
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


const getTourBySearch = async (req, res) => {
    try {
    const searchTerm = req.query.search;
    const minPrice = parseInt(req.query.minPrice);
    const maxPrice = parseInt(req.query.maxPrice);

    if (!searchTerm && (isNaN(minPrice) || isNaN(maxPrice))) {
      return res
        .status(400)
        .json({ success: false, message: "Search and Price range is required" });
    }

    // Build the search criteria based on the provided parameters
    const searchCriteria = {};

    if (searchTerm) {
      if (typeof searchTerm !== "string") {
        return res
          .status(400)
          .json({ success: false, message: "Search term must be a string" });
      }
      searchCriteria.$or = [
        { title: { $regex: new RegExp(`${searchTerm}`, "i") } }, // Match substring in title
        { city: { $regex: new RegExp(`${searchTerm}`, "i") } }, // Match substring in city
      ];
    }

    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      searchCriteria.price = { $gte: minPrice, $lte: maxPrice };
    }

    // Perform the search
    const matchingTours = await Tour.find(searchCriteria).populate("reviews");

    if (matchingTours.length === 0) {
      return res.status(404).json({ success: false, message: "No matching tours found" });
    }

    res.status(200).json({
      success: true,
      data: matchingTours,
      count: matchingTours.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};





const getFeaturedTour = async (req, res) => {
  try {
    const featuredTours = await Tour.find({ featured: true })
      .sort({ reviews: -1 })
      .populate("reviews")
      .limit(12);

    if (featuredTours.length === 0) {
      return res.status(404).json({ success: false, message: "No featured tours found" });
    }

    res.status(200).json({
      success: true,
      data: featuredTours,
      count: featuredTours.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getTourCount = async (req, res) => {
  try {
    // Get the total count of tours
    const tourCount = await Tour.countDocuments();

    res.status(200).json({ success: true, data: tourCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getAllTours,
  getSingleTour,
  createTour,
  updateTour,
  deleteTour,
  getTourBySearch,
  getFeaturedTour,
  getTourCount,
};