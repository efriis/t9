/**
 * Created by efriis on 10/16/16.
 */

import {WordFinder} from "./lib";

let wf = new WordFinder();

process.stdin.on("data",(data)=>{
    let d = data.toString();
    let rtn = wf.search(d.substring(0,d.length-1));
    console.log(rtn.join(" "));
});