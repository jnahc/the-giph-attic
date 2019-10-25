const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');


//---------------AUTH Section ----------------//

// GET home
router.get('/', (req, res) => {
    res.sendFile('views/index.html', {
        root: `${__dirname}/../`
    });
});

// GET sign up
router.get('/signup', (req, res) => {
    res.sendFile('views/auth/signup.html', {
        root: `${__dirname}/../`
    });
});

// Get login
router.get('/login', (req, res) => {
    res.sendFile('views/auth/login.html', {
        root: `${__dirname}/../`
    });
});


// ---------------- PROFILE section---------//

// GET user profile
router.get('/profile/:userId', (req, res) => {
    res.sendFile('views/profile/show.html', {
        root: `${__dirname}/../`
    });
});


router.get('/profile', (req, res) => {
    res.sendFile('views/profile/show.html', {
        root: `${__dirname}/../`
    });
});



module.exports = router;