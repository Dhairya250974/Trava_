
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")


const registerUser = async (req, res) => {
    try {
        console.log('Registration request received:', req.body);
        
        const { username, email, password, photo } = req.body;
        
        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({ 
                success: false,
                message: "Username, email, and password are required" 
            });
        }
        
        // Check if the email is already registered 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                message: "Email is already registered Go for login" 
            });
        }

        // Hash the password    encrypt karna h password ko
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create a new user in database -> save to data base
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            photo: photo || "",
            role: "user" // Set default role
        });

        console.log('Attempting to save user:', { username, email, role: newUser.role });
        
        await newUser.save();   //is code se backend m save ho chuka h
        
        console.log('User saved successfully with ID:', newUser._id);

        res.status(201).json({ 
            success: true,
            message: "User registered successfully",
            userId: newUser._id
        });
    } 
    catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ 
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        console.log('Login request received:', { email: req.body.email });
        
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found for email:', email);
            return res.status(401).json({ 
                success: false,
                message: "Invalid credentials" 
            });
        }

        console.log('User found:', { id: user._id, username: user.username, role: user.role });

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcryptjs.compare(password, user.password);    //user.password -> hashed form me hai
        if (!isPasswordValid) {
            console.log('Invalid password for user:', email);
            return res.status(401).json({ 
                success: false,
                message: "Invalid credentials" 
            });
        }

        const { password: _, role, ...rest } = user._doc;   //iska jarurat nahi h
        // Generate a JWT token
        // const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '5d' });
        const token = jwt.sign({ 
            id: user._id, 
            role: user.role 
            }, process.env.SECRET_KEY,{ expiresIn: "5d" }
        );

        console.log('JWT token generated for user:', { id: user._id, role: user.role });

        // Set the token as a cookie in the response - token passed as cookie
        res.cookie("accessToken", token, {
            httpOnly: true,
            expires: token.expiresIn,
        });

        res.status(200).json({ 
            success: true,
            message: "Login successful", 
            data: { ...rest }, 
            token, 
            role 
        });

    } 
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error" 
        });
    }
};

module.exports = { registerUser, loginUser };