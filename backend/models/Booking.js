const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    tourName: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    }
},
    {timestamps : true}     // document kab create hua hai and kab update hua h usko recors karega
)

module.exports = mongoose.model("Booking", bookingSchema);