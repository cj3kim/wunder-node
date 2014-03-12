var express = require('express');
var app     = express();
var sass    = require('node-sass');
var fs      = require('fs');
var path    = require('path');


app.use(sass.middleware({
    src: path.join(".", "stylesheets")
  , dest: path.join(".", "public")
  , debug: true
}));

app.use(express.static('public'));

app.get('/', function (req, res) {
  fs.readFile('./views/index.html', function (err, data) {
    res.send(data.toString());
  });
});

var server = app.listen(4000, function () {
  console.log("Listening on port %d.", server.address().port);
});

