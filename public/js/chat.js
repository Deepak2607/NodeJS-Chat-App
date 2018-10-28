const socket= io();

var time= new Date().getTime();

socket.on('connect',()=> {
    console.log('Connected to server');
    const params= jQuery.deparam(window.location.search);
    
    socket.emit('join',params);
    
    const room= jQuery('<h4></h4>').text(`Group name: ${params.room}`);
    jQuery('.room-name').append(room);
   
    })
                                             // when server is connected..it notifies client that it    is connected to server.(inside console)
socket.on('disconnect',()=> {
    console.log('Disconnected to server');
})
                                             // when server is disconnected..it notifies client that    it is disconnected to server.(inside console)
socket.on('newMessage',(message)=> {
    console.log('newMessage', message);
   
    const span1= jQuery('<span style="font-weight:bold"></span>').text(`${message.from}: `);
    const span2= jQuery('<span></span>').text(` ${message.text}`);
    const span3= jQuery('<span style="float:right;opacity:.5"></span>').text(`${message.createdAt}`);
    const p= jQuery('<p></p>');
    p.append(span1);
    p.append(span2);
    p.append(span3);
    jQuery('.messages').append(p);
})

socket.on('newLocationMessage',(message)=>{
   
    const span1= jQuery('<span></span>').text(`${message.from}: `);
     const a= jQuery('<a target="_blank">My Location</a>').attr('href', message.url);
    const span2= jQuery('<span style="float:right"></span>').text(`${message.createdAt}`);
    const p= jQuery('<p></p>');
    p.append(span1);
    p.append(a);
    p.append(span2);
    jQuery('.messages').append(p);
})

jQuery('form').submit((e)=> {

    e.preventDefault();
    const params= jQuery.deparam(window.location.search);
    socket.emit('createMessage',{
        from:params.name,
        text:jQuery('#message').val(),
    })
    jQuery('#message').val(null);
 
})

jQuery('#send-location').on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supproted by your browser');
    }
    
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude,
        })
    },function(){
        alert('Unable to fetch location');
    },{timeout: 30000, enableHighAccuracy: true, maximumAge: 75000})
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


