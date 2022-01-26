const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.create =async  (req,res)=>{
   
        try {
            let post =Post.create({
                content: req.body.content,
                user: req.user._id
            });
                return res.redirect('back');
        } catch (error) {
            console.log('error in creating a post'); 
            return;
        }
}
module.exports.destroy = async (req,res)=>{
   let post=await Post.findById(req.params.id);
        //.id and not ._id as.id is in string format
        try {
            let post=await Post.findById(req.params.id);
        //.id and not ._id as.id is in string format
        if(post.user == req.user.id){
            post.remove();

           await Comment.deleteMany({post: req.params.id});
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