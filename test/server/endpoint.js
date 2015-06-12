var app = require('../../server.js');
var request = require('co-supertest').agent(app.listen());
var expect = require('chai').expect;

describe('/api/purify', function() {

  it('should return api works', function *(){
    var res = yield request.get('/api/flux').expect(200).end();
    expect(res.text).to.equal('api works');
  });

});