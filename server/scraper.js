require("../register-babel");

var app = require('koa')();
var cheerio = require('cheerio');
var request = require('koa-request');
var path = require('path');

var purify = require('purify-css');

app.use(function*() {

  var options = {
    url: 'http://www.reddit.com/r/minimalism',
    headers: {
      'User-Agent': 'request'
    }
  };

  //get base html
  var res = yield request(options);

  var $ = cheerio.load(res.body);

  //get all external css
  var $css = $('link[rel=stylesheet]');
  var css = "";

  for (var i = 0; i < $css.length; i++) {
    options.url = $css[i].attribs.href;

    //append http to url if not found
    if (options.url.indexOf('http') === -1 && options.url.indexOf('https') === -1) {
      options.url = 'http:' +options.url;
      console.log('css: '+options.url)
    }

    //perform request
    var cssres = yield request(options);

    //append to css
    css += cssres.body;
  }

  //get all external js
  var $js = $('script[src]');
  var js = JSON.stringify(res.body); //include base html page
  // console.log($js);

  for (var i = 0; i < $js.length; i++) {
    var type = $js[i].attribs.type;

    // check if type of source is javascript
    if (type === 'text/javascript') {

      options.url = $js[i].attribs.src;

      if (options.url.indexOf('http') === -1 && options.url.indexOf('https') === -1) {

        options.url = "http:" + options.url;
        console.log('js: '+options.url)
        //perform request
        jsres = yield request(options);
        //append to css
        js += jsres.body;
      }

    }

  }

  //purify css
  var uncss = purify(js, css, {
    write: false,
    minify: true
  });

  var before = 'before purify: ' + css.length + ' chars long';
  var after = 'after purify: ' + uncss.length + ' chars long';
  var compare = 'uncss is ' + Math.floor((uncss.length / css.length) * 1000) / 1000 + ' % smaller';

  var message = before+'\n'+after+'\n'+compare;

  console.log(before);
  console.log(after);
  console.log(compare);

  this.body = message;

});

app.listen(3000);