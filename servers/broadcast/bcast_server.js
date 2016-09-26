'use strict';

const express = require('express');
const app = express();
const server = app.listen(8080);
const io = require('socket.io').listen(server);

app.get('/:username', (req, res) => {
  let userStreaming = isUserStreaming(req.params.username);

  // if user is streaming, send back a yes response
  let message = {streaming: userStreaming};
  res.status(200).send(JSON.stringify(message));
});

function isUserStreaming(username) {
  // TODO: check DB to see if this user is streaming or not
  // for now, lets default it to true
  return true;
}


const broadcasters = {}, viewers = {};

// Mark: This is where we set up the server socket
io.on('connection', (socket) => {
  socket.on('i am a broadcaster', (message) => {

    message = JSON.parse(message);
    let broadCasterName = message.broadCasterName;
    broadcasters[broadCasterName] = socket.id;
    socket.join(broadCasterName);
    console.log('broadcaster connected : ', broadCasterName, ' (id: ',socket.id,')');
  });

  socket.on('new viewer', (message) => {
    console.log('new viewer connecting...');

    message = JSON.parse(message);
    let viewerName = message.viewerName;
    let broadCasterName = message.broadCasterName;
    let broadcasterSocket = broadcasters[broadCasterName];
    socket.join(broadCasterName);
    message = { viewer: socket.id };
    socket.to(broadcasterSocket).emit('new viewer', JSON.stringify(message));
  });

  socket.on('ice', (message) => {
    console.log('`send ice request` received from ', socket.id, '...');

    message = JSON.parse(message);
    let desc = message.desc;
    let broadCasterName = message.broadCasterName
    message.peer = socket.id;
    message = JSON.stringify(message);

    // broadcast to a particular room
    io.to(broadCasterName).emit('ice', message);
  });

  socket.on('offer', (message) => {
    console.log('`send offer` request received from ', socket.id, '...');

    message = JSON.parse(message);
    let viewer = message.viewer;
    message = JSON.stringify(message);

    socket.to(viewer).emit('offer', message);
  });

  socket.on('answer', (message) => {
    console.log('`send answer` request received from ', socket.id, '...');

    message = JSON.parse(message);
    let broadCasterName = message.broadCasterName;
    message.peer = socket.id;
    message = JSON.stringify(message);

    socket.to(broadCasterName).emit('answer', message);
  });

  socket.on('close', (message) => {

    message = JSON.parse(message);
    let broadCasterName = message.broadCasterName;
    io.to(broadCasterName).emit('close');

    console.log('closing connections to ', broadCasterName, '(id: ', socket.id, ') ...');
  });

});