const Post = require('../models/post');
const User = require('../models/user');


    module.exports.home= async (req, res)=>{


    // res.cookie('satyam_raj', 33);
    // Post.find({}, (err,posts)=>{
    //     return res.render('home', {
    //         title: 'Home',
    //         posts: posts
    // });


    //populate the user of each post
   try {
    let posts= await Post.find({})
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
       console.log(`error in .home ${error}`);
       return;
   }
}
