var express = require('express');
var app = express();
var fs = require('fs');

app.use(function (req, res) {
  console.log("I think middle ware");
});

app.use(function (req, res) {
  console.log("is like a stream");
});


app.get('/', function (req, res) {
  console.log("Served index.html at " + Date());
  fs.readFile('./views/index.html', function (err, data) {
    res.send(data.toString());
  });
});

app.get('/application.css', function (req, res) {
  fs.readFile('./stylesheets/application.css', function (err, data) {
    res.send(data.toString());
  });
});

app.get('/application.js', function (req, res) {
  fs.readFile('./javascripts/application.js', function (err, data) {
    res.send(data.toString());
  });
});

var server = app.listen(4000, function () {
  console.log("Listening on port %d.", server.address().port);
});

