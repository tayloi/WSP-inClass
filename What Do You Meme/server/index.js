const express = require('express');
const path = require('path');

const gameController = require('./controllers/game');
const usersController = require('./controllers/users')

const app = express();
const port = 3000;

app
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .use(express.static(__dirname + '/../client/dist'))
//when msg sent w/verb 'get' and '/', call this function
    .get('/', (req, res) => res.send('This class is awesome!')) // <-- lamda expression used here and below
    .use('/game', gameController)
    .use('/users', usersController)

    //catch all (if nothing else works)
    .use((req, res) => {
        const homePath = path.join( __dirname , '/../client/dist/index.html');
        console.log(homePath);
        res.sendFile(homePath)
    });

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));