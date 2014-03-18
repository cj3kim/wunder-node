var Backbone = require('backbone');
var jQuery   = require('jquery');
var WebSocket = require('ws');

Backbone.$ = jQuery;

module.exports = Backbone.View.extend({
  initialize: function () {
    var ws = new WebSocket("ws://localhost:4000");

    ws.emit('message', "hello");

    ws.onmessage = function (event) {
      console.log("message from the server");
      console.log("The event", event);
      console.log("Event data in JSON format");
      console.log(JSON.parse(event.data));
    };

  },
});
