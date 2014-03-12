var express         = require('express');
var app             = express();
var sass            = require('node-sass');
var path            = require('path');
var fs              = require('fs');
var mustacheExpress = require('mustache-express');
var browserify      = require('browserify');
var b = browserify();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', './views');

//TODO for development only
app.use('/application.js', function (req, res, next) {
  b.add("./javascripts/application.js");
  b.bundle().pipe(res);
});

app.use(sass.middleware({
    src: path.join(".", "stylesheets")
  , dest: path.join(".", "public")
  , debug: true
}));

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', function (err, html) {
    if (err) throw err;

    if (html) {
      res.send(html);
      console.log("index page has been rendered");
    }
  });
});

var server = app.listen(4000, function () {
  console.log("Listening on port %d.", server.address().port);
});

