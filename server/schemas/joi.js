const {Joi} = require('celebrate');

const guid = {
    params: {
        userId: Joi.string().guid().required()
    }
}

const userAuthSchema = {
    body: {
        username: Joi.string().required(),
        password: Joi.string().required(),
    }
};

const userUpdateSchema = {
        body: {
            _id: Joi.string().required(),
            username: Joi.string().required(),
            __v: Joi.number().integer(),
            email: Joi.string().email(),
            registered: Joi.string(),
            lastLogin: Joi.string(),
            password: Joi.string().alphanum().allow(''),
            newPassword: Joi.string().alphanum().allow(''),
        }
    }
;

const athleteUpdateSchema = {
    body: {
        _id: Joi.string().required(),
        id: Joi.string().required(),
        socketID: Joi.string().required(),
        name: Joi.string().required(),
        __v: Joi.number().integer(),
        _trainer: Joi.string().allow('').default(''),
    }
}

module.exports = {guid, userAuthSchema, userUpdateSchema, athleteUpdateSchema}