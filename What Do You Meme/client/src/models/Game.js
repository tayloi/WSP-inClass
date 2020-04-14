/* GAME MODEL
 * Client side
 */
import { CurrentUser } from "./Users";
import myFetch from "./myFetch";

export let State = {};
export const MyCards = [];

export function Init(){
    myFetch('http://localhost:3000/game') //returns a Promise
        //every time game gets initialized, fetch state from server
        .then(x => {
            State = x;	
            console.log(x);
        })
}