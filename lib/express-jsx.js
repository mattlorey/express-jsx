var reactTools = require('react-tools');
var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');

module.exports = function(root, options) {
  var dest = options && options.dest || root;

  return function(req, res, next) {
    if (!req.path.match(/\.js$/)) {
      return next();
    }
    var jsPath = path.join(dest, req.path);
    var jsxPath = path.join(root, req.path + 'x');

    function transform() {

      fs.readFile(jsxPath, 'utf8', function (err, jsx) {

        var annotationAdded = false;
        if (!jsx.match(/\/[\*\s]*\@jsx/)) {
          jsx = "/** @jsx React.DOM */\n\n" + jsx;
          annotationAdded = true;
        }

        try {
          var js = reactTools.transform(jsx)
          if (annotationAdded) {

            js = js.split("\n").slice(1).join("\n");
          }
        } catch (err) {
          return next(err);
        }

        mkdirp(path.dirname(jsPath), 511, function() {
          fs.writeFile(jsPath, js, 'utf8', next);
        });
      });
    }

    fs.stat(jsxPath, function(err, jsxStats) {
      if (err) {
        return next('ENOENT' == err.code ? null : err);
      }
      fs.stat(jsPath, function(err, jsStats) {
        if (err) {
          return 'ENOENT' == err.code ? transform() : next(err);
        }

        if (jsxStats.mtime > jsStats.mtime) {
          return transform();
        } else {
          next();
        }
      });
    });

  }
};
