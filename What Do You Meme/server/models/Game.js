/* GAME MODEL
 * Server side
 */
const users = require("./Users");
const CaptionsDeck = require('../models/quoteCards');

const DEAL_AMOUNT = 3;
let iCurrentCaption = 0; 

const Players = [
    { Name: 'Bernie', Score: 0, isDealer: true, userId: 2 }
];

const MyCards = [];

const PictureDeck = [
    'https://yougottobekidding.files.wordpress.com/2013/08/image001.jpg',
    'https://yougottobekidding.files.wordpress.com/2013/08/image002.jpg',
    'https://yougottobekidding.files.wordpress.com/2013/08/image003.jpg',
    'https://yougottobekidding.files.wordpress.com/2013/08/image006.jpg',
    'https://yougottobekidding.files.wordpress.com/2013/08/image017.jpg',
    'https://yougottobekidding.files.wordpress.com/2013/08/image018.jpg',
    'https://yougottobekidding.files.wordpress.com/2013/08/image022.jpg',
    'https://yougottobekidding.files.wordpress.com/2013/08/image030.jpg'
];

let CurrentPicture = "";
let iCurrentPicture = 0;

function FlipPicture(){
    //console.log(currentPicture);
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

//user can join the game and become player
function Join(userId){
    if(Players.some(x=> x.userId == userId)){
        // The player already joined the game in another browser or computer
        throw Error("You already joined this game in another browser or computer.");
    }

    const user = users.Get(userId); //must find object to represent the user joining
    Players.push({Name: user.Name, Score: 0, isDealer: false, userId});
    
    const myCards = CaptionsDeck.list.slice(iCurrentCaption, iCurrentCaption + DEAL_AMOUNT);
    iCurrentCaption += DEAL_AMOUNT;           //^index of last caption 

    return { playerId: Players.length-1, myCards };
}

//get playerId based on userId
function GetPlayerId(userId){
    return Players.findIndex(x=> x.userId == userId); //findIndex() returns index in array to which object (x) belongs 
}

module.exports = {
    Players, PictureDeck, CurrentPicture, 
    CardsInPlay: CardsInPlay, 
    SubmitCaption, Join, FlipPicture, GetPlayerId
};	