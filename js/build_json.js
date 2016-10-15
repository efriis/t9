"use strict";
/**
 * Created by efriis on 10/13/16.
 */
var fs = require('fs');
function getWords(callback) {
}
function get2grams(callback) {
    fs.readFile("../assets/w2_.txt", "utf8", function (err, data) {
        var unsorted = {};
        var data_split = data.split("\n");
        for (var s in data_split) {
            var a = s.split("\t");
            var prev = a[0];
            var word = a[1];
            var freq = parseInt(a[2]);
            if (!unsorted[prev]) {
                unsorted[prev] = [];
            }
            unsorted[prev].push({ word: word, freq: freq });
        }
        var rtn = {};
        for (var a in unsorted) {
            rtn[a] = [];
            unsorted[a].sort(function (a, b) {
                return a.freq - b.freq;
            });
            for (var _i = 0, _a = unsorted[a]; _i < _a.length; _i++) {
                var b = _a[_i];
                rtn[a].push(b.word);
            }
        }
        callback(rtn);
    });
}
get2grams(function (lib) { });
