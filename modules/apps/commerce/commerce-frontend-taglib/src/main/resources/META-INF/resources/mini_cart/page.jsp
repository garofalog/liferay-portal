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

<%@ include file="/mini_cart/init.jsp" %>

<div class="cart-root" id="<%= miniCartId %>"></div>

<liferay-frontend:component
	context='<%=
		HashMapBuilder.<String, Object>put(
			"cartViews", cartViews
		).put(
			"checkoutURL", HtmlUtil.escapeJS(checkoutURL)
		).put(
			"displayDiscountLevels", displayDiscountLevels
		).put(
			"displayTotalItemsQuantity", displayTotalItemsQuantity
		).put(
			"itemsQuantity", itemsQuantity
		).put(
			"labels", labels
		).put(
			"miniCartId", miniCartId
		).put(
			"orderDetailURL", HtmlUtil.escapeJS(orderDetailURL)
		).put(
			"orderId", orderId
		).put(
			"productURLSeparator", HtmlUtil.escapeJS(productURLSeparator)
		).put(
			"siteDefaultURL", HtmlUtil.escapeJS(siteDefaultURL)
		).put(
			"spritemap", HtmlUtil.escapeJS(spritemap)
		).put(
			"toggleable", toggleable
		).build()
	%>'
	module="js/mini_cart/page"
/>