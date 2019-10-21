const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;


//Routes
const routes = require('./routes');


//-----------------------------MIDDLEWARE--------------------------//

//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve Public directory
app.use(express.static(__dirname + '/public'));