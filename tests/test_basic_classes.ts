import eventtypes = require('../lib/epcisevents');
var assert = require('assert');

describe('Basic class functionality', () => {
    
    it('check the epcClass parser in the Quantity class', (done) => {
		var quantity = new eventtypes.EPCIS.Quantity();
		
		quantity.setEpcClass('urn:epc:idpat:sgtin:myidentifier');

		assert.equal(quantity.type, 'urn:epc:idpat:sgtin');
		assert.equal(quantity.identifier, 'myidentifier');
		
		assert.equal(quantity.epcClass(), 'urn:epc:idpat:sgtin:myidentifier');
		
        done();      
    });
    
    
});