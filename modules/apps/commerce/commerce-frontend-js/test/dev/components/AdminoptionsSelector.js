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

import launcher from '../../../src/main/resources/META-INF/resources/components/adminoptions_selector/entry';

import '../../../src/main/resources/META-INF/resources/styles/main.scss';

launcher('adminoptions-selector', 'adminoptions-selector', {
	options: [
		{
			name: 'size',
			options: [
				{
					label: 'Small',
					value: 'S'
				},
				{
					label: 'Medium',
					value: 'M'
				},
				{
					label: 'Big',
					value: 'XL'
				},
			],
			selectOrDatalist: 'select',
			type: 'string',
		},

		// {
		// 	name: 'color',
		// 	options: [
		// 		{
		// 			label: 'Red',
		// 			value: 'f00'
		// 		},
		// 		{
		// 			label: 'Grey',
		// 			value: '333'
		// 		},
		// 		{
		// 			label: 'Violet',
		// 			value: 'ee82ee'
		// 		},
		// 		{
		// 			label: 'Porphyry Red',
		// 			value: '984149'
		// 		},
		// 		{
		// 			label: 'Mouse Grey',
		// 			value: '6c6e6b'
		// 		},
		// 	],
		// 	selectOrDatalist: 'datalist',
		// 	type: 'string'
		// },
		// {
		// 	name: 'availability',
		// 	options: [
		// 		{
		// 			label: 'Available',
		// 			value: 'available'
		// 		},
		// 		{
		// 			label: 'In store only',
		// 			value: 'store'
		// 		},
		// 		{
		// 			label: 'Online',
		// 			value: 'online'
		// 		},
		// 	],
		// 	selectOrDatalist: 'select',
		// 	type: 'string'
		// }
	],
});
