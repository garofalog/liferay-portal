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
String redirect = ParamUtil.getString(request, "redirect");

String backURL = ParamUtil.getString(request, "backURL", redirect);

CommerceInventoryWarehousesDisplayContext commerceInventoryWarehousesDisplayContext = (CommerceInventoryWarehousesDisplayContext)request.getAttribute(WebKeys.PORTLET_DISPLAY_CONTEXT);

CommerceInventoryWarehouse commerceInventoryWarehouse = commerceInventoryWarehousesDisplayContext.getCommerceInventoryWarehouse();

String countryTwoLettersISOCode = BeanParamUtil.getString(commerceInventoryWarehouse, request, "countryTwoLettersISOCode");

String commerceRegionCode = BeanParamUtil.getString(commerceInventoryWarehouse, request, "commerceRegionCode");

if (Validator.isNotNull(backURL)) {
	portletDisplay.setShowBackIcon(true);
	portletDisplay.setURLBack(backURL);
}
%>

<portlet:actionURL name="/commerce_inventory_warehouse/edit_commerce_inventory_warehouse" var="editCommerceInventoryWarehouseActionURL" />

<aui:form action="<%= editCommerceInventoryWarehouseActionURL %>" cssClass="container-fluid container-fluid-max-xl" method="post" name="fm">
	<aui:input name="<%= Constants.CMD %>" type="hidden" value="<%= (commerceInventoryWarehouse == null) ? Constants.ADD : Constants.UPDATE %>" />
	<aui:input name="redirect" type="hidden" value="<%= redirect %>" />
	<aui:input name="commerceInventoryWarehouseId" type="hidden" value="<%= (commerceInventoryWarehouse == null) ? 0 : commerceInventoryWarehouse.getCommerceInventoryWarehouseId() %>" />
	<aui:input name="commerceChannelIds" type="hidden" />
	<aui:input name="mvccVersion" type="hidden" value="<%= (commerceInventoryWarehouse == null) ? 0 : commerceInventoryWarehouse.getMvccVersion() %>" />

	<%-- form-navigator --%>
</aui:form>

<liferay-ui:error exception="<%= CommerceInventoryWarehouseActiveException.class %>" message="please-add-geolocation-information-to-the-warehouse-to-activate" />
<liferay-ui:error exception="<%= CommerceInventoryWarehouseNameException.class %>" message="please-enter-a-valid-name" />
<liferay-ui:error exception="<%= MVCCException.class %>" message="this-item-is-no-longer-valid-please-try-again" />

<aui:model-context bean="<%= commerceInventoryWarehouse %>" model="<%= CommerceInventoryWarehouse.class %>" />

<div class="container">
	<aui:form action="" cssClass="pt-4" method="post" name="fm">
		<div class="mt-4 row">
			<div class="col-lg-6">
				<commerce-ui:panel
					title='<%= LanguageUtil.get(request, "details") %>'
				>
					<aui:input name="name" required="<%= true %>" />

					<aui:input name="description" />

					<aui:input checked="<%= (commerceInventoryWarehouse == null) ? false : commerceInventoryWarehouse.isActive() %>" inlineLabel="right" labelCssClass="simple-toggle-switch" name='<%= LanguageUtil.get(request, "make-active") %>' type="toggle-switch" />
				</commerce-ui:panel>
			</div>

			<div class="col-lg-6">
				<commerce-ui:panel
					bodyClasses="flex-fill"
					title='<%= LanguageUtil.get(request, "geolocation") %>'
				>
					<aui:input name="latitude" />

					<aui:input name="longitude" />
				</commerce-ui:panel>
			</div>

			<div class="col">
				<commerce-ui:panel
					title='<%= LanguageUtil.get(request, "address") %>'
				>
					<div class="row">
						<div class="col-lg-6">
							<aui:input name="street1" />

							<aui:input name="street3" />

							<aui:select label="region" name="commerceRegionCode" />

							<aui:input name="city" />
						</div>

						<div class="col-lg-6">
							<aui:input name="street2" />

							<aui:select label="country" name="countryTwoLettersISOCode" />

							<aui:input label="postal-code" name="zip" />
						</div>
					</div>
				</commerce-ui:panel>
			</div>
		</div>
	</aui:form>
</div>

<liferay-frontend:component
	context='<%=
		HashMapBuilder.<String, Object>put(
			"commerceRegionCode", commerceRegionCode
		).put(
			"companyId", company.getCompanyId()
		).put(
			"countryTwoLettersISOCode", HtmlUtil.escape(countryTwoLettersISOCode)
		).build()
	%>'
	module="js/warehouseAddress"
/>