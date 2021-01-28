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
	var fieldValues = [];

	try {
		fieldValues = JSON.parse(fieldValues)
	}
	catch (_ignore) {}

	Liferay.componentReady('ProductOption' + cpDefinitionId).then(function (
		ddmForm
	) {
		if (!ddmForm.on) {
			return;
		}

		if (!fieldValues.length) {
			fieldValues = FormsHelper.getDefaultFieldsShape(ddmForm);
		}

		ddmForm.on('fieldEdited', function (field) {
			fieldValues = FormsHelper.updateFields(fieldValues, field);

			const form = document[namespace + 'fm'];
			form[namespace + 'ddmFormValues'].value = JSON.stringify(
				fieldValues
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
					fieldValues
				);
			}

			submitForm(form);
		}
	);

	// aui-base,event-input
	const publishButton = document.getElementById(namespace + 'publishButton');

	publishButton.on('click', function () {
		const workflowActionInput = document.getElementById(namespace + 'workflowAction');

		if (workflowActionInput) {
			workflowActionInput.value(actionPublish);
		}
	});
}