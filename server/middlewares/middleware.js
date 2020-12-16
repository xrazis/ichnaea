const {validationResult} = require('express-validator');

module.exports = {
    handleErrors(route) {
        return async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.session.errors = errors.errors;
                return res.redirect('/auth/' + route);
            }
            req.session.errors = {};
            next();
        }
    },
    handleErrorsPassport(req, res, route, info) {
        req.session.errors = info;
        return res.redirect('/auth/' + route);
    },
    requireAuth(req, res, next) {
        if (!req.isAuthenticated())
            return res.redirect('/auth/login');
        next();
    }
};