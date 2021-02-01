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


import {formsHelper as FormsHelper} from 'commerce-frontend-js/utilities/forms/formsHelper';

export default function ({namespace,fieldValues,cpDefinitionId, actionPublish}) {

	let fieldValuesJs = [];

	try {
		fieldValuesJs = JSON.parse(fieldValues)
	}
	catch (_ignore) {}

	Liferay.componentReady('ProductOption' + cpDefinitionId).then((ddmForm) => {
		if (!ddmForm.on) {
			return;
		}

		if (!fieldValuesJs.length) {
			fieldValuesJs = FormsHelper.getDefaultFieldsShape(ddmForm);
		}

		ddmForm.on('fieldEdited', (field) => {
			fieldValuesJs = FormsHelper.updateFields(fieldValuesJs, field);

			const form = document[namespace + 'fm'];
			form[namespace + 'ddmFormValues'].value = JSON.stringify(
				fieldValuesJs
			);
		});
	});

	Liferay.provide(
		window,
		namespace + 'saveAttachmentFileEntry',
		function () {
			const form = window.document[namespace + 'fm'];

			const ddmForm = Liferay.component('ProductOption' + cpDefinitionId);

			if (ddmForm) {
				form[namespace + 'ddmFormValues'].value = JSON.stringify(
					fieldValuesJs
				);
			}

			submitForm(form);
		}
	);

	try {
		const publishButton = document.getElementById(namespace + 'publishButton');

		publishButton.addEventListener('click', (event) => {
			const workflowActionInput = document.getElementById(namespace + 'workflowAction');
			if (workflowActionInput) {
				workflowActionInput.setAttribute('value', actionPublish)
			}
		});
	} catch (_ignore) {}

}