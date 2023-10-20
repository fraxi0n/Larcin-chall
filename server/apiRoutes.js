const express = require('express');
const Map = require('./mapGen');
const router = express.Router();
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'larcin_challenges'
});

connection.connect((error) => {
    if (error) {
        console.error('Error connecting to the database: ', error);
        return;
    }
    console.log('Connected to the database!');
});


router.get('/test', (req, res) => {
    res.send(Map.gen(100));
});












router.get('/daily', (req, res) => {

    const query = 'SELECT * FROM map ORDER BY id DESC LIMIT 1';
    //ajouter le union precis


    // Execute the query using your SQL library
    connection.query(query, (error, results) => {
        if (error) {
            // Handle the error appropriately
            console.error('Error fetching data:', error);
            res.status(500).send('Error fetching data');
        } else {
            // Assuming 'results' is an array of objects containing your query results
            if (results.length > 0) {
                const mostRecentMap = results[0];
                res.json(mostRecentMap); // Send the most recent map as JSON response
            } else {
                res.status(404).send('No data found');
            }
        }
    });
});












module.exports = router;