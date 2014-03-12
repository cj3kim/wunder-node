var Backbone = require('backbone');
var jQuery   = require('jquery');

Backbone.$ = jQuery;

module.exports = Backbone.View.extend({
  initialize: function () {
    this.name = "I am the CEO, Chris";
  },

  calmlySpeak: function () {
    console.log("What is the problem?");
  }
});
