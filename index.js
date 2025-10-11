// index.js
const express = require('express');
const db = require('./db'); // database connection
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
app.use(express.json());

// ====== TEST ROUTE ======
app.get('/', (req, res) => {
  res.send('Silent Wings Backend is running...');
});

// ====== REGISTER USER ======
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, hashedPassword], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Database error' });
      }
      res.json({ message: 'User registered successfully', userId: result.insertId });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});
// ===== LOGIN USER =====
const jwt = require('jsonwebtoken');

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(401).json({ message: 'User not found' });

    const user = results[0];
    const bcrypt = require('bcrypt');
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
});


// ====== GET ALL USERS (FOR TESTING) ======
app.get('/users', (req, res) => {
  db.query('SELECT id, name, email FROM users', (err, results) => {
    if (err) return res.status(500).send('Database error');
    res.json(results);
  });
});

// ====== START SERVER ======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
