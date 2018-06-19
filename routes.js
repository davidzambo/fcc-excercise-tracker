const Path = require("path");
const Joi = require("joi");
const UserController = require('./controllers/UserController');
const ExcerciseController = require('./controllers/ExcerciseController');
const Validator = require('./validator');

const routes = [
    {
        method: 'GET',
        path: '/{params*}',
        handler: {
            directory: {
                path: Path.join(__dirname, 'public')
            }
        }
    },
    {
        method: 'GET',
        path: '/',
        handler: ExcerciseController.index
    },
    {
        method: 'POST',
        path: '/api/user',
        handler: UserController.create,
        options: {
            validate: {
                payload: Validator.with('username', 'cica')
            }
        }
    },
    {
        method: 'POST',
        path: '/api/excercise',
        handler: ExcerciseController.create
    }

];

module.exports = routes;
