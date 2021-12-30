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

import ServiceProvider from 'commerce-frontend-js/ServiceProvider/index';
import * as modalUtils from 'commerce-frontend-js/utilities/modals/index';
import slugify from 'commerce-frontend-js/utilities/slugify';
import {debounce} from 'frontend-js-web';

export default function ({
	defaultLanguageId,
	editOptionURL,
	namespace,
	windowState,
}) {
	const keyInput = document.getElementById(`${namespace}key`);
	const nameInput = document.getElementById(`${namespace}name`);
	const handleOnNameInput = () => {
		keyInput.value = slugify(nameInput.value);
	};
	nameInput.addEventListener('input', debounce(handleOnNameInput, 200));

	const AdminCatalogResource = ServiceProvider.AdminCatalogAPI('v1');
	const addCpOptionSubmitButton = document.getElementsByName(
		`${namespace}fm`
	);
	addCpOptionSubmitButton.addEventListener('submit', (event) => {
		event.preventDefault();
		modalUtils.isSubmitting();

		const formattedData = {
			fieldType: document.getElementById(
				`${namespace}DDMFormFieldTypeName`
			).value,
			key: keyInput.value,
			name: {
				[defaultLanguageId]: nameInput.value,
			},
		};

		AdminCatalogResource.createOption(formattedData)
			.then((cpOption) => {
				const redirectURL = new Liferay.PortletURL.createURL(
					editOptionURL
				);

				redirectURL.setParameter('p_p_state', windowState);

				redirectURL.setParameter('cpOptionId', cpOption.id);

				modalUtils.closeAndRedirect(redirectURL);
			})
			.catch(modalUtils.onSubmitFail);
	});
}
