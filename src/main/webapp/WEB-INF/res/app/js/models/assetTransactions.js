"use strict";

/*
Model is an observable object.
It should expose the following public access interfaces:
- subscribe

It also should have the following private methods:
- countObservers
- isChanged
- setChanged
- clearChanged
- notifyObservers
- deleteObservers
 */

(function(aScope, undefined){
	
	var observable = new Observable();
	var assetId = $('meta[name="target_id"]').attr('content');
	
	var assetTransactionsModel = {
		__proto__: observable,
		
		getTransactions: function(/*filterData*/) {
			return aScope.transactionService.getTransactions(
				assetId,
				assetId,
				/*filterData.category*/null,
				/*filterData.startDate*/null,
				/*filterData.endDate*/null);
		}
	
	};
	
	
	aScope.assetTransactionsModel = assetTransactionsModel;
	
})($EX);