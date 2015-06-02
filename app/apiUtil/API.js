'use strict';

var request = require('superagent');

/**
 * Wrapper for calling a API
 */
var Api = {
  get: function(url, content) {
    return new Promise(function(resolve, reject) {
      request
        .post(url)
        .set('Content-Type', 'application/json')
        .send(content)
        .end(function(err, res) {
          if (res.status === 404) {
            reject();
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  }
};

module.exports = Api;