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
CommerceTermEntryQualifiersDisplayContext commerceTermEntryQualifiersDisplayContext = (CommerceTermEntryQualifiersDisplayContext)request.getAttribute(WebKeys.PORTLET_DISPLAY_CONTEXT);

CommerceTermEntry commerceTermEntry = commerceTermEntryQualifiersDisplayContext.getCommerceTermEntry();
long commerceTermEntryId = commerceTermEntryQualifiersDisplayContext.getCommerceTermEntryId();

String orderTypeQualifiers = ParamUtil.getString(request, "orderTypeQualifiers", commerceTermEntryQualifiersDisplayContext.getActiveOrderTypeEligibility());

boolean hasPermission = commerceTermEntryQualifiersDisplayContext.hasPermission(ActionKeys.UPDATE);
%>

<portlet:actionURL name="/commerce_channels/edit_commerce_channels_qualifiers" var="editCommerceTermEntryQualifiersActionURL" />

<aui:form action="<%= editCommerceTermEntryQualifiersActionURL %>" cssClass="pt-4" method="post" name="fm">
	<aui:input name="<%= Constants.CMD %>" type="hidden" value="<%= (commerceTermEntry == null) ? Constants.ADD : Constants.UPDATE %>" />
	<aui:input name="redirect" type="hidden" value="<%= currentURL %>" />
	<aui:input name="externalReferenceCode" type="hidden" value="<%= commerceTermEntry.getExternalReferenceCode() %>" />
	<aui:input name="commerceTermEntryId" type="hidden" value="<%= commerceTermEntryId %>" />
	<aui:input name="orderTypeQualifiers" type="hidden" value="<%= orderTypeQualifiers %>" />
	<aui:input name="workflowAction" type="hidden" value="<%= String.valueOf(WorkflowConstants.ACTION_SAVE_DRAFT) %>" />

	<liferay-ui:error exception="<%= DuplicateCommerceTermEntryRelException.class %>" message="the-qualifier-is-already-linked" />

	<aui:model-context bean="<%= commerceTermEntry %>" model="<%= CommerceTermEntry.class %>" />

	<div class="row">
		<div class="col-12">
			<commerce-ui:panel
				bodyClasses="flex-fill"
				collapsed="<%= false %>"
				collapsible="<%= false %>"
				title='<%= LanguageUtil.get(request, "channel-eligibility") %>'
			>
				<div class="row">
					<aui:fieldset markupView="lexicon">
						<aui:input checked='<%= Objects.equals(orderTypeQualifiers, "all") %>' label="all-channels" name="qualifiers--channels--" type="radio" value="all" />
						<aui:input checked='<%= Objects.equals(orderTypeQualifiers, "orderTypes") %>' label="specific-channels" name="qualifiers--channels--" type="radio" value="channels" />
					</aui:fieldset>
				</div>
			</commerce-ui:panel>
		</div>
	</div>

	<c:if test='<%= Objects.equals(orderTypeQualifiers, "orderTypes") %>'>
		<%@ include file="/commerce_channels/qualifier/commerce_channels.jspf" %>
	</c:if>
</aui:form>

<liferay-frontend:component
	context='<%=
		HashMapBuilder.<String, Object>put(
			"currentURL", currentURL
		).put(
			"searchParam", "orderTypeQualifiers"
		).put(
			"selector", "qualifiers--orderType--"
		).build()
	%>'
	module="js/qualifiers"
/>