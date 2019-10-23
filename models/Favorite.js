const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    giphId: String, 
    url: String,  
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
