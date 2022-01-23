const express= require('express');
const cookieParser= require('cookie-parser');
const app= express();
const port= 8000;
const expressLayouts= require('express-ejs-layouts');
const db= require('./config/mongoose');
//used for session cookie
const session= require('express-session');
const passport= require('passport');
const passportLocal= require('./config/passport-local-strategy');
const MongoStore =require('connect-mongo');
// const sassMiddlewaare = require ('node-sass-middleware');

// app.use(sassMiddlewaare({
//     src: './assets/scss', 
//     dest: './assets/css',
//     debug: true,
//     outputStyle: 'extended',
//     prefix: '/css'

// }));

app.use(express.urlencoded());

app.use(cookieParser());

 app.use(express.static('./assets'));

app.use(expressLayouts);

//extract styles and script fom individual pages and put it on top and bottom of layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// //use express router
// app.use('/',   require('./routes/index.js'));

//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'socialSite',
    //change the secret before deployment 
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store: MongoStore.create(
        {
          mongoUrl: 'mongodb://localhost/codeial_development',
          autoRemove: "disabled",
        },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}) );
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/',   require('./routes/index.js'));
app.listen(port, (err)=>{
    if(err){
        console.log(`error in running the server: ${err} `);
    }
    console.log(`sever is running on port: ${port}`);
});