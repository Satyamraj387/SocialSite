module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);
// here we have recieved the connection fired by the front end or user side and established the connction 
// and automatically emmited the connect event 
    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);
// here we have recieved disconnect event 
        socket.on('disconnect', function(){
            console.log('socket disconnected');
        });

        socket.on('join_room', function(data){
            console.log('joining request received', data);
            //user is entered in the chat room 
            socket.join(data.chatroom);


            //emit event to tell everyone in the room that this person joined the room in the data.chat room 
            io.in(data.chatroom).emit('user_joined', data);

            socket.on('send_message', function(data){
                io.in(data.chatroom).emit('recieve_message', data);
            });

        });
    });
}