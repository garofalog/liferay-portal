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

import {
	CLOSE_MODAL,
	IS_LOADING_MODAL,
} from 'commerce-frontend-js/utilities/eventsDefinitions';
import {debounce} from 'frontend-js-web';

export default function ({requestProcessed}) {
	const modalClosers = document.querySelectorAll('.modal-closer'),
		iframeContent = document.querySelector('.modal-iframe-content'),
		iframeFooter = document.querySelector('.modal-iframe-footer'),
		iframeForm = iframeContent.querySelector('form'),
		modalWrapper = document.querySelector('.modal-backdrop .clay-modal');

	let debouncedAdjustBottomSpace;

	const closeModal = (isSuccessful) => {
		let eventDetail = {};

		if (isSuccessful) {
			eventDetail.successNotification = {
				message: Liferay.Language.get(
					'your-request-completed-successfull'
				),
				showSuccessNotification: true,
			};
		}

		Liferay.fire(CLOSE_MODAL, eventDetail);
	};

	function adjustBottomSpace() {
		iframeContent.style.marginBottom = iframeFooter.offsetHeight + 'px';
	}

	function handleCloseModal(event) {
		event.preventDefault();
		closeModal(false);
	}

	function handleModalClosers(event) {
		event.preventDefault();
		Liferay.fire(CLOSE_MODAL);
	}


	function handleFormSubmit(event) {
		event.preventDefault();

		Liferay.fire(IS_LOADING_MODAL, {isLoading: true});

		const form = Liferay.Form.get(iframeForm.id);

		if (!form || !form.formValidator || !form.formValidator.validate) {
			event.preventDefault();
			Liferay.fire(IS_LOADING_MODAL, {
				isLoading: false,
			});
		}

		form.formValidator.validate();

		if (form.formValidator.hasErrors()) {
			event.preventDefault();
			Liferay.fire(IS_LOADING_MODAL, {
				isLoading: false,
			});
		}
	}

	const closeDropDownOnClickOutside = (event) => {
		if (
			event.target !== modalWrapper &&
			modalWrapper.classList.contains('show') &&
			event.target.parentNode !== modalWrapper
		) {
			modalWrapper.classList.remove('show');
		}
	};

	window.addEventListener('keyup', handleModalClosers);

	window.addEventListener('mouseup', closeDropDownOnClickOutside);

	if (requestProcessed) {
		closeModal(true);
	}

	Liferay.fire(IS_LOADING_MODAL, {isLoading: false});

	modalClosers.forEach((trigger) => {
		trigger.addEventListener('click', handleCloseModal);
	});

	if (iframeForm) {
		iframeForm.appendChild(iframeFooter);
		iframeForm.addEventListener('submit', handleFormSubmit);
	}

	if (iframeContent && iframeFooter) {
		debouncedAdjustBottomSpace = debounce(adjustBottomSpace, 300);

		window.addEventListener('resize', debouncedAdjustBottomSpace);
	}

	return {
		dispose() {
			window.removeEventListener('keyup', handleCloseModal);

			modalClosers.forEach((trigger) => {
				trigger.removeEventListener('click', handleModalClosers);
			});

			if (iframeForm) {
				iframeForm.removeEventListener('submit', handleFormSubmit);
			}

			if (iframeContent && iframeFooter) {
				window.removeEventListener(
					'resize',
					debouncedAdjustBottomSpace
				);
			}
		},
	};
}
