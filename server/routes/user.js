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

        if (password && newPassword) {
            bcrypt.compare(password, req.user.password, async (err, isMatch) => {
                if (err)
                    return res.status(400).json({errors: 'Current password is wrong!'});

                if (isMatch) {
                    const user = {username, email, newPassword}
                    await User.findByIdAndUpdate(req.params.id, user)
                    res.send(req.user);
                }
            });
        } else if (username || email) {
            const user = {username, email}
            await User.findByIdAndUpdate(req.params.id, user)
            res.send(req.user);
        }

    });

module.exports = router;
