// Count all of the links from the io.js build page
var jsdom = require("jsdom");

jsdom.env(
    "http://www.hakobus.jp/result.php?in=153&out=165",
    ["http://code.jquery.com/jquery.js"],
    function (err, window) {
        var trs = window.$("tr");
        var row = {};
        for (var i = 3; i < trs.length; i++) {
            console.log(window.$(trs[i].cells[0]).text()); // 目的地到着順
            console.log(window.$(trs[i].cells[1]).text()); // 停留所時刻
            console.log(window.$(trs[i].cells[2]).text()); // 系統
            console.log(window.$(trs[i].cells[3]).text()); // のりば
            console.log(window.$(trs[i].cells[4]).text()); // 行き先
            console.log(window.$(trs[i].cells[5]).text()); // 経路
            console.log(window.$(trs[i].cells[6]).text()); // 車両
            console.log(window.$(trs[i].cells[7]).text()); // 運行状況
            console.log(window.$(trs[i].cells[8]).text()); // 時刻表
        }
    }

);