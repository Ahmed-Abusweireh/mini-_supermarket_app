const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express(); // Initialize Express

app.use(cors()); // Enable CORS for all routes

// Load JSON file
const productsFilePath = path.join(__dirname, 'products.json');
const rawProductsData = fs.readFileSync(productsFilePath, 'utf-8');
const productsData = JSON.parse(rawProductsData);

// Middleware for serving static files (if needed)
app.use(express.static('public')); // Replace 'public' with your static files folder

// API route to fetch products
app.get('/api/products', (req, res) => {
    // Send the products JSON data as a response
    res.json(productsData);
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000');
});
