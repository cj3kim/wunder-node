var browserify      = require('browserify');
var b               = browserify();
var fs              = require('fs');

module.exports = function () {
  console.log("Initial JS code compilation has begun.");

  var startTime = Date.now();
  var endTime   = null;

  if (b.files.length === 0) {
    b.add("./javascripts/application.js");
  }

  var bundleFile = fs.createWriteStream("./public/application.js");
  var bundled = b.bundle();

  bundled.pipe(bundleFile);

  bundled.on('end', function () {
    bundleFile.end();
    endTime = Date.now();
    var performance = endTime - startTime;
    console.log("Application.js was compiled in %d milliseconds.", performance);
    console.log("Initial JS code compilation complete.");
  });

};

