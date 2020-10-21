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

import launcher from '../../../src/main/resources/META-INF/resources/components/add_to_cart/entry';

import '../../../src/main/resources/META-INF/resources/styles/main.scss';

launcher('add_to_cart', 'add-to-cart', {
	addToCartButton: {
		accountId: 43936,//48323, // falzo
		cartSymbol: 'shopping-cart',
		channelId: 41005, //43940,
		currencyCode: 'USD',
		disabledProp: false,
		orderId: 43939,
		productId: 43939, //43657, // "Mount"   no"43630",
		spritemap: './assets/icons.svg',

	},


	orderQuantity: [
		{
			label: 1,
			value: 1
		},
		{
			label: 2,
			value: 2
		},
		{
			label: 3,
			value: 3
		},
		{
			label: 4,
			value: 4
		},
		{
			label: 5,
			value: 5
		},
		{
			label: 6,
			value: 6
		},
		{
			label: 7,
			value: 7
		},
		{
			label: 8,
			value: 8
		},
		{
			label: 9,
			value: 9
		},
	],

    // NO ALLOWED QUANTITY SET
    // [
    //     {
    //         label: 1,
    //         value: 1
    //     }
    // ],
	// disableAddToCartButton: false,
	// disableQuantitySelector: false,
	
	settings: {
		// NO ALLOWED QUANTITY SET

		allowedQuantity: [{
			label: 1,
			value: -1
		}],

        // ALLOWED QUANTITY SET
        // allowedQuantity: [
        //     {
        //         label: 1,
        //         value: 1
        //     },
        //     {
        //         label: 1,
        //         value: 1
        //     },
        //     {
        //         label: 2,
        //         value: 2
        //     },
        //     {
        //         label: 3,
        //         value: 3
        //     },
        //     {
        //         label: 5,
        //         value: 5
        //     },
        //     {
        //         label: 8,
        //         value: 8
        //     },
        //     {
        //         label: 13,
        //         value: 13
        //     },
        //     {
        //         label: 21,
        //         value: 21
        //     }
        // ],
	},
	skuId: 43712, //43657,
	// groupId: "40995", forse non serve
	// orderQuantity: 1,
	// productInCart: false,
});
