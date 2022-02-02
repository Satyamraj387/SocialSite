const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async (req,res)=>{


    let posts= await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: ({
            path: 'user'
        })
    });

    return res.json(200, {
        message: 'jji done',
        posts: posts
    });
}


module.exports.destroy = async (req,res)=>{

    try {
        let post=await Post.findById(req.params.id);
    //.id and not ._id as.id is in string format
    if(post.user == req.user.id){
        post.remove();
       await Comment.deleteMany({post: req.params.id});

      
            return res.json(200,{
                message: 'post and associated comments deleted successfully'
            });
    }
    else {
        return res.json(401, {
            message: 'you cant delete the post'
        });
    }
    } catch (error) {
        return res.json(500, {
            message: "internal error"
        })
    }
}