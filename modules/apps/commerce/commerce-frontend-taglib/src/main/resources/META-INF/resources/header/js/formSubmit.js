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

export default function ({actionId, formId, submitCheck}) {
	const actionIdElement = document.getElementById(actionId);
	const formWrapperElement = document.getElementById(formId);

	function handleFormSubmit(event) {
		event.preventDefault();

		if (!formWrapperElement) {
			throw new Error('Form with id: ' + formId + ' not found!');
		}
		submitForm(formWrapperElement);
	}

	if (submitCheck && formId) {
		actionIdElement.addEventListener('click', handleFormSubmit);
	}

	return {
		dispose() {
			if (submitCheck && formId) {
				actionId.removeEventListener('click', handleFormSubmit);
			}
		},
	};
}
