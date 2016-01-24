var FacebookStrategy = require('passport-facebook').Strategy;

var config = require('./auth').fb;

var User = require('../models/user').user;
var userModel = require('../models/user');

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
        callbackURL: config.facebook.callbackURL,
        profileFields: config.facebook.profileFields
    },
    function (token, refreshToken, profile, done) {
        process.nextTick(function () {
            userModel.get.userById(profile.id, function (user) {
                if (user) {
                    var newUser = new User(
                            profile.id,
                            token,
                            user.name,
                            user.photo
                            );
                    return done(null, newUser);
                } else {
                    var newUser = new User(
                            profile.id,
                            token,
                            profile.displayName,
                            profile.photos[0].value
                            );
                    userModel.set.user(newUser.facebook, function(){
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};
