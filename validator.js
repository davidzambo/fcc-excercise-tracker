const Joi = require('joi');

const schema = Joi.object().keys({
    username: Joi.string().min(3).max(100),
    // user_id: Joi.string().trim().min(3).max(24),
    // description: Joi.string().trim().min(3).max(1000),
    // duration: Joi.number(),
    // date: Joi.date()
});

module.exports = schema;