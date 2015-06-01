require("../register-babel");

var app = require('koa')();
var cheerio = require('cheerio');
var request = require('koa-request');
var path = require('path');

var purify = require('purify-css');

app.use(function*() {

  var options = {
    url: 'https://scotch.io/',
    headers: {
      'User-Agent': 'request'
    }
  };

  //get base html
  var res =
    yield request(options);

  var $ = cheerio.load(res.body);

  //get all external css
  var $css = $('link[rel=stylesheet]');
  var css = "";

  for (var i = 0; i < $css.length; i++) {
    options.url = $css[i].attribs.href;

    //append http to url if not found
    if (options.url.indexOf('http') === -1 && options.url.indexOf('https') === -1) {
      options.url = 'http:' + options.url;
    }

    //perform request
    var cssres =
      yield request(options);

    //append to css
    css += cssres.body;
  }

  //get all external js
  var $js = $('script[src]');
  var js = JSON.stringify(res.body); //include base html page

  for (var i = 0; i < $js.length; i++) {
    var type = $js[i].attribs.type;

    //check if type of source is javascript
    if (type === 'text/javascript') {

      options.url = 'http:' + $js[i].attribs.src;

      if (options.url.indexOf('http') === -1 && options.url.indexOf('https') === -1) {
        //perform request
        jsres =
          yield request(options);
        //append to css
        js += jsres.body;
      }

    }

  }

  //purify css
  var uncss = purify(js, css, {
    write: false,
    minify: false
  });

  var message = 'before purify: ' + css.length + ' chars long\n'+'after purify: ' + uncss.length + ' chars long\n'+'uncss is ' + Math.floor((uncss.length / css.length) * 1000) / 1000 + ' % smaller'

  console.log('before purify: ' + css.length + ' chars long');
  console.log('after purify:' + uncss.length + 'chars long');
  console.log('uncss is ' + Math.floor((uncss.length / css.length) * 1000) / 1000 + ' % smaller');

  this.body = message;

});

app.listen(3000);