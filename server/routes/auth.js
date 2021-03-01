const express = require('express');
const passport = require('passport')
const router = express.Router();
const {celebrate} = require('celebrate');

const {userRegSchema, userAuthSchema} = require('../schemas/joi');
const {passportCheck} = require('../helpers/api');

router.post('/auth/register',
    celebrate(userRegSchema),
    (req, res, next) => {
        passport.authenticate('local_register', {}, (err, user, info) => {
            passportCheck(req, res, err, user, info, 1);
        })(req, res, next);
    });

router.post('/auth/login',
    celebrate(userAuthSchema),
    (req, res, next) => {
        passport.authenticate('local_login', {}, (err, user, info) => {
            passportCheck(req, res, err, user, info, 0);
        })(req, res, next);
    });

router.post('/auth/logout',
    (req, res) => {
        req.logout();
        res.redirect('/');
    });

router.get('/auth/current_user',
    (req, res) => {
        if (!req.user)
            return res.status(404).json({errors: 'No current user!'})

        res.send(req.user);
    });

module.exports = router;
