const express = require('express');
const passport = require('passport')
const router = express.Router();

router.post('/auth/login',
    (req, res, next) => {
        passport.authenticate('local', {}, (err, user, info) => {
            if (err)
                return res.status(400).json({errors: err});
            if (!user)
                return res.status(400).json({errors: info});

            req.logIn(user, () => {
                return res.status(200).json({success: `logged in ${user.id}`});
            });
        })(req, res, next);
    }
);

router.post('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/auth/current_user', (req, res) => {
    res.send(req.user);
});

module.exports = router;
