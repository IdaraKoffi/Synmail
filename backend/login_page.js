console.log('Current working directory:', process.cwd());
const connectToDatabase = require('./database');
console.log('Resolved path:', require.resolve('./database'));

// Import necessary libraries
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const cors = require('cors');

// Enable CORS for all routes
const app = express();
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const port = 3000;

// User registration endpoint
app.post('/register', async (req, res) => {
  // ... (rest of your registration endpoint code)
});

// Login endpoint
app.post('/login', async (req, res) => {
  // ... (rest of your login endpoint code)
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
