
export module EPCIS {
	export class Events {
		objectEvents: Array<ObjectEvent>;
		aggregationEvents: Array<AggregationEvent>;
		transactionEvents: Array<TransactionEvent>;
		transformationEvents: Array<TransformationEvent>;

		constructor() {}
	}

	export class EpcisEvent {
		type: string;
		eventTime: Date;
		recordTime: Date;
		eventTimeZoneOffset: string;
		bizStep: string;
		disposition: string;
		readPoint: string;
		bizLocation: string;
		bizTransaction: BizTransaction;
		// can we really get lists here?
		bizTransactionList: Array<BizTransaction>;

		constructor() {
			this.type = 'EpcisEvent';
		}

		static cloneFrom(event: EpcisEvent) : EpcisEvent {
			var result:EpcisEvent = new EpcisEvent();

			result.type = event.type;
			result.eventTime = event.eventTime;
			result.recordTime = event.recordTime;
			result.eventTimeZoneOffset = event.eventTimeZoneOffset;
			result.bizStep = event.bizStep;
			result.disposition = event.disposition;
			result.readPoint = event.readPoint;
			result.bizLocation = event.bizLocation;
			result.bizTransaction = event.bizTransaction;
			result.bizTransactionList = event.bizTransactionList.slice(0); // make a copy

			return result;
		}

		static loadFromJson(json: string) : EpcisEvent {
			var obj = JSON.parse(json);
			return EpcisEvent.loadFromObj(obj);
		}
		static loadFromObj(obj: Object) : EpcisEvent {
			var result = new EpcisEvent();
			result.type = obj['type'];
			result.eventTime = new Date(obj['eventTime']);
			result.recordTime = new Date(obj['recordTime']);
			result.eventTimeZoneOffset = obj['eventTimeZoneOffset'];
			result.bizStep = obj['bizStep'];
			result.bizTransaction = obj['bizTransaction'];
			result.bizTransactionList = obj['bizTransactionList'];
			return result;
		}
	}

	export class ObjectEvent extends EpcisEvent {
		action: string;
		epc: string;
		epcList: Array<string>;
		ilmd: string;

		constructor() {
			super();
			this.type = 'ObjectEvent';
		}

		static cloneFrom(event: ObjectEvent) : ObjectEvent {
			var result:ObjectEvent = <ObjectEvent>EpcisEvent.cloneFrom(event);
			result.action = event.action;
			result.epc = event.epc;
			result.epcList = event.epcList.slice(0);	// make a copy
			result.ilmd = event.ilmd;
			return result;
		}

		static loadFromJson(json: string) : ObjectEvent {
			var obj = JSON.parse(json);
			return ObjectEvent.loadFromObj(json);
		}
		static loadFromObj(obj: Object) : ObjectEvent {
			var result:ObjectEvent = <ObjectEvent>EpcisEvent.loadFromObj(obj);

			result.action = obj['action'];
			result.epc = obj['epc'];
			result.epcList = obj['epcList'];
			result.ilmd = obj['ilmd'];

			return result;
		}
	}

	export class AggregationEvent extends EpcisEvent {
		action: string;
		parentID: string;
		// In an aggregation event it makes sense to keep lists because it'll
		// always be multiple items
		childEPCs: Array<string>;
		// Both "child" fields can be set.
		// The "quantity" field is just something like e.g. a batch where
		// you often don't have a unique EPC as an identifier.
		childQuantityList: Array<Quantity>;
	
		constructor() {
			super();
			this.type = 'AggregationEvent';
		}

		static cloneFrom(event: AggregationEvent) : AggregationEvent {
			var result:AggregationEvent = <AggregationEvent>EpcisEvent.cloneFrom(event);
			result.action = event.action;
			result.parentID = event.parentID;
			result.childEPCs = event.childEPCs.slice(0);
			result.childQuantityList = event.childQuantityList.slice(0);
			return result;
		}

		static loadFromJson(json: string) : AggregationEvent {
			var obj = JSON.parse(json);
			return AggregationEvent.loadFromObj(json);
		}
		static loadFromObj(obj: Object) : AggregationEvent {
			var result:AggregationEvent = <AggregationEvent>EpcisEvent.loadFromObj(obj);

			result.action = obj['action'];
			result.parentID = obj['parentID'];
			result.childEPCs = obj['childEPCs'];
			result.childQuantityList = obj['childQuantityList'];

			return result;
		}

	}

