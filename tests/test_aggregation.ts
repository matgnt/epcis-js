import myparser = require('../lib/epcisparser');
import eventtypes = require('../lib/epcisevents');
var assert = require('assert');
var fs = require('fs');

describe('Aggregation events', () => {

    var events:Array<eventtypes.EPCIS.EpcisEvent>;
    
    before(function () {
        var xml = fs.readFileSync(__dirname + '/../testdata/3_pack_cases_events.xml');
        var parser = new myparser.EPCIS.EpcisParser();
        parser.parse(xml, function(err, res) {
          assert.equal(null, err);
          events = res;
        });
    });
    
    it('basic parsing', (done) => {
		assert.ok(events.length > 0);
        done();
    });

    it('check childEPCs', (done) => {
		assert.ok(events[0].childEPCs.length > 0);
        done();
    });
    
    
});