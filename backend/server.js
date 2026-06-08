const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data', 'database.json');

// 1. GET API - Pull items from file database
app.get('/api/products', (req, res) => {
    const fileData = fs.readFileSync(DATA_FILE, 'utf8');
    res.json(JSON.parse(fileData));
});

// 2. POST API - Inject a new item safely into the file database
app.post('/api/products', (req, res) => {
    const fileData = fs.readFileSync(DATA_FILE, 'utf8');
    const products = JSON.parse(fileData);
    
    const newProduct = {
        id: Date.now().toString(),
        name: req.body.name,
        category: req.body.category,
        price: Number(req.body.price),
        image: req.body.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80",
        desc: req.body.desc || "High-performance modular electronic hardware asset."
    };
    
    products.push(newProduct);
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`>>> TECHSPHERE ENGINE ACTIVE: http://localhost:${PORT}`));