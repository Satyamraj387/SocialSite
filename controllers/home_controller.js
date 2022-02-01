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
    let posts= await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: ({
            path: 'user'
        })
    });
    let users= await User.find({});
    return res.render('home', {
        title: ' Social site Home',
        posts: posts,
        all_users: users
    }); 
   } catch (error) {
       console.log(`error in home ${error}`);
       return;
   }
}
