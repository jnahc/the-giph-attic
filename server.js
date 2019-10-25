const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();


const PORT = process.env.PORT || 3000;

require('dotenv').config();


//Routes
const routes = require('./routes');


//-----------------------------MIDDLEWARE-----------------------//

//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve Public directory
app.use(express.static(__dirname + '/public'));

// session set up
app.use(session({
    secret: 'YOU SHALL NOT PASS',
    resave: false,
    saveUninitialized: false,
}));

//-----------------------------END POINTS---------------------//

//HTML routes
app.use('/', routes.views);


// API routes
app.use('/api/v1', routes.api);




//------------------------START SERVER-----------------------//
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));