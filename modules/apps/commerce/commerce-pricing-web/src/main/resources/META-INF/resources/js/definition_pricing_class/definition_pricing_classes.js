import {entry as itemFinder} from 'commerce-frontend-js/components/item_finder/entry'
import slugify from 'commerce-frontend-js/utilities/slugify'
import events from 'frontend-taglib-clay/data_set_display/utils/eventsDefinitions'
import utilities from 'commerce-frontend-js/utilities/index'

var headers = utilities.fetchParams.headers;
var productId = <%= cpDefinition.getCProductId() %>;
var productExternalReferenceCode = '<%= cProduct.getExternalReferenceCode() %>';

function selectItem(productPricingClass) {
return Liferay.Util.fetch(
					'/o/headless-commerce-admin-catalog/v1.0/product-groups/' +
productPricingClass.id +
						'/product-group-products/',
					{
body: JSON.stringify({
productExternalReferenceCode: productExternalReferenceCode,
productId: productId,
productGroupExternalReferenceCode:
productPricingClass.externalReferenceCode,
productGroupId: productPricingClass.id,
						}),
headers: headers,
method: 'POST',
					}
				).then(function (response) {
if (!response.ok) {
return response.json().then(function (data) {
return Promise.reject(data.errorDescription);
						});
					}
Liferay.fire(events.UPDATE_DATASET_DISPLAY, {
id:
'<%= CommercePricingDataSetConstants.COMMERCE_DATA_SET_KEY_PRODUCT_PRICING_CLASSES %>',
					});
return null;
				});
			}

function addNewItem(name) {
var nameDefinition = {};

nameDefinition[themeDisplay.getLanguageId()] = name;

if (themeDisplay.getLanguageId() !== themeDisplay.getDefaultLanguageId()) {
nameDefinition[themeDisplay.getDefaultLanguageId()] = name;
				}

return Liferay.Util.fetch(
					'/o/headless-commerce-admin-catalog/v1.0/product-groups',
					{
						body: JSON.stringify({
							title: nameDefinition,
						}),
						headers: headers,
						method: 'POST',
					}
				)
					.then(function (response) {
						if (response.ok) {
							return response.json();
						}

						return response.json().then(function (data) {
							return Promise.reject(data.message);
						});
					})
					.then(selectItem);
			}

			function getSelectedItems() {
				return Promise.resolve([]);
			}

			itemFinder.default('itemFinder', 'item-finder-root', {
				apiUrl: '/o/headless-commerce-admin-catalog/v1.0/product-groups',
				createNewItemLabel: '<%= LanguageUtil.get(request, "create-new") %>',
				getSelectedItems: getSelectedItems,
				inputPlaceholder:
					'<%= LanguageUtil.get(request, "find-or-create-a-product-group") %>',
				itemSelectedMessage:
					'<%= LanguageUtil.get(request, "product-group-selected") %>',
				itemsKey: 'id',
				linkedDatasetsId: [
					'<%= CommercePricingDataSetConstants.COMMERCE_DATA_SET_KEY_PRODUCT_PRICING_CLASSES %>',
				],
				onItemCreated: addNewItem,
				onItemSelected: selectItem,
				pageSize: 10,
				panelHeaderLabel:
					'<%= LanguageUtil.get(request, "select-product-group") %>',
				portletId: '<%= portletDisplay.getRootPortletId() %>',
				schema: [
					{
						fieldName: ['title', 'LANG'],
					},
				],
				spritemap: '<%= themeDisplay.getPathThemeImages() %>/lexicon/icons.svg',
				titleLabel:
					'<%= LanguageUtil.get(request, "add-existing-product-group") %>',
			});