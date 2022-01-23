const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/SocialSite_development');

const db= mongoose.connection;

db.on('error',console.error.bind(console, 'Error connecting to db'));

db.once('open', ()=>{
    console.log('Connected to database MOngoDB');
});

module.exports = db;