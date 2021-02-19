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
CommerceDiscountRuleDisplayContext commerceDiscountRuleDisplayContext = (CommerceDiscountRuleDisplayContext)request.getAttribute(WebKeys.PORTLET_DISPLAY_CONTEXT);

CommerceDiscountRule commerceDiscountRule = commerceDiscountRuleDisplayContext.getCommerceDiscountRule();

String type = BeanParamUtil.getString(commerceDiscountRule, request, "type");
%>

<portlet:actionURL name="/commerce_discount/edit_commerce_discount_rule" var="editCommerceDiscountRuleActionURL" />

<commerce-ui:side-panel-content
	title='<%= LanguageUtil.get(request, "edit-rule") %>'
>
	<aui:form action="<%= editCommerceDiscountRuleActionURL %>" method="post" name="fm" onSubmit='<%= "event.preventDefault(); " + liferayPortletResponse.getNamespace() + "apiSubmit();" %>'>
		<aui:input name="<%= Constants.CMD %>" type="hidden" value="<%= (commerceDiscountRule == null) ? Constants.ADD : Constants.UPDATE %>" />
		<aui:input name="redirect" type="hidden" value="<%= currentURL %>" />
		<aui:input name="commerceDiscountId" type="hidden" value="<%= commerceDiscountRule.getCommerceDiscountId() %>" />
		<aui:input name="commerceDiscountRuleId" type="hidden" value="<%= commerceDiscountRule.getCommerceDiscountRuleId() %>" />

		<aui:model-context bean="<%= commerceDiscountRule %>" model="<%= CommerceDiscountRule.class %>" />

		<div class="row">
			<div class="col-12">
				<commerce-ui:panel
					bodyClasses="flex-fill"
					title='<%= LanguageUtil.get(request, "details") %>'
				>
					<aui:input autoFocus="<%= true %>" name="name" required="<%= true %>" />

					<aui:select disabled="<%= true %>" name="type" required="<%= true %>">

						<%
						for (CommerceDiscountRuleType commerceDiscountRuleType : commerceDiscountRuleDisplayContext.getCommerceDiscountRuleTypes()) {
							String key = commerceDiscountRuleType.getKey();
						%>

							<aui:option label="<%= commerceDiscountRuleType.getLabel(locale) %>" selected="<%= key.equals(commerceDiscountRule.getType()) %>" value="<%= key %>" />

						<%
						}
						%>

					</aui:select>
				</commerce-ui:panel>
			</div>
		</div>

		<div class="row">

			<%
			CommerceDiscountRuleTypeJSPContributor commerceDiscountRuleTypeJSPContributor = commerceDiscountRuleDisplayContext.getCommerceDiscountRuleTypeJSPContributor(type);
			%>

			<c:if test="<%= commerceDiscountRuleTypeJSPContributor != null %>">

				<%
				commerceDiscountRuleTypeJSPContributor.render(commerceDiscountRule.getCommerceDiscountId(), commerceDiscountRule.getCommerceDiscountRuleId(), request, PipingServletResponse.createPipingServletResponse(pageContext));
				%>

			</c:if>
		</div>

		<aui:button-row>
			<aui:button cssClass="btn-lg" type="submit" value="save" />

			<aui:button cssClass="btn-lg" type="cancel" />
		</aui:button-row>
	</aui:form>
</commerce-ui:side-panel-content>


<liferay-frontend:component
	module="js/edit_commerce_discount_rule"
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
