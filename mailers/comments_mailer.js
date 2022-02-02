const nodeMailer = require('../config/nodemailer');

//another way to module.exports
exports.newComment = (comment)=>{
    let htmlString = nodeMailer.renderTemplate({ comment: comment}, '/comments/new_comment.ejs');


    nodeMailer.transporter.sendMail({
        from: 'socialsitemaiiler@gmail.com',
        to: comment.user.email,
        subject: 'new comment ',
        html: htmlString
    }, function(err,info){
        if(err){
            console.log('error in sending mail', err); return;
        }
        console.log('mail sent', info);
        return;
    });

}