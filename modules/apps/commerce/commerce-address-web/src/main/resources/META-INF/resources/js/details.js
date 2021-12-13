/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

 import {fetch} from 'frontend-js-web';


export default function ({commerceRegionsStarterKey, namespace }) {
	function saveCommerceCountry() {
		submitForm((`${namespace}fm`));
	}



{/* <aui:script use="aui-io-request,aui-parse-content,liferay-notification"> */}
// 	<c:if test="<%= commerceRegionsStarter != null %>">

	const importCommerceRegionsButton = document.getElementById(`${namespace}importCommerceRegionsButton`)
	importCommerceRegionsButton.addEventListener('click', function (event) {
    				var data = {
    					// `${namespace}key`: commerceRegionsStarterKey,
    				};

    				this.attr('disabled', true);

    				A.io.request(
    					'<liferay-portlet:actionURL name="/commerce_country/import_commerce_regions" portletName="<%= portletDisplay.getPortletName() %>" />',
    					{
    						data,
    						on: {
    							success (event, id, obj) {
    								var response = JSON.parse(obj.response);

    								if (!response.success) {
    									A.one(
    										'#<portlet:namespace />importCommerceRegionsButton'
    									).attr('disabled', false);

    									new Liferay.Notification({
    										closeable: true,
    										delay: {
    											hide: 5000,
    											show: 0,
    										},
    										duration: 500,
    										message:
    											'<liferay-ui:message key="an-unexpected-error-occurred" />',
    										render: true,
    										title: '<liferay-ui:message key="danger" />',
    										type: 'danger',
    									});
    								}
    							},
    						},
    					}
    				);
    			}
    		);

}
