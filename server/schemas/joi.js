const {Joi} = require('celebrate');

const guid = {
    params: {
        userId: Joi.string().guid().required()
    }
};

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
        registered: Joi.string().required(),
        lastLogin: Joi.string().required(),
        __v: Joi.number().integer().required(),
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().required(),
        newPassword: Joi.string().alphanum().optional(),
    }
};

const athleteUpdateSchema = {
    body: {
        _id: Joi.string().required(),
        id: Joi.string().required(),
        socketID: Joi.string().required(),
        name: Joi.string().required(),
        __v: Joi.number().integer(),
        _trainer: Joi.string().allow('').default(''),
    }
};

module.exports = {guid, userAuthSchema, userUpdateSchema, athleteUpdateSchema}