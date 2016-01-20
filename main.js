var express = require('express');
var ejs = require('ejs');
var app = express();

app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render("index.html", {methode: 'get', page: 'homepage'});
});

app.post('/', function (req, res) {
    res.render("index.html", {methode: 'post', page: 'homepage'});
});

app.get('/user', function (req, res) {
    res.render("index.html", {methode: 'get', page: 'user'});
});

app.get('/*ow', function(req, res) {
   res.render("index.html", {methode: 'get', page: '*ow'});
});

app.get('/user/:id', function(req, res) {
   res.render("index.html", {methode: 'get', page: 'user' + req.params.id});
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Live forum listening at http://%s:%s", host, port)
});