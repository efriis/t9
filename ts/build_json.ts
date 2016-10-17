/**
 * Created by efriis on 10/13/16.
 */
import fs = require('fs');

function getWords(callback:(lib:string[])=>void) {
    fs.readFile(__dirname+"/../assets/words.txt", "utf8", (err,data) => {
        if(err) {
            throw err;
        }
        let rtn:string[] = data.split("\n");
        callback(rtn);
    })
}
function get2grams(callback:(libsByWord:{[word:string]:string[]})=>void) {
    fs.readFile(__dirname+"/../assets/w2_.txt", "utf8", (err, data) => {
        if(err) {
            throw err;
        }
        let unsorted:{[word:string]:{word:string,freq:number}[]} = {};
        let data_split = data.split("\r\n");
        for (let s of data_split) {
            let a = s.split("\t");
            let prev = a[1];
            let word = a[2];
            let freq = parseInt(a[0]);
            if(!unsorted[prev]) {
                unsorted[prev] = []
            }
            unsorted[prev].push({word:word,freq:freq});
        }

        let rtn:{[word:string]:string[]} = {};
        for(let a in unsorted) {
            rtn[a] = [];
            unsorted[a].sort((a,b)=>{
                return b.freq - a.freq;
            });
            for(let b of unsorted[a]) {
                rtn[a].push(b.word);
            }
        }
        callback(rtn);
    });
}

let write = {words:null,twograms:null};
getWords((words) => {
    write.words = words;
    get2grams((twograms) => {
        write.twograms = twograms;
        fs.writeFile(__dirname+"/../build/library.json",JSON.stringify(write));
    });
});
