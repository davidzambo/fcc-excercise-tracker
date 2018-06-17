require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_ADDRESS);

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, unique: true}
});

module.exports = mongoose.model('User', userSchema);