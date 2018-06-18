const Excercise = require('../models/Excercise');

const ExcerciseController = {
    index: (request, h) => {
        return h.view('index');
    },

    create: (request, h) => {
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
    },
};

module.exports = ExcerciseController;