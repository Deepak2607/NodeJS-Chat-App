const path= require('path');
const express= require('express');
const socketIO= require('socket.io');
const http= require('http');

const app= express();                            
                                                //server side..(on cmd)
const port= process.env.PORT || 8000;
const publicPath= path.join(__dirname, '../public');

const server= http.createServer(app);
const io= socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=> {
    console.log('New user connected');
                                                // when client is connected..it notifies server that new 
                                                // user is connected.(inside cmd)
    socket.on('disconnect',()=> {
        console.log('User disconnected');
    })
                                                // when client is disconnected..it notifies server that
                                                // user is disconnected.(inside cmd)                     
//    socket.emit('newEmail',{
//        from:'admin@gmail.com',
//        text:'Welcome to chat app',
//        createdAt:123
//    })
//    
//    socket.on('createEmail',(email)=> {
//        console.log('createEmail', email)
//    })
    
    socket.emit('newMessage',{
        from:'admin@gmail.com',
        text:'Welcome to chat app',
        createdAt:123
    })
    
    socket.on('createMessage',(message)=> {
        console.log('createMessage', message)
    })
})

                                                

server.listen(port, ()=> {
    console.log(`local server is started at ${port}`);
})
