const express = require('express')
const cors = require('cors');

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


// app.use('/api', require('./userRoutes')(connection));
// const apiRoutes = require('./apiRoutes');


const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/v0/', require('./apiRoutes')(connection));
app.listen(8000, () => console.log("ecoute en cours sur 8000 ..."))