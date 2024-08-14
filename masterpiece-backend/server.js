const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',    // Replace with your MySQL username
    password: '',    // Replace with your MySQL password
    database: 'your_database'    // Replace with your database name
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + db.threadId);
});

// API endpoint to fetch data from your_table
app.get('/api/data', (req, res) => {
    const sql = 'SELECT * FROM your_table'; // Replace with your table name
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
