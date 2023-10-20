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


router.get('/genDaily', (req, res) => {
    res.send(Map.createDailySeed());
});


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

// router.get('/map', (req, res) => {
//     const query = 'SELECT * FROM map ORDER BY id DESC';
//     // Execute the query using your SQL library
//     connection.query(query, [numMap], (error, results) => {
//         if (error) {

//             console.error('Error fetching data:', error);
//             res.status(500).send('Error fetching data');

//             if (results.length > 0) {

//                 if (results.length > numMap) {
//                     const mapSearched = results[numMap];
//                     res.json(mapSearched);
//                 }

//                 else {
//                     res.status(404).send('map limit reached ');
//                 }


//             } else {
//                 res.status(404).send('No data found');
//             }
//         }
//     });
// });

router.get('/map', (req, res) => {
    const query = 'SELECT * FROM map ORDER BY id DESC';

    // Execute the query using your SQL library
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching data:', error);
            res.status(500).send('Error fetching data');
        } else {
            if (results.length > 0) {
                const numMap = req.query.numMap; // Assuming numMap is a query parameter

                if (numMap < results.length) {
                    const mapSearched = results[numMap];
                    res.json(mapSearched);
                } else {
                    console.log("Map limit reached")
                    res.status(400).send('Map limit reached');
                }
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


router.get('/has_score', (req, res) => {
    const { MapID, PlayerID } = req.query;
    const sql = 'SELECT * FROM score WHERE map_id = ? AND user_id = ?';

    connection.query(sql, [MapID, PlayerID], (error, results) => {
        if (error) {
            console.error('Error retrieving scores:', error);
            res.status(500).json({ message: 'Error retrieving scores' });
        } else {

            console.log(results.length)

            if (results.length === 0) {
                console.log('Scores retrieved successfully');
                res.status(200).json({ message: ' not existing, can create', scores: results })
            }
            else {
                res.status(422).json({ message: 'already existing ', scores: results })

            }
        }
    });
});


router.post('/score', (req, res) => {
    const { PlayerID, MapID } = req.body;


    const newScore = {
        user_id: PlayerID,
        map_id: MapID,
        score: 0
    };

    connection.query('INSERT INTO score SET ?', newScore, (error, results) => {
        if (error) {
            console.error('Error adding new score:', error);
            res.status(500).json({ message: 'Error adding new score' });
        } else {
            console.log('New score added successfully');
            res.json({ message: 'Score added successfully', score: newScore });
        }
    });
});

router.patch('/score', (req, res) => {
    const { MapID, PlayerID, pScore } = req.body;

    console.log(" score dans body =", pScore)

    connection.query(
        'UPDATE score SET score = ? WHERE map_id = ? AND user_id = ?',
        [pScore, MapID, PlayerID],
        (error, results) => {
            if (error) {
                console.error('Error updating score:', error);
                res.status(500).json({ message: 'Error updating score' });
            } else {


                console.log('Score updated successfully');
                res.json({ message: 'Score updated successfully' });
            }
        }
    );
});

router.get('/leaderboard', (req, res) => {

    const { MapID, PlayerID } = req.query;


    const sqlCount = 'SELECT COUNT(*) AS total_rows FROM score WHERE map_id = ?';
    const sql1 = 'SELECT * FROM score WHERE map_id = ? ORDER BY score DESC LIMIT 10';

    connection.query(sqlCount, [MapID], (error, countResults) => {
        if (error) {
            console.error('Error retrieving total row count:', error);
            res.status(500).json({ message: 'Error retrieving scores' });
        } else {

            // const totalRows = countResults[0].total_rows;




            connection.query(sql1, [MapID], (error, results) => {
                if (error) {
                    console.error('Error retrieving scores:', error);
                    res.status(500).json({ message: 'Error retrieving scores' });
                } else {

                    const sql2 = 'SELECT username FROM users WHERE id = ?';



                    const queryPromises = results.map((result) => {


                        return new Promise((resolve, reject) => {


                            connection.query(sql2, [result.user_id], (error, usernameResults) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    const username = usernameResults[0].username; // Assuming the username is in the first row of the results
                                    resolve({ username: username, score: result.score });
                                }
                            });
                        });
                    });

                    // Wait for all Promises to resolve
                    Promise.all(queryPromises)
                        .then((updatedResults) => {
                            // All queries have completed, and the results are updated
                            res.status(200).json({ results: updatedResults, countResults });
                        })
                        .catch((error) => {
                            console.error("Error fetching usernames: " + error);
                            res.status(500).json({ error: "An error occurred" });
                        });
                }
            });
        }
    })
});









module.exports = router;