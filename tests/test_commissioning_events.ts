import myparser = require('../lib/epcisparser');
import eventtypes = require('../lib/epcisevents');
var assert = require('assert');
var fs = require('fs');

describe('epcisconverter', () => {
  before(function(){
    // before all tests
  });
	
  
  describe('parse commissioning events', () => {

    var events:eventtypes.EPCIS.EpcisEvent[];

    before(function () {
        var xml = fs.readFileSync(__dirname + '/../testdata/1_case_commissioning_events.xml');
        var parser = new myparser.EPCIS.EpcisParser();
        parser.parse(xml, function(err, res) {
          assert.equal(null, err);
          events = res;
        });
    });
    
    it('check the number of elements', (done) => {
          assert.equal(events.length, 100);
          done();      
    });
    
    it('the first element should match our expectations', (done) => {
          assert.equal(events[0].eventTime, '2006-06-25T00:01:00Z');
          assert.equal(events[0].eventTimeZoneOffset, '-06:00');
          assert.equal(events[0].epc, 'urn:epc:id:sgtin:0614141.107340.1');
          assert.equal(events[0].action, 'ADD');
          assert.equal(events[0].bizStep, 'urn:epcglobal:hls:bizstep:commissioning');
          assert.equal(events[0].disposition, 'urn:epcglobal:hls:disp:active');
          assert.equal(events[0].readPoint, 'urn:epcglobal:fmcg:loc:0614141073467.RP-1');
          assert.equal(events[0].bizLocation, 'urn:epcglobal:fmcg:loc:0614141073467.1');
          done();
    });
    
    it('the last element should match our expectations', (done) => {
          assert.equal(events[99].eventTime, '2006-06-25T01:40:00Z');
          assert.equal(events[99].eventTimeZoneOffset, '-06:00');
          assert.equal(events[99].epc, 'urn:epc:id:sgtin:0614142.107349.10');
          assert.equal(events[99].action, 'ADD');
          assert.equal(events[99].bizStep, 'urn:epcglobal:hls:bizstep:commissioning');
          assert.equal(events[99].disposition, 'urn:epcglobal:hls:disp:active');
          assert.equal(events[99].readPoint, 'urn:epcglobal:fmcg:loc:0614141073467.RP-1');
          assert.equal(events[99].bizLocation, 'urn:epcglobal:fmcg:loc:0614141073467.1');
          done();
    });
    
  });
});