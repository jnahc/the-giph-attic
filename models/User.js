const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    topic: {
        type: String,
    },
    favorite: [{
        type: Schema.Types.ObjectId,
        ref: 'Favorite',
    }],
    signupDate: {
        type: String,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;