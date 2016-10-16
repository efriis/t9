"use strict";
/**
 * Created by efriis on 10/13/16.
 */
var fs = require("fs");
var WordFinder = (function () {
    function WordFinder(callback) {
        var _this = this;
        if (callback === void 0) { callback = function () { }; }
        fs.readFile('../config.json', 'utf8', function (err, contents) {
            var data = JSON.parse(contents);
            _this.dialpad = data.dialpad;
            _this.suggestion_limit = data.suggestion_limit;
        });
        fs.readFile('../build/library.json', 'utf8', function (err, contents) {
            var data = JSON.parse(contents);
            _this.twograms = data.twograms;
            _this.words = data.words;
            callback();
        });
    }
    /**
     * Finds best possible matches to number sequence
     * @param sequence The number sequence to match a word to
     * @param prev The previous word for 2-gram matching. If blank, will just search for common single words
     */
    WordFinder.prototype.search = function (sequence, prev) {
        if (prev === void 0) { prev = ""; }
        var rtn = [];
        var haystack = this.twograms[prev];
        if (haystack) {
            for (var i = 0; i < haystack.length && rtn.length < this.suggestion_limit; i++) {
                if (this.search_match(sequence, haystack[i]))
                    rtn.push(haystack[i]);
            }
        }
        haystack = this.words;
        for (var i = 0; i < haystack.length && rtn.length < this.suggestion_limit; i++) {
            if (this.search_match(sequence, haystack[i]))
                rtn.push(haystack[i]);
        }
        if (rtn.length < this.suggestion_limit) {
            rtn.push(sequence);
        }
        return rtn;
    };
    WordFinder.prototype.search_match = function (sequence, prospective_match) {
        if (sequence.length > prospective_match.length)
            return false;
        for (var i = 0; i < sequence.length; i++) {
            if (this.dialpad[prospective_match[i]] !== sequence[i])
                return false;
        }
        return true;
    };
    return WordFinder;
}());
exports.WordFinder = WordFinder;
