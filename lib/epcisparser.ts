import epcis = require('./epcisevents');
var xml2js = require('xml2js');
var assert = require('assert');

export module EPCIS {
	export class EpcisParser {
		parser: any;

		constructor() {
			// options to parse the EPCIS xml structure into JS
			// we need all attributes to e.g. get the bizLocation tyepes
			// use array in all cases, that we just have one way to handle events
			// instead of checking for a possible occuring array all the time
			var parserOptions = {
				'trim': true,
				'ignoreAttrs': false,
				'explicitArray': true
			};
			this.parser = new xml2js.Parser(parserOptions);
		}

		// parses the XML into JSON
		// be aware, that it won't be the same structure, but slightly different!
		// it should be a more JSON appropriate result
		// especially the lists will be split into separate event objects - if possible	
		parse(xml: string, callback: (err, res: epcis.EPCIS.EpcisEvent[]) => void): void {

			assert.notEqual(null, this.parser, 'Parser must be initialized here!');
			
			var ref = this; // how to handle this scope issue???
			this.parser.parseString(xml, function(err, result) {
				assert.equal(null, err, 'Parsing XML data failed!');
	        
				// we only care for events
				var objectEvents = result['epcis:EPCISDocument']['EPCISBody'][0]['EventList'][0]['ObjectEvent'];
				if(objectEvents) {
					//console.log('objectEvent:');
					//console.log(objectEvent);
					var events:epcis.EPCIS.ObjectEvent[] = [];
					for(var i=0; i<objectEvents.length; i++) {
						var oe:epcis.EPCIS.ObjectEvent = ref.parseObjectEvent(objectEvents[i]);
						events.push(oe);
					}
					var msg = JSON.stringify(oe, null, 4);
					//console.log(oe);
					callback(null, events);
					
				}
			});
		}
		

		
		parseObjectEvent(object: Object) : epcis.EPCIS.ObjectEvent {
			var event = <epcis.EPCIS.ObjectEvent>this.parseEpcisEvent(object); 
			
			event.action = this.getFirstElementIfExists(object['action'], undefined);
			var epcL = this.getFirstElementIfExists(object['epcList'], null);
			if(epcL) {
				var epcs = epcL["epc"]; 
				if(epcs) {
					// does it exist at all?
					if (epcs.length > 2) {
						// it's a list
						event.epcList = epcs;
					} else {
						// pick the first element
						event.epc = this.getFirstElementIfExists(epcs, undefined);
					}
				}
				
			}
			event.ilmd = this.getFirstElementIfExists(object['ilmd'], undefined);
			var bizTransactions = this.getBizTransactionList(this.getFirstElementIfExists(object['bizTransactionList'], null));
			if(bizTransactions.length === 1) {
				event.bizTransaction = bizTransactions[0];
			} else if (bizTransactions.length > 1) {
				event.bizTransactionList = bizTransactions;
			}
			return event;
		}
		
		parseEpcisEvent(object: Object) : epcis.EPCIS.EpcisEvent {
			var event = new epcis.EPCIS.EpcisEvent();
			event.eventTime = this.getFirstElementIfExists(object['eventTime'], undefined);
			event.recordTime = this.getFirstElementIfExists(object['recordTime'], undefined);
			event.eventTimeZoneOffset = this.getFirstElementIfExists(object['eventTimeZoneOffset'], undefined);
			event.bizStep = this.getFirstElementIfExists(object['bizStep'], undefined);
			event.disposition = this.getFirstElementIfExists(object['disposition'], undefined);
			event.readPoint = this.getFirstElementIdValueIfExists(object['readPoint'], undefined);
			event.bizLocation = this.getFirstElementIdValueIfExists(object['bizLocation'], undefined);

			return event;
		}
		
		getFirstElementIfExists(object: Object, defaultValue: Object) {
			try {
				return object[0];
			} catch (error) {
				return defaultValue;
			}
		}
		
		getFirstElementIdValueIfExists(object: Object, defaultValue: Object) {
			try {
				return object[0]["id"][0];
			} catch (error) {
				return defaultValue;
			}
		}
		
		getBizTransactionList(object: Object) {
			var result = new Array<epcis.EPCIS.BizTransaction>();
			
			try {
				if(object) {
					var transaction = object['bizTransaction'];
					if(transaction) {

						var element = new epcis.EPCIS.BizTransaction();
						element.id = transaction[0]['_'];
						element.type = transaction[0]['$']['type'];
						result.push(element);
					}
				}
			} catch (error) {
				// don't do anyting. in any case of an error, the list is just empty
			}
			
			return result;
		}
	}
}
