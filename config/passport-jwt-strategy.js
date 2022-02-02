const passport= require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
// help to extraxct jwt from header
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts ={
    //it extracts the jwt token present in header ->bearer
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    //this is the key used for encription and decryption same key is able to encrypt and decrypt
    secretOrKey : 'satya'
}

passport.use(new JWTStrategy(opts, function(jwtPayload, done){
    //from token of user we are decrypting and finding the user 
    User.findById(jwtPayload._id, function(err,user){
        if(err){ console.log('Error in finding user from JWT'); return;}

        if(user){
            //done contains the user 
            return done(null, user);
        }else{
            return done(null, false);
        }
    })
}));
module.exports = passport;