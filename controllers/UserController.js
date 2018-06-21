const User = require('../models/User');

const UserController = {
    index: (request, h) => {
        return h.view('index');
    },

    create: (request, h) => {
        return User.create(request.payload)
            .then(user => {
                return h
                    .response({
                        message: "User created successfully!",
                        user
                    })
                    .type('application/json')
                    .code(201);

            }).catch(err => {
                if (err.code = 11000)
                    return h
                        .response({error: 'User already exists!'})
                        .type('application/json')
                        .code(304);
                else
                    return h
                        .response({error: err.message})
                        .type('application/json')
                        .code(500)

            });
    },

    update: (request, h) => {
        console.log(request.payload);
        return Excercise.create(request.payload)
            .then( excercise => {
                return h
                    .response({
                        message: "Excercise created successfully!",
                        excercise
                    })
                    .type('application/json')
                    .code(201);
            }).catch(err => {
                return h
                    .response({error: err})
                    .type("application/json")
                    .code(200);
            })
    }
};

module.exports = UserController;