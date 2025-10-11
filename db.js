// db.js
const mysql = require('mysql2');
require('dotenv').config(); // load .env variables

// Create connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.log('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database!');
  }
});

module.exports = db;
