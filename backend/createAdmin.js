const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const createAdmin = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to database");

        // Find a user by email and update their role to admin
        const userEmail = "snapshooters0@gmail.com"; // Change this to your desired admin email
        
        const user = await User.findOne({ email: userEmail });
        
        if (!user) {
            console.log(`User with email ${userEmail} not found. Please register a user first.`);
            return;
        }

        // Update user role to admin
        user.role = "admin";
        await user.save();
        
        console.log(`User ${user.username} (${user.email}) is now an admin!`);
        console.log("You can now login with this account and access admin features.");
        
    } catch (error) {
        console.error("Error creating admin:", error);
    } finally {
        mongoose.connection.close();
    }
};

createAdmin();
