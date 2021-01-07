// commerce-frontend-js/utilities/eventsDefinitions as events, commerce-frontend-js/utilities/modals/index as ModalUtils, commerce-frontend-js/ServiceProvider/index as ServiceProvider


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

// import slugify from 'commerce-frontend-js/utilities/slugify'

import {debounce} from 'frontend-js-web';


export default function ({namespace}) {
	var <portlet:namespace />defaultLanguageId = null;

	var AdminCatalogResource = ServiceProvider.defaul.AdminCatalogAPI('v1');

	Liferay.provide(
		window,
		'<portlet:namespace />apiSubmit',
		function () {
			ModalUtils.isSubmitting();

			var formattedData =
				{
					fieldType : '',
					key : '',
					name: {}
				};

			formattedData.fieldType = document.getElementById('<portlet:namespace />DDMFormFieldTypeName').value;

			formattedData.key = document.getElementById('<portlet:namespace />key').value;

			formattedData.name[
			<portlet:namespace />defaultLanguageId
		] = document.getElementById('<portlet:namespace />name').value;

			AdminCatalogResource.createOption(formattedData)
				.then(function (cpOption) {
					var redirectURL = new Liferay.PortletURL.createURL(
						'<%= editOptionURL %>'
					);

					redirectURL.setParameter(
						'p_p_state',
						'<%= LiferayWindowState.MAXIMIZED.toString() %>'
					);

					redirectURL.setParameter('cpOptionId', cpOption.id);

					ModalUtils.closeAndRedirect(redirectURL);
				})
				.catch(ModalUtils.onSubmitFail);
		},
		['liferay-portlet-url']
	);
}