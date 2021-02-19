import {entry as itemFinder} from 'commerce-frontend-js/components/item_finder/entry'
import slugify from 'commerce-frontend-js/utilities/slugify'
import events from 'frontend-taglib-clay/data_set_display/utils/eventsDefinitions'
import ServiceProvider from 'commerce-frontend-js/ServiceProvider/index'

var CommerceDiscountAccountGroupsResource = ServiceProvider.default.AdminPricingAPI(
	'v2'
);

var discountExternalReferenceCode =
	'<%= commerceDiscount.getExternalReferenceCode() %>';
var id = <%= commerceDiscountId %>;

function selectItem(accountGroup) {
var accountGroupData = {
	accountGroupExternalReferenceCode: accountGroup.externalReferenceCode,
	accountGroupId: accountGroup.id,
	discountExternalReferenceCode: discountExternalReferenceCode,
	discountId: id,
};

return CommerceDiscountAccountGroupsResource.addDiscountAccountGroup(
id,
accountGroupData
)
						.then(function () {
Liferay.fire(events.UPDATE_DATASET_DISPLAY, {
id:
'<%= CommercePricingDataSetConstants.COMMERCE_DATA_SET_KEY_DISCOUNT_QUALIFIER_ACCOUNT_GROUPS %>',
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
					apiUrl: '/o/headless-commerce-admin-account/v1.0/accountGroups/',
getSelectedItems: getSelectedItems,
inputPlaceholder:
'<%= LanguageUtil.get(request, "find-an-account-group") %>',
itemCreation: false,
itemSelectedMessage:
'<%= LanguageUtil.get(request, "account-group-selected") %>',
itemsKey: 'id',
linkedDatasetsId: [
						'<%= CommercePricingDataSetConstants.COMMERCE_DATA_SET_KEY_DISCOUNT_QUALIFIER_ACCOUNT_GROUPS %>',
],
onItemSelected: selectItem,
	pageSize: 10,
	panelHeaderLabel: '<%= LanguageUtil.get(request, "add-account-groups") %>',
	portletId: '<%= portletDisplay.getRootPortletId() %>',
	schema: [
	{
		fieldName: 'name',
	},
],
	spritemap: '<%= themeDisplay.getPathThemeImages() %>/lexicon/icons.svg',
	titleLabel:
'<%= LanguageUtil.get(request, "add-existing-account-group") %>',
});