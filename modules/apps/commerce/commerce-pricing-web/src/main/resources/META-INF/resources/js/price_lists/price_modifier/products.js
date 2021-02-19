import {entry as itemFinder} from 'commerce-frontend-js/components/item_finder/entry'
import slugify from 'commerce-frontend-js/utilities/slugify'
import events from 'frontend-taglib-clay/data_set_display/utils/eventsDefinitions'
import ServiceProvider from 'commerce-frontend-js/ServiceProvider/index'

var CommerceDiscountCategoriesResource = ServiceProvider.default.AdminPricingAPI(
	'v2'
);

var id = <%= commerceDiscountId %>;
var discountExternalReferenceCode =
'<%= commerceDiscount.getExternalReferenceCode() %>';

function selectItem(category) {
var categoryData = {
	categoryExternalReferenceCode: category.externalReferenceCode,
	categoryId: category.id,
	discountExternalReferenceCode: discountExternalReferenceCode,
	discountId: id,
};

return CommerceDiscountCategoriesResource.addDiscountCategory(
id,
categoryData
)
						.then(function () {
Liferay.fire(events.UPDATE_DATASET_DISPLAY, {
id:
'<%= CommercePricingDataSetConstants.COMMERCE_DATA_SET_KEY_DISCOUNT_CATEGORIES %>',
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
						'/o/headless-admin-taxonomy/v1.0/taxonomy-categories/0/taxonomy-categories',
					getSelectedItems: getSelectedItems,
					inputPlaceholder: '<%= LanguageUtil.get(request, "find-a-category") %>',
					itemSelectedMessage:
						'<%= LanguageUtil.get(request, "category-selected") %>',
					itemsKey: 'id',
					itemCreation: false,
					linkedDatasetsId: [
						'<%= CommercePricingDataSetConstants.COMMERCE_DATA_SET_KEY_DISCOUNT_CATEGORIES %>',
					],
					onItemSelected: selectItem,
					pageSize: 10,
					panelHeaderLabel: '<%= LanguageUtil.get(request, "select-category") %>',
					portletId: '<%= portletDisplay.getRootPortletId() %>',
					schema: [
						{
							fieldName: ['name'],
						},
					],
					spritemap: '<%= themeDisplay.getPathThemeImages() %>/lexicon/icons.svg',
					titleLabel: '<%= LanguageUtil.get(request, "add-existing-category") %>',
				});


var CommercePriceModifierProductsResource = ServiceProvider.default.AdminPricingAPI(
	'v2'
);

var id = <%= commercePriceModifierId %>;
var priceModifierExternalReferenceCode =
'<%= commercePriceModifier.getExternalReferenceCode() %>';

function selectItem(product) {
var productData = {
	productExternalReferenceCode: product.externalReferenceCode,
	productId: product.id,
	priceModifierExternalReferenceCode: priceModifierExternalReferenceCode,
	priceModifierId: id,
};

return CommercePriceModifierProductsResource.addPriceModifierProduct(
id,
productData
)
						.then(function () {
Liferay.fire(events.UPDATE_DATASET_DISPLAY, {
id:
'<%= CommercePricingDataSetConstants.COMMERCE_DATA_SET_KEY_PRICE_MODIFIER_PRODUCT_DEFINITIONS %>',
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
						'/o/headless-commerce-admin-catalog/v1.0/products?filter=catalogId eq <%= commercePriceListDisplayContext.getCommerceCatalogId() %>',
getSelectedItems: getSelectedItems,
inputPlaceholder: '<%= LanguageUtil.get(request, "find-a-product") %>',
itemSelectedMessage: '<%= LanguageUtil.get(request, "product-selected") %>',
linkedDatasetsId: [
						'<%= CommercePricingDataSetConstants.COMMERCE_DATA_SET_KEY_PRICE_MODIFIER_PRODUCT_DEFINITIONS %>',
],
itemCreation: false,
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
		fieldName: 'productId',
	},
],
	spritemap: '<%= themeDisplay.getPathThemeImages() %>/lexicon/icons.svg',
	titleLabel: '<%= LanguageUtil.get(request, "add-existing-product") %>',
});