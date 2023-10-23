// module.exports = (req, res, next) => {



//     const name = req.body.name
//     const sqlQuery = 'SELECT * FROM users WHERE name = ?';

//     connection.query(sqlQuery, [name], (error, results) => {
//         if (error) {
//             console.error('Error executing SQL query:', error);
//             connection.end(); // Close the database connection
//             return res.status(500).send({ ok: false, msg: 'Database error' });
//         }

//         // If results contain data, it means the user already exists
//         if (results.length > 0) {
//             // connection.end(); // Close the database connection
//             return res.status(400).send({ ok: false, msg: 'User already found' });
//         }

//         connection.end(); // Close the database connection
//         next();
//     })
// }
