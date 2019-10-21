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