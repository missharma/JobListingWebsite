require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // To handle CORS issues (if needed)
const path = require('path'); // To handle file paths

// Create an express app
const app = express();
const PORT = process.env.PORT || 5000; // Dynamic port for deployment or 5000 for local

// Enable CORS
app.use(cors());

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public'))); // 'public' folder is where you store CSS, JS, images

// MySQL database connection setup
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost', // Use environment variables for deployment, fallback to localhost
    user: process.env.DB_USER || 'root', // MySQL username, fallback to 'root'
    password: process.env.DB_PASSWORD || 'MissSharma', // MySQL password, fallback to 'MissSharma'
    database: process.env.DB_NAME || 'JobsList' // MySQL database name, fallback to 'JobsList'
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Root route (this will prevent the "Cannot GET /" error)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
    // Serve HTML file, make sure this file exists
});

// Endpoint to get job listings from the database
app.get('/jobs', (req, res) => {
    const query = 'SELECT * FROM jobs'; // Make sure 'jobs' table exists in your database

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching job data: ', err);
            res.status(500).send('Error fetching job data from the database');
            return;
        }
        res.json(results); // Send job data as JSON response
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
