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
CPDefinitionPricingClassDisplayContext cpDefinitionPricingClassDisplayContext = (CPDefinitionPricingClassDisplayContext)request.getAttribute(WebKeys.PORTLET_DISPLAY_CONTEXT);

CPDefinition cpDefinition = cpDefinitionPricingClassDisplayContext.getCPDefinition();

CProduct cProduct = cpDefinition.getCProduct();
%>

<c:if test="<%= cpDefinitionPricingClassDisplayContext.hasPermission(permissionChecker, cpDefinition, ActionKeys.VIEW) %>">
	<div class="pt-4" id="<portlet:namespace />productPricingClassRelsContainer">
		<div id="item-finder-root"></div>

		<liferay-frontend:component
			module="js/definition_pricing_class/defintion_pricing_classes"
<%--			context='<%=--%>
<%--				HashMapBuilder.<String, Object>put(--%>
<%--					"fieldValues", fieldValues--%>
<%--				).put(--%>
<%--					"cpDefinitionId", cpDefinitionId--%>
<%--				).put(--%>
<%--					"actionPublish", WorkflowConstants.ACTION_PUBLISH--%>
<%--				).build()--%>
<%--			%>'--%>
		/>

		<commerce-ui:panel
			bodyClasses="p-0"
			elementClasses="mt-4"
			title='<%= LanguageUtil.get(request, "product-groups") %>'
		>
			<clay:data-set-display
				contextParams='<%=
					HashMapBuilder.<String, String>put(
						"cpDefinitionId", String.valueOf(cpDefinitionPricingClassDisplayContext.getCPDefinitionId())
					).build()
				%>'
				dataProviderKey="<%= CommercePricingDataSetConstants.COMMERCE_DATA_SET_KEY_PRODUCT_PRICING_CLASSES %>"
				id="<%= CommercePricingDataSetConstants.COMMERCE_DATA_SET_KEY_PRODUCT_PRICING_CLASSES %>"
				itemsPerPage="<%= 10 %>"
				namespace="<%= liferayPortletResponse.getNamespace() %>"
				pageNumber="<%= 1 %>"
				portletURL="<%= currentURLObj %>"
			/>
		</commerce-ui:panel>
	</div>
</c:if>