var express = require('express');
var app = express();
var fs = require('fs');

app.use(express.static('public'));

app.get('/', function (req, res) {
  fs.readFile('./views/index.html', function (err, data) {
    res.send(data.toString());
  });
});

var server = app.listen(4000, function () {
  console.log("Listening on port %d.", server.address().port);
});

