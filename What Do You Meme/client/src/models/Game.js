/* GAME MODEL
 * Client side
 */
import { CurrentUser } from "./Users";
import myFetch from "./myFetch";

export let State = {};
export let MyCards = [];

//private variable of this module; will continue to live even when all its consumers are destroyed
let interval; //var. holding ref. to timer that will constantly ping server to find changes

export function Init(){ //Join
    myFetch('/game/join', {})
        .then(x=> { 
            MyCards = x;
            console.log(x);
        });
}

export function Run(){
    myFetch('/game') //returns a Promise
        //every time game gets initialized, fetch state from server
        .then(x => {
            State = x;
            console.log(x);
        })
}
export function Start(){
    interval = setInterval(Run, 2000 ) //run Run every 2 seconds
            //setInterval returns a reference to the timer which is running fxn every 2 sec
}
export function Pause(){
    clearInterval(interval); //clearInterval stops timer
} 