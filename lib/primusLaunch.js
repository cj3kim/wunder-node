var Primus          = require('primus');
module.exports = function (server) {
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
  return primus;
}
