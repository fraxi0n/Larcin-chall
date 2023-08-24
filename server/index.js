const express = require('express')
const cors = require('cors'); // Import the cors middleware

const Map= require('./mapGen'); 

// const Api = require('./resources/api_Mr/api.router')
const mysql = require('mysql');
const app = express();



// test = Map.gen(200)


    
    
    
    
    
    
    
    
    
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'larcin_challenges'
    });
    
    // connection.query('insert into  values(?,?)', [name, date], (error))
    
    
    connection.connect((error) => {
        if (error) {
            console.error('Error connecting to the database: ', error);
            return;
        }
        console.log('Connected to the database!');
    });
    
    app.use(cors());
    
    app.use(express.json());
    
    app.get('', (req, res) => {
        res.send();
    });

    app.get('/test', (req, res) => {
        res.send(Map.gen(10));
    });


    
    
    
    app.listen(8000, () => console.log("ecoute en cours sur 8000 ..."))