const mongoose = require('mongoose');
const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/meme-attic';

mongoose.connect(DB_URL, {
    useNewUrlParser: true, 
    useFindAndModify: false,
    useCreateIndex: true, 
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected...'))
    .catch((error) => console.log(error));


    module.exports = {
        User: require('./User'),
        Favorite: require(`./Favorite`)
    }