	export class TransactionEvent extends EpcisEvent {
		action: string;
		epc: string;
		epcList: Array<string>;
		quantityList: Array<Quantity>;
		parentID: string;

		constructor() {
			super();
			this.type = 'TransactionEvent';
		}

		static cloneFrom(event: TransactionEvent) : TransactionEvent {
			var result:TransactionEvent = <TransactionEvent>EpcisEvent.cloneFrom(event);
			result.action = event.action;
			result.epc = event.epc;
			if(event.epcList) {
				result.epcList = event.epcList.slice(0);
			}
			if(event.quantityList) {
				result.quantityList = event.quantityList.slice(0);
			}
			result.parentID = event.parentID;
			return result;
		}

		static loadFromJson(json: string) : TransactionEvent {
			var obj = JSON.parse(json);
			return TransactionEvent.loadFromObj(json);
		}
		static loadFromObj(obj: Object) : TransactionEvent {
			var result:TransactionEvent = <TransactionEvent>EpcisEvent.loadFromObj(obj);

			result.action = obj['action'];
			result.epc = obj['epc'];
			result.quantityList = obj['quantityList'];
			result.parentID = obj['parentID'];

			return result;
		}

	}

	export class TransformationEvent extends EpcisEvent {
		ilmd: string;
		// inputEPCList
		// outputEPCList
		// inputQuantitiyList
		// outputQuantityList
		transformationID: string;

		constructor() {
			super();
			this.type = 'TransformationEvent';
		}

		cloneFrom(event: TransformationEvent) : TransformationEvent {
			var result:TransformationEvent = <TransformationEvent> EpcisEvent.cloneFrom(event);
			result.ilmd = event.ilmd;
			return result;
		}
		static loadFromJson(json: string) : TransformationEvent {
			var obj = JSON.parse(json);
			return TransformationEvent.loadFromObj(json);
		}
		static loadFromObj(obj: Object) : TransformationEvent {
			var result:TransformationEvent = <TransformationEvent>EpcisEvent.loadFromObj(obj);

			result.ilmd = obj['ilmd'];
			result.transformationID = obj['transformationID'];

			return result;
		}

	}
	
	// helper classes
	export class BizTransaction {
		type: string;
		id: string;
	}

	export class Quantity {
		/*
		* GTIN: 			urn:epc:idpat:sgtin:...
		* GTIN + batch/lot:	urn:epc:class:lgtin:...
		* GTIN + serial:	urn:epc:id:sgtin:...
		* SSCC:				urn:epc:id:sscc:...
		* GRAI (no serial):	urn:epc:idpat:grai:...
		* GRAI (serial):	urn:epc:id:grai:...
		*
		* and many more. Check the specification.
		* The prefix describes the value.
		*/
		//epcClass: string;
		// we split the "epcClass" field into the following 2
		type: string;
		identifier: string;

		quantity: number;

		/*
		* "uom" but who the heck knows what that means?
		* Not needed for just a quantity, but as soon as a unit is needed,
		* it should be the 2-3 character code for the physical unit
		* specified in the "Common Code" of "UN/CEFACT"
		*
		* Examples:
		* kg: KGM
		* liter: LTR
		* meter: MTR
		*/
		unit: string;

		// Convenient fucntion since we "renamed" the field from the specification
		// since no one knows what "uom" actually means...
		uom(): string {
			return this.unit;
		}
		setUom(value: string): void {
			this.unit = value;
		}

		// convenient function to get the 2 fields together (as it is
		// described in the EPCIS standard)
		epcClass(): string {
			return this.type + ':' + this.identifier;
		}

		// Convenient function to parse the EPCIS standard field
		// and split it into the two fields "type" and "identifier".
		// Split at the last ":"
		setEpcClass(epcClass: string): void {
			var pos:number = epcClass.lastIndexOf(':');
			if(pos > 0) {
				this.type = epcClass.substr(0, pos);
				this.identifier = epcClass.substr(pos+1);
			}
		}
	}

}
