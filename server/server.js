const path= require('path');
const express= require('express');
const socketIO= require('socket.io');
const http= require('http');

const app= express();

const port= process.env.PORT || 8000;
const publicPath= path.join(__dirname, '../public');

const server= http.createServer(app);
const io= socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=> {
    console.log('New user connected');
    
    socket.on('disconnect',()=> {
        console.log('User disconnected');
    })
})




server.listen(port, ()=> {
    console.log(`local server is started at ${port}`);
})
