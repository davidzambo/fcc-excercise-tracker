require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_ADDRESS);

const User = require('./User');

const Schema = mongoose.Schema;

const excerciseSchema = new Schema({
    user_id: {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: Date, required: true}

});

excerciseSchema.pre("save", function(next){
    const self = this;
    console.log(mongoose.Types.ObjectId.isValid(self.user_id));
    // check user_id validation
    if (!mongoose.Types.ObjectId.isValid(self.user_id)){
        next("No user found with the given id!");
    } else {
        User.findOne({_id: self.user_id}, (err, user) => {
            if (err) console.log(err);
            if (user && !user.length){
                next();
            } else {
                next("No user found with the given username!");
            }
        })
    }
});

const Excercise = mongoose.model('Excercise', excerciseSchema);

module.exports = Excercise;