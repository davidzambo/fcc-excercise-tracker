if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_ADDRESS);
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: Date, required: true}
});

const userSchema = new Schema({
    username: {type: String, unique: true},
    exercise: [exerciseSchema]
});

module.exports = mongoose.model('User', userSchema);