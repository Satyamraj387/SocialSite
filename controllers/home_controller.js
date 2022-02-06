const Post = require('../models/post');
const User = require('../models/user');


    module.exports.home= async (req, res)=>{


    // res.cookie('satyam_raj', 33);
    // Post.find({}, (err,posts)=>{
    //     return res.render('home', {
    //         title: 'Home',
    //         posts: posts
    // });


    //populate the user of each post means have the value of all data of user through its id
   try {
       //we populated user inside post as we want to see name same way post->comment->user
    let posts= await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        },
        populate: {
            path: 'likes'
        }
    }).populate('likes');

    let users= await User.find({}).populate('friendship');
    // .populate({
    //     path: 'friendship',
    //     populate: {
    //         path: 'to_user'
    //     },
    //     populate: {
    //     path: 'from_user'
    // }});

    return res.render('home', {
        title: ' Social site Home',
        posts: posts,
        all_users: users
    }); 
   } catch (error) {
       console.log(`error in home controller ${error}`);
       return;
   }
}
