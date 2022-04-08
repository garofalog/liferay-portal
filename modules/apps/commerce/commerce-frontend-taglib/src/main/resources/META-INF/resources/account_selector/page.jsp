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

<%@ include file="/account_selector/init.jsp" %>

<div class="account-selector-root" id="<%= accountSelectorId %>"></div>

<liferay-frontend:component
	context='<%=
		HashMapBuilder.<String, Object>put(
			"accountEntryAllowedTypes", jsonSerializer.serializeDeep(accountEntryAllowedTypes)
		).put(
			"accountSelectorId", accountSelectorId
		).put(
			"commerceChannelId", commerceChannelId
		).put(
			"createNewOrderURL", createNewOrderURL
		).put(
			"currentCommerceAccount", Validator.isNotNull(currentCommerceAccount) ? jsonSerializer.serializeDeep(currentCommerceAccount) : null
		).put(
			"currentCommerceOrder", Validator.isNotNull(currentCommerceOrder) ? jsonSerializer.serializeDeep(currentCommerceOrder) : null
		).put(
			"refreshPageOnAccountSelected", true
		).put(
			"selectOrderURL", selectOrderURL
		).put(
			"setCurrentAccountURL", setCurrentAccountURL
		).put(
			"showOrderTypeModal", showOrderTypeModal
		).build()
	%>'
	module="js/account_selector/page"
/>