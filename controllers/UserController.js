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
    },

    show: (request, h) => {
        if (!request.query.user_id){
            return h.response({error: "User id is missing!"});
        }

        if (!ObjectId.isValid(request.query.user_id)){
            return h.response({error: "Invalid user id!"});
        }

        const query = {
            _id: new ObjectId(request.query.user_id),
            from: request.query.from || '0000-01-01',
            to: request.query.to || new Date().toISOString().slice(0,10),
            limit: request.query.limit || ''
        };

        return User.findById({_id: query._id})
            .limit(query.limit)
            .then(user => {
                user.exercise = user.exercise.filter(ex => {
                    return new Date(ex.date).getTime() > new Date(query.from).getTime()
                        && new Date(ex.date).getTime() < new Date(query.to);
                });
                return h
                    .response({
                        username: user.username,
                        count: user.exercise ? user.exercise.length : 0,
                        exercises: (user.exercise && user.exercise.length) ? user.exercise : 'No items found!'
                    })

            }).catch(err => {
                return h
                    .response({error: err.message})
            });
    }
};

module.exports = UserController;