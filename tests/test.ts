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
          
          assert.equal(res[0].eventTime, '2008-03-16T22:13:16.397+01:00');
          assert.equal(res[0].eventTimeZoneOffset, '+01:00');
          assert.equal(res[0].epc, 'urn:epc:id:sgtin:0614141.107346.2017');
          assert.equal(res[0].action, 'OBSERVE');
          assert.equal(res[0].bizStep, 'urn:epcglobal:epcis:bizstep:fmcg:shipped');
          assert.equal(res[0].disposition, 'urn:epcglobal:epcis:disp:fmcg:unknown');
          assert.equal(res[0].readPoint, 'urn:epc:id:sgln:0614141.07346.1234');
          assert.equal(res[0].bizLocation, 'urn:epcglobal:fmcg:loc:0614141073467.A23-49');
          assert.equal(res[0].bizTransaction.id, 'http://transaction.acme.com/po/12345678');
          assert.equal(res[0].bizTransaction.type, 'urn:epcglobal:fmcg:btt:po');
          
          console.log(JSON.stringify(res, null, 4));
          done();
        });
    });
    it('example with multiple EPCs in epcList', (done) => {
        var xml = fs.readFileSync(__dirname + '/../testdata/objectevent2.xml');
        var parser = new myparser.EPCIS.EpcisParser();
        parser.parse(xml, function(err, res) {
          assert.equal(null, err);

          // difference to test case 1
          assert.equal(res[0].epc, undefined);
          assert.equal(res[0].epcList[0], 'urn:epc:id:sgtin:0614141.107346.2017');
          assert.equal(res[0].epcList[1], 'urn:epc:id:sgtin:0614141.107346.2018');

          console.log(JSON.stringify(res, null, 4));
          done();
        });
    });
    
    /*
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
    */
    
  });
});