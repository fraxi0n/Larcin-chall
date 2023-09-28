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


router.get('/genDaily', (req, res) => {
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




router.post('/daily', (req, res) => {

    const date = new Date()


    const newEntry = {

        id: Date.now() * 10 + 1,
        type: "precis",
        date: date,
        map: JSON.stringify(Map.createDailySeed())

    };

    connection.query('INSERT INTO map SET ?', newEntry, (error, results) => {
        if (error) {
            console.error('Error adding new entry:', error);
            res.status(500).json({ message: 'Error adding new entry' });
        } else {
            console.log('New entry added successfully');
            res.json({ message: 'Entry added successfully', entry: newEntry });
        }
    });
})





module.exports = router;