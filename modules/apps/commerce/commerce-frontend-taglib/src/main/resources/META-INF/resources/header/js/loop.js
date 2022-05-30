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
	if (formId) {
		const actionIdElement = document.getElementById(actionId);
		if (formId !== '' && submitCheck) {
			actionIdElement.addEventListener('click', formSubmit);
		}
		actionIdElement.addEventListener('click', (event) => {
			event.preventDefault();
			const form = document.getElementById(formId);
			if (!form) {
				throw new Error(`Form with id: ${formId} not found!`);
			}
			submitForm(form);
		});
	}
	return {
		dispose() {
			actionIdElement.removeEventListener('click', formSubmit);

			if (formId !== '' && submitCheck) {
				actionIdElement.removeEventListener('click', formSubmit);
			}
		},
	};
}
