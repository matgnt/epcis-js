import epcis = require('./epcis');
var xml2js = require('xml2js');
var assert = require('assert');

export module EpcisParser {
	export class EpcisParser {
		parser: any;

		constructor() {
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
		parse(xml: string, callback: (err, res: epcis.epcis.EpcisEvent) => void): void {

			assert.notEqual(null, this.parser, 'Parser must be initialized here!');
			
			var ref = this; // how to handle this scope issue???
			this.parser.parseString(xml, function(err, result) {
				assert.equal(null, err, 'Parsing XML data failed!');
	        
				// we only care for events
				var objectEvent = result['epcis:EPCISDocument']['EPCISBody']['EventList']['ObjectEvent'];
				if(objectEvent) {
					//console.log('objectEvent:');
					//console.log(objectEvent);
					var oe:epcis.epcis.ObjectEvent = ref.parseObjectEvent(objectEvent);
					var msg = JSON.stringify(oe, null, 4);
					//console.log(oe);
					callback(null, oe);
					
				}
			});
		}
		

		
		parseObjectEvent(object: Object) : epcis.epcis.ObjectEvent {
			var event = <epcis.epcis.ObjectEvent>this.parseEpcisEvent(object); 
			
			event.action = object['action'];
			var epcL = object['epcList'];
			if(epcL) {
				event.epc = epcL['epc'];
			}
			event.ilmd = object['ilmd'];

			return event;
		}
		
		parseEpcisEvent(object: Object) : epcis.epcis.EpcisEvent {
			var event = new epcis.epcis.EpcisEvent();
			event.eventTime = object['eventTime'];
			event.recordTime = object['recordTime'];
			event.eventTimeZoneOffset = object['eventTimeZoneOffset'];
			event.bizStep = object['bizStep'];
			event.disposition = object['disposition'];
			event.readPoint = object['readPoint'];
			event.bizLocation = object['bizLocation'];

			return event;
		}
	}
}
