"use strict";

/*
View is an observer object.
It should expose the following public access interfaces:
- update(object)
 
 View is also an observable object.
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
	
	var transactionsTable = $('#c-js-transactions-table');
	/*var transactionsFilterForm = $('#c-js-transactions-filter-form');*/
	
	/*var transactionsFilterChangedEvent = new ViewEvent('c.transactions.filterChanged');*/
	
	var formatTime = function(millis) {
		var date = new Date(millis);
		return date.toString('dd-MM-yyyy HH:mm:ss');
	};
	
	/*var updateAssetFilters = function(assetsData, chosenSender, chosenRecipient) {
		var senderSelect = $('#sender', transactionsFilterForm);
		var recipientSelect = $('#recipient', transactionsFilterForm);
		$(senderSelect).html('');
		$(recipientSelect).html('');
		
		$(senderSelect).append('<option selected="selected" value="">Any</option>');
		$(recipientSelect).append('<option selected="selected" value="">Any</option>');
		
		for(var i = 0; i < assetsData.length; i++) {
			var option = $(document.createElement('option'));
			
			$(option).attr('value', assetsData[i].id);
			$(option).text(assetsData[i].name);
			
			var option2 = $(option).clone();
			
			if(option.attr('value') === chosenSender) {
				option.prop('selected', 'selected');
			}
			
			if(option2.attr('value') === chosenRecipient) {
				option2.prop('selected', 'selected');
			}
			
			$(senderSelect).append(option);
			$(recipientSelect).append(option2);
		}
	}*/
	
	var updateTransactionsList = function(data) {
		var oldTbody = $('tbody', transactionsTable);
		var body = document.createElement('tbody');
		
		for(var i = 0; i < data.length; i++) {
			var row = document.createElement('tr');
			
			var tdId = document.createElement('td');
			var tdTime = document.createElement('td');
			var tdSender = document.createElement('td');
			var tdRecipient = document.createElement('td');
			var tdCategory = document.createElement('td');
			var tdAmount = document.createElement('td');
			var tdMessage = document.createElement('td');
			
			$(tdId).text(data[i].id);
			
			$(tdSender).text(data[i].sender);
			/*$(tdSender).addClass('sender-data');*/
			
			$(tdRecipient).text(data[i].recipient);
			/*$(tdRecipient).addClass('recipient-data');*/
			
			$(tdCategory).text(data[i].category);
			/*$(tdCategory).addClass('category-data');*/
			
			$(tdAmount).text(data[i].amount);
			
			$(tdMessage).text(data[i].message);
			/*$(tdMessage).addClass('message-data')*/
			
			$(tdTime).text(formatTime(data[i].transactionDate));
			$(tdTime).addClass('c-js-no-search');
			
			$(row).append(tdId);
			$(row).append(tdTime);
			$(row).append(tdSender);
			$(row).append(tdRecipient);
			$(row).append(tdCategory);
			$(row).append(tdAmount);
			$(row).append(tdMessage);
			
			$(body).append(row);
		}
		
		
		$(oldTbody).remove();
		$('thead', transactionsTable).after(body);
	}
	
	/*var initSearches = function() {
		
		$('#c-js-transactions-table table').searchable({
			searchField: '#sender[type="search"]',
			selector: 'tbody tr',
			childSelector: 'td.sender-data'
		});
		
		$('#c-js-transactions-table table').searchable({
			searchField: '#recipient[type="search"]',
			selector: 'tbody tr',
			childSelector: 'td.recipient-data'
		});
		
		$('#c-js-transactions-table table').searchable({
			searchField: '#category[type="search"]',
			selector: 'tbody tr',
			childSelector: 'td.category-data'
		});
		
		$('#c-js-transactions-table table').searchable({
			searchField: '#message[type="search"]',
			selector: 'tbody tr',
			childSelector: 'td.message-data'
		});
	}*/
	
	var updateSearchContext = function() {
		$(transactionsTable).searchable({
			searchField: '#tx-search',
			selector: 'tbody tr',
			childSelector: 'td:not(.c-js-no-search)'
		});
	}
	
	var observable = new Observable();
	
	var transactionsView = {
		
		__proto__: observable,
		
		update: function(model) {
			
			/*var filterData = {
				sender:transactionsFilterForm.find('#sender').val(),
				recipient:transactionsFilterForm.find('#recipient').val(),
				category:transactionsFilterForm.find('#category').val(),
				startDate:transactionsFilterForm.find('#startDate').val(),
				endDate:transactionsFilterForm.find('#endDate').val()
			};*/
			
			model.getTransactions(/*filterData*/)
				.done(function(transactionsData) {
					updateTransactionsList(transactionsData);
					updateSearchContext();
				})
				.fail(function(jqXHR) {
					console.log(jqXHR.responseText);
				});
			
			/*$EX.assetsModel.getAssets()
				.done(function(assetsData) {
					updateAssetFilters(assetsData, filterData.sender, filterData.recipient);
				});*/
		}
	
	};
		
	aScope.transactionsView = transactionsView;
	
})($EX);