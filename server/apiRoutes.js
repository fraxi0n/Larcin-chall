const express = require('express');
const Map = require('./mapGen');
const router = express.Router();


// Define a sample route
router.get('/sample', (req, res) => {
    res.json({ message: 'This is a sample API route.' });
});

router.get('/test', (req, res) => {
    res.send(Map.gen(100));
});


router.get('/daily', (req, res) => {
    res.send(Map.createDailySeed());
});


module.exports = router;
