<%--
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
--%>

<%@ include file="/init.jsp" %>

<%
CommerceInventoryWarehousesDisplayContext commerceInventoryWarehousesDisplayContext = (CommerceInventoryWarehousesDisplayContext)request.getAttribute(WebKeys.PORTLET_DISPLAY_CONTEXT);
%>

<c:if test="<%= commerceInventoryWarehousesDisplayContext.hasManageCommerceInventoryWarehousePermission() %>">

	<%
	String countryTwoLettersIsoCode = commerceInventoryWarehousesDisplayContext.getCountryTwoLettersIsoCode();
	List<ManagementBarFilterItem> managementBarFilterItems = commerceInventoryWarehousesDisplayContext.getManagementBarFilterItems();

	String managementBarFilterValue = null;

	if (Validator.isNotNull(countryTwoLettersIsoCode)) {
		Country country = commerceInventoryWarehousesDisplayContext.getCountry(countryTwoLettersIsoCode);

		for (ManagementBarFilterItem managementBarFilterItem : managementBarFilterItems) {
			if (country.getCountryId() == Long.valueOf(managementBarFilterItem.getId())) {
				managementBarFilterValue = managementBarFilterItem.getLabel();

				break;
			}
		}
	}
	%>

	<liferay-ui:error exception="<%= CommerceGeocoderException.class %>">
		<liferay-ui:message arguments="<%= HtmlUtil.escape(errorException.toString()) %>" key="an-unexpected-error-occurred-while-invoking-the-geolocation-service-x" translateArguments="<%= false %>" />
	</liferay-ui:error>

	<clay:headless-data-set-display
		apiURL="/o/headless-commerce-admin-inventory/v1.0/warehouses"
		bulkActionDropdownItems="<%= commerceInventoryWarehousesDisplayContext.getBulkActionDropdownItems() %>"
		clayDataSetActionDropdownItems="<%= commerceInventoryWarehousesDisplayContext.getClayDataSetActionDropdownItems() %>"
		creationMenu="<%= commerceInventoryWarehousesDisplayContext.getCreationMenu() %>"
		formName="fm"
		id="warehouseId"
		itemsPerPage="<%= 10 %>"
		namespace="<%= liferayPortletResponse.getNamespace() %>"
		pageNumber="<%= 1 %>"
		portletURL="<%= commerceInventoryWarehousesDisplayContext.getPortletURL() %>"
		selectedItemsKey="id"
		selectionType="multiple"
		style="fluid"
	/>

</c:if>