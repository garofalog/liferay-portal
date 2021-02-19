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
CPDefinitionOptionRelDisplayContext cpDefinitionOptionRelDisplayContext = (CPDefinitionOptionRelDisplayContext)request.getAttribute(WebKeys.PORTLET_DISPLAY_CONTEXT);

CPDefinition cpDefinition = cpDefinitionOptionRelDisplayContext.getCPDefinition();
%>

<c:if test="<%= CommerceCatalogPermission.contains(permissionChecker, cpDefinitionOptionRelDisplayContext.getCPDefinition(), ActionKeys.VIEW) %>">
	<div class="pt-4" id="<portlet:namespace />productOptionRelsContainer">
		<div id="item-finder-root"></div>

		<liferay-frontend:component
			module="js/definition_option_rels"
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
			title='<%= LanguageUtil.get(request, "options") %>'
		>
			<clay:data-set-display
				contextParams='<%=
					HashMapBuilder.<String, String>put(
						"cpDefinitionId", String.valueOf(cpDefinitionOptionRelDisplayContext.getCPDefinitionId())
					).build()
				%>'
				dataProviderKey="<%= CommerceProductDataSetConstants.COMMERCE_DATA_SET_KEY_PRODUCT_OPTIONS %>"
				id="<%= CommerceProductDataSetConstants.COMMERCE_DATA_SET_KEY_PRODUCT_OPTIONS %>"
				itemsPerPage="<%= 10 %>"
				namespace="<%= liferayPortletResponse.getNamespace() %>"
				pageNumber="<%= 1 %>"
				portletURL="<%= currentURLObj %>"
			/>
		</commerce-ui:panel>
	</div>
</c:if>