import myparser = require('../lib/epcisparser');
import eventtypes = require('../lib/epcisevents');
var assert = require('assert');
var fs = require('fs');

describe('Aggregation events with quantity list', () => {

    var events:eventtypes.EPCIS.Events;
    
    before(function () {
        var xml = fs.readFileSync(__dirname + '/../testdata/AggregationEvents.xml');
        var parser = new myparser.EPCIS.EpcisParser();
        parser.parse(xml, function(err, res) {
          assert.equal(null, err);
          events = res;
        });
    });
    
    it('basic parsing', (done) => {
		assert.ok(events.aggregationEvents.length === 2);
        done();
    });

    it('check type', (done) => {
		assert.ok(events.aggregationEvents[0].type === 'AggregationEvent');
        done();
    });

    it('check childEPCs', (done) => {
		assert.ok(events.aggregationEvents[0].childEPCs.length === 3);
        assert.equal(events.aggregationEvents[0].childEPCs[0], 'urn:epc:id:sgtin:0614141.107340.1');
        assert.equal(events.aggregationEvents[0].childEPCs[2], 'urn:epc:id:sgtin:0614141.107340.3');
        done();
    });

    it('check first quantity', (done) => {
		assert.ok(events.aggregationEvents[1].childEPCs.length === 0);
        assert.equal(events.aggregationEvents[1].childQuantityList[0].quantity, 1000);
        assert.equal(events.aggregationEvents[1].childQuantityList[0].type, 'urn:epc:idpat:sgtin');
        assert.equal(events.aggregationEvents[1].childQuantityList[0].identifier, 'mypart');
        done();
    });
    it('check quantity with unit', (done) => {
        assert.equal(events.aggregationEvents[1].childQuantityList[1].identifier, 'mystuff');
        assert.equal(events.aggregationEvents[1].childQuantityList[1].quantity, 5);
        assert.equal(events.aggregationEvents[1].childQuantityList[1].unit, 'KGM');
        done();
    });
    
    
});

