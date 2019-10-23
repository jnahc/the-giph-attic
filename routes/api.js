const express = require('express');
const router = express.Router();
const ctlr = require('../controllers');


//------------ AUTH ---------------//

router.post('/signup', ctlr.auth.createUser);
router.post('/login', ctlr.auth.createSession);
router.get('/verify', ctlr.auth.verifyAuth);
router.delete('/logout', ctlr.auth.deleteSession);

//--------------Profile-------------//
// add userId later
router.get('/profile/:userId', ctlr.auth.showProfile);


// ----------- Favorites------------ //

router.post(`/createfavorite/`, ctlr.favorite.create);
router.get(`/showfavorite/:userId`, ctlr.favorite.index);
router.delete(`/deletefavorite/:giphId`, ctlr.favorite.destroy);



module.exports = router;
