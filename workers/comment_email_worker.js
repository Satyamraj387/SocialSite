const queue = require('../config/kue');
const commentMailer = require('../mailers/comments_mailer');

queue.process('emailsSender', function(job, done){
    console.log('emails worker is processing a job');
    commentMailer.newComment(job.data);

    done();
})