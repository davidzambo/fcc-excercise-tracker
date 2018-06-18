require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_ADDRESS);

const Schema = mongoose.Schema;

const excerciseSchema = new Schema({
    user_id: {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: Date, required: true}

});

module.exports = mongoose.model('Excercise', excerciseSchema);