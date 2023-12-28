const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors'); // Add this line for CORS support
const User = require('./models/User');

const app = express();
const port = 3000;

// Connect to MongoDB (Replace 'mongodb://...' with your actual MongoDB connection string)
mongoose.connect('mongodb://localhost:${port}');

// Middleware to parse JSON
app.use(bodyparser.json());

// Enable CORS middleware
app.use(cors());

// User registration endpoint
app.post('/register', async (req, res) => {
    try {
        // Extract email and password from the request body
        const { email, password } = req.body;

        // Check if the user already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        res.json({ success: true, message: 'Registration successful' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Registration error' });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    try {
        // Extract email and password from the request body
        const { email, password } = req.body;

        // Find the user in the database by email
        const user = await User.findOne({ email });

        // Check if the user exists and the password is correct
        if (user && await bcrypt.compare(password, user.password)) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error during login' });
    }
});

// Start the server
app.listen(port, () => {
	console.log(`Server is listening at http://localhost:${port}`);
});
