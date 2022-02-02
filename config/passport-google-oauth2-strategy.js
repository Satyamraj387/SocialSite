const passport= require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
//to generate random password for sign up uding google
const crypto = require('crypto');
const User= require('../models/user');

//tell passport to use new strategy as google log in
passport.use(new googleStrategy({
    clientID: '1087829416690-7et1u3vgat55ivl9o7lck4tgeo1hh5s5.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/users/auth/google/callback'
},
function(accesstoken, refreshToken, profile, done){

    // find the user using data recieved data grom google
    User.findOne({ email: profile.emails[0].value}).exec((err,user)=>{
        if(err){ console.log('error in google strategy passport', err); return;}

        console.log(profile);
        if(user){
            // if found set this user as req.user
            return done(null, user);
        }
        
        else{
            // not found than create this user in database and set is as req,user 
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, (err,user)=>{
                if(err){ console.log('error in sign up google strategy passport', err); return;}

                return done(null, user);
            }
            );
        }
    });
}
));

module.exports = passport;