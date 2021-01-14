const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {celebrate} = require('celebrate');

const {requireAuth} = require('../middlewares/middleware');
const User = mongoose.model('User')
const {userUpdateSchema, guid} = require('../schemas/joi');

router.put('/api/user/:id',
    requireAuth,
    celebrate(userUpdateSchema, guid),
    async (req, res) => {
        const {username, email, password, newPassword} = req.body

        bcrypt.compare(password, req.user.password, async (err, isMatch) => {
                if (err)
                    return res.status(400).json({errors: 'Password is wrong!'});
                if (isMatch) {
                    if (newPassword) {
                        await User.findByIdAndUpdate(req.params.id, {
                            username,
                            email,
                            newPassword
                        }, {new: true}, (err, user) => {
                            req.user = user;
                        });
                    } else {
                        await User.findByIdAndUpdate(req.params.id, {
                            username,
                            email
                        }, {new: true}, (err, user) => {
                            req.user = user;
                        });
                    }
                    res.send(req.user);
                }
            }
        );
    });

module.exports = router;
