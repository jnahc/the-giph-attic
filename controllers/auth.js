const bcrypt = require('bcryptjs');

const db = require('../models');



// POST
const createUser = (req, res) => {
    db.User.findOne({ email: req.body.email }, (error, foundUser) => {
        if (error) return res.status(500).json({
            status: 500,
            error: [{ message: 'Something went wrong, please try again...'}],
        });

        if (foundUser) return res.status(400).json({
            status: 400,
            error: [{ message: 'Invalid request, please try again...'}]
        });

        //Number of salt rounds
        bcrypt.genSalt(10, (error, salt) => {
            if (error) res.status(500).json({
                status: 500,
                error: [{ message: 'Something went wrong, please try again...'}]
            });

            bcrypt.hash(req.body.password, salt, (error, hash) => {
                if (error) return res.status(500).json({
                    status: 500,
                    error: [{ message: 'Something went wrong, please try again'}]
                });

                const newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    topic: req.body.topic,
                    topic2: req.body.topic2,
                    favorite: req.body.favorite,
                    password: hash
                };

                db.User.create(newUser, (error, createdUser) => {
                    if (error) return res.status(500).json({
                        status: 500,
                        error: [{ message: 'Something went wrong, please try again...'}]
                    });

                    res.status(201).json({
                        status: 201,
                    });
                });
            });
        });
    });
};


// POST login 
const createSession = (req, res) => {
    db.User.findOne({ email: req.body.email }, (error, foundUser) => {
        if (error) return res.status(500).json({
            status: 500,
            error: [{ message: 'Something went wrong, please try again...'}]
        });

        if (!foundUser) return res.status(400).json({
            status: 400,
            error: [{ message: 'Username or password in incorrect...'}]
        });

        bcrypt.compare(req.body.password, foundUser.password, (error, isMatch) => {
            if (error) return res.status(500).json({
                status: 500,
                error: [{ message: 'Something went wrong, please try again...'}]
            });

            if (isMatch) {
                req.session.currentUser = foundUser._id;
                return res.status(201).json({
                    status: 201,
                    data: { id: foundUser._id },
                });
            } else {
                return res.status(400).json({
                    status: 400,
                    error: [{ message: 'Username or password in incorrect' }]
                });
            };
        });
    });
};

// DELETE logout 
const deleteSession = (req, res) => {
    req.session.destroy(error => {
        if (error) return res.status(500).json({
            status: 500,
            error: [{ message: 'Something went wrong, please try again...'}]});

        res.status(200).json({
            status: 200,
            message: 'Success',
        });
    });
};

// POST verify auth
const verifyAuth = (req, res) => {
    if (!req.session.currentUser) {
        return res.status(401).json({
            status: 401,
            error: [{ message: 'Unauthorized, please login and try again...'}]
        });
    }

    res.status(200).json({
        status: 200,
        user: req.session.currentUser,
    });
};



// GET show profile
const showProfile = (req, res) => {
    db.User.findById(req.params.userId, (error, foundProfile) => {
        if (error) return res.status(500).json({
            status: 500,
            error: [{ message: 'Something went wrong, please try again'}]
        });

        res.status(200).json({
            status: 200,
            data: foundProfile,
        });
        console.log('Request session object -->', req.session);
    });
};

// UPDATE USER
const updateUser = (req, res) => {
    db.User.findByIdAndUpdate(
        req.params.userId,
        req.body, {new: true},
        (error, updatedProfile) => {
        if (error) return res.status(500).json({
            status: 500,
            error: [{ message: `Something went wrong, please try again`}]
        });
        res.status(200).json({
            status: 200,
            data: updatedProfile,
        });
      
    })
}



module.exports = {
    createUser: createUser,
    createSession: createSession,
    deleteSession: deleteSession,
    verifyAuth: verifyAuth,
    showProfile: showProfile,
    updateUser: updateUser,
};