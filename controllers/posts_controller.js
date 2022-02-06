const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');


module.exports.create =async  (req,res)=>{
   
        try {
            let post = await Post.create({
                content: req.body.content,
                user: req.user._id
            });
            // if(req.xhr){
                return res.status(200).json({
                    data: { 
                        post: post
                    },
                    message: "Post created"
                }); 
            // }
            //     return res.redirect('back');
        } catch (error) {
            console.log('error in creating a post'); 
            return;
        }
}
module.exports.destroy = async (req,res)=>{

        try {
            let post=await Post.findById(req.params.id);
        //.id and not ._id as.id is in string format
        if(post.user == req.user.id){

            await Like.deleteMany({likeable: post, onModel: "Post"});
            //mere khayal se wo yahan error kiya hai
            await Like.deleteMany({likeable: {$in: post.comments}});




            post.remove();
           await Comment.deleteMany({post: req.params.id});

           if(req.xhr){
               return res.status(200).json({
                   data: {
                       post_id: req.params.id
                   },
                   message: `post deleted`
               })
           }
                return res.redirect('back');
        }
        else {
            return res.redirect('back');
        }
        } catch (error) {
            console.log(`error in deleting post ${error}`);
            return;
        }
}