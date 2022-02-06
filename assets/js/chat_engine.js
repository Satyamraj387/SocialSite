
class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox= $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        //first the request is from front end side or user side
  //io is global variable provided to us when we included cdn file for socket in homejs
  //this line says go and connect on the given port
  //here we have fired a connection which is names as connection for backend or server side
        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }

    }
  //on means detect event and emit means start event
    connectionHandler(){
        let self =this;

        // here after this line we have detected that connection is established from both side
        // as we have recieved the connect event by the server side 
        this.socket.on('connect', function(){
            console.log(`connection established using sockets`);

            //join room is the event name where i want to be connected 
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'socialSite'
            });

            self.socket.on('user_joined', function(data){
                console.log('a user joined', data);
            })
        });

        $('#send-message').click(function(){ 
            
            let msg = $('#chat-message-input').val();
            if(msg!=''){
                self.socket.emit('send_message',{
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'socialSite'
                });
            }
        });
        self.socket.on('recieve_message', function(data){
            console.log('message recieved', data.message);

            let newMessage = $('<li>');
            
            let messageType = 'other-message';
            if(data.user_email == self.userEmail){
                messageType= 'self-message';
            }
            newMessage.append($('<span>', {
                'html' : data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_email
            }));
            newMessage.addClass(messageType);
            $('#chat-messages-list').append(newMessage);

            console.log(newMessage);
        });
    }
}