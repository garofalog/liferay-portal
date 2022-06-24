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
	const iframeContent = document.querySelector('.modal-iframe-content');
	const iframeFooter = document.querySelector('.modal-iframe-footer');
	const iframeForm = iframeContent.querySelector('form');
	let debouncedAdjustBottomSpace;

	const closeModal = (isSuccessful) => {
		const eventDetail = {};

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

		if (event.key === 'Escape') {
			closeModal(false);
		}
		Liferay.fire(CLOSE_MODAL, {
			successNotification: {
				message: Liferay.Language.get(
					'your-request-completed-successfully'
				),
				showSuccessNotification: false,
			},
		});
	}

	function handleFormSubmit(event) {
		event.preventDefault();

		Liferay.fire(IS_LOADING_MODAL, {isLoading: true});

		const form = Liferay.Form.get(iframeForm.id);

		if (!form || !form.formValidator?.validate) {
			event.preventDefault();
			Liferay.fire(IS_LOADING_MODAL, {
				isLoading: false,
			});
		}

		form.formValidator?.validate();

		if (form.formValidator?.hasErrors()) {
			event.preventDefault();
			Liferay.fire(IS_LOADING_MODAL, {
				isLoading: false,
			});
		}
	}

	window.addEventListener('keyup', handleCloseModal);

	if (requestProcessed) {
		closeModal(true);
	}

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
