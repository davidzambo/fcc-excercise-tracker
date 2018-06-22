const User = require('../models/User');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Joi = require('joi');
const Validator = require('../libs/validators');


const UserController = {
    index: (request, h) => {
        return h.view('index');
    },

    create: (request, h) => {
        const {error} = Joi.validate(request.payload, Validator.username);
        if (error){
            return h.response({error: error.message})
        }
        return User.create(request.payload)
            .then(user => {
                return h
                    .response({
                        message: "User created successfully!",
                        user: {
                            _id: user._id,
                            username: user.username
                        }
                    });
            }).catch(err => {
                if (err.code = 11000)
                    return h
                        .response({error: 'User already exists!'});
                else
                    return h
                        .response({error: err.message});

            });
    },

    update: (request, h) => {
        const {error} = Joi.validate(request.payload, Validator.exercise);

        if (!ObjectId.isValid(request.payload.user_id)){
            return h.response({error: 'Invalid user_id'});
        }

        if (error){
            return h.response({error: error.message});
        }

        return User.findOne({_id: mongoose.Types.ObjectId(request.payload.user_id)})
            .then( user => {
                if (!user){
                    return h
                        .response({
                            error: "Invalid user id"
                        })

                } else {
                    user.exercise.push(request.payload);
                    return  user.save()
                        .then( user => {
                            return h
                                .response({message: user})
                                .type("application/json")
                                .code(201);
                        })
                        .catch(err => {
                            return h
                                .response({error: err})
                                .type("application/json")
                                .code(200);
                        })
                }
            }).catch(err => {
                console.log(err);
                return h
                    .response({error: err})
                    .type("application/json")
                    .code(200);
            })
    }
};

module.exports = UserController;