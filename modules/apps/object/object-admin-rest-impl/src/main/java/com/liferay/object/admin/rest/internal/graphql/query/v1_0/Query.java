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

package com.liferay.object.admin.rest.internal.graphql.query.v1_0;

import com.liferay.object.admin.rest.dto.v1_0.ObjectDefinition;
import com.liferay.object.admin.rest.resource.v1_0.ObjectDefinitionResource;
import com.liferay.petra.function.UnsafeConsumer;
import com.liferay.petra.function.UnsafeFunction;
import com.liferay.portal.kernel.search.Sort;
import com.liferay.portal.kernel.search.filter.Filter;
import com.liferay.portal.kernel.service.GroupLocalService;
import com.liferay.portal.kernel.service.RoleLocalService;
import com.liferay.portal.vulcan.accept.language.AcceptLanguage;
import com.liferay.portal.vulcan.graphql.annotation.GraphQLField;
import com.liferay.portal.vulcan.graphql.annotation.GraphQLName;
import com.liferay.portal.vulcan.pagination.Page;
import com.liferay.portal.vulcan.pagination.Pagination;

import java.util.Map;
import java.util.function.BiFunction;

import javax.annotation.Generated;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import javax.ws.rs.core.UriInfo;

import org.osgi.service.component.ComponentServiceObjects;

/**
 * @author Javier Gamarra
 * @generated
 */
@Generated("")
public class Query {

	public static void setObjectDefinitionResourceComponentServiceObjects(
		ComponentServiceObjects<ObjectDefinitionResource>
			objectDefinitionResourceComponentServiceObjects) {

		_objectDefinitionResourceComponentServiceObjects =
			objectDefinitionResourceComponentServiceObjects;
	}

	/**
	 * Invoke this method with the command line:
	 *
	 * curl -H 'Content-Type: text/plain; charset=utf-8' -X 'POST' 'http://localhost:8080/o/graphql' -d $'{"query": "query {objectDefinitions(page: ___, pageSize: ___){items {__}, page, pageSize, totalCount}}"}' -u 'test@liferay.com:test'
	 */
	@GraphQLField
	public ObjectDefinitionPage objectDefinitions(
			@GraphQLName("pageSize") int pageSize,
			@GraphQLName("page") int page)
		throws Exception {

		return _applyComponentServiceObjects(
			_objectDefinitionResourceComponentServiceObjects,
			this::_populateResourceContext,
			objectDefinitionResource -> new ObjectDefinitionPage(
				objectDefinitionResource.getObjectDefinitionsPage(
					Pagination.of(page, pageSize))));
	}

	/**
	 * Invoke this method with the command line:
	 *
	 * curl -H 'Content-Type: text/plain; charset=utf-8' -X 'POST' 'http://localhost:8080/o/graphql' -d $'{"query": "query {objectDefinition(objectDefinitionId: ___){actions, dateCreated, dateModified, id, name, objectFields}}"}' -u 'test@liferay.com:test'
	 */
	@GraphQLField
	public ObjectDefinition objectDefinition(
			@GraphQLName("objectDefinitionId") Long objectDefinitionId)
		throws Exception {

		return _applyComponentServiceObjects(
			_objectDefinitionResourceComponentServiceObjects,
			this::_populateResourceContext,
			objectDefinitionResource ->
				objectDefinitionResource.getObjectDefinition(
					objectDefinitionId));
	}

	@GraphQLName("ObjectDefinitionPage")
	public class ObjectDefinitionPage {

		public ObjectDefinitionPage(Page objectDefinitionPage) {
			actions = objectDefinitionPage.getActions();

			items = objectDefinitionPage.getItems();
			lastPage = objectDefinitionPage.getLastPage();
			page = objectDefinitionPage.getPage();
			pageSize = objectDefinitionPage.getPageSize();
			totalCount = objectDefinitionPage.getTotalCount();
		}

		@GraphQLField
		protected Map<String, Map> actions;

		@GraphQLField
		protected java.util.Collection<ObjectDefinition> items;

		@GraphQLField
		protected long lastPage;

		@GraphQLField
		protected long page;

		@GraphQLField
		protected long pageSize;

		@GraphQLField
		protected long totalCount;

	}

	private <T, R, E1 extends Throwable, E2 extends Throwable> R
			_applyComponentServiceObjects(
				ComponentServiceObjects<T> componentServiceObjects,
				UnsafeConsumer<T, E1> unsafeConsumer,
				UnsafeFunction<T, R, E2> unsafeFunction)
		throws E1, E2 {

		T resource = componentServiceObjects.getService();

		try {
			unsafeConsumer.accept(resource);

			return unsafeFunction.apply(resource);
		}
		finally {
			componentServiceObjects.ungetService(resource);
		}
	}

	private void _populateResourceContext(
			ObjectDefinitionResource objectDefinitionResource)
		throws Exception {

		objectDefinitionResource.setContextAcceptLanguage(_acceptLanguage);
		objectDefinitionResource.setContextCompany(_company);
		objectDefinitionResource.setContextHttpServletRequest(
			_httpServletRequest);
		objectDefinitionResource.setContextHttpServletResponse(
			_httpServletResponse);
		objectDefinitionResource.setContextUriInfo(_uriInfo);
		objectDefinitionResource.setContextUser(_user);
		objectDefinitionResource.setGroupLocalService(_groupLocalService);
		objectDefinitionResource.setRoleLocalService(_roleLocalService);
	}

	private static ComponentServiceObjects<ObjectDefinitionResource>
		_objectDefinitionResourceComponentServiceObjects;

	private AcceptLanguage _acceptLanguage;
	private com.liferay.portal.kernel.model.Company _company;
	private BiFunction<Object, String, Filter> _filterBiFunction;
	private GroupLocalService _groupLocalService;
	private HttpServletRequest _httpServletRequest;
	private HttpServletResponse _httpServletResponse;
	private RoleLocalService _roleLocalService;
	private BiFunction<Object, String, Sort[]> _sortsBiFunction;
	private UriInfo _uriInfo;
	private com.liferay.portal.kernel.model.User _user;

}