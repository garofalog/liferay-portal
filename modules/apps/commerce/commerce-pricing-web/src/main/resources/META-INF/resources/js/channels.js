import {entry as itemFinder} from 'commerce-frontend-js/components/item_finder/entry'
import slugify from 'commerce-frontend-js/utilities/slugify'
import events from 'frontend-taglib-clay/data_set_display/utils/eventsDefinitions'
import ServiceProvider from 'commerce-frontend-js/ServiceProvider/index'

var CommerceDiscountChannelsResource = ServiceProvider.default.AdminPricingAPI(
	'v2'
);

var id = <%= commerceDiscountId %>;
var discountExternalReferenceCode =
'<%= commerceDiscount.getExternalReferenceCode() %>';

function selectItem(channel) {
var channelData = {
	channelExternalReferenceCode: channel.externalReferenceCode,
	channelId: channel.id,
	discountExternalReferenceCode: discountExternalReferenceCode,
	discountId: id,
};

return CommerceDiscountChannelsResource.addDiscountChannel(id, channelData)
						.then(function () {
Liferay.fire(events.UPDATE_DATASET_DISPLAY, {
id:
'<%= CommercePricingDataSetConstants.COMMERCE_DATA_SET_KEY_DISCOUNT_QUALIFIER_CHANNELS %>',
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
						'<%= CommercePricingDataSetConstants.COMMERCE_DATA_SET_KEY_DISCOUNT_QUALIFIER_CHANNELS %>',
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