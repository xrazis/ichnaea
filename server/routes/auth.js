const express = require('express');
const passport = require('passport')
const router = express.Router();

router.get('/auth/login', passport.authenticate('local'),
    (req, res) => {
        res.redirect('/dashboard');
    }
);

router.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/auth/current_user', (req, res) => {
    res.send(req.user);
});

router.get('/auth/works', (req, res) => {
    res.send('Become powerful you have, the dark side in you I sense. Yrsssss.');
});

module.exports = router;
