'use strict';

'use strict';

const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startButton = document.getElementById('startButton');
const broadcastButton = document.getElementById('broadcastButton');
const joinButton = document.getElementById('joinButton');
const hangupButton = document.getElementById('hangupButton');
let localStream, remoteStream, socket, connections = {}, self;

startButton.disabled = false;
joinButton.disabled = false;
broadcastButton.disabled = true;
hangupButton.disabled = true;


startButton.onclick = start;
broadcastButton.onclick = broadcast;
joinButton.onclick = join;
hangupButton.onclick = hangup;

function start(){
  startButton.disabled = true;
  broadcastButton.disabled = false;
  navigator.mediaDevices.getUserMedia({
    audio: false, video: true
  })
    .then(gotStream)
    .catch(e => { console.log('getUserMedia() error: ', e) });
}

function broadcast(){
  self = 'broadcaster';

  broadcastButton.disabled = true;
  hangupButton.disabled = false;

  // init socket
  socket = io.connect('http://localhost:8080');

  socket.on('connect', () => {
    console.log('connected to socket...');
    let message = {broadCasterName: 'TEMP BROADCASTER'};
    socket.emit('i am a broadcaster', JSON.stringify(message));
  });

  socket.on('ice', (message) => {
    console.log('ice candidate received...');

    message = JSON.parse(message);
    let candidate = message.candidate;
    let peer = connections[message.peer];

    // add ice candidate to this peer
    peer.addIceCandidate(new RTCIceCandidate(candidate))
      .then(() => { 
        console.log('Successfully added ICE candidate');
      })
      .catch(e => {
        console.log('Error adding ICE candidate : ', e);
      });
  });

  socket.on('new viewer', (message) => {
    console.log('new viewer connecting. creating offer...');

    let viewer = JSON.parse(message).viewer;

    // create new RTCPeerConn
    let peer = new RTCPeerConnection();
    // add RTCPeerConn to connections obj
    connections[viewer] = peer;

    // add stream to peer obj
    peer.addStream(localStream);
    // set up onicecandidate handler
    peer.onicecandidate = (event) => {
      let message = { candidate: event.candidate, broadCasterName: 'TEMP BROADCASTER' };
      // send candidate info to server socket
      socket.emit('ice', JSON.stringify(message));
    }

    // create an offer and send back the description
    peer.createOffer({
      offerToReceiveAudio: 1, 
      offerToReceiveVideo: 1
    }).then(desc => {
      // set localDescription to this desc
      peer.setLocalDescription(desc)
        .then(() => { console.log('success setting local description for viewer')})
        .catch(e => { console.log('error setting local description for viewer : ', e)});
      socket.emit('offer', JSON.stringify({desc: desc, viewer: viewer}));
    })
      .catch(e => { console.log('error making offer : ', e)});
  });

  socket.on('answer', (message) => {
    console.log('answer received...');

    message = JSON.parse(message);
    let peer = connections[message.peer];
    // set remote desc to desc in message obj
    peer.setRemoteDescription(message.desc)
      .then(() => { console.log('success setting remote description to broadcaster')})
      .catch(e => { console.log('error setting remote description to broadcaster : ', e)});
  });

}

function join(){
  self = 'viewer';

  // init socket
  socket = io.connect('http://localhost:8080');
  socket.on('connect', () => {
    console.log('connected to socket...');
    let message = { viewerName: 'TEMP VIEWER', broadCasterName: 'TEMP BROADCASTER'};

    socket.emit('new viewer', JSON.stringify(message));
  })

  // create new RTCPeerConn
  let peer = new RTCPeerConnection();
  // set up onicecandidate handler
  peer.onicecandidate = (event) => {
    let message = { candidate: event.candidate, broadCasterName: 'TEMP BROADCASTER' };
    // send candidate info to server socket
    socket.emit('ice', JSON.stringify(message));
  }

  peer.onaddstream = (event) => {
    console.log('got a stream : ', event);
    window.remoteStream = remoteStream = remoteVideo.srcObject = event.stream;
  }

  socket.on('ice', (message) => {
    console.log('ice candidate received...');

    let candidate = JSON.parse(message).candidate;
    // add ice candidate to this peer
    peer.addIceCandidate(new RTCIceCandidate(candidate))
      .then(() => { 
        console.log('Successfully added ICE candidate');
      })
      .catch(e => {
        console.log('Error adding ICE candidate : ', e);
      });
  });

  socket.on('offer', (message) => {
    console.log('offer received. creating answer...');

    message = JSON.parse(message);
    // set remote description to desc in message obj
    peer.setRemoteDescription(message.desc)
      .then(() => { console.log('success setting remote description to broadcaster')})
      .catch(e => { console.log('error setting remote description to broadcaster : ', e)});
    // create an answer and send back description
    peer.createAnswer()
      .then(desc => {
        // set local desc to this desc
        peer.setLocalDescription(desc)
        .then(() => { console.log('success setting local description for viewer')})
        .catch(e => { console.log('error setting local desc for viewer : ', e)});
        socket.emit('answer', JSON.stringify({desc: desc, broadCasterName: 'TEMP BROADCASTER'}));
      })
      .catch(e => { console.log('error creating answer : ', e)});
  });

  socket.on('close', () => {
    console.log('closing viewer connection...');
    peer.close();
  })

}

function hangup(){
  let message = { broadCasterName: 'TEMP BROADCASTER'};
  socket.emit('close', JSON.stringify(message));
  // close all connections in connections obj
  for (let connection in connections) {
    connections[connection].close();
  }

}


function gotStream(stream) {
  window.localStream = localStream = localVideo.srcObject = stream;
}

