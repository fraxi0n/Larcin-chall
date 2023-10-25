const express = require('express');
const router = express.Router();

const Map = require('./mapGen');

module.exports = (connection) => {

    // récupération de la derniere map ajouté 
    router.get('/daily', (req, res) => {

        const query = 'SELECT * FROM map ORDER BY id DESC LIMIT 1';


        connection.query(query, (error, results) => {
            if (error) {
                res.status(500).send('Error fetching data');
            } else {
                if (results.length > 0) {
                    const mostRecentMap = results[0];
                    res.json({ ...mostRecentMap });
                } else {
                    res.status(404).send('No data found');
                }
            }
        });
    });



    // Generation de la map et insertion d'une nouvelle map
    router.post('/daily', (req, res) => {
        const date = new Date()
        const newEntry = {
            id: Date.now() * 10 + 1,
            // +1 différienciera les types de maps plus tard (1 = précis, 2= mortel, 3= rapide)
            type: "precis",
            date: date,
            map: JSON.stringify(Map.createDailySeed())
        };

        connection.query('INSERT INTO map SET ?', newEntry, (error, results) => {
            if (error) {
                res.status(500).json({ message: 'Error adding new entry' });
            } else {
                res.json({ message: 'Entry added successfully', entry: newEntry });
            }
        });
    })

    // récupération de la map avec l'id en parametre
    router.get('/map_from_id/:id', (req, res) => {
        const id = req.params.id;
        const sql = 'SELECT * FROM map WHERE id = ?';
        connection.query(sql, [id], (error, results) => {
            if (error) {
                res.status(500).send('Error fetching data');
            } else {
                if (results.length > 0) {
                    const map = results[0];
                    res.json({ ...map });
                } else {
                    res.status(404).send('No data found');
                }
            }
        });
    });

    //recupere la map du jour si l'index numMap est a 0, de la veille si l'index est a 1 etc
    router.get('/map_id_date_from_index', (req, res) => {
        const query = 'SELECT id , date FROM map ORDER BY id DESC';

        connection.query(query, (error, results) => {
            if (error) {
                res.status(500).send('Error fetching data');
            } else {
                if (results.length > 0) {
                    const numMap = req.query.numMap;

                    if (numMap < results.length) {
                        const mapSearched = results[numMap];
                        res.json(mapSearched);
                    } else {
                        res.status(400).send('Map limit reached');
                    }
                } else {

                    res.status(404).send('No data found');
                }
            }

        });
    });


    router.delete('/map/:id', (req, res) => {
        const id = req.params.id;

        const sql = 'DELETE FROM map WHERE id = ?';

        connection.query(sql, [id], (error, results) => {
            if (error) {
                res.status(500).json({ message: 'Error deleting entry' });
            } else {
                res.json({ message: 'Entry deleted successfully' });
            }
        });
    });

    return router
}

