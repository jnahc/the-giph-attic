const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    topic: String, 
    name: String,
    userId: String, 
    memeId: String, 
    url: String,  
});

const Favorite = mongoose.model('Favortite', favoriteSchema);

module.exports = Favorite;