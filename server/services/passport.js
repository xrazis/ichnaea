const bcrypt = require('bcrypt')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('User');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local', new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, done) => {
        User.findOne({username: username})
            .then(user => {
                if (!user) {
                    const newUser = new User({username, password});
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    return done(null, user);
                                })
                                .catch(err => {
                                    return done(null, false, {message: err});
                                });
                        });
                    });
                } else {
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, {message: 'Wrong password'});
                        }
                    });
                }
            })
            .catch(err => {
                return done(null, false, {message: err});
            });
    })
);

module.exports = passport;