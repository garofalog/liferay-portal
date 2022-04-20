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

import {OPEN_MODAL} from 'commerce-frontend-js/utilities/eventsDefinitions';

export default function ({linkId, id, validator, randomNamespace}) {
	const link = document.getElementById(linkId);
	const toggleSwitch = document.getElementById(
		`${randomNamespace}toggle-switch`
	);
	const toggleLabel = document.getElementById(
		`${randomNamespace}toggle-label`
	);
	const toggleCheckbox = document.getElementById(randomNamespace);
	const collapsableElement = document.getElementById(
		`${randomNamespace}collapse`
	);
	let collapseClickable = true;

	function handleOpenModal(event) {
		event.preventDefault();
		Liferay.fire(OPEN_MODAL, {
			id,
		});
	}

	function handleCollapse(event) {
		event.preventDefault();

		if (collapseClickable) {
			toggleCheckbox.click();
			collapsableElement.classList[
				toggleCheckbox.checked ? 'remove' : 'add'
			]('show');
			toggleCheckbox.checked = !toggleCheckbox.checked;
		}

		collapseClickable = false;

		setTimeout(() => {
			collapseClickable = true;
		}, 400);
	}

	if (linkId && validator) {
		link.addEventListener('click', handleOpenModal);
	}

	toggleSwitch?.forEach((element) => {
		element.addEventListener('click', handleCollapse);
	});
	toggleLabel?.forEach((element) => {
		element.addEventListener('click', handleCollapse);
	});

	return {
		dispose() {
			if (linkId && validator) {
				link.removeEventListener('click', handleOpenModal);
			}
			toggleSwitch?.forEach((element) => {
				element.removeEventListener('click', handleCollapse);
			});
			toggleLabel?.forEach((element) => {
				element.removeEventListener('click', handleCollapse);
			});
		},
	};
}
