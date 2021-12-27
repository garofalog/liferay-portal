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

import {createPortletURL} from 'frontend-js-web';

export default function ({currentURLObj, namespace}) {
    Liferay.provide(
		window,
		`${namespace}selectType`,
		() => {

			var name = document.getElementById(`#${namespace}name`).value;
			var description = document.getElementById(`#${namespace}description`).value;
			var from = document.getElementById(`#${namespace}from`).value;
			var fromName = document.getElementById(`#${namespace}fromName`).value;
			var cc = document.getElementById(`#${namespace}cc`).value;
			var bcc = document.getElementById(`#${namespace}bcc`).value;
			var type = document.getElementById(`#${namespace}type`).value;

			var portletURL = createPortletURL(currentURLObj);

			portletURL.setParameter('name', name);
			portletURL.setParameter('description', description);
			portletURL.setParameter('from', from);
			portletURL.setParameter('fromName', fromName);
			portletURL.setParameter('cc', cc);
			portletURL.setParameter('bcc', bcc);
			portletURL.setParameter('type', type);

			window.location.replace(portletURL.toString());
		},
		['liferay-portlet-url']
	);

}