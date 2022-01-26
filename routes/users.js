const express= require('express');
const router= express.Router();
const passport = require('passport');

const userscontroller= require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication, userscontroller.profile);
router.post('/update/:id',passport.checkAuthentication, userscontroller.update);

router.get('/sign-out',userscontroller.destroySession);
router.get('/sign-in', userscontroller.signIn);
router.get('/sign-up', userscontroller.signUp);

router.post('/create', userscontroller.create);

//manual authentication
// router.post('/create-session', userscontroller.createSession);
// router.post('/signOut', userscontroller.signOut);

//use passport as middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
) ,userscontroller.createSession);




module.exports=router;