'use strict';

const express = require('express');
const app = express();

// Server static files
app.use(express.static(__dirname));

const server = app.listen(3000, () => { console.log('listening on 3000')});
const io = require('socket.io').listen(server);

const broadCastRoom = io.of('/broadcast');

let broadcaster = null, viewers = [];

broadCastRoom.on('connection', (socket) => {

  socket.on('ice', (message) => {
    console.log('`send ice request` received from ', socket.id, '...');

    message = JSON.parse(message);
    message.peer = socket.id;
    message = JSON.stringify(message);

    socket.broadcast.emit('ice', message);
  });

  socket.on('i am broadcaster', () => {
    console.log('broadcaster connected : ', socket.id);

    broadcaster = socket.id;
  });

  socket.on('new viewer', () => {
    console.log('new viewer connecting...');

    viewers.push(socket.id);
    socket.to(broadcaster).emit('new viewer', JSON.stringify({viewer: socket.id}));
  });


  socket.on('offer', (message) => {
    console.log('`send offer` request received from ', socket.id, '...');

    message = JSON.parse(message);
    let viewer = message.viewer;
    socket.to(viewer).emit('offer', JSON.stringify(message));
  });

  socket.on('answer', (message) => {
    console.log('`send answer` request received from ', socket.id, '...');

    message = JSON.parse(message);
    message.peer = socket.id;
    message = JSON.stringify(message);

    socket.to(broadcaster).emit('answer', message);
  });

  socket.on('close', () => {
    console.log('closing connections to ', broadcaster, '...');
    socket.broadcast.emit('close');
  });

  console.log('BROADCASTER : ', broadcaster);
  console.log('CURRENT VIEWERS : ');
  (() => { viewers.forEach(v => console.log(v))})();


});