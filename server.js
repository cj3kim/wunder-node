var express         = require('express');
var app             = express();
var sass            = require('node-sass');
var path            = require('path');
var mustacheExpress = require('mustache-express');
var Primus          = require('primus');

var dynamo          = require('./lib/dynamo');
dynamo();


app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', './views');

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

var server = require('http').createServer(app);

var primus = new Primus(server, {
  //defaults
    authorization: null
  , pathname: '/primus'
  , parser: 'JSON'
  , transformer: 'sockjs'
  , plugin: {}
  , timeout: 35000
});

primus.on('connection', function (spark) {
  console.log('someone has connected');

  spark.write({message: "This is data from the server"});
});

server.listen(4000, function () {
  console.log("Listening on port %d.", server.address().port);
});

