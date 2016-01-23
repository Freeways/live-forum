var FacebookStrategy = require('passport-facebook').Strategy;

var config = require('./auth').fb;

var User = require('../models/user').user;

exports.fb = function (passport) {
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
    function (token, refreshToken, profile, done) {
        process.nextTick(function () {
            var newUser = new User(
                    profile.id,
                    token,
                    profile.displayName
                    );
            return done(null, newUser);
        });
    }));
};
