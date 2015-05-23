import myparser = require('../lib/epcisparser');
var assert = require('assert');
var fs = require('fs');

describe('epcisconverter', () => {
  before(function(){
    // before all tests
  });
	
  
  describe('parse', () => {
    it('should properly parse our 1. EPCIS xml example to JSON', (done) => {
        var xml = fs.readFileSync(__dirname + '/../testdata/objectevent1.xml');
        var parser = new myparser.EPCIS.EpcisParser();
        parser.parse(xml, function(err, res) {
          assert.equal(null, err);
          assert.equal(res[0].action, 'OBSERVE');
          console.log(JSON.stringify(res, null, 4));
          done();
        });
    });
    it('example with multiple EPCs in epcList', (done) => {
        var xml = fs.readFileSync(__dirname + '/../testdata/objectevent2.xml');
        var parser = new myparser.EPCIS.EpcisParser();
        parser.parse(xml, function(err, res) {
          assert.equal(null, err);
          assert.equal(res[0].action, 'OBSERVE');
          console.log(JSON.stringify(res, null, 4));
          done();
        });
    });
    
    it('load commisioning events', (done) => {
      var xml = fs.readFileSync(__dirname + '/../testdata/1_case_commissioning_events.xml');
      var parser = new myparser.EPCIS.EpcisParser();
      parser.parse(xml, function (err, res) {
        assert.equal(null, err);
        assert.ok(res.length > 0, "We should have more than 0 events in our list!")
        console.log(JSON.stringify(res, null, 4));
        done();
      })
      
      
    });
    
  });
});