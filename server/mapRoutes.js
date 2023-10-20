

// Generation de la map et insertien d'une nouvelle map
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
            console.error('Error adding new entry:', error);
            res.status(500).json({ message: 'Error adding new entry' });
        } else {
            res.json({ message: 'Entry added successfully', entry: newEntry });
        }
    });
})

//recupere la map du jour si l'index numMap est a 0, de la veille si l'index est a 1 etc
router.get('/mapFromIndex', (req, res) => {
    const query = 'SELECT * FROM map ORDER BY id DESC';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching data:', error);
            res.status(500).send('Error fetching data');
        } else {
            if (results.length > 0) {
                const numMap = req.query.numMap;

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


// router.get('/genDaily', (req, res) => {
//     res.send(Map.createDailySeed());
// });