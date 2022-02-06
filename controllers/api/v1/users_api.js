const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment');

module.exports.createSession = async (req,res)=>{
// first time verification of user that is sign in user and create his token
    try {
        let user = await User.findOne({email: req.body.email});
        if(!user || user.password != req.body.password){
            return res.json(422, {
                message: 'Invalid username or password'
            });
        }
        return res.json(200, {
            message: 'sign in successful keep this token safe',
            data: {
                //user is encrypted by user.toJSON
                token: jwt.sign(user.toJSON(), env.jwt_secret, {expiresIn: '10000'})
            }
        })
        
    } catch (error) {
        console.log(err);
        return res.json(500, {
            message: 'Internal server error'
        });
    }

}