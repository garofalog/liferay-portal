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

import Cart from 'commerce-frontend-js/components/mini_cart/entry';

export default function ({
	miniCartId,
	labels,
	cartViews,
	checkoutURL,
	orderDetailURL,
	productURLSeparator,
	displayDiscountLevels,
	displayTotalItemsQuantity,
	itemsQuantity,
	orderId,
	siteDefaultURL,
	spritemap,
	toggleable,
}) {
	let initialProps = {
		cartActionURLs: {
			checkoutURL,
			orderDetailURL,
			productURLSeparator,
			siteDefaultURL,
		},
		displayDiscountLevels,
		displayTotalItemsQuantity,
		itemsQuantity, orderId: parseInt(orderId, 10),
		spritemap,
		toggleable,
	};

	if (cartViews && cartViews !== '' && cartViews !== undefined) {
		Object.entries(cartViews).forEach(([key, value]) => {
			initialProps.cartViews[key] = {
				contentRendererModuleUrl: value,
			};
		});
	}

	if (labels && labels !== '' && labels !== undefined) {
		Object.entries(labels).forEach(([key, value]) => {
			initialProps.labels[key] = value;
		});
	}

	Cart(miniCartId, miniCartId, initialProps);
}
