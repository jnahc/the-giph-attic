const express = require('express');
const router = express.Router();
const ctlr = require('../controllers');


//------------ AUTH ---------------//

router.post('/signup', ctlr.auth.createUser);
router.post('/login', ctlr.auth.createSession);
router.get('/verify', ctlr.auth.verifyAuth);

//--------------Profile-------------//
// add userId later
router.get('/profile', ctlr.auth.showProfile);



module.exports = router;