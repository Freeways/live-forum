var express = require('express');
var app = express();

app.get('/', function (req, res) {
    var percent = Math.round(Math.random() * 100);
    res.send('Today I am ' + percent + '% willing to chat !');
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Live forum listening at http://%s:%s", host, port)
});