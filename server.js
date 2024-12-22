// Import necessary packages
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // To handle CORS issues (if needed)

// Create an express app
const app = express();
const port = 5000; // Server port

// Enable CORS
app.use(cors());

// MySQL database connection setup
const db = mysql.createConnection({
    host: 'localhost', // Database host (usually localhost for local setups)
    user: 'root', // Your MySQL username
    password: '#MissSharma', // Your MySQL password
    database: 'JobsList' // Your database name
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Endpoint to get job listings from the database
app.get('/jobs', (req, res) => {
    const query = 'SELECT * FROM jobs';

    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching job data from the database');
            return;
        }
        res.json(results); // Send job data as JSON response
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
