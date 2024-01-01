// Import necessary libraries
const mongoose = require('mongoose');

// Connect to MongoDB using the URI from the environment variable
const connectToDatabase = async () => {
  try {
    await mongoose.connect(connectionURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  }
};

module.exports = connectToDatabase;
