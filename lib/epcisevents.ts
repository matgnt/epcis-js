
export module EPCIS {
	export class EpcisEvent {
		eventTime: string;
		recordTime: string;
		eventTimeZoneOffset: string;
		bizStep: string;
		disposition: string;
		readPoint: string;
		bizLocation: string;
		bizTransaction: BizTransaction;
		// can we really get lists here?
		bizTransactionList: Array<BizTransaction>;

		constructor() { }
		cloneFrom(event: EpcisEvent) : void {
			this.eventTime = event.eventTime;
			this.recordTime = event.recordTime;
			this.eventTimeZoneOffset = event.eventTimeZoneOffset;
			this.bizStep = event.bizStep;
			this.disposition = event.disposition;
			this.readPoint = event.readPoint;
			this.bizLocation = event.bizLocation;
			this.bizTransaction = event.bizTransaction;
			this.bizTransactionList = event.bizTransactionList.slice(0); // make a copy
		}
	}

	export class ObjectEvent extends EpcisEvent {
		action: string;
		epc: string;
		epcList: Array<string>;
		ilmd: string;

		constructor() { super(); }
		cloneFrom(event: ObjectEvent) : void {
			super.cloneFrom(event);
			this.action = event.action;
			this.epc = event.epc;
			this.epcList = event.epcList.slice(0);	// make a copy
			this.ilmd = event.ilmd;
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
		childQuantity: Array<Quantity>;
	
		constructor() { super(); }
		cloneFrom(event: AggregationEvent) : void {
			super.cloneFrom(event);
			this.action = event.action;
			this.parentID = event.parentID;
			this.childEPCs = event.childEPCs.slice(0);
			this.childQuantity = event.childQuantity.slice(0);
		}

	}

	export class TransactionEvent extends EpcisEvent {
		action: string;
		// bizTransactionList
		epc: string;
		// quantityList
		parentID: string;

		constructor() { super(); }
		cloneFrom(event: TransactionEvent) : void {
			super.cloneFrom(event);
			this.action = event.action;
			this.epc = event.epc;
			this.parentID = event.parentID;
		}
	}

	export class TransformationEvent extends EpcisEvent {
		ilmd: string;
		// inputEPCList
		// outputEPCList
		// inputQuantitiyList
		// outputQuantityList
		transformationID: string;

		constructor() { super(); }
		cloneFrom(event: TransformationEvent) : void {
			super.cloneFrom(event);
			this.ilmd = event.ilmd;
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
