const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const Like = require('../models/like');

module.exports.create =async (req,res)=>{
   
       
        try {
            let post=await Post.findById(req.body.post);
          let comment=await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            
                if(comment){
                    post.comments.push(comment);
                    post.save();
                }
                comment= await comment.populate('user');
                
                // commentsMailer.newComment(comment);
               let job = queue.create('emailsSender', comment).save(function(err){
                    if(err){
                        console.log('error in creating a queue', err);
                    }
                    console.log('job enqued', job.id);
                })

                res.redirect('/');
        } catch (error) {
            console.log('error', error);
            return;
        }
    };
module.exports.destroy =async (req,res)=>{
 
        try {
            let comment= await Comment.findById(req.params.id);
            let post= await Post.findById(comment.post);
               
            if(comment.user == req.user.id || req.user.id== post.user){

                await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
                let postId= comment.post;
               await comment.remove();
               let updatedPost=await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id}});
    
                    return res.redirect('back');
            }
            else{
                return res.redirect('back');
            }
        } catch (error) {
            console.log('error here', error);
            return;
        }
};