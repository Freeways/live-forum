var express = require('express');
var ejs = require('ejs');
var mysql = require('mysql');
var app = express();

app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use(express.static('public'));

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'live-forum'
});

connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});

app.get('/', function (req, res) {
    connection.query('SELECT * from topic', function (err, rows) {
        connection.end();
        if (!err){
            res.render("index.html", {topics: rows});
        }else
            console.log('Error while performing Query.');
    });
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Live forum listening at http://%s:%s", host, port)
});