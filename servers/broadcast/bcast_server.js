'use strict';

const express = require('express');
const app = express();
const server = app.listen(8080);
const io = require('socket-io').listen(server);

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
    let username = message.username;
    broadcasters[username] = socket.id;
  });

  socket.on('new viewer', (message) => {
    message = JSON.parse(message);
    let viewerName = message.viewerName;
    let broadCasterName = message.broadCasterName;
    let broadcasterSocket = broadcasters[broadCasterName];

    socket.to(broadcasterSocket).emit('new viewer', { viewer: socket.id });
  });

  socket.on('ice', (message) => {
    message = JSON.parse(message);
    let desc = message.desc;
    // TODO
  })

})