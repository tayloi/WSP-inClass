export const Players = [
    { Name: 'Bernie', Score: 0, isDealer: false }
];

export const MyCards = [];

export const PictureDeck = [
    //add links to pictures
];

export const CaptionsDeck = [
    //add strings of captions
];

export let CurrentPicture = "";

export const CardsInPlay = [

];

export function Init(){
    MyCards.push(CaptionsDeck[0]);
    MyCards.push(CaptionsDeck[1]);

    CurrentPicture = PictureDeck[0];
}