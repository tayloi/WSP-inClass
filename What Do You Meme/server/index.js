const express = require('express');
const gameController = require('./controllers/game');

const app = express();
const port = 3000;

app
    .use(express.json())
    .use(express.urlencoded({extended: true}))
//when msg sent w/verb 'get' and '/', call this function
    .get('/', (req, res) => res.send('This class is awesome!')) // <-- lamda expression used here and below
    .use('/game', gameController);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));