const path= require('path');
const express= require('express');
const socketIO= require('socket.io');
const http= require('http');
const moment= require ('moment');


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
    let time= new Date();                                           // user is connected.(inside cmd)         
    socket.emit('newMessage',{
        from:'Admin',
        text:'Welcome to chat app',
        createdAt:moment(time).format('h:mm:ss a')
    })
    
    socket.broadcast.emit('newMessage',{
        from:'Admin',
        text:'A new user joined group',
        createdAt:moment(time).format('h:mm:ss a')
    })
    
    socket.on('createMessage',(message)=> {
        let time= new Date();
        console.log('createMessage', message);
        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt:moment(time).format('h:mm:ss a')
        })
            
//        socket.broadcast.emit('newMessage',{
//            from:message.from,
//            text:message.text,
//            createdAt:new Date().getTime()
//        })
        
    })
    
     socket.on('createLocationMessage',(message)=>{
       let time= new Date();
        io.emit('newLocationMessage',{
            from:'Admin',
            url:`https://www.google.com/maps?q=${message.latitude},${message.longitude}`,
            createdAt:moment(time).format('h:mm:ss a')
            
        })
    })
    
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
    
})

                                                

server.listen(port, ()=> {
    console.log(`local server is started at ${port}`);
})
