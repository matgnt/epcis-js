import epcis = require('./epcisevents');

export module EPCIS {
	export class EpcisJsonParser {
		constructor() {}
		static parseObj(obj: Object) : epcis.EPCIS.EpcisEvent {
			if(EpcisJsonParser.isEvent(obj)) {
				if(obj['type'] === 'AggregationEvent') {
					var agg = new epcis.EPCIS.AggregationEvent();
					return agg.loadFromObj(obj);
				} else if(obj['type'] === 'TransformationEvent') {
					var trans = new epcis.EPCIS.TransformationEvent();
					return trans.loadFromObj(obj);
				}
			}
			
		}
		static parseJson(json: string) : epcis.EPCIS.Events {
			var obj = JSON.parse(json);
			return this.parseObj(obj);
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