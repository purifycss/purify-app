var app = require('../server.js');
var request = require('co-supertest').agent(app.listen());
var expect = require('chai').expect;

describe('/test', function() {

  it('should return Hello, World', function *(){
    var res = yield request.get('/test').expect(200).end();
    expect(res.text).to.equal('Hello, World');
  });

});