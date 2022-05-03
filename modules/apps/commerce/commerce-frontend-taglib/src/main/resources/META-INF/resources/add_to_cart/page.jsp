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

<%@ include file="/add_to_cart/init.jsp" %>

<%
String spaceDirection = GetterUtil.getBoolean(inline) ? "ml" : "mt";
String spacer = size.equals("sm") ? "1" : "3";

String buttonCssClasses = "btn btn-add-to-cart btn-" + size + " " + spaceDirection + "-" + spacer;

String selectorCssClasses = "form-control quantity-selector form-control-" + size;
String wrapperCssClasses = "add-to-cart-wrapper align-items-center d-flex";

if (GetterUtil.getBoolean(iconOnly)) {
	buttonCssClasses = buttonCssClasses.concat(" icon-only");
}

if (!GetterUtil.getBoolean(inline)) {
	wrapperCssClasses = wrapperCssClasses.concat(" flex-column");
}

if (alignment.equals("center")) {
	wrapperCssClasses = wrapperCssClasses.concat(" align-items-center");
}

if (alignment.equals("full-width")) {
	buttonCssClasses = buttonCssClasses.concat(" btn-block");
	wrapperCssClasses = wrapperCssClasses.concat(" align-items-center");
}

JSONSerializer jsonSerializer = JSONFactoryUtil.createJSONSerializer();
%>

<div class="add-to-cart mb-2" id="<%= addToCartId %>">
	<div class="<%= wrapperCssClasses %>">
		<div class="<%= selectorCssClasses %> skeleton"></div>

		<button class="<%= buttonCssClasses %> skeleton">
			<liferay-ui:message key="add-to-cart" />
		</button>
	</div>
</div>

<liferay-frontend:component
	context='<%=
		HashMapBuilder.<String, Object>put(
			"accountId", commerceAccountId
		).put(
			"addToCartId", addToCartId
		).put(
			"alignment", alignment
		).put(
			"alignment", alignment
		).put(
			"cartId", commerceOrderId
		).put(
			"currencyCode", commerceCurrencyCode
		).put(
			"disabled", disabled
		).put(
			"groupId", commerceChannelGroupId
		).put(
			"iconOnly", iconOnly
		).put(
			"id", commerceChannelId
		).put(
			"inCart", inCart
		).put(
			"inline", inline
		).put(
			"productSettingsModel", productSettingsModel
		).put(
			"quantityDetails", jsonSerializer.serializeDeep(productSettingsModel)
		).put(
			"size", size
		).put(
			"skuId", cpInstanceId
		).put(
			"skuOptions", skuOptions
		).build()
	%>'
	module="js/add_to_cart/page"
/>