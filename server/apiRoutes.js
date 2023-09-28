const express = require('express');
const Map = require('./mapGen');
const router = express.Router();
const mysql = require('mysql');


const hashedPWlg = '7d50bf8325fa2ce2cb63d060eac87e3cc81b8135454a12693ae6c2af1d4830dd'.length // 64 char

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
    res.send(Map.createDailySeed());
});

// Serve the HTML form
// router.get('/', (req, res) => {
//     res.sendFile('../game/index.html');
// });



router.post('/login', (req, res) => {

    // let newUser = JSON.parse(req.body)
    console.log(req.body, typeof req.body)

    const sql = 'SELECT id FROM users WHERE (email = ? OR username = ?) AND hashpassword = ?';


    // Execute the SQL query with the user information
    connection.query(sql, [req.body.email, req.body.email, req.body.password], (error, results, fields) => {
        if (error) {
            console.error('Error querying user:', error);
            res.status(400).send('Error in the query'); // Sending a 400 response with an error message
        } else {
            if (results.length > 0) {
                const userId = results[0].id; // Assuming the column name is "ID" in the database

                console.log('User found with ID:', userId);
                res.status(200).send({ userId });
            } else {
                console.log('User not found');
                res.status(404).send('User not found'); // Sending a 404 response if the user is not found
            }
        }
    })

});


router.post('/register', (req, res) => {

    // let newUser = JSON.parse(req.body)
    console.log(req.body, typeof req.body)

    const sql = 'INSERT INTO users (id, username, hashpassword, email) VALUES (?, ?, ?, ?)';
    const ID = Date.now()

    // Execute the SQL query with the user information
    connection.query(sql, [ID, req.body.name, req.body.password, req.body.email,], (error, results, fields) => {
        if (error) {
            console.error('Error inserting user:', error);
            res.status(400).send('error dans la requete '); // Sending a 403 response with a message
            // envoyer une reponse code 400
        } else {
            console.log('User inserted successfully');
            res.send({ ID, ...req.body });
        }

    })
}),





    module.exports = router;