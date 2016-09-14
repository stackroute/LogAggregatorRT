var app = require('../app');
var expect = require('chai').expect;
var request = require("supertest");
request = request(app);
describe("Make GET request to URL '/' ", function() {
    it('Simple GET Request to compositefunction url', function(done) {
    request.get('/compositefunction').expect(200, done);
  });
     it('GET Request with returning some data', function(done) {
    request.get('/compositefunction')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err)
        }
        expect(Object.keys(res.body).length).to.be.at.least(1);
        done();
      });
  });
     
});