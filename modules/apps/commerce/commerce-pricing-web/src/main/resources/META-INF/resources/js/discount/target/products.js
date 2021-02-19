import {entry as itemFinder} from 'commerce-frontend-js/components/item_finder/entry'
import slugify from 'commerce-frontend-js/utilities/slugify'
import events from 'frontend-taglib-clay/data_set_display/utils/eventsDefinitions'
import ServiceProvider from 'commerce-frontend-js/ServiceProvider/index'

var CommerceDiscountRuleResource = ServiceProvider.default.AdminPricingAPI(
	'v2'
);

var form = document.getElementById('<portlet:namespace />fm');

var name = form.querySelector('#<portlet:namespace />name').value;

var commerceDiscountRuleType = form.querySelector('#<portlet:namespace />type')
	.value;
var typeSettings = form.querySelector('#<portlet:namespace />typeSettings')
	.value;

function addProductDefinition(productId) {
	if (typeSettings === '') {
		return typeSettings.concat(productId);
	}
	return typeSettings.concat(',').concat(productId);
}

function selectItem(product) {
	var ruleData = {
		name: name,
		type: commerceDiscountRuleType,
		typeSettings: addProductDefinition(product.id),
	};

	return CommerceDiscountRuleResource.updateDiscountRule(
		'<%= commerceDiscountRule.getCommerceDiscountRuleId() %>',
		ruleData
	)
		.then(function (payload) {
			Liferay.fire(events.UPDATE_DATASET_DISPLAY, {
				id:
					'<%= CommercePricingDataSetConstants.COMMERCE_DATA_SET_KEY_DISCOUNT_RULE_PRODUCT_DEFINITIONS %>',
			});

			typeSettings = payload.typeSettings
				.replace(/(\r\n|\n|\r)/gm, '')
				.split('=')[1];

			document.getElementById(
				'<portlet:namespace />typeSettings'
			).value = typeSettings;
		})
		.catch(function (error) {
			return Promise.reject(error);
		});
}

function getSelectedItems() {
	return Promise.resolve([]);
}


itemFinder.default('itemFinder', 'item-finder-root', {
	apiUrl:
		'/o/headless-commerce-admin-catalog/v1.0/products?nestedFields=catalog',
	getSelectedItems: getSelectedItems,
	inputPlaceholder: '<%= LanguageUtil.get(request, "find-a-product") %>',
	linkedDatasetsId: [
		'<%= CommercePricingDataSetConstants.COMMERCE_DATA_SET_KEY_DISCOUNT_RULE_PRODUCT_DEFINITIONS %>',
	],
	itemCreation: false,
	itemSelectedMessage: '<%= LanguageUtil.get(request, "product-selected") %>',
	itemsKey: 'id',
	onItemSelected: selectItem,
	pageSize: 10,
	panelHeaderLabel: '<%= LanguageUtil.get(request, "add-products") %>',
	portletId: '<%= portletDisplay.getRootPortletId() %>',
	schema: [
		{
			fieldName: ['name', 'LANG'],
		},
		{
			fieldName: 'skuFormatted',
		},
		{
			fieldName: ['catalog', 'name'],
		},
	],
	spritemap: '<%= themeDisplay.getPathThemeImages() %>/lexicon/icons.svg',
	titleLabel: '<%= LanguageUtil.get(request, "add-existing-product") %>',
});

var CommerceDiscountProductsResource = ServiceProvider.default.AdminPricingAPI(
	'v2'
);

var id = <%= commerceDiscountId %>;
var discountExternalReferenceCode =
'<%= commerceDiscount.getExternalReferenceCode() %>';

function selectItem(product) {
var productData = {
	discountExternalReferenceCode: discountExternalReferenceCode,
	discountId: id,
	productExternalReferenceCode: product.externalReferenceCode,
	productId: product.productId,
};

return CommerceDiscountProductsResource.addDiscountProduct(id, productData)
						.then(function () {
Liferay.fire(events.UPDATE_DATASET_DISPLAY, {
id:
'<%= CommercePricingDataSetConstants.COMMERCE_DATA_SET_KEY_DISCOUNT_PRODUCT_DEFINITIONS %>',
							});
						})
						.catch(function (error) {
return Promise.reject(error);
						});
				}

function getSelectedItems() {
return Promise.resolve([]);
				}

itemFinder.default('itemFinder', 'item-finder-root', {
					apiUrl:
						'/o/headless-commerce-admin-catalog/v1.0/products?nestedFields=catalog',
					getSelectedItems: getSelectedItems,
					inputPlaceholder: '<%= LanguageUtil.get(request, "find-a-product") %>',
					itemCreation: false,
					itemSelectedMessage: '<%= LanguageUtil.get(request, "product-selected") %>',
					itemsKey: 'id',
					linkedDatasetsId: [
						'<%= CommercePricingDataSetConstants.COMMERCE_DATA_SET_KEY_DISCOUNT_PRODUCT_DEFINITIONS %>',
					],
					onItemSelected: selectItem,
					pageSize: 10,
					panelHeaderLabel: '<%= LanguageUtil.get(request, "add-products") %>',
					portletId: '<%= portletDisplay.getRootPortletId() %>',
					schema: [
						{
							fieldName: ['name', 'LANG'],
						},
						{
							fieldName: 'productId',
						},
						{
							fieldName: ['catalog', 'name'],
						},
					],
					spritemap: '<%= themeDisplay.getPathThemeImages() %>/lexicon/icons.svg',
					titleLabel: '<%= LanguageUtil.get(request, "add-existing-product") %>',
				});