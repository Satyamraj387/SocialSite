const passport = require('passport');
const LocalStategy = require('passport-local').Strategy;

const User= require('../models/user');
//authentication using passport
passport.use(new LocalStategy({
    usernameField: 'email'
  },
function(email,password,done){
  //find a user and establish identity
  User.findOne({email: email}, (err,user)=>{
      if(err){ console.log(`error in fimding user --> passport`);
      return done(err);
    }

    if(!user || user.password != password){
      console.log('Invalid Username/password');
      return done(null, false);
    }
    return done(null, user);
  });
}
));


// serializing the user to decide which keey is to be kept in cookkies
passport.serializeUser((user, done)=>{
  done(null, user.id);
});
//deserialising the user from the key in the cookies
 passport.deserializeUser((id, done)=>{
   User.findById(id, (err,user)=>{
     if(err){
       console.log('Error in finding user--> passport');
       return done(err);
     }
     return done(null, user);
   });
 });

//check if the user is authenticated
 passport.checkAuthentication = function(req,res,next){
   if(req.isAuthenticated()){
     return next();
   }
   //if the user is not signed in
   return res.redirect('/users/sign-in');
 }

 passport.setAuthenticatedUser = (req,res,next)=>{
   if(req.isAuthenticated()){
     //req.user contains the curent signed in user from the session cookie and we are just sending this to the locals for the views
     res.locals.user =req.user;
   }
   next();
 }


 module.exports=passport;