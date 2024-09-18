const express = require('express');
const { createServer } = require('node:http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);


app.use(express.static(path.resolve("./public")));


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected  : '+ socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected   : ' +socket.id);
      });
    socket.on('chat message',(msg) =>{
        console.log(socket.id+ '  messsage: '+msg)
        io.emit('chat message',msg);
    })
  });
  

app.get('/chat', (req, res) => {
    console.log("requesting page");
    res.sendFile(path.resolve(__dirname, 'public', 'chat.html'));
});
server.listen(3001,() =>{console.log("server started at the port 3001")});

