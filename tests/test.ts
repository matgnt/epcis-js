var assert = require('assert');
import myparser = require('../epcisconverter');
var fs = require('fs');

describe('epcisconverter', () => {
  before(function(){
    // before all tests
  });
	
  
  describe('parse', () => {
    it('should properly parse our 1. EPCIS xml example to JSON', (done) => {
        var xml = fs.readFileSync(__dirname + '/../testdata/objectevent1.xml');
        var parser = new myparser.EpcisParser.EpcisParser();
        parser.parse(xml, function(err, res) {
          assert.equal(null, err);
          assert.equal(res.action, 'OBSERVE');
          console.log(JSON.stringify(res, null, 4));
          done();
        });
    });
    it('example with multiple EPCs in epcList', (done) => {
        var xml = fs.readFileSync(__dirname + '/../testdata/objectevent2.xml');
        var parser = new myparser.EpcisParser.EpcisParser();
        parser.parse(xml, function(err, res) {
          assert.equal(null, err);
          assert.equal(res.action, 'OBSERVE');
          console.log(JSON.stringify(res, null, 4));
          done();
        });
    });
  });
});