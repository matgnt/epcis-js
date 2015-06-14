import epcis = require('./epcisevents');

export module EPCIS {
	export class EpcisJsonParser {
		constructor() {}
		static parseObj(obj: Object) : epcis.EPCIS.EpcisEvent {
			if(EpcisJsonParser.isEvent(obj)) {
				if(obj['type'] === 'AggregationEvent') {
					var agg = epcis.EPCIS.AggregationEvent.loadFromObj(obj);
					return agg;
				} else if(obj['type'] === 'TransformationEvent') {
					var trans = epcis.EPCIS.TransformationEvent.loadFromObj(obj);
					return trans;
				}
			}
			
		}
		static parseJson(json: string) : epcis.EPCIS.EpcisEvent {
			var obj = JSON.parse(json);
			return EpcisJsonParser.parseObj(obj);
		}

		// just check whether the given object is a valid event object already
		static isEvent(obj:any): boolean {
		    var allowedTypes:Array<string> = ['ObjectEvent', 'AggregationEvent', 'TransactionEvent'];
		    var type = obj['type'];
		    if(allowedTypes.indexOf(type) != -1) {
		        // allowed type
		        return true;
		    }
		    return false;
		}

	}
}