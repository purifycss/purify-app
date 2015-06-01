require("../register-babel");

var path = require('path');
var app = require('koa')();
var cheerio = require('cheerio');
var fs = require('fs');
var request = require('koa-request');

app.use(function*() {

  var options = {
    url: 'http://www.reddit.com',
    headers: {
      'User-Agent': 'request'
    }
  };

  var res =
    yield request(options);

  var $ = cheerio.load(res.body);

  //get all external css
  var $css = $('link[rel=stylesheet]');
  var css = "";

  for (var i = 0; i < $css.length; i++) {
    options.url = $css[i].attribs.href;

    //append http to url if not found
    if (options.url.indexOf('http') === -1) {
      options.url = 'http:' + options.url;
    }

    //perform request
    res =
      yield request(options);

    //append to css
    css += res.body;
  }

  //get all external js
  var $js = $('script[src]');
  var js = "";

  for (var i = 0; i < $js.length; i++) {
    var type = $js[i].attribs.type;

    //check if type of source is javascript
    if (type === 'text/javascript') {

      options.url = 'http:' + $js[i].attribs.src;

      //perform request
      res =
        yield request(options);

      //append to css
      js += res.body;
    }

  }

  this.body = js;

});

app.listen(3000);