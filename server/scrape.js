require("../register-babel");

var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/', function(req, res) {

  url = 'http://www.reddit.com';

  request(url, function(error, response, html) {
    if (!error) {

      var $ = cheerio.load(html);

      //get all external css
      var $css = $('link[rel=stylesheet]');
      var css = "";

      $css.each(function(i, node) {
        var cssUrl = 'http:' + node.attribs.href;

        request(cssUrl, function(err, res) {
          css += res;
        })
      })

      //get all external js
      var $content = $('script[src]');
      var js = "";

      //check extension for .js
      $content.each(function(i, node) {
        var type = node.attribs.type;

        if (type === 'text/javascript') {

          var jsUrl = 'http:' + node.attribs.src;

          //make request
          request(jsUrl, function(err, res) {
            js += res;

          })
        }

      })

    }

    // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
    res.send('Check your console!')

  });
})

app.listen('3001')
console.log('Magic happens on port 3001');
exports = module.exports = app;