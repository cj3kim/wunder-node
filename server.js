var express = require('express');
var app = express();
var fs = require('fs');

var htmlPage = fs.createReadStream('./views/index.html');
var applicationCSS = fs.createReadStream('./stylesheets/application.css');

app.get('/', function (req, res) {
  htmlPage.pipe(res);
});

app.get('/application.css', function (req, res) {
  applicationCSS.pipe(res);
});

var server = app.listen(4000, function () {
  console.log("Listening on port %d.", server.address().port);
});

