const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const app = express();
const port = 80;

app.use(express.static(path.join(__dirname)));

app.get('/api/data', async (req, res) => {
    try {
        const dataPath = path.join(__dirname, 'data.json');
        const jsonData = await fs.readFile(dataPath, 'utf-8');
        const data = JSON.parse(jsonData);
        res.json(data);
    } catch (err) {
        console.error('Error reading data.json:', err);
        res.status(500).send('Error reading data');
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
