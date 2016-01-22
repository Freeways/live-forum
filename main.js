var express = require('express');
var ejs = require('ejs');
var connection = require('./db').connect;

var app = express();

app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use(express.static('public'));

app.get('/', function (req, res) {
    connection.query('SELECT topic.*, COUNT( comment.id ) as comments ' +
            'FROM  topic LEFT JOIN comment ON topic.id = comment.topic_id ' +
            'GROUP BY topic.id', function (err, rows) {
        if (!err) {
            res.render("index.html", {topics: rows});
        } else
            console.log('Error while performing Query.');
    });
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Live forum listening at http://%s:%s", host, port)
});