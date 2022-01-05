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
CommerceChannel commerceChannel = commerceOrderContentDisplayContext.fetchCommerceChannel();
%>

<commerce-ui:modal-content
	submitButtonLabel='<%= LanguageUtil.get(request, "add-order") %>'
	title='<%= LanguageUtil.format(locale, "select-x", "order-type") %>'
>
	<portlet:actionURL name="/commerce_open_order_content/edit_commerce_order" var="editCommerceOrderURL" />

	<aui:form action="<%= editCommerceOrderURL %>" method="post" name="fm" onSubmit='<%= "event.preventDefault(); " + liferayPortletResponse.getNamespace() + "addOrder();" %>'>
		<aui:input name="<%= Constants.CMD %>" type="hidden" value="<%= Constants.ADD %>" />
		<aui:input name="redirect" type="hidden" value="<%= redirect %>" />

		<aui:select label="order-type" name="commerceOrderTypeId">

			<%
			for (CommerceOrderType orderType : commerceOrderContentDisplayContext.getCommerceOrderTypes()) {
			%>

				<aui:option label="<%= orderType.getName(locale) %>" value="<%= orderType.getCommerceOrderTypeId() %>" />

			<%
			}
			%>

		</aui:select>
	</aui:form>
</commerce-ui:modal-content>

<portlet:renderURL var="editCommerceOrderRenderURL">
	<portlet:param name="mvcRenderCommandName" value="/commerce_open_order_content/edit_commerce_order" />
</portlet:renderURL>

<liferay-frontend:component
	context='<%=
		HashMapBuilder.<String, Object>put(
			"commerceAccountId", commerceOrderContentDisplayContext.getCommerceAccountId()
		).put(
			"commerceChannelId", commerceChannel.getCommerceChannelId()
		).put(
			"commerceCurrencyCode", commerceChannel.getCommerceCurrencyCode()
		).put(
			"editCommerceOrderRenderURL", editCommerceOrderRenderURL.toString()
		).build()
	%>'
	module="js/commerce_order_order_type_modal"
/>