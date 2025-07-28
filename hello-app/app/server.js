const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const app = express();
const port = 80;

// Serve static frontend files
app.use(express.static(path.join(__dirname)));

// PostgreSQL connection config from env
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
});

// Create table and insert sample data if not exists
async function setupDatabase() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS messages (
            id SERIAL PRIMARY KEY,
            text TEXT NOT NULL
        )
    `);

    const res = await pool.query('SELECT COUNT(*) FROM messages');
    if (parseInt(res.rows[0].count) === 0) {
        await pool.query(`INSERT INTO messages (text) VALUES ($1), ($2), ($3)`, [
            'Hello from PostgreSQL!',
            'Argo CD deploys this app!',
            'Enjoy GitOps!'
        ]);
    }
}

// API endpoint to fetch data
app.get('/api/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM messages');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
});

// Start server
app.listen(port, async () => {
    await setupDatabase();
    console.log(`App listening on port ${port}`);
});
