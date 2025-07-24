const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const app = express();
const port = 80;

// Serve frontend
app.use(express.static(path.join(__dirname)));

// PostgreSQL connection
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
});

// API endpoint
app.get('/api/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM your_table');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send('Database error');
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
