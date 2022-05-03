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

import AddToCart from 'commerce-frontend-js/components/add_to_cart/entry';

export default function ({
	accountId,
	addToCartId,
	alignment,
	cartId,
	currencyCode,
	disabled,
	groupId,
	iconOnly,
	id,
	inCart,
	inline,
	namespace,
	productSettingsModel,
	quantityDetails,
	size,
	skuId,
	skuOptions,
	stockQuantity,
}) {
	const props = {
		accountId,
		cartId,
		channel: {
			currencyCode,
			groupId,
			id,
		},
		cpInstance: {
			inCart,
			skuId,
			skuOptions,
			stockQuantity,
		},
		disabled,
		settings: {
			alignment,
			iconOnly,
			inline,
			namespace,
			size,
		},
	};

	if (productSettingsModel !== null) {
		props.settings.quantityDetails = quantityDetails;
	}

	AddToCart(addToCartId, addToCartId, props);
}
