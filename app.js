// Load environment variables from .env file if running locally
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Log MongoDB URI to confirm it's being read correctly
console.log('MongoDB URI:', process.env.MONGODB_URI);

// MongoDB connection URI (from environment variable)
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    ssl: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Middleware to parse JSON data
app.use(bodyParser.json());

// Serve static files from the views directory
app.use(express.static(path.join(__dirname, 'views')));

// Import blog routes
const blogRoutes = require('./routes/blogRoutes');
app.use('/api', blogRoutes);

// Basic route to serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Set up the port for Render's environment or fallback to 3000 locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
