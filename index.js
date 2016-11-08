// Count all of the links from the io.js build page
var jsdom = require("jsdom");

function getBusLocationInformation(_in, _out)
{
    var information = [];
    jsdom.env(
        "http://www.hakobus.jp/result.php?in=153&out=165",
        ["http://code.jquery.com/jquery.js"],
        function (err, window) {
            var trs = window.$("tr");
            for (var i = 4; i < trs.length; i++) {
                var row = {};
                row.scheduledTime = window.$(trs[i].cells[1]).text();
                row.series = window.$(trs[i].cells[2]).text();
                row.fromStopName = window.$(trs[i].cells[3]).text();
                row.toStopName = window.$(trs[i].cells[3]).text();
                row.routeURL = window.$(trs[i].cells[5]).text();
                row.isNoneStep = window.$(trs[i].cells[6]).text();
                row.actuallyTime = window.$(trs[i].cells[7]).text();
                row.scheduleURL = window.$(trs[i].cells[8]).text();
                information.push(row);
            }
        }
    );
}
