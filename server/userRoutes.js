const express = require('express');
const router = express.Router();

module.exports = (connection) => {

    //login, accepte email et username

    router.post('/login', (req, res) => {

        const sql = 'SELECT id FROM users WHERE (email = ? OR username = ?) AND hashpassword = ?';

        connection.query(sql, [req.body.email, req.body.email, req.body.password], (error, results, fields) => {
            if (error) {
                console.error('Error querying user:', error);
                res.status(400).send('Error in the query');
            } else {
                if (results.length > 0) {
                    const userId = results[0].id;
                    console.log('User found with ID:', userId);
                    res.status(200).send({ userId });
                } else {
                    console.log('User not found');
                    res.status(404).send('User not found');
                }
            }
        })
    });

    router.post('/admin_login', (req, res) => {
        const emailOrUsername = req.body.email;
        const password = req.body.password;


        const sql = 'SELECT * FROM users WHERE (email = ? OR username = ?) AND hashpassword = ? ';

        connection.query(sql, [emailOrUsername, emailOrUsername, password], (error, results, fields) => {
            if (error) {
                console.error('Error querying user:', error);
                res.status(400).send('Error in the query');
            } else {
                if (results.length > 0) {
                    const userId = results[0].id;
                    const userIsAdmin = results[0].admin;

                    if (userIsAdmin) {
                        console.log('User found with ID:', userId);
                        res.status(200).send("permission accorded");

                    }
                    else {
                        res.status(401).send("permission denied");
                    }

                } else {
                    console.log('User not found');
                    res.status(404).send('User not found');
                }
            }
        })
    });

    //register
    router.post('/register', (req, res) => {

        const sql = 'INSERT INTO users (id, username, hashpassword, email) VALUES (?, ?, ?, ?)';
        const ID = Date.now()

        connection.query(sql, [ID, req.body.name, req.body.password, req.body.email,], (error, results, fields) => {
            if (error) {
                console.error('Error inserting user:', error);
                res.status(400).send('error dans la requete ');
            } else {
                console.log('User inserted successfully');
                res.send({ ID, ...req.body });
            }

        })
    })
    return router
}
// module.exports = router;