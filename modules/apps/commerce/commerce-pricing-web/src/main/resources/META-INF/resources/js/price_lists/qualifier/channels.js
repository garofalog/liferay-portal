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



var CommercePriceListChannelsResource = ServiceProvider.default.AdminPricingAPI(
	'v2'
);

var id = <%= commercePriceListId %>;
var priceListExternalReferenceCode =
'<%= commercePriceList.getExternalReferenceCode() %>';

function selectItem(channel) {
var channelData = {
	channelExternalReferenceCode: channel.externalReferenceCode,
	channelId: channel.id,
	priceListExternalReferenceCode: priceListExternalReferenceCode,
	priceListId: id,
};

return CommercePriceListChannelsResource.addPriceListChannel(
id,
channelData
)
						.then(function () {
Liferay.fire(events.UPDATE_DATASET_DISPLAY, {
id:
'<%= CommercePricingDataSetConstants.COMMERCE_DATA_SET_KEY_PRICE_LIST_QUALIFIER_CHANNELS %>',
							});
						})
						.catch(function (error) {
return Promise.reject(error);
						});
				}

function getSelectedItems() {
return Promise.resolve([]);
				}

itemFinder.default('itemFinder', 'item-finder-root-channel', {
					apiUrl: '/o/headless-commerce-admin-channel/v1.0/channels',
					getSelectedItems: getSelectedItems,
					inputPlaceholder: '<%= LanguageUtil.get(request, "find-a-channel") %>',
					itemSelectedMessage: '<%= LanguageUtil.get(request, "channel-selected") %>',
					linkedDatasetsId: [
						'<%= CommercePricingDataSetConstants.COMMERCE_DATA_SET_KEY_PRICE_LIST_QUALIFIER_CHANNELS %>',
					],
					itemCreation: false,
					itemsKey: 'id',
					onItemSelected: selectItem,
					pageSize: 10,
					panelHeaderLabel: '<%= LanguageUtil.get(request, "add-channels") %>',
					portletId: '<%= portletDisplay.getRootPortletId() %>',
					schema: [
						{
							fieldName: 'name',
						},
					],
					spritemap: '<%= themeDisplay.getPathThemeImages() %>/lexicon/icons.svg',
					titleLabel: '<%= LanguageUtil.get(request, "add-existing-channel") %>',
				});