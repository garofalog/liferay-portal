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

<%@ include file="/modal_content/init.jsp" %>

	</div>

	<c:if test="<%= Validator.isNotNull(submitButtonLabel) || showCancelButton || showSubmitButton %>">
		<div class="modal-iframe-footer">
			<c:if test="<%= showCancelButton %>">
				<div class="btn btn-secondary ml-3 modal-closer"><%= LanguageUtil.get(request, "cancel") %></div>
			</c:if>

			<c:if test="<%= showSubmitButton || Validator.isNotNull(submitButtonLabel) %>">
				<button class="btn btn-primary form-submitter ml-3" type="submit">
					<%= Validator.isNotNull(submitButtonLabel) ? HtmlUtil.escape(submitButtonLabel) : LanguageUtil.get(request, "submit") %>
				</button>
			</c:if>
		</div>
	</c:if>
</div>

<liferay-frontend:component
	context='<%=
		HashMapBuilder.<String, Object>put(
			"requestProcessed", SessionMessages.contains(renderRequest, "requestProcessed")
		).build()
	%>'
	module="js/modal_content/end"
/>