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
CommercePriceListDisplayContext commercePriceListDisplayContext = (CommercePriceListDisplayContext)request.getAttribute(WebKeys.PORTLET_DISPLAY_CONTEXT);

CommercePriceModifier commercePriceModifier = commercePriceListDisplayContext.getCommercePriceModifier();
long commercePriceModifierId = commercePriceListDisplayContext.getCommercePriceModifierId();
%>

<c:if test="<%= commercePriceListDisplayContext.hasPermission(commercePriceListDisplayContext.getCommercePriceListId(), ActionKeys.UPDATE) %>">
	<div class="row">
		<div class="col-12">
			<div id="item-finder-root"></div>

			<liferay-frontend:component
				module="js/price_lists/price_modifier/categories.js"
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
		</div>

		<div class="col-12">
			<commerce-ui:panel
				bodyClasses="p-0"
				title='<%= LanguageUtil.get(request, "categories") %>'
			>
				<clay:headless-data-set-display
					apiURL="<%= commercePriceListDisplayContext.getPriceModifierCategoriesApiUrl() %>"
					clayDataSetActionDropdownItems="<%= commercePriceListDisplayContext.getPriceModifierCategoryClayDataSetActionDropdownItems() %>"
					formId="fm"
					id="<%= CommercePricingDataSetConstants.COMMERCE_DATA_SET_KEY_PRICE_MODIFIER_CATEGORIES %>"
					itemsPerPage="<%= 10 %>"
					namespace="<%= liferayPortletResponse.getNamespace() %>"
					pageNumber="<%= 1 %>"
					portletURL="<%= currentURLObj %>"
				/>
			</commerce-ui:panel>
		</div>
	</div>
</c:if>