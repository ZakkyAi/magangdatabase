const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'drawing_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const SECRET_KEY = 'your_secret_key';

// User registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// User login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    if (rows.length > 0) {
      const user = rows[0];
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'No token provided' });
  
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Unauthorized' });
    req.userId = decoded.id;
    next();
  });
};

// Save drawing
app.post('/drawings', verifyToken, async (req, res) => {
  const { name, data } = req.body;
  try {
    const [result] = await pool.execute(
      'INSERT INTO drawings (user_id, name, data) VALUES (?, ?, ?)',
      [req.userId, name, JSON.stringify(data)]
    );
    res.status(201).json({ message: 'Drawing saved successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error saving drawing' });
  }
});

// Get user's drawings
app.get('/drawings', verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, name, created_at, updated_at FROM drawings WHERE user_id = ?',
      [req.userId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving drawings' });
  }
});

// Get a specific drawing
app.get('/drawings/:id', verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM drawings WHERE id = ? AND user_id = ?',
      [req.params.id, req.userId]
    );
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Drawing not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving drawing' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});