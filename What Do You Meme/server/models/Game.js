/* GAME MODEL
 * Server side
 */
const users = require("./Users");
const CaptionsDeck = require('../models/quoteCards');

const DEAL_AMOUNT = 3;
let iCurrentCaption = 0; 

const Players = [
    { Name: 'Bernie', Score: 0, isDealer: true }
];

const MyCards = [];

const PictureDeck = [
    //add links to pictures
];

let CurrentPicture = "";
let iCurrentPicture = 0;

function FlipPicture(){
    console.log(currentPicture);
    return module.exports.currentPicture = PictureDeck[iCurrentPicture++];
}

const CardsInPlay = [];

function SubmitCaption(caption, playerId){
    const player = Players[playerId];
    if(player.isDealer){
        throw Error('Dealer is not allowed to submit a caption.')
    }
    CardsInPlay.push({
        Text: caption,
        PlayerId: playerId,
        IsChosen: false
    })
}

function Join(){ //join the game
    const user = users.Get(userId); //must find object to represent the user joining
    Players.push({Name: CurrentUser.Name, Score: 0, isDealer: false});
    
    const myCards = CaptionsDeck; [].list.slice(iCurrentCaption, iCurrentCaption + DEAL_AMOUNT);
    iCurrentCaption += DEAL_AMOUNT;           //^index of last caption 

    return { playerId: Players.length-1, myCards };
}

module.exports = {
    Players, PictureDeck, CurrentPicture, 
    CardsInPlay: CardsInPlay, 
    SubmitCaption, Join, FlipPicture
};	