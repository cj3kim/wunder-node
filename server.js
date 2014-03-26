var express         = require('express');
var app             = express();
var sass            = require('node-sass');
var path            = require('path');
var mustacheExpress = require('mustache-express');

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
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({server: server});


wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log("Received: " + message);
    });
    ws.send(JSON.stringify({foo: "bar"}));
});

server.listen(4000, function () {
  console.log("Listening on port %d.", server.address().port);
});

