const express = require('express')
const cors = require('cors'); // Import the cors middleware
const bodyParser = require('body-parser');

const Map = require('./mapGen');


// const Api = require('./resources/api_Mr/api.router')
const mysql = require('mysql');
const app = express();




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
app.use(bodyParser.json());

app.get('', (req, res) => {
  res.send();
});

app.get('/test', (req, res) => {
  res.send(Map.gen(100));
});

app.get('/gen_daily', (req, res) => {
  res.send(Map.createDailySeed());
});

app.get('/daily', (req, res) => {

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



// app.post('/test', (req, res) => {
//   const newEntry =  { testID  : Date.now()};

//   const  timestamp = new Date()
//   console.log(timestamp)
//   console.log()


//   connection.query('INSERT INTO test SET ?', newEntry, (error, results) => {
//     if (error) {
//       console.error('Error adding new entry:', error);
//       res.status(500).json({ message: 'Error adding new entry' });
//     } else {
//       console.log('New entry added successfully');
//       res.json({ message: 'Entry added successfully', entry: newEntry });
//     }
//   });
//  })



app.post('/daily', (req, res) => {

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


app.listen(8000, () => console.log("ecoute en cours sur 8000 ..."))