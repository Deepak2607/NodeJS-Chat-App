function link(){
    const time= new Date().getTime();
    return `index2.html?room=${time}`;
}


module.exports= {link};