const User = require('../models/Users');

const UserController = {
    create: (req, res) => {
        const user = new User(req.payload);
        user.save();
        return user;
    }
};

module.exports = UserController;