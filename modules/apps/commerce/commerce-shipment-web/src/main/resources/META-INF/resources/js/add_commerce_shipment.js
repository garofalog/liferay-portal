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

import {fetch} from 'frontend-js-web';

export default function ({namespace}) {
	const commerceAccountSelect = document.querySelector(
		`#${namespace}form select[name=${namespace}commerceAccountId]`
	);

	function commerceUpdateAddressField(commerceAccountId) {
		return fetch(
			'/o/headless-commerce-admin-account/v1.0/accounts/' +
				commerceAccountId +
				'/accountAddresses/',
			{
				headers: new Headers({
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}),
			}
		)
			.then((response) => response.json())
			.then((response) => {
				const commerceAddressIdSelect = document.getElementById(
					`${namespace}commerceAddressId`
				);

				response.items.forEach((item) => {
					const commerceAddressIdOption = document.createElement(
						`<option id="${namespace}commerceAddressId-${item.id}" value="${item.id}">${item.street1} - ${item.city} - ${item.regionISOCode} - ${item.countryISOCode}</option>`
					);

					commerceAddressIdSelect.appendChild(
						commerceAddressIdOption
					);
				});

				commerceAddressIdSelect.show();
			});
	}

	if (commerceAccountSelect) {
		commerceAccountSelect.addEventListener('change', () => {
			if (commerceAccountSelect.value) {
				commerceUpdateAddressField(commerceAccountSelect.value);
			}
		});
	}
}
