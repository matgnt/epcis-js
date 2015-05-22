var epcis = require('./epcisevents');
var xml2js = require('xml2js');
var assert = require('assert');
var EPCIS;
(function (EPCIS) {
    var EpcisParser = (function () {
        function EpcisParser() {
            // options to parse the EPCIS xml structure into JS
            var parserOptions = {
                'trim': true,
                'ignoreAttrs': true,
                'explicitArray': false
            };
            this.parser = new xml2js.Parser(parserOptions);
        }
        // parses the XML into JSON
        // be aware, that it won't be the same structure, but slightly different!
        // it should be a more JSON appropriate result
        // especially the lists will be split into separate event objects - if possible	
        EpcisParser.prototype.parse = function (xml, callback) {
            assert.notEqual(null, this.parser, 'Parser must be initialized here!');
            var ref = this; // how to handle this scope issue???
            this.parser.parseString(xml, function (err, result) {
                assert.equal(null, err, 'Parsing XML data failed!');
                // we only care for events
                var objectEvent = result['epcis:EPCISDocument']['EPCISBody']['EventList']['ObjectEvent'];
                if (objectEvent) {
                    //console.log('objectEvent:');
                    //console.log(objectEvent);
                    var oe = ref.parseObjectEvent(objectEvent);
                    var msg = JSON.stringify(oe, null, 4);
                    //console.log(oe);
                    callback(null, oe);
                }
            });
        };
        EpcisParser.prototype.parseObjectEvent = function (object) {
            var event = this.parseEpcisEvent(object);
            event.action = object['action'];
            var epcL = object['epcList'];
            if (epcL) {
                event.epc = epcL['epc'];
            }
            event.ilmd = object['ilmd'];
            return event;
        };
        EpcisParser.prototype.parseEpcisEvent = function (object) {
            var event = new epcis.EPCIS.EpcisEvent();
            event.eventTime = object['eventTime'];
            event.recordTime = object['recordTime'];
            event.eventTimeZoneOffset = object['eventTimeZoneOffset'];
            event.bizStep = object['bizStep'];
            event.disposition = object['disposition'];
            event.readPoint = object['readPoint'];
            event.bizLocation = object['bizLocation'];
            return event;
        };
        return EpcisParser;
    })();
    EPCIS.EpcisParser = EpcisParser;
})(EPCIS = exports.EPCIS || (exports.EPCIS = {}));
