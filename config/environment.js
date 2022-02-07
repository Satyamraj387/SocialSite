const fs= require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'SocialSite_development',
    smtp:{ 
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
       secure: false,
       auth: {
        user: 'socialsitemaiiler',
        pass: 'RPhr4XUr4O'
       }  
    },
    google_clientID: '1087829416690-7et1u3vgat55ivl9o7lck4tgeo1hh5s5.apps.googleusercontent.com',
    googgle_clientSecret: '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',
    google_callbackURL: 'http://localhost:8000/users/auth/google/callback',

    jwt_secret: 'satya',
    morgan: {
        mode: 'dev',
        options:{stream: accessLogStream} 
    }

}

const production = {
    name: 'production',
    asset_path: process.env.SOCIALSITE_ASSET_PATH,
    session_cookie_key: process.env.SOCIALSITE_SESSION_COOKIE_KEY,
    db: process.env.SOCIALSITE_DB,
    smtp:{ 
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
       secure: false,
       auth: {
        user: process.env.SOCIALSITE_GMAIL_USERNAME,
        pass: process.env.SOCIALSITE_GMAIL_PASSWORD
       }  
    },
    google_clientID: process.env.SOCIALSITE_GOOGLE_CLIENT_ID,
    googgle_clientSecret: process.env.SOCIALSITE_GOOGLE_CLIENT_SECRET,
    google_callbackURL: process.env.SOCIALSITE_GOOGLE_CALLBACK_URL,

    jwt_secret: process.env.SOCIALSITE_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options:{stream: accessLogStream} 
    }
}

module.exports = eval(process.env.NODE_ENV)== undefined ?  development : eval(process.env.SOCIALSITE_ENVIRONMENT);