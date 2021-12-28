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
CommerceContext commerceContext = (CommerceContext)request.getAttribute(CommerceWebKeys.COMMERCE_CONTEXT);

BaseAddressCheckoutStepDisplayContext baseAddressCheckoutStepDisplayContext = (BaseAddressCheckoutStepDisplayContext)request.getAttribute(CommerceCheckoutWebKeys.COMMERCE_CHECKOUT_STEP_DISPLAY_CONTEXT);

List<CommerceAddress> commerceAddresses = baseAddressCheckoutStepDisplayContext.getCommerceAddresses();

String paramName = baseAddressCheckoutStepDisplayContext.getParamName();

long commerceAddressId = BeanParamUtil.getLong(baseAddressCheckoutStepDisplayContext.getCommerceOrder(), request, paramName);

if (commerceAddressId == 0) {
	commerceAddressId = baseAddressCheckoutStepDisplayContext.getDefaultCommerceAddressId();
}

String selectLabel = "choose-" + baseAddressCheckoutStepDisplayContext.getTitle();

CommerceOrder commerceOrder = commerceContext.getCommerceOrder();

if (commerceOrder.isGuestOrder()) {
	commerceAddressId = 0;
}

CommerceAddress currentCommerceAddress = baseAddressCheckoutStepDisplayContext.getCommerceAddress(commerceAddressId);
%>

<div class="form-group-autofit">
	<c:if test="<%= !commerceOrder.isGuestOrder() %>">
		<aui:select label="<%= selectLabel %>" name="commerceAddress" name="commerceAddress" wrapperCssClass="commerce-form-group-item-row form-group-item">
			<aui:option label="add-new-address" value="0" />

			<%
			boolean addressWasFound = false;

			for (CommerceAddress commerceAddress : commerceAddresses) {
				boolean selectedAddress = commerceAddressId == commerceAddress.getCommerceAddressId();

				if (selectedAddress) {
					addressWasFound = true;
				}
			%>

				<aui:option data-city="<%= HtmlUtil.escapeAttribute(commerceAddress.getCity()) %>" data-country="<%= HtmlUtil.escapeAttribute(String.valueOf(commerceAddress.getCountryId())) %>" data-name="<%= HtmlUtil.escapeAttribute(commerceAddress.getName()) %>" data-phone-number="<%= HtmlUtil.escapeAttribute(commerceAddress.getPhoneNumber()) %>" data-region="<%= HtmlUtil.escapeAttribute(String.valueOf(commerceAddress.getRegionId())) %>" data-street-1="<%= HtmlUtil.escapeAttribute(commerceAddress.getStreet1()) %>" data-street-2="<%= Validator.isNotNull(commerceAddress.getStreet2()) ? HtmlUtil.escapeAttribute(commerceAddress.getStreet2()) : StringPool.BLANK %>" data-street-3="<%= Validator.isNotNull(commerceAddress.getStreet3()) ? HtmlUtil.escapeAttribute(commerceAddress.getStreet3()) : StringPool.BLANK %>" data-zip="<%= HtmlUtil.escapeAttribute(commerceAddress.getZip()) %>" label="<%= commerceAddress.getName() %>" selected="<%= selectedAddress %>" value="<%= commerceAddress.getCommerceAddressId() %>" />

			<%
			}
			%>

			<c:if test="<%= (currentCommerceAddress != null) && !addressWasFound %>">
				<aui:option label="<%= HtmlUtil.escapeAttribute(currentCommerceAddress.getName()) %>" selected="<%= true %>" value="<%= currentCommerceAddress.getCommerceAddressId() %>" />
			</c:if>
		</aui:select>
	</c:if>

	<aui:input disabled="<%= commerceAddresses.isEmpty() ? true : false %>" name="<%= paramName %>" type="hidden" value="<%= commerceAddressId %>" />

	<aui:input name="newAddress" type="hidden" value='<%= (commerceAddressId > 0) ? "0" : "1" %>' />
</div>

<liferay-ui:error exception="<%= CommerceAddressCityException.class %>" message="please-enter-a-valid-city" />
<liferay-ui:error exception="<%= CommerceAddressCountryException.class %>" message="please-enter-a-valid-country" />
<liferay-ui:error exception="<%= CommerceAddressNameException.class %>" message="please-enter-a-valid-name" />
<liferay-ui:error exception="<%= CommerceAddressStreetException.class %>" message="please-enter-a-valid-street" />
<liferay-ui:error exception="<%= CommerceAddressZipException.class %>" message="please-enter-a-valid-zip" />
<liferay-ui:error exception="<%= CommerceOrderBillingAddressException.class %>" message="please-enter-a-valid-address" />
<liferay-ui:error exception="<%= CommerceOrderShippingAddressException.class %>" message="please-enter-a-valid-address" />

