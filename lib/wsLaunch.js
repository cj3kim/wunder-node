var WebSocket = require('ws');

var ws = new WebSocket("ws://localhost:4000");
ws.onmessage = function (event) {
  console.log('message from the server');
  updateStats(JSON.parse(event.data));
};
