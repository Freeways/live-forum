var express = require('express');
var xAdmin = require('express-admin');
var bodyParser = require("body-parser");
var ejs = require('ejs');
var session = require('express-session')
var passport = require('passport');
require('./config/passport').fb(passport);

var topic = require('./models/topic');
var comment = require('./models/comment');

var config = {
    dpath: './config/admin/',
    config: require('./config/admin/config.json'),
    settings: require('./config/admin/settings.json'),
    users: require('./config/admin/user.json')
};

xAdmin.init(config, function (err, admin) {
    if (err)
        return console.log(err);
    var app = express();
    app.use('/admin', admin);

    app.set('view engine', 'ejs');
    app.engine('html', ejs.renderFile);
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
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
            comment.get.commentAndUserByTopicId(req.params.id, function (comments) {
                res.render("topic.html", {topic: topic, comments: comments, user: req.user});
            });
        });
    });

    app.post('/newcomment/:id', isLoggedIn, function (req, res) {
        comment.set.comment(req.params.id, req.body.comment, req.user.facebook.id,
                function (success) {
                    console.log(success);
                    res.redirect('/topic/' + req.params.id);
                }
        );
    })

    app.post('/editcomment/:id/:topicId', isLoggedIn, isOwner, function (req, res) {
        comment.set.editComment(req.params.id, req.body.comment,
                function (success) {
                    console.log(success);
                    res.redirect('/topic/' + req.params.topicId);
                }
        );
    })

    app.get('/deletecomment/:id', isLoggedIn, isOwner, function (req, res) {
        comment.get.commentById(req.params.id, function (Comment) {
            comment.set.deleteComment(req.params.id,
                    function (success) {
                        res.redirect('/topic/' + Comment.topic_id);
                    }
            );
        })
    })

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
    function isOwner(req, res, next) {
        comment.get.commentById(req.params.id, function (comment) {
            if (comment.user_id === req.user.facebook.id)
                return next();
            res.redirect('/');
        })
    }
    var server = app.listen(8081, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log("Live forum listening at http://%s:%s", host, port);
    });
});