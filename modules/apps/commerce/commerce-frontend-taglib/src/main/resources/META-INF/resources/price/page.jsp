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

<%@ include file="/price/init.jsp" %>

<c:if test="<%= Validator.isNotNull(namespace) %>">
	<div id="<%= namespace + "price" %>"></div>

	<liferay-frontend:component
		context='<%=
			HashMapBuilder.<String, Object>put(
				"compact", compact
			).put(
				"displayDiscountLevels", displayDiscountLevels
			).put(
				"netPrice", netPrice
			).put(
				"price", jsonSerializer.serializeDeep(priceModel)
			).put(
				"standalone", true
			).build()
		%>'
		module="price/js/price"
	/>
</c:if>