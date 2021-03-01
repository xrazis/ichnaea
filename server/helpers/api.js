const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    passportCheck(req, res, err, user, info, emailFlag) {
        if (err)
            return res.status(400).json({errors: err});
        if (!user)
            return res.status(400).json({errors: info});

        req.logIn(user, async () => {
            if (emailFlag) {
                await User.updateOne({_id: req.user._id}, {email: req.body.email});
                req.user.email = req.body.email;
            }

            return res.status(200).json({user: req.user});
        });
    }
};