
export module EPCIS {
	export class EpcisEvent {
		eventTime: string;
		recordTime: string;
		eventTimeZoneOffset: string;
		bizStep: string;
		disposition: string;
		readPoint: string;
		bizLocation: string;

		constructor() { }
		cloneFrom(event: EpcisEvent) : void {
			this.eventTime = event.eventTime;
			this.recordTime = event.recordTime;
			this.eventTimeZoneOffset = event.eventTimeZoneOffset;
			this.bizStep = event.bizStep;
			this.disposition = event.disposition;
			this.readPoint = event.readPoint;
			this.bizLocation = event.bizLocation;
		}
	}

	export class ObjectEvent extends EpcisEvent {
		action: string;
		epc: string;
		ilmd: string;

		constructor() { super(); }
		cloneFrom(event: ObjectEvent) : void {
			super.cloneFrom(event);
			this.action = event.action;
			this.epc = event.epc;
			this.ilmd = event.ilmd;
		}
	}

	export class AggregationEvent extends EpcisEvent {
		action: string;
		// childQuantity
		parentID: string;
		// childEPCs
	
		constructor() { super(); }
		cloneFrom(event: AggregationEvent) : void {
			super.cloneFrom(event);
			this.action = event.action;
			this.parentID = event.parentID;
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

}