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

// Serve the HTML form
// router.get('/', (req, res) => {
//     res.sendFile('../game/index.html');
// });

router.post('/register', (req, res) => {

    // let newUser = JSON.parse(req.body)

    console.log(req.body)


    res.send(req.body);
});


module.exports = router;
