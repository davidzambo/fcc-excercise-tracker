const Path = require("path");
const UserController = require('./controllers/UserController');
const ExcerciseController = require('./controllers/ExcerciseController');

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
        handler: UserController.create
    },
    {
        method: 'POST',
        path: '/api/excercise',
        handler: ExcerciseController.create
    }

];

module.exports = routes;
