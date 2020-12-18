const express = require('express');
const router = express.Router();
const passport = require('passport')

router.get('/auth/login', passport.authenticate('local', {failureRedirect: '/login'},
    (req, res) => {
        res.redirect('/');
    })
);

router.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});


module.exports = router;
