/**
 * Created by efriis on 10/13/16.
 */

import {WordFinder} from "./lib";

//based on https://gist.github.com/KenanSulayman/4990953
function resetConsole() {
    process.stdout.write('\x1B[2J\x1B[0f');
}

//stdin keypress handler from http://stackoverflow.com/a/12506613
let stdin:any = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding("utf8");

let wf = new WordFinder();

let curr:string = "";
let context:string[] = [];
let suggestions:string[] = [];
let base_code = "a".charCodeAt(0);
let message = "";
stdin.on("data", (key) => {
    if(key === '\u0003') {
        // listen for [ctrl]+c to exit
        process.exit();
    } else if(key.charCodeAt(0) === 127) {
        // listen for [backspace] to delete character
        if(curr.length > 0) curr = curr.substring(0,curr.length-1);

    } else if(["0","1","2","3","4","5","6","7","8","9"].indexOf(key) !== -1) {
        // add number entries to curr (the sequence to use in search)
        curr += key;

    } else {
        // User is either selecting a suggestion or had invalid input

        // if hit enter, just select the first suggestion
        if(key === '\r') key = 'a';
        let suggestion_index = key.charCodeAt(0) - base_code;
        if(suggestion_index < suggestions.length) {
            context.push(suggestions[suggestion_index]);
            curr = "";
        } else {
            message = "Invalid key pressed (you can hit numbers, lettered suggestions, backspace, or enter if there is at least one suggestion).";
        }
    }
    resetConsole();
    suggestions = (context.length>0 || curr.length > 0)?wf.search(curr,(context.length>0)?context[context.length-1]:""):[];

    let sg;
    if(suggestions.length > 0) {
        sg = "";
        for (let i = 0; i < suggestions.length; i++) {
            let letter = String.fromCharCode(base_code + i);
            sg += `[${letter}: ${suggestions[i]}] `;
        }
    } else {
        sg = "None";
    }

    //Print interface
    console.log("Current message: "+ context.join(" "));
    console.log("Suggestions: " + sg);
    console.log(message);
    console.log(curr);

    //Reset message
    message = "";
});