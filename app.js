const mysql = require('mysql2');  // Change from 'mysql' to 'mysql2'

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',             // Replace with your MySQL username
  password: 'MissSharma',// Replace with your MySQL password
  database: 'JobsList' // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the MySQL database.');
});
