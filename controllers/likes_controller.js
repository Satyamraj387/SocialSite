const Posts = require('../models/post');
const Comment = require('../models/\/comment');
const Like = require('../models/like');
const Post = require('../models/post');

module.exports.toggleLike =  async function(req,res){
    try {
        //lokes/toggle/?id=abcde
        let likeable;
        let deleted = false;


        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }
        else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }
       

        //check if a like  already exists
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });
      

        //if a like already exists then delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted =  true;
        }else{
            // else make a new like

            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();
        }
        return res.redirect ('/');
        // return res.json(200, {
        //     message: 'request successfull',
        //     data: {
        //         deleted: deleted
        //     }
        // });





    } catch (error) {
        console.log('error in likes controller', error);
        return res.redirect('/');
    }
}