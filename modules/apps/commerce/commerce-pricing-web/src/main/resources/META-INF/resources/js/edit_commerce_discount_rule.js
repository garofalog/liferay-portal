import {notifications as NotificationsUtils} from 'commerce-frontend-js/utilities/notifications'
import slugify from 'commerce-frontend-js/utilities/slugify'
import events from 'frontend-taglib-clay/data_set_display/utils/eventsDefinitions'
import ServiceProvider from 'commerce-frontend-js/ServiceProvider/index'

var CommerceDiscountRuleResource = ServiceProvider.default.AdminPricingAPI(
	'v2'
);

Liferay.provide(
	window,
	'<portlet:namespace />apiSubmit',
	function () {
		var form = document.getElementById('<portlet:namespace />fm');
		var name = form.querySelector('#<portlet:namespace />name').value;

		var typeSettings = form.querySelector(
			'#<portlet:namespace />typeSettings'
		).value;

		var discountRuleData = {
			name: name,
			type: '<%= commerceDiscountRule.getType() %>',
			typeSettings: typeSettings,
		};

		return CommerceDiscountRuleResource.updateDiscountRule(
			'<%= commerceDiscountRule.getCommerceDiscountRuleId() %>',
			discountRuleData
		)
			.then(function () {
				NotificationUtils.showNotification(
					'<liferay-ui:message key="your-request-completed-successfully" />'
				);

				window.parent.Liferay.fire(events.UPDATE_DATASET_DISPLAY, {
					id:
						'<%= CommercePricingDataSetConstants.COMMERCE_DATA_SET_KEY_DISCOUNT_RULES %>',
				});

				return;
			})
			.catch(function () {
				alert(
					'<liferay-ui:message key="your-request-failed-to-complete" />'
				);

				return;
			});
	},
	['liferay-portlet-url']
);
