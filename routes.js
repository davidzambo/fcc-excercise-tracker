const Path = require("path");
const Joi = require("joi");
const UserController = require('./controllers/UserController');

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
        handler: UserController.index
    },
    {
        method: 'POST',
        path: '/api/user',
        handler: UserController.create,
    },
    {
        method: 'POST',
        path: '/api/exercise',
        handler: UserController.update,
    }

];

module.exports = routes;
