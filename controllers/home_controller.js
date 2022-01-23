const Post = require('../models/post');


    module.exports.home= (req, res)=>{


    // res.cookie('satyam_raj', 33);
    // Post.find({}, (err,posts)=>{
    //     return res.render('home', {
    //         title: 'Home',
    //         posts: posts
    // });


    //populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: ({
            path: 'user'
        })
    })
    .exec(function(err,posts){
        // console.log(posts);
        return res.render('home', {
                    title: ' Social site Home',
                    posts: posts
    }); 
});
    };
