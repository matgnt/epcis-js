import epcis = require('../lib/epcisevents');
var assert = require('assert');
var sleep = require('sleep');

describe('Parse json string back to our EPCIS objects', function () {
    this.timeout(10000);

    it('basic parsing', function (done) {
        var event1 = new epcis.EPCIS.EpcisEvent();
        event1.type = 'DummyEvent';
        var dt = new Date();
        event1.eventTime = dt;
        assert.strictEqual(event1.eventTime, dt, 'Assigning did not work');
        var str = JSON.stringify(event1, null, 4);
        
        // to make sure we don't have any default date set
        sleep.sleep(3);
        
        // parse it back
        var event2 = epcis.EPCIS.EpcisEvent.loadFromJson(str);

        assert.equal(event2.type, 'DummyEvent');
        var str1 = event2.eventTime.toISOString();
        var str2 = dt.toISOString()
        assert.equal(str1, str2);
        // since Date is an object we can not directly compare them!
        assert.ok(event2.eventTime.getTime() === dt.getTime());
        done();
    });
});
