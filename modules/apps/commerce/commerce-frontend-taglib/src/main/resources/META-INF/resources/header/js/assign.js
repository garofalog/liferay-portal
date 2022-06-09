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

export default function ({
	assignURL,
	myWorkflowTasksPortletNamespace,
	namespace,
}) {
	const assignToMe = document.getElementById(
		`${namespace}assign-to-me-modal-opener`
	);
	const assignTo = document.getElementById(
		`${namespace}assign-to-modal-opener`
	);

	function handleAssignTo(event) {
		if (event.target.getAttribute('data-assign') === 'me') {
			Liferay.Util.openWindow({
				dialog: {
					destroyOnHide: true,
					height: 430,
					resizable: false,
					width: 896,
				},
				dialogIframe: {
					bodyCssClass: 'dialog-with-footer task-dialog',
				},
				id: `${myWorkflowTasksPortletNamespace}assignToDialog`,
				title: Liferay.Language.get('assign-to-me...'),
				uri: assignURL,
			});
		}
		else {
			Liferay.Util.openWindow({
				dialog: {
					destroyOnHide: true,
					height: 430,
					resizable: false,
					width: 896,
				},
				dialogIframe: {
					bodyCssClass: 'dialog-with-footer task-dialog',
				},
				id: `${myWorkflowTasksPortletNamespace}assignToDialog`,
				title: Liferay.Language.get('assign-to-...'),
				uri: assignURL,
			});
		}
	}

	assignToMe.addEventListener('click', handleAssignTo);
	assignTo.addEventListener('click', handleAssignTo);

	return {
		dispose() {
			assignToMe.removeEventListener('click', handleAssignTo);
			assignTo.addEventListener('click', handleAssignTo);
		},
	};
}
