//backend login script

const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const app = express();
const port = 3000;

// Connect to MondoDB
mongoose.connect('mongodb://

//Middleware to parse JSON
app.use(bodyparser.json());

// User registration endpoint
app.post('/register', async (req, res) => {
	const { email, password } = req.body;
	
	// Check if the user already exists
	const existinguser = await User.findOne({ email });
	if (existinguser) {
		return res.status(400).json({ success: false, message: 'User already exist' });
	}
	// Hash the password
	const hashedpassword = await bcrpt.hash(password, 10);

	// Create a new user
	const newuser = new User({
		email,
		password: hashedpassword,
	});
	// Save the user to the database
	res.json({ success: true, message: 'Registration successful' });
} catch (error) {
	console.error('Error:' error);
	res.status(500).json({ success: false, message: 'Registration error' });
}

//Login endpoint
app.post('/login', (req, res) => {
	const { username, password } = req.body;

	// Find user by username
	const user = users.find((user) => user.username === username);
	// Checks if the user exists and the password is correct
	if (user && user.password === password) {
		res.json({ success: true, message: 'Login successful'});
	} else {
		res.status(401).json({ success: false, message: 'Invalid username or password' });
	}
	app.post('/login', async (req, res) => {
		const { email, password } = req.body;

		// Find user by email
		const user = await User.findOne({ email });

		// Check if user exists and the password is correct
		if (user && await bcrypt.compare(password, user.password)) {
			res.json({ success: true, message: 'Login Successfull' });
	} else {
		res.status(401).json({ success: false, message: 'Invalid email or password' });
	}
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ success: false, message: 'Error during login'});
	}

});

// Start the server
app.listen(port, () => {
	console.log(`Server is listening at http://localhost:${port}`);
});
