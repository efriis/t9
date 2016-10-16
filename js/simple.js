/**
 * Created by efriis on 10/16/16.
 */
"use strict";
var lib_1 = require("./lib");
var wf = new lib_1.WordFinder();
process.stdin.on("data", function (data) {
    var d = data.toString();
    var rtn = wf.search(d.substring(0, d.length - 1));
    console.log(rtn.join(" "));
});
