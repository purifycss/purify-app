'use strict';

import request from 'superagent';

/**
 * Wrapper for calling a API
 */
const Api = {
  get: (url, content) => {
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

export default Api;