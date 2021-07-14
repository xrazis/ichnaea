const bcrypt = require('bcrypt');
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

passport.use('local_register', new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, done) => {
        User.findOne({username: username})
            .then(user => {
                if (!user) {
                    const lastLogin = Date.now();
                    const registered = lastLogin;
                    const email = '';

                    const newUser = new User({username, password, registered, lastLogin, email});
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
                    return done(null, false, {message: 'Username already exists!'});
                }
            })
            .catch(err => {
                return done(null, false, {message: err});
            });
    }));


passport.use('local_login', new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, done) => {
        User.findOne({username: username})
            .then(user => {
                if (!user) {
                    return done(null, false, {message: 'User does not exist!'});
                } else {
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            const lastLogin = Date.now()
                            User.updateOne(user._id, {lastLogin: lastLogin})
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
    }));


module.exports = passport;