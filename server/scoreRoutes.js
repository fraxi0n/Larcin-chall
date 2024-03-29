const express = require('express');
const router = express.Router();

module.exports = (connection) => {

    //créer un score a 0 pour le joueur, le joueur ne pourras plus jouer apres ça
    router.post('/score', (req, res) => {
        const { PlayerID, MapID } = req.body;
        const newScore = {
            user_id: PlayerID,
            map_id: MapID,
            score: 0
        };

        const sql = 'INSERT INTO score SET ?'
        connection.query(sql, newScore, (error, results) => {
            if (error) {
                res.status(500).json({ message: 'Error adding new score' });
            } else {
                res.json({ message: 'Score added successfully', score: newScore });
            }
        });
    });

    //met a jour le score a chaque fois que le user passe un tableau 
    // + lourd en requete que le mettre a la fin de partie mais plus juste en cas de rechargement de page ou autre
    router.patch('/score', (req, res) => {
        const { MapID, PlayerID, pScore } = req.body;
        const sql = 'UPDATE score SET score = ? WHERE map_id = ? AND user_id = ?'

        connection.query(sql, [pScore, MapID, PlayerID],
            (error, results) => {
                if (error) {
                    res.status(500).json({ message: 'Error updating score' });
                } else {
                    res.json({ message: 'Score updated successfully' });
                }
            }
        );
    });

    //vérifie si un joueur a déjà joué sa partie 
    router.get('/has_score', (req, res) => {
        const { MapID, PlayerID } = req.query;
        const sql = 'SELECT * FROM score WHERE map_id = ? AND user_id = ?';

        connection.query(sql, [MapID, PlayerID], (error, results) => {
            if (error) {
                res.status(500).json({ message: 'Error retrieving scores' });
            } else {
                if (results.length === 0) {
                    res.status(200).json({ message: ' not existing, can create', scores: results })
                }
                else {
                    res.status(422).json({ message: 'already existing ', scores: results })
                }
            }
        });
    });


    // récupere tout les scores d'une map les classes et converti les ID des joueur par leur usernames
    router.get('/leaderboard', (req, res) => {
        const { MapID, PlayerID } = req.query;

        const sqlCount = 'SELECT COUNT(*) AS total_rows FROM score WHERE map_id = ?';
        const sql1 = 'SELECT * FROM score WHERE map_id = ? ORDER BY score DESC LIMIT 20';

        connection.query(sqlCount, [MapID], (error, countResults) => {
            if (error) {
                res.status(500).json({ message: 'Error retrieving scores' });
            } else {
                connection.query(sql1, [MapID], (error, results) => {
                    if (error) {
                        res.status(500).json({ message: 'Error retrieving scores' });
                    } else {


                        const sql2 = 'SELECT username FROM users WHERE id = ?';


                        const queryPromises = results.map((result) => {
                            return new Promise((resolve, reject) => {
                                connection.query(sql2, [result.user_id], (error, usernameResults) => {
                                    if (error) {
                                        reject(error);
                                    } else {
                                        const username = usernameResults[0].username;
                                        resolve({ username: username, score: result.score });
                                    }
                                });
                            });
                        });
                        Promise.all(queryPromises)
                            .then((updatedResults) => {
                                res.status(200).json({ results: updatedResults, countResults });
                            })
                            .catch((error) => {
                                res.status(500).json({ error: "An error occurred" });
                            });
                    }
                });
            }
        })
    });
    return router
}



