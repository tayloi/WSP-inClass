/* INDEX.JS
 * Server side
 */
const express = require('express');
const path = require('path');

const gameController = require('./controllers/game');
const usersController = require('./controllers/users')

const app = express();
const port = 3000;

//CORS middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//Authorization header middleware
app.use(function(req, res, next) {
    const arr = (req.headers.authorization || "").split(" "); //make sure not NULL; throw away everything before space
    if(arr.length > 1 && arr[1] != null){
        req.userId = +arr[1]; //adding our own property userId; convert to int
    }
    next();
});

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
    })
    .use( (err, req, res, next) => {
        console.error(err); //log (print) error in red
        const errorCode = err.code || 500; //way to shortcircuit in JS
        res.status(errorCode).send({ message: err.message });
    } );

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));