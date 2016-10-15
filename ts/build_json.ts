/**
 * Created by efriis on 10/13/16.
 */
import fs = require('fs');

function getWords(callback:(lib:string[])=>void) {

}
function get2grams(callback:(libsByWord:{[word:string]:string[]})=>void) {
    fs.readFile("../assets/w2_.txt", "utf8", (err, data)=> {
        let unsorted:{[word:string]:{word:string,freq:number}[]} = {};
        let data_split = data.split("\n");
        for (let s in data_split) {
            let a = s.split("\t");
            let prev = a[0];
            let word = a[1];
            let freq = parseInt(a[2]);
            if(!unsorted[prev]) {
                unsorted[prev] = []
            }
            unsorted[prev].push({word:word,freq:freq});
        }

        let rtn:{[word:string]:string[]} = {};
        for(let a in unsorted) {
            rtn[a] = [];
            unsorted[a].sort((a,b)=>{
                return a.freq - b.freq;
            });
            for(let b of unsorted[a]) {
                rtn[a].push(b.word);
            }
        }
        callback(rtn);
    });
}

get2grams((lib)=>{});