const socket= io();

socket.on('connect',()=> {
    console.log('Connected to server');
    })
                                             // when server is connected..it notifies client that it    is connected to server.(inside console)
socket.on('disconnect',()=> {
    console.log('Disconnected to server');
})
                                             // when server is disconnected..it notifies client that    it is disconnected to server.(inside console)
socket.on('newMessage',(message)=> {
    console.log('newMessage', message);
    
    const li= jQuery('<li></li>').text(`${message.from}:${message.text}`);
    jQuery('.messages').append(li);
})

jQuery('form').submit((e)=> {
//    alert('submitted');
    e.preventDefault();
    
    socket.emit('createMessage',{
        from:'User',
        text:jQuery('.message').val()
    })
    jQuery('.message').val(null);
 
})


//socket.emit('createMessage',{
//        from:'deepu',
//        text:'Hello'
//    })

//socket.on('newEmail',(email)=> {
//    console.log('newEmail', email);
//})
//
//socket.emit('createEmail',{
//        to:'deepak@gmail.com',
//        text:'Hello'
//    })


