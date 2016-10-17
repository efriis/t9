"use strict";
/**
 * Created by efriis on 10/13/16.
 */
var fs = require('fs');
function getWords(callback) {
    fs.readFile(__dirname + "/../assets/words.txt", "utf8", function (err, data) {
        if (err) {
            throw err;
        }
        var rtn = data.split("\n");
        callback(rtn);
    });
}
function get2grams(callback) {
    fs.readFile(__dirname + "/../assets/w2_.txt", "utf8", function (err, data) {
        if (err) {
            throw err;
        }
        var unsorted = {};
        var data_split = data.split("\r\n");
        for (var _i = 0, data_split_1 = data_split; _i < data_split_1.length; _i++) {
            var s = data_split_1[_i];
            var a = s.split("\t");
            var prev = a[1];
            var word = a[2];
            var freq = parseInt(a[0]);
            if (!unsorted[prev]) {
                unsorted[prev] = [];
            }
            unsorted[prev].push({ word: word, freq: freq });
        }
        var rtn = {};
        for (var a in unsorted) {
            rtn[a] = [];
            unsorted[a].sort(function (a, b) {
                return b.freq - a.freq;
            });
            for (var _a = 0, _b = unsorted[a]; _a < _b.length; _a++) {
                var b = _b[_a];
                rtn[a].push(b.word);
            }
        }
        callback(rtn);
    });
}
var write = { words: null, twograms: null };
getWords(function (words) {
    write.words = words;
    get2grams(function (twograms) {
        write.twograms = twograms;
        fs.writeFile(__dirname + "/../build/library.json", JSON.stringify(write));
    });
});
