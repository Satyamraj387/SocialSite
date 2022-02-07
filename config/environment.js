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
    session_cookie_key: process.env.SOCIALSITE_SESSION_COOKIE_KEY,
    db: 'SocialSite_development',
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