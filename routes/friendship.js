const express = require('express');
 const router = express.Router();
 const passport= require('passport');

 const friendshipController = require('../controllers/friendship_controller');

 router.get('/add-friend/:id', passport.checkAuthentication, friendshipController.create);

 module.exports = router;