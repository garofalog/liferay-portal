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

import {delegate} from 'commerce-frontend-js';

export default function ({
	commerceOrderImporterTypeKey,
	namespace,
	title,
	url,
}) {
	const commerceOrderImporterTypeKeyIcon = document.querySelector(
		`.${commerceOrderImporterTypeKey}`
	);

	if (commerceOrderImporterTypeKeyIcon) {
		commerceOrderImporterTypeKeyIcon.addEventListener('click', (event) => {
			event.preventDefault();

			Liferay.Util.openModal({
				id: commerceOrderImporterTypeKey,
				iframeBodyCssClass: '',
				title,
				url,
			});
		});
	}

	const orderTransition = document.getElementById(`${orderTransition}`);

	if (orderTransition) {
		delegate(
			'click',
			(event) => {
				var link = event.currentTarget;

				var workflowTaskId = parseInt(
					link.getData('workflowTaskId'),
					10
				);

				var transitionForm = document.getElementById(
					`${namespace}transitionFm`
				);

				document.getElementById(
					`${namespace}transitionCommerceOrderId`
				).value = link.getData('commerceOrderId');

				document.getElementById(
					`${namespace}workflowTaskId`
				).value = workflowTaskId;
				document.getElementById(
					`${namespace}transitionName`
				).value = link.getData('transitionName');

				if (workflowTaskId <= 0) {
					submitForm(transitionForm);

					return;
				}

				var transitionComments = document.getElementById(
					`${namespace}transitionComments`
				);

				transitionComments.style.display = 'block';

				var dialog = Liferay.Util.Window.getWindow({
					dialog: {
						bodyContent: transitionForm,
						destroyOnHide: true,
						height: 400,
						resizable: false,
						toolbars: {
							footer: [
								{
									cssClass: 'btn-primary mr-2',
									label: Liferay.Language.get('done'),
									on: {
										click() {
											submitForm(transitionForm);
										},
									},
								},
								{
									cssClass: 'btn-cancel',
									label: Liferay.Language.get('cancel'),
									on: {
										click() {
											dialog.style.display = 'none';
										},
									},
								},
							],
							header: [
								{
									cssClass: 'close',
									discardDefaultButtonCssClasses: true,
									labelHTML:
										'<span aria-hidden="true">&times;</span>',
									on: {
										click() {
											dialog.style.display = 'none';
										},
									},
								},
							],
						},
						width: 720,
					},
					title: link.innerText,
				});
			},
			'.transition-link'
		);
	}
}
