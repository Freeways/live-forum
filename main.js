var express = require('express');
var ejs = require('ejs');
var session = require('express-session')
var passport = require('passport');
require('./config/passport').fb(passport);

var topic = require('./models/topic');
var comment = require('./models/comment');

var app = express();

app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
app.use(session({
    secret: 'AlwaysFreeWays',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

app.get('/', function (req, res) {
    topic.get.topics(function (topics) {
        res.render("index.html", {topics: topics, user: req.user});
    });
});

app.get('/topic/:id', function (req, res) {
    topic.get.topicById(req.params.id, function (topic) {
        comment.get.commentsByTopicId(req.params.id, function (comments) {
            res.render("topic.html", {topic: topic, comments: comments, user: req.user});
        });
    });
});

app.get('/auth/facebook', passport.authenticate('facebook'), function (req, res) {
});
app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/'}), function (req, res) {
    res.redirect('/');
});
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Live forum listening at http://%s:%s", host, port);
});