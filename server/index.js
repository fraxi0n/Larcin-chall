const express = require('express')
const cors = require('cors');

const apiRoutes = require('./apiRoutes');


const app = express();



app.use(express.json());

app.use(cors());
app.use('/', apiRoutes);
app.listen(8000, () => console.log("ecoute en cours sur 8000 ..."))