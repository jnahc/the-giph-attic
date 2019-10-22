const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    topic: String,
    topic2: String,
    signupDate: {
        type: String,
        default: Date.now,
    },
    //referenced
    favorite: [{
        type: Schema.Types.ObjectId,
        ref: 'Favorite',
    }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;