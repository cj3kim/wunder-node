var Backbone = require('backbone');
var jQuery   = require('jquery');
var Primus   = require('primus');

Backbone.$ = jQuery;

module.exports = Backbone.View.extend({
  initialize: function () {
    var url = "http://localhost:4000/primus";
    var primus = new Primus.connect(url);

    primus.on('data', function message(data) {
      console.log("Received a message from the server", data);
    });
  },
});
