var watch           = require('watch');
var browserify      = require('browserify');
var b               = browserify();
var fs              = require('fs');
var path            = require('path');

module.exports = function () {
  watch.createMonitor('./javascripts', function (monitor) {
    monitor.on('changed', function (fileName, currentStatus, previousStatus) {
      b.add("./javascripts/application.js");
      var startTime = Date.now();
      var endTime   = null;

      var bundleFile = fs.createWriteStream("./public/application.js");
      var bundled    = b.bundle()

      bundled.pipe(bundleFile, {end: false});
      bundled.on('end', function () {
        bundleFile.end();
        endTime = Date.now();
        var performance = endTime - startTime;
        console.log("Application.js was compiled in %d milliseconds.", performance);
      });
    });
  });
}