<aui:model-context bean="<%= baseAddressCheckoutStepDisplayContext.getCommerceAddress(commerceAddressId) %>" model="<%= CommerceAddress.class %>" />

<div class="address-fields">
	<div class="form-group-autofit">
		<aui:input disabled="<%= commerceAddressId > 0 %>" label="" name="name" placeholder="name" wrapperCssClass="form-group-item" />

		<aui:input disabled="<%= commerceAddressId > 0 %>" label="" name="phoneNumber" placeholder="phone-number" wrapperCssClass="form-group-item" />
	</div>

	<div class="form-group-autofit">
		<aui:input disabled="<%= commerceAddressId > 0 %>" label="" name="street1" placeholder="address" wrapperCssClass="form-group-item" />
		
		<aui:select label="country" name="countryTwoLettersISOCode" />

	</div>

	<c:choose>
		<c:when test="<%= (commerceAddressId > 0) && (!Validator.isBlank(currentCommerceAddress.getStreet2()) || !Validator.isBlank(currentCommerceAddress.getStreet3())) %>">
			<div class="form-group-autofit">
				<aui:input disabled="<%= commerceAddressId > 0 %>" label="" name="street2" placeholder="address-2" wrapperCssClass="form-group-item" />

				<aui:input disabled="<%= commerceAddressId > 0 %>" label="" name="street3" placeholder="address-3" wrapperCssClass="form-group-item" />
			</div>
		</c:when>
		<c:otherwise>
			<div class="add-street-link form-group-autofit">
				<aui:a disabled="<%= commerceAddressId > 0 %>" href="javascript:;" label="+-add-address-line" name='<%= liferayPortletResponse.getNamespace() + "addStreetAddress" %>' />
			</div>

			<div class="add-street-fields form-group-autofit hide">
				<aui:input disabled="<%= commerceAddressId > 0 %>" label="" name="street2" placeholder="address-2" wrapperCssClass="form-group-item" />

				<aui:input disabled="<%= commerceAddressId > 0 %>" label="" name="street3" placeholder="address-3" wrapperCssClass="form-group-item" />
			</div>
		</c:otherwise>
	</c:choose>

	<div class="form-group-autofit">
		<aui:input disabled="<%= commerceAddressId > 0 %>" label="" name="zip" placeholder="zip" wrapperCssClass="form-group-item" />

		<aui:input disabled="<%= commerceAddressId > 0 %>" label="" name="city" placeholder="city" wrapperCssClass="form-group-item" />
		
		<aui:select label="region" name="commerceRegionCode" />

		<aui:input disabled="<%= commerceAddressId > 0 %>" id="commerceRegionIdInput" label="" name="regionId" placeholder="regionId" title="region" wrapperCssClass="d-none form-group-item" />

		<aui:input disabled="<%= commerceAddressId > 0 %>" id="commerceRegionIdName" label="" name="regionId" placeholder="regionName" title="region" wrapperCssClass="d-none form-group-item" />
	</div>

	<div class="form-group-autofit">
		<c:if test="<%= commerceOrder.isGuestOrder() %>">
			<aui:input name="email" type="text" wrapperCssClass="form-group-item">
				<aui:validator name="email" />
				<aui:validator name="required" />
			</aui:input>
		</c:if>
	</div>
</div>

<c:if test="<%= Objects.equals(CommerceCheckoutWebKeys.SHIPPING_ADDRESS_PARAM_NAME, paramName) %>">
	<div class="shipping-as-billing">
		<aui:input checked="<%= baseAddressCheckoutStepDisplayContext.isShippingUsedAsBilling() || (commerceAddressId == 0) %>" disabled="<%= false %>" label="use-shipping-address-as-billing-address" name="use-as-billing" type="checkbox" />
	</div>
</c:if>

<liferay-frontend:component
	context='<%=
		HashMapBuilder.<String, Object>put(
			"commerceRegionCode", BeanParamUtil.getLong(currentCommerceAddress, request, "regionId", 0)
		).put(
			"companyId", company.getCompanyId()
		).put(
			"countryTwoLettersISOCode", BeanParamUtil.getLong(currentCommerceAddress, request, "countryId", 0)
		).put(
			"isShippingUsedAsBilling", baseAddressCheckoutStepDisplayContext.isShippingUsedAsBilling()
		).build()
	%>'
	module="js/checkout_step/address"
/>
