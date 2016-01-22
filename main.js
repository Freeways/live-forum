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

app.get('/topic/:id', function (req, res) {
    connection.query('SELECT * FROM  topic WHERE id=' + req.params.id, function (err, topics) {
        if (!err) {
            connection.query('SELECT * FROM  comment WHERE topic_id=' + req.params.id, function (err, comments) {
                if (!err)
                    res.render("topic.html", {topic: topics[0], comments: comments});
                else
                    console.log('Error while performing Query.');
            });
        } else
            console.log('Error while performing Query.');
    });
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Live forum listening at http://%s:%s", host, port)
});