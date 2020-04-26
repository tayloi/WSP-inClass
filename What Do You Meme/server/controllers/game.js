/* GAME CONTROLLER
 * Server side
 */
const express = require('express');

const quoteCards = require('../models/quoteCards');
const game = require('../models/Game');

const router = express.Router();

//middleware that gives every action in router access to playerId
router.use(function(req, res, next) {
    if(req.userId != null ){ //0 is valid userId but returns false
        req.playerId = game.GetPlayerId(req.userId) //search for player with that userId; translate userId to playerId
    }
    console.log({ userId: req.userId, playerId: req.playerId })
    next();
});

router
    .get('/', (req, res) => {
        console.log(req.userId);
        res.send({
            Players: game.Players, PictureDeck: game.PictureDeck, CurrentPicture: game.CurrentPicture,
            CardsInPlay: game.CardsInPlay.map(x => ({...x, PlayerId: 'unknown'}))
        });
    })

    .post('/join', (req, res) => res.send(game.Join(req.userId)))
    .post('/flipPicture', (req, res) => res.send(game.FlipPicture())) //sends result to client

    .get('/quoteCards', (req, res) => res.send(quoteCards))
    .post('/quoteCards', (req, res) => {
        quoteCards.add(req.body.text);
        res.send(quoteCards.list[quoteCards.list.length-1]);
    })

    .post('/cardsInPlay', (req, res) => {
        game.SubmitCaption(req.body.caption, req.playerId); //playerId now being passed as header
        res.send({ success: true });
    });

module.exports = router;