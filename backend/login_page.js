//backend login script

const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const app = express();
const port = 3000;

// Connect to MondoDB
mongoose.connect('mongodb+srv://meemee721:meemee721@cluster0.g2qfp23.mongodb.net/Cluster0?retryWrites=true&w=majority', {
	useNewUrlParser: true,
})
.then(() => {
	  console.log('Connected to MongoDB');
})
.catch((error) => {
	  console.error('Error connecting to MongoDB:', error);
});

//Middleware to parse JSON
app.use(bodyparser.json());

// User registration endpoint
app.post('/register', async (req, res) => {
	const { email, password } = req.body;
	
	// Check if the user already exists
	try {
		const existinguser = await User.findOne({ email });
		if (existinguser) {
			return res.status(400).json({ success: false, message: 'User already exist' });
	}

	// Hash the password
	const hashedpassword = await bcrypt.hash(password, 10);

	// Create a new user
	const newuser = new User({
		email,
		password: hashedpassword,
	});
	// Save the user to the database

	await newuser.save();
	res.json({ success: true, message: 'Registration successful' });
} catch (error) {
	console.error('Error:', error);
	res.status(500).json({ success: false, message: 'Registration error' });
}
});

//Login endpoint
app.post('/login', async (req, res) => {
	const { email, password } = req.body;

	// Find user by email
	try {
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
