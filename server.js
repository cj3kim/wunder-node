var express = require('express');
var app = express();
var fs = require('fs');

var randomString = "Chris-";

app.use(function (req, res, next) {
  res.random = randomString;
  console.log("1st random string: " + res.random);
  console.log("I think middle ware");
  next();
});

app.use(function (req, res, next) {
  res.random += "123"
  console.log("2nd random string: " + res.random);

  console.log("is like a stream");
  next();
});


app.use(function (req, res, next) {
  res.random += "456"
  console.log("3rd random string: " + res.random);

  console.log("that flows and flows and flows");
  next();
});


app.use(function (req, res, next) {
  res.random += "456"
  console.log("4th random string: " + res.random);

  console.log("through pipes");
  next();
});

app.get('/', function (req, res) {
  console.log("Served index.html at " + Date());
  fs.readFile('./views/index.html', function (err, data) {
    console.log("parallel?");
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

