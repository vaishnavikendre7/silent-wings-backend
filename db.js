const mysql = require('mysql2');

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',          // your MySQL username
  password: 'Vaishu123',  // your MySQL password
  database: 'silent_wings_db'
});

// Connect
db.connect((err) => {
  if (err) {
    console.log('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database!');
  }
});

module.exports = db;
