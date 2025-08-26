/* *****yaha hum express ka import vala method use kar rhe hai ******/

// import express from "express";
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const tourRoutes = require("./routes/tourRoutes")
const reviewRoutes = require("./routes/reviewRoutes")
const bookingRoutes = require("./routes/bookingRoutes")

const cors = require("cors")



// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import cors from "cors";
// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import tourRoutes from "./routes/tourRoutes.js";
// import reviewRoutes from "./routes/reviewRoutes.js";
// import bookingRoutes from "./routes/bookingRoutes.js";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";

const app = express();

// env file se port ko nikala gaya hai
require("dotenv").config()
const PORT = process.env.PORT || 3000

/* **********database connection ******/
const dbConnect = require("./database/database")
dbConnect();


/* ********** Middle ware for CROS ---> badh m dekhte hai. ******/

// Middleware for CORS and JSON parsing


const allowedOrigins = [
  "https://trips-travel.vercel.app",
  "http://localhost:5173",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());



/* ************** Routes ****************** */
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tour", tourRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/book", bookingRoutes);




app.get('/', (req, res) => {
    res.send("Welcome to the Trips & Travels API!")
})

app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`);
})