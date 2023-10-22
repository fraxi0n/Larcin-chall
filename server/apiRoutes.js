const express = require('express');
const Map = require('./mapGen');
const router = express.Router();




module.exports = (connection) => {

    router.get('/test', (req, res) => {
        res.send(Map.gen(100));
    });

    router.use('/users', require('./userRoutes')(connection));
    router.use('/maps', require('./mapRoutes')(connection));
    router.use('/scores', require('./scoreRoutes')(connection));

    return router
}
