var jsdom = require("jsdom");
var moment = require('moment');
var stations_dict = require("./station-dict.json");


function convertActuallyTimeToMoment(str)
{
    if (str === "")
        return null;

    if (str === "*****")
        return null;

    if (str === "まもなく到着します")
        return moment().add(1, "minutes");

    re = /約(\d+)分後に到着します/;
    re.exec(str);

    return moment().add(RegExp.$1, "minutes");
}


function convertScheduledTimeToMoment(str)
{
    return moment(str, "HH:mm");
}


function getBusLocationInformation(_in, _out, callback)
{
    var information = [];
    jsdom.env(
        "http://www.hakobus.jp/result.php?in=" + _in + "&out=" + _out,
        ["http://code.jquery.com/jquery.js"],
        function (err, window) {
            var trs = window.$("tr");
            for (var i = 4; i < trs.length; i++) {
                var row = {};
                row.scheduledTime = convertScheduledTimeToMoment(window.$(trs[i].cells[1]).text());
                row.series = window.$(trs[i].cells[2]).text().trim();
                row.fromStopName = window.$(trs[i].cells[3]).text();
                row.toStopName = window.$(trs[i].cells[4]).text();
                row.routeURL = "http://www.hakobus.jp/" + window.$(trs[i].cells[5]).find("a").attr("href");
                row.isNoneStep = window.$(trs[i].cells[6]).text();
                row.actuallyTime = convertActuallyTimeToMoment(window.$(trs[i].cells[7]).text());
                row.scheduleURL = "http://www.hakobus.jp/" + window.$(trs[i].cells[8]).find("a").attr("href");
                information.push(row);
            }
            callback(err, information)
        }
    );
}

stations_data = [];

for (var key in stations_dict)
{
    if (stations_dict.hasOwnProperty(key)){
        var info = {id: key, name: stations_dict[key]};
        stations_data.push(info);
    }
}


module.exports.getBusLocationInformation = getBusLocationInformation;
module.exports.stations_data = stations_data;
