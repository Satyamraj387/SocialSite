const Friendship= require('../models/friendship');
const User = require('../models/user');



module.exports.create =async (req,res)=>{
    try {
        if(req.user.id == req.params.id){
            console.log('same user cannot send request');
        }
       
            

        else{
            let prefriends =await Friendship.findOne({
                to_user: req.params.id,
                from_user: req.user.id
            });
            if(!prefriends){
             prefriends =await Friendship.findOne({
                to_user: req.user.id,
                from_user: req.params.id
            });
        }
        
            if(!(prefriends)){
                let newFriendship = await Friendship.create({
                    to_user : req.params.id,
                    from_user: req.user.id
                });
                if(newFriendship){
                    let a = await User.findById(req.user.id);
                    a.friendship.push(newFriendship);
                    a.save();
                   let b = await User.findById(req.params.id);
                   b.friendship.push(newFriendship);
                   b.save();
    
                }
                console.log('friendship created');
            }
            else {
                console.log('users are already friends');
            }
            return res.redirect('back');
            }


           
           
    }
     catch (error) {
        console.log('error on friendship controller', error)
    }
}