const express = require('express');
const router = express.Router();
const ctlr = require('../controllers');


//------------ AUTH ---------------//

router.post('/signup', ctlr.auth.createUser);
router.post('/login', ctlr.auth.createSession);
router.get('/verify', ctlr.auth.verifyAuth);
router.delete('/logout', ctlr.auth.deleteSession);

//--------------Profile-------------//

router.put(`/update/:userId`, ctlr.auth.updateUser);
router.get('/profile/:userId', ctlr.auth.showProfile);


// ----------- Favorites------------ //

router.post(`/create-favorite/:giphId`, ctlr.favorite.create);
router.get(`/show-favorite/:userId`, ctlr.favorite.index);
router.delete(`/delete-favorite/:giphId`, ctlr.favorite.destroy);



module.exports = router;
