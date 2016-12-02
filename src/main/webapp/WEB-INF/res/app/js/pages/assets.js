'use strict';

/*$(function() {
	onAssetCreate();
	onAssetUpdate();
	onAssetDelete();
	reloadAssetsPageData();
});*/

function reloadAssetsPageData() {
	getCurrencies()
		.done(function(currencyData) {
			updateCurrencySelect(currencyData);
			
			getAssets()
				.done(function(assetData) {
					updateAssetsTable(assetData, currencyData);
				})
				.fail(function() {
					alert('fail to get assets');
				});
		})
		.fail(function() {
			alert('fail to get currencies');
		});
	
	getAssetTypes()
		.done(function(data) {
			updateAssetTypeSelect(data);
		})
		.fail(function() {
			alert('fail to get asset types');
		});
}

function onAssetDelete() {
	var deleteModal = $('#c-delete-confirmation-modal');
	var deleteForm = $('#c-modal-delete-form');
	
	$(deleteForm).submit(function(event) {
		event.preventDefault();
		deleteAsset($('#id', deleteForm).val(), $('#type', deleteForm).val())
			.done(function(data) {
				$(deleteModal).modal('hide');
				reloadAssetsPageData();
			})
			.fail(function() {
				alert('failed to delete asset with id=' + $(control).data('target'))
			});
	});
}

function onAssetUpdate() {
	/*var editForm = $('#c-edit-currency-form');
	
	$(editForm).submit(function(event) {
		event.preventDefault();
		updateCurrency($('#id', editForm).val())
			.done(function(data) {
				$(editForm).addClass('hidden');
				reloadPageData();
			})
			.fail(function() {
				alert('failed to update currency with id=' + $(control).data('target'));
			});
	});
	
	$('button[type="reset"]', editForm).click(function(event) {
		$(editForm).addClass('hidden');
	});*/
}

function onAssetCreate() {
	$('#c-add-asset-form form').submit(function(submitEvent) {
		submitEvent.preventDefault();
		var form = $(this);
		createAsset()
			.done(function(data) {
				$('button[type="reset"]', form).click();
				reloadAssetsPageData();
			})
			.fail(function() {
				alert('fail to post asset');
			});
	});
}

function updateCurrencySelect(data) {
	var select = $('#c-add-asset-form #currency');
	$(select).html('');
	
	for(var i = 0; i < data.length; i++) {
		var option = document.createElement('option');
		
		$(option).attr('value', data[i].id);
		$(option).text(data[i].symbol + ' ' + data[i].name + ' (' + data[i].code + ')');
				
		$(select).append(option);
	}
}

function updateAssetTypeSelect(data) {
	var select = $('#c-add-asset-form #type');
	 $(select).html('');
	 
	 for(var i = 0; i < data.length; i++) {
		 var option = document.createElement('option');
		 
		 $(option).attr('value', data[i].name);
		 $(option).text(data[i].label);
		 
		 $(select).append(option);
	 }
}

function updateAssetsTable(assetData, currencyData) {
	var table = $('#c-added-assets-table');
	var oldTbody = $('tbody', table);
	var body = document.createElement('tbody');
	
	for(var i = 0; i < assetData.length; i++) {
		var row = document.createElement('tr');
		
		var tdName = document.createElement('td');
		var tdType = document.createElement('td');
		var tdCurrency = document.createElement('td');
		
		$(tdName).text(assetData[i].name);
		$(tdType).text(assetData[i].label);
		
		for(var j = 0; j < currencyData.length; j++) {
			var currency = currencyData[j];
			if(currency.id === assetData[i].currency) {
				$(tdCurrency).text(currency.symbol + ' ' + currency.name + ' (' + currency.code + ')');
				break;
			}
		}
		
		$(row).append(tdName);
		$(row).append(tdType);
		$(row).append(tdCurrency);
		$(row).append(buildAssetActions(assetData[i]));
		
		$(body).append(row);
	}
	
	
	$(oldTbody).remove();
	$('thead', table).after(body)
}

function buildAssetActions(assetData) {
	var tdActions = document.createElement('td');

	var editAction = document.createElement('a');
	$(editAction).attr('href', '#');
	$(editAction).html('<i class="fa fa-pencil"></i>');
	$(editAction).data('target', assetData.id);
	$(editAction).data('type', assetData.type);
	$(tdActions).append(editAction);
	
	$(editAction).click(function(event) {
		event.preventDefault();
		onAssetEditAttempt(editAction);
	});
	

	var deleteAction = document.createElement('a');
	$(deleteAction).attr('href', '#');
	$(deleteAction).html('<i class="fa fa-remove"></i>');
	$(deleteAction).data('target', assetData.id);
	$(deleteAction).data('type', assetData.type);
	$(tdActions).append(deleteAction);
	
	$(deleteAction).click(function(event) {
		event.preventDefault();
		onAssetDeleteAttempt(deleteAction);
	});

	return tdActions;
}

function onAssetEditAttempt(control) {
	/*var editForm = $('#c-edit-currency-form');
	
	getCurrencyById($(control).data('target'))
		.done(function(data) {
			$('#name', editForm).val(data.name);
			$('#code', editForm).val(data.code);
			$('#symbol', editForm).val(data.symbol);
			$('#id', editForm).val(data.id);
			
			$(editForm).removeClass('hidden');
		})
		.fail(function() {
			alert('failed to get currency with id=' + $(control).data('target'));
		});*/
}

function onAssetDeleteAttempt(control) {
	var deleteModal = $('#c-delete-confirmation-modal');
	
	getAssetById($(control).data('target'), $(control).data('type'))
		.done(function(data) {
			$('#c-delete-subject', deleteModal).html('<b>' + data.name + ' (' + data.label + ')</b> asset.');
			
			$('#c-modal-delete-form #id', deleteModal).val(data.id);
			
			var typeInput = document.createElement('input');
			$(typeInput).attr('type', 'hidden');
			$(typeInput).attr('id', 'type');
			$(typeInput).attr('name', 'type');
			$(typeInput).val(data.type);
			
			$('#c-modal-delete-form #id', deleteModal).append(typeInput);
			
			$(deleteModal).modal('show');
		})
		.fail(function() {
			alert('failed to get asset with id=' + $(control).data('target'));
		});
}