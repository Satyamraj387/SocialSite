const User= require('../models/user');




module.exports.profile = (req,res)=>{
    return res.render('users',{
        title: 'users profile'
    });
}


// module.exports.profile = (req, res)=>{
//    if(req.cookies.user_id){
//        User.findById(req.cookies.user_id, (err,user)=>{
//            if(user){
//                return res.render('users', {
//                    title: 'User profile',
//                    user: user
//                });
//            }
//            return res.redirect('/users/sign-in');
//        });
//    }
//    else{
//    return res.redirect('/users/sign-in'); }
// };

module.exports.signUp = (req,res)=>{
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('users_sign_up', {
        title: 'users sign up'
    });
};
module.exports.signIn = (req,res)=>{
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('users_sign_in', 
    {
        title: 'users sign in'
    }
    );
};
module.exports.create = (req,res)=>{
    if(req.body.password!=req.body.confirm_password)
    {
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},(err,user)=>
    {
        if(err)
        { 
           console.log(`error in finding user`); return;
        }
        if(user==null){
            User.create(req.body, (err, newUser)=>
            {
            if(err)
            { console.log('error in creating user'); return;}
            console.log(`+++, ${newUser}`);
            return res.redirect('/users/sign-in');
            });
        }
       else{ console.log(`user already present ${user}`);
        return res.redirect('back');
        }}
    );
};
// module.exports.createSession = (req,res)=>{
//     User.findOne({ email: req.body.email}, (err,user)=>{
//         if(err)
//         { 
//            console.log(`error in finding user`);
//            return;
//         }
//         if(user){
//             if(user.password!=req.body.password){ 
//                 console.log(`wrong password`);
//                 return res.redirect('back');
//             }
//             res.cookie('user_id', user.id);  
//             return res.redirect('/users/profile');
//               }
//               console.log(`no user with this email`);
//               return res.redirect('back');
//     })
// };
// module.exports.signOut = (req,res)=>{
//     res.cookie('user_id', 5);
//     return res.redirect('/users/profile');
//     // res.render('users_sign_in', {
//     //     title: 'users sign in'
//     // });
// }
module.exports.createSession = (req,res)=>{
    return res.redirect('/');
}

module.exports.destroySession = (req,res)=>{
    req.logout();
   
    return res.redirect('/');
};


