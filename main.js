var express = require('express');
var ejs = require('ejs');
var connection = require('./db').connect;
var session = require('express-session')
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./config/auth').fb;


passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
},
function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        return done(null, profile);
    });
}
));

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

app.get('/auth/facebook',
        passport.authenticate('facebook'),
        function (req, res) {
        });
app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {failureRedirect: '/'}),
        function (req, res) {
            res.redirect('/');
        });

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Live forum listening at http://%s:%s", host, port);
});