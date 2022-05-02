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

<%@ include file="/coupon_code/init.jsp" %>

<%
CommerceOrder commerceOrder = (CommerceOrder)request.getAttribute("liferay-commerce:coupon-code:commerceOrder");

String couponCode = null;

if (commerceOrder != null) {
	couponCode = commerceOrder.getCouponCode();
}
%>

<c:choose>
	<c:when test="<%= commerceOrder == null %>">
	</c:when>
	<c:when test="<%= Validator.isNotNull(couponCode) %>">
		<div class="coupon-code-header">
			<h5><liferay-ui:message key="coupon-code" /></h5>
		</div>

		<div class="coupon-code-body">
			<h3 class="d-inline"><%= HtmlUtil.escape(couponCode) %></h3>

			<a class="d-inline" href="javascript:;" id="<portlet:namespace />couponCodeIconRemove">
				<liferay-ui:icon
					icon="times"
					markupView="lexicon"
					message="remove"
				/>
			</a>
		</div>
	</c:when>
	<c:otherwise>
		<aui:input label="" name="couponCode" placeholder="enter-promo-code" type="text" />

		<aui:button name="applyCouponCodeButton" type="submit" value="apply" />
	</c:otherwise>
</c:choose>

<liferay-frontend:component
	context='<%=
		HashMapBuilder.<String, Object>put(
			"actionURL", PortalUtil.getPortalURL(request) + "/o/commerce-ui/order/" + commerceOrder.getCommerceOrderId() + "/coupon-code"
		).build()
	%>'
	module="js/channels"
/>