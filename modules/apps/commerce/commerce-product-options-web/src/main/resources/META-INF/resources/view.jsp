<%@ page import="com.liferay.commerce.product.options.web.internal.frontend.CommerceOptionDataSetConstants" %>

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
CPOptionDisplayContext cpOptionDisplayContext = (CPOptionDisplayContext)request.getAttribute(WebKeys.PORTLET_DISPLAY_CONTEXT);

PortletURL portletURL = renderResponse.createRenderURL();
%>

<<<<<<< HEAD
<clay:navigation-bar
	inverted="<%= false %>"
	navigationItems="<%= Collections.singletonList(navigationItem) %>"
/>

<div class="container-fluid container-fluid-max-xl" id="<portlet:namespace />CPOptionsEditor">

</div>

<portlet:resourceURL id="/cp_options/cp_options" var="cpOptionsURL">
</portlet:resourceURL>

<liferay-portlet:renderURL var="cpOptionURL" windowState="<%= LiferayWindowState.EXCLUSIVE.toString() %>">
	<portlet:param name="mvcRenderCommandName" value="/cp_options/edit_cp_option" />
</liferay-portlet:renderURL>

<portlet:resourceURL id="/cp_options/cp_option_values" var="cpOptionValuesURL">
</portlet:resourceURL>

<liferay-portlet:renderURL var="cpOptionValueURL" windowState="<%= LiferayWindowState.EXCLUSIVE.toString() %>">
	<portlet:param name="mvcRenderCommandName" value="/cp_options/edit_cp_option_value" />
</liferay-portlet:renderURL>

<aui:script require='<%= npmResolver.resolveModuleName("commerce-product-options-web/CPOptionsEditor.es") + " as CPOptionsEditor" %>'>
	var cpOptionsEditor = new CPOptionsEditor.default(
		{
			hasEditPermission: <%= PortalPermissionUtil.contains(permissionChecker, CPActionKeys.ADD_COMMERCE_PRODUCT_OPTION) %>,
			namespace: '<portlet:namespace />',
			optionURL: '<%= cpOptionURL %>',
			optionValueURL: '<%= cpOptionValueURL %>',
			optionValuesURL: '<%= cpOptionValuesURL %>',
			optionsURL: '<%= cpOptionsURL %>',
			pathThemeImages: '<%= themeDisplay.getPathThemeImages() %>',
			successMessage:
				'<liferay-ui:message key="your-request-completed-successfully" />',
		},
		'#<portlet:namespace />CPOptionsEditor'
	);
</aui:script>
=======
<div class="pt-4" id="<portlet:namespace />optionsContainer">
	<aui:form action="<%= portletURL.toString() %>" cssClass="container-fluid container-fluid-max-xl" method="post" name="fm">
		<clay:headless-data-set-display
			apiURL="/o/headless-commerce-admin-catalog/v1.0/options"
			clayDataSetActionDropdownItems="<%= cpOptionDisplayContext.getOptionClayDataSetActionDropdownItems() %>"
			creationMenu="<%= cpOptionDisplayContext.getCreationMenu() %>"
			id="<%= CommerceOptionDataSetConstants.COMMERCE_DATA_SET_KEY_OPTIONS %>"
			itemsPerPage="<%= 10 %>"
			namespace="<%= liferayPortletResponse.getNamespace() %>"
			pageNumber="<%= 1 %>"
			portletURL="<%= portletURL %>"
			style="stacked"
		/>
	</aui:form>
</div>
>>>>>>> COMMERCE-5362 commerce-product-options-web added and managed headless dataset to CPOption jsp files
