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
      var css = $('link[rel=stylesheet]');
      
      //check extension for .css

      //get all external js
      var content = $('script[src]');

      //check extension for .js

      fs.writeFile('html.txt', text, function(err) {
        if (err) throw err;

      })

    }


    // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
    res.send('Check your console!')

  });
})

app.listen('3001')
console.log('Magic happens on port 3001');
exports = module.exports = app;