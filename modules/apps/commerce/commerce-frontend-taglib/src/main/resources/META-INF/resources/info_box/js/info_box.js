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

export default function ({actionLabel, actionTargetId, linkId}) {
	const link = document.getElementById(linkId);
	const valid = link && actionLabel !== null && actionTargetId !== null;

	function openModal(event) {
		event.preventDefault();
		Liferay.fire('open-modal', {
			id: actionTargetId,
		});
	}

	if (valid) {
		link.addEventListener('click', openModal);
	}

	return {
		dispose() {
			if (valid) {
				link.removeEventListener('click', openModal);
			}
		},
	};
}
