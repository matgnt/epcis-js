var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EPCIS;
(function (EPCIS) {
    var EpcisEvent = (function () {
        function EpcisEvent() {
        }
        EpcisEvent.prototype.cloneFrom = function (event) {
            this.eventTime = event.eventTime;
            this.recordTime = event.recordTime;
            this.eventTimeZoneOffset = event.eventTimeZoneOffset;
            this.bizStep = event.bizStep;
            this.disposition = event.disposition;
            this.readPoint = event.readPoint;
            this.bizLocation = event.bizLocation;
        };
        return EpcisEvent;
    })();
    EPCIS.EpcisEvent = EpcisEvent;
    var ObjectEvent = (function (_super) {
        __extends(ObjectEvent, _super);
        function ObjectEvent() {
            _super.call(this);
        }
        ObjectEvent.prototype.cloneFrom = function (event) {
            _super.prototype.cloneFrom.call(this, event);
            this.action = event.action;
            this.epc = event.epc;
            this.ilmd = event.ilmd;
        };
        return ObjectEvent;
    })(EpcisEvent);
    EPCIS.ObjectEvent = ObjectEvent;
    var AggregationEvent = (function (_super) {
        __extends(AggregationEvent, _super);
        // childEPCs
        function AggregationEvent() {
            _super.call(this);
        }
        AggregationEvent.prototype.cloneFrom = function (event) {
            _super.prototype.cloneFrom.call(this, event);
            this.action = event.action;
            this.parentID = event.parentID;
        };
        return AggregationEvent;
    })(EpcisEvent);
    EPCIS.AggregationEvent = AggregationEvent;
    var TransactionEvent = (function (_super) {
        __extends(TransactionEvent, _super);
        function TransactionEvent() {
            _super.call(this);
        }
        TransactionEvent.prototype.cloneFrom = function (event) {
            _super.prototype.cloneFrom.call(this, event);
            this.action = event.action;
            this.epc = event.epc;
            this.parentID = event.parentID;
        };
        return TransactionEvent;
    })(EpcisEvent);
    EPCIS.TransactionEvent = TransactionEvent;
    var TransformationEvent = (function (_super) {
        __extends(TransformationEvent, _super);
        function TransformationEvent() {
            _super.call(this);
        }
        TransformationEvent.prototype.cloneFrom = function (event) {
            _super.prototype.cloneFrom.call(this, event);
            this.ilmd = event.ilmd;
        };
        return TransformationEvent;
    })(EpcisEvent);
    EPCIS.TransformationEvent = TransformationEvent;
})(EPCIS = exports.EPCIS || (exports.EPCIS = {}));
