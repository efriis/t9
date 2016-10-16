/**
 * Created by efriis on 10/13/16.
 */
import fs = require("fs");

export class WordFinder {
    words:string[];
    twograms:{[prev:string]:string[]};
    dialpad:{[letter:string]:string};
    suggestion_limit:Number;
    public constructor(callback:()=>void=()=>{}) {
        fs.readFile('../config.json','utf8',(err,contents)=>{
            let data = JSON.parse(contents);
            this.dialpad = data.dialpad;
            this.suggestion_limit = data.suggestion_limit;
        });
        fs.readFile('../build/library.json','utf8',(err,contents)=>{
            let data = JSON.parse(contents);
            this.twograms = data.twograms;
            this.words = data.words;
            callback();
        });
    }

    /**
     * Finds best possible matches to number sequence
     * @param sequence The number sequence to match a word to
     * @param prev The previous word for 2-gram matching. If blank, will just search for common single words
     */
    public search(sequence:string,prev:string=""):string[] {
        let rtn:string[] = [];
        let haystack:string[] = this.twograms[prev];
        if(haystack) {
            for (let i = 0; i < haystack.length && rtn.length < this.suggestion_limit; i++) {
                if(this.search_match(sequence,haystack[i])) rtn.push(haystack[i]);
            }
        }
        haystack = this.words;
        for (let i = 0; i < haystack.length && rtn.length < this.suggestion_limit; i++) {
            if(this.search_match(sequence,haystack[i])) rtn.push(haystack[i]);
        }
        if(rtn.length < this.suggestion_limit) {
            rtn.push(sequence);
        }

        return rtn;
    }
    private search_match(sequence:string,prospective_match:string) {
        if(sequence.length > prospective_match.length) return false;
        for(let i = 0; i < sequence.length; i++) {
            if(this.dialpad[prospective_match[i]] !== sequence[i]) return false;
        }
        return true;
    }
}