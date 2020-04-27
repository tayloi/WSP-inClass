/* GAME MODEL
 * Client side
 */
import { CurrentUser } from "./Users";
import myFetch from "./myFetch";

//private variable of this module; will continue to live even when all its consumers are destroyed
let interval; //var. holding ref. to timer that will constantly ping server to find changes

export default{
    State = {},
    MyCards = [],
    Init(){ //Join or come back to game
        if(this.MyCards.length){
            // The player already joined the game. They just temporarily went to a different view.
            return;
        }
        myFetch('/game/join', {})
            .then(x=> { 
                this.MyCards = x.myCards;
                console.log(x);
            });
    },
    Run(){
        myFetch('/game') //returns a Promise
            //every time game gets initialized, fetch state from server
            .then(x => {
                this.State = x;
                console.log(x);
            })
    },
    Start(){
        interval = setInterval(() => this.Run(), 2000 ) //run Run every 2 seconds
                //setInterval returns a reference to the timer which is running fxn every 2 sec
    },
    Pause(){
        clearInterval(interval); //clearInterval stops timer
    } 
}