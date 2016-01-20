var express = require('express');
var ejs = require('ejs');
var app = express();

app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use(express.static('public'));

app.get('/', function (req, res) {
    var serverMessage = "Hello I am JS from server main.js file";
    res.render("index.html", {message: serverMessage});
    console.log(serverMessage);
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Live forum listening at http://%s:%s", host, port)
});