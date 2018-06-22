const Joi = require('joi');

module.exports = {
    username: Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(30).required().error(
            new Error('Username should be min 3 max 30 alphanumeric characters!')
        ),
    }),

    exercise: Joi.object().keys({
        user_id: Joi.any(),
        description: Joi.string().alphanum().min(3).max(1000).required().error(
            new Error('Description is required and should be min 3 max 1000 alphanumeric characters')
        ),
        duration: Joi.number().positive().integer().required().error(
            new Error('Duration is required and should be a positive number')
        ),
        date: Joi.date().max('now').required().error(
            new Error("Date is required and should be a past value")
        ),
    })
